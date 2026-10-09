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
  | 'wishlist';

export type ProductCategory = 
  | 'all'
  | 'electronics_audio'
  | 'smart_lighting'
  | 'fashion_watches'
  | 'furniture_living'
  | 'kitchen_tableware'
  | 'lifestyle_gadgets';

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
  badge?: 'Choice' | 'SuperDeal' | 'TopBrand' | 'FlashSale';
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
