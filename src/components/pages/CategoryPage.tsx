import React, { useState, useMemo } from 'react';
import { 
  SlidersHorizontal, ChevronRight, Star, ShoppingBag, Zap, 
  RotateCcw, Sparkles, Truck, Check, Heart, ArrowUpDown, Scale, X, Filter 
} from 'lucide-react';
import { Product, ProductCategory, PageRoute, ProductFilterState } from '../../types';
import { CATEGORIES_METADATA } from '../../data/products';
import { formatBDT } from '../../utils/formatters';
import { useCart } from '../../context/CartContext';
import { useCompare } from '../../context/CompareContext';

interface CategoryPageProps {
  products: Product[];
  activeCategory: ProductCategory;
  searchQuery: string;
  selectedSubcategory?: string;
  onSelectSubcategory?: (subcategory: string) => void;
  onNavigate: (page: PageRoute, category?: ProductCategory, productId?: string) => void;
  onSelectProduct: (product: Product) => void;
  onBuyNow: (product: Product) => void;
  onCategoryChange: (category: ProductCategory) => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({
  products,
  activeCategory,
  searchQuery,
  selectedSubcategory: controlledSubcategory,
  onSelectSubcategory: setControlledSubcategory,
  onNavigate,
  onSelectProduct,
  onBuyNow,
  onCategoryChange,
}) => {
  const { addItem, toggleWishlist, isWishlisted } = useCart();
  const { addToCompare, removeFromCompare, isInCompare } = useCompare();

  // Local filter states
  const [internalSubcategory, setInternalSubcategory] = useState<string>('all');
  const selectedSubcategory = controlledSubcategory !== undefined ? controlledSubcategory : internalSubcategory;
  const setSelectedSubcategory = setControlledSubcategory || setInternalSubcategory;
  
  // Interactive BDT Price Range Slider States
  const [sliderMaxPrice, setSliderMaxPrice] = useState<number>(40000);
  const [minPriceInput, setMinPriceInput] = useState<string>('0');
  const [maxPriceInput, setMaxPriceInput] = useState<string>('40000');
  const [appliedMinPrice, setAppliedMinPrice] = useState<number>(0);
  const [appliedMaxPrice, setAppliedMaxPrice] = useState<number>(40000);
  
  // Deals Filter
  const [dealFilter, setDealFilter] = useState<'all' | 'flash_sale' | 'featured' | 'best_seller' | 'best_discount'>('all');

  const [sortBy, setSortBy] = useState<'featured' | 'orders-desc' | 'price-asc' | 'price-desc' | 'rating-desc'>('featured');
  const [choiceOnly, setChoiceOnly] = useState(false);
  const [freeShippingOnly, setFreeShippingOnly] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const activeFiltersCount = 
    (appliedMinPrice > 0 ? 1 : 0) +
    (appliedMaxPrice < 40000 ? 1 : 0) +
    (selectedSubcategory !== 'all' ? 1 : 0) +
    (dealFilter !== 'all' ? 1 : 0) +
    (choiceOnly ? 1 : 0) +
    (freeShippingOnly ? 1 : 0) +
    (inStockOnly ? 1 : 0);

  const activeCategoryMeta = CATEGORIES_METADATA.find((c) => c.id === activeCategory);

  const handleSliderChange = (newMax: number) => {
    setSliderMaxPrice(newMax);
    setMaxPriceInput(String(newMax));
    setAppliedMaxPrice(newMax);
  };

  const handleApplyCustomPrice = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const minVal = minPriceInput ? Math.max(0, Number(minPriceInput)) : 0;
    const maxVal = maxPriceInput ? Math.max(minVal, Number(maxPriceInput)) : 40000;
    setAppliedMinPrice(minVal);
    setAppliedMaxPrice(maxVal);
    setSliderMaxPrice(Math.min(40000, maxVal));
  };

  const handleSelectPricePreset = (min: number, max: number) => {
    setAppliedMinPrice(min);
    setAppliedMaxPrice(max);
    setMinPriceInput(String(min));
    setMaxPriceInput(String(max));
    setSliderMaxPrice(Math.min(40000, max));
  };

  const handleResetFilters = () => {
    setSelectedSubcategory('all');
    setMinPriceInput('0');
    setMaxPriceInput('40000');
    setSliderMaxPrice(40000);
    setAppliedMinPrice(0);
    setAppliedMaxPrice(40000);
    setDealFilter('all');
    setChoiceOnly(false);
    setFreeShippingOnly(false);
    setInStockOnly(false);
    setSortBy('featured');
  };

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (activeCategory !== 'all') {
      list = list.filter((p) => p.category === activeCategory);
    }

    if (selectedSubcategory !== 'all') {
      list = list.filter((p) => p.subcategory.toLowerCase() === selectedSubcategory.toLowerCase());
    }

    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.subcategory.toLowerCase().includes(q)
      );
    }

    // Filter by Price Range in BDT
    list = list.filter((p) => p.priceBDT >= appliedMinPrice && p.priceBDT <= appliedMaxPrice);

    // Deals filter (Flash Sale, Featured, Best Seller, Best Discount)
    if (dealFilter === 'flash_sale') {
      list = list.filter((p) => p.isFlashSale);
    } else if (dealFilter === 'featured') {
      list = list.filter((p) => p.isFeatured);
    } else if (dealFilter === 'best_seller') {
      list = list.filter((p) => p.isBestSeller);
    } else if (dealFilter === 'best_discount') {
      list = list.filter((p) => p.isBestDiscount || p.discountPercent >= 40);
    }

    if (choiceOnly) list = list.filter((p) => p.isChoice);
    if (freeShippingOnly) list = list.filter((p) => p.freeShipping);
    if (inStockOnly) list = list.filter((p) => p.inStock);

    switch (sortBy) {
      case 'orders-desc':
        list.sort((a, b) => b.ordersCount - a.ordersCount);
        break;
      case 'price-asc':
        list.sort((a, b) => a.priceBDT - b.priceBDT);
        break;
      case 'price-desc':
        list.sort((a, b) => b.priceBDT - a.priceBDT);
        break;
      case 'rating-desc':
        list.sort((a, b) => b.rating - a.rating);
        break;
      case 'featured':
      default:
        list.sort((a, b) => (b.badge ? 1 : 0) - (a.badge ? 1 : 0));
        break;
    }

    return list;
  }, [
    products,
    activeCategory,
    selectedSubcategory,
    searchQuery,
    appliedMinPrice,
    appliedMaxPrice,
    dealFilter,
    choiceOnly,
    freeShippingOnly,
    inStockOnly,
    sortBy,
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Category Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-neutral-900 text-white p-6 sm:p-10 shadow-sm">
        {activeCategoryMeta && (
          <div className="absolute inset-0 z-0">
            <img
              src={activeCategoryMeta.bannerImage}
              alt={activeCategoryMeta.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-30"
            />
          </div>
        )}
        <div className="relative z-10 max-w-xl space-y-2">
          <span className="bg-red-600 text-white text-[11px] font-black uppercase tracking-wider px-2 py-0.5 rounded">
            BANGLADESH MARKETPLACE CATALOG
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            {activeCategoryMeta ? activeCategoryMeta.name : 'Complete Marketplace Archive'}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-300">
            Showing {filteredProducts.length} verified products available for direct courier dispatch in BDT.
          </p>
        </div>
      </div>

      {/* Main Two-Column Layout (Sidebar Filters + Results Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Facet Sidebar (Desktop Only) */}
        <aside className="hidden lg:block lg:col-span-3 bg-white rounded-2xl border border-neutral-200 p-5 space-y-6 shadow-2xs">
          
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-900">
              <SlidersHorizontal className="w-4 h-4 text-red-600" />
              <span>Filters</span>
            </div>
            <button
              onClick={handleResetFilters}
              className="text-[11px] font-semibold text-neutral-500 hover:text-red-600 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          {/* Departments */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              Departments
            </h4>
            <div className="space-y-1">
              <button
                onClick={() => {
                  onCategoryChange('all');
                  setSelectedSubcategory('all');
                }}
                className={`w-full text-left px-2.5 py-1.5 text-xs rounded-lg transition-colors cursor-pointer ${
                  activeCategory === 'all' ? 'bg-neutral-900 text-white font-bold' : 'text-neutral-700 hover:bg-neutral-100'
                }`}
              >
                All Departments
              </button>
              {CATEGORIES_METADATA.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    onCategoryChange(cat.id);
                    setSelectedSubcategory('all');
                  }}
                  className={`w-full text-left px-2.5 py-1.5 text-xs rounded-lg transition-colors cursor-pointer ${
                    activeCategory === cat.id ? 'bg-red-600 text-white font-bold' : 'text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Subcategories (if a category is active) */}
          {activeCategoryMeta && (
            <div className="space-y-2 pt-3 border-t border-neutral-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                Subcategories
              </h4>
              <div className="space-y-1">
                <button
                  onClick={() => setSelectedSubcategory('all')}
                  className={`w-full text-left px-2.5 py-1 text-xs rounded-md transition-colors cursor-pointer ${
                    selectedSubcategory === 'all' ? 'text-red-600 font-bold' : 'text-neutral-600 hover:text-neutral-950'
                  }`}
                >
                  • All Subcategories
                </button>
                {activeCategoryMeta.subcategories.map((sub) => (
                  <button
                    key={sub}
                    onClick={() => setSelectedSubcategory(sub)}
                    className={`w-full text-left px-2.5 py-1 text-xs rounded-md transition-colors cursor-pointer ${
                      selectedSubcategory === sub ? 'text-red-600 font-bold' : 'text-neutral-600 hover:text-neutral-950'
                    }`}
                  >
                    • {sub}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Interactive Price Range Slider Filter in BDT */}
          <div className="space-y-3.5 pt-3 border-t border-neutral-100">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                Price (BDT ৳)
              </h4>
              <span className="text-[11px] font-mono font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">
                Max: {formatBDT(appliedMaxPrice)}
              </span>
            </div>

            {/* Range Slider Control */}
            <div className="space-y-1.5">
              <input
                type="range"
                min="1000"
                max="40000"
                step="500"
                value={sliderMaxPrice}
                onChange={(e) => handleSliderChange(Number(e.target.value))}
                className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-red-600 focus:outline-hidden"
              />
              <div className="flex justify-between text-[10px] text-neutral-400 font-mono">
                <span>৳1,000</span>
                <span>৳20,000</span>
                <span>৳40,000+</span>
              </div>
            </div>

            {/* Quick Price Preset Chips */}
            <div className="space-y-1">
              <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider block">
                Quick Presets
              </span>
              <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                <button
                  type="button"
                  onClick={() => handleSelectPricePreset(0, 5000)}
                  className={`px-2 py-1 rounded-md text-left transition-colors cursor-pointer ${
                    appliedMinPrice === 0 && appliedMaxPrice === 5000
                      ? 'bg-red-600 text-white font-bold'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  Under ৳5,000
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectPricePreset(5000, 15000)}
                  className={`px-2 py-1 rounded-md text-left transition-colors cursor-pointer ${
                    appliedMinPrice === 5000 && appliedMaxPrice === 15000
                      ? 'bg-red-600 text-white font-bold'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  ৳5k – ৳15,000
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectPricePreset(15000, 30000)}
                  className={`px-2 py-1 rounded-md text-left transition-colors cursor-pointer ${
                    appliedMinPrice === 15000 && appliedMaxPrice === 30000
                      ? 'bg-red-600 text-white font-bold'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  ৳15k – ৳30,000
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectPricePreset(30000, 100000)}
                  className={`px-2 py-1 rounded-md text-left transition-colors cursor-pointer ${
                    appliedMinPrice === 30000
                      ? 'bg-red-600 text-white font-bold'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  ৳30,000+
                </button>
              </div>
            </div>

            {/* Custom Min / Max Exact Inputs */}
            <form onSubmit={handleApplyCustomPrice} className="space-y-2 pt-1">
              <div className="flex items-center gap-1.5">
                <div className="w-1/2">
                  <span className="text-[10px] text-neutral-400 block mb-0.5">Min (৳)</span>
                  <input
                    type="number"
                    placeholder="Min"
                    value={minPriceInput}
                    onChange={(e) => setMinPriceInput(e.target.value)}
                    className="w-full px-2 py-1 text-xs bg-neutral-50 border border-neutral-300 rounded-lg outline-hidden font-mono"
                  />
                </div>
                <div className="w-1/2">
                  <span className="text-[10px] text-neutral-400 block mb-0.5">Max (৳)</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxPriceInput}
                    onChange={(e) => setMaxPriceInput(e.target.value)}
                    className="w-full px-2 py-1 text-xs bg-neutral-50 border border-neutral-300 rounded-lg outline-hidden font-mono"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
              >
                Set Custom Price
              </button>
            </form>
          </div>

          {/* Special Deals & Campaigns Filter */}
          <div className="space-y-2.5 pt-3 border-t border-neutral-100 text-xs">
            <h4 className="font-bold uppercase tracking-wider text-neutral-500">
              Deals & Highlights
            </h4>
            
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="radio"
                name="dealCategory"
                checked={dealFilter === 'all'}
                onChange={() => setDealFilter('all')}
                className="text-red-600 focus:ring-0"
              />
              <span className="font-semibold text-neutral-800">All Marketplace Goods</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="radio"
                name="dealCategory"
                checked={dealFilter === 'flash_sale'}
                onChange={() => setDealFilter('flash_sale')}
                className="text-red-600 focus:ring-0"
              />
              <span className="font-bold text-red-600 flex items-center gap-1">
                <span>⚡ Flash Sale (Flash Sell)</span>
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="radio"
                name="dealCategory"
                checked={dealFilter === 'featured'}
                onChange={() => setDealFilter('featured')}
                className="text-red-600 focus:ring-0"
              />
              <span className="font-bold text-amber-700 flex items-center gap-1">
                <span>⭐ Featured Products</span>
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="radio"
                name="dealCategory"
                checked={dealFilter === 'best_seller'}
                onChange={() => setDealFilter('best_seller')}
                className="text-red-600 focus:ring-0"
              />
              <span className="font-bold text-blue-700 flex items-center gap-1">
                <span>🏆 Best Sellers (Top Sold)</span>
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="radio"
                name="dealCategory"
                checked={dealFilter === 'best_discount'}
                onChange={() => setDealFilter('best_discount')}
                className="text-red-600 focus:ring-0"
              />
              <span className="font-bold text-emerald-700 flex items-center gap-1">
                <span>🏷️ Best Discount (40%+ OFF)</span>
              </span>
            </label>
          </div>

          {/* Special Badges Checkboxes */}
          <div className="space-y-2.5 pt-3 border-t border-neutral-100 text-xs">
            <h4 className="font-bold uppercase tracking-wider text-neutral-500">
              Services & Programs
            </h4>
            
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={choiceOnly}
                onChange={(e) => setChoiceOnly(e.target.checked)}
                className="rounded border-neutral-300 text-red-600 focus:ring-0"
              />
              <span className="font-bold text-neutral-800">AliExpress Choice Only</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={freeShippingOnly}
                onChange={(e) => setFreeShippingOnly(e.target.checked)}
                className="rounded border-neutral-300 text-red-600 focus:ring-0"
              />
              <span className="text-neutral-700">Free Shipping across BD</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="rounded border-neutral-300 text-red-600 focus:ring-0"
              />
              <span className="text-neutral-700">In Stock Ready to Dispatch</span>
            </label>
          </div>

        </aside>

        {/* Right: Products Catalog Grid */}
        <div className="lg:col-span-9 space-y-4">
          
          {/* Mobile App Filter & Sort Bar (Phone Responsive) */}
          <div className="lg:hidden bg-white rounded-2xl border border-neutral-200 p-2.5 shadow-2xs space-y-2">
            <div className="flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => setMobileFilterOpen(true)}
                className="flex-1 py-2 px-3 bg-neutral-900 active:bg-neutral-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-red-500" />
                <span>Filters & Price (৳)</span>
                {activeFiltersCount > 0 && (
                  <span className="w-5 h-5 bg-red-600 text-white rounded-full text-[10px] font-black flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </button>

              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="h-9 px-3 pr-7 bg-neutral-100 text-xs font-bold text-neutral-800 rounded-xl outline-hidden border border-neutral-200 cursor-pointer appearance-none"
                >
                  <option value="featured">Best Match</option>
                  <option value="orders-desc">Orders</option>
                  <option value="price-asc">৳ Low-High</option>
                  <option value="price-desc">৳ High-Low</option>
                </select>
                <ArrowUpDown className="w-3 h-3 text-neutral-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Subcategories Horizontal Scroll on Mobile */}
            {activeCategoryMeta && (
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none pt-1 border-t border-neutral-100 text-xs">
                <button
                  onClick={() => setSelectedSubcategory('all')}
                  className={`px-3 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap cursor-pointer transition-colors ${
                    selectedSubcategory === 'all'
                      ? 'bg-neutral-900 text-white'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  All {activeCategoryMeta.shortName}
                </button>
                {activeCategoryMeta.subcategories.map((sub) => (
                  <button
                    key={sub}
                    onClick={() => setSelectedSubcategory(sub)}
                    className={`px-3 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap cursor-pointer transition-colors ${
                      selectedSubcategory === sub
                        ? 'bg-red-600 text-white'
                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Top Deals Filter Pills Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
            <button
              onClick={() => setDealFilter('all')}
              className={`px-3 py-1.5 rounded-full font-bold whitespace-nowrap transition-colors cursor-pointer ${
                dealFilter === 'all'
                  ? 'bg-neutral-900 text-white shadow-2xs'
                  : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200'
              }`}
            >
              All Items ({products.length})
            </button>
            <button
              onClick={() => setDealFilter('flash_sale')}
              className={`px-3 py-1.5 rounded-full font-bold whitespace-nowrap transition-colors flex items-center gap-1 cursor-pointer ${
                dealFilter === 'flash_sale'
                  ? 'bg-red-600 text-white shadow-2xs'
                  : 'bg-white text-red-600 hover:bg-red-50 border border-red-200'
              }`}
            >
              <span>⚡ Flash Sale</span>
            </button>
            <button
              onClick={() => setDealFilter('featured')}
              className={`px-3 py-1.5 rounded-full font-bold whitespace-nowrap transition-colors flex items-center gap-1 cursor-pointer ${
                dealFilter === 'featured'
                  ? 'bg-amber-500 text-neutral-950 shadow-2xs'
                  : 'bg-white text-amber-800 hover:bg-amber-50 border border-amber-200'
              }`}
            >
              <span>⭐ Featured Products</span>
            </button>
            <button
              onClick={() => setDealFilter('best_seller')}
              className={`px-3 py-1.5 rounded-full font-bold whitespace-nowrap transition-colors flex items-center gap-1 cursor-pointer ${
                dealFilter === 'best_seller'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'bg-white text-blue-700 hover:bg-blue-50 border border-blue-200'
              }`}
            >
              <span>🏆 Best Sellers</span>
            </button>
            <button
              onClick={() => setDealFilter('best_discount')}
              className={`px-3 py-1.5 rounded-full font-bold whitespace-nowrap transition-colors flex items-center gap-1 cursor-pointer ${
                dealFilter === 'best_discount'
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'bg-white text-emerald-700 hover:bg-emerald-50 border border-emerald-200'
              }`}
            >
              <span>🏷️ Best Discount (40%+ OFF)</span>
            </button>
          </div>

          {/* Top Sort & Summary Bar */}
          <div className="bg-white rounded-xl border border-neutral-200 p-3 sm:px-4 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="text-neutral-600 font-medium">
              <strong>{filteredProducts.length}</strong> items in range ({formatBDT(appliedMinPrice)} – {formatBDT(appliedMaxPrice)})
            </div>

            {/* Sorting Controls */}
            <div className="flex items-center gap-1.5">
              <span className="text-neutral-400 font-semibold mr-1">Sort by:</span>
              <button
                onClick={() => setSortBy('featured')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${
                  sortBy === 'featured' ? 'bg-neutral-900 text-white' : 'text-neutral-700 hover:bg-neutral-100'
                }`}
              >
                Best Match
              </button>
              <button
                onClick={() => setSortBy('orders-desc')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${
                  sortBy === 'orders-desc' ? 'bg-neutral-900 text-white' : 'text-neutral-700 hover:bg-neutral-100'
                }`}
              >
                Orders
              </button>
              <button
                onClick={() => setSortBy('price-asc')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${
                  sortBy === 'price-asc' ? 'bg-neutral-900 text-white' : 'text-neutral-700 hover:bg-neutral-100'
                }`}
              >
                Price: Low to High
              </button>
              <button
                onClick={() => setSortBy('price-desc')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${
                  sortBy === 'price-desc' ? 'bg-neutral-900 text-white' : 'text-neutral-700 hover:bg-neutral-100'
                }`}
              >
                Price: High to Low
              </button>
            </div>
          </div>

          {/* Catalog Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4 md:gap-5">
              {filteredProducts.map((product) => {
                const wishlisted = isWishlisted(product.id);
                return (
                  <div
                    key={product.id}
                    onClick={() => onSelectProduct(product)}
                    className="group bg-white rounded-2xl border border-neutral-200 hover:border-neutral-400 hover:shadow-lg transition-all duration-300 p-2 sm:p-3 flex flex-col justify-between cursor-pointer"
                  >
                    {/* Image Box */}
                    <div className="relative aspect-square sm:aspect-4/3 rounded-xl overflow-hidden bg-neutral-100 mb-2 sm:mb-3">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 left-2 flex flex-wrap items-center gap-1">
                        {product.isFlashSale && (
                          <span className="bg-red-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded shadow-2xs">
                            ⚡ Flash Sale
                          </span>
                        )}
                        {product.isBestSeller && (
                          <span className="bg-blue-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded shadow-2xs">
                            🏆 #{product.bestSellerRank || 1} Top Seller
                          </span>
                        )}
                        {product.isFeatured && (
                          <span className="bg-amber-400 text-neutral-950 text-[10px] font-black px-1.5 py-0.5 rounded shadow-2xs">
                            ⭐ Featured
                          </span>
                        )}
                        {product.discountPercent >= 45 && (
                          <span className="bg-emerald-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded shadow-2xs">
                            🏷️ {product.discountPercent}% OFF
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

                      {/* Actions Cluster: Compare & Wishlist */}
                      <div className="absolute top-2 right-2 flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (isInCompare(product.id)) {
                              removeFromCompare(product.id);
                            } else {
                              addToCompare(product);
                            }
                          }}
                          title={isInCompare(product.id) ? 'Remove from comparison' : 'Add to compare'}
                          className={`p-1.5 rounded-full transition-all cursor-pointer ${
                            isInCompare(product.id)
                              ? 'bg-red-600 text-white shadow-xs'
                              : 'bg-white/80 text-neutral-600 hover:bg-white hover:text-neutral-900'
                          }`}
                        >
                          <Scale className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleWishlist(product.id);
                          }}
                          title={wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                          className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                            wishlisted ? 'bg-red-50 text-red-600' : 'bg-white/80 text-neutral-600 hover:bg-white'
                          }`}
                        >
                          <Heart className={`w-3.5 h-3.5 ${wishlisted ? 'fill-current' : ''}`} />
                        </button>
                      </div>
                    </div>

                    {/* Metadata */}
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

                      {/* Price Row in BDT */}
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
                      <div className="pt-2 grid grid-cols-2 gap-1.5 sm:gap-2" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => addItem(product)}
                          className="py-1.5 sm:py-2 px-1 sm:px-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 text-[10px] sm:text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
                          <span>Add</span>
                        </button>
                        <button
                          onClick={() => onBuyNow(product)}
                          className="py-1.5 sm:py-2 px-1 sm:px-2 bg-red-600 hover:bg-red-700 text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer shadow-xs"
                        >
                          <Zap className="w-3.5 h-3.5 fill-amber-300 text-amber-300 shrink-0" />
                          <span>Buy Now</span>
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-dashed border-neutral-300 p-16 text-center space-y-3">
              <h3 className="text-base font-bold text-neutral-900">No items matched your filter</h3>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                Try widening your price range in BDT or deselecting specific options.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-5 py-2.5 bg-neutral-900 text-white text-xs font-bold uppercase tracking-wider rounded-lg cursor-pointer"
              >
                Clear All Filters
              </button>
            </div>
          )}

        </div>

      </div>

      {/* Mobile App Filter Drawer (Bottom Sheet) */}
      {mobileFilterOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-neutral-950/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileFilterOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative bg-white rounded-t-3xl max-h-[85vh] flex flex-col shadow-2xl border-t border-neutral-200 z-10 animate-in slide-in-from-bottom duration-200">
            {/* Header */}
            <div className="px-5 py-4 border-b border-neutral-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-red-600" />
                <h3 className="font-bold text-sm text-neutral-900">Filters & Preferences</h3>
                {activeFiltersCount > 0 && (
                  <span className="text-[10px] bg-red-600 text-white font-black px-1.5 py-0.2 rounded-full">
                    {activeFiltersCount}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-xs font-semibold text-neutral-500 hover:text-red-600 cursor-pointer"
                >
                  Reset
                </button>
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 rounded-full text-neutral-400 hover:text-neutral-900 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Filters Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              {/* BDT Price Range Slider */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                    Price Range in BDT (৳)
                  </span>
                  <span className="text-xs font-mono font-bold text-red-600">
                    ৳{appliedMinPrice.toLocaleString()} – ৳{appliedMaxPrice.toLocaleString()}
                  </span>
                </div>

                <input
                  type="range"
                  min="0"
                  max="40000"
                  step="500"
                  value={sliderMaxPrice}
                  onChange={(e) => handleSliderChange(Number(e.target.value))}
                  className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-red-600"
                />

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-neutral-50 p-2 rounded-xl border border-neutral-200">
                    <span className="text-[10px] text-neutral-400 block font-medium">Min Price (৳)</span>
                    <input
                      type="number"
                      value={minPriceInput}
                      onChange={(e) => setMinPriceInput(e.target.value)}
                      onBlur={() => handleApplyCustomPrice()}
                      className="w-full font-mono font-bold bg-transparent outline-hidden"
                    />
                  </div>
                  <div className="bg-neutral-50 p-2 rounded-xl border border-neutral-200">
                    <span className="text-[10px] text-neutral-400 block font-medium">Max Price (৳)</span>
                    <input
                      type="number"
                      value={maxPriceInput}
                      onChange={(e) => setMaxPriceInput(e.target.value)}
                      onBlur={() => handleApplyCustomPrice()}
                      className="w-full font-mono font-bold bg-transparent outline-hidden"
                    />
                  </div>
                </div>

                {/* Price Presets */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <button
                    type="button"
                    onClick={() => handleSelectPricePreset(0, 2000)}
                    className="px-2.5 py-1 text-[11px] font-semibold bg-neutral-100 rounded-lg hover:bg-red-50 hover:text-red-600 cursor-pointer"
                  >
                    Under ৳2,000
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSelectPricePreset(2000, 10000)}
                    className="px-2.5 py-1 text-[11px] font-semibold bg-neutral-100 rounded-lg hover:bg-red-50 hover:text-red-600 cursor-pointer"
                  >
                    ৳2,000 – ৳10,000
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSelectPricePreset(10000, 25000)}
                    className="px-2.5 py-1 text-[11px] font-semibold bg-neutral-100 rounded-lg hover:bg-red-50 hover:text-red-600 cursor-pointer"
                  >
                    ৳10,000 – ৳25,000
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSelectPricePreset(25000, 40000)}
                    className="px-2.5 py-1 text-[11px] font-semibold bg-neutral-100 rounded-lg hover:bg-red-50 hover:text-red-600 cursor-pointer"
                  >
                    ৳25,000+
                  </button>
                </div>
              </div>

              {/* Department Selector */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Department
                </span>
                <div className="grid grid-cols-2 gap-1.5 text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      onCategoryChange('all');
                      setSelectedSubcategory('all');
                    }}
                    className={`p-2 rounded-xl text-left font-semibold border transition-all cursor-pointer ${
                      activeCategory === 'all'
                        ? 'bg-neutral-900 text-white border-neutral-900'
                        : 'bg-neutral-50 text-neutral-700 border-neutral-200'
                    }`}
                  >
                    All Departments
                  </button>
                  {CATEGORIES_METADATA.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        onCategoryChange(cat.id);
                        setSelectedSubcategory('all');
                      }}
                      className={`p-2 rounded-xl text-left font-semibold border transition-all cursor-pointer ${
                        activeCategory === cat.id
                          ? 'bg-red-600 text-white border-red-600'
                          : 'bg-neutral-50 text-neutral-700 border-neutral-200'
                      }`}
                    >
                      {cat.shortName}
                    </button>
                  ))}
                </div>
              </div>

              {/* Services & Delivery Checks */}
              <div className="space-y-2 pt-2 border-t border-neutral-100 text-xs">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Buyer Benefits & Services
                </span>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={choiceOnly}
                      onChange={(e) => setChoiceOnly(e.target.checked)}
                      className="rounded text-red-600"
                    />
                    <span className="font-bold text-neutral-800">Choice Certified Only</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={freeShippingOnly}
                      onChange={(e) => setFreeShippingOnly(e.target.checked)}
                      className="rounded text-red-600"
                    />
                    <span className="text-neutral-700">Free Courier Shipping Across Bangladesh</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={inStockOnly}
                      onChange={(e) => setInStockOnly(e.target.checked)}
                      className="rounded text-red-600"
                    />
                    <span className="text-neutral-700">In Stock Ready for Instant Dispatch</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Bottom Sticky Apply Bar */}
            <div className="p-4 bg-white border-t border-neutral-200">
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-3 bg-red-600 active:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md cursor-pointer"
              >
                Show {filteredProducts.length} Results
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
