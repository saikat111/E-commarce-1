import React from 'react';
import { 
  CheckCircle2, Clock, Truck, Package, Home, 
  MapPin, AlertCircle, ArrowRight, ShieldCheck, PhoneCall, Copy, Check
} from 'lucide-react';
import { Order, TrackingCheckpoint } from '../../types';
import { formatBDT } from '../../utils/formatters';

interface OrderTrackingTimelineProps {
  order: Order;
  onCopyTracking?: (trackingNum: string) => void;
}

export const OrderTrackingTimeline: React.FC<OrderTrackingTimelineProps> = ({
  order,
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(order.trackingNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 5 Canonical Milestones
  const stepsDefinition: Array<{
    key: 'ordered' | 'processing' | 'shipped' | 'out_for_delivery' | 'delivered';
    label: string;
    description: string;
    icon: typeof Package;
  }> = [
    { key: 'ordered', label: 'Order Confirmed', description: 'Payment verified & order recorded', icon: CheckCircle2 },
    { key: 'processing', label: 'Processing & Packed', description: 'Central sorting warehouse inspection', icon: Package },
    { key: 'shipped', label: 'Dispatched to Courier', description: 'In transit via regional logistics', icon: Truck },
    { key: 'out_for_delivery', label: 'Out for Delivery', description: 'Delivery rider dispatched with parcel', icon: Clock },
    { key: 'delivered', label: 'Delivered', description: 'Package handed over to recipient', icon: Home },
  ];

  // Determine active index
  const statusStepMap: Record<string, number> = {
    'confirmed': 1,
    'processing': 1,
    'shipped': 2,
    'out_for_delivery': 3,
    'delivered': 4,
  };

  const currentStepKey = order.currentStep || (order.status === 'delivered' ? 'delivered' : order.status === 'shipped' ? 'shipped' : 'processing');
  const activeIndex = stepsDefinition.findIndex(s => s.key === currentStepKey);
  const normalizedIndex = activeIndex >= 0 ? activeIndex : (statusStepMap[order.status] ?? 1);

  // Checkpoints
  const timelineCheckpoints = order.timeline || [];

  return (
    <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-xs overflow-hidden">
      {/* Top Banner with Tracking Code & Status Badge */}
      <div className="p-5 sm:p-6 bg-gradient-to-r from-neutral-900 via-neutral-950 to-neutral-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] uppercase tracking-wider font-bold text-neutral-400">
              Shipment Tracking
            </span>
            <span className="text-neutral-600">·</span>
            <span className="text-xs font-mono font-semibold text-emerald-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              {order.status === 'delivered' ? 'Package Delivered' : 'Live Transit In Progress'}
            </span>
          </div>

          <div className="flex items-center gap-3 mt-1.5 flex-wrap">
            <h3 className="text-lg sm:text-xl font-mono font-black tracking-tight text-white">
              {order.trackingNumber}
            </h3>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-white/10 hover:bg-white/20 text-neutral-200 rounded-lg transition-colors cursor-pointer"
              title="Copy Tracking Number"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          <p className="text-xs text-neutral-400 mt-1 flex items-center gap-1.5">
            <span>Carrier:</span>
            <strong className="text-neutral-200">{order.courier || 'Steadfast Courier Bangladesh'}</strong>
          </p>
        </div>

        {/* ETA & Order Total */}
        <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-3.5 sm:px-4">
          <div>
            <span className="text-[10px] uppercase font-bold text-neutral-400 block">Estimated Arrival</span>
            <span className="text-sm font-bold text-amber-300">
              {order.estimatedDeliveryDate}
            </span>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div>
            <span className="text-[10px] uppercase font-bold text-neutral-400 block">Total Amount</span>
            <span className="text-sm font-mono font-bold text-white">
              {formatBDT(order.totalBDT)}
            </span>
          </div>
        </div>
      </div>

      {/* Step-Based Horizontal Progress Timeline */}
      <div className="p-6 sm:p-8 border-b border-neutral-100 bg-neutral-50/50">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Background connecting bar */}
            <div className="absolute top-5 left-4 right-4 h-1 bg-neutral-200 -z-0 hidden md:block">
              <div 
                className="h-full bg-red-600 transition-all duration-700 ease-out"
                style={{ width: `${(normalizedIndex / (stepsDefinition.length - 1)) * 100}%` }}
              />
            </div>

            {/* Steps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-2 relative z-10">
              {stepsDefinition.map((step, idx) => {
                const isPassed = idx < normalizedIndex;
                const isCurrent = idx === normalizedIndex;
                const isPending = idx > normalizedIndex;
                const StepIcon = step.icon;

                return (
                  <div key={step.key} className="flex md:flex-col items-start md:items-center text-left md:text-center group">
                    {/* Circle Node */}
                    <div 
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all shrink-0 ${
                        isCurrent
                          ? 'bg-red-600 text-white ring-4 ring-red-100 shadow-md scale-110'
                          : isPassed
                          ? 'bg-emerald-600 text-white'
                          : 'bg-white border-2 border-neutral-300 text-neutral-400'
                      }`}
                    >
                      {isPassed ? (
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      ) : (
                        <StepIcon className="w-4 h-4" />
                      )}
                    </div>

                    {/* Step Labels */}
                    <div className="ml-3 md:ml-0 md:mt-3">
                      <div className={`text-xs font-bold leading-tight ${
                        isCurrent ? 'text-red-600' : isPassed ? 'text-neutral-900' : 'text-neutral-400'
                      }`}>
                        {step.label}
                      </div>
                      <div className="text-[11px] text-neutral-500 mt-0.5 max-w-[130px] hidden md:block mx-auto leading-tight">
                        {step.description}
                      </div>
                      {isCurrent && (
                        <span className="inline-block mt-1 text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-red-50 text-red-600 border border-red-200">
                          Current Stage
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Checkpoint Audit Log */}
      <div className="p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-red-600" />
            <h4 className="text-xs sm:text-sm font-bold text-neutral-900 uppercase tracking-wider">
              Transit Log & Location Checkpoints
            </h4>
          </div>
          <span className="text-[11px] text-neutral-500 font-medium">
            Updated in real-time
          </span>
        </div>

        <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-neutral-200">
          {timelineCheckpoints.map((chk, i) => (
            <div key={chk.id || i} className="relative group">
              {/* Timeline Dot */}
              <div 
                className={`absolute -left-6 top-1 w-3 h-3 rounded-full border-2 border-white shadow-xs ${
                  chk.active 
                    ? 'bg-red-600 ring-4 ring-red-100 animate-pulse' 
                    : chk.completed 
                    ? 'bg-emerald-600' 
                    : 'bg-neutral-300'
                }`}
              />

              {/* Checkpoint Card */}
              <div className={`p-4 rounded-xl border text-xs transition-colors ${
                chk.active 
                  ? 'bg-red-50/40 border-red-200' 
                  : chk.completed 
                  ? 'bg-neutral-50/80 border-neutral-200/80' 
                  : 'bg-neutral-50/30 border-dashed border-neutral-200 text-neutral-400'
              }`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="font-bold text-neutral-900 text-sm flex items-center gap-2">
                    <span>{chk.title}</span>
                    {chk.active && (
                      <span className="text-[10px] font-black uppercase tracking-wider bg-red-600 text-white px-1.5 py-0.2 rounded">
                        Latest
                      </span>
                    )}
                  </div>
                  <span className="font-mono text-neutral-500 text-[11px]">
                    {chk.timestamp}
                  </span>
                </div>

                <div className="mt-1 flex items-center gap-1.5 text-neutral-600">
                  <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                  <span>{chk.location}</span>
                </div>

                {chk.note && (
                  <p className="mt-2 text-neutral-600 bg-white/80 p-2 rounded-lg border border-neutral-200/60 text-[11px]">
                    {chk.note}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Courier Support Quick Help Card */}
        <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white border border-neutral-200 flex items-center justify-center text-red-600 shadow-2xs shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-neutral-900">Delivery Guarantee & Helpline</p>
              <p className="text-neutral-500 text-[11px]">
                Deliveries are insured against in-transit loss or damage with 15-day hassle-free replacement.
              </p>
            </div>
          </div>
          <a
            href="tel:+8809612345678"
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-white hover:bg-neutral-100 text-neutral-800 font-bold rounded-lg border border-neutral-300 text-xs shrink-0 transition-colors cursor-pointer"
          >
            <PhoneCall className="w-3.5 h-3.5 text-red-600" />
            <span>Support: +880 9612-345678</span>
          </a>
        </div>
      </div>
    </div>
  );
};
