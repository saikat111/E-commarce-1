import React from 'react';
import { Search, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { Product, ProductCategory, ProductFilterState } from '../../types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  filterState: ProductFilterState;
  onFilterChange: (updates: Partial<ProductFilterState>) => void;
  onResetFilters: () => void;
  onSelectProduct: (product: Product) => void;
  onQuickView: (product: Product) => void;
  totalAvailable: number;
}

const CATEGORIES: { id: ProductCategory; label: string }[] = [
  { id: 'all', label: 'All Catalog' },
  { id: 'lighting', label: 'Lighting' },
  { id: 'objects', label: 'Objects' },
  { id: 'furniture', label: 'Furniture' },
  { id: 'tableware', label: 'Tableware' },
  { id: 'acoustics', label: 'Acoustics' },
  { id: 'horology', label: 'Horology' },
];

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  filterState,
  onFilterChange,
  onResetFilters,
  onSelectProduct,
  onQuickView,
  totalAvailable,
}) => {
  const isFiltered =
    filterState.category !== 'all' ||
    filterState.searchQuery.trim().length > 0 ||
    filterState.inStockOnly ||
    filterState.sortBy !== 'featured';

  return (
    <section id="catalog-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-neutral-200">
        <div>
          <div className="text-xs font-semibold tracking-wider uppercase text-neutral-500 mb-1">
            Curated Archive · Permanent Collection
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif text-neutral-900 font-normal">
            Objects of Precision & Form
          </h2>
        </div>

        {/* Total Count */}
        <div className="text-xs text-neutral-500 font-mono tabular-nums">
          Showing {products.length} of {totalAvailable} curated pieces
        </div>
      </div>

      {/* Control Bar: Categories & Tools */}
      <div className="py-6 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        
        {/* Category Segmented Tabs (Functional filter buttons per Section 1A) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isActive = filterState.category === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onFilterChange({ category: cat.id })}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-neutral-900 text-white shadow-xs'
                    : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/70'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Filter Controls: Search & Sort */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Quick Search Input */}
          <div className="relative flex-1 sm:w-64">
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter by material, stone..."
              value={filterState.searchQuery}
              onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-neutral-300 rounded-lg focus:outline-hidden focus:border-neutral-900 text-neutral-900 placeholder:text-neutral-400 transition-colors"
            />
            {filterState.searchQuery && (
              <button
                onClick={() => onFilterChange({ searchQuery: '' })}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-neutral-400 hover:text-neutral-800 font-mono"
              >
                esc
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-500" />
            <select
              value={filterState.sortBy}
              onChange={(e) => onFilterChange({ sortBy: e.target.value as any })}
              className="text-xs bg-white border border-neutral-300 rounded-lg py-1.5 px-2.5 text-neutral-800 focus:outline-hidden focus:border-neutral-900 cursor-pointer"
            >
              <option value="featured">Featured Picks</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest Additions</option>
            </select>
          </div>

          {/* In Stock Only Checkbox */}
          <label className="flex items-center gap-2 text-xs text-neutral-600 select-none cursor-pointer">
            <input
              type="checkbox"
              checked={filterState.inStockOnly}
              onChange={(e) => onFilterChange({ inStockOnly: e.target.checked })}
              className="rounded border-neutral-300 text-neutral-900 focus:ring-0"
            />
            <span>In Stock Only</span>
          </label>

          {/* Reset Filters */}
          {isFiltered && (
            <button
              onClick={onResetFilters}
              className="inline-flex items-center gap-1 text-xs text-neutral-500 hover:text-neutral-900 transition-colors ml-1"
              title="Reset all active filters"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Grid Display */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-2">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelectProduct={onSelectProduct}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="py-20 text-center border border-dashed border-neutral-300 rounded-2xl bg-neutral-50">
          <p className="text-sm font-semibold text-neutral-900 mb-1">
            No matching design objects located
          </p>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto mb-5">
            We couldn't find items matching your active category and search parameters.
          </p>
          <button
            onClick={onResetFilters}
            className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-neutral-900 rounded-lg hover:bg-neutral-800 transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </section>
  );
};
