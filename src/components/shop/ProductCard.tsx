import React, { useState } from 'react';
import { Heart, Plus, Eye, Check } from 'lucide-react';
import { Product, ProductVariantColor } from '../../types';
import { ProductIllustration } from './ProductIllustration';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
  onQuickView,
}) => {
  const { addItem, toggleWishlist, isWishlisted } = useCart();
  const [selectedColor, setSelectedColor] = useState<ProductVariantColor>(product.colors[0]);
  const [justAdded, setJustAdded] = useState(false);
  const wishlisted = isWishlisted(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product, selectedColor, product.materialsVariants?.[0], 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onQuickView(product);
  };

  return (
    <article
      onClick={() => onSelectProduct(product)}
      className="group cursor-pointer flex flex-col bg-white rounded-xl border border-neutral-200/90 hover:border-neutral-300 hover:shadow-md transition-all duration-200 overflow-hidden"
    >
      {/* Visual Image Stage (takes ~70% of card) */}
      <div className="relative aspect-4/3 w-full bg-neutral-100 flex items-center justify-center p-6 overflow-hidden">
        
        {/* Subtle background texture */}
        <div className="absolute inset-0 bg-radial from-white/70 to-transparent opacity-80 pointer-events-none" />

        {/* Dynamic Vector Illustration */}
        <div className="w-full h-full transform group-hover:scale-[1.03] transition-transform duration-300 ease-out flex items-center justify-center">
          <ProductIllustration
            visualId={product.visualId}
            activeColorHex={selectedColor.hex}
          />
        </div>

        {/* Top Badges & Actions Overlay */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
          {/* Subtle 1-line text status (No colored pill candy) */}
          <div>
            {product.badge ? (
              <span className="text-[11px] font-medium tracking-wide uppercase text-neutral-700 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded shadow-2xs">
                {product.badge}
              </span>
            ) : product.compareAtPrice ? (
              <span className="text-[11px] font-medium tracking-wide uppercase text-amber-900 bg-amber-50/90 backdrop-blur-xs px-2 py-0.5 rounded border border-amber-200/60">
                Special Archive Price
              </span>
            ) : null}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleWishlistClick}
            className={`pointer-events-auto p-2 rounded-full transition-all ${
              wishlisted
                ? 'bg-red-50 text-red-600 shadow-2xs'
                : 'bg-white/80 text-neutral-600 hover:text-neutral-950 hover:bg-white shadow-2xs'
            }`}
            aria-label={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
            title={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
          >
            <Heart className={`w-3.5 h-3.5 ${wishlisted ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Hover Action Bar */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          <button
            onClick={handleQuickViewClick}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-white/95 backdrop-blur-xs text-neutral-800 text-xs font-semibold rounded-lg hover:bg-neutral-100 border border-neutral-200 shadow-2xs transition-all active:scale-[0.98]"
            title="Quick preview"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>

          <button
            onClick={handleQuickAdd}
            className={`py-2 px-3 text-xs font-semibold rounded-lg shadow-2xs transition-all active:scale-[0.98] flex items-center gap-1.5 ${
              justAdded
                ? 'bg-emerald-700 text-white'
                : 'bg-neutral-900 text-white hover:bg-neutral-800'
            }`}
            title="Quick add to bag"
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Added</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Card Content & Metadata */}
      <div className="p-4 flex flex-col justify-between flex-1 space-y-3">
        <div className="space-y-1">
          {/* Category & Availability unboxed metadata */}
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-neutral-500 font-medium">
            <span>{product.category}</span>
            <span aria-hidden="true">·</span>
            <span>{product.origin.split('&')[0].trim()}</span>
          </div>

          {/* Product Name */}
          <h3 className="text-sm sm:text-base font-semibold text-neutral-900 group-hover:text-neutral-700 transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Product Subtitle */}
          <p className="text-xs text-neutral-500 line-clamp-1">
            {product.subtitle}
          </p>
        </div>

        {/* Footer: Color Swatches & Price */}
        <div className="pt-2 border-t border-neutral-100 flex items-center justify-between gap-2">
          {/* Swatches */}
          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            {product.colors.map((c) => (
              <button
                key={c.name}
                onClick={() => setSelectedColor(c)}
                className={`w-3.5 h-3.5 rounded-full border transition-transform ${
                  selectedColor.name === c.name
                    ? 'ring-1 ring-neutral-900 ring-offset-1 scale-110'
                    : 'border-neutral-300 hover:scale-105'
                }`}
                style={{ backgroundColor: c.hex }}
                title={c.label}
                aria-label={`Select ${c.name}`}
              />
            ))}
          </div>

          {/* Pricing with Tabular Numerals */}
          <div className="text-right flex items-baseline gap-1.5 font-mono tabular-nums">
            {product.compareAtPrice && (
              <span className="text-xs text-neutral-400 line-through">
                ${product.compareAtPrice}
              </span>
            )}
            <span className="text-sm font-semibold text-neutral-900">
              ${product.price}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};
