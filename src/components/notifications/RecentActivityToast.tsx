import React, { useState, useEffect, useRef } from 'react';
import { 
  X, CheckCircle2, Zap, Eye, BellOff, Bell, ExternalLink, 
  ShoppingBag, Sparkles 
} from 'lucide-react';
import { PurchaseActivityEvent, Product } from '../../types';
import { formatBDT } from '../../utils/formatters';
import { PRODUCTS_CATALOG } from '../../data/products';
import { 
  getNextActivityEvent, 
  getRecentActivitiesList, 
  isActivityToastMuted, 
  setActivityToastMuted 
} from '../../services/activityService';

interface RecentActivityToastProps {
  onSelectProduct: (product: Product) => void;
}

const DISPLAY_DURATION_MS = 6000; // 6 seconds display
const PAUSE_BETWEEN_TOASTS_MS = 12000; // 12 seconds quiet interval between toasts

export const RecentActivityToast: React.FC<RecentActivityToastProps> = ({
  onSelectProduct,
}) => {
  const [currentEvent, setCurrentEvent] = useState<PurchaseActivityEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMuted, setIsMuted] = useState<boolean>(() => isActivityToastMuted());
  const [isHovered, setIsHovered] = useState(false);
  const [showFeedModal, setShowFeedModal] = useState(false);
  const [progress, setProgress] = useState(100);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const progressAnimRef = useRef<number | null>(null);
  const progressStartRef = useRef<number>(0);

  // Trigger next notification bubble
  const triggerNextBubble = () => {
    if (isMuted) return;

    const nextEvent = getNextActivityEvent();
    setCurrentEvent(nextEvent);
    setIsVisible(true);
    setProgress(100);
    progressStartRef.current = Date.now();

    // Clear existing timer
    if (timerRef.current) clearTimeout(timerRef.current);

    // Set auto-hide timer
    timerRef.current = setTimeout(() => {
      dismissBubble();
    }, DISPLAY_DURATION_MS);
  };

  const dismissBubble = () => {
    setIsVisible(false);
    if (timerRef.current) clearTimeout(timerRef.current);

    // Schedule next bubble after quiet interval
    if (!isMuted) {
      if (intervalRef.current) clearTimeout(intervalRef.current);
      intervalRef.current = setTimeout(() => {
        triggerNextBubble();
      }, PAUSE_BETWEEN_TOASTS_MS);
    }
  };

  // Lifecycle loop
  useEffect(() => {
    if (isMuted) {
      setIsVisible(false);
      return;
    }

    // Initial first delay of 4 seconds after page load
    const initialDelayTimer = setTimeout(() => {
      triggerNextBubble();
    }, 4500);

    return () => {
      clearTimeout(initialDelayTimer);
      if (timerRef.current) clearTimeout(timerRef.current);
      if (intervalRef.current) clearTimeout(intervalRef.current);
      if (progressAnimRef.current) cancelAnimationFrame(progressAnimRef.current);
    };
  }, [isMuted]);

  // Handle countdown progress bar & pause on hover
  useEffect(() => {
    if (!isVisible || isHovered) {
      if (progressAnimRef.current) cancelAnimationFrame(progressAnimRef.current);
      return;
    }

    const startTime = Date.now() - ((100 - progress) / 100) * DISPLAY_DURATION_MS;

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const remainingPct = Math.max(0, 100 - (elapsed / DISPLAY_DURATION_MS) * 100);
      setProgress(remainingPct);

      if (remainingPct > 0) {
        progressAnimRef.current = requestAnimationFrame(updateProgress);
      }
    };

    progressAnimRef.current = requestAnimationFrame(updateProgress);

    return () => {
      if (progressAnimRef.current) cancelAnimationFrame(progressAnimRef.current);
    };
  }, [isVisible, isHovered]);

  const handleCardClick = () => {
    if (!currentEvent) return;
    const product = PRODUCTS_CATALOG.find((p) => p.id === currentEvent.productId);
    if (product) {
      onSelectProduct(product);
      dismissBubble();
    }
  };

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    setActivityToastMuted(newMuted);
    if (newMuted) {
      setIsVisible(false);
    } else {
      setTimeout(() => triggerNextBubble(), 1000);
    }
  };

  const allActivities = getRecentActivitiesList();

  return (
    <>
      {/* Small, non-intrusive floating bubble in bottom-left (lifted above bottom app bar on mobile) */}
      <div 
        className="fixed bottom-20 left-3 md:bottom-5 md:left-5 z-35 max-w-[310px] sm:max-w-[380px] pointer-events-none transition-all duration-300"
        aria-live="polite"
      >
        {isVisible && currentEvent && !isMuted ? (
          <div
            onMouseEnter={() => {
              setIsHovered(true);
              if (timerRef.current) clearTimeout(timerRef.current);
            }}
            onMouseLeave={() => {
              setIsHovered(false);
              // Resume remaining time or 3.5s
              timerRef.current = setTimeout(() => {
                dismissBubble();
              }, 3500);
            }}
            className="pointer-events-auto bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-neutral-200/90 overflow-hidden transform transition-all duration-300 translate-y-0 opacity-100 hover:shadow-2xl hover:border-neutral-300"
            role="alert"
          >
            {/* Top header bar */}
            <div className="flex items-center justify-between px-3.5 pt-3 pb-1 border-b border-neutral-100 bg-neutral-50/70">
              <div className="flex items-center gap-1.5 text-xs text-neutral-600">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="font-semibold text-neutral-900">{currentEvent.customerName}</span>
                <span className="text-neutral-300">·</span>
                <span className="text-neutral-500 truncate max-w-[140px]">{currentEvent.location}</span>
              </div>

              {/* Action icons */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleToggleMute}
                  title="Mute purchase activity toasts"
                  aria-label="Mute purchase activity toasts"
                  className="p-1 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-200/60 rounded-md transition-colors"
                >
                  <BellOff className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    dismissBubble();
                  }}
                  title="Close notification"
                  aria-label="Close notification"
                  className="p-1 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-200/60 rounded-md transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Clickable Product Content */}
            <div 
              onClick={handleCardClick}
              className="p-3.5 flex items-center gap-3 cursor-pointer group"
            >
              {/* Product Thumbnail */}
              <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-neutral-100 flex-shrink-0 border border-neutral-200/60 group-hover:border-red-500 transition-colors">
                <img
                  src={currentEvent.productImage}
                  alt={currentEvent.productName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <span className="absolute bottom-0 right-0 bg-neutral-900/80 backdrop-blur-xs text-[9px] text-white px-1 py-0.5 rounded-tl-md font-mono">
                  {currentEvent.paymentMethod}
                </span>
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-medium mb-0.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                  <span>Purchased {currentEvent.timeAgo}</span>
                </div>

                <h4 className="text-xs font-semibold text-neutral-900 group-hover:text-red-600 transition-colors line-clamp-1">
                  {currentEvent.productName}
                </h4>

                <div className="flex items-center justify-between mt-1 text-xs">
                  <span className="font-bold text-neutral-900 font-mono">
                    {formatBDT(currentEvent.priceBDT)}
                  </span>
                  {currentEvent.variantLabel && (
                    <span className="text-[10px] text-neutral-500 truncate max-w-[100px]">
                      {currentEvent.variantLabel}
                    </span>
                  )}
                </div>

                {/* Urgency Trigger */}
                <div className="flex items-center gap-2 mt-1.5 text-[10px] text-amber-800 bg-amber-50/80 px-2 py-0.5 rounded-md border border-amber-200/60">
                  <Zap className="w-2.5 h-2.5 text-amber-600 fill-amber-600" />
                  <span className="font-medium">Only {currentEvent.stockRemaining} units left in stock</span>
                </div>
              </div>
            </div>

            {/* Subtle animated auto-dismiss progress bar */}
            <div className="h-0.5 w-full bg-neutral-100">
              <div 
                className="h-full bg-gradient-to-r from-red-500 to-amber-500 transition-all duration-75"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        ) : isMuted ? (
          /* Subtle collapsed badge when muted, allowing instant un-muting */
          <div className="pointer-events-auto">
            <button
              type="button"
              onClick={handleToggleMute}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white/90 backdrop-blur-md border border-neutral-200 rounded-full shadow-md text-[11px] font-medium text-neutral-600 hover:text-neutral-900 hover:border-neutral-300 transition-all"
            >
              <Bell className="w-3 h-3 text-neutral-400" />
              <span>Turn On Purchase Activity</span>
            </button>
          </div>
        ) : null}
      </div>

      {/* Floating Pill: Quick shortcut to see all recent orders feed */}
      <div className="fixed bottom-5 right-44 z-30 hidden lg:block">
        <button
          type="button"
          onClick={() => setShowFeedModal(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900/90 hover:bg-neutral-900 text-white text-xs font-medium rounded-full shadow-lg backdrop-blur-md hover:scale-105 transition-all"
          title="View recent purchases across Bangladesh"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Live Purchases</span>
          <span className="text-[10px] text-neutral-400 bg-neutral-800 px-1.5 py-0.2 rounded-full">
            18 today
          </span>
        </button>
      </div>

      {/* Modal: Live Orders Feed in Bangladesh */}
      {showFeedModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setShowFeedModal(false)}
        >
          <div 
            className="bg-white rounded-2xl max-w-lg w-full max-h-[85vh] flex flex-col shadow-2xl border border-neutral-200 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 border-b border-neutral-100 flex items-center justify-between bg-neutral-50">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-emerald-100 rounded-lg text-emerald-700">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-neutral-900 text-sm flex items-center gap-1.5">
                    Live Verified Orders
                    <span className="text-[10px] font-normal text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      Real-time Feed
                    </span>
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Recent orders placed by verified customers across Bangladesh
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowFeedModal(false)}
                className="p-1.5 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-200/50 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal List */}
            <div className="overflow-y-auto p-4 space-y-2.5 divide-y divide-neutral-100">
              {allActivities.map((act) => (
                <div
                  key={act.id}
                  onClick={() => {
                    const product = PRODUCTS_CATALOG.find((p) => p.id === act.productId);
                    if (product) {
                      onSelectProduct(product);
                      setShowFeedModal(false);
                    }
                  }}
                  className="pt-2.5 first:pt-0 flex items-center justify-between gap-3 p-2 rounded-xl hover:bg-neutral-50 cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={act.productImage}
                      alt={act.productName}
                      className="w-12 h-12 rounded-lg object-cover border border-neutral-200 flex-shrink-0 group-hover:scale-105 transition-transform"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1 text-[11px] text-neutral-500">
                        <span className="font-semibold text-neutral-900">{act.customerName}</span>
                        <span>·</span>
                        <span className="truncate">{act.location}</span>
                      </div>
                      <p className="text-xs font-medium text-neutral-800 line-clamp-1 group-hover:text-red-600 transition-colors">
                        {act.productName}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5 text-[11px]">
                        <span className="font-bold text-neutral-900 font-mono">
                          {formatBDT(act.priceBDT)}
                        </span>
                        <span className="text-emerald-700 flex items-center gap-0.5">
                          <CheckCircle2 className="w-2.5 h-2.5" />
                          {act.paymentMethod}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <span className="text-[10px] text-neutral-400 block">{act.timeAgo}</span>
                    <span className="text-[10px] text-amber-700 font-medium bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 inline-block mt-1">
                      {act.stockRemaining} left
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="p-3 border-t border-neutral-100 bg-neutral-50 flex items-center justify-between text-xs text-neutral-500">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Encrypted with Steadfast Courier & bKash Verified API</span>
              </div>
              <button
                type="button"
                onClick={() => setShowFeedModal(false)}
                className="px-3 py-1 bg-neutral-900 text-white rounded-lg text-xs font-medium hover:bg-neutral-800 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
