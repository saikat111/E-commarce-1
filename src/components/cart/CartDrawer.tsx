import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ArrowRight, Tag, Check, ShoppingBag, ShieldCheck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatBDT } from '../../utils/formatters';

interface CartDrawerProps {
  onStartCheckout: () => void;
  onViewCartPage: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onStartCheckout, onViewCartPage }) => {
  const {
    cart,
    isCartDrawerOpen,
    closeCartDrawer,
    updateQuantity,
    removeItem,
    appliedPromo,
    promoError,
    applyPromoCode,
    removePromoCode,
    freeShippingThresholdBDT,
    freeShippingRemainingBDT,
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoLoading, setPromoLoading] = useState(false);

  if (!isCartDrawerOpen) return null;

  const handleApplyPromo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    setPromoLoading(true);
    await applyPromoCode(promoInput);
    setPromoLoading(false);
  };

  const freeShippingProgress = Math.min(
    100,
    Math.round(((freeShippingThresholdBDT - freeShippingRemainingBDT) / freeShippingThresholdBDT) * 100)
  );

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-neutral-950/60 backdrop-blur-xs transition-opacity duration-300"
      onClick={closeCartDrawer}
    >
      <div
        className="fixed inset-y-0 right-0 max-w-full flex pl-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-screen max-w-md bg-white border-l border-neutral-200 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-neutral-200 bg-neutral-50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-red-600" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
                Shopping Cart ({cart.items.reduce((s, i) => s + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={closeCartDrawer}
              className="p-1.5 rounded-full text-neutral-400 hover:text-neutral-900 hover:bg-neutral-200 transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Free Shipping Progress Banner */}
          <div className="px-5 py-3 bg-emerald-50/80 border-b border-emerald-100 text-xs">
            {freeShippingRemainingBDT > 0 ? (
              <p className="text-emerald-900 font-medium">
                Add <span className="font-mono font-bold">{formatBDT(freeShippingRemainingBDT)}</span> more for Free Nationwide Delivery.
              </p>
            ) : (
              <p className="text-emerald-800 font-bold flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Free Insured Delivery to all 64 districts Unlocked!</span>
              </p>
            )}
            <div className="w-full bg-emerald-200 h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-emerald-600 h-full transition-all duration-300 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Scrollable Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3">
            {cart.items.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mx-auto text-neutral-400">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-neutral-900">Your cart is empty</h3>
                <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                  Explore trending electronics, lighting, and lifestyle items with direct courier delivery.
                </p>
              </div>
            ) : (
              cart.items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 p-3 bg-neutral-50 rounded-2xl border border-neutral-200/80"
                >
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-white border border-neutral-200 shrink-0">
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex items-start justify-between gap-1">
                      <div>
                        <h4 className="text-xs font-bold text-neutral-900 line-clamp-1">
                          {item.product.name}
                        </h4>
                        <div className="flex items-center gap-1.5 text-[11px] text-neutral-500 mt-0.5">
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-neutral-300"
                            style={{ backgroundColor: item.selectedColor.hex }}
                          />
                          <span>{item.selectedColor.name}</span>
                          {item.selectedSpec && <span>· {item.selectedSpec.label}</span>}
                        </div>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-neutral-400 hover:text-red-600 p-1 transition-colors cursor-pointer"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-neutral-300 rounded-md bg-white">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 text-neutral-600 hover:text-neutral-900 cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 font-mono text-xs font-bold text-neutral-900 tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-neutral-600 hover:text-neutral-900 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-mono text-xs font-black text-neutral-950 tabular-nums">
                        {formatBDT(item.unitPriceBDT * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {cart.items.length > 0 && (
            <div className="p-5 border-t border-neutral-200 bg-white space-y-3">
              
              {/* Promo Code Input */}
              {appliedPromo ? (
                <div className="flex items-center justify-between p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 text-xs">
                  <div className="flex items-center gap-2 text-emerald-800">
                    <Tag className="w-3.5 h-3.5 text-emerald-600" />
                    <span><strong>{appliedPromo.code}</strong> applied (-{formatBDT(appliedPromo.discountBDT)})</span>
                  </div>
                  <button
                    onClick={removePromoCode}
                    className="text-xs font-bold text-emerald-700 underline cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="space-y-1">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Coupon code (e.g. ALIBD500)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="flex-1 uppercase text-xs px-3 py-1.5 bg-neutral-50 border border-neutral-300 rounded-lg outline-hidden focus:border-red-600"
                    />
                    <button
                      type="submit"
                      disabled={promoLoading || !promoInput.trim()}
                      className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold rounded-lg disabled:opacity-40 transition-colors cursor-pointer"
                    >
                      {promoLoading ? '...' : 'Apply'}
                    </button>
                  </div>
                  {promoError && (
                    <p className="text-[11px] text-red-600 pl-1">{promoError}</p>
                  )}
                </form>
              )}

              {/* Order Calculations in Tabular Figures */}
              <div className="space-y-1.5 text-xs font-mono tabular-nums pt-1">
                <div className="flex justify-between text-neutral-600">
                  <span>Subtotal:</span>
                  <span>{formatBDT(cart.subtotalBDT)}</span>
                </div>
                {cart.discountBDT > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Coupon Discount:</span>
                    <span>-{formatBDT(cart.discountBDT)}</span>
                  </div>
                )}
                <div className="flex justify-between text-neutral-600">
                  <span>Shipping:</span>
                  <span>{cart.shippingBDT === 0 ? 'FREE' : formatBDT(cart.shippingBDT)}</span>
                </div>
                <div className="flex justify-between text-base font-black text-neutral-950 pt-2 border-t border-neutral-200 font-sans">
                  <span>Total (BDT):</span>
                  <span className="font-mono text-red-600 text-lg">{formatBDT(cart.totalBDT)}</span>
                </div>
              </div>

              {/* Dual Actions: View Full Cart Page or Express Checkout */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => {
                    closeCartDrawer();
                    onStartCheckout();
                  }}
                  className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Express Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    closeCartDrawer();
                    onViewCartPage();
                  }}
                  className="w-full py-2.5 px-4 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 text-xs font-bold rounded-xl transition-colors cursor-pointer text-center"
                >
                  View Full Cart & Select Items
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Cash on Delivery & bKash Supported</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
