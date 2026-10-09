import React, { useState, useMemo } from 'react';
import { 
  SlidersHorizontal, ChevronRight, Star, ShoppingBag, Zap, 
  RotateCcw, Sparkles, Truck, Check, Heart, ArrowUpDown 
} from 'lucide-react';
import { Product, ProductCategory, PageRoute, ProductFilterState } from '../../types';
import { CATEGORIES_METADATA } from '../../data/products';
import { formatBDT } from '../../utils/formatters';
import { useCart } from '../../context/CartContext';

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

  // Local filter states
  const [internalSubcategory, setInternalSubcategory] = useState<string>('all');
  const selectedSubcategory = controlledSubcategory !== undefined ? controlledSubcategory : internalSubcategory;
  const setSelectedSubcategory = setControlledSubcategory || setInternalSubcategory;
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [appliedMinPrice, setAppliedMinPrice] = useState<number>(0);
  const [appliedMaxPrice, setAppliedMaxPrice] = useState<number>(100000);
  const [sortBy, setSortBy] = useState<'featured' | 'orders-desc' | 'price-asc' | 'price-desc' | 'rating-desc'>('featured');
  const [choiceOnly, setChoiceOnly] = useState(false);
  const [freeShippingOnly, setFreeShippingOnly] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);

  const activeCategoryMeta = CATEGORIES_METADATA.find((c) => c.id === activeCategory);

  const handleApplyPrice = (e: React.FormEvent) => {
    e.preventDefault();
    setAppliedMinPrice(minPrice ? Number(minPrice) : 0);
    setAppliedMaxPrice(maxPrice ? Number(maxPrice) : 100000);
  };

  const handleResetFilters = () => {
    setSelectedSubcategory('all');
    setMinPrice('');
    setMaxPrice('');
    setAppliedMinPrice(0);
    setAppliedMaxPrice(100000);
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

    list = list.filter((p) => p.priceBDT >= appliedMinPrice && p.priceBDT <= appliedMaxPrice);

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
        
        {/* Left: Facet Sidebar */}
        <aside className="lg:col-span-3 bg-white rounded-2xl border border-neutral-200 p-5 space-y-6 shadow-2xs">
          
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

          {/* Price Range Filter in BDT */}
          <div className="space-y-3 pt-3 border-t border-neutral-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              Price (BDT ৳)
            </h4>
            <form onSubmit={handleApplyPrice} className="space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min ৳"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-1/2 px-2 py-1.5 text-xs bg-neutral-50 border border-neutral-300 rounded-lg outline-hidden font-mono"
                />
                <span className="text-neutral-400">-</span>
                <input
                  type="number"
                  placeholder="Max ৳"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-1/2 px-2 py-1.5 text-xs bg-neutral-50 border border-neutral-300 rounded-lg outline-hidden font-mono"
                />
              </div>
              <button
                type="submit"
                className="w-full py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
              >
                Apply Range
              </button>
            </form>
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
          
          {/* Top Sort Bar */}
          <div className="bg-white rounded-xl border border-neutral-200 p-3 sm:px-4 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="text-neutral-600 font-medium">
              <strong>{filteredProducts.length}</strong> items available in BDT
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProducts.map((product) => {
                const wishlisted = isWishlisted(product.id);
                return (
                  <div
                    key={product.id}
                    onClick={() => onSelectProduct(product)}
                    className="group bg-white rounded-2xl border border-neutral-200 hover:border-neutral-400 hover:shadow-lg transition-all duration-300 p-3 flex flex-col justify-between cursor-pointer"
                  >
                    {/* Image Box */}
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

                      {/* Wishlist Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(product.id);
                        }}
                        className={`absolute top-2 right-2 p-1.5 rounded-full transition-colors cursor-pointer ${
                          wishlisted ? 'bg-red-50 text-red-600' : 'bg-white/80 text-neutral-600 hover:bg-white'
                        }`}
                      >
                        <Heart className={`w-3.5 h-3.5 ${wishlisted ? 'fill-current' : ''}`} />
                      </button>
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
                className="px-5 py-2.5 bg-neutral-900 text-white text-xs font-bold uppercase tracking-wider rounded-lg"
              >
                Clear All Filters
              </button>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
