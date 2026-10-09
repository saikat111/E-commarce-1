import React, { useState, useEffect } from 'react';
import { 
  Package, Truck, CheckCircle2, Clock, Search, ExternalLink, 
  ChevronRight, MapPin, Calendar, CreditCard, ShieldCheck, 
  ArrowRight, RefreshCw, AlertCircle, Eye, ShoppingBag
} from 'lucide-react';
import { Order, PageRoute } from '../../types';
import { OrderTrackingTimeline } from './OrderTrackingTimeline';
import { formatBDT } from '../../utils/formatters';

interface OrderTrackingSectionProps {
  orders: Order[];
  onNavigate: (page: PageRoute) => void;
  onRefreshOrders?: () => void;
}

export const OrderTrackingSection: React.FC<OrderTrackingSectionProps> = ({
  orders,
  onNavigate,
  onRefreshOrders,
}) => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(orders[0] || null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTracking, setSearchTracking] = useState<string>('');

  useEffect(() => {
    if (orders.length > 0 && !selectedOrder) {
      setSelectedOrder(orders[0]);
    } else if (orders.length > 0 && selectedOrder) {
      // Keep existing selection or fallback
      const found = orders.find(o => o.id === selectedOrder.id);
      if (found) setSelectedOrder(found);
    }
  }, [orders]);

  // Filtered orders
  const filteredOrders = orders.filter((order) => {
    const matchesStatus = filterStatus === 'all' 
      ? true 
      : filterStatus === 'active' 
      ? (order.status === 'confirmed' || order.status === 'processing' || order.status === 'shipped')
      : order.status === filterStatus;

    const matchesSearch = searchTracking.trim() === ''
      ? true
      : order.trackingNumber.toLowerCase().includes(searchTracking.toLowerCase().trim()) ||
        order.orderNumber.toLowerCase().includes(searchTracking.toLowerCase().trim()) ||
        order.items.some(i => i.product.name.toLowerCase().includes(searchTracking.toLowerCase().trim()));

    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      
      {/* Header with Search and Summary Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-neutral-200 shadow-2xs">
        <div>
          <h2 className="text-xl font-black text-neutral-900 tracking-tight flex items-center gap-2">
            <Truck className="w-5 h-5 text-red-600" />
            <span>Dedicated Order Tracking</span>
          </h2>
          <p className="text-xs text-neutral-500 mt-0.5">
            Real-time step timeline for courier dispatches across Bangladesh divisions.
          </p>
        </div>

        {/* Filter Pills + Refresh */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="inline-flex p-1 bg-neutral-100 rounded-xl text-xs font-medium">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                filterStatus === 'all' ? 'bg-white text-neutral-900 font-bold shadow-2xs' : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              All ({orders.length})
            </button>
            <button
              onClick={() => setFilterStatus('active')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                filterStatus === 'active' ? 'bg-white text-neutral-900 font-bold shadow-2xs' : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              In Transit ({orders.filter(o => o.status !== 'delivered').length})
            </button>
            <button
              onClick={() => setFilterStatus('delivered')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                filterStatus === 'delivered' ? 'bg-white text-neutral-900 font-bold shadow-2xs' : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Delivered ({orders.filter(o => o.status === 'delivered').length})
            </button>
          </div>

          {onRefreshOrders && (
            <button
              onClick={onRefreshOrders}
              className="p-2 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded-xl transition-colors cursor-pointer"
              title="Refresh tracking status"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Main Grid: Orders List (Left) + Detailed Step-Based Timeline (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Orders Picker List */}
        <div className="lg:col-span-5 space-y-3">
          {/* Quick Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by order / tracking number..."
              value={searchTracking}
              onChange={(e) => setSearchTracking(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-neutral-200 rounded-xl text-xs outline-hidden focus:border-red-600 transition-colors shadow-2xs"
            />
          </div>

          {/* Orders Cards List */}
          {filteredOrders.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-2xl border border-neutral-200 text-xs text-neutral-500">
              <Package className="w-8 h-8 text-neutral-300 mx-auto mb-2" />
              <p className="font-bold text-neutral-700">No shipments found</p>
              <p className="text-[11px] mt-1">Try another filter or place an order to test live tracking.</p>
              <button
                onClick={() => onNavigate('home')}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg font-bold text-xs hover:bg-red-700 transition-colors cursor-pointer"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-2.5 max-h-[700px] overflow-y-auto pr-1">
              {filteredOrders.map((order) => {
                const isSelected = selectedOrder?.id === order.id;
                const isDelivered = order.status === 'delivered';
                const firstItem = order.items[0];

                return (
                  <div
                    key={order.id}
                    onClick={() => setSelectedOrder(order)}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer relative ${
                      isSelected
                        ? 'bg-red-50/40 border-red-500 shadow-xs ring-1 ring-red-500'
                        : 'bg-white hover:bg-neutral-50 border-neutral-200 shadow-2xs'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs text-neutral-900">
                          {order.orderNumber}
                        </span>
                        <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                          isDelivered
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800 animate-pulse'
                        }`}>
                          {isDelivered ? 'Delivered' : 'In Transit'}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono font-bold text-neutral-900">
                        {formatBDT(order.totalBDT)}
                      </span>
                    </div>

                    {/* Product Preview Thumbnail & Details */}
                    <div className="mt-3 flex items-center gap-3">
                      {firstItem && (
                        <img
                          src={firstItem.product.imageUrl}
                          alt={firstItem.product.name}
                          className="w-12 h-12 rounded-lg object-cover border border-neutral-200 shrink-0"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-neutral-800 truncate">
                          {firstItem?.product.name || 'Shipment Package'}
                        </p>
                        <p className="text-[11px] text-neutral-500 truncate mt-0.5">
                          {order.items.length > 1 ? `+ ${order.items.length - 1} other item(s)` : `${firstItem?.quantity || 1} unit`} · {order.customer.city}
                        </p>
                      </div>
                    </div>

                    {/* Tracking Number and Carrier */}
                    <div className="mt-3 pt-2.5 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-500 font-mono">
                      <span>{order.trackingNumber}</span>
                      <span className="text-red-600 font-sans font-bold flex items-center gap-1">
                        <span>Track live</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right: Step-Based Timeline Visualization */}
        <div className="lg:col-span-7">
          {selectedOrder ? (
            <div className="space-y-6">
              <OrderTrackingTimeline order={selectedOrder} />

              {/* Order Package Contents Summary */}
              <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-2xs space-y-4">
                <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                  <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-red-600" />
                    <span>Package Items ({selectedOrder.items.length})</span>
                  </h4>
                  <span className="text-xs font-medium text-neutral-500">
                    Destination: <strong className="text-neutral-800">{selectedOrder.customer.address}, {selectedOrder.customer.city}</strong>
                  </span>
                </div>

                <div className="divide-y divide-neutral-100">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={item.id || idx} className="py-3 flex items-center gap-3 first:pt-0 last:pb-0">
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="w-14 h-14 rounded-xl object-cover border border-neutral-200 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-neutral-900 truncate">{item.product.name}</p>
                        <div className="flex items-center gap-2 text-[11px] text-neutral-500 mt-0.5">
                          <span>Qty: <strong>{item.quantity}</strong></span>
                          <span>·</span>
                          <span>Color: <strong>{item.selectedColor?.name || 'Standard'}</strong></span>
                        </div>
                      </div>
                      <div className="text-right font-mono font-bold text-xs text-neutral-900">
                        {formatBDT(item.unitPriceBDT * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-neutral-200 p-12 text-center text-xs text-neutral-500">
              <Truck className="w-10 h-10 text-neutral-300 mx-auto mb-3" />
              <p className="font-bold text-neutral-800 text-sm">Select an order on the left</p>
              <p className="mt-1">View the full interactive step-based timeline and live courier logs.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
