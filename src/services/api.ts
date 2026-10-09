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
      
      const trackingNum = `SA-BD-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      const now = new Date();
      const newOrder: Order = {
        id: `ord_${Date.now()}`,
        orderNumber,
        createdAt: now.toISOString(),
        items: orderPayload.items,
        customer: orderPayload.customer,
        subtotalBDT: orderPayload.cart.subtotalBDT,
        discountBDT: orderPayload.cart.discountBDT,
        shippingBDT: orderPayload.cart.shippingBDT,
        totalBDT: orderPayload.cart.totalBDT,
        status: 'processing',
        currentStep: 'processing',
        courier: 'Steadfast Courier / RedX Express Bangladesh',
        trackingNumber: trackingNum,
        estimatedDeliveryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'short',
          day: 'numeric',
        }),
        timeline: [
          {
            id: 'chk_1',
            step: 'ordered',
            title: 'Order Placed & Verified',
            location: `${orderPayload.customer.city || 'Dhaka'}, Bangladesh`,
            timestamp: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', Today',
            completed: true,
            note: `Payment verified via ${orderPayload.customer.paymentMethod.toUpperCase()}`,
          },
          {
            id: 'chk_2',
            step: 'processing',
            title: 'Packed at Central Fulfillment Hub',
            location: 'Tejgaon Industrial Area, Dhaka-1208',
            timestamp: 'Just now',
            completed: true,
            active: true,
            note: 'Quality inspection passed. Barcode generated.',
          },
          {
            id: 'chk_3',
            step: 'shipped',
            title: 'Dispatched with Courier Partner',
            location: 'Dhaka Sorting Center',
            timestamp: 'Expected Tomorrow, 09:30 AM',
            completed: false,
            note: 'Assigned to Steadfast Express priority line.',
          },
          {
            id: 'chk_4',
            step: 'out_for_delivery',
            title: 'Out for Delivery to Customer',
            location: `${orderPayload.customer.area || orderPayload.customer.city}, Bangladesh`,
            timestamp: 'Pending dispatch',
            completed: false,
            note: 'Rider will call contact number before doorstep drop.',
          },
          {
            id: 'chk_5',
            step: 'delivered',
            title: 'Package Handed Over',
            location: orderPayload.customer.address,
            timestamp: 'Estimated ' + new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            completed: false,
            note: 'Signature / OTP verification required upon receipt.',
          },
        ],
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
        const data = localStorage.getItem(STORAGE_ORDERS_KEY);
        if (data) {
          const parsed = JSON.parse(data);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed;
          }
        }
      } catch {
        // Fall back to seed orders
      }

      // Default high-fidelity seeded orders for a rich out-of-the-box dashboard experience
      const seedOrders: Order[] = [
        {
          id: 'ord_demo_01',
          orderNumber: 'BD-2026-894210',
          createdAt: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
          status: 'shipped',
          currentStep: 'out_for_delivery',
          courier: 'Steadfast Courier Bangladesh',
          trackingNumber: 'SA-BD-927481',
          estimatedDeliveryDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'short',
            day: 'numeric',
          }),
          customer: {
            fullName: 'Tanvir Ahmed',
            phone: '+880 1712-345678',
            division: 'dhaka',
            city: 'Dhaka',
            area: 'Gulshan-2',
            address: 'House 42, Road 11, Block D',
            postalCode: '1212',
            paymentMethod: 'bkash',
          },
          items: [
            {
              id: 'cart_item_s1',
              productId: 'elec_01',
              product: PRODUCTS_CATALOG[0],
              selectedColor: PRODUCTS_CATALOG[0].colors[0],
              quantity: 1,
              unitPriceBDT: PRODUCTS_CATALOG[0].priceBDT,
              selected: true,
            },
            {
              id: 'cart_item_s2',
              productId: 'light_01',
              product: PRODUCTS_CATALOG[5],
              selectedColor: PRODUCTS_CATALOG[5].colors[0],
              quantity: 1,
              unitPriceBDT: PRODUCTS_CATALOG[5].priceBDT,
              selected: true,
            },
          ],
          subtotalBDT: PRODUCTS_CATALOG[0].priceBDT + PRODUCTS_CATALOG[5].priceBDT,
          discountBDT: 500,
          shippingBDT: 0,
          totalBDT: PRODUCTS_CATALOG[0].priceBDT + PRODUCTS_CATALOG[5].priceBDT - 500,
          timeline: [
            {
              id: 'chk_101',
              step: 'ordered',
              title: 'Order Confirmed & Payment Verified',
              location: 'Dhaka, Bangladesh',
              timestamp: 'Yesterday, 04:15 PM',
              completed: true,
              note: 'bKash Transaction ID: 9HJ87X21MN verified automatically.',
            },
            {
              id: 'chk_102',
              step: 'processing',
              title: 'Packed & Barcode Scanned',
              location: 'Tejgaon Central Fulfillment Hub, Dhaka',
              timestamp: 'Yesterday, 07:30 PM',
              completed: true,
              note: 'Parcel inspected with double bubble wrap & fragile seal.',
            },
            {
              id: 'chk_103',
              step: 'shipped',
              title: 'Handed Over to Steadfast Courier',
              location: 'Dhaka North Regional Hub',
              timestamp: 'Today, 06:45 AM',
              completed: true,
              note: 'Transit manifest SA-BD-927481 created.',
            },
            {
              id: 'chk_104',
              step: 'out_for_delivery',
              title: 'Out for Delivery with Rider',
              location: 'Gulshan & Banani Delivery Hub',
              timestamp: 'Today, 10:15 AM',
              completed: true,
              active: true,
              note: 'Courier Rider (Rashedul Hasan, +880 1823-998877) has your package on van.',
            },
            {
              id: 'chk_105',
              step: 'delivered',
              title: 'Delivered to Customer Doorstep',
              location: 'House 42, Road 11, Block D, Gulshan-2',
              timestamp: 'Expected Today by 05:00 PM',
              completed: false,
              note: 'Recipient will provide OTP verification upon delivery.',
            },
          ],
        },
        {
          id: 'ord_demo_02',
          orderNumber: 'BD-2026-641935',
          createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'delivered',
          currentStep: 'delivered',
          courier: 'RedX Express Logistics',
          trackingNumber: 'RX-BD-551029',
          estimatedDeliveryDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'short',
            day: 'numeric',
          }),
          customer: {
            fullName: 'Tanvir Ahmed',
            phone: '+880 1712-345678',
            division: 'dhaka',
            city: 'Dhaka',
            area: 'Dhanmondi',
            address: 'Flat 4B, Concord Tower, Road 27',
            postalCode: '1209',
            paymentMethod: 'cod',
          },
          items: [
            {
              id: 'cart_item_s3',
              productId: 'watch_01',
              product: PRODUCTS_CATALOG[10],
              selectedColor: PRODUCTS_CATALOG[10].colors[0],
              quantity: 1,
              unitPriceBDT: PRODUCTS_CATALOG[10].priceBDT,
              selected: true,
            },
          ],
          subtotalBDT: PRODUCTS_CATALOG[10].priceBDT,
          discountBDT: 0,
          shippingBDT: 0,
          totalBDT: PRODUCTS_CATALOG[10].priceBDT,
          timeline: [
            {
              id: 'chk_201',
              step: 'ordered',
              title: 'Order Placed (Cash on Delivery)',
              location: 'Dhaka, Bangladesh',
              timestamp: '5 days ago, 11:20 AM',
              completed: true,
              note: 'Verified via customer phone confirmation.',
            },
            {
              id: 'chk_202',
              step: 'processing',
              title: 'Packed & Quality Certified',
              location: 'Tejgaon Central Hub',
              timestamp: '5 days ago, 03:00 PM',
              completed: true,
              note: 'Original watch warranty and serial number registered.',
            },
            {
              id: 'chk_203',
              step: 'shipped',
              title: 'Dispatched to Dhanmondi Distribution Station',
              location: 'Dhanmondi Station #4',
              timestamp: '4 days ago, 08:30 AM',
              completed: true,
              note: 'In transit via express van.',
            },
            {
              id: 'chk_204',
              step: 'out_for_delivery',
              title: 'Rider Out for Delivery',
              location: 'Dhanmondi 27 Area',
              timestamp: '3 days ago, 11:00 AM',
              completed: true,
              note: 'Rider contact established with recipient.',
            },
            {
              id: 'chk_205',
              step: 'delivered',
              title: 'Successfully Delivered & Cash Collected',
              location: 'Flat 4B, Concord Tower, Road 27',
              timestamp: '3 days ago, 02:40 PM',
              completed: true,
              note: 'Payment of ৳18,500 collected in cash. Received by customer Tanvir Ahmed.',
            },
          ],
        },
      ];

      try {
        localStorage.setItem(STORAGE_ORDERS_KEY, JSON.stringify(seedOrders));
      } catch {
        // Ignore
      }

      return seedOrders;
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
