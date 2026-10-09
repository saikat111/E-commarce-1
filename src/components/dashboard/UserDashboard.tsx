import React, { useState, useEffect } from 'react';
import { 
  User, Package, Truck, Heart, MapPin, CreditCard, 
  Settings, Bell, LogOut, ShieldCheck, ChevronRight, 
  ShoppingBag, Sparkles, Clock, CheckCircle2, AlertCircle,
  Phone, Mail, Edit3, Plus, ArrowUpRight, Award, Trash2
} from 'lucide-react';
import { Order, PageRoute, Product } from '../../types';
import { api } from '../../services/api';
import { PRODUCTS_CATALOG } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { OrderTrackingSection } from './OrderTrackingSection';
import { formatBDT } from '../../utils/formatters';
import { getRecentlyViewedProducts } from '../../services/browsingHistory';

interface UserDashboardProps {
  onNavigate: (page: PageRoute) => void;
  onSelectProduct: (product: Product) => void;
}

type DashboardTab = 'overview' | 'tracking' | 'orders' | 'wishlist' | 'addresses' | 'settings';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  memberTier: 'Diamond Choice' | 'Platinum' | 'Gold';
  coins: number;
  joinedDate: string;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({
  onNavigate,
  onSelectProduct,
}) => {
  const { wishlist, toggleWishlist, addItem } = useCart();
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  // Map wishlist ID strings to full product objects
  const wishlistedProducts = wishlist
    .map((id) => PRODUCTS_CATALOG.find((p) => p.id === id))
    .filter((p): p is Product => p !== undefined);

  // Retrieve recently viewed items for dashboard overview
  const recentlyViewed = getRecentlyViewedProducts(PRODUCTS_CATALOG, 4);

  // User Profile details
  const [profile, setProfile] = useState<UserProfile>({
    name: 'Tanvir Ahmed',
    email: 'tanvir.ahmed@example.com',
    phone: '+880 1712-345678',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    memberTier: 'Diamond Choice',
    coins: 4850,
    joinedDate: 'Member since Jan 2024',
  });

  // Saved Addresses in Bangladesh
  const [savedAddresses, setSavedAddresses] = useState([
    {
      id: 'addr_1',
      isDefault: true,
      tag: 'Home (Gulshan)',
      name: 'Tanvir Ahmed',
      phone: '+880 1712-345678',
      address: 'House 42, Road 11, Block D',
      area: 'Gulshan-2',
      city: 'Dhaka',
      postalCode: '1212',
    },
    {
      id: 'addr_2',
      isDefault: false,
      tag: 'Office (Dhanmondi)',
      name: 'Tanvir Ahmed',
      phone: '+880 1712-345678',
      address: 'Flat 4B, Concord Tower, Road 27',
      area: 'Dhanmondi',
      city: 'Dhaka',
      postalCode: '1209',
    },
  ]);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const data = await api.orders.getOrders();
      setOrders(data);
    } catch {
      // fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  // Compute metrics
  const totalOrders = orders.length;
  const inTransitOrders = orders.filter(o => o.status !== 'delivered');
  const deliveredOrders = orders.filter(o => o.status === 'delivered');
  const totalSpentBDT = orders.reduce((sum, o) => sum + o.totalBDT, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-sans">
      
      {/* Top Profile Summary Header Card */}
      <div className="bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-neutral-800 relative overflow-hidden">
        {/* Glow decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl -z-0 pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-amber-500/10 rounded-full blur-2xl -z-0 pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* User info */}
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="relative">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-red-500/80 shadow-lg"
              />
              <span className="absolute -bottom-1 -right-1 bg-amber-400 text-neutral-950 text-[9px] font-black uppercase px-1.5 py-0.5 rounded shadow-xs">
                PRO
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                  {profile.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-red-600/30 text-red-400 border border-red-500/40">
                  {profile.memberTier}
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-1 flex items-center gap-2 flex-wrap">
                <span>{profile.email}</span>
                <span className="text-neutral-600">·</span>
                <span>{profile.phone}</span>
                <span className="text-neutral-600">·</span>
                <span className="text-neutral-400">{profile.joinedDate}</span>
              </p>
            </div>
          </div>

          {/* Quick Metrics Badges */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 shrink-0">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-3 text-center min-w-[90px]">
              <span className="text-[10px] uppercase font-bold text-neutral-400 block">Total Orders</span>
              <span className="text-lg font-mono font-black text-white">{totalOrders}</span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-3 text-center min-w-[90px]">
              <span className="text-[10px] uppercase font-bold text-neutral-400 block">In Transit</span>
              <span className="text-lg font-mono font-black text-red-400">{inTransitOrders.length}</span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-3 text-center min-w-[90px]">
              <span className="text-[10px] uppercase font-bold text-neutral-400 block">Bazaar Coins</span>
              <span className="text-lg font-mono font-black text-amber-400">{profile.coins}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Layout: Sidebar Navigation + Content Body */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Navigation Sidebar (3 columns) */}
        <aside className="lg:col-span-3 space-y-4">
          <nav className="bg-white rounded-2xl border border-neutral-200/80 p-2 shadow-2xs space-y-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-950'
              }`}
            >
              <Package className="w-4 h-4 text-red-500" />
              <span className="flex-1 text-left">Dashboard Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('tracking')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                activeTab === 'tracking'
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-950'
              }`}
            >
              <Truck className="w-4 h-4" />
              <span className="flex-1 text-left">Track Shipments</span>
              {inTransitOrders.length > 0 && (
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-black ${
                  activeTab === 'tracking' ? 'bg-white text-red-600' : 'bg-red-100 text-red-700'
                }`}>
                  {inTransitOrders.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                activeTab === 'orders'
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-950'
              }`}
            >
              <ShoppingBag className="w-4 h-4 text-neutral-500" />
              <span className="flex-1 text-left">Order History</span>
              <span className="text-[10px] font-mono text-neutral-400 font-bold">
                {orders.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('wishlist')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                activeTab === 'wishlist'
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-950'
              }`}
            >
              <Heart className="w-4 h-4 text-pink-500" />
              <span className="flex-1 text-left">Saved Wishlist</span>
              <span className="text-[10px] font-mono text-neutral-400 font-bold">
                {wishlist.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('addresses')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                activeTab === 'addresses'
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-950'
              }`}
            >
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span className="flex-1 text-left">Delivery Addresses</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-950'
              }`}
            >
              <Settings className="w-4 h-4 text-neutral-400" />
              <span className="flex-1 text-left">Account Settings</span>
            </button>
          </nav>

          {/* Quick Support Card */}
          <div className="bg-red-50/60 rounded-2xl border border-red-100 p-4 text-xs space-y-2">
            <div className="flex items-center gap-2 text-red-700 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>Buyer Protection Active</span>
            </div>
            <p className="text-neutral-600 text-[11px] leading-relaxed">
              Every order placed through Nexus Bazaar is covered with nationwide courier damage protection and guaranteed returns.
            </p>
          </div>
        </aside>

        {/* Content Area (9 columns) */}
        <main className="lg:col-span-9">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-2xs">
                  <div className="flex items-center justify-between text-neutral-500 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider">Total Purchases</span>
                    <ShoppingBag className="w-4 h-4 text-red-600" />
                  </div>
                  <div className="text-2xl font-black font-mono text-neutral-950">
                    {formatBDT(totalSpentBDT)}
                  </div>
                  <p className="text-[11px] text-neutral-500 mt-1">
                    Cumulative across all fulfilled orders
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-2xs">
                  <div className="flex items-center justify-between text-neutral-500 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider">Active Shipments</span>
                    <Truck className="w-4 h-4 text-amber-500" />
                  </div>
                  <div className="text-2xl font-black font-mono text-neutral-950">
                    {inTransitOrders.length}
                  </div>
                  <p className="text-[11px] text-emerald-600 font-medium mt-1">
                    Live updates via Steadfast & RedX
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-2xs">
                  <div className="flex items-center justify-between text-neutral-500 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider">Choice Coins</span>
                    <Sparkles className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-2xl font-black font-mono text-amber-600">
                    {profile.coins}
                  </div>
                  <p className="text-[11px] text-neutral-500 mt-1">
                    Worth ৳485 discount on next checkout
                  </p>
                </div>
              </div>

              {/* In-Transit Shipment Highlight Card */}
              {inTransitOrders.length > 0 && (
                <div className="bg-white rounded-2xl border border-neutral-200/80 p-6 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                    <div className="flex items-center gap-2">
                      <Truck className="w-5 h-5 text-red-600" />
                      <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider">
                        Active In-Transit Shipment
                      </h3>
                    </div>
                    <button
                      onClick={() => setActiveTab('tracking')}
                      className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer"
                    >
                      <span>Full Timeline</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Summary of first in transit order */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-neutral-50 border border-neutral-200/60">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-sm text-neutral-900">{inTransitOrders[0].orderNumber}</span>
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 animate-pulse">
                          {inTransitOrders[0].status === 'shipped' ? 'Out for Delivery' : 'Processing'}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-500 mt-1">
                        Tracking: <strong className="font-mono text-neutral-800">{inTransitOrders[0].trackingNumber}</strong> · Courier: {inTransitOrders[0].courier}
                      </p>
                      <p className="text-xs text-emerald-700 font-semibold mt-1">
                        Expected Delivery: {inTransitOrders[0].estimatedDeliveryDate}
                      </p>
                    </div>

                    <button
                      onClick={() => setActiveTab('tracking')}
                      className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shrink-0 shadow-xs"
                    >
                      Track Package Step-by-Step
                    </button>
                  </div>
                </div>
              )}

              {/* Recent Orders List Preview */}
              <div className="bg-white rounded-2xl border border-neutral-200/80 p-6 shadow-2xs space-y-4">
                <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                  <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider">
                    Recent Orders
                  </h3>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-xs font-bold text-neutral-600 hover:text-neutral-900 cursor-pointer"
                  >
                    View All Orders →
                  </button>
                </div>

                <div className="divide-y divide-neutral-100">
                  {orders.slice(0, 3).map((order) => (
                    <div key={order.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 first:pt-0 last:pb-0">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center font-bold text-neutral-700 text-xs shrink-0">
                          {order.items.length} item(s)
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-sm text-neutral-900">{order.orderNumber}</span>
                            <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                              order.status === 'delivered' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                            }`}>
                              {order.status}
                            </span>
                          </div>
                          <p className="text-xs text-neutral-500 mt-0.5">
                            {new Date(order.createdAt).toLocaleDateString()} · {order.customer.paymentMethod.toUpperCase()} · {order.customer.city}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 self-end sm:self-center">
                        <div className="text-right font-mono font-bold text-sm text-neutral-900">
                          {formatBDT(order.totalBDT)}
                        </div>
                        <button
                          onClick={() => setActiveTab('tracking')}
                          className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                        >
                          Track
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Personalized Heuristic Recommendations Banner */}
              <div className="bg-gradient-to-r from-neutral-900 via-neutral-800 to-rose-950 rounded-2xl p-6 text-white shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center">
                      <Sparkles className="w-4 h-4 fill-white" />
                    </div>
                    <h4 className="font-bold text-sm text-white">Recommended for You on Homepage</h4>
                  </div>
                  <p className="text-xs text-neutral-300 max-w-xl">
                    Our live heuristic engine analyzes your viewed products and calculates real-time match scores in BDT.
                  </p>
                </div>
                <button
                  onClick={() => onNavigate('home')}
                  className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-all shrink-0 cursor-pointer shadow-sm flex items-center gap-1.5 self-start sm:self-auto"
                >
                  <span>Explore Personalized Feed</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Recently Viewed Products Strip */}
              {recentlyViewed.length > 0 && (
                <div className="bg-white rounded-2xl border border-neutral-200/80 p-6 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-neutral-500" />
                      <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider">
                        Recently Viewed Items ({recentlyViewed.length})
                      </h3>
                    </div>
                    <button
                      onClick={() => onNavigate('home')}
                      className="text-xs font-bold text-red-600 hover:text-red-700 cursor-pointer"
                    >
                      See All Recommendations →
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {recentlyViewed.map(({ product }) => (
                      <div
                        key={product.id}
                        onClick={() => onSelectProduct(product)}
                        className="group bg-neutral-50 hover:bg-white rounded-xl border border-neutral-200 p-2.5 transition-all cursor-pointer shadow-2xs flex flex-col justify-between"
                      >
                        <div className="relative aspect-video rounded-lg overflow-hidden bg-neutral-200 mb-2">
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <h4 className="text-xs font-bold text-neutral-900 truncate group-hover:text-red-600">
                          {product.name}
                        </h4>
                        <div className="text-xs font-mono font-bold text-red-600 mt-1">
                          {formatBDT(product.priceBDT)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB 2: DEDICATED STEP-BASED TRACKING SECTION */}
          {activeTab === 'tracking' && (
            <OrderTrackingSection
              orders={orders}
              onNavigate={onNavigate}
              onRefreshOrders={loadOrders}
            />
          )}

          {/* TAB 3: ORDER HISTORY */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-2xs flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-neutral-900">Order History</h2>
                  <p className="text-xs text-neutral-500">All previous orders, invoices, and payment receipts.</p>
                </div>
                <span className="text-xs font-mono font-bold text-neutral-500">
                  {orders.length} total orders
                </span>
              </div>

              <div className="space-y-3">
                {orders.map((order) => (
                  <div key={order.id} className="bg-white rounded-2xl border border-neutral-200/80 p-5 shadow-2xs space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-100 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-black text-sm text-neutral-900">{order.orderNumber}</span>
                          <span className="text-neutral-400">·</span>
                          <span className="text-xs text-neutral-500">{new Date(order.createdAt).toLocaleDateString()}</span>
                        </div>
                        <p className="text-[11px] text-neutral-500 font-mono mt-0.5">
                          Tracking: {order.trackingNumber} ({order.courier || 'Steadfast'})
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full ${
                          order.status === 'delivered' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {order.status}
                        </span>
                        <span className="text-base font-mono font-bold text-neutral-900">
                          {formatBDT(order.totalBDT)}
                        </span>
                      </div>
                    </div>

                    {/* Items */}
                    <div className="space-y-2">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-xs">
                          <img
                            src={item.product.imageUrl}
                            alt={item.product.name}
                            className="w-10 h-10 rounded-lg object-cover border border-neutral-200"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-neutral-900 truncate">{item.product.name}</p>
                            <p className="text-[11px] text-neutral-500">Qty: {item.quantity} · Color: {item.selectedColor?.name || 'Standard'}</p>
                          </div>
                          <div className="font-mono font-medium text-neutral-700">
                            {formatBDT(item.unitPriceBDT * item.quantity)}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
                      <span className="text-xs text-neutral-500">
                        Paid via <strong className="text-neutral-800">{order.customer.paymentMethod.toUpperCase()}</strong>
                      </span>
                      <button
                        onClick={() => setActiveTab('tracking')}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-2xs"
                      >
                        Track Shipment Timeline
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: WISHLIST */}
          {activeTab === 'wishlist' && (
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-2xs flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-neutral-900">Saved Wishlist</h2>
                  <p className="text-xs text-neutral-500">Bookmarks and favorite items saved for later purchase.</p>
                </div>
                <span className="text-xs font-mono font-bold text-neutral-500">
                  {wishlist.length} saved
                </span>
              </div>

              {wishlistedProducts.length === 0 ? (
                <div className="bg-white p-12 text-center rounded-2xl border border-neutral-200 text-xs text-neutral-500">
                  <Heart className="w-8 h-8 text-neutral-300 mx-auto mb-2" />
                  <p className="font-bold text-neutral-800 text-sm">Your wishlist is currently empty</p>
                  <p className="mt-1">Tap the heart icon on any product to save it here.</p>
                  <button
                    onClick={() => onNavigate('home')}
                    className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg font-bold text-xs hover:bg-red-700 transition-colors cursor-pointer"
                  >
                    Explore Products
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {wishlistedProducts.map((prod) => (
                    <div key={prod.id} className="bg-white rounded-2xl border border-neutral-200 p-4 shadow-2xs space-y-3">
                      <div className="relative aspect-square rounded-xl overflow-hidden bg-neutral-100">
                        <img
                          src={prod.imageUrl}
                          alt={prod.name}
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={() => toggleWishlist(prod.id)}
                          className="absolute top-2 right-2 p-1.5 bg-white/90 text-neutral-700 hover:text-red-600 rounded-lg shadow-sm cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div>
                        <h4 className="text-xs font-bold text-neutral-900 line-clamp-1">{prod.name}</h4>
                        <div className="mt-1 flex items-baseline gap-2">
                          <span className="text-sm font-mono font-bold text-red-600">{formatBDT(prod.priceBDT)}</span>
                          <span className="text-xs font-mono text-neutral-400 line-through">{formatBDT(prod.originalPriceBDT)}</span>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-1">
                        <button
                          onClick={() => {
                            addItem(prod, prod.colors[0], undefined, 1);
                          }}
                          className="flex-1 py-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                        >
                          Add to Cart
                        </button>
                        <button
                          onClick={() => onSelectProduct(prod)}
                          className="px-3 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                        >
                          View
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: ADDRESSES */}
          {activeTab === 'addresses' && (
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-2xs flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-neutral-900">Delivery Addresses</h2>
                  <p className="text-xs text-neutral-500">Manage your shipping destinations for fast 1-click checkout.</p>
                </div>
                <button
                  className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Address</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {savedAddresses.map((addr) => (
                  <div key={addr.id} className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-2xs space-y-3 relative">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-red-600" />
                        {addr.tag}
                      </span>
                      {addr.isDefault && (
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                          Default Address
                        </span>
                      )}
                    </div>

                    <div className="text-xs text-neutral-700 space-y-1">
                      <p className="font-bold text-neutral-900">{addr.name}</p>
                      <p>{addr.address}</p>
                      <p>{addr.area}, {addr.city} - {addr.postalCode}</p>
                      <p className="text-neutral-500 font-mono">{addr.phone}</p>
                    </div>

                    <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs">
                      <button className="text-red-600 font-bold hover:underline cursor-pointer">
                        Edit Address
                      </button>
                      {!addr.isDefault && (
                        <button 
                          onClick={() => {
                            setSavedAddresses(savedAddresses.map(a => ({
                              ...a,
                              isDefault: a.id === addr.id
                            })));
                          }}
                          className="text-neutral-500 hover:text-neutral-900 cursor-pointer"
                        >
                          Set as Default
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="bg-white rounded-2xl border border-neutral-200/80 p-6 shadow-2xs space-y-6">
              <div className="border-b border-neutral-100 pb-3">
                <h2 className="text-lg font-bold text-neutral-900">Profile & Notification Settings</h2>
                <p className="text-xs text-neutral-500">Update your account credentials and courier SMS alerts preferences.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-bold text-neutral-700 block mb-1">Full Legal Name</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl outline-hidden focus:border-red-600 text-xs"
                  />
                </div>

                <div>
                  <label className="font-bold text-neutral-700 block mb-1">Contact Phone (Bangladesh)</label>
                  <input
                    type="text"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl outline-hidden focus:border-red-600 text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="font-bold text-neutral-700 block mb-1">Email Address</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl outline-hidden focus:border-red-600 text-xs"
                  />
                </div>

                <div>
                  <label className="font-bold text-neutral-700 block mb-1">Default Currency</label>
                  <input
                    type="text"
                    disabled
                    value="BDT (৳) — Bangladeshi Taka"
                    className="w-full px-3.5 py-2.5 bg-neutral-100 border border-neutral-300 rounded-xl text-neutral-500 text-xs cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  className="px-6 py-2.5 bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer transition-colors"
                >
                  Save Profile Changes
                </button>
              </div>
            </div>
          )}

        </main>

      </div>

    </div>
  );
};
