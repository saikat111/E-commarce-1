import React, { useState } from 'react';
import { 
  Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag, 
  Check, ShoppingBag, Truck, ChevronRight 
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatBDT } from '../../utils/formatters';
import { PageRoute } from '../../types';

interface CartPageProps {
  onNavigate: (page: PageRoute) => void;
  onProceedToCheckout: () => void;
}

export const CartPage: React.FC<CartPageProps> = ({
  onNavigate,
  onProceedToCheckout,
}) => {
  const {
    cart,
    updateQuantity,
    removeItem,
    toggleItemSelection,
    toggleSelectAll,
    allSelected,
    appliedPromo,
    promoError,
    applyPromoCode,
    removePromoCode,
    freeShippingThresholdBDT,
    freeShippingRemainingBDT,
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoLoading, setPromoLoading] = useState(false);

  const handleApplyPromo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    setPromoLoading(true);
    await applyPromoCode(promoInput);
    setPromoLoading(false);
  };

  const selectedCount = cart.items.filter((i) => i.selected).length;

  const freeShippingProgress = Math.min(
    100,
    Math.round(((freeShippingThresholdBDT - freeShippingRemainingBDT) / freeShippingThresholdBDT) * 100)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-neutral-500 font-medium">
        <button onClick={() => onNavigate('home')} className="hover:text-neutral-900 cursor-pointer">
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
        <span className="text-neutral-900 font-semibold">Shopping Cart</span>
      </nav>

      <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-neutral-950">
            Shopping Cart ({cart.items.length})
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Prices displayed in Bangladeshi Taka (BDT). Free shipping over ৳2,500.
          </p>
        </div>
      </div>

      {cart.items.length === 0 ? (
        <div className="bg-white rounded-3xl border border-neutral-200 p-16 text-center space-y-4 shadow-2xs">
          <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mx-auto text-neutral-400">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-neutral-900">Your shopping bag is currently empty</h3>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto">
            Discover verified tech, lighting, watches, and furniture with direct delivery inside Bangladesh.
          </p>
          <button
            onClick={() => onNavigate('category')}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer shadow-md inline-flex items-center gap-2"
          >
            <span>Start Shopping Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Items Table */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* Free Shipping Banner */}
            <div className="p-4 bg-emerald-50/80 rounded-2xl border border-emerald-200 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-900 flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-emerald-600" />
                  {freeShippingRemainingBDT > 0 ? (
                    <>Add {formatBDT(freeShippingRemainingBDT)} more for Free Nationwide Delivery</>
                  ) : (
                    <>Free Insured Delivery to all 64 districts in Bangladesh Unlocked!</>
                  )}
                </span>
                <span className="font-mono text-emerald-700 font-bold">{freeShippingProgress}%</span>
              </div>
              <div className="w-full bg-emerald-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-600 h-full rounded-full transition-all duration-300"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>

            {/* Select All Row */}
            <div className="bg-white rounded-2xl border border-neutral-200 p-4 flex items-center justify-between text-xs">
              <label className="flex items-center gap-2.5 font-bold text-neutral-800 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleSelectAll}
                  className="w-4 h-4 rounded text-red-600 focus:ring-0 cursor-pointer"
                />
                <span>Select All Items ({cart.items.length})</span>
              </label>

              <span className="text-neutral-500 font-mono text-[11px]">
                {selectedCount} item{selectedCount === 1 ? '' : 's'} selected for checkout
              </span>
            </div>

            {/* Items List */}
            <div className="space-y-3">
              {cart.items.map((item) => (
                <div
                  key={item.id}
                  className={`bg-white rounded-2xl border transition-all p-4 flex items-start gap-4 ${
                    item.selected ? 'border-neutral-300 shadow-2xs' : 'border-neutral-200 opacity-70'
                  }`}
                >
                  {/* Select Checkbox */}
                  <input
                    type="checkbox"
                    checked={item.selected}
                    onChange={() => toggleItemSelection(item.id)}
                    className="mt-3 w-4 h-4 rounded text-red-600 focus:ring-0 cursor-pointer"
                  />

                  {/* Thumbnail Image */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200 shrink-0">
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info & Quantity */}
                  <div className="flex-1 flex flex-col justify-between min-h-[5rem]">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-neutral-900 line-clamp-1">
                          {item.product.name}
                        </h4>
                        <div className="flex items-center gap-2 text-[11px] text-neutral-500 mt-1">
                          <span
                            className="w-3 h-3 rounded-full border border-neutral-300"
                            style={{ backgroundColor: item.selectedColor.hex }}
                          />
                          <span>{item.selectedColor.label}</span>
                          {item.selectedSpec && <span>· {item.selectedSpec.label}</span>}
                        </div>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-neutral-400 hover:text-red-600 p-1 transition-colors cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Price and Quantity Stepper */}
                    <div className="pt-3 flex items-center justify-between">
                      <div className="font-mono tabular-nums">
                        <span className="text-sm sm:text-base font-black text-neutral-900">
                          {formatBDT(item.unitPriceBDT * item.quantity)}
                        </span>
                        <span className="text-xs text-neutral-400 block sm:inline sm:ml-2">
                          ({formatBDT(item.unitPriceBDT)} each)
                        </span>
                      </div>

                      {/* Stepper */}
                      <div className="flex items-center border border-neutral-300 rounded-lg bg-neutral-50 h-8">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 text-neutral-600 hover:text-neutral-950 cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 font-mono text-xs font-bold text-neutral-900 tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 text-neutral-600 hover:text-neutral-950 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Order Summary in BDT */}
          <div className="lg:col-span-4 bg-white rounded-3xl border border-neutral-200 p-6 space-y-5 shadow-xs sticky top-24">
            <h3 className="text-sm font-black uppercase tracking-wider text-neutral-900 border-b border-neutral-100 pb-3">
              Order Summary (BDT)
            </h3>

            {/* Promo Code Form */}
            {appliedPromo ? (
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-emerald-800">
                  <Tag className="w-4 h-4 text-emerald-600" />
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
                    className="flex-1 uppercase text-xs px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-xl outline-hidden focus:border-red-600"
                  />
                  <button
                    type="submit"
                    disabled={promoLoading || !promoInput.trim()}
                    className="px-3.5 py-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold rounded-xl disabled:opacity-50 transition-colors cursor-pointer"
                  >
                    {promoLoading ? 'Checking...' : 'Apply'}
                  </button>
                </div>
                {promoError && (
                  <p className="text-[11px] text-red-600 pl-1">{promoError}</p>
                )}
              </form>
            )}

            {/* Calculations */}
            <div className="space-y-2 text-xs font-mono tabular-nums">
              <div className="flex justify-between text-neutral-600">
                <span>Selected Items ({selectedCount}):</span>
                <span>{formatBDT(cart.subtotalBDT)}</span>
              </div>
              {cart.discountBDT > 0 && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Coupon Discount:</span>
                  <span>-{formatBDT(cart.discountBDT)}</span>
                </div>
              )}
              <div className="flex justify-between text-neutral-600">
                <span>Delivery Charge (BD):</span>
                <span>{cart.shippingBDT === 0 ? 'FREE' : formatBDT(cart.shippingBDT)}</span>
              </div>
              <div className="pt-3 border-t border-neutral-200 flex justify-between text-base font-black text-neutral-950 font-sans">
                <span>Total Amount:</span>
                <span className="font-mono text-red-600 text-xl">{formatBDT(cart.totalBDT)}</span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={onProceedToCheckout}
              disabled={selectedCount === 0}
              className="w-full py-3.5 px-4 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40"
            >
              <span>Proceed to Checkout ({selectedCount})</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="pt-2 text-[11px] text-neutral-500 text-center flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Safe & Encrypted Checkout · Cash on Delivery</span>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
