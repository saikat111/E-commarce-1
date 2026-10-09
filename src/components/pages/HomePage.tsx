import React, { useState, useEffect } from 'react';
import { 
  Flame, Sparkles, ChevronRight, Clock, Zap, ArrowRight, ShieldCheck, 
  Truck, Gift, Coins, Check, Star, ShoppingBag, Eye, Trophy, Tag, Award 
} from 'lucide-react';
import { Product, ProductCategory, PageRoute } from '../../types';
import { CATEGORIES_METADATA } from '../../data/products';
import { formatBDT } from '../../utils/formatters';
import { useCart } from '../../context/CartContext';
import { RecommendedForYou } from '../home/RecommendedForYou';

interface HomePageProps {
  products: Product[];
  onNavigate: (page: PageRoute, category?: ProductCategory, productId?: string) => void;
  onSelectProduct: (product: Product) => void;
  onBuyNow: (product: Product) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  products,
  onNavigate,
  onSelectProduct,
  onBuyNow,
}) => {
  const { addItem } = useCart();
  const [activeSlide, setActiveSlide] = useState(0);
  const [countdown, setCountdown] = useState({ hours: 14, minutes: 28, seconds: 45 });
  const [activeTab, setActiveTab] = useState<ProductCategory>('all');
  const [activeCampaignTab, setActiveCampaignTab] = useState<'all' | 'flash' | 'featured' | 'bestseller' | 'bestdiscount'>('all');
  const [checkedInCoins, setCheckedInCoins] = useState(false);

  // Live Flash Sale Countdown Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Hero Slider data with BDT offers
  const heroSlides = [
    {
      title: 'Global Tech & Audio Carnival',
      subtitle: 'Premium Hybrid ANC Headphones & Hi-Fi Totems',
      offer: 'Up to 40% OFF + Extra ৳500 with ALIBD500',
      category: 'electronics_audio' as ProductCategory,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1400&q=85',
      ctaText: 'Shop Electronics',
    },
    {
      title: 'Architectural Lighting & Smart Living',
      subtitle: 'Unlacquered Brass Sconces & Dimmable Ambient Lamps',
      offer: 'Flash Deals Starting from ৳1,250',
      category: 'smart_lighting' as ProductCategory,
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85',
      ctaText: 'Discover Lighting',
    },
    {
      title: 'Titanium Timepieces & Automatic Horology',
      subtitle: 'Grade 5 Titanium & Sapphire Crystal Watches',
      offer: 'Free Express Shipping Across Bangladesh',
      category: 'fashion_watches' as ProductCategory,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1400&q=85',
      ctaText: 'Explore Watches',
    },
  ];

  // Specific collections for Flash Sell, Featured, Best Sell, and Best Discount
  const flashSaleProducts = products.filter((p) => p.isFlashSale).slice(0, 6);
  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 6);
  const bestSellerProducts = products.filter((p) => p.isBestSeller).sort((a, b) => (a.bestSellerRank || 99) - (b.bestSellerRank || 99)).slice(0, 6);
  const bestDiscountProducts = products.filter((p) => p.isBestDiscount || p.discountPercent >= 45).sort((a, b) => b.discountPercent - a.discountPercent).slice(0, 6);
  
  // Choice showcase products with campaign filtering
  const choiceProducts = products.filter((p) => {
    if (activeTab !== 'all' && p.category !== activeTab) return false;
    if (activeCampaignTab === 'flash') return p.isFlashSale;
    if (activeCampaignTab === 'featured') return p.isFeatured;
    if (activeCampaignTab === 'bestseller') return p.isBestSeller;
    if (activeCampaignTab === 'bestdiscount') return p.isBestDiscount || p.discountPercent >= 45;
    return true;
  }).slice(0, 8);

  return (
    <div className="space-y-10 pb-16">
      
      {/* 1. AliExpress-Style Mega Hero Section (Categories Sidebar + Main Banner + User Perks Card) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
          
          {/* Left: Department Categories Vertical Sidebar */}
          <div className="hidden lg:block lg:col-span-3 bg-white rounded-2xl border border-neutral-200/90 shadow-2xs p-3">
            <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider px-3 py-2 border-b border-neutral-100">
              Popular Categories
            </div>
            <div className="space-y-1 pt-2">
              {CATEGORIES_METADATA.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => onNavigate('category', cat.id)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-neutral-700 hover:bg-red-50 hover:text-red-600 transition-colors text-left group cursor-pointer"
                >
                  <span className="truncate">{cat.name}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-red-600 group-hover:translate-x-0.5 transition-all" />
                </button>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-neutral-100 bg-neutral-50 rounded-xl p-3 text-center">
              <span className="text-[11px] font-bold text-red-600 uppercase tracking-wide block">
                Bangladesh Choice Hub
              </span>
              <p className="text-[10px] text-neutral-500 mt-0.5">
                Fast delivery to all 64 districts in Bangladesh
              </p>
            </div>
          </div>

          {/* Center: Main Banner Slider with BDT Offers */}
          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden min-h-[380px] sm:min-h-[440px] flex flex-col justify-between p-6 sm:p-8 bg-neutral-950 text-white shadow-md">
            {/* Background Image Carousel with Scrim */}
            <div className="absolute inset-0 z-0">
              <img
                src={heroSlides[activeSlide].image}
                alt={heroSlides[activeSlide].title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/95 via-neutral-950/60 to-neutral-950/20" />
            </div>

            {/* Top Offer Badge */}
            <div className="relative z-10 flex items-center gap-2">
              <span className="bg-red-600 text-white text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md animate-pulse">
                SUPERDEALS IN BDT
              </span>
              <span className="bg-neutral-900/80 backdrop-blur-md text-amber-300 text-xs font-semibold px-3 py-1 rounded-full border border-neutral-700">
                {heroSlides[activeSlide].offer}
              </span>
            </div>

            {/* Slide Title & Action */}
            <div className="relative z-10 space-y-3 max-w-lg mt-auto">
              <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight">
                {heroSlides[activeSlide].title}
              </h1>
              <p className="text-xs sm:text-sm text-neutral-200 line-clamp-2">
                {heroSlides[activeSlide].subtitle}
              </p>
              
              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() => onNavigate('category', heroSlides[activeSlide].category)}
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-lg cursor-pointer flex items-center gap-2"
                >
                  <span>{heroSlides[activeSlide].ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigate('category', 'all')}
                  className="px-4 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  All SuperDeals
                </button>
              </div>
            </div>

            {/* Slider Dots */}
            <div className="relative z-10 flex items-center gap-2 pt-4">
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveSlide(i)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    i === activeSlide ? 'w-8 bg-red-600' : 'w-2 bg-white/50'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right: AliExpress-Style Welcome Card & Daily Coins Check-In */}
          <div className="lg:col-span-3 flex flex-col justify-between gap-3">
            
            {/* User Welcome Box */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-200/80 p-5 shadow-2xs space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                  BD
                </div>
                <div>
                  <h4 className="text-xs font-bold text-neutral-900">Welcome to Nexus Bazaar</h4>
                  <p className="text-[11px] text-neutral-600">Exclusive savings for Bangladesh</p>
                </div>
              </div>

              {/* Welcome Discount Coupon */}
              <div className="p-3 bg-white rounded-xl border border-dashed border-red-300 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-neutral-500 font-semibold uppercase">First Order Coupon</div>
                  <div className="text-base font-black text-red-600 font-mono">৳500 OFF</div>
                </div>
                <span className="text-[10px] bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded">
                  ALIBD500
                </span>
              </div>

              {/* Daily Coins Bonus Button */}
              <button
                onClick={() => setCheckedInCoins(true)}
                disabled={checkedInCoins}
                className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs ${
                  checkedInCoins
                    ? 'bg-emerald-600 text-white'
                    : 'bg-amber-400 hover:bg-amber-500 text-neutral-950'
                }`}
              >
                <Coins className="w-4 h-4" />
                <span>{checkedInCoins ? 'Collected +50 Daily Coins!' : 'Claim Daily Coins (+50)'}</span>
              </button>
            </div>

            {/* Fast BD Delivery Guarantee Card */}
            <div className="bg-white rounded-2xl border border-neutral-200/90 p-4 shadow-2xs space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-neutral-900">
                <Truck className="w-4 h-4 text-emerald-600" />
                <span>Guaranteed Delivery</span>
              </div>
              <p className="text-[11px] text-neutral-500 leading-relaxed">
                Free shipping inside Bangladesh on orders over <strong>৳2,500</strong>. Real-time SMS tracking provided.
              </p>
              <div className="pt-1 flex items-center gap-2 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded">
                <Check className="w-3.5 h-3.5" />
                <span>Cash on Delivery (COD) & bKash Available</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 2. SuperDeals Flash Sale (Flash Sell) Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-6 space-y-6">
          
          {/* Header Row: Flame Icon + Live Countdown */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-md animate-pulse">
                <Flame className="w-6 h-6 fill-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-black text-neutral-950 uppercase tracking-tight">
                    Flash Sale · Flash Sell
                  </h2>
                  <span className="bg-red-100 text-red-600 text-[11px] font-bold px-2 py-0.5 rounded-full">
                    UP TO 45% OFF
                  </span>
                </div>
                <p className="text-xs text-neutral-500">Limited quantities in BDT refreshed daily with express Dhaka dispatch</p>
              </div>
            </div>

            {/* Live Countdown Timer */}
            <div className="flex items-center gap-2 text-xs font-bold">
              <span className="text-neutral-500">Flash Sell Ends In:</span>
              <div className="flex items-center gap-1 font-mono text-white">
                <span className="bg-neutral-950 px-2 py-1 rounded-md">{String(countdown.hours).padStart(2, '0')}h</span>
                <span className="text-neutral-950">:</span>
                <span className="bg-neutral-950 px-2 py-1 rounded-md">{String(countdown.minutes).padStart(2, '0')}m</span>
                <span className="text-neutral-950">:</span>
                <span className="bg-red-600 px-2 py-1 rounded-md">{String(countdown.seconds).padStart(2, '0')}s</span>
              </div>
            </div>
          </div>

          {/* Flash Sale Products Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {flashSaleProducts.map((product) => {
              const claimed = product.claimedPercent || 78;
              return (
                <div
                  key={product.id}
                  onClick={() => onSelectProduct(product)}
                  className="group bg-neutral-50 hover:bg-white rounded-xl border border-neutral-200/80 hover:border-red-400 hover:shadow-md transition-all p-2.5 flex flex-col justify-between cursor-pointer"
                >
                  {/* Image & Discount Tag */}
                  <div className="relative aspect-square rounded-lg overflow-hidden bg-neutral-200 mb-2">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-1 left-1 bg-red-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded shadow-xs">
                      -{product.discountPercent}%
                    </span>
                    <span className="absolute top-1 right-1 bg-neutral-900/80 text-white text-[9px] font-mono px-1 py-0.5 rounded">
                      {product.images.length} Photos
                    </span>
                  </div>

                  {/* Info */}
                  <div className="space-y-1">
                    <h3 className="text-xs font-semibold text-neutral-900 line-clamp-1 group-hover:text-red-600 transition-colors">
                      {product.name}
                    </h3>
                    
                    {/* Price in BDT */}
                    <div className="flex items-baseline gap-1.5 font-mono tabular-nums">
                      <span className="text-sm font-black text-red-600">
                        {formatBDT(product.priceBDT)}
                      </span>
                      <span className="text-[10px] text-neutral-400 line-through">
                        {formatBDT(product.originalPriceBDT)}
                      </span>
                    </div>

                    {/* Claimed Progress Bar */}
                    <div className="space-y-1 pt-1">
                      <div className="w-full bg-neutral-200 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-red-600 h-full rounded-full transition-all" 
                          style={{ width: `${claimed}%` }} 
                        />
                      </div>
                      <div className="flex justify-between text-[10px] text-neutral-500 font-medium">
                        <span className="text-red-600 font-bold">{claimed}% Claimed</span>
                        <span>{product.stockCount} left</span>
                      </div>
                    </div>
                  </div>

                  {/* Instant Buy Now Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onBuyNow(product);
                    }}
                    className="mt-2 w-full py-1.5 bg-neutral-900 hover:bg-red-600 text-white text-[11px] font-bold rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Zap className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>Buy Now</span>
                  </button>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 3. Best Sellers (Best Sell) Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-900 via-neutral-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400 text-neutral-950 flex items-center justify-center shadow-md">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                    Best Sellers · Top Sold
                  </h2>
                  <span className="bg-amber-400 text-neutral-950 text-[11px] font-black px-2 py-0.5 rounded-full">
                    RANKED #1 IN BD
                  </span>
                </div>
                <p className="text-xs text-neutral-300">Most purchased items by 10,000+ shoppers in Dhaka & nationwide</p>
              </div>
            </div>

            <button
              onClick={() => onNavigate('category', 'all')}
              className="text-xs font-bold text-amber-400 hover:text-white flex items-center gap-1 cursor-pointer self-start sm:self-auto"
            >
              <span>View All Best Sellers</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Best Sellers Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {bestSellerProducts.map((product, idx) => (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="group bg-white/10 hover:bg-white text-white hover:text-neutral-900 rounded-2xl border border-white/15 hover:border-white p-3 flex flex-col justify-between transition-all duration-300 cursor-pointer"
              >
                <div className="relative aspect-square rounded-xl overflow-hidden bg-neutral-800 mb-2.5">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  {/* Rank Badge */}
                  <span className="absolute top-1 left-1 bg-amber-400 text-neutral-950 text-[10px] font-black px-1.5 py-0.5 rounded shadow-sm">
                    #{idx + 1} Best Seller
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-[10px] text-amber-400">
                    <Star className="w-3 h-3 fill-current" />
                    <span className="font-bold">{product.rating}</span>
                    <span className="text-neutral-400 group-hover:text-neutral-500">({product.ordersCount}+ sold)</span>
                  </div>

                  <h3 className="text-xs font-bold line-clamp-1">
                    {product.name}
                  </h3>

                  <div className="flex items-baseline gap-1.5 font-mono tabular-nums">
                    <span className="text-sm font-black text-red-500 group-hover:text-red-600">
                      {formatBDT(product.priceBDT)}
                    </span>
                    <span className="text-[10px] text-neutral-400 line-through">
                      {formatBDT(product.originalPriceBDT)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onBuyNow(product);
                  }}
                  className="mt-2.5 w-full py-1.5 bg-amber-400 hover:bg-amber-500 text-neutral-950 text-[11px] font-black rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Zap className="w-3 h-3 fill-neutral-950" />
                  <span>Buy Now</span>
                </button>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. Best Discount Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-neutral-200 p-6 sm:p-8 shadow-sm space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
                <Tag className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-black text-neutral-950 uppercase tracking-tight">
                    Best Discount Products
                  </h2>
                  <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2 py-0.5 rounded-full">
                    UP TO 55% MASSIVE PRICE DROP
                  </span>
                </div>
                <p className="text-xs text-neutral-500">Verified biggest discounts on authentic imported goods in BDT</p>
              </div>
            </div>

            <button
              onClick={() => onNavigate('category', 'all')}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 cursor-pointer self-start sm:self-auto"
            >
              <span>Explore High Discounts</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Best Discount Products Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {bestDiscountProducts.map((product) => {
              const savings = product.originalPriceBDT - product.priceBDT;
              return (
                <div
                  key={product.id}
                  onClick={() => onSelectProduct(product)}
                  className="group bg-neutral-50 hover:bg-white rounded-2xl border border-neutral-200/80 hover:border-emerald-500 hover:shadow-md transition-all p-3 flex flex-col justify-between cursor-pointer"
                >
                  <div className="relative aspect-square rounded-xl overflow-hidden bg-neutral-200 mb-2.5">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <span className="absolute top-1 left-1 bg-emerald-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded shadow-xs">
                      -{product.discountPercent}% OFF
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-xs font-bold text-neutral-900 line-clamp-1 group-hover:text-emerald-700 transition-colors">
                      {product.name}
                    </h3>

                    <div className="flex items-baseline gap-1.5 font-mono tabular-nums">
                      <span className="text-sm font-black text-emerald-700">
                        {formatBDT(product.priceBDT)}
                      </span>
                      <span className="text-[10px] text-neutral-400 line-through">
                        {formatBDT(product.originalPriceBDT)}
                      </span>
                    </div>

                    <div className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded inline-block">
                      Save {formatBDT(savings)}
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onBuyNow(product);
                    }}
                    className="mt-2.5 w-full py-1.5 bg-neutral-900 hover:bg-emerald-700 text-white text-[11px] font-bold rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Zap className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>Grab Deal</span>
                  </button>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 5. Personalized "Recommended for You" Feed (Heuristic Engine based on Browsing History & Recent Items) */}
      <RecommendedForYou
        products={products}
        onNavigate={onNavigate}
        onSelectProduct={onSelectProduct}
        onBuyNow={onBuyNow}
      />

      {/* 6. Featured Products & Nexus Choice Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          
          {/* Section Header with Campaign Filters & Category Tabs */}
          <div className="space-y-4 pb-4 border-b border-neutral-200">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="bg-amber-400 text-neutral-950 text-xs font-black px-2 py-0.5 rounded shadow-2xs">
                    CHOICE
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-neutral-950">
                    Featured Products & Nexus Choice
                  </h2>
                </div>
                <p className="text-xs text-neutral-500 mt-1">
                  Hand-picked verified architectural & consumer goods with 15-day returns in BDT
                </p>
              </div>

              {/* Campaign Filter Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
                <button
                  onClick={() => setActiveCampaignTab('all')}
                  className={`px-3 py-1.5 rounded-full font-bold whitespace-nowrap transition-colors cursor-pointer ${
                    activeCampaignTab === 'all' ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  All Curations
                </button>
                <button
                  onClick={() => setActiveCampaignTab('flash')}
                  className={`px-3 py-1.5 rounded-full font-bold whitespace-nowrap transition-colors cursor-pointer ${
                    activeCampaignTab === 'flash' ? 'bg-red-600 text-white' : 'bg-red-50 text-red-700 hover:bg-red-100'
                  }`}
                >
                  ⚡ Flash Sale
                </button>
                <button
                  onClick={() => setActiveCampaignTab('featured')}
                  className={`px-3 py-1.5 rounded-full font-bold whitespace-nowrap transition-colors cursor-pointer ${
                    activeCampaignTab === 'featured' ? 'bg-amber-400 text-neutral-950' : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
                  }`}
                >
                  ⭐ Featured
                </button>
                <button
                  onClick={() => setActiveCampaignTab('bestseller')}
                  className={`px-3 py-1.5 rounded-full font-bold whitespace-nowrap transition-colors cursor-pointer ${
                    activeCampaignTab === 'bestseller' ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                  }`}
                >
                  🏆 Best Sellers
                </button>
                <button
                  onClick={() => setActiveCampaignTab('bestdiscount')}
                  className={`px-3 py-1.5 rounded-full font-bold whitespace-nowrap transition-colors cursor-pointer ${
                    activeCampaignTab === 'bestdiscount' ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                  }`}
                >
                  🏷️ Best Discount
                </button>
              </div>
            </div>

            {/* Department Filter Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none text-xs">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1.5 font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'all'
                    ? 'bg-neutral-950 text-white shadow-xs'
                    : 'bg-white text-neutral-600 hover:text-neutral-950 border border-neutral-200'
                }`}
              >
                All Departments
              </button>
              {CATEGORIES_METADATA.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`px-3 py-1.5 font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    activeTab === cat.id
                      ? 'bg-neutral-950 text-white shadow-xs'
                      : 'bg-white text-neutral-600 hover:text-neutral-950 border border-neutral-200'
                  }`}
                >
                  {cat.shortName}
                </button>
              ))}
            </div>
          </div>

          {/* Choice Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {choiceProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="group bg-white rounded-2xl border border-neutral-200 hover:border-neutral-400 hover:shadow-lg transition-all duration-300 p-3 flex flex-col justify-between cursor-pointer"
              >
                {/* Image Stage */}
                <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-neutral-100 mb-3">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 flex flex-wrap items-center gap-1">
                    {product.isFlashSale && (
                      <span className="bg-red-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded shadow-2xs">
                        ⚡ Flash
                      </span>
                    )}
                    {product.isBestSeller && (
                      <span className="bg-blue-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded shadow-2xs">
                        🏆 #{product.bestSellerRank || 1}
                      </span>
                    )}
                    <span className="bg-amber-400 text-neutral-950 text-[10px] font-black px-1.5 py-0.5 rounded shadow-2xs">
                      Choice
                    </span>
                    {product.freeShipping && (
                      <span className="bg-emerald-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-2xs">
                        Free Ship
                      </span>
                    )}
                  </div>
                  <span className="absolute bottom-2 right-2 bg-neutral-900/80 text-white text-[9px] font-mono px-1.5 py-0.5 rounded">
                    {product.images.length} Photos
                  </span>
                </div>

                {/* Details */}
                <div className="space-y-2 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-[11px] text-neutral-500 font-medium">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="font-bold text-neutral-900">{product.rating}</span>
                      <span>·</span>
                      <span>{product.ordersCount}+ sold</span>
                    </div>

                    <h3 className="text-sm font-bold text-neutral-900 group-hover:text-red-600 transition-colors line-clamp-2">
                      {product.name}
                    </h3>

                    <p className="text-xs text-neutral-500 line-clamp-1">
                      {product.subtitle}
                    </p>
                  </div>

                  {/* Price Row */}
                  <div className="pt-2 border-t border-neutral-100 flex items-baseline justify-between font-mono tabular-nums">
                    <div>
                      <span className="text-base font-black text-neutral-950">
                        {formatBDT(product.priceBDT)}
                      </span>
                      <span className="text-xs text-neutral-400 line-through ml-2">
                        {formatBDT(product.originalPriceBDT)}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded">
                      -{product.discountPercent}%
                    </span>
                  </div>

                  {/* Dual Action Buttons: Add to Bag & Buy Now */}
                  <div className="pt-2 grid grid-cols-2 gap-2" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => addItem(product)}
                      className="py-2 px-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                    <button
                      onClick={() => onBuyNow(product)}
                      className="py-2 px-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer shadow-xs"
                    >
                      <Zap className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                      <span>Buy Now</span>
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* View Full Category Archive Link */}
          <div className="pt-4 text-center">
            <button
              onClick={() => onNavigate('category', activeTab)}
              className="px-8 py-3.5 bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Explore All {activeTab !== 'all' ? activeTab.replace('_', ' ') : 'Marketplace'} Items in BDT</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* 4. Trust & Security Strip (Bangladesh Delivery, bKash, COD) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-neutral-900 text-white rounded-2xl p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-xs">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center text-red-500 shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">Free Nationwide Shipping</h4>
                <p className="text-neutral-400 mt-1">Free delivery inside Bangladesh for all orders above ৳2,500.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center text-amber-400 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">100% Buyer Protection</h4>
                <p className="text-neutral-400 mt-1">Get refund if item does not arrive or is not as described.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center text-emerald-400 shrink-0">
                <Coins className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">Cash on Delivery & bKash</h4>
                <p className="text-neutral-400 mt-1">Pay comfortably upon delivery or securely via bKash / Nagad.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center text-blue-400 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">15-Day Free Returns</h4>
                <p className="text-neutral-400 mt-1">Hassle-free return pickup service across Dhaka & major cities.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
