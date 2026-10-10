import React, { useState } from 'react';
import { Scale, X, ArrowRight, Trash2, ChevronUp, ChevronDown } from 'lucide-react';
import { useCompare } from '../../context/CompareContext';
import { formatBDT } from '../../utils/formatters';

export const CompareFloatingBar: React.FC = () => {
  const { 
    comparedProducts, 
    removeFromCompare, 
    clearCompare, 
    openCompareModal 
  } = useCompare();

  const [isMinimized, setIsMinimized] = useState(false);

  if (comparedProducts.length === 0) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-xl w-[94vw] sm:w-auto animate-in slide-in-from-bottom-6 duration-200">
      <div className="bg-neutral-900/95 text-white backdrop-blur-md rounded-2xl p-3 shadow-2xl border border-neutral-700/80 flex flex-col sm:flex-row items-center gap-3">
        {/* Left: Summary Title & Minimize */}
        <div className="flex items-center justify-between w-full sm:w-auto gap-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-red-600/30 text-red-400 rounded-lg">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold block">
                Compare ({comparedProducts.length}/4)
              </span>
              <span className="text-[10px] text-neutral-400 hidden sm:inline">
                Side-by-side specs
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsMinimized(!isMinimized)}
            className="sm:hidden p-1 text-neutral-400 hover:text-white"
          >
            {isMinimized ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {/* Thumbnails Row */}
        {!isMinimized && (
          <div className="flex items-center gap-2 overflow-x-auto max-w-xs py-1 scrollbar-none">
            {comparedProducts.map((p) => (
              <div 
                key={p.id}
                className="relative group w-11 h-11 rounded-xl bg-neutral-800 border border-neutral-700 overflow-hidden shrink-0"
              >
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFromCompare(p.id);
                  }}
                  className="absolute inset-0 bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  title="Remove from comparison"
                >
                  <X className="w-3.5 h-3.5 text-red-400" />
                </button>
              </div>
            ))}

            {/* Empty slots placeholders */}
            {Array.from({ length: 4 - comparedProducts.length }).map((_, i) => (
              <div
                key={i}
                className="w-11 h-11 rounded-xl border border-dashed border-neutral-700 flex items-center justify-center text-neutral-600 text-[10px] font-mono shrink-0"
                title="Add more items to compare"
              >
                +
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            type="button"
            onClick={openCompareModal}
            className="flex-1 sm:flex-initial px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
          >
            <span>Compare Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={clearCompare}
            title="Clear comparison list"
            className="p-2 text-neutral-400 hover:text-red-400 hover:bg-neutral-800 rounded-xl transition-colors cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
