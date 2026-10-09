/**
 * Marketplace API Service & Repository Layer
 * Supports BDT Currency & Multi-Page Storefront Operations
 */

import { Cart, CartItem, CustomerShippingInfo, Order, Product, ProductCategory, ProductFilterState } from '../types';
import { PRODUCTS_CATALOG } from '../data/products';

const STORAGE_ORDERS_KEY = 'nexus_marketplace_orders';

export const api = {
  products: {
    /**
     * Fetch products with multi-facet filters, BDT price ranges, subcategories, and sorting
     */
    async getAll(filters?: Partial<ProductFilterState>): Promise<{ products: Product[]; total: number }> {
      await new Promise((resolve) => setTimeout(resolve, 60));

      let results = [...PRODUCTS_CATALOG];

      if (filters?.category && filters.category !== 'all') {
        results = results.filter((p) => p.category === filters.category);
      }

      if (filters?.subcategory && filters.subcategory !== 'all') {
        results = results.filter((p) => p.subcategory.toLowerCase() === filters.subcategory!.toLowerCase());
      }

      if (filters?.searchQuery && filters.searchQuery.trim().length > 0) {
        const query = filters.searchQuery.toLowerCase().trim();
        results = results.filter(
          (p) =>
            p.name.toLowerCase().includes(query) ||
            p.subtitle.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query) ||
            p.subcategory.toLowerCase().includes(query) ||
            p.category.toLowerCase().includes(query) ||
            p.keyFeatures.some((f) => f.toLowerCase().includes(query))
        );
      }

      if (filters?.minPriceBDT !== undefined) {
        results = results.filter((p) => p.priceBDT >= filters.minPriceBDT!);
      }

      if (filters?.maxPriceBDT !== undefined && filters.maxPriceBDT > 0) {
        results = results.filter((p) => p.priceBDT <= filters.maxPriceBDT!);
      }

      if (filters?.inStockOnly) {
        results = results.filter((p) => p.inStock);
      }

      if (filters?.choiceOnly) {
        results = results.filter((p) => p.isChoice);
      }

      if (filters?.freeShippingOnly) {
        results = results.filter((p) => p.freeShipping);
      }

      if (filters?.sortBy) {
        switch (filters.sortBy) {
          case 'orders-desc':
            results.sort((a, b) => b.ordersCount - a.ordersCount);
            break;
          case 'price-asc':
            results.sort((a, b) => a.priceBDT - b.priceBDT);
            break;
          case 'price-desc':
            results.sort((a, b) => b.priceBDT - a.priceBDT);
            break;
          case 'rating-desc':
            results.sort((a, b) => b.rating - a.rating);
            break;
          case 'featured':
          default:
            results.sort((a, b) => (b.badge ? 1 : 0) - (a.badge ? 1 : 0));
            break;
        }
      }

      return { products: results, total: results.length };
    },

    /**
     * Fetch single product by id
     */
    async getById(id: string): Promise<Product | null> {
      await new Promise((resolve) => setTimeout(resolve, 30));
      return PRODUCTS_CATALOG.find((p) => p.id === id) || null;
    },

    async getBySlug(slug: string): Promise<Product | null> {
      await new Promise((resolve) => setTimeout(resolve, 30));
      return PRODUCTS_CATALOG.find((p) => p.slug === slug) || null;
    },

    /**
     * Fetch related products for the PDP page (same category + complementary items)
     */
    async getRelated(productId: string, limit = 4): Promise<Product[]> {
      const current = PRODUCTS_CATALOG.find((p) => p.id === productId);
      if (!current) return PRODUCTS_CATALOG.slice(0, limit);

      const related = PRODUCTS_CATALOG.filter(
        (p) => p.id !== productId && (p.category === current.category || p.subcategory === current.subcategory)
      );

      if (related.length < limit) {
        const others = PRODUCTS_CATALOG.filter((p) => p.id !== productId && !related.includes(p));
        return [...related, ...others].slice(0, limit);
      }

      return related.slice(0, limit);
    },

    /**
     * Fetch SuperDeals / Flash Sale items
     */
    async getSuperDeals(limit = 6): Promise<Product[]> {
      return PRODUCTS_CATALOG.filter((p) => p.discountPercent >= 33 || p.badge === 'SuperDeal').slice(0, limit);
    },

    /**
     * Fetch AliExpress Choice items
     */
    async getChoicePicks(limit = 8): Promise<Product[]> {
      return PRODUCTS_CATALOG.filter((p) => p.isChoice).slice(0, limit);
    },
  },

  orders: {
    async create(orderPayload: {
      customer: CustomerShippingInfo;
      items: CartItem[];
      cart: Cart;
    }): Promise<Order> {
      await new Promise((resolve) => setTimeout(resolve, 300));

      const randomSuffix = Math.floor(100000 + Math.random() * 900000);
      const orderNumber = `BD-${new Date().getFullYear()}-${randomSuffix}`;
      
      const newOrder: Order = {
        id: `ord_${Date.now()}`,
        orderNumber,
        createdAt: new Date().toISOString(),
        items: orderPayload.items,
        customer: orderPayload.customer,
        subtotalBDT: orderPayload.cart.subtotalBDT,
        discountBDT: orderPayload.cart.discountBDT,
        shippingBDT: orderPayload.cart.shippingBDT,
        totalBDT: orderPayload.cart.totalBDT,
        status: 'confirmed',
        trackingNumber: `SA-BD-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
        estimatedDeliveryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
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
    async validateCode(code: string, subtotalBDT: number): Promise<{
      valid: boolean;
      discountBDT?: number;
      description?: string;
      message: string;
    }> {
      await new Promise((resolve) => setTimeout(resolve, 100));
      const clean = code.toUpperCase().trim();

      if (clean === 'ALIBD500') {
        const discount = Math.min(500, Math.round(subtotalBDT * 0.2));
        return {
          valid: true,
          discountBDT: discount,
          description: '৳500 OFF Special Welcome Voucher',
          message: 'Code ALIBD500 applied! ৳500 discount added.',
        };
      }

      if (clean === 'CHOICE10') {
        const discount = Math.round(subtotalBDT * 0.1);
        return {
          valid: true,
          discountBDT: discount,
          description: '10% Extra Choice Discount',
          message: 'Code CHOICE10 applied! 10% off your entire order.',
        };
      }

      return {
        valid: false,
        message: 'Invalid code. Try ALIBD500 or CHOICE10',
      };
    },
  },

  newsletter: {
    async subscribe(email: string): Promise<{ success: boolean; message: string }> {
      await new Promise((resolve) => setTimeout(resolve, 200));
      return {
        success: true,
        message: `Subscribed ${email} for exclusive Bangladesh flash deals and coupons.`,
      };
    },
  },
};
