import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ArrowRight, Tag, Check, ShoppingBag, ShieldCheck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { ProductIllustration } from '../shop/ProductIllustration';

interface CartDrawerProps {
  onStartCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onStartCheckout }) => {
  const {
    cart,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeItem,
    appliedPromo,
    promoError,
    applyPromoCode,
    removePromoCode,
    freeShippingThreshold,
    freeShippingRemaining,
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoLoading, setPromoLoading] = useState(false);

  if (!isCartOpen) return null;

  const handleApplyPromo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    setPromoLoading(true);
    await applyPromoCode(promoInput);
    setPromoLoading(false);
  };

  const freeShippingProgress = Math.min(
    100,
    Math.round(((freeShippingThreshold - freeShippingRemaining) / freeShippingThreshold) * 100)
  );

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-neutral-950/60 backdrop-blur-xs transition-opacity duration-300"
      onClick={closeCart}
    >
      <div
        className="fixed inset-y-0 right-0 max-w-full flex pl-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-screen max-w-md bg-white border-l border-neutral-200 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 border-b border-neutral-200 bg-neutral-50/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-neutral-900" />
              <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-900">
                Your Curated Bag ({cart.items.reduce((s, i) => s + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 rounded-full text-neutral-400 hover:text-neutral-900 hover:bg-neutral-200/50 transition-colors"
              aria-label="Close bag"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Complimentary Shipping Progress Banner */}
          <div className="px-5 py-3 bg-neutral-100/70 border-b border-neutral-200 text-xs">
            {freeShippingRemaining > 0 ? (
              <p className="text-neutral-700">
                Add <span className="font-mono font-semibold tabular-nums">${freeShippingRemaining}</span> more for complimentary carbon-neutral freight.
              </p>
            ) : (
              <p className="text-emerald-800 font-medium flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Complimentary insured freight unlocked!</span>
              </p>
            )}
            <div className="w-full bg-neutral-200 h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-neutral-900 h-full transition-all duration-300"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Scrollable Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.items.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mx-auto text-neutral-400">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-medium text-neutral-900">Your shopping bag is empty</h3>
                <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                  Explore our curated architectural objects and furniture to add timeless pieces.
                </p>
              </div>
            ) : (
              cart.items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3.5 bg-neutral-50 rounded-xl border border-neutral-200/80"
                >
                  {/* Thumbnail */}
                  <div className="w-18 h-18 bg-white rounded-lg border border-neutral-200 p-1 flex items-center justify-center shrink-0">
                    <ProductIllustration
                      visualId={item.product.visualId}
                      activeColorHex={item.selectedColor.hex}
                      className="w-14 h-14"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="text-xs font-semibold text-neutral-900 line-clamp-1">
                          {item.product.name}
                        </h4>
                        <div className="flex items-center gap-1.5 text-[11px] text-neutral-500 mt-0.5">
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-neutral-300"
                            style={{ backgroundColor: item.selectedColor.hex }}
                          />
                          <span>{item.selectedColor.name}</span>
                          {item.selectedMaterial && (
                            <>
                              <span>·</span>
                              <span>{item.selectedMaterial.name}</span>
                            </>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-neutral-400 hover:text-red-600 transition-colors p-1"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-neutral-300 rounded-md bg-white">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 text-neutral-500 hover:text-neutral-900"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 font-mono text-xs tabular-nums font-semibold text-neutral-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-neutral-500 hover:text-neutral-900"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Price in Tabular Numerals */}
                      <span className="font-mono text-xs font-semibold text-neutral-900 tabular-nums">
                        ${item.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {cart.items.length > 0 && (
            <div className="p-5 border-t border-neutral-200 bg-neutral-50/90 space-y-4">
              
              {/* Promo Code Input */}
              {appliedPromo ? (
                <div className="flex items-center justify-between p-2.5 bg-emerald-50 rounded-lg border border-emerald-200 text-xs">
                  <div className="flex items-center gap-2 text-emerald-800">
                    <Tag className="w-3.5 h-3.5" />
                    <span><strong>{appliedPromo.code}</strong> applied ({appliedPromo.discountPercent}% off)</span>
                  </div>
                  <button
                    onClick={removePromoCode}
                    className="text-xs text-emerald-700 underline hover:text-emerald-900"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="space-y-1">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo code (e.g. WELCOME10)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="flex-1 uppercase text-xs px-3 py-1.5 bg-white border border-neutral-300 rounded-lg focus:outline-hidden focus:border-neutral-900"
                    />
                    <button
                      type="submit"
                      disabled={promoLoading || !promoInput.trim()}
                      className="px-3 py-1.5 bg-neutral-900 text-white text-xs font-semibold rounded-lg hover:bg-neutral-800 disabled:opacity-40 transition-colors"
                    >
                      {promoLoading ? 'Checking...' : 'Apply'}
                    </button>
                  </div>
                  {promoError && (
                    <p className="text-[11px] text-red-600 pl-1">{promoError}</p>
                  )}
                </form>
              )}

              {/* Order Calculations in Tabular Figures */}
              <div className="space-y-1.5 text-xs font-mono tabular-nums">
                <div className="flex justify-between text-neutral-600">
                  <span>Subtotal</span>
                  <span>${cart.subtotal}</span>
                </div>
                {cart.discount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Courtesy Discount</span>
                    <span>-${cart.discount}</span>
                  </div>
                )}
                <div className="flex justify-between text-neutral-600">
                  <span>Insured Shipping</span>
                  <span>{cart.shipping === 0 ? 'Free' : `$${cart.shipping}`}</span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-neutral-900 pt-2 border-t border-neutral-200">
                  <span className="font-sans">Estimated Total</span>
                  <span>${cart.total}</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => {
                  closeCart();
                  onStartCheckout();
                }}
                className="w-full py-3.5 px-4 bg-neutral-900 text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-neutral-800 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Encrypted 256-bit checkout · 30-day returns</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
