import React, { useState, useEffect } from 'react';
import { 
  Bell, BellRing, X, Check, Trash2, Zap, ArrowDownRight, 
  Smartphone, Mail, Sparkles, CheckCircle2 
} from 'lucide-react';
import { Product, PriceDropAlert } from '../../types';
import { formatBDT } from '../../utils/formatters';
import { 
  savePriceAlert, 
  getPriceAlerts, 
  removePriceAlert, 
  simulatePriceDrop,
  hasPriceAlertForProduct 
} from '../../services/priceAlertService';

interface PriceDropAlertModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onAlertSet?: () => void;
}

export const PriceDropAlertModal: React.FC<PriceDropAlertModalProps> = ({
  product,
  isOpen,
  onClose,
  onAlertSet,
}) => {
  const [activeTab, setActiveTab] = useState<'create' | 'list'>('create');
  const [targetDiscountPct, setTargetDiscountPct] = useState<number>(10);
  const [customPriceBDT, setCustomPriceBDT] = useState<number>(() => 
    Math.round(product.priceBDT * 0.9)
  );
  const [contactMethod, setContactMethod] = useState<'sms' | 'email' | 'in_app'>('sms');
  const [contactValue, setContactValue] = useState<string>('+880 1712-345678');
  const [isSuccess, setIsSuccess] = useState(false);
  const [alertsList, setAlertsList] = useState<PriceDropAlert[]>([]);
  const [simulationToast, setSimulationToast] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setAlertsList(getPriceAlerts());
      setCustomPriceBDT(Math.round(product.priceBDT * (1 - targetDiscountPct / 100)));
      setIsSuccess(false);
    }
  }, [isOpen, product, targetDiscountPct]);

  if (!isOpen) return null;

  const handlePresetClick = (pct: number) => {
    setTargetDiscountPct(pct);
    setCustomPriceBDT(Math.round(product.priceBDT * (1 - pct / 100)));
  };

  const handleCustomPriceChange = (val: number) => {
    const clamped = Math.max(100, Math.min(product.priceBDT - 50, val));
    setCustomPriceBDT(clamped);
    const pct = Math.round(((product.priceBDT - clamped) / product.priceBDT) * 100);
    setTargetDiscountPct(pct);
  };

  const handleSubmitAlert = (e: React.FormEvent) => {
    e.preventDefault();
    savePriceAlert({
      productId: product.id,
      productName: product.name,
      productImage: product.imageUrl,
      category: product.category,
      originalPriceBDT: product.originalPriceBDT || product.priceBDT,
      currentPriceBDT: product.priceBDT,
      targetPriceBDT: customPriceBDT,
      contactMethod,
      contactValue,
    });

    setIsSuccess(true);
    setAlertsList(getPriceAlerts());
    onAlertSet?.();

    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1800);
  };

  const handleRemoveAlert = (alertId: string) => {
    removePriceAlert(alertId);
    setAlertsList(getPriceAlerts());
    onAlertSet?.();
  };

  const handleSimulateAlert = (productId: string) => {
    const triggered = simulatePriceDrop(productId, 20);
    if (triggered) {
      setSimulationToast(`🎉 Price Drop Triggered! Price dropped to ${formatBDT(triggered.triggeredPriceBDT || 0)}`);
      setAlertsList(getPriceAlerts());
      setTimeout(() => setSimulationToast(null), 4000);
    }
  };

  const currentProductAlert = hasPriceAlertForProduct(product.id);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-neutral-200 overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-neutral-900 to-rose-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-red-600/30 border border-red-500/40 flex items-center justify-center text-red-400">
              <BellRing className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-bold text-sm tracking-tight">Price Drop Alert</h3>
              <p className="text-xs text-neutral-400">Get notified the moment price drops</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-neutral-200 bg-neutral-50 px-5 pt-3 gap-4 text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTab('create')}
            className={`pb-2.5 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'create'
                ? 'border-red-600 text-red-600'
                : 'border-transparent text-neutral-500 hover:text-neutral-800'
            }`}
          >
            Set Alert for This Item
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('list')}
            className={`pb-2.5 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'list'
                ? 'border-red-600 text-red-600'
                : 'border-transparent text-neutral-500 hover:text-neutral-800'
            }`}
          >
            <span>My Active Alerts</span>
            <span className="bg-neutral-200 text-neutral-800 text-[10px] px-1.5 py-0.2 rounded-full font-mono">
              {alertsList.length}
            </span>
          </button>
        </div>

        {/* Simulation Feedback Toast inside modal */}
        {simulationToast && (
          <div className="mx-5 mt-3 p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>{simulationToast}</span>
          </div>
        )}

        {/* Tab 1: Create Alert */}
        {activeTab === 'create' && (
          <form onSubmit={handleSubmitAlert} className="p-5 space-y-4">
            {/* Product Snapshot Card */}
            <div className="p-3 bg-neutral-50 rounded-2xl border border-neutral-200 flex items-center gap-3">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-14 h-14 rounded-xl object-cover border border-neutral-200 shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-neutral-900 truncate">
                  {product.name}
                </h4>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-neutral-500">Current Price:</span>
                  <span className="font-mono font-bold text-neutral-900 text-sm">
                    {formatBDT(product.priceBDT)}
                  </span>
                </div>
              </div>
            </div>

            {/* Target Price Configuration */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-800 flex items-center justify-between">
                <span>Target Discount / Price</span>
                <span className="text-red-600 font-mono font-bold">
                  Target: {formatBDT(customPriceBDT)} ({targetDiscountPct}% OFF)
                </span>
              </label>

              {/* Discount Percentage Preset Chips */}
              <div className="grid grid-cols-4 gap-2">
                {[5, 10, 15, 20].map((pct) => (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => handlePresetClick(pct)}
                    className={`py-2 px-1 text-center rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                      targetDiscountPct === pct
                        ? 'bg-red-600 text-white border-red-600 shadow-xs'
                        : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-700 border-neutral-200'
                    }`}
                  >
                    -{pct}%
                    <span className="block text-[10px] font-normal opacity-80">
                      {formatBDT(Math.round(product.priceBDT * (1 - pct / 100)))}
                    </span>
                  </button>
                ))}
              </div>

              {/* Custom Target Price Range Slider */}
              <div className="pt-2">
                <input
                  type="range"
                  min={Math.round(product.priceBDT * 0.5)}
                  max={product.priceBDT - 50}
                  step={50}
                  value={customPriceBDT}
                  onChange={(e) => handleCustomPriceChange(Number(e.target.value))}
                  className="w-full accent-red-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-neutral-400 mt-0.5 font-mono">
                  <span>{formatBDT(Math.round(product.priceBDT * 0.5))}</span>
                  <span>Max: {formatBDT(product.priceBDT - 50)}</span>
                </div>
              </div>
            </div>

            {/* Contact Method Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-800">
                Where should we notify you?
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setContactMethod('sms');
                    setContactValue('+880 1712-345678');
                  }}
                  className={`py-2 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                    contactMethod === 'sms'
                      ? 'bg-neutral-900 text-white border-neutral-900'
                      : 'bg-neutral-50 text-neutral-700 border-neutral-200'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>SMS</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setContactMethod('email');
                    setContactValue('customer@nexusbazaar.bd');
                  }}
                  className={`py-2 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                    contactMethod === 'email'
                      ? 'bg-neutral-900 text-white border-neutral-900'
                      : 'bg-neutral-50 text-neutral-700 border-neutral-200'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setContactMethod('in_app');
                    setContactValue('In-App Push');
                  }}
                  className={`py-2 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                    contactMethod === 'in_app'
                      ? 'bg-neutral-900 text-white border-neutral-900'
                      : 'bg-neutral-50 text-neutral-700 border-neutral-200'
                  }`}
                >
                  <Bell className="w-3.5 h-3.5" />
                  <span>In-App</span>
                </button>
              </div>

              {contactMethod !== 'in_app' && (
                <input
                  type="text"
                  value={contactValue}
                  onChange={(e) => setContactValue(e.target.value)}
                  placeholder={contactMethod === 'sms' ? '+880 17XX-XXXXXX' : 'your.email@example.com'}
                  className="w-full px-3.5 py-2.5 bg-neutral-100 rounded-xl text-xs text-neutral-900 focus:outline-none focus:ring-2 focus:ring-red-600/30"
                  required
                />
              )}
            </div>

            {/* Submit Action */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSuccess}
                className="w-full py-3 bg-red-600 hover:bg-red-700 disabled:bg-emerald-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Price Alert Activated!</span>
                  </>
                ) : (
                  <>
                    <Bell className="w-4 h-4" />
                    <span>Activate Alert for {formatBDT(customPriceBDT)}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* Tab 2: Manage Active Alerts */}
        {activeTab === 'list' && (
          <div className="p-5 space-y-3 max-h-[360px] overflow-y-auto">
            {alertsList.length === 0 ? (
              <div className="text-center py-8 text-neutral-400 space-y-2">
                <Bell className="w-8 h-8 mx-auto text-neutral-300" />
                <p className="text-xs font-medium">No price drop alerts set yet.</p>
                <p className="text-[11px] text-neutral-400">
                  Switch to the first tab to set an alert for this product.
                </p>
              </div>
            ) : (
              alertsList.map((alert) => (
                <div
                  key={alert.id}
                  className="p-3 bg-neutral-50 rounded-2xl border border-neutral-200 flex items-center justify-between gap-3 group hover:border-neutral-300 transition-colors"
                >
                  <img
                    src={alert.productImage}
                    alt={alert.productName}
                    className="w-12 h-12 rounded-xl object-cover border border-neutral-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="text-xs font-bold text-neutral-900 truncate">
                      {alert.productName}
                    </h5>
                    <div className="flex items-center gap-2 mt-0.5 text-[11px]">
                      <span className="text-neutral-500">Target:</span>
                      <span className="font-mono font-bold text-red-600">
                        {formatBDT(alert.targetPriceBDT)}
                      </span>
                      {alert.status === 'triggered' && (
                        <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded-full">
                          Triggered!
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    {/* Test Simulate Price Drop Button */}
                    <button
                      type="button"
                      onClick={() => handleSimulateAlert(alert.productId)}
                      title="Test simulate this price drop"
                      className="px-2 py-1 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-lg text-[10px] font-bold transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <Zap className="w-3 h-3 text-amber-600" />
                      <span>Test Drop</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveAlert(alert.id)}
                      title="Remove alert"
                      className="p-1.5 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
