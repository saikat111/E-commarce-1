import React from 'react';
import { Heart, Trash2, ShoppingBag, ArrowRight, ChevronRight, Zap } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { PRODUCTS_CATALOG } from '../../data/products';
import { Product, PageRoute, ProductCategory } from '../../types';
import { formatBDT } from '../../utils/formatters';

interface WishlistPageProps {
  onNavigate: (page: PageRoute, category?: ProductCategory, productId?: string) => void;
  onSelectProduct: (product: Product) => void;
  onBuyNow: (product: Product) => void;
}

export const WishlistPage: React.FC<WishlistPageProps> = ({
  onNavigate,
  onSelectProduct,
  onBuyNow,
}) => {
  const { wishlist, toggleWishlist, addItem } = useCart();
  const savedProducts = PRODUCTS_CATALOG.filter((p) => wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-neutral-500 font-medium">
        <button onClick={() => onNavigate('home')} className="hover:text-neutral-900 cursor-pointer">
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
        <span className="text-neutral-900 font-semibold">Saved Wishlist</span>
      </nav>

      <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-neutral-950 flex items-center gap-2">
            <Heart className="w-7 h-7 text-red-600 fill-current" />
            <span>My Wishlist ({savedProducts.length})</span>
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Bookmarked items with live BDT pricing and availability tracking.
          </p>
        </div>
      </div>

      {savedProducts.length === 0 ? (
        <div className="bg-white rounded-3xl border border-neutral-200 p-16 text-center space-y-4 shadow-2xs">
          <div className="w-16 h-16 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-neutral-900">Your wishlist is empty</h3>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto">
            Save products by clicking the heart icon on any card to monitor deals and buy later.
          </p>
          <button
            onClick={() => onNavigate('category')}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer shadow-md inline-flex items-center gap-2"
          >
            <span>Explore Marketplace Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {savedProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => onSelectProduct(product)}
              className="group bg-white rounded-2xl border border-neutral-200 hover:border-neutral-400 hover:shadow-lg transition-all p-3 flex flex-col justify-between cursor-pointer"
            >
              <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-neutral-100 mb-3">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(product.id);
                  }}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-1 flex-1">
                <h4 className="text-xs font-bold text-neutral-900 group-hover:text-red-600 transition-colors line-clamp-1">
                  {product.name}
                </h4>
                <div className="flex items-baseline gap-1.5 font-mono tabular-nums pt-1">
                  <span className="text-base font-black text-red-600">{formatBDT(product.priceBDT)}</span>
                  <span className="text-xs text-neutral-400 line-through">{formatBDT(product.originalPriceBDT)}</span>
                </div>
              </div>

              <div className="pt-3 grid grid-cols-2 gap-2" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => addItem(product)}
                  className="py-2 px-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Cart</span>
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
          ))}
        </div>
      )}

    </div>
  );
};
