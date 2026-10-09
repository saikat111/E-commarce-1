import React, { useState } from 'react';
import { ArrowRight, Check, ShieldCheck, Truck, Headphones, RotateCcw } from 'lucide-react';
import { api } from '../../services/api';
import { ProductCategory, PageRoute } from '../../types';
import { CATEGORIES_METADATA } from '../../data/products';

interface FooterProps {
  onNavigate: (page: PageRoute, category?: ProductCategory) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    await api.newsletter.subscribe(email);
    setLoading(false);
    setSubscribed(true);
  };

  return (
    <footer className="border-t border-neutral-200 bg-neutral-950 text-neutral-300 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        
        {/* Top Newsletter & Mobile BD Delivery Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b border-neutral-800">
          <div className="lg:col-span-6 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-black text-white">
                NEXUS<span className="text-red-600">BAZAAR</span>
              </span>
              <span className="bg-amber-400 text-neutral-950 text-[10px] font-black uppercase px-1.5 py-0.5 rounded">
                CHOICE BD
              </span>
            </div>
            <p className="text-xs text-neutral-400 max-w-md leading-relaxed">
              Bangladesh’s premier ultra-modern e-commerce marketplace. Curated global electronics, smart lighting, luxury timepieces, and solid timber living goods with transparent BDT pricing and door-to-door courier logistics.
            </p>
          </div>

          <div className="lg:col-span-6 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Get Exclusive Bangladesh Flash Sale Alerts
            </h4>
            <p className="text-xs text-neutral-400">
              Subscribe to receive weekly <strong>৳500 OFF</strong> promo codes, Choice Day drops, and clearance alerts.
            </p>

            {subscribed ? (
              <div className="p-3 bg-neutral-900 rounded-xl border border-neutral-800 text-xs text-emerald-400 flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>Subscribed! Check your inbox for your ৳500 welcome coupon.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="name@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 text-xs px-3.5 py-2.5 bg-neutral-900 border border-neutral-700 rounded-xl text-white placeholder:text-neutral-500 outline-hidden focus:border-red-600"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 shrink-0"
                >
                  <span>{loading ? 'Joining...' : 'Subscribe'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Links Navigation Matrix */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 text-xs border-b border-neutral-800">
          
          <div className="space-y-3">
            <h5 className="font-bold uppercase tracking-wider text-white text-[11px]">
              Categories (BDT)
            </h5>
            <ul className="space-y-2 text-neutral-400">
              {CATEGORIES_METADATA.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => onNavigate('category', cat.id)}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="font-bold uppercase tracking-wider text-white text-[11px]">
              Customer Service
            </h5>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <span className="hover:text-white cursor-pointer">Buyer Protection Policy</span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer">15-Day Free Returns</span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer">Cash on Delivery (COD) FAQs</span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer">bKash & Nagad Payment Guide</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="font-bold uppercase tracking-wider text-white text-[11px]">
              Payment Partners
            </h5>
            <div className="space-y-2 text-neutral-400">
              <div className="flex flex-wrap gap-2 text-[10px] font-bold font-mono">
                <span className="px-2 py-1 bg-pink-900/60 text-pink-300 rounded border border-pink-700">bKash</span>
                <span className="px-2 py-1 bg-orange-900/60 text-orange-300 rounded border border-orange-700">Nagad</span>
                <span className="px-2 py-1 bg-blue-900/60 text-blue-300 rounded border border-blue-700">VISA</span>
                <span className="px-2 py-1 bg-red-900/60 text-red-300 rounded border border-red-700">Mastercard</span>
                <span className="px-2 py-1 bg-emerald-900/60 text-emerald-300 rounded border border-emerald-700">COD (Cash)</span>
              </div>
              <p className="text-[11px] text-neutral-500 pt-1">
                Zero processing fees on mobile banking or credit card checkout.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h5 className="font-bold uppercase tracking-wider text-white text-[11px]">
              Bangladesh Hubs
            </h5>
            <p className="text-neutral-400 leading-relaxed">
              <strong>Dhaka Hub:</strong> Banani DOHS, Dhaka 1206<br />
              <strong>Chittagong Hub:</strong> GEC Circle, Agrabad<br />
              <strong>Helpline:</strong> +880 9612 345678<br />
              <span className="text-[11px] text-neutral-500 font-mono">support@nexusbazaar.bd</span>
            </p>
          </div>

        </div>

        {/* Bottom Copyright & Guarantee */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <div>
            © {new Date().getFullYear()} Nexus Bazaar Bangladesh. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-neutral-400">
            <span>Terms of Service</span>
            <span>·</span>
            <span>Privacy Policy</span>
            <span>·</span>
            <span>Nationwide Logistics</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
