/**
 * Atelier Nord - Domain Types & Interfaces
 * Designed for Next.js and Full-Stack Backend Integration
 */

export type ProductCategory = 
  | 'all'
  | 'lighting'
  | 'objects'
  | 'furniture'
  | 'tableware'
  | 'acoustics'
  | 'horology';

export interface ProductVariantColor {
  name: string;
  hex: string;
  label: string;
}

export interface ProductVariantMaterial {
  name: string;
  finish: string;
  surcharge?: number;
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
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  category: ProductCategory;
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviewsCount: number;
  isNew?: boolean;
  isBestseller?: boolean;
  inStock: boolean;
  stockCount: number;
  badge?: string;
  description: string;
  story: string;
  dimensions: {
    height: string;
    width: string;
    depth?: string;
    weight: string;
  };
  materials: string[];
  colors: ProductVariantColor[];
  materialsVariants?: ProductVariantMaterial[];
  leadTime: string;
  origin: string;
  careInstructions: string;
  reviews: ProductReview[];
  visualId: 'sculptural_lamp' | 'acoustic_speaker' | 'ceramic_carafe' | 'chronograph_watch' | 'lounge_chair' | 'marble_altar' | 'pendulum_clock' | 'linen_throw';
}

export interface CartItem {
  id: string; // unique item instance id
  productId: string;
  product: Product;
  selectedColor: ProductVariantColor;
  selectedMaterial?: ProductVariantMaterial;
  quantity: number;
  price: number;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  appliedPromo?: {
    code: string;
    discountPercent: number;
    description: string;
  };
}

export interface CustomerShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  shippingSpeed: 'standard' | 'express';
  paymentMethod: 'card' | 'cod' | 'apple_pay';
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
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  status: 'confirmed' | 'processing' | 'shipped' | 'delivered';
  trackingNumber: string;
  estimatedDeliveryDate: string;
}

export interface ProductFilterState {
  category: ProductCategory;
  searchQuery: string;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
  maxPrice: number;
  inStockOnly: boolean;
}
