import React, { useState } from 'react';
import { ShoppingBag, Search, Heart, Menu, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { ProductCategory } from '../../types';

interface NavbarProps {
  activeCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
  onOpenSearch: () => void;
  onOpenWishlist: () => void;
  onScrollToStory: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeCategory,
  onSelectCategory,
  onOpenSearch,
  onOpenWishlist,
  onScrollToStory,
}) => {
  const { itemCount, openCart, wishlist } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; category?: ProductCategory; isStory?: boolean }[] = [
    { label: 'All Objects', category: 'all' },
    { label: 'Lighting', category: 'lighting' },
    { label: 'Furniture', category: 'furniture' },
    { label: 'Tableware', category: 'tableware' },
    { label: 'Acoustics', category: 'acoustics' },
    { label: 'Craft Story', isStory: true },
  ];

  const handleLinkClick = (link: typeof navLinks[0]) => {
    if (link.isStory) {
      onScrollToStory();
    } else if (link.category) {
      onSelectCategory(link.category);
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Slim Promotional Delivery Notice (Dismissible or subtle single line) */}
      <div className="bg-neutral-900 text-neutral-300 text-xs py-2 px-4 text-center tracking-wide border-b border-neutral-800 flex items-center justify-center gap-3">
        <span>Complimentary carbon-neutral delivery on curated orders over $250</span>
        <span className="text-neutral-500 hidden sm:inline" aria-hidden="true">·</span>
        <span className="text-neutral-400 hidden sm:inline">Use code <strong className="text-neutral-100 font-medium">WELCOME10</strong> for 10% off</span>
      </div>

      {/* Top Bar Contract: Zone 1 (Wordmark) — Zone 2 (4-5 Nav Links) — Zone 3 (1 Primary Action) */}
      <header className="sticky top-0 z-40 bg-neutral-50/95 backdrop-blur-md border-b border-neutral-200/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
          
          {/* Zone 1: Brand Wordmark (Single text element in display font) */}
          <button
            onClick={() => onSelectCategory('all')}
            className="text-xl sm:text-2xl font-serif font-normal tracking-tight text-neutral-900 whitespace-nowrap shrink-0 hover:opacity-80 transition-opacity text-left"
          >
            ATELIER NORD
          </button>

          {/* Zone 2: 4-5 concise single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs tracking-wider uppercase font-medium text-neutral-600">
            {navLinks.map((link) => {
              const isActive = !link.isStory && activeCategory === link.category;
              return (
                <button
                  key={link.label}
                  onClick={() => handleLinkClick(link)}
                  className={`hover:text-neutral-950 transition-colors whitespace-nowrap shrink-0 py-1 relative ${
                    isActive ? 'text-neutral-950 font-semibold' : 'text-neutral-600'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-900" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary Action Module with Cart Drawer Trigger */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-neutral-700 hover:text-neutral-950 hover:bg-neutral-200/50 rounded-lg transition-colors"
              aria-label="Search catalog"
              title="Search catalog"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Wishlist Trigger */}
            <button
              onClick={onOpenWishlist}
              className="p-2 text-neutral-700 hover:text-neutral-950 hover:bg-neutral-200/50 rounded-lg transition-colors relative"
              aria-label="View saved items"
              title="Saved items"
            >
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-neutral-900 rounded-full" />
              )}
            </button>

            {/* Primary Action: Shopping Bag Button */}
            <button
              onClick={openCart}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-white bg-neutral-900 rounded-lg hover:bg-neutral-800 active:scale-[0.98] transition-all whitespace-nowrap shrink-0"
              aria-label={`Shopping bag with ${itemCount} items`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Bag</span>
              <span className="bg-neutral-800 text-neutral-200 text-[11px] px-1.5 py-0.2 rounded font-mono tabular-nums">
                {itemCount}
              </span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-neutral-700 hover:text-neutral-950 rounded-lg"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-neutral-200 bg-neutral-50 px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link)}
                className="block w-full text-left py-2 px-3 text-sm font-medium text-neutral-800 hover:bg-neutral-200/60 rounded-md transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </header>
    </>
  );
};
