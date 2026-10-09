import React, { useState, useEffect, useMemo } from 'react';
import { 
  Sparkles, Compass, Clock, Zap, ShoppingBag, Star, RefreshCw, 
  Trash2, ChevronRight, CheckCircle2, SlidersHorizontal, Info, Eye,
  Headphones, Lightbulb, Watch, Armchair, ArrowRight, Flame, Heart
} from 'lucide-react';
import { Product, ProductCategory, PageRoute, ScoredRecommendation } from '../../types';
import { formatBDT } from '../../utils/formatters';
import { useCart } from '../../context/CartContext';
import { 
  getBrowsingHistory, 
  getRecentlyViewedProducts, 
  clearBrowsingHistory, 
  seedPersonaBrowsingHistory,
  removeProductFromHistory,
  BROWSING_HISTORY_EVENT 
} from '../../services/browsingHistory';
import { 
  getRecommendedProducts, 
  analyzeBrowsingProfile 
} from '../../services/recommendationEngine';
import { CATEGORIES_METADATA } from '../../data/products';

interface RecommendedForYouProps {
  products: Product[];
  onNavigate: (page: PageRoute, category?: ProductCategory, productId?: string) => void;
  onSelectProduct: (product: Product) => void;
  onBuyNow: (product: Product) => void;
}

export const RecommendedForYou: React.FC<RecommendedForYouProps> = ({
  products,
  onNavigate,
  onSelectProduct,
  onBuyNow,
}) => {
  const { addItem, wishlist, cart } = useCart();
  const [historyKey, setHistoryKey] = useState(0); // Trigger re-render on history changes
  const [activeFilter, setActiveFilter] = useState<'all' | 'high_match' | 'similar' | 'budget'>('all');
  const [showRecentlyViewed, setShowRecentlyViewed] = useState(true);
  const [showProfileInfo, setShowProfileInfo] = useState(false);
  const [addedToast, setAddedToast] = useState<string | null>(null);

  // Listen for browsing history updates in real-time
  useEffect(() => {
    const handleHistoryUpdate = () => {
      setHistoryKey((prev) => prev + 1);
    };

    window.addEventListener(BROWSING_HISTORY_EVENT, handleHistoryUpdate);
    return () => {
      window.removeEventListener(BROWSING_HISTORY_EVENT, handleHistoryUpdate);
    };
  }, []);

  // Retrieve latest browsing history and user taste profile
  const history = useMemo(() => {
    return getBrowsingHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [historyKey]);

  const profile = useMemo(() => {
    return analyzeBrowsingProfile(history);
  }, [history]);

  const recentlyViewed = useMemo(() => {
    return getRecentlyViewedProducts(products, 6);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products, historyKey]);

  const cartProductIds = useMemo(() => {
    return cart.items.map((i) => i.productId);
  }, [cart.items]);

  // Compute recommendations using heuristic engine
  const recommendations = useMemo(() => {
    return getRecommendedProducts(products, history, wishlist, cartProductIds, 12);
  }, [products, history, wishlist, cartProductIds]);

  // Filter recommendations based on active sub-tab
  const filteredRecommendations = useMemo(() => {
    if (activeFilter === 'high_match') {
      return recommendations.filter((r) => r.matchPercentage >= 88);
    }
    if (activeFilter === 'similar') {
      return recommendations.filter((r) => 
        r.reasons.some((reason) => reason.signal === 'similar_item' || reason.signal === 'subcategory_match')
      );
    }
    if (activeFilter === 'budget' && profile.averagePriceBDT > 0) {
      return recommendations.filter((r) => r.product.priceBDT <= profile.averagePriceBDT * 1.15);
    }
    return recommendations;
  }, [recommendations, activeFilter, profile.averagePriceBDT]);

  const favoriteCategoryMeta = CATEGORIES_METADATA.find((c) => c.id === profile.favoriteCategory);

  const handleClearHistory = () => {
    clearBrowsingHistory();
    setHistoryKey((prev) => prev + 1);
  };

  const handleSimulatePersona = (persona: 'audio' | 'lighting' | 'watches' | 'furniture') => {
    seedPersonaBrowsingHistory(persona, products);
    setHistoryKey((prev) => prev + 1);
  };

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product);
    setAddedToast(product.name);
    setTimeout(() => setAddedToast(null), 2500);
  };

  return (
    <section id="recommended-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      
      {/* Toast Notification when adding to bag */}
      {addedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-neutral-700 animate-in fade-in slide-in-from-bottom-4">
          <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div className="text-xs">
            <p className="font-bold">Added to shopping cart</p>
            <p className="text-neutral-400 truncate max-w-xs">{addedToast}</p>
          </div>
        </div>
      )}

      {/* Main Container Card */}
      <div className="bg-white rounded-3xl border border-neutral-200/90 shadow-sm p-6 sm:p-8 space-y-6">
        
        {/* Top Header Row: Sparkles Icon, Title, Taste Badges */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-neutral-100">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-red-600 via-rose-600 to-amber-500 text-white flex items-center justify-center shadow-md shadow-red-500/20 shrink-0">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-neutral-950 uppercase tracking-tight">
                  Recommended for You
                </h2>
                <span className="bg-red-100 text-red-700 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <Compass className="w-3 h-3" />
                  <span>Heuristic AI · Live Personalization</span>
                </span>
              </div>
              <p className="text-xs text-neutral-500 mt-0.5">
                Dynamic picks calculated from your browsing history, product interactions, and price preferences in BDT
              </p>
            </div>
          </div>

          {/* Right Action: Taste Profile Details & Persona Simulator */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {/* Live Profile Signal Pill */}
            {history.length > 0 ? (
              <div className="bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-1.5 flex items-center gap-2 text-[11px]">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-neutral-500 font-medium">Taste Affinity:</span>
                <span className="font-bold text-neutral-900">
                  {favoriteCategoryMeta?.shortName || 'Multi-Category'}
                </span>
                {profile.averagePriceBDT > 0 && (
                  <span className="text-neutral-400 font-mono">
                    (~{formatBDT(profile.averagePriceBDT)})
                  </span>
                )}
              </div>
            ) : (
              <div className="bg-amber-50 text-amber-900 border border-amber-200 rounded-xl px-3 py-1.5 text-[11px] font-medium flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Cold Start: Browsing products will calibrate your feed</span>
              </div>
            )}

            {/* Toggle Profile Insights Popover Button */}
            <button
              onClick={() => setShowProfileInfo(!showProfileInfo)}
              className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-xl font-medium transition-colors cursor-pointer flex items-center gap-1"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>{showProfileInfo ? 'Hide Signals' : 'Taste Signals'}</span>
            </button>
          </div>
        </div>

        {/* Dynamic Heuristic Taste Signals Drawer (Detailed Transparency Panel) */}
        {showProfileInfo && (
          <div className="bg-neutral-50 rounded-2xl border border-neutral-200/90 p-4 sm:p-5 space-y-4 animate-in fade-in slide-in-from-top-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-200/70">
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-red-600" />
                  <span>How the Recommendation Heuristic Works</span>
                </h4>
                <p className="text-[11px] text-neutral-500">
                  Nexus Bazaar tracks your interactions locally and computes multi-factor scores based on category frequency, subcategory style, and budget proximity.
                </p>
              </div>

              {/* History controls: Clear History */}
              {history.length > 0 && (
                <button
                  onClick={handleClearHistory}
                  className="text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 self-start cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Reset Browsing History</span>
                </button>
              )}
            </div>

            {/* Metrics Breakdown Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-white p-3 rounded-xl border border-neutral-200">
                <div className="text-[10px] text-neutral-400 font-semibold uppercase">Total Products Inspected</div>
                <div className="text-lg font-black text-neutral-900 font-mono mt-0.5">
                  {profile.totalViews} items
                </div>
              </div>

              <div className="bg-white p-3 rounded-xl border border-neutral-200">
                <div className="text-[10px] text-neutral-400 font-semibold uppercase">Primary Category Interest</div>
                <div className="text-xs font-bold text-neutral-900 truncate mt-1">
                  {favoriteCategoryMeta?.name || 'Exploring Catalog'}
                </div>
              </div>

              <div className="bg-white p-3 rounded-xl border border-neutral-200">
                <div className="text-[10px] text-neutral-400 font-semibold uppercase">Target Budget Range</div>
                <div className="text-xs font-bold text-red-600 font-mono mt-1">
                  {profile.averagePriceBDT > 0 ? formatBDT(profile.averagePriceBDT) : 'Calibrating...'}
                </div>
              </div>

              <div className="bg-white p-3 rounded-xl border border-neutral-200">
                <div className="text-[10px] text-neutral-400 font-semibold uppercase">Wishlist Influence</div>
                <div className="text-xs font-bold text-emerald-600 font-mono mt-1">
                  +{wishlist.length * 30} pts affinity
                </div>
              </div>
            </div>

            {/* Quick Persona Simulator: Try Audio, Smart Home, Watches */}
            <div className="pt-2 border-t border-neutral-200/70 flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
                Simulate Taste Profile:
              </span>
              <button
                onClick={() => handleSimulatePersona('audio')}
                className="px-2.5 py-1 bg-white hover:bg-neutral-100 text-neutral-800 text-xs font-semibold rounded-lg border border-neutral-300 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Headphones className="w-3.5 h-3.5 text-blue-600" />
                <span>Audiophile (ANC & Hi-Fi)</span>
              </button>
              <button
                onClick={() => handleSimulatePersona('lighting')}
                className="px-2.5 py-1 bg-white hover:bg-neutral-100 text-neutral-800 text-xs font-semibold rounded-lg border border-neutral-300 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                <span>Smart Home & Lighting</span>
              </button>
              <button
                onClick={() => handleSimulatePersona('watches')}
                className="px-2.5 py-1 bg-white hover:bg-neutral-100 text-neutral-800 text-xs font-semibold rounded-lg border border-neutral-300 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Watch className="w-3.5 h-3.5 text-neutral-800" />
                <span>Horology & Watches</span>
              </button>
              <button
                onClick={() => handleSimulatePersona('furniture')}
                className="px-2.5 py-1 bg-white hover:bg-neutral-100 text-neutral-800 text-xs font-semibold rounded-lg border border-neutral-300 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Armchair className="w-3.5 h-3.5 text-emerald-600" />
                <span>Interior Living</span>
              </button>
            </div>
          </div>
        )}

        {/* Recently Viewed Items Horizontal Shelf */}
        {recentlyViewed.length > 0 && showRecentlyViewed && (
          <div className="bg-neutral-50/70 rounded-2xl border border-neutral-200/80 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-neutral-900">
                <Clock className="w-4 h-4 text-neutral-500" />
                <span>Recently Viewed by You ({recentlyViewed.length})</span>
                <span className="text-[11px] font-normal text-neutral-500 hidden sm:inline">
                  — Fueling the recommendation engine below
                </span>
              </div>
              <button
                onClick={() => setShowRecentlyViewed(false)}
                className="text-[11px] text-neutral-400 hover:text-neutral-700 cursor-pointer"
              >
                Collapse
              </button>
            </div>

            {/* Horizontal Mini Cards List */}
            <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-thin">
              {recentlyViewed.map(({ product, historyItem }) => (
                <div
                  key={product.id}
                  onClick={() => onSelectProduct(product)}
                  className="group shrink-0 w-44 bg-white rounded-xl border border-neutral-200/90 hover:border-neutral-400 p-2 transition-all cursor-pointer shadow-2xs flex flex-col justify-between"
                >
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-neutral-100 mb-1.5">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeProductFromHistory(product.id);
                        setHistoryKey((prev) => prev + 1);
                      }}
                      title="Remove from history"
                      className="absolute top-1 right-1 w-5 h-5 bg-neutral-950/70 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-[10px] opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </div>

                  <div className="space-y-0.5">
                    <h5 className="text-[11px] font-bold text-neutral-900 truncate group-hover:text-red-600 transition-colors">
                      {product.name}
                    </h5>
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-mono font-bold text-red-600">
                        {formatBDT(product.priceBDT)}
                      </span>
                      <span className="text-neutral-400">
                        {historyItem.viewCount > 1 ? `${historyItem.viewCount} views` : 'Viewed'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Filter Sub-Tabs for Recommendation Stream */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs font-bold">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer whitespace-nowrap ${
                activeFilter === 'all'
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              All Recommended ({recommendations.length})
            </button>
            <button
              onClick={() => setActiveFilter('high_match')}
              className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer whitespace-nowrap ${
                activeFilter === 'high_match'
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              High Affinity (90%+ Match)
            </button>
            <button
              onClick={() => setActiveFilter('similar')}
              className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer whitespace-nowrap ${
                activeFilter === 'similar'
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              Similar to Viewed Items
            </button>
            {profile.averagePriceBDT > 0 && (
              <button
                onClick={() => setActiveFilter('budget')}
                className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer whitespace-nowrap ${
                  activeFilter === 'budget'
                    ? 'bg-neutral-900 text-white shadow-xs'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                Budget Friendly (≤ {formatBDT(Math.round(profile.averagePriceBDT * 1.15))})
              </button>
            )}
          </div>

          <div className="text-[11px] text-neutral-400 self-end sm:self-auto">
            Showing {filteredRecommendations.length} tailored selections
          </div>
        </div>

        {/* Recommendations Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {filteredRecommendations.map((rec) => {
            const { product, matchPercentage, badgeText, primaryReason } = rec;
            const savings = product.originalPriceBDT - product.priceBDT;
            const isFavoriteCat = product.category === profile.favoriteCategory;

            return (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="group bg-white rounded-2xl border border-neutral-200/90 hover:border-red-500/80 hover:shadow-xl transition-all duration-300 p-3 flex flex-col justify-between cursor-pointer relative overflow-hidden"
              >
                {/* Top Heuristic Match Badge */}
                <div className="mb-2 flex items-center justify-between gap-1.5">
                  <div className="flex items-center gap-1 bg-red-50 text-red-700 px-2 py-0.5 rounded-md text-[10px] font-black border border-red-200/60">
                    <Sparkles className="w-3 h-3 text-red-600 fill-red-600" />
                    <span>{matchPercentage}% Match</span>
                  </div>
                  <span className="text-[10px] font-semibold text-neutral-500 truncate max-w-[120px]" title={badgeText}>
                    {badgeText}
                  </span>
                </div>

                {/* Product Image Stage */}
                <div className="relative aspect-square rounded-xl overflow-hidden bg-neutral-100 mb-2.5">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Discount percentage tag */}
                  <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded shadow-xs">
                    -{product.discountPercent}%
                  </span>

                  {/* Choice or Flash sale tag */}
                  {product.isChoice && (
                    <span className="absolute bottom-2 left-2 bg-amber-400 text-neutral-950 text-[9px] font-black px-1.5 py-0.5 rounded shadow-2xs">
                      CHOICE
                    </span>
                  )}

                  {/* Multi-Photo Count */}
                  <span className="absolute top-2 right-2 bg-neutral-950/70 backdrop-blur-xs text-white text-[9px] font-mono px-1.5 py-0.5 rounded">
                    {product.images?.length || 1} photos
                  </span>
                </div>

                {/* Content & Heuristic Explanation */}
                <div className="space-y-1.5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Social Rating & Orders */}
                    <div className="flex items-center gap-1.5 text-[11px] text-neutral-500 mb-1">
                      <div className="flex items-center text-amber-500 font-bold">
                        <Star className="w-3 h-3 fill-current" />
                        <span className="ml-0.5">{product.rating}</span>
                      </div>
                      <span>•</span>
                      <span>{product.ordersCount}+ sold</span>
                    </div>

                    {/* Product Name */}
                    <h3 className="text-xs font-bold text-neutral-900 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug">
                      {product.name}
                    </h3>

                    {/* Transparent Heuristic Reason Pill */}
                    <p className="mt-1 text-[10px] text-neutral-500 bg-neutral-50 px-2 py-1 rounded-md line-clamp-1 border border-neutral-100">
                      💡 {primaryReason}
                    </p>
                  </div>

                  {/* Pricing Stage */}
                  <div className="pt-2">
                    <div className="flex items-baseline gap-1.5 font-mono tabular-nums">
                      <span className="text-base font-black text-red-600">
                        {formatBDT(product.priceBDT)}
                      </span>
                      <span className="text-xs text-neutral-400 line-through">
                        {formatBDT(product.originalPriceBDT)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-emerald-700 font-medium mt-0.5">
                      <span>Free Express Shipping</span>
                      <span className="font-bold">Save {formatBDT(savings)}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Action Buttons: Add to Bag + Buy Now */}
                <div className="pt-3 grid grid-cols-2 gap-2 mt-auto" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={(e) => handleAddToCart(product, e)}
                    className="py-2 px-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                  <button
                    onClick={() => onBuyNow(product)}
                    className="py-2 px-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-1 cursor-pointer shadow-xs"
                  >
                    <Zap className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                    <span>Buy Now</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Cold-Start / Empty State for Filter */}
        {filteredRecommendations.length === 0 && (
          <div className="text-center py-12 bg-neutral-50 rounded-2xl border border-dashed border-neutral-300 space-y-3">
            <Compass className="w-8 h-8 text-neutral-400 mx-auto" />
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-neutral-900">No products match this specific filter</h4>
              <p className="text-[11px] text-neutral-500">
                Switch back to &ldquo;All Recommended&rdquo; or explore new categories to expand your heuristic profile.
              </p>
            </div>
            <button
              onClick={() => setActiveFilter('all')}
              className="px-4 py-2 bg-neutral-950 text-white text-xs font-bold rounded-xl cursor-pointer"
            >
              Reset Filter
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
