import React, { useState, useEffect } from 'react';
import { Sparkles, X, ArrowRight, Zap, ShoppingBag } from 'lucide-react';
import { PriceDropAlert, Product } from '../../types';
import { formatBDT } from '../../utils/formatters';
import { EVENT_PRICE_DROP_TRIGGERED } from '../../services/priceAlertService';
import { PRODUCTS_CATALOG } from '../../data/products';

interface PriceDropBannerToastProps {
  onSelectProduct: (product: Product) => void;
  onBuyNow: (product: Product) => void;
}

interface TriggeredDropDetail {
  alert: PriceDropAlert;
  newPrice: number;
  savings: number;
}

export const PriceDropBannerToast: React.FC<PriceDropBannerToastProps> = ({
  onSelectProduct,
  onBuyNow,
}) => {
  const [activeDrop, setActiveDrop] = useState<TriggeredDropDetail | null>(null);

  useEffect(() => {
    const handleEvent = (e: Event) => {
      const customEvent = e as CustomEvent<TriggeredDropDetail>;
      if (customEvent.detail) {
        setActiveDrop(customEvent.detail);
      }
    };

    window.addEventListener(EVENT_PRICE_DROP_TRIGGERED, handleEvent);
    return () => window.removeEventListener(EVENT_PRICE_DROP_TRIGGERED, handleEvent);
  }, []);

  if (!activeDrop) return null;

  const product = PRODUCTS_CATALOG.find((p) => p.id === activeDrop.alert.productId);
  if (!product) return null;

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 max-w-lg w-[92vw] sm:w-auto animate-in slide-in-from-top-6 duration-300">
      <div className="bg-gradient-to-r from-neutral-950 via-neutral-900 to-rose-950 text-white rounded-2xl p-4 shadow-2xl border border-rose-500/40 flex items-center justify-between gap-3.5 backdrop-blur-md">
        {/* Thumbnail */}
        <img
          src={activeDrop.alert.productImage}
          alt={activeDrop.alert.productName}
          className="w-12 h-12 rounded-xl object-cover border border-rose-500/40 shrink-0"
        />

        {/* Info */}
        <div className="flex-1 min-w-0 text-left">
          <div className="flex items-center gap-1.5 text-[11px] text-amber-300 font-bold">
            <Zap className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
            <span>PRICE DROP TRIGGERED!</span>
          </div>
          <h4 className="text-xs font-bold text-white truncate">
            {activeDrop.alert.productName}
          </h4>
          <div className="flex items-center gap-2 mt-0.5 text-xs">
            <span className="font-mono font-bold text-emerald-400">
              Now {formatBDT(activeDrop.newPrice)}
            </span>
            <span className="text-[10px] text-neutral-400 line-through font-mono">
              {formatBDT(activeDrop.alert.currentPriceBDT)}
            </span>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-1.5 py-0.2 rounded font-mono">
              Save {formatBDT(activeDrop.savings)}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => {
              onBuyNow(product);
              setActiveDrop(null);
            }}
            className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1 cursor-pointer active:scale-95"
          >
            <span>Buy Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setActiveDrop(null)}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
