import { ChatMessage, Product } from '../types';
import { PRODUCTS_CATALOG } from '../data/products';

interface AIResponseResult {
  text: string;
  suggestedActions?: string[];
  recommendedProducts?: Product[];
  orderInfo?: ChatMessage['orderInfo'];
  couponCode?: string;
}

export function generateMockAIResponse(userInput: string): AIResponseResult {
  const query = userInput.toLowerCase().trim();

  // 1. ORDER TRACKING & LOGISTICS
  if (
    query.includes('track') ||
    query.includes('order') ||
    query.includes('shipping') ||
    query.includes('delivery status') ||
    query.includes('where is my parcel') ||
    query.includes('nx-bd') ||
    query.includes('sa-bd') ||
    query.includes('rx-bd')
  ) {
    return {
      text: "I checked our central Steadfast & RedX courier logistics manifest! Here is your active priority shipment currently in transit in Dhaka:",
      orderInfo: {
        orderNumber: 'NX-BD-89211',
        trackingNumber: 'SA-BD-902418',
        status: 'In Transit — Out for Delivery',
        step: 'Rider Assigned (Habibur Rahman, Steadfast Hub)',
        courier: 'Steadfast Priority Courier',
        estimatedDelivery: 'Today by 6:30 PM',
        itemsCount: 2,
        totalBDT: 6950,
      },
      suggestedActions: [
        'Open Full Tracking Timeline',
        'Contact Steadfast Courier',
        'View Order Invoices',
      ],
    };
  }

  // 2. HEADPHONES & AUDIO RECOMMENDATIONS
  if (
    query.includes('headphone') ||
    query.includes('headset') ||
    query.includes('earphone') ||
    query.includes('audio') ||
    query.includes('sound') ||
    query.includes('speaker')
  ) {
    const audioProducts = PRODUCTS_CATALOG.filter((p) => p.category === 'electronics_audio').slice(0, 3);
    return {
      text: "Here are our highest-rated audio goods in Bangladesh, tested for acoustic accuracy and backed by official warranty:",
      recommendedProducts: audioProducts,
      suggestedActions: [
        'Under ৳5,000 Audio Deals',
        'Compare these models',
        'Check Free Delivery',
      ],
    };
  }

  // 3. WATCHES & HOROLOGY RECOMMENDATIONS
  if (
    query.includes('watch') ||
    query.includes('smartwatch') ||
    query.includes('timepiece') ||
    query.includes('chronograph')
  ) {
    const watchProducts = PRODUCTS_CATALOG.filter((p) => p.category === 'fashion_watches').slice(0, 3);
    return {
      text: "Take a look at our curated titanium mechanical and AMOLED tactical timepieces:",
      recommendedProducts: watchProducts,
      suggestedActions: [
        'Automatic Mechanicals',
        'Smartwatches with Heart Monitor',
        'Compare Watches',
      ],
    };
  }

  // 4. LIGHTING & SMART HOME
  if (
    query.includes('light') ||
    query.includes('lamp') ||
    query.includes('ambient') ||
    query.includes('decor')
  ) {
    const lightProducts = PRODUCTS_CATALOG.filter((p) => p.category === 'smart_lighting').slice(0, 3);
    return {
      text: "Here are our architectural and smart ambiance lights popular across modern Dhaka apartments:",
      recommendedProducts: lightProducts,
      suggestedActions: [
        'Table Lamps',
        'RGB Ambient Lighting',
        'Set Price Drop Alert',
      ],
    };
  }

  // 5. FURNITURE & LIVING
  if (query.includes('furniture') || query.includes('chair') || query.includes('table') || query.includes('living')) {
    const furnitureProducts = PRODUCTS_CATALOG.filter((p) => p.category === 'furniture_living').slice(0, 3);
    return {
      text: "Explore these hand-finished architectural furniture pieces crafted from premium natural woods and bouclé:",
      recommendedProducts: furnitureProducts,
      suggestedActions: ['Lounge Chairs', 'Coffee Tables', 'Free Nationwide Delivery'],
    };
  }

  // 6. PROMO CODES & DISCOUNTS
  if (
    query.includes('coupon') ||
    query.includes('discount') ||
    query.includes('promo') ||
    query.includes('voucher') ||
    query.includes('code') ||
    query.includes('offer')
  ) {
    return {
      text: "Great news! We have 2 verified promotional codes active today for customers in Bangladesh:\n\n• **ALIBD500**: ৳500 OFF on orders over ৳3,000\n• **CHOICE10**: 10% Extra Discount on all Choice-certified products\n\nYou can apply either voucher right on the Checkout page!",
      couponCode: 'ALIBD500',
      suggestedActions: ['Copy ALIBD500', 'Copy CHOICE10', 'Browse Choice Deals'],
    };
  }

  // 7. PAYMENT METHODS (bKash, Nagad, COD)
  if (
    query.includes('bkash') ||
    query.includes('nagad') ||
    query.includes('payment') ||
    query.includes('cod') ||
    query.includes('cash on delivery') ||
    query.includes('pay')
  ) {
    return {
      text: "We support the most reliable payment options in Bangladesh:\n\n1. **Cash on Delivery (COD)** — 0 advance payment needed; pay when parcel reaches your doorstep.\n2. **bKash Merchant Payment** — Fast & automated verification with 0% gateway fees.\n3. **Nagad Mobile Wallet** — Instant mobile checkout.\n4. **Visa / Mastercard / Amex** — Secured by 3D-Secure 256-bit bank encryption.",
      suggestedActions: ['How does COD work?', 'Available Coupons', 'Track my order'],
    };
  }

  // 8. DELIVERY TIMELINES & FEES
  if (
    query.includes('delivery time') ||
    query.includes('shipping fee') ||
    query.includes('how long') ||
    query.includes('courier') ||
    query.includes('steadfast') ||
    query.includes('redx')
  ) {
    return {
      text: "Our delivery network covers all 64 districts in Bangladesh:\n\n• **Inside Dhaka:** 24 to 48 Hours (Standard fee: ৳60)\n• **Outside Dhaka:** 48 to 72 Hours (Standard fee: ৳120)\n• **Free Shipping:** Applicable automatically on all Choice orders over ৳2,500!\n\nAll parcels are insured and delivered via Steadfast Courier or RedX Express.",
      suggestedActions: ['Track my order', 'Check Free Delivery Items', 'Payment Methods'],
    };
  }

  // 9. RETURNS & WARRANTY
  if (
    query.includes('return') ||
    query.includes('refund') ||
    query.includes('warranty') ||
    query.includes('broken') ||
    query.includes('damage')
  ) {
    return {
      text: "Nexus Bazaar guarantees 100% buyer protection:\n\n• **7-Day Return Window:** If an item arrives damaged or differs from description, request a free return pickup from your doorstep.\n• **Official Warranty:** All electronics and horology items come with 12 to 24 months official replacement warranty.\n• **Doorstep Check:** You are encouraged to inspect parcel seals upon courier delivery.",
      suggestedActions: ['Contact Support Agent', 'Track my order', 'View Account'],
    };
  }

  // 10. PRODUCT COMPARISON & PRICE ALERTS
  if (query.includes('compare') || query.includes('comparison')) {
    return {
      text: "You can compare up to 4 products side-by-side! Click the **Compare** button on any product card or PDP to inspect technical specs, prices in BDT, seller ratings, and key differences in a unified matrix.",
      suggestedActions: ['View Electronics', 'View Watches', 'Recommend best products'],
    };
  }

  if (query.includes('price drop') || query.includes('alert')) {
    return {
      text: "You can set up instant **Price Drop Alerts** on any product! Look for the **🔔 Price Drop Alert** button on any product page. Enter your desired price target and we'll alert you the moment the item goes on discount.",
      suggestedActions: ['Best Discount Products', 'Check Flash Sales', 'Active Coupons'],
    };
  }

  // DEFAULT HELPFUL FALLBACK
  const topChoice = PRODUCTS_CATALOG.slice(0, 2);
  return {
    text: "I can assist you with tracking orders, discovering products, checking bKash payment steps, or applying coupons! What would you like help with?",
    recommendedProducts: topChoice,
    suggestedActions: [
      '📦 Track my order',
      '🎟️ Active coupon codes',
      '💳 bKash & Cash on Delivery',
      '🎧 Best audio & electronics',
    ],
  };
}
