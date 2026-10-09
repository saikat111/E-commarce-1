import React, { useState, useEffect } from 'react';
import { 
  Flame, Sparkles, ChevronRight, Clock, Zap, ArrowRight, ShieldCheck, 
  Truck, Gift, Coins, Check, Star, ShoppingBag, Eye 
} from 'lucide-react';
import { Product, ProductCategory, PageRoute } from '../../types';
import { CATEGORIES_METADATA } from '../../data/products';
import { formatBDT } from '../../utils/formatters';
import { useCart } from '../../context/CartContext';

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

  const superDeals = products.filter((p) => p.discountPercent >= 33).slice(0, 6);
  const choiceProducts = products.filter((p) => activeTab === 'all' || p.category === activeTab).slice(0, 8);

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

      {/* 2. SuperDeals Flash Sale Strip (Live Countdown & Progress Bars) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-6 space-y-6">
          
          {/* Header Row: Flame Icon + Live Countdown */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-md">
                <Flame className="w-6 h-6 fill-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-black text-neutral-950 uppercase tracking-tight">
                    SuperDeals
                  </h2>
                  <span className="bg-red-100 text-red-600 text-[11px] font-bold px-2 py-0.5 rounded-full">
                    UP TO 45% OFF
                  </span>
                </div>
                <p className="text-xs text-neutral-500">Limited quantities in BDT refreshed daily</p>
              </div>
            </div>

            {/* Live Countdown Timer */}
            <div className="flex items-center gap-2 text-xs font-bold">
              <span className="text-neutral-500">Ends in:</span>
              <div className="flex items-center gap-1 font-mono text-white">
                <span className="bg-neutral-950 px-2 py-1 rounded-md">{String(countdown.hours).padStart(2, '0')}</span>
                <span className="text-neutral-950">:</span>
                <span className="bg-neutral-950 px-2 py-1 rounded-md">{String(countdown.minutes).padStart(2, '0')}</span>
                <span className="text-neutral-950">:</span>
                <span className="bg-red-600 px-2 py-1 rounded-md">{String(countdown.seconds).padStart(2, '0')}</span>
              </div>
            </div>
          </div>

          {/* SuperDeals Products Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {superDeals.map((product) => (
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

                  {/* Sold Progress */}
                  <div className="space-y-1 pt-1">
                    <div className="w-full bg-neutral-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-red-600 h-full w-3/4 rounded-full" />
                    </div>
                    <div className="text-[10px] text-neutral-500 font-medium">
                      {product.ordersCount}+ sold
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
            ))}
          </div>

        </div>
      </section>

      {/* 3. AliExpress "Choice Day" Curated Showcase with Category Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          
          {/* Section Header with Tabs */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-neutral-200">
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-amber-400 text-neutral-950 text-xs font-black px-2 py-0.5 rounded shadow-2xs">
                  CHOICE
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-neutral-950">
                  Selected by Nexus Choice
                </h2>
              </div>
              <p className="text-xs text-neutral-500 mt-1">
                Top quality rated 4.7+ with 15-day free returns and guaranteed delivery
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'all'
                    ? 'bg-neutral-950 text-white shadow-xs'
                    : 'bg-neutral-100 text-neutral-600 hover:text-neutral-950'
                }`}
              >
                All Picks
              </button>
              {CATEGORIES_METADATA.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    activeTab === cat.id
                      ? 'bg-neutral-950 text-white shadow-xs'
                      : 'bg-neutral-100 text-neutral-600 hover:text-neutral-950'
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
                  <div className="absolute top-2 left-2 flex items-center gap-1">
                    <span className="bg-amber-400 text-neutral-950 text-[10px] font-black px-1.5 py-0.5 rounded shadow-2xs">
                      Choice
                    </span>
                    {product.freeShipping && (
                      <span className="bg-emerald-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-2xs">
                        Free Ship
                      </span>
                    )}
                  </div>
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
