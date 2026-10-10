/**
 * Domain Types for Ultra-Modern Multi-Page Marketplace
 * Pricing in Bangladeshi Taka (BDT)
 */

export type PageRoute = 
  | 'home'
  | 'category'
  | 'product'
  | 'cart'
  | 'checkout'
  | 'wishlist'
  | 'dashboard';

export type ProductCategory = 
  | 'all'
  | 'electronics_audio'
  | 'smart_lighting'
  | 'fashion_watches'
  | 'furniture_living'
  | 'kitchen_tableware'
  | 'lifestyle_gadgets';

export interface TrackingCheckpoint {
  id: string;
  step: 'ordered' | 'processing' | 'shipped' | 'out_for_delivery' | 'delivered';
  title: string;
  location: string;
  timestamp: string;
  completed: boolean;
  active?: boolean;
  note?: string;
}

export interface CategoryMeta {
  id: ProductCategory;
  name: string;
  shortName: string;
  icon: string;
  bannerImage: string;
  subcategories: string[];
}

export interface ProductVariantColor {
  name: string;
  hex: string;
  label: string;
  image?: string;
}

export interface ProductVariantSpec {
  name: string;
  label: string;
  surchargeBDT?: number;
}

export interface ProductReview {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  userImage?: string;
  helpfulCount?: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  category: ProductCategory;
  subcategory: string;
  priceBDT: number;
  originalPriceBDT: number;
  discountPercent: number;
  rating: number;
  reviewsCount: number;
  ordersCount: number;
  inStock: boolean;
  stockCount: number;
  badge?: 'Choice' | 'SuperDeal' | 'TopBrand' | 'FlashSale' | 'BestSeller' | 'BestDiscount' | 'Featured';
  isChoice: boolean;
  freeShipping: boolean;
  estimatedDeliveryDays: number;
  images: string[];
  imageUrl: string;
  secondaryImageUrl?: string;
  description: string;
  keyFeatures: string[];
  specifications: Record<string, string>;
  colors: ProductVariantColor[];
  specsVariants?: ProductVariantSpec[];
  origin: string;
  warranty: string;
  seller: {
    name: string;
    rating: number;
    followers: string;
    positiveFeedbackRate: string;
  };
  reviews: ProductReview[];
  isFlashSale?: boolean;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isBestDiscount?: boolean;
  bestSellerRank?: number;
  claimedPercent?: number;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  selectedColor: ProductVariantColor;
  selectedSpec?: ProductVariantSpec;
  quantity: number;
  unitPriceBDT: number;
  selected: boolean;
}

export interface Cart {
  items: CartItem[];
  subtotalBDT: number;
  discountBDT: number;
  shippingBDT: number;
  totalBDT: number;
  appliedPromo?: {
    code: string;
    discountBDT: number;
    description: string;
  };
}

export interface CustomerShippingInfo {
  fullName: string;
  phone: string;
  division: string;
  city: string;
  area: string;
  address: string;
  postalCode: string;
  paymentMethod: 'bkash' | 'nagad' | 'card' | 'cod';
  cardDetails?: {
    cardNumber: string;
    expiry: string;
    cvv: string;
  };
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  items: CartItem[];
  customer: CustomerShippingInfo;
  subtotalBDT: number;
  discountBDT: number;
  shippingBDT: number;
  totalBDT: number;
  status: 'confirmed' | 'processing' | 'shipped' | 'delivered';
  trackingNumber: string;
  estimatedDeliveryDate: string;
  courier?: string;
  currentStep?: 'ordered' | 'processing' | 'shipped' | 'out_for_delivery' | 'delivered';
  timeline?: TrackingCheckpoint[];
}

export interface ProductFilterState {
  category: ProductCategory;
  subcategory?: string;
  searchQuery: string;
  sortBy: 'featured' | 'orders-desc' | 'price-asc' | 'price-desc' | 'rating-desc';
  minPriceBDT: number;
  maxPriceBDT: number;
  inStockOnly: boolean;
  choiceOnly: boolean;
  freeShippingOnly: boolean;
}

export interface BrowsingHistoryItem {
  productId: string;
  category: ProductCategory;
  subcategory: string;
  priceBDT: number;
  timestamp: number;
  viewCount: number;
}

export type RecommendationSignal =
  | 'category_affinity'
  | 'subcategory_match'
  | 'price_proximity'
  | 'similar_item'
  | 'wishlist_synergy'
  | 'trending_popular';

export interface RecommendationReason {
  signal: RecommendationSignal;
  title: string;
  badgeLabel: string;
  description: string;
  scoreBonus: number;
}

export interface ScoredRecommendation {
  product: Product;
  score: number;
  matchPercentage: number;
  reasons: RecommendationReason[];
  primaryReason: string;
  badgeText: string;
  basedOnProduct?: Product;
}

export interface PurchaseActivityEvent {
  id: string;
  customerName: string;
  location: string;
  productId: string;
  productName: string;
  productImage: string;
  priceBDT: number;
  timeAgo: string;
  timestamp: number;
  paymentMethod: 'bKash' | 'Nagad' | 'COD' | 'Card';
  variantLabel?: string;
  stockRemaining?: number;
  viewersCount?: number;
}

export interface PriceDropAlert {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  category: ProductCategory;
  originalPriceBDT: number;
  currentPriceBDT: number;
  targetPriceBDT: number;
  contactMethod: 'sms' | 'email' | 'in_app';
  contactValue: string;
  createdAt: number;
  status: 'active' | 'triggered';
  triggeredPriceBDT?: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: number;
  suggestedActions?: string[];
  recommendedProducts?: Product[];
  orderInfo?: {
    orderNumber: string;
    trackingNumber: string;
    status: string;
    step: string;
    courier: string;
    estimatedDelivery: string;
    itemsCount: number;
    totalBDT: number;
  };
  couponCode?: string;
}


