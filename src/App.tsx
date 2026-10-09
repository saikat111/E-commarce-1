/**
 * Atelier Nord - Main Storefront Application
 * 
 * Future-Ready Architecture:
 * - Next.js App Router compatible structure (can be split directly into app/page.tsx, app/products/[slug]/page.tsx)
 * - Clean Service Layer abstraction via src/services/api.ts
 * - Decoupled state management via CartContext and custom hooks
 */

import React, { useState, useEffect, useRef } from 'react';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/home/Hero';
import { ProductGrid } from './components/shop/ProductGrid';
import { ProductDetailModal } from './components/shop/ProductDetailModal';
import { QuickViewModal } from './components/shop/QuickViewModal';
import { CartDrawer } from './components/cart/CartDrawer';
import { CheckoutModal } from './components/checkout/CheckoutModal';
import { WishlistModal } from './components/shop/WishlistModal';
import { SearchModal } from './components/shop/SearchModal';
import { StorySection } from './components/home/StorySection';
import { Footer } from './components/layout/Footer';
import { api } from './services/api';
import { Product, ProductCategory, ProductFilterState } from './types';

const INITIAL_FILTER_STATE: ProductFilterState = {
  category: 'all',
  searchQuery: '',
  sortBy: 'featured',
  maxPrice: 1500,
  inStockOnly: false,
};

export default function App() {
  const [filterState, setFilterState] = useState<ProductFilterState>(INITIAL_FILTER_STATE);
  const [products, setProducts] = useState<Product[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Modal Dialog States
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const catalogRef = useRef<HTMLDivElement>(null);

  // Fetch products through the decoupled API Service repository
  useEffect(() => {
    let isCancelled = false;
    setLoading(true);

    api.products.getAll(filterState).then((res) => {
      if (!isCancelled) {
        setProducts(res.products);
        setTotalCount(res.total);
        setLoading(false);
      }
    });

    return () => {
      isCancelled = true;
    };
  }, [filterState]);

  const handleFilterChange = (updates: Partial<ProductFilterState>) => {
    setFilterState((prev) => ({ ...prev, ...updates }));
  };

  const handleResetFilters = () => {
    setFilterState(INITIAL_FILTER_STATE);
  };

  const handleCategorySelect = (category: ProductCategory) => {
    setFilterState((prev) => ({ ...prev, category }));
    scrollToCatalog();
  };

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToStory = () => {
    const el = document.getElementById('craft-story');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-neutral-50 text-neutral-900 font-sans selection:bg-neutral-900 selection:text-white">
        
        {/* Top Bar Navigation Contract */}
        <Navbar
          activeCategory={filterState.category}
          onSelectCategory={handleCategorySelect}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenWishlist={() => setIsWishlistOpen(true)}
          onScrollToStory={scrollToStory}
        />

        {/* Main Storefront Body */}
        <main className="flex-1">
          {/* Campaign Focal Hero */}
          <Hero
            onExploreCatalog={scrollToCatalog}
            onSelectProduct={async (productId) => {
              const p = await api.products.getById(productId);
              if (p) setSelectedProduct(p);
            }}
          />

          {/* Curated Product Catalog Grid */}
          <div ref={catalogRef}>
            <ProductGrid
              products={products}
              filterState={filterState}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
              onSelectProduct={(p) => setSelectedProduct(p)}
              onQuickView={(p) => setQuickViewProduct(p)}
              totalAvailable={totalCount}
            />
          </div>

          {/* Craftsmanship & Material Philosophy Section */}
          <StorySection />
        </main>

        {/* Footer */}
        <Footer
          onSelectCategory={handleCategorySelect}
          onScrollToStory={scrollToStory}
        />

        {/* Modals & Overlays */}
        {/* 1. Full Product Detail Dossier (PDP) */}
        {selectedProduct && (
          <ProductDetailModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onSelectRelated={(related) => setSelectedProduct(related)}
          />
        )}

        {/* 2. Rapid Quick View Preview */}
        {quickViewProduct && (
          <QuickViewModal
            product={quickViewProduct}
            onClose={() => setQuickViewProduct(null)}
            onViewFullDetails={(product) => {
              setQuickViewProduct(null);
              setSelectedProduct(product);
            }}
          />
        )}

        {/* 3. Slide-over Shopping Bag Drawer */}
        <CartDrawer
          onStartCheckout={() => setIsCheckoutOpen(true)}
        />

        {/* 4. Full Multi-step Checkout Modal */}
        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
        />

        {/* 5. Wishlist / Saved Items Modal */}
        <WishlistModal
          isOpen={isWishlistOpen}
          onClose={() => setIsWishlistOpen(false)}
          onSelectProduct={(product) => setSelectedProduct(product)}
        />

        {/* 6. Instant Catalog Search Modal */}
        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          onSelectProduct={(product) => setSelectedProduct(product)}
        />

      </div>
    </CartProvider>
  );
}
