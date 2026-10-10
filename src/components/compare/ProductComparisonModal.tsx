import React, { useState, useMemo } from 'react';
import { 
  Scale, X, ShoppingBag, Zap, Star, ShieldCheck, Check, 
  Trash2, Plus, Sparkles, Trophy, ArrowRight, Eye, CheckCircle2 
} from 'lucide-react';
import { Product, PageRoute } from '../../types';
import { useCompare } from '../../context/CompareContext';
import { useCart } from '../../context/CartContext';
import { formatBDT } from '../../utils/formatters';
import { PRODUCTS_CATALOG } from '../../data/products';

interface ProductComparisonModalProps {
  onSelectProduct: (product: Product) => void;
  onBuyNow: (product: Product) => void;
  onNavigate: (page: PageRoute) => void;
}

export const ProductComparisonModal: React.FC<ProductComparisonModalProps> = ({
  onSelectProduct,
  onBuyNow,
  onNavigate,
}) => {
  const { 
    comparedProducts, 
    removeFromCompare, 
    clearCompare, 
    isCompareModalOpen, 
    closeCompareModal,
    addToCompare 
  } = useCompare();

  const { addItem } = useCart();
  const [highlightDifferences, setHighlightDifferences] = useState(false);
  const [addedToastId, setAddedToastId] = useState<string | null>(null);

  // Compute union of all technical spec keys
  const allSpecKeys = useMemo(() => {
    const keysSet = new Set<string>();
    comparedProducts.forEach((p) => {
      if (p.specifications) {
        Object.keys(p.specifications).forEach((k) => keysSet.add(k));
      }
    });
    return Array.from(keysSet);
  }, [comparedProducts]);

  // Compute best value pick based on score (rating * discount / price ratio)
  const bestValueProductId = useMemo(() => {
    if (comparedProducts.length === 0) return null;
    let bestId = comparedProducts[0].id;
    let highestScore = -Infinity;

    comparedProducts.forEach((p) => {
      // Score: normalized rating (out of 5) + discount factor + reviews volume factor
      const score = (p.rating * 20) + (p.discountPercent * 0.8) + Math.min(20, p.reviewsCount / 10);
      if (score > highestScore) {
        highestScore = score;
        bestId = p.id;
      }
    });

    return bestId;
  }, [comparedProducts]);

  // Suggestions to fill remaining slots (from same categories)
  const suggestions = useMemo(() => {
    if (comparedProducts.length >= 4) return [];
    const categories = new Set(comparedProducts.map((p) => p.category));
    return PRODUCTS_CATALOG.filter(
      (p) => categories.has(p.category) && !comparedProducts.some((c) => c.id === p.id)
    ).slice(0, 3);
  }, [comparedProducts]);

  if (!isCompareModalOpen) return null;

  const handleAddToCart = (product: Product) => {
    addItem(product, product.colors[0], product.specsVariants?.[0], 1);
    setAddedToastId(product.id);
    setTimeout(() => setAddedToastId(null), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={closeCompareModal}
    >
      <div 
        className="bg-white rounded-3xl max-w-6xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-neutral-200 overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-neutral-950 via-neutral-900 to-rose-950 text-white flex items-center justify-between border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-red-600/30 text-red-400 rounded-xl border border-red-500/40">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm sm:text-base tracking-tight">
                  Product Comparison Matrix
                </h3>
                <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full font-mono">
                  {comparedProducts.length} of 4 Products
                </span>
              </div>
              <p className="text-xs text-neutral-400 hidden sm:block">
                Side-by-side technical specifications, pricing in BDT, and buyer satisfaction
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Toggle Highlight Differences */}
            <label className="hidden md:flex items-center gap-2 text-xs text-neutral-300 bg-white/10 px-3 py-1.5 rounded-xl cursor-pointer hover:bg-white/15 transition-colors">
              <input
                type="checkbox"
                checked={highlightDifferences}
                onChange={(e) => setHighlightDifferences(e.target.checked)}
                className="accent-red-600 rounded cursor-pointer"
              />
              <span>Highlight Differences</span>
            </label>

            <button
              type="button"
              onClick={clearCompare}
              className="text-xs text-neutral-400 hover:text-red-400 px-2.5 py-1.5 hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
            >
              Clear All
            </button>

            <button
              type="button"
              onClick={closeCompareModal}
              className="p-1.5 text-neutral-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Empty State */}
        {comparedProducts.length === 0 ? (
          <div className="p-12 text-center space-y-4">
            <Scale className="w-12 h-12 mx-auto text-neutral-300" />
            <h4 className="text-sm font-bold text-neutral-800">No products in comparison</h4>
            <p className="text-xs text-neutral-500 max-w-sm mx-auto">
              Click the "Compare" button on any product card or detail page to inspect items side by side.
            </p>
            <button
              type="button"
              onClick={() => {
                closeCompareModal();
                onNavigate('home');
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-bold hover:bg-red-700 transition-colors cursor-pointer"
            >
              Explore Catalog
            </button>
          </div>
        ) : (
          /* Table / Grid Matrix */
          <div className="flex-1 overflow-auto p-4 sm:p-6">
            <div className="min-w-[640px]">
              {/* Product Cards Row */}
              <div 
                className="grid gap-4 pb-6 border-b border-neutral-200"
                style={{ 
                  gridTemplateColumns: `180px repeat(${comparedProducts.length}, minmax(180px, 1fr))` 
                }}
              >
                {/* Blank Corner Cell */}
                <div className="flex flex-col justify-end p-2 text-xs font-bold text-neutral-400 uppercase tracking-wider">
                  Product Overview
                </div>

                {/* Product Headers */}
                {comparedProducts.map((product) => {
                  const isBestValue = product.id === bestValueProductId;
                  return (
                    <div 
                      key={product.id}
                      className={`relative p-3.5 rounded-2xl border transition-all flex flex-col justify-between ${
                        isBestValue 
                          ? 'border-amber-400 bg-amber-50/40 shadow-xs' 
                          : 'border-neutral-200 bg-neutral-50/60'
                      }`}
                    >
                      {/* Best Value Badge */}
                      {isBestValue && (
                        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-amber-500 text-neutral-950 font-extrabold text-[10px] px-2.5 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                          <Trophy className="w-3 h-3" />
                          <span>BEST VALUE PICK</span>
                        </div>
                      )}

                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={() => removeFromCompare(product.id)}
                        className="absolute top-2 right-2 p-1 text-neutral-400 hover:text-red-600 hover:bg-white rounded-lg transition-colors cursor-pointer"
                        title="Remove product"
                      >
                        <X className="w-4 h-4" />
                      </button>

                      {/* Image & Title */}
                      <div>
                        <div className="w-full h-32 rounded-xl overflow-hidden bg-white border border-neutral-200 mb-2.5">
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>

                        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
                          {product.subcategory}
                        </span>

                        <h4 
                          onClick={() => {
                            onSelectProduct(product);
                            closeCompareModal();
                          }}
                          className="text-xs font-bold text-neutral-900 hover:text-red-600 cursor-pointer transition-colors line-clamp-2 mt-0.5"
                          title={product.name}
                        >
                          {product.name}
                        </h4>
                      </div>

                      {/* Actions */}
                      <div className="mt-3 pt-3 border-t border-neutral-200/80 space-y-1.5">
                        <button
                          type="button"
                          onClick={() => handleAddToCart(product)}
                          className={`w-full py-1.5 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer border ${
                            addedToastId === product.id
                              ? 'bg-emerald-600 text-white border-emerald-600'
                              : 'bg-white hover:bg-neutral-100 text-neutral-800 border-neutral-300'
                          }`}
                        >
                          {addedToastId === product.id ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Added!</span>
                            </>
                          ) : (
                            <>
                              <ShoppingBag className="w-3.5 h-3.5" />
                              <span>Add to Bag</span>
                            </>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            onBuyNow(product);
                            closeCompareModal();
                          }}
                          className="w-full py-1.5 px-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-all shadow-xs cursor-pointer active:scale-98"
                        >
                          <Zap className="w-3 h-3 fill-white text-white" />
                          <span>Buy Now</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Specification Comparison Rows */}
              <div className="divide-y divide-neutral-100 text-xs">
                {/* 1. Price Row */}
                <div 
                  className="grid py-3 items-center"
                  style={{ 
                    gridTemplateColumns: `180px repeat(${comparedProducts.length}, minmax(180px, 1fr))` 
                  }}
                >
                  <div className="font-bold text-neutral-700">Price in BDT</div>
                  {comparedProducts.map((p) => {
                    const isLowest = p.priceBDT === Math.min(...comparedProducts.map((x) => x.priceBDT));
                    return (
                      <div key={p.id} className="px-3">
                        <span className={`font-mono font-bold text-sm ${isLowest ? 'text-emerald-700 font-extrabold' : 'text-neutral-900'}`}>
                          {formatBDT(p.priceBDT)}
                        </span>
                        {isLowest && (
                          <span className="block text-[10px] text-emerald-700 font-bold">Lowest Price</span>
                        )}
                        <span className="text-[10px] text-neutral-400 line-through font-mono block">
                          {formatBDT(p.originalPriceBDT)}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* 2. Discount % */}
                <div 
                  className="grid py-3 items-center"
                  style={{ 
                    gridTemplateColumns: `180px repeat(${comparedProducts.length}, minmax(180px, 1fr))` 
                  }}
                >
                  <div className="font-bold text-neutral-700">Discount Offered</div>
                  {comparedProducts.map((p) => (
                    <div key={p.id} className="px-3">
                      <span className="font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-md border border-red-200">
                        {p.discountPercent}% OFF
                      </span>
                    </div>
                  ))}
                </div>

                {/* 3. Rating & Reviews */}
                <div 
                  className="grid py-3 items-center"
                  style={{ 
                    gridTemplateColumns: `180px repeat(${comparedProducts.length}, minmax(180px, 1fr))` 
                  }}
                >
                  <div className="font-bold text-neutral-700">Rating & Reviews</div>
                  {comparedProducts.map((p) => (
                    <div key={p.id} className="px-3 space-y-0.5">
                      <div className="flex items-center gap-1 text-amber-500 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span className="text-neutral-900">{p.rating} / 5.0</span>
                      </div>
                      <span className="text-[11px] text-neutral-500 block">
                        {p.reviewsCount} customer reviews
                      </span>
                    </div>
                  ))}
                </div>

                {/* 4. Stock & Availability */}
                <div 
                  className="grid py-3 items-center"
                  style={{ 
                    gridTemplateColumns: `180px repeat(${comparedProducts.length}, minmax(180px, 1fr))` 
                  }}
                >
                  <div className="font-bold text-neutral-700">Stock Status</div>
                  {comparedProducts.map((p) => (
                    <div key={p.id} className="px-3">
                      {p.inStock ? (
                        <span className="text-emerald-700 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>In Stock ({p.stockCount} units)</span>
                        </span>
                      ) : (
                        <span className="text-red-600 font-bold">Out of Stock</span>
                      )}
                    </div>
                  ))}
                </div>

                {/* 5. Shipping & Courier Days */}
                <div 
                  className="grid py-3 items-center"
                  style={{ 
                    gridTemplateColumns: `180px repeat(${comparedProducts.length}, minmax(180px, 1fr))` 
                  }}
                >
                  <div className="font-bold text-neutral-700">Nationwide Delivery</div>
                  {comparedProducts.map((p) => (
                    <div key={p.id} className="px-3 text-neutral-800">
                      <span className="font-medium">Within {p.estimatedDeliveryDays} Days</span>
                      <span className="block text-[11px] text-neutral-500">
                        {p.freeShipping ? 'Free Delivery' : 'Standard ৳60 Dhaka'}
                      </span>
                    </div>
                  ))}
                </div>

                {/* 6. Official Warranty */}
                <div 
                  className="grid py-3 items-center"
                  style={{ 
                    gridTemplateColumns: `180px repeat(${comparedProducts.length}, minmax(180px, 1fr))` 
                  }}
                >
                  <div className="font-bold text-neutral-700">Warranty Coverage</div>
                  {comparedProducts.map((p) => (
                    <div key={p.id} className="px-3 text-neutral-800">
                      <span className="font-medium">{p.warranty}</span>
                    </div>
                  ))}
                </div>

                {/* 7. Country of Origin */}
                <div 
                  className="grid py-3 items-center"
                  style={{ 
                    gridTemplateColumns: `180px repeat(${comparedProducts.length}, minmax(180px, 1fr))` 
                  }}
                >
                  <div className="font-bold text-neutral-700">Origin / Manufacture</div>
                  {comparedProducts.map((p) => (
                    <div key={p.id} className="px-3 text-neutral-800">
                      <span>{p.origin}</span>
                    </div>
                  ))}
                </div>

                {/* 8. Dynamic Technical Specifications */}
                {allSpecKeys.map((specKey) => {
                  const values = comparedProducts.map((p) => p.specifications?.[specKey] || '—');
                  const isDifferent = new Set(values).size > 1;

                  if (highlightDifferences && !isDifferent) return null;

                  return (
                    <div 
                      key={specKey}
                      className={`grid py-3 items-center transition-colors ${
                        isDifferent && highlightDifferences ? 'bg-amber-50/50' : ''
                      }`}
                      style={{ 
                        gridTemplateColumns: `180px repeat(${comparedProducts.length}, minmax(180px, 1fr))` 
                      }}
                    >
                      <div className="font-bold text-neutral-700">
                        {specKey}
                        {isDifferent && highlightDifferences && (
                          <span className="ml-1 text-[9px] text-amber-700 bg-amber-100 px-1 py-0.2 rounded font-mono">
                            Diff
                          </span>
                        )}
                      </div>
                      {comparedProducts.map((p) => (
                        <div key={p.id} className="px-3 text-neutral-800">
                          <span>{p.specifications?.[specKey] || '—'}</span>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>

              {/* Suggestions to Add More */}
              {suggestions.length > 0 && comparedProducts.length < 4 && (
                <div className="mt-6 pt-6 border-t border-neutral-200">
                  <h5 className="text-xs font-bold text-neutral-700 mb-3 flex items-center gap-1.5">
                    <Plus className="w-3.5 h-3.5 text-red-600" />
                    <span>Add Similar Products to Compare ({4 - comparedProducts.length} slots open):</span>
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {suggestions.map((p) => (
                      <div
                        key={p.id}
                        className="p-2.5 bg-neutral-50 rounded-xl border border-neutral-200 flex items-center justify-between gap-2.5"
                      >
                        <img
                          src={p.imageUrl}
                          alt={p.name}
                          className="w-10 h-10 rounded-lg object-cover border border-neutral-200 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-[11px] font-bold text-neutral-900 truncate">
                            {p.name}
                          </p>
                          <span className="text-[11px] font-mono text-neutral-600 font-bold">
                            {formatBDT(p.priceBDT)}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => addToCompare(p)}
                          className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg text-[10px] font-bold transition-colors cursor-pointer shrink-0"
                        >
                          + Add
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="p-3.5 bg-neutral-50 border-t border-neutral-200 flex items-center justify-between text-xs text-neutral-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Specifications directly verified against official manufacturer data sheets</span>
          </div>
          <button
            type="button"
            onClick={closeCompareModal}
            className="px-4 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            Close Matrix
          </button>
        </div>
      </div>
    </div>
  );
};
