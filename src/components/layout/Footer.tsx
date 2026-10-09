import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { api } from '../../services/api';
import { ProductCategory } from '../../types';

interface FooterProps {
  onSelectCategory: (category: ProductCategory) => void;
  onScrollToStory: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onScrollToStory }) => {
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
    <footer className="border-t border-neutral-200 bg-neutral-900 text-neutral-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Top Newsletter & Studio Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-14 border-b border-neutral-800">
          <div className="lg:col-span-6 space-y-4">
            <h3 className="text-xl sm:text-2xl font-serif text-white font-normal">
              ATELIER NORD
            </h3>
            <p className="text-xs text-neutral-400 max-w-md leading-relaxed">
              Nordic architectural objects, precision horology, and lighting engineered for lifelong tactile permanence. Dispatched globally in plastic-free packaging from our workshops in Aarhus and Brescia.
            </p>
          </div>

          <div className="lg:col-span-6 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Seasonal Monograph Subscription
            </h4>
            <p className="text-xs text-neutral-400">
              Receive notifications for quarterly micro-batch releases and craftsmanship documentation. No promotional spam.
            </p>

            {subscribed ? (
              <div className="p-3 bg-neutral-800 rounded-lg border border-neutral-700 text-xs text-emerald-400 flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>You are registered for Seasonal Monograph releases.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="architect@studio.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 text-xs px-3.5 py-2.5 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder:text-neutral-500 focus:outline-hidden focus:border-white"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2.5 bg-white text-neutral-900 text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-neutral-200 disabled:opacity-50 transition-colors shrink-0 flex items-center gap-1.5"
                >
                  <span>{loading ? 'Joining...' : 'Subscribe'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Links Navigation Matrix */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 text-xs border-b border-neutral-800">
          
          <div className="space-y-3">
            <h5 className="font-semibold uppercase tracking-wider text-white text-[11px]">
              Collection
            </h5>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <button onClick={() => onSelectCategory('lighting')} className="hover:text-white transition-colors">
                  Lighting & Sconces
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('furniture')} className="hover:text-white transition-colors">
                  Solid Oak Seating
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('tableware')} className="hover:text-white transition-colors">
                  Ceramic Tableware
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('acoustics')} className="hover:text-white transition-colors">
                  Acoustic Totems
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('horology')} className="hover:text-white transition-colors">
                  Mechanical Instruments
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="font-semibold uppercase tracking-wider text-white text-[11px]">
              Craftsmanship
            </h5>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <button onClick={onScrollToStory} className="hover:text-white transition-colors">
                  Material Ethos
                </button>
              </li>
              <li>
                <button onClick={onScrollToStory} className="hover:text-white transition-colors">
                  Brescia Metal Foundry
                </button>
              </li>
              <li>
                <button onClick={onScrollToStory} className="hover:text-white transition-colors">
                  10-Year Repair Protocol
                </button>
              </li>
              <li>
                <button onClick={onScrollToStory} className="hover:text-white transition-colors">
                  Molded Pulp Packaging
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="font-semibold uppercase tracking-wider text-white text-[11px]">
              Assistance
            </h5>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  Global Freight Status
                </span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  30-Day In-Home Trial
                </span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  Architect & Trade Inquiries
                </span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  Care & Restoration Guides
                </span>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="font-semibold uppercase tracking-wider text-white text-[11px]">
              Studio Ateliers
            </h5>
            <p className="text-neutral-400 leading-relaxed">
              Kronprinsessegade 14<br />
              1306 Copenhagen, Denmark<br />
              <span className="font-mono text-[11px] text-neutral-500">contact@atelier-nord.com</span>
            </p>
          </div>

        </div>

        {/* Quiet Bottom Copyright & Status */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <div>
            © {new Date().getFullYear()} Atelier Nord Objects. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-neutral-400 cursor-pointer">Privacy Charter</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-neutral-400 cursor-pointer">Terms of Service</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-neutral-400 cursor-pointer">Sustainable Logistics</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
