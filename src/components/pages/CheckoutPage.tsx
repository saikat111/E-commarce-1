import React, { useState } from 'react';
import { 
  CheckCircle2, ShieldCheck, ArrowRight, CreditCard, Banknote, 
  Smartphone, Truck, Package, ChevronRight, ArrowLeft 
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { CustomerShippingInfo, Order, PageRoute } from '../../types';
import { formatBDT } from '../../utils/formatters';
import { api } from '../../services/api';

interface CheckoutPageProps {
  onNavigate: (page: PageRoute) => void;
  onOrderCompleted?: (order: Order) => void;
}

const BD_DIVISIONS = [
  'Dhaka',
  'Chittagong',
  'Sylhet',
  'Khulna',
  'Rajshahi',
  'Rangpur',
  'Barisal',
  'Mymensingh',
];

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  onNavigate,
  onOrderCompleted,
}) => {
  const { cart, clearCart } = useCart();

  const [step, setStep] = useState<'details' | 'payment' | 'confirmation'>('details');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  const [shippingInfo, setShippingInfo] = useState<CustomerShippingInfo>({
    fullName: 'Tanvir Hossain',
    phone: '+880 1712 345678',
    division: 'Dhaka',
    city: 'Dhaka North',
    area: 'Gulshan 2',
    address: 'House 42, Road 11, Block D',
    postalCode: '1212',
    paymentMethod: 'cod',
    cardDetails: {
      cardNumber: '•••• •••• •••• 4242',
      expiry: '12/28',
      cvv: '888',
    },
  });

  const selectedItems = cart.items.filter((i) => i.selected);

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePlaceOrder = async () => {
    setIsSubmitting(true);
    try {
      const order = await api.orders.create({
        customer: shippingInfo,
        items: selectedItems,
        cart: cart,
      });

      setCompletedOrder(order);
      clearCart();
      setStep('confirmation');
      if (onOrderCompleted) {
        onOrderCompleted(order);
      }
    } catch (err) {
      console.error('Order creation error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-neutral-500 font-medium">
        <button onClick={() => onNavigate('home')} className="hover:text-neutral-900 cursor-pointer">
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
        <button onClick={() => onNavigate('cart')} className="hover:text-neutral-900 cursor-pointer">
          Cart
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
        <span className="text-neutral-900 font-semibold">
          {step === 'confirmation' ? 'Order Finalized' : 'Secure Checkout'}
        </span>
      </nav>

      <div className="bg-white rounded-3xl border border-neutral-200 overflow-hidden shadow-sm">
        
        {/* Step Indicator Header */}
        <div className="bg-neutral-950 text-white p-6 sm:px-8 flex items-center justify-between">
          <div>
            <span className="text-[10px] bg-red-600 font-black uppercase tracking-wider px-2 py-0.5 rounded">
              BANGLADESH NATIONWIDE DISPATCH
            </span>
            <h1 className="text-xl sm:text-2xl font-black mt-1">
              {step === 'confirmation' ? 'Order Confirmed!' : 'Express Checkout (BDT)'}
            </h1>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-neutral-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>256-Bit SSL Encrypted</span>
          </div>
        </div>

        {/* Step 1: Shipping Address Form */}
        {step === 'details' && (
          <form onSubmit={handleDetailsSubmit} className="p-6 sm:p-8 space-y-6">
            <div className="border-b border-neutral-100 pb-3">
              <h2 className="text-base font-bold text-neutral-900">
                1. Delivery Address inside Bangladesh
              </h2>
              <p className="text-xs text-neutral-500 mt-0.5">
                We deliver to all residential & commercial addresses with SMS delivery notification.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="sm:col-span-2">
                <label className="font-bold text-neutral-700 block mb-1">Full Receiver Name</label>
                <input
                  type="text"
                  required
                  value={shippingInfo.fullName}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl outline-hidden focus:border-red-600 text-sm"
                />
              </div>

              <div>
                <label className="font-bold text-neutral-700 block mb-1">Contact Phone (for Courier OTP)</label>
                <input
                  type="tel"
                  required
                  value={shippingInfo.phone}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                  placeholder="+880 1XXXXXXXXX"
                  className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl outline-hidden focus:border-red-600 text-sm font-mono"
                />
              </div>

              <div>
                <label className="font-bold text-neutral-700 block mb-1">Division</label>
                <select
                  value={shippingInfo.division}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, division: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl outline-hidden focus:border-red-600 text-sm cursor-pointer"
                >
                  {BD_DIVISIONS.map((div) => (
                    <option key={div} value={div}>{div} Division</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-neutral-700 block mb-1">City / District</label>
                <input
                  type="text"
                  required
                  value={shippingInfo.city}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                  placeholder="e.g. Dhaka, Chittagong, Sylhet"
                  className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl outline-hidden focus:border-red-600 text-sm"
                />
              </div>

              <div>
                <label className="font-bold text-neutral-700 block mb-1">Area / Thana</label>
                <input
                  type="text"
                  required
                  value={shippingInfo.area}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, area: e.target.value })}
                  placeholder="e.g. Gulshan, Dhanmondi, Agrabad"
                  className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl outline-hidden focus:border-red-600 text-sm"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="font-bold text-neutral-700 block mb-1">Street Address / House / Road</label>
                <input
                  type="text"
                  required
                  value={shippingInfo.address}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                  placeholder="House number, Flat number, Road name..."
                  className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl outline-hidden focus:border-red-600 text-sm"
                />
              </div>
            </div>

            {/* Order Brief Strip */}
            <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200 flex items-center justify-between text-xs">
              <div>
                <span className="text-neutral-500 font-medium">Selected for checkout:</span>
                <span className="font-bold text-neutral-900 ml-2">{selectedItems.length} items</span>
              </div>
              <div className="font-mono tabular-nums text-sm font-black text-red-600">
                Total: {formatBDT(cart.totalBDT)}
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                type="button"
                onClick={() => onNavigate('cart')}
                className="text-xs font-bold text-neutral-600 hover:text-neutral-900 flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Cart</span>
              </button>

              <button
                type="submit"
                className="px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                <span>Continue to Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* Step 2: Payment Method (bKash, Nagad, COD, Card) */}
        {step === 'payment' && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="border-b border-neutral-100 pb-3">
              <h2 className="text-base font-bold text-neutral-900">
                2. Select Preferred Payment Method
              </h2>
              <p className="text-xs text-neutral-500 mt-0.5">
                All transactions simulated securely with zero actual charge in developer preview.
              </p>
            </div>

            {/* Payment Method Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              
              {/* Cash on Delivery (COD) */}
              <button
                type="button"
                onClick={() => setShippingInfo({ ...shippingInfo, paymentMethod: 'cod' })}
                className={`p-4 rounded-2xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                  shippingInfo.paymentMethod === 'cod'
                    ? 'border-red-600 bg-red-50/50 ring-2 ring-red-600'
                    : 'border-neutral-200 hover:border-neutral-300'
                }`}
              >
                <Banknote className="w-5 h-5 text-red-600 mt-0.5" />
                <div>
                  <div className="font-bold text-sm text-neutral-900">Cash on Delivery (COD)</div>
                  <div className="text-neutral-500 mt-0.5">Pay in cash when delivery rider hands over your package</div>
                  <span className="inline-block mt-2 text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                    Most Popular in Bangladesh
                  </span>
                </div>
              </button>

              {/* bKash Mobile Wallet */}
              <button
                type="button"
                onClick={() => setShippingInfo({ ...shippingInfo, paymentMethod: 'bkash' })}
                className={`p-4 rounded-2xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                  shippingInfo.paymentMethod === 'bkash'
                    ? 'border-red-600 bg-red-50/50 ring-2 ring-red-600'
                    : 'border-neutral-200 hover:border-neutral-300'
                }`}
              >
                <Smartphone className="w-5 h-5 text-pink-600 mt-0.5" />
                <div>
                  <div className="font-bold text-sm text-neutral-900">bKash Online Payment</div>
                  <div className="text-neutral-500 mt-0.5">Instant checkout with bKash personal wallet</div>
                  <span className="inline-block mt-2 text-[10px] bg-pink-100 text-pink-800 font-bold px-2 py-0.5 rounded">
                    Instant Cashback Eligible
                  </span>
                </div>
              </button>

              {/* Nagad Mobile Wallet */}
              <button
                type="button"
                onClick={() => setShippingInfo({ ...shippingInfo, paymentMethod: 'nagad' })}
                className={`p-4 rounded-2xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                  shippingInfo.paymentMethod === 'nagad'
                    ? 'border-red-600 bg-red-50/50 ring-2 ring-red-600'
                    : 'border-neutral-200 hover:border-neutral-300'
                }`}
              >
                <Smartphone className="w-5 h-5 text-orange-600 mt-0.5" />
                <div>
                  <div className="font-bold text-sm text-neutral-900">Nagad Payment</div>
                  <div className="text-neutral-500 mt-0.5">Pay conveniently through Nagad gateway</div>
                </div>
              </button>

              {/* Credit / Debit Card */}
              <button
                type="button"
                onClick={() => setShippingInfo({ ...shippingInfo, paymentMethod: 'card' })}
                className={`p-4 rounded-2xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                  shippingInfo.paymentMethod === 'card'
                    ? 'border-red-600 bg-red-50/50 ring-2 ring-red-600'
                    : 'border-neutral-200 hover:border-neutral-300'
                }`}
              >
                <CreditCard className="w-5 h-5 text-neutral-900 mt-0.5" />
                <div>
                  <div className="font-bold text-sm text-neutral-900">Credit / Debit Card</div>
                  <div className="text-neutral-500 mt-0.5">Visa, Mastercard, American Express</div>
                </div>
              </button>

            </div>

            {/* Order Total Breakdown */}
            <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-2 text-xs font-mono tabular-nums">
              <div className="flex justify-between text-neutral-600">
                <span>Items Subtotal:</span>
                <span>{formatBDT(cart.subtotalBDT)}</span>
              </div>
              {cart.discountBDT > 0 && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Voucher Discount:</span>
                  <span>-{formatBDT(cart.discountBDT)}</span>
                </div>
              )}
              <div className="flex justify-between text-neutral-600">
                <span>Delivery:</span>
                <span>{cart.shippingBDT === 0 ? 'FREE' : formatBDT(cart.shippingBDT)}</span>
              </div>
              <div className="pt-2 border-t border-neutral-200 flex justify-between text-base font-black text-neutral-950 font-sans">
                <span>Payable in BDT:</span>
                <span className="text-red-600 text-xl font-mono">{formatBDT(cart.totalBDT)}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep('details')}
                className="text-xs font-bold text-neutral-600 hover:text-neutral-900 cursor-pointer"
              >
                ← Back to Address
              </button>

              <button
                type="button"
                onClick={handlePlaceOrder}
                disabled={isSubmitting}
                className="px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Generating Order...</span>
                ) : (
                  <>
                    <span>Confirm & Place Order</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Order Confirmation Receipt */}
        {step === 'confirmation' && completedOrder && (
          <div className="p-8 sm:p-12 text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-black text-neutral-950">
                Order Successfully Placed!
              </h2>
              <p className="text-xs text-neutral-500 max-w-md mx-auto">
                Thank you! Your package is being prepared at our central distribution hub for courier delivery to{' '}
                <strong className="text-neutral-900">{completedOrder.customer.address}, {completedOrder.customer.city}</strong>.
              </p>
            </div>

            {/* Order Receipt Box */}
            <div className="max-w-xl mx-auto p-5 bg-neutral-50 rounded-2xl border border-neutral-200 text-left space-y-3 text-xs">
              <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
                <div>
                  <span className="text-neutral-500">Order Reference:</span>
                  <p className="font-mono font-black text-base text-neutral-900">{completedOrder.orderNumber}</p>
                </div>
                <div className="text-right">
                  <span className="text-neutral-500">Expected Delivery:</span>
                  <p className="font-bold text-emerald-700">{completedOrder.estimatedDeliveryDate}</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-neutral-600 text-[11px]">
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-neutral-500" />
                  <span>Tracking: <strong>{completedOrder.trackingNumber}</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Package className="w-3.5 h-3.5 text-neutral-500" />
                  <span>Payment: <strong>{completedOrder.customer.paymentMethod.toUpperCase()}</strong></span>
                </div>
              </div>

              <div className="pt-2 border-t border-neutral-200 flex justify-between font-mono tabular-nums text-sm font-black text-neutral-900">
                <span>Total Payable:</span>
                <span className="text-red-600">{formatBDT(completedOrder.totalBDT)}</span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
              <button
                onClick={() => onNavigate('dashboard')}
                className="px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
              >
                <Truck className="w-4 h-4" />
                <span>Track Order Live in Dashboard</span>
              </button>

              <button
                onClick={() => onNavigate('home')}
                className="px-8 py-3.5 bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer shadow-md"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
