import React, { useState } from 'react';
import { 
  Star, Truck, ShieldCheck, RotateCcw, Heart, Check, Plus, Minus, 
  ChevronRight, Zap, ShoppingBag, Store, MessageCircle, Share2, Award, Clock
} from 'lucide-react';
import { Product, ProductVariantColor, ProductVariantSpec, PageRoute, ProductCategory } from '../../types';
import { formatBDT } from '../../utils/formatters';
import { useCart } from '../../context/CartContext';
import { CATEGORIES_METADATA } from '../../data/products';

interface ProductDetailPageProps {
  product: Product;
  relatedProducts: Product[];
  onNavigate: (page: PageRoute, category?: ProductCategory, productId?: string) => void;
  onSelectProduct: (product: Product) => void;
  onBuyNow: (product: Product, selectedColor: ProductVariantColor, selectedSpec?: ProductVariantSpec, quantity?: number) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  relatedProducts,
  onNavigate,
  onSelectProduct,
  onBuyNow,
}) => {
  const { addItem, toggleWishlist, isWishlisted } = useCart();

  const [activeImage, setActiveImage] = useState<string>(product.imageUrl);
  const [selectedColor, setSelectedColor] = useState<ProductVariantColor>(product.colors[0]);
  const [selectedSpec, setSelectedSpec] = useState<ProductVariantSpec | undefined>(product.specsVariants?.[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'desc' | 'reviews'>('specs');
  const [addedToast, setAddedToast] = useState(false);

  const wishlisted = isWishlisted(product.id);
  const currentPriceBDT = product.priceBDT + (selectedSpec?.surchargeBDT || 0);
  const categoryMeta = CATEGORIES_METADATA.find((c) => c.id === product.category);

  const handleAddToCart = () => {
    addItem(product, selectedColor, selectedSpec, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  const handleInstantBuyNow = () => {
    onBuyNow(product, selectedColor, selectedSpec, quantity);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10">
      
      {/* Main PDP Grid (Gallery Left + Contiguous Buy Module Center/Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start bg-white rounded-3xl border border-neutral-200 p-6 sm:p-8 shadow-xs">
        
        {/* Left Column: Multi-Photo Gallery Stage */}
        <div className="lg:col-span-5 space-y-4">
          {/* Main Hero Photo */}
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200 shadow-2xs">
            <img
              src={activeImage}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center transition-all duration-300"
            />
            {/* Badges */}
            <div className="absolute top-3 left-3 flex items-center gap-1.5">
              <span className="bg-amber-400 text-neutral-950 text-xs font-black px-2 py-0.5 rounded shadow-2xs">
                CHOICE
              </span>
              <span className="bg-red-600 text-white text-xs font-black px-2 py-0.5 rounded shadow-2xs">
                -{product.discountPercent}% OFF
              </span>
            </div>

            {/* Wishlist Button */}
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`absolute top-3 right-3 p-2.5 rounded-full transition-colors cursor-pointer shadow-sm ${
                wishlisted ? 'bg-red-50 text-red-600' : 'bg-white/90 text-neutral-600 hover:bg-white'
              }`}
            >
              <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Thumbnail Strip */}
          <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-none">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`w-18 h-18 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                  activeImage === img ? 'border-red-600 ring-2 ring-red-100' : 'border-neutral-200 hover:border-neutral-400'
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Guarantee Badges */}
          <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 text-xs space-y-2">
            <div className="flex items-center gap-2 text-neutral-900 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Official Warranty & Protection</span>
            </div>
            <p className="text-neutral-500 text-[11px] leading-relaxed">
              {product.warranty}. Authentic import directly verified for quality and serial authenticity.
            </p>
          </div>
        </div>

        {/* Center/Right Column: Product Details & Purchase Actions */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Header & Seller Tag */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500">
              <span className="bg-red-50 text-red-600 font-bold px-2 py-0.5 rounded">
                SuperDeal Choice
              </span>
              <span>·</span>
              <span>{product.ordersCount}+ Orders in Bangladesh</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-neutral-950 leading-snug">
              {product.name}
            </h1>

            <p className="text-xs sm:text-sm text-neutral-600">
              {product.subtitle}
            </p>

            {/* Ratings & Orders */}
            <div className="flex items-center gap-3 text-xs pt-1">
              <div className="flex items-center text-amber-500">
                <Star className="w-4 h-4 fill-current" />
                <span className="ml-1 font-black text-neutral-950 font-mono">{product.rating}</span>
              </div>
              <span className="text-neutral-300">|</span>
              <span className="text-neutral-600">{product.reviewsCount} Customer Reviews</span>
              <span className="text-neutral-300">|</span>
              <span className="text-emerald-700 font-bold">98.8% Positive Feedback</span>
            </div>
          </div>

          {/* Pricing in BDT */}
          <div className="p-4 sm:p-5 bg-red-50/60 rounded-2xl border border-red-200/80 space-y-2">
            <div className="flex items-baseline gap-3 font-mono tabular-nums">
              <span className="text-2xl sm:text-3xl font-black text-red-600">
                {formatBDT(currentPriceBDT)}
              </span>
              <span className="text-sm sm:text-base text-neutral-400 line-through">
                {formatBDT(product.originalPriceBDT)}
              </span>
              <span className="text-xs font-black text-red-700 bg-red-100 px-2 py-0.5 rounded-full">
                Save {formatBDT(product.originalPriceBDT - currentPriceBDT)} (-{product.discountPercent}%)
              </span>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-neutral-600">
              <Clock className="w-3.5 h-3.5 text-red-600" />
              <span>Flash Price guaranteed for today · All taxes included</span>
            </div>
          </div>

          {/* Variants: Colors */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 block">
              Color Option: <span className="text-neutral-900 font-black">{selectedColor.label}</span>
            </label>
            <div className="flex flex-wrap gap-2.5">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                    selectedColor.name === c.name
                      ? 'border-neutral-900 bg-neutral-900 text-white shadow-xs'
                      : 'border-neutral-200 bg-white text-neutral-800 hover:border-neutral-300'
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-white/30"
                    style={{ backgroundColor: c.hex }}
                  />
                  <span>{c.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Stepper & Stock Warning */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-700">
              <span>Quantity</span>
              <span className="text-emerald-700 text-[11px] font-semibold lowercase">
                ({product.stockCount} items in stock)
              </span>
            </div>
            <div className="flex items-center border border-neutral-300 rounded-xl bg-white h-11 w-36">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-3 text-neutral-500 hover:text-neutral-900 cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="flex-1 text-center font-mono text-sm font-bold text-neutral-900 tabular-nums">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-3 text-neutral-500 hover:text-neutral-900 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Dual Action Buttons (Add to Cart + Buy Now) */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch gap-3">
            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className={`flex-1 h-13 inline-flex items-center justify-center gap-2 px-6 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border shadow-xs cursor-pointer active:scale-98 ${
                addedToast
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-amber-400 hover:bg-amber-500 text-neutral-950 border-amber-400'
              }`}
            >
              {addedToast ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Cart!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>

            {/* Buy Now (Direct Express Checkout) */}
            <button
              onClick={handleInstantBuyNow}
              className="flex-1 h-13 inline-flex items-center justify-center gap-2 px-6 rounded-xl text-xs font-bold uppercase tracking-wider bg-red-600 hover:bg-red-700 text-white transition-all shadow-md cursor-pointer active:scale-98"
            >
              <Zap className="w-4 h-4 fill-white text-white" />
              <span>Buy Now ({formatBDT(currentPriceBDT * quantity)})</span>
            </button>
          </div>

          {/* Delivery & Seller Information Box */}
          <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200/80 space-y-3 text-xs">
            <div className="flex items-start gap-3">
              <Truck className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
              <div>
                <p className="font-bold text-neutral-900">
                  Estimated Delivery: Within {product.estimatedDeliveryDays} Days to Dhaka & Nationwide
                </p>
                <p className="text-[11px] text-neutral-500">
                  Free shipping on orders over ৳2,500. Insured courier with live SMS tracking.
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-neutral-200/60 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Store className="w-4 h-4 text-neutral-700" />
                <span className="font-bold text-neutral-900">{product.seller.name}</span>
                <span className="text-[10px] bg-neutral-200 text-neutral-700 font-bold px-1.5 py-0.2 rounded">
                  {product.seller.positiveFeedbackRate} Positive
                </span>
              </div>
              <button 
                onClick={() => alert('Connected with Seller Store Support Representative.')}
                className="text-[11px] text-red-600 font-bold hover:underline cursor-pointer flex items-center gap-1"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Chat Now</span>
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Tabs Section: Specifications / Narrative Description / Verified Reviews */}
      <div className="bg-white rounded-3xl border border-neutral-200 p-6 sm:p-8 space-y-6 shadow-2xs">
        
        {/* Tabs Headers */}
        <div className="flex items-center gap-6 border-b border-neutral-200 pb-3 text-xs font-bold uppercase tracking-wider">
          <button
            onClick={() => setActiveTab('specs')}
            className={`pb-2 relative transition-colors cursor-pointer ${
              activeTab === 'specs' ? 'text-red-600' : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            Detailed Specifications
            {activeTab === 'specs' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600" />}
          </button>

          <button
            onClick={() => setActiveTab('desc')}
            className={`pb-2 relative transition-colors cursor-pointer ${
              activeTab === 'desc' ? 'text-red-600' : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            Product Overview & Features
            {activeTab === 'desc' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600" />}
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-2 relative transition-colors cursor-pointer ${
              activeTab === 'reviews' ? 'text-red-600' : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            Buyer Reviews ({product.reviews.length})
            {activeTab === 'reviews' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600" />}
          </button>
        </div>

        {/* Tab Content */}
        <div className="text-xs sm:text-sm">
          {activeTab === 'specs' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(product.specifications).map(([key, val]) => (
                <div key={key} className="flex justify-between py-2.5 px-3 bg-neutral-50 rounded-lg border border-neutral-100">
                  <span className="text-neutral-500 font-medium">{key}</span>
                  <span className="text-neutral-900 font-bold text-right">{val}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'desc' && (
            <div className="space-y-4">
              <p className="text-neutral-700 leading-relaxed text-sm">
                {product.description}
              </p>
              <div className="space-y-2 pt-2">
                <h4 className="font-bold text-neutral-900 text-sm">Key Highlights</h4>
                <ul className="space-y-1.5">
                  {product.keyFeatures.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2 text-neutral-700">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4">
              {product.reviews.map((rev) => (
                <div key={rev.id} className="p-4 bg-neutral-50 rounded-xl border border-neutral-200/80 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-neutral-900">{rev.author}</span>
                      <span className="text-neutral-400">·</span>
                      <span className="text-neutral-500">{rev.location}</span>
                      {rev.verified && (
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded">
                          Verified Buyer
                        </span>
                      )}
                    </div>
                    <span className="text-neutral-400 font-mono">{rev.date}</span>
                  </div>

                  <div className="flex items-center text-amber-400">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>

                  <h5 className="font-bold text-neutral-900 text-xs">{rev.title}</h5>
                  <p className="text-xs text-neutral-600 leading-relaxed">{rev.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* RELATED PRODUCTS SECTION (Requested in Prompt) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
          <div>
            <h3 className="text-lg sm:text-xl font-black text-neutral-950">
              Related Products · Customers Also Bought
            </h3>
            <p className="text-xs text-neutral-500">
              Complementary items from {categoryMeta ? categoryMeta.name : 'this category'}
            </p>
          </div>
          <button
            onClick={() => onNavigate('category', product.category)}
            className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer"
          >
            <span>View All Related</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* 4 Related Product Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {relatedProducts.map((rel) => (
            <div
              key={rel.id}
              onClick={() => {
                onSelectProduct(rel);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group bg-white rounded-2xl border border-neutral-200 hover:border-neutral-400 hover:shadow-md transition-all p-3 flex flex-col justify-between cursor-pointer"
            >
              <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-neutral-100 mb-2.5">
                <img
                  src={rel.imageUrl}
                  alt={rel.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <span className="absolute top-1 left-1 bg-red-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded">
                  -{rel.discountPercent}%
                </span>
              </div>

              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-1 text-[10px] text-neutral-500">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-neutral-900">{rel.rating}</span>
                  <span>({rel.ordersCount}+ sold)</span>
                </div>
                <h4 className="text-xs font-bold text-neutral-900 group-hover:text-red-600 transition-colors line-clamp-1">
                  {rel.name}
                </h4>
                <div className="flex items-baseline gap-1.5 font-mono tabular-nums pt-1">
                  <span className="text-sm font-black text-red-600">{formatBDT(rel.priceBDT)}</span>
                  <span className="text-[10px] text-neutral-400 line-through">{formatBDT(rel.originalPriceBDT)}</span>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onBuyNow(rel, rel.colors[0]);
                }}
                className="mt-2.5 w-full py-1.5 bg-neutral-950 hover:bg-red-600 text-white text-[11px] font-bold rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
              >
                <Zap className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span>Buy Now</span>
              </button>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
