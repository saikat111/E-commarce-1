import React, { useState, useMemo } from 'react';
import { X, Search, ArrowRight } from 'lucide-react';
import { PRODUCTS_CATALOG } from '../../data/products';
import { Product } from '../../types';
import { ProductIllustration } from './ProductIllustration';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query.trim()) return PRODUCTS_CATALOG.slice(0, 4);
    const q = query.toLowerCase().trim();
    return PRODUCTS_CATALOG.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.materials.some((m) => m.toLowerCase().includes(q))
    );
  }, [query]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-neutral-950/70 backdrop-blur-xs flex items-start justify-center p-4 pt-16 sm:pt-24 animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-neutral-200 gap-3">
          <Search className="w-4 h-4 text-neutral-400" />
          <input
            type="text"
            autoFocus
            placeholder="Search architectural objects, brass, travertine, titanium..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 text-sm bg-transparent border-none outline-hidden text-neutral-900 placeholder:text-neutral-400"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-neutral-400 hover:text-neutral-700 font-mono"
            >
              clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-full text-neutral-400 hover:text-neutral-900 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-4 max-h-[60vh] overflow-y-auto space-y-2">
          <div className="text-[11px] uppercase tracking-wider text-neutral-500 font-semibold px-2 mb-2">
            {query.trim() ? `Found ${filtered.length} Objects` : 'Featured Objects'}
          </div>

          {filtered.length === 0 ? (
            <div className="py-12 text-center text-xs text-neutral-500">
              No objects found matching "{query}". Try "brass", "lamp", "watch", or "linen".
            </div>
          ) : (
            filtered.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  onSelectProduct(product);
                  onClose();
                }}
                className="flex items-center gap-4 p-2.5 rounded-xl hover:bg-neutral-100 cursor-pointer transition-colors group"
              >
                <div className="w-14 h-14 bg-neutral-50 rounded-lg border border-neutral-200/80 p-1 flex items-center justify-center shrink-0">
                  <ProductIllustration visualId={product.visualId} className="w-10 h-10" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-semibold text-neutral-900 group-hover:text-neutral-700 transition-colors truncate">
                    {product.name}
                  </h4>
                  <p className="text-[11px] text-neutral-500 truncate">{product.subtitle}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono font-semibold text-neutral-900 tabular-nums">
                    ${product.price}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-900 ml-auto mt-1 transition-colors" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
