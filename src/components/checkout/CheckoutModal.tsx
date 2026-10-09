import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, ArrowRight, CreditCard, Banknote, Sparkles, Truck, Package } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { CustomerShippingInfo, Order } from '../../types';
import { api } from '../../services/api';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderCompleted?: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  onOrderCompleted,
}) => {
  const { cart, clearCart } = useCart();

  const [step, setStep] = useState<'details' | 'payment' | 'confirmation'>('details');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  const [shippingInfo, setShippingInfo] = useState<CustomerShippingInfo>({
    firstName: 'Linus',
    lastName: 'Wallin',
    email: 'linus.wallin@example.com',
    phone: '+46 8 123 4567',
    addressLine1: 'Strandvägen 42',
    city: 'Stockholm',
    state: 'Stockholms Län',
    postalCode: '114 56',
    country: 'Sweden',
    shippingSpeed: 'standard',
    paymentMethod: 'card',
    cardDetails: {
      cardNumber: '•••• •••• •••• 4242',
      expiry: '09/28',
      cvv: '888',
    },
  });

  if (!isOpen) return null;

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePlaceOrder = async () => {
    setIsSubmitting(true);
    try {
      const order = await api.orders.create({
        customer: shippingInfo,
        items: cart.items,
        cart: cart,
      });

      setCompletedOrder(order);
      clearCart();
      setStep('confirmation');
      if (onOrderCompleted) {
        onOrderCompleted(order);
      }
    } catch (err) {
      console.error('Order creation failed:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 bg-neutral-50/90">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-900">
              {step === 'confirmation' ? 'Order Finalized' : 'Secure Atelier Checkout'}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-neutral-400 hover:text-neutral-900 hover:bg-neutral-200/50 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 sm:p-8">
          {step === 'details' && (
            <form onSubmit={handleDetailsSubmit} className="space-y-6">
              <div>
                <h3 className="text-lg font-serif font-normal text-neutral-900">
                  Shipping & Collector Details
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  We ship in molded pulp, plastic-free custom crating with insured tracking.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-medium text-neutral-700 block mb-1">First Name</label>
                  <input
                    type="text"
                    required
                    value={shippingInfo.firstName}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, firstName: e.target.value })}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-hidden focus:border-neutral-900"
                  />
                </div>
                <div>
                  <label className="font-medium text-neutral-700 block mb-1">Last Name</label>
                  <input
                    type="text"
                    required
                    value={shippingInfo.lastName}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, lastName: e.target.value })}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-hidden focus:border-neutral-900"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="font-medium text-neutral-700 block mb-1">Email for Shipment Notification</label>
                  <input
                    type="email"
                    required
                    value={shippingInfo.email}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-hidden focus:border-neutral-900"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="font-medium text-neutral-700 block mb-1">Street Address</label>
                  <input
                    type="text"
                    required
                    value={shippingInfo.addressLine1}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, addressLine1: e.target.value })}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-hidden focus:border-neutral-900"
                  />
                </div>
                <div>
                  <label className="font-medium text-neutral-700 block mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={shippingInfo.city}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-hidden focus:border-neutral-900"
                  />
                </div>
                <div>
                  <label className="font-medium text-neutral-700 block mb-1">Postal Code</label>
                  <input
                    type="text"
                    required
                    value={shippingInfo.postalCode}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, postalCode: e.target.value })}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-hidden focus:border-neutral-900"
                  />
                </div>
                <div>
                  <label className="font-medium text-neutral-700 block mb-1">Country</label>
                  <input
                    type="text"
                    required
                    value={shippingInfo.country}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, country: e.target.value })}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-hidden focus:border-neutral-900"
                  />
                </div>
                <div>
                  <label className="font-medium text-neutral-700 block mb-1">Phone for Courier</label>
                  <input
                    type="tel"
                    required
                    value={shippingInfo.phone}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-hidden focus:border-neutral-900"
                  />
                </div>
              </div>

              {/* Order summary mini strip */}
              <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 flex items-center justify-between text-xs">
                <span className="text-neutral-600">Total Items in Cart:</span>
                <span className="font-mono font-semibold tabular-nums">${cart.total}</span>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 text-xs font-semibold text-neutral-600 hover:text-neutral-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-neutral-900 text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-neutral-800 transition-colors"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}

          {step === 'payment' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-serif font-normal text-neutral-900">
                  Select Payment Method
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  End-to-end encrypted simulation. No real charge occurs in preview.
                </p>
              </div>

              {/* Payment Method Selector */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <button
                  type="button"
                  onClick={() => setShippingInfo({ ...shippingInfo, paymentMethod: 'card' })}
                  className={`p-4 rounded-xl border text-left flex items-start gap-3 transition-all ${
                    shippingInfo.paymentMethod === 'card'
                      ? 'border-neutral-900 bg-neutral-50 ring-1 ring-neutral-900'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-neutral-900 mt-0.5" />
                  <div>
                    <div className="font-semibold text-neutral-900">Credit / Debit Card</div>
                    <div className="text-neutral-500 mt-0.5">Visa, Mastercard, Amex, Apple Pay</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setShippingInfo({ ...shippingInfo, paymentMethod: 'cod' })}
                  className={`p-4 rounded-xl border text-left flex items-start gap-3 transition-all ${
                    shippingInfo.paymentMethod === 'cod'
                      ? 'border-neutral-900 bg-neutral-50 ring-1 ring-neutral-900'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <Banknote className="w-4 h-4 text-neutral-900 mt-0.5" />
                  <div>
                    <div className="font-semibold text-neutral-900">Cash on Delivery (COD)</div>
                    <div className="text-neutral-500 mt-0.5">Pay upon inspection at doorstep</div>
                  </div>
                </button>
              </div>

              {/* Simulated Card Fields */}
              {shippingInfo.paymentMethod === 'card' && (
                <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 space-y-3 text-xs">
                  <div>
                    <label className="font-medium text-neutral-700 block mb-1">Card Number</label>
                    <input
                      type="text"
                      disabled
                      value="•••• •••• •••• 4242 (Simulated Sandbox)"
                      className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg text-neutral-500 font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-medium text-neutral-700 block mb-1">Expiry Date</label>
                      <input
                        type="text"
                        disabled
                        value="12/28"
                        className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg text-neutral-500 font-mono"
                      />
                    </div>
                    <div>
                      <label className="font-medium text-neutral-700 block mb-1">Security Code (CVV)</label>
                      <input
                        type="text"
                        disabled
                        value="888"
                        className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg text-neutral-500 font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Order breakdown */}
              <div className="p-4 bg-neutral-100/60 rounded-xl space-y-1.5 text-xs font-mono tabular-nums">
                <div className="flex justify-between text-neutral-600">
                  <span>Cart Subtotal:</span>
                  <span>${cart.subtotal}</span>
                </div>
                {cart.discount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Voucher Discount:</span>
                    <span>-${cart.discount}</span>
                  </div>
                )}
                <div className="flex justify-between text-neutral-600">
                  <span>Carbon-Free Freight:</span>
                  <span>{cart.shipping === 0 ? 'Included' : `$${cart.shipping}`}</span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-neutral-900 pt-2 border-t border-neutral-200">
                  <span className="font-sans">Authorized Amount:</span>
                  <span>${cart.total}</span>
                </div>
              </div>

              <div className="pt-2 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="text-xs font-medium text-neutral-500 hover:text-neutral-900"
                >
                  ← Back to Details
                </button>

                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-neutral-800 disabled:opacity-50 transition-all shadow-sm"
                >
                  {isSubmitting ? (
                    <span>Authorizing Order...</span>
                  ) : (
                    <>
                      <span>Complete & Place Order</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {step === 'confirmation' && completedOrder && (
            <div className="space-y-6 text-center py-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h3 className="text-2xl font-serif font-normal text-neutral-900">
                  Order Confirmed
                </h3>
                <p className="text-xs text-neutral-500">
                  We have received your acquisition. A formal dossier has been routed to{' '}
                  <strong className="text-neutral-800">{completedOrder.customer.email}</strong>.
                </p>
              </div>

              {/* Order Reference Box */}
              <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 text-left space-y-3 text-xs">
                <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
                  <div>
                    <span className="text-neutral-500">Order Number:</span>
                    <p className="font-mono font-semibold text-neutral-900">{completedOrder.orderNumber}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-neutral-500">Estimated Delivery:</span>
                    <p className="font-medium text-neutral-900">{completedOrder.estimatedDeliveryDate}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-neutral-600">
                  <div className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-neutral-500" />
                    <span>Tracking: {completedOrder.trackingNumber}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Package className="w-3.5 h-3.5 text-neutral-500" />
                    <span>Preparing Custom Crating</span>
                  </div>
                </div>

                <div className="border-t border-neutral-200 pt-2 space-y-1 font-mono tabular-nums">
                  <div className="flex justify-between text-neutral-600">
                    <span>Items Ordered:</span>
                    <span>{completedOrder.items.length} units</span>
                  </div>
                  <div className="flex justify-between text-neutral-900 font-semibold">
                    <span>Final Amount:</span>
                    <span>${completedOrder.total}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full py-3 bg-neutral-900 text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-neutral-800 transition-colors shadow-sm"
              >
                Return to Storefront
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
