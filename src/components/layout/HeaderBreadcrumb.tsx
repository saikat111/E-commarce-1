import React, { useState } from 'react';
import { Home, ChevronRight, ArrowLeft, ChevronDown, Sparkles, Tag } from 'lucide-react';
import { ProductCategory, PageRoute, Product } from '../../types';
import { CATEGORIES_METADATA } from '../../data/products';
import { formatBDT } from '../../utils/formatters';

interface HeaderBreadcrumbProps {
  currentPage: PageRoute;
  activeCategory: ProductCategory;
  product?: Product | null;
  selectedSubcategory?: string;
  onNavigate: (page: PageRoute, category?: ProductCategory, productId?: string) => void;
  onSelectSubcategory?: (subcategory: string) => void;
}

export const HeaderBreadcrumb: React.FC<HeaderBreadcrumbProps> = ({
  currentPage,
  activeCategory,
  product,
  selectedSubcategory,
  onNavigate,
  onSelectSubcategory,
}) => {
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);

  // Only render on category or product pages
  if (currentPage !== 'category' && currentPage !== 'product') {
    return null;
  }

  const activeCategoryMeta = CATEGORIES_METADATA.find((c) => c.id === activeCategory);

  const handleBack = () => {
    if (currentPage === 'product') {
      onNavigate('category', product?.category || activeCategory);
    } else {
      onNavigate('home');
    }
  };

  return (
    <div className="bg-white border-b border-neutral-200/90 shadow-2xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between text-xs">
        
        {/* Breadcrumb Hierarchy Trail */}
        <nav aria-label="Catalog Breadcrumb" className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-none py-0.5">
          
          {/* 1. Home Node */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-1 text-neutral-500 hover:text-neutral-900 transition-colors font-semibold shrink-0 cursor-pointer"
            title="Return to marketplace home"
          >
            <Home className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Home</span>
          </button>

          <ChevronRight className="w-3 h-3 text-neutral-300 shrink-0" aria-hidden="true" />

          {/* 2. Category / Department Node (with Quick Switcher Dropdown) */}
          <div className="relative shrink-0 flex items-center">
            <button
              onClick={() => onNavigate('category', activeCategory)}
              className={`hover:text-red-600 transition-colors cursor-pointer font-bold ${
                currentPage === 'category' && (!selectedSubcategory || selectedSubcategory === 'all')
                  ? 'text-red-600'
                  : 'text-neutral-700'
              }`}
            >
              {activeCategoryMeta ? activeCategoryMeta.name : 'All Catalog'}
            </button>

            {/* Quick Switch Dropdown Trigger */}
            <button
              onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
              className="ml-1 p-0.5 rounded text-neutral-400 hover:text-neutral-800 hover:bg-neutral-100 transition-colors cursor-pointer"
              title="Switch department"
              aria-expanded={categoryDropdownOpen}
            >
              <ChevronDown className="w-3 h-3" />
            </button>

            {/* Category Dropdown Menu */}
            {categoryDropdownOpen && (
              <div 
                className="absolute top-full left-0 mt-1 w-64 bg-white border border-neutral-200 shadow-xl rounded-xl z-50 p-2 text-xs animate-in fade-in duration-100"
                onMouseLeave={() => setCategoryDropdownOpen(false)}
              >
                <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider px-2 py-1">
                  Switch Department
                </div>
                <button
                  onClick={() => {
                    onNavigate('category', 'all');
                    setCategoryDropdownOpen(false);
                  }}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-neutral-100 font-semibold text-neutral-800 transition-colors cursor-pointer"
                >
                  All Products
                </button>
                {CATEGORIES_METADATA.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      onNavigate('category', cat.id);
                      setCategoryDropdownOpen(false);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                      activeCategory === cat.id ? 'bg-red-50 text-red-600 font-bold' : 'text-neutral-700 hover:bg-neutral-100'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 3. Subcategory Node (if present) */}
          {((currentPage === 'category' && selectedSubcategory && selectedSubcategory !== 'all') ||
            (currentPage === 'product' && product?.subcategory)) && (
            <>
              <ChevronRight className="w-3 h-3 text-neutral-300 shrink-0" aria-hidden="true" />
              <button
                onClick={() => {
                  const targetSub = currentPage === 'product' ? product?.subcategory : selectedSubcategory;
                  if (onSelectSubcategory && targetSub) {
                    onSelectSubcategory(targetSub);
                  }
                  onNavigate('category', product?.category || activeCategory);
                }}
                className={`font-semibold shrink-0 cursor-pointer transition-colors ${
                  currentPage === 'category' && selectedSubcategory && selectedSubcategory !== 'all'
                    ? 'text-red-600 font-bold'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {currentPage === 'product' ? product?.subcategory : selectedSubcategory}
              </button>
            </>
          )}

          {/* 4. Active Product Node (if on PDP) */}
          {currentPage === 'product' && product && (
            <>
              <ChevronRight className="w-3 h-3 text-neutral-300 shrink-0" aria-hidden="true" />
              <span 
                className="text-neutral-900 font-bold truncate max-w-xs sm:max-w-md shrink"
                title={product.name}
              >
                {product.name}
              </span>
              {product.isChoice && (
                <span className="hidden md:inline-flex bg-amber-400 text-neutral-950 text-[10px] font-black px-1.5 py-0.2 rounded shadow-2xs shrink-0">
                  CHOICE
                </span>
              )}
            </>
          )}

        </nav>

        {/* Right Navigation Helper Actions */}
        <div className="flex items-center gap-3 shrink-0 pl-2">
          {currentPage === 'product' && product && (
            <div className="hidden sm:flex items-center gap-1.5 font-mono text-red-600 font-black tabular-nums">
              <span>{formatBDT(product.priceBDT)}</span>
              <span className="text-[10px] text-neutral-400 line-through">
                {formatBDT(product.originalPriceBDT)}
              </span>
            </div>
          )}

          <button
            onClick={handleBack}
            className="inline-flex items-center gap-1 text-[11px] font-bold text-neutral-600 hover:text-red-600 bg-neutral-100 hover:bg-neutral-200/80 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3 h-3" />
            <span>{currentPage === 'product' ? 'Back to Category' : 'Back to Home'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
