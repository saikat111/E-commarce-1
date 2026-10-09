import React, { useState } from 'react';
import { 
  Search, ShoppingCart, Heart, User, ChevronDown, Flame, 
  Sparkles, ShieldCheck, HelpCircle, Package, ArrowRight, Menu, X, Camera, Truck, Compass
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { ProductCategory, PageRoute } from '../../types';
import { CATEGORIES_METADATA } from '../../data/products';
import { formatBDT } from '../../utils/formatters';

interface AliNavbarProps {
  currentPage: PageRoute;
  activeCategory: ProductCategory;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onNavigate: (page: PageRoute, category?: ProductCategory, productId?: string) => void;
}

export const AliNavbar: React.FC<AliNavbarProps> = ({
  currentPage,
  activeCategory,
  searchQuery,
  onSearchChange,
  onNavigate,
}) => {
  const { cart, itemCount, wishlist, openCartDrawer } = useCart();
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);
  const [selectedSearchCategory, setSelectedSearchCategory] = useState<ProductCategory>('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentPage !== 'category' && currentPage !== 'home') {
      onNavigate('category', selectedSearchCategory !== 'all' ? selectedSearchCategory : activeCategory);
    }
  };

  const trendingTags = [
    { label: 'ANC Headphones', category: 'electronics_audio' as ProductCategory },
    { label: 'Brass Lamp', category: 'smart_lighting' as ProductCategory },
    { label: 'Titanium Watch', category: 'fashion_watches' as ProductCategory },
    { label: 'Oak Chair', category: 'furniture_living' as ProductCategory },
    { label: 'Pour-Over Kettle', category: 'kitchen_tableware' as ProductCategory },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-neutral-200 shadow-2xs font-sans">
      
      {/* Top Global Utility Strip */}
      <div className="bg-neutral-900 text-neutral-300 text-xs py-1.5 px-4 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left: Ship to Bangladesh & Currency */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-neutral-200">
              <span className="text-sm">🇧🇩</span>
              <span className="font-medium">Ship to: <strong>Bangladesh</strong> / <strong>BDT (৳)</strong></span>
            </div>
            <span className="text-neutral-600 hidden sm:inline" aria-hidden="true">|</span>
            <div className="hidden sm:flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>15-Day Free Returns · Guaranteed 5-Day Delivery to Dhaka</span>
            </div>
          </div>

          {/* Right: Help, Buyer Protection & Account */}
          <div className="flex items-center gap-4 text-neutral-400">
            <span className="hover:text-white cursor-pointer hidden md:inline">Buyer Protection</span>
            <button 
              onClick={() => onNavigate('dashboard')}
              className="hover:text-white transition-colors cursor-pointer hidden md:inline text-xs"
            >
              Track Order
            </button>
            <span className="hover:text-white cursor-pointer flex items-center gap-1">
              <HelpCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Help</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Header Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-4 lg:gap-8">
          
          {/* Brand Logo & Choice Badge */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onNavigate('home')}
              className="text-left group cursor-pointer"
            >
              <div className="flex items-center gap-1.5">
                <span className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-950 font-sans">
                  NEXUS<span className="text-red-600">BAZAAR</span>
                </span>
                <span className="bg-amber-400 text-neutral-950 text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded shadow-2xs">
                  CHOICE
                </span>
              </div>
              <p className="text-[10px] text-neutral-500 tracking-wider uppercase font-semibold">
                Ultra-Modern Global Marketplace
              </p>
            </button>
          </div>

          {/* AliExpress-Style Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl flex-col">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              {/* Category Dropdown in Search Bar */}
              <select
                value={selectedSearchCategory}
                onChange={(e) => setSelectedSearchCategory(e.target.value as ProductCategory)}
                className="h-11 px-3 bg-neutral-100 text-xs font-semibold text-neutral-700 border-2 border-r-0 border-red-600 rounded-l-full outline-hidden cursor-pointer hover:bg-neutral-200/80 transition-colors"
              >
                <option value="all">All Categories</option>
                <option value="electronics_audio">Electronics</option>
                <option value="smart_lighting">Lighting</option>
                <option value="fashion_watches">Watches</option>
                <option value="furniture_living">Furniture</option>
                <option value="kitchen_tableware">Kitchen</option>
                <option value="lifestyle_gadgets">Lifestyle</option>
              </select>

              {/* Main Search Input */}
              <input
                type="text"
                placeholder="Search over 10,000+ items across Bangladesh (e.g. Wireless ANC, Titanium Watch)..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="flex-1 h-11 px-4 text-xs sm:text-sm bg-white border-y-2 border-red-600 outline-hidden text-neutral-900 placeholder:text-neutral-400"
              />

              {/* Camera Visual Search Icon */}
              <button
                type="button"
                className="h-11 px-3 bg-white border-y-2 border-red-600 text-neutral-400 hover:text-neutral-700 transition-colors"
                title="Search by image"
              >
                <Camera className="w-4 h-4" />
              </button>

              {/* Search Submit Button */}
              <button
                type="submit"
                className="h-11 px-6 bg-red-600 hover:bg-red-700 text-white rounded-r-full font-semibold text-xs tracking-wider uppercase flex items-center justify-center transition-colors shadow-sm cursor-pointer"
              >
                <Search className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">Search</span>
              </button>
            </form>

            {/* Trending Tags below search bar */}
            <div className="flex items-center gap-3 mt-1 text-[11px] text-neutral-500 overflow-x-auto scrollbar-none">
              <span className="text-neutral-400 font-medium shrink-0">Popular:</span>
              {trendingTags.map((tag) => (
                <button
                  key={tag.label}
                  onClick={() => {
                    onSearchChange(tag.label);
                    onNavigate('category', tag.category);
                  }}
                  className="hover:text-red-600 whitespace-nowrap cursor-pointer transition-colors"
                >
                  {tag.label}
                </button>
              ))}
            </div>
          </div>

          {/* User Utility Actions (Wishlist, Cart, Account) */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* Account Dashboard Button */}
            <button
              onClick={() => onNavigate('dashboard')}
              className={`flex items-center gap-2 p-1.5 sm:px-3 sm:py-2 rounded-xl transition-colors cursor-pointer group ${
                currentPage === 'dashboard'
                  ? 'bg-neutral-900 text-white'
                  : 'text-neutral-700 hover:text-red-600 hover:bg-neutral-100'
              }`}
              title="My Account & Order Tracking"
            >
              <div className="relative">
                <User className="w-5 h-5 group-hover:text-red-600 transition-colors" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-white" />
              </div>
              <div className="hidden lg:flex flex-col text-left">
                <span className="text-[10px] text-neutral-400 font-medium leading-tight">Welcome</span>
                <span className="text-xs font-bold leading-tight flex items-center gap-1">
                  <span>Dashboard</span>
                  <ChevronDown className="w-3 h-3 text-neutral-400 group-hover:text-red-600" />
                </span>
              </div>
            </button>

            {/* Wishlist */}
            <button
              onClick={() => onNavigate('wishlist')}
              className="p-2 text-neutral-700 hover:text-red-600 hover:bg-neutral-100 rounded-xl transition-colors relative cursor-pointer"
              title="Saved Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Bag / Cart */}
            <button
              onClick={() => onNavigate('cart')}
              className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200/80 transition-colors cursor-pointer group"
              title="Shopping Cart"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5 text-neutral-900 group-hover:text-red-600 transition-colors" />
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center font-mono">
                  {itemCount}
                </span>
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-[10px] text-neutral-500 font-medium uppercase leading-tight">My Cart</span>
                <span className="text-xs font-bold text-neutral-900 font-mono tabular-nums leading-tight">
                  {formatBDT(cart.totalBDT)}
                </span>
              </div>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-neutral-700 hover:text-neutral-950 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="md:hidden mt-2">
          <form onSubmit={handleSearchSubmit} className="flex">
            <input
              type="text"
              placeholder="Search products in BDT..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="flex-1 h-10 px-3 text-xs bg-neutral-100 border border-neutral-300 rounded-l-lg outline-hidden"
            />
            <button
              type="submit"
              className="h-10 px-4 bg-red-600 text-white text-xs font-bold rounded-r-lg"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Secondary Category Bar (AliExpress Style) */}
      <div className="border-t border-neutral-200 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Category Dropdown Button */}
          <div className="relative">
            <button
              onClick={() => setCategoryMenuOpen(!categoryMenuOpen)}
              className="flex items-center gap-2 py-2.5 px-4 bg-neutral-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <Menu className="w-4 h-4" />
              <span>All Categories</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${categoryMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Mega Categories Dropdown */}
            {categoryMenuOpen && (
              <div 
                className="absolute top-full left-0 w-72 bg-white border border-neutral-200 shadow-2xl rounded-b-xl z-50 py-2 animate-in fade-in duration-150"
                onMouseLeave={() => setCategoryMenuOpen(false)}
              >
                <div className="px-3 py-1 text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                  Browse by Department
                </div>
                {CATEGORIES_METADATA.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      onNavigate('category', cat.id);
                      setCategoryMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-4 py-2.5 text-xs text-left transition-colors cursor-pointer ${
                      activeCategory === cat.id ? 'bg-red-50 text-red-600 font-bold' : 'text-neutral-800 hover:bg-neutral-100'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Main Top Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-bold uppercase tracking-wider text-neutral-700">
            <button
              onClick={() => onNavigate('home')}
              className={`py-2.5 hover:text-red-600 transition-colors cursor-pointer ${
                currentPage === 'home' ? 'text-red-600 border-b-2 border-red-600' : ''
              }`}
            >
              Home
            </button>

            <button
              onClick={() => onNavigate('category', 'all')}
              className="py-2.5 flex items-center gap-1 text-red-600 hover:text-red-700 transition-colors cursor-pointer"
            >
              <Flame className="w-3.5 h-3.5 fill-red-600 text-red-600" />
              <span>SuperDeals</span>
            </button>

            <button
              onClick={() => onNavigate('category', 'electronics_audio')}
              className="py-2.5 hover:text-red-600 transition-colors cursor-pointer flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Choice Day</span>
            </button>

            <button
              onClick={() => {
                onNavigate('home');
                setTimeout(() => {
                  const el = document.getElementById('recommended-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="py-2.5 hover:text-red-600 transition-colors cursor-pointer flex items-center gap-1 text-rose-600 font-bold"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>For You</span>
            </button>

            {CATEGORIES_METADATA.slice(0, 4).map((cat) => (
              <button
                key={cat.id}
                onClick={() => onNavigate('category', cat.id)}
                className={`py-2.5 hover:text-red-600 transition-colors cursor-pointer ${
                  currentPage === 'category' && activeCategory === cat.id ? 'text-red-600 border-b-2 border-red-600' : ''
                }`}
              >
                {cat.shortName}
              </button>
            ))}
          </nav>

          {/* Right Trust Banner */}
          <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-neutral-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Official BDT Direct Dispatch</span>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-neutral-200 px-4 py-3 space-y-2">
          <button
            onClick={() => {
              onNavigate('home');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm font-bold text-neutral-900 border-b border-neutral-100"
          >
            Storefront Home
          </button>
          <div className="text-[11px] font-bold text-neutral-400 uppercase pt-2">
            Categories
          </div>
          {CATEGORIES_METADATA.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                onNavigate('category', cat.id);
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-1.5 text-xs font-medium text-neutral-700 hover:text-red-600"
            >
              {cat.name}
            </button>
          ))}
          <div className="pt-2 border-t border-neutral-100 space-y-1">
            <button
              onClick={() => {
                onNavigate('dashboard');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 text-xs font-bold text-neutral-900 hover:text-red-600 flex items-center justify-between"
            >
              <span>User Dashboard & Track Orders</span>
              <Truck className="w-4 h-4 text-red-600" />
            </button>
            <button
              onClick={() => {
                onNavigate('wishlist');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 text-xs font-bold text-neutral-900 hover:text-red-600 flex items-center justify-between"
            >
              <span>Saved Wishlist ({wishlist.length})</span>
              <Heart className="w-4 h-4 text-pink-500" />
            </button>
            <button
              onClick={() => {
                onNavigate('cart');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 text-sm font-bold text-red-600"
            >
              View Shopping Cart ({itemCount} items)
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
