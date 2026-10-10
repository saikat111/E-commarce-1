/**
 * Nexus Bazaar - Ultra-Modern Multi-Page Marketplace
 * Pricing in Bangladeshi Taka (BDT)
 * AliExpress-Inspired UX with Category Page, Dedicated PDP, Related Products, and Express Checkout
 */

import React, { useState, useEffect } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { AliNavbar } from './components/layout/AliNavbar';
import { HeaderBreadcrumb } from './components/layout/HeaderBreadcrumb';
import { Footer } from './components/layout/Footer';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { HomePage } from './components/pages/HomePage';
import { CategoryPage } from './components/pages/CategoryPage';
import { ProductDetailPage } from './components/pages/ProductDetailPage';
import { CartPage } from './components/pages/CartPage';
import { CheckoutPage } from './components/pages/CheckoutPage';
import { WishlistPage } from './components/pages/WishlistPage';
import { UserDashboard } from './components/dashboard/UserDashboard';
import { CartDrawer } from './components/cart/CartDrawer';
import { RecentActivityToast } from './components/notifications/RecentActivityToast';
import { CompareProvider } from './context/CompareContext';
import { CompareFloatingBar } from './components/compare/CompareFloatingBar';
import { ProductComparisonModal } from './components/compare/ProductComparisonModal';
import { SupportChatModal } from './components/chat/SupportChatModal';
import { PriceDropBannerToast } from './components/product/PriceDropBannerToast';
import { api } from './services/api';
import { recordProductView } from './services/browsingHistory';
import { Product, ProductCategory, PageRoute, ProductVariantColor, ProductVariantSpec } from './types';
import { PRODUCTS_CATALOG } from './data/products';

function MarketplaceRouter() {
  const { addItem } = useCart();

  // Multi-Page Navigation State
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('all');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [allProducts, setAllProducts] = useState<Product[]>(PRODUCTS_CATALOG);

  // Initialize and handle browser back/forward history
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      if (e.state) {
        if (e.state.page) setCurrentPage(e.state.page);
        if (e.state.category) setActiveCategory(e.state.category);
        if (e.state.productId) {
          const found = PRODUCTS_CATALOG.find((p) => p.id === e.state.productId);
          if (found) setSelectedProduct(found);
        }
      } else {
        setCurrentPage('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Fetch related products whenever active product changes
  useEffect(() => {
    if (selectedProduct) {
      api.products.getRelated(selectedProduct.id, 4).then((res) => {
        setRelatedProducts(res);
      });
    }
  }, [selectedProduct]);

  /**
   * Unified Multi-Page Navigator
   */
  const navigateTo = (page: PageRoute, category?: ProductCategory, productId?: string) => {
    if (category) {
      if (category !== activeCategory) {
        setSelectedSubcategory('all');
      }
      setActiveCategory(category);
    }

    if (productId) {
      const found = PRODUCTS_CATALOG.find((p) => p.id === productId);
      if (found) {
        setSelectedProduct(found);
        recordProductView(found);
      }
    }

    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Push state to browser history for seamless back/forward navigation
    try {
      window.history.pushState(
        { page, category: category || activeCategory, productId },
        '',
        page === 'home' ? '/' : `/#${page}${category ? `/${category}` : ''}${productId ? `/${productId}` : ''}`
      );
    } catch {
      // Ignore in sandbox environments
    }
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    recordProductView(product);
    navigateTo('product', product.category, product.id);
  };

  /**
   * Functional "Buy Now" handler across the entire multi-page application:
   * Adds the selected item to cart, selects it, and immediately opens the dedicated Checkout page!
   */
  const handleBuyNow = (
    product: Product,
    selectedColor?: ProductVariantColor,
    selectedSpec?: ProductVariantSpec,
    quantity: number = 1
  ) => {
    addItem(product, selectedColor, selectedSpec, quantity);
    navigateTo('checkout');
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-100 text-neutral-900 font-sans selection:bg-red-600 selection:text-white">
      
      {/* AliExpress-Style Top Navigation Bar */}
      <AliNavbar
        currentPage={currentPage}
        activeCategory={activeCategory}
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          if (q.trim().length > 0 && currentPage !== 'category') {
            navigateTo('category', activeCategory);
          }
        }}
        onNavigate={navigateTo}
      />

      {/* Dynamic Header Breadcrumb Navigation (for Category and Product PDP Pages) */}
      <HeaderBreadcrumb
        currentPage={currentPage}
        activeCategory={activeCategory}
        product={selectedProduct}
        selectedSubcategory={selectedSubcategory}
        onNavigate={navigateTo}
        onSelectSubcategory={(sub) => setSelectedSubcategory(sub)}
      />

      {/* Main Multi-Page Route Render Stage (with padding bottom on mobile for app bottom nav bar) */}
      <main className="flex-1 pb-16 md:pb-0">
        
        {/* Page 1: Home Page */}
        {currentPage === 'home' && (
          <HomePage
            products={allProducts}
            onNavigate={navigateTo}
            onSelectProduct={handleSelectProduct}
            onBuyNow={handleBuyNow}
          />
        )}

        {/* Page 2: Category Page with Facet Sidebar */}
        {currentPage === 'category' && (
          <CategoryPage
            products={allProducts}
            activeCategory={activeCategory}
            searchQuery={searchQuery}
            selectedSubcategory={selectedSubcategory}
            onSelectSubcategory={setSelectedSubcategory}
            onNavigate={navigateTo}
            onSelectProduct={handleSelectProduct}
            onBuyNow={handleBuyNow}
            onCategoryChange={(cat) => {
              setActiveCategory(cat);
              setSelectedSubcategory('all');
            }}
          />
        )}

        {/* Page 3: Product Details Page (PDP) with Related Products */}
        {currentPage === 'product' && selectedProduct && (
          <ProductDetailPage
            product={selectedProduct}
            relatedProducts={relatedProducts}
            onNavigate={navigateTo}
            onSelectProduct={handleSelectProduct}
            onBuyNow={handleBuyNow}
          />
        )}

        {/* Page 4: Dedicated Cart Page */}
        {currentPage === 'cart' && (
          <CartPage
            onNavigate={navigateTo}
            onProceedToCheckout={() => navigateTo('checkout')}
          />
        )}

        {/* Page 5: Dedicated Checkout Page with Bangladesh Logistics & bKash/COD */}
        {currentPage === 'checkout' && (
          <CheckoutPage
            onNavigate={navigateTo}
          />
        )}

        {/* Page 6: Saved Wishlist Page */}
        {currentPage === 'wishlist' && (
          <WishlistPage
            onNavigate={navigateTo}
            onSelectProduct={handleSelectProduct}
            onBuyNow={handleBuyNow}
          />
        )}

        {/* Page 7: Dedicated User Account Dashboard & Order Tracking */}
        {currentPage === 'dashboard' && (
          <UserDashboard
            onNavigate={navigateTo}
            onSelectProduct={handleSelectProduct}
          />
        )}

      </main>

      {/* Global Slide-Over Cart Drawer */}
      <CartDrawer
        onStartCheckout={() => navigateTo('checkout')}
        onViewCartPage={() => navigateTo('cart')}
      />

      {/* Real-Time 'Recent Activity' Social Proof Toast Notifications */}
      <RecentActivityToast
        onSelectProduct={handleSelectProduct}
      />

      {/* Product Comparison Floating Tray */}
      <CompareFloatingBar />

      {/* Product Comparison Full Specs Matrix Modal */}
      <ProductComparisonModal
        onSelectProduct={handleSelectProduct}
        onBuyNow={(prod) => handleBuyNow(prod, prod.colors[0])}
        onNavigate={navigateTo}
      />

      {/* Price Drop Alert Celebration Banner Toast */}
      <PriceDropBannerToast
        onSelectProduct={handleSelectProduct}
        onBuyNow={(prod) => handleBuyNow(prod, prod.colors[0])}
      />

      {/* Persistent 'Chat with Us' FAB & Mock AI Support Chat */}
      <SupportChatModal
        onNavigate={navigateTo}
        onSelectProduct={handleSelectProduct}
      />

      {/* Footer with Payment Methods, Bangladesh Hubs, and Policies */}
      <Footer onNavigate={navigateTo} />

      {/* Persistent Native Mobile App Bottom Tab Bar */}
      <MobileBottomNav
        currentPage={currentPage}
        onNavigate={navigateTo}
      />

    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <CompareProvider>
        <MarketplaceRouter />
      </CompareProvider>
    </CartProvider>
  );
}
