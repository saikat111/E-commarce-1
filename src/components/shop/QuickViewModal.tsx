import React, { useState } from 'react';
import { X, Check, ArrowRight } from 'lucide-react';
import { Product, ProductVariantColor } from '../../types';
import { ProductIllustration } from './ProductIllustration';
import { useCart } from '../../context/CartContext';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onViewFullDetails: (product: Product) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onViewFullDetails,
}) => {
  if (!product) return null;

  const { addItem } = useCart();
  const [selectedColor, setSelectedColor] = useState<ProductVariantColor>(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addItem(product, selectedColor, product.materialsVariants?.[0], quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 900);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-neutral-950/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl bg-white rounded-2xl shadow-xl border border-neutral-200 overflow-hidden p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          <div className="aspect-square bg-neutral-100 rounded-xl p-4 flex items-center justify-center border border-neutral-200/80">
            <ProductIllustration
              visualId={product.visualId}
              activeColorHex={selectedColor.hex}
            />
          </div>

          <div className="space-y-4">
            <div>
              <div className="text-[11px] uppercase font-semibold text-neutral-500 tracking-wider">
                {product.category}
              </div>
              <h3 className="text-lg font-serif font-normal text-neutral-900 mt-1">
                {product.name}
              </h3>
              <div className="text-sm font-mono font-semibold text-neutral-900 mt-1 tabular-nums">
                ${product.price}
              </div>
            </div>

            {/* Colorways */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-700">Finish:</label>
              <div className="flex gap-1.5">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c)}
                    className={`w-6 h-6 rounded-full border transition-all ${
                      selectedColor.name === c.name
                        ? 'ring-2 ring-neutral-900 scale-110'
                        : 'border-neutral-300'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.label}
                  />
                ))}
              </div>
            </div>

            {/* Quick Action */}
            <div className="space-y-2 pt-2">
              <button
                onClick={handleAddToCart}
                className="w-full py-2.5 px-4 bg-neutral-900 text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-neutral-800 transition-all flex items-center justify-center gap-2 shadow-xs"
              >
                {added ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <span>Add to Bag (${product.price * quantity})</span>
                )}
              </button>

              <button
                onClick={() => {
                  onClose();
                  onViewFullDetails(product);
                }}
                className="w-full py-2 text-xs font-semibold text-neutral-700 hover:text-neutral-950 transition-colors flex items-center justify-center gap-1"
              >
                <span>View Full Architectural Dossier</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
