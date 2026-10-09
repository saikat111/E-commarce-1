/**
 * Atelier Nord - API Service & Repository Layer
 * 
 * Future-Ready Architecture:
 * In Phase 1, this repository handles client-side state simulation with promise-based async signatures.
 * In Phase 2 (Backend Integration), each method connects directly to:
 * - Next.js Route Handlers (`/api/products`, `/api/orders`, `/api/cart`)
 * - Next.js Server Actions (`export async function createOrderAction(data)`)
 * - Headless Commerce Engine (Medusa.js, Shopify Storefront API, Supabase, or Stripe)
 */

import { Cart, CartItem, CustomerShippingInfo, Order, Product, ProductCategory, ProductFilterState } from '../types';
import { PRODUCTS_CATALOG } from '../data/products';

// Simulated database storage in localStorage for order history & persistence
const STORAGE_ORDERS_KEY = 'atelier_nord_orders';

export const api = {
  products: {
    /**
     * Fetch all products with filtering, searching, and sorting
     */
    async getAll(filters?: Partial<ProductFilterState>): Promise<{ products: Product[]; total: number }> {
      // Emulate brief asynchronous microtask to match Next.js fetch behavior
      await new Promise((resolve) => setTimeout(resolve, 80));

      let results = [...PRODUCTS_CATALOG];

      if (filters?.category && filters.category !== 'all') {
        results = results.filter((p) => p.category === filters.category);
      }

      if (filters?.searchQuery && filters.searchQuery.trim().length > 0) {
        const query = filters.searchQuery.toLowerCase().trim();
        results = results.filter(
          (p) =>
            p.name.toLowerCase().includes(query) ||
            p.subtitle.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query) ||
            p.category.toLowerCase().includes(query) ||
            p.materials.some((m) => m.toLowerCase().includes(query))
        );
      }

      if (filters?.maxPrice) {
        results = results.filter((p) => p.price <= filters.maxPrice!);
      }

      if (filters?.inStockOnly) {
        results = results.filter((p) => p.inStock);
      }

      if (filters?.sortBy) {
        switch (filters.sortBy) {
          case 'price-asc':
            results.sort((a, b) => a.price - b.price);
            break;
          case 'price-desc':
            results.sort((a, b) => b.price - a.price);
            break;
          case 'rating':
            results.sort((a, b) => b.rating - a.rating);
            break;
          case 'newest':
            results.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
            break;
          case 'featured':
          default:
            results.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
            break;
        }
      }

      return { products: results, total: results.length };
    },

    /**
     * Fetch single product by id or slug
     */
    async getById(id: string): Promise<Product | null> {
      await new Promise((resolve) => setTimeout(resolve, 40));
      return PRODUCTS_CATALOG.find((p) => p.id === id) || null;
    },

    async getBySlug(slug: string): Promise<Product | null> {
      await new Promise((resolve) => setTimeout(resolve, 40));
      return PRODUCTS_CATALOG.find((p) => p.slug === slug) || null;
    },

    /**
     * Fetch related products within same or complementary categories
     */
    async getRelated(productId: string, limit = 3): Promise<Product[]> {
      const current = PRODUCTS_CATALOG.find((p) => p.id === productId);
      if (!current) return PRODUCTS_CATALOG.slice(0, limit);

      const related = PRODUCTS_CATALOG.filter(
        (p) => p.id !== productId && (p.category === current.category || p.isBestseller)
      );

      return related.slice(0, limit);
    },
  },

  orders: {
    /**
     * Create and record a verified order
     */
    async create(orderPayload: {
      customer: CustomerShippingInfo;
      items: CartItem[];
      cart: Cart;
    }): Promise<Order> {
      await new Promise((resolve) => setTimeout(resolve, 300));

      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      const orderNumber = `NOR-${new Date().getFullYear()}-${randomSuffix}`;
      
      const newOrder: Order = {
        id: `ord_${Date.now()}`,
        orderNumber,
        createdAt: new Date().toISOString(),
        items: orderPayload.items,
        customer: orderPayload.customer,
        subtotal: orderPayload.cart.subtotal,
        discount: orderPayload.cart.discount,
        shipping: orderPayload.cart.shipping,
        total: orderPayload.cart.total,
        status: 'confirmed',
        trackingNumber: `TRACK-EU-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
        estimatedDeliveryDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'short',
          day: 'numeric',
        }),
      };

      try {
        const existing = JSON.parse(localStorage.getItem(STORAGE_ORDERS_KEY) || '[]');
        existing.unshift(newOrder);
        localStorage.setItem(STORAGE_ORDERS_KEY, JSON.stringify(existing));
      } catch (e) {
        console.warn('LocalStorage error saving order:', e);
      }

      return newOrder;
    },

    async getOrders(): Promise<Order[]> {
      try {
        return JSON.parse(localStorage.getItem(STORAGE_ORDERS_KEY) || '[]');
      } catch {
        return [];
      }
    },
  },

  promos: {
    /**
     * Validate promotional discount codes
     */
    async validateCode(code: string): Promise<{
      valid: boolean;
      discountPercent?: number;
      description?: string;
      message: string;
    }> {
      await new Promise((resolve) => setTimeout(resolve, 150));
      const clean = code.toUpperCase().trim();

      if (clean === 'WELCOME10') {
        return {
          valid: true,
          discountPercent: 10,
          description: '10% New Collector Courtesy Discount',
          message: 'Code applied! 10% off your entire order.',
        };
      }

      if (clean === 'ARCHITECT15') {
        return {
          valid: true,
          discountPercent: 15,
          description: '15% Studio & Trade Courtesy Discount',
          message: 'Code applied! 15% off trade order.',
        };
      }

      return {
        valid: false,
        message: 'Invalid code. Try WELCOME10 or ARCHITECT15',
      };
    },
  },

  newsletter: {
    async subscribe(email: string): Promise<{ success: boolean; message: string }> {
      await new Promise((resolve) => setTimeout(resolve, 200));
      return {
        success: true,
        message: `Thank you for subscribing (${email}). You will receive our seasonal monographs.`,
      };
    },
  },
};
