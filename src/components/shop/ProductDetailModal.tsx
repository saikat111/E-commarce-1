import React, { useState } from 'react';
import { X, Star, Shield, Truck, RotateCcw, Heart, Check, Plus, Minus, ArrowRight } from 'lucide-react';
import { Product, ProductVariantColor, ProductVariantMaterial } from '../../types';
import { ProductIllustration } from './ProductIllustration';
import { useCart } from '../../context/CartContext';
import { PRODUCTS_CATALOG } from '../../data/products';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onSelectRelated: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onSelectRelated,
}) => {
  if (!product) return null;

  const { addItem, toggleWishlist, isWishlisted } = useCart();
  const [selectedColor, setSelectedColor] = useState<ProductVariantColor>(product.colors[0]);
  const [selectedMaterial, setSelectedMaterial] = useState<ProductVariantMaterial | undefined>(
    product.materialsVariants?.[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'reviews'>('details');
  const [addedAnimation, setAddedAnimation] = useState(false);

  const wishlisted = isWishlisted(product.id);
  const currentPrice = product.price + (selectedMaterial?.surcharge || 0);

  const handleAddToCart = () => {
    addItem(product, selectedColor, selectedMaterial, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  const relatedProducts = PRODUCTS_CATALOG.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.isBestseller)
  ).slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div
        className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 bg-neutral-50/80">
          <div className="flex items-center gap-2 text-xs text-neutral-500 font-medium">
            <span className="uppercase tracking-wider">{product.category}</span>
            <span aria-hidden="true">·</span>
            <span>Batch {product.origin}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`p-2 rounded-full border transition-colors ${
                wishlisted
                  ? 'bg-red-50 text-red-600 border-red-200'
                  : 'bg-white text-neutral-600 border-neutral-200 hover:text-neutral-900'
              }`}
              title={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
            >
              <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white border border-neutral-200 text-neutral-500 hover:text-neutral-950 hover:bg-neutral-100 transition-colors"
              title="Close dialog (esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto p-6 md:p-8 space-y-10">
          
          {/* Main PDP Split (Left Gallery / Right Contiguous Purchase Module) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column: Gallery Stage */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative aspect-4/3 bg-neutral-100 rounded-xl border border-neutral-200 flex items-center justify-center p-8 overflow-hidden">
                <ProductIllustration
                  visualId={product.visualId}
                  activeColorHex={selectedColor.hex}
                  className="w-full h-full max-h-80"
                />

                {product.badge && (
                  <div className="absolute top-4 left-4 text-xs font-semibold uppercase tracking-wider text-neutral-800 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded shadow-2xs">
                    {product.badge}
                  </div>
                )}
              </div>

              {/* Color Finish Preview Indicator */}
              <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200/80 flex items-center justify-between text-xs text-neutral-600">
                <span className="font-medium text-neutral-900">Current Finish:</span>
                <span className="flex items-center gap-1.5">
                  <span
                    className="w-3 h-3 rounded-full border border-neutral-300"
                    style={{ backgroundColor: selectedColor.hex }}
                  />
                  <span>{selectedColor.label}</span>
                </span>
              </div>
            </div>

            {/* Right Column: Contiguous Purchase Module */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-medium text-neutral-500">
                  <div className="flex items-center text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="ml-1 text-neutral-800 font-semibold font-mono tabular-nums">{product.rating}</span>
                  </div>
                  <span>·</span>
                  <span>{product.reviewsCount} verified collector evaluations</span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-serif text-neutral-900 font-normal leading-tight">
                  {product.name}
                </h1>
                <p className="text-sm text-neutral-600">
                  {product.subtitle}
                </p>
              </div>

              {/* Price and Stock Notice */}
              <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 flex items-baseline justify-between">
                <div>
                  <div className="flex items-baseline gap-2 font-mono tabular-nums">
                    <span className="text-2xl font-semibold text-neutral-900">
                      ${currentPrice}
                    </span>
                    {product.compareAtPrice && (
                      <span className="text-sm text-neutral-400 line-through">
                        ${product.compareAtPrice}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-neutral-500 mt-0.5">
                    Taxes calculated at checkout · Free insured freight over $250
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-xs font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {product.leadTime}
                  </span>
                </div>
              </div>

              {/* Variant 1: Color / Tone Selection */}
              <div className="space-y-2">
                <label className="text-xs font-semibold tracking-wider uppercase text-neutral-700 block">
                  Colorway & Surface: <span className="text-neutral-500 font-normal">{selectedColor.label}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c)}
                      className={`flex items-center gap-2 px-3 py-1.5 text-xs rounded-lg border transition-all ${
                        selectedColor.name === c.name
                          ? 'border-neutral-900 bg-neutral-900 text-white shadow-xs'
                          : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300'
                      }`}
                    >
                      <span
                        className="w-3 h-3 rounded-full border border-white/20"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Variant 2: Optional Material Plinth/Finish */}
              {product.materialsVariants && product.materialsVariants.length > 0 && (
                <div className="space-y-2">
                  <label className="text-xs font-semibold tracking-wider uppercase text-neutral-700 block">
                    Material Specification
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {product.materialsVariants.map((mat) => (
                      <button
                        key={mat.name}
                        onClick={() => setSelectedMaterial(mat)}
                        className={`text-left p-2.5 rounded-lg border text-xs transition-all ${
                          selectedMaterial?.name === mat.name
                            ? 'border-neutral-900 bg-neutral-50 ring-1 ring-neutral-900'
                            : 'border-neutral-200 hover:border-neutral-300'
                        }`}
                      >
                        <div className="font-semibold text-neutral-900">{mat.name}</div>
                        <div className="text-neutral-500 font-mono text-[11px] mt-0.5">
                          {mat.finish} {mat.surcharge ? `(+$${mat.surcharge})` : ''}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Stepper & Add to Bag Contiguous Controls */}
              <div className="pt-2 flex items-center gap-3">
                <div className="flex items-center border border-neutral-300 rounded-lg bg-white h-12">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 text-neutral-500 hover:text-neutral-900 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 font-mono text-sm font-semibold text-neutral-900 tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 text-neutral-500 hover:text-neutral-900 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className={`flex-1 h-12 inline-flex items-center justify-center gap-2 px-6 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all shadow-sm active:scale-[0.99] ${
                    addedAnimation
                      ? 'bg-emerald-700 text-white'
                      : 'bg-neutral-900 text-white hover:bg-neutral-800'
                  }`}
                >
                  {addedAnimation ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Placed In Your Bag</span>
                    </>
                  ) : (
                    <>
                      <span>Add to Shopping Bag</span>
                      <span className="font-mono tabular-nums opacity-90">· ${currentPrice * quantity}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Trust Micro-Guarantees */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-neutral-200 text-[11px] text-neutral-600">
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-neutral-700 shrink-0" />
                  <span>Carbon-Free Freight</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-neutral-700 shrink-0" />
                  <span>10-Yr Guarantee</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <RotateCcw className="w-3.5 h-3.5 text-neutral-700 shrink-0" />
                  <span>30-Day In-Home Trial</span>
                </div>
              </div>

            </div>
          </div>

          {/* Deep Information Tabs: Details / Technical Specs / Verified Reviews */}
          <div className="border-t border-neutral-200 pt-6">
            <div className="flex items-center gap-4 border-b border-neutral-200 pb-3">
              <button
                onClick={() => setActiveTab('details')}
                className={`text-xs font-semibold uppercase tracking-wider pb-1 transition-colors relative ${
                  activeTab === 'details'
                    ? 'text-neutral-900'
                    : 'text-neutral-400 hover:text-neutral-700'
                }`}
              >
                Story & Craft
                {activeTab === 'details' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-900" />}
              </button>

              <button
                onClick={() => setActiveTab('specs')}
                className={`text-xs font-semibold uppercase tracking-wider pb-1 transition-colors relative ${
                  activeTab === 'specs'
                    ? 'text-neutral-900'
                    : 'text-neutral-400 hover:text-neutral-700'
                }`}
              >
                Specifications & Dimensions
                {activeTab === 'specs' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-900" />}
              </button>

              <button
                onClick={() => setActiveTab('reviews')}
                className={`text-xs font-semibold uppercase tracking-wider pb-1 transition-colors relative ${
                  activeTab === 'reviews'
                    ? 'text-neutral-900'
                    : 'text-neutral-400 hover:text-neutral-700'
                }`}
              >
                Collector Reviews ({product.reviews.length})
                {activeTab === 'reviews' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-900" />}
              </button>
            </div>

            <div className="py-6">
              {activeTab === 'details' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-neutral-900">Architectural Narrative</h3>
                    <p className="text-neutral-600 leading-relaxed">{product.description}</p>
                    <p className="text-neutral-600 leading-relaxed">{product.story}</p>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-semibold text-neutral-900">Provenance & Care</h3>
                    <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 space-y-2 text-xs">
                      <div>
                        <span className="font-semibold text-neutral-800">Workshop Provenance:</span>
                        <p className="text-neutral-600">{product.origin}</p>
                      </div>
                      <div>
                        <span className="font-semibold text-neutral-800">Maintenance Protocol:</span>
                        <p className="text-neutral-600">{product.careInstructions}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'specs' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs">
                  <div>
                    <h3 className="font-semibold text-neutral-900 text-sm mb-3">Dimensional Measure</h3>
                    <table className="w-full border-collapse">
                      <tbody>
                        <tr className="border-b border-neutral-100 py-2">
                          <td className="py-2 text-neutral-500">Height:</td>
                          <td className="py-2 text-neutral-900 font-mono tabular-nums text-right">{product.dimensions.height}</td>
                        </tr>
                        <tr className="border-b border-neutral-100 py-2">
                          <td className="py-2 text-neutral-500">Width / Diameter:</td>
                          <td className="py-2 text-neutral-900 font-mono tabular-nums text-right">{product.dimensions.width}</td>
                        </tr>
                        {product.dimensions.depth && (
                          <tr className="border-b border-neutral-100 py-2">
                            <td className="py-2 text-neutral-500">Depth:</td>
                            <td className="py-2 text-neutral-900 font-mono tabular-nums text-right">{product.dimensions.depth}</td>
                          </tr>
                        )}
                        <tr className="py-2">
                          <td className="py-2 text-neutral-500">Total Net Weight:</td>
                          <td className="py-2 text-neutral-900 font-mono tabular-nums text-right">{product.dimensions.weight}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div>
                    <h3 className="font-semibold text-neutral-900 text-sm mb-3">Materials Composition</h3>
                    <ul className="space-y-2">
                      {product.materials.map((m, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-neutral-700">
                          <span className="text-neutral-400">·</span>
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  {product.reviews.map((rev) => (
                    <div key={rev.id} className="p-4 bg-neutral-50 rounded-xl border border-neutral-200/80 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-neutral-900">{rev.author}</span>
                          <span className="text-neutral-400">·</span>
                          <span className="text-neutral-500">{rev.location}</span>
                          {rev.verified && (
                            <span className="text-[10px] text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                              Verified Collector
                            </span>
                          )}
                        </div>
                        <span className="text-neutral-400 font-mono">{rev.date}</span>
                      </div>
                      <div className="flex items-center text-amber-500">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <h4 className="text-sm font-semibold text-neutral-900">{rev.title}</h4>
                      <p className="text-xs text-neutral-600 leading-relaxed">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Related Objects Row */}
          {relatedProducts.length > 0 && (
            <div className="border-t border-neutral-200 pt-8">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-4">
                Complementary Pieces in Archive
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedProducts.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => onSelectRelated(rel)}
                    className="cursor-pointer p-3 bg-neutral-50 rounded-xl border border-neutral-200 hover:border-neutral-300 transition-all flex items-center gap-3 group"
                  >
                    <div className="w-16 h-16 bg-white rounded-lg border border-neutral-200 p-1 flex items-center justify-center shrink-0">
                      <ProductIllustration visualId={rel.visualId} className="w-12 h-12" />
                    </div>
                    <div className="overflow-hidden flex-1">
                      <h4 className="text-xs font-semibold text-neutral-900 group-hover:text-neutral-600 transition-colors truncate">
                        {rel.name}
                      </h4>
                      <p className="text-[11px] text-neutral-500 font-mono tabular-nums">${rel.price}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-900 transition-colors" />
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
