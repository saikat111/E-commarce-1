import React from 'react';
import { X, Heart, Trash2, Plus, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { PRODUCTS_CATALOG } from '../../data/products';
import { ProductIllustration } from './ProductIllustration';
import { Product } from '../../types';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  const { wishlist, toggleWishlist, addItem } = useCart();

  if (!isOpen) return null;

  const savedProducts = PRODUCTS_CATALOG.filter((p) => wishlist.includes(p.id));

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-neutral-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b border-neutral-200 bg-neutral-50/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-red-600 fill-current" />
            <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-900">
              Saved Collection ({savedProducts.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-neutral-400 hover:text-neutral-900 hover:bg-neutral-200/50 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {savedProducts.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <Heart className="w-8 h-8 text-neutral-300 mx-auto" />
              <p className="text-sm font-medium text-neutral-900">No objects saved yet</p>
              <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                Click the heart on any card in the catalog to bookmark items for future consideration.
              </p>
            </div>
          ) : (
            savedProducts.map((p) => (
              <div
                key={p.id}
                className="flex items-center gap-4 p-3.5 bg-neutral-50 rounded-xl border border-neutral-200/80 hover:border-neutral-300 transition-all"
              >
                <div
                  className="w-16 h-16 bg-white rounded-lg border border-neutral-200 p-1 flex items-center justify-center shrink-0 cursor-pointer"
                  onClick={() => {
                    onClose();
                    onSelectProduct(p);
                  }}
                >
                  <ProductIllustration visualId={p.visualId} className="w-12 h-12" />
                </div>

                <div
                  className="flex-1 min-w-0 cursor-pointer"
                  onClick={() => {
                    onClose();
                    onSelectProduct(p);
                  }}
                >
                  <h4 className="text-xs font-semibold text-neutral-900 truncate">{p.name}</h4>
                  <p className="text-[11px] text-neutral-500 font-mono tabular-nums">${p.price}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      addItem(p);
                      onClose();
                    }}
                    className="p-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors text-xs flex items-center gap-1"
                    title="Move to bag"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Add</span>
                  </button>
                  <button
                    onClick={() => toggleWishlist(p.id)}
                    className="p-2 text-neutral-400 hover:text-red-600 transition-colors"
                    title="Remove from saved"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
