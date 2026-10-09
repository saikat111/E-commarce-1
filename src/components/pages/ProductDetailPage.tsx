import React, { useState, useEffect } from 'react';
import { 
  Star, Truck, ShieldCheck, RotateCcw, Heart, Check, Plus, Minus, 
  ChevronRight, ChevronLeft, Zap, ShoppingBag, Store, MessageCircle, Share2, Award, Clock,
  ThumbsUp, Edit3, X, Maximize2
} from 'lucide-react';
import { Product, ProductVariantColor, ProductVariantSpec, PageRoute, ProductCategory, ProductReview } from '../../types';
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

  // Multi-Image Gallery State
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [showLightbox, setShowLightbox] = useState(false);
  const activeImage = product.images[activeImageIndex] || product.imageUrl;

  const [selectedColor, setSelectedColor] = useState<ProductVariantColor>(product.colors[0]);
  const [selectedSpec, setSelectedSpec] = useState<ProductVariantSpec | undefined>(product.specsVariants?.[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'desc' | 'reviews'>('specs');
  const [addedToast, setAddedToast] = useState(false);

  // Customer Reviews State
  const [reviewsList, setReviewsList] = useState<ProductReview[]>(product.reviews || []);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewFilter, setReviewFilter] = useState<'all' | '5' | '4' | 'verified'>('all');
  const [votedHelpful, setVotedHelpful] = useState<Record<string, boolean>>({});
  const [reviewSubmittedToast, setReviewSubmittedToast] = useState(false);

  // New Review Form State
  const [newAuthor, setNewAuthor] = useState('');
  const [newLocation, setNewLocation] = useState('Dhaka, BD');
  const [newRating, setNewRating] = useState(5);
  const [newTitle, setNewTitle] = useState('');
  const [newComment, setNewComment] = useState('');

  // Sync reviews and active image when product changes
  useEffect(() => {
    setActiveImageIndex(0);
    setReviewsList(product.reviews || []);
    setSelectedColor(product.colors[0]);
    setSelectedSpec(product.specsVariants?.[0]);
    setQuantity(1);
  }, [product]);

  const wishlisted = isWishlisted(product.id);
  const currentPriceBDT = product.priceBDT + (selectedSpec?.surchargeBDT || 0);
  const categoryMeta = CATEGORIES_METADATA.find((c) => c.id === product.category);

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const handleAddToCart = () => {
    addItem(product, selectedColor, selectedSpec, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  const handleInstantBuyNow = () => {
    onBuyNow(product, selectedColor, selectedSpec, quantity);
  };

  const handleToggleHelpful = (reviewId: string) => {
    setVotedHelpful((prev) => ({
      ...prev,
      [reviewId]: !prev[reviewId],
    }));
  };

  const handleCreateReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) return;

    const newRev: ProductReview = {
      id: `rev_user_${Date.now()}`,
      author: newAuthor.trim(),
      location: newLocation.trim() || 'Dhaka, BD',
      rating: newRating,
      date: 'Just now',
      title: newTitle.trim() || 'Verified Customer Review',
      comment: newComment.trim(),
      verified: true,
      helpfulCount: 0,
    };

    setReviewsList([newRev, ...reviewsList]);
    setShowReviewModal(false);
    setNewAuthor('');
    setNewTitle('');
    setNewComment('');
    setNewRating(5);
    setReviewSubmittedToast(true);
    setTimeout(() => setReviewSubmittedToast(false), 3000);
  };

  // Filtered reviews
  const displayedReviews = reviewsList.filter((rev) => {
    if (reviewFilter === '5') return rev.rating === 5;
    if (reviewFilter === '4') return rev.rating === 4;
    if (reviewFilter === 'verified') return rev.verified;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10">
      
      {/* Main PDP Grid (Gallery Left + Contiguous Buy Module Center/Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start bg-white rounded-3xl border border-neutral-200 p-6 sm:p-8 shadow-xs">
        
        {/* Left Column: Multi-Photo Gallery Stage */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Main Hero Photo Container with Carousel Arrows & Counter */}
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200 shadow-2xs group">
            <img
              src={activeImage}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center transition-all duration-300 group-hover:scale-105"
            />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 z-10">
              {product.isFlashSale && (
                <span className="bg-red-600 text-white text-xs font-black px-2 py-0.5 rounded shadow-2xs">
                  ⚡ FLASH SALE
                </span>
              )}
              {product.isBestSeller && (
                <span className="bg-blue-600 text-white text-xs font-black px-2 py-0.5 rounded shadow-2xs">
                  🏆 #{product.bestSellerRank || 1} BEST SELLER
                </span>
              )}
              <span className="bg-amber-400 text-neutral-950 text-xs font-black px-2 py-0.5 rounded shadow-2xs">
                CHOICE
              </span>
              <span className="bg-red-600 text-white text-xs font-black px-2 py-0.5 rounded shadow-2xs">
                -{product.discountPercent}% OFF
              </span>
            </div>

            {/* Top Right Controls: Lightbox Zoom & Wishlist */}
            <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
              <button
                onClick={() => setShowLightbox(true)}
                title="Enlarge product image"
                className="p-2.5 rounded-full bg-white/90 hover:bg-white text-neutral-700 hover:text-neutral-950 transition-colors shadow-sm cursor-pointer"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-2.5 rounded-full transition-colors cursor-pointer shadow-sm ${
                  wishlisted ? 'bg-red-50 text-red-600' : 'bg-white/90 text-neutral-600 hover:bg-white'
                }`}
              >
                <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Next / Previous Carousel Arrow Controls */}
            {product.images.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-neutral-800 flex items-center justify-center shadow-md transition-all opacity-80 group-hover:opacity-100 cursor-pointer z-10"
                  title="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-neutral-800 flex items-center justify-center shadow-md transition-all opacity-80 group-hover:opacity-100 cursor-pointer z-10"
                  title="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Photo Counter Pill */}
            <div className="absolute bottom-3 right-3 bg-neutral-900/80 backdrop-blur-xs text-white text-[11px] font-mono px-2 py-0.5 rounded-md z-10">
              {activeImageIndex + 1} / {product.images.length} Photos
            </div>
          </div>

          {/* Multiple Images Thumbnail Strip */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs text-neutral-500 font-semibold px-0.5">
              <span>Product Gallery ({product.images.length} views)</span>
              <span className="text-[11px] text-neutral-400">Click to switch</span>
            </div>
            <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-18 h-18 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                    activeImageIndex === idx
                      ? 'border-red-600 ring-2 ring-red-100 scale-102'
                      : 'border-neutral-200 hover:border-neutral-400 opacity-75 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail view ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-0.5 right-1 bg-black/60 text-white text-[9px] px-1 rounded font-mono">
                    #{idx + 1}
                  </span>
                </button>
              ))}
            </div>
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
            Buyer Reviews ({reviewsList.length})
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
            <div className="space-y-6">
              
              {/* Rating Summary Breakdown Box */}
              <div className="p-5 sm:p-6 bg-neutral-50 rounded-2xl border border-neutral-200/90 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                
                {/* Score Column */}
                <div className="md:col-span-4 text-center md:text-left space-y-1 md:border-r md:border-neutral-200 md:pr-6">
                  <div className="text-4xl sm:text-5xl font-black text-neutral-950 font-mono tracking-tight">
                    {product.rating}
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-1 text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-neutral-500">
                    Based on <strong>{product.reviewsCount}</strong> ratings in Bangladesh
                  </p>
                  <p className="text-[11px] text-emerald-700 font-bold">
                    ✓ 98.8% of buyers recommend this item
                  </p>
                </div>

                {/* Rating Distribution Bars */}
                <div className="md:col-span-5 space-y-1.5 text-xs text-neutral-600">
                  <div className="flex items-center gap-2">
                    <span className="w-12 text-neutral-500">5 Stars</span>
                    <div className="flex-1 bg-neutral-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-amber-400 h-full w-[82%]" />
                    </div>
                    <span className="w-8 text-right font-mono text-neutral-400">82%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-12 text-neutral-500">4 Stars</span>
                    <div className="flex-1 bg-neutral-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-amber-400 h-full w-[14%]" />
                    </div>
                    <span className="w-8 text-right font-mono text-neutral-400">14%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-12 text-neutral-500">3 Stars</span>
                    <div className="flex-1 bg-neutral-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-amber-400 h-full w-[3%]" />
                    </div>
                    <span className="w-8 text-right font-mono text-neutral-400">3%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-12 text-neutral-500">2 Stars</span>
                    <div className="flex-1 bg-neutral-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-amber-400 h-full w-[1%]" />
                    </div>
                    <span className="w-8 text-right font-mono text-neutral-400">1%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-12 text-neutral-500">1 Star</span>
                    <div className="flex-1 bg-neutral-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-amber-400 h-full w-[0%]" />
                    </div>
                    <span className="w-8 text-right font-mono text-neutral-400">0%</span>
                  </div>
                </div>

                {/* Write a Review Button */}
                <div className="md:col-span-3 text-center md:text-right">
                  <button
                    onClick={() => setShowReviewModal(true)}
                    className="w-full sm:w-auto px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-colors shadow-xs inline-flex items-center justify-center gap-2 cursor-pointer text-xs"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span>Write a Review</span>
                  </button>
                  <p className="text-[10px] text-neutral-400 mt-1.5">
                    Share feedback & earn 20 Coins
                  </p>
                </div>

              </div>

              {/* Review Filter Tabs */}
              <div className="flex items-center gap-2 text-xs overflow-x-auto pb-1 scrollbar-none">
                <button
                  onClick={() => setReviewFilter('all')}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                    reviewFilter === 'all' ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  All Reviews ({reviewsList.length})
                </button>
                <button
                  onClick={() => setReviewFilter('5')}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                    reviewFilter === '5' ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  5 Stars Only
                </button>
                <button
                  onClick={() => setReviewFilter('4')}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                    reviewFilter === '4' ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  4 Stars Only
                </button>
                <button
                  onClick={() => setReviewFilter('verified')}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                    reviewFilter === 'verified' ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  Verified Purchases
                </button>
              </div>

              {/* Reviews Cards List */}
              <div className="space-y-3.5">
                {displayedReviews.map((rev) => {
                  const hasVoted = !!votedHelpful[rev.id];
                  const currentHelpful = (rev.helpfulCount || 0) + (hasVoted ? 1 : 0);

                  return (
                    <div key={rev.id} className="p-4 sm:p-5 bg-neutral-50 rounded-2xl border border-neutral-200/80 space-y-2.5 transition-all">
                      <div className="flex items-start justify-between gap-3 text-xs">
                        <div className="flex items-center gap-2 flex-wrap">
                          <div className="w-7 h-7 rounded-full bg-red-100 text-red-700 font-bold flex items-center justify-center uppercase text-xs">
                            {rev.author.charAt(0)}
                          </div>
                          <span className="font-bold text-neutral-900">{rev.author}</span>
                          <span className="text-neutral-400">·</span>
                          <span className="text-neutral-500 font-medium">{rev.location}</span>
                          {rev.verified && (
                            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                              <Check className="w-3 h-3 text-emerald-700" />
                              <span>Verified Buyer</span>
                            </span>
                          )}
                        </div>
                        <span className="text-neutral-400 font-mono text-[11px] shrink-0">{rev.date}</span>
                      </div>

                      {/* Stars */}
                      <div className="flex items-center text-amber-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-current' : 'text-neutral-300'}`} 
                          />
                        ))}
                      </div>

                      {/* Review Title & Content */}
                      <h5 className="font-bold text-neutral-950 text-xs sm:text-sm">{rev.title}</h5>
                      <p className="text-xs text-neutral-700 leading-relaxed">{rev.comment}</p>

                      {/* Helpful Button */}
                      <div className="pt-2 flex items-center justify-between border-t border-neutral-200/50 text-[11px]">
                        <button
                          onClick={() => handleToggleHelpful(rev.id)}
                          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                            hasVoted
                              ? 'bg-red-50 text-red-600 font-bold'
                              : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-200/60'
                          }`}
                        >
                          <ThumbsUp className={`w-3 h-3 ${hasVoted ? 'fill-current' : ''}`} />
                          <span>Helpful ({currentHelpful})</span>
                        </button>
                        <span className="text-neutral-400">Verified BD Order</span>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          )}
        </div>

      </div>

      {/* Lightbox Modal for Product Multi-Images */}
      {showLightbox && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 text-white"
          onClick={() => setShowLightbox(false)}
        >
          {/* Header */}
          <div className="flex items-center justify-between max-w-5xl mx-auto w-full" onClick={(e) => e.stopPropagation()}>
            <div className="text-xs text-neutral-300 font-medium truncate max-w-sm sm:max-w-md">
              <span className="font-bold text-white">{product.name}</span> · {activeImageIndex + 1} of {product.images.length}
            </div>
            <button
              onClick={() => setShowLightbox(false)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Large Image */}
          <div className="relative max-w-4xl max-h-[70vh] mx-auto w-full flex items-center justify-center my-auto" onClick={(e) => e.stopPropagation()}>
            <img
              src={activeImage}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="max-h-[70vh] max-w-full object-contain rounded-xl shadow-2xl"
            />
            {product.images.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white transition-all cursor-pointer"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails below Lightbox */}
          <div className="flex items-center justify-center gap-3 overflow-x-auto py-2" onClick={(e) => e.stopPropagation()}>
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                  activeImageIndex === idx ? 'border-red-500 ring-2 ring-red-400' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={img}
                  alt={`View ${idx + 1}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Write a Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div>
                <h3 className="text-base font-black text-neutral-950">Write a Customer Review</h3>
                <p className="text-xs text-neutral-500">Reviewing {product.name}</p>
              </div>
              <button
                onClick={() => setShowReviewModal(false)}
                className="p-1 rounded-lg text-neutral-400 hover:text-neutral-900 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateReview} className="space-y-4 text-xs">
              {/* Star Rating Select */}
              <div className="space-y-1">
                <label className="font-bold text-neutral-800 block">Overall Rating</label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setNewRating(star)}
                      className="p-1 text-amber-400 hover:scale-110 transition-transform cursor-pointer"
                    >
                      <Star className={`w-6 h-6 ${star <= newRating ? 'fill-current' : 'text-neutral-300'}`} />
                    </button>
                  ))}
                  <span className="ml-2 font-bold font-mono text-neutral-700">
                    {newRating} / 5 Stars
                  </span>
                </div>
              </div>

              {/* Author & City in Bangladesh */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-neutral-800 block">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Asif Mahmud"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-xl outline-hidden"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-neutral-800 block">Location (City, BD)</label>
                  <input
                    type="text"
                    placeholder="e.g. Dhaka, BD"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-xl outline-hidden"
                  />
                </div>
              </div>

              {/* Review Headline */}
              <div className="space-y-1">
                <label className="font-bold text-neutral-800 block">Review Headline</label>
                <input
                  type="text"
                  placeholder="e.g. Fantastic quality, arrived quickly in Dhaka!"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-xl outline-hidden"
                />
              </div>

              {/* Detailed Comments */}
              <div className="space-y-1">
                <label className="font-bold text-neutral-800 block">Detailed Review</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Tell other shoppers in Bangladesh about the build quality, sound/comfort, delivery speed, and performance..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-xl outline-hidden resize-none"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-colors cursor-pointer shadow-xs"
                >
                  Post Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Review Submitted Toast */}
      {reviewSubmittedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-bold animate-in fade-in slide-in-from-bottom-3 duration-200">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>Thank you! Your verified review has been posted.</span>
        </div>
      )}

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
