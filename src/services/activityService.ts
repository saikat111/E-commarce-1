import { PurchaseActivityEvent, Product } from '../types';
import { PRODUCTS_CATALOG } from '../data/products';

const MUTE_STORAGE_KEY = 'nexus_activity_toast_muted';

interface CustomerBuyerProfile {
  name: string;
  location: string;
  paymentMethod: 'bKash' | 'Nagad' | 'COD' | 'Card';
}

const BUYER_PROFILES: CustomerBuyerProfile[] = [
  { name: 'Tanvir H.', location: 'Dhanmondi, Dhaka', paymentMethod: 'bKash' },
  { name: 'Nusrat J.', location: 'Gulshan-2, Dhaka', paymentMethod: 'Card' },
  { name: 'Shafiqul R.', location: 'Panchlaish, Chittagong', paymentMethod: 'COD' },
  { name: 'Farhana K.', location: 'Uttara Sector 4, Dhaka', paymentMethod: 'bKash' },
  { name: 'Arif M.', location: 'Zindabazar, Sylhet', paymentMethod: 'Nagad' },
  { name: 'Sultana B.', location: 'Banani, Dhaka', paymentMethod: 'bKash' },
  { name: 'Riyad A.', location: 'Mirpur DOHS, Dhaka', paymentMethod: 'COD' },
  { name: 'Sadia A.', location: 'KDA Avenue, Khulna', paymentMethod: 'Nagad' },
  { name: 'Mahmudul K.', location: 'Shaheb Bazar, Rajshahi', paymentMethod: 'COD' },
  { name: 'Tasnim E.', location: 'Bashundhara R/A, Dhaka', paymentMethod: 'bKash' },
  { name: 'Nafis R.', location: 'Chashara, Narayanganj', paymentMethod: 'Nagad' },
  { name: 'Zubair A.', location: 'Sholoshohor, Chittagong', paymentMethod: 'Card' },
  { name: 'Ayesha T.', location: 'Mohakhali DOHS, Dhaka', paymentMethod: 'bKash' },
  { name: 'Rezaul K.', location: 'Bogra Sadar, Bogra', paymentMethod: 'COD' },
];

/**
 * Generate a pool of realistic recent purchases based on real catalog items
 */
export function generateRecentActivities(): PurchaseActivityEvent[] {
  const selectedProducts = PRODUCTS_CATALOG.slice(0, 16);
  const now = Date.now();

  return selectedProducts.map((product, index) => {
    const buyer = BUYER_PROFILES[index % BUYER_PROFILES.length];
    // Dynamic staggered minute intervals
    const minutesAgo = index === 0 ? 1 : Math.min(58, index * 3 + Math.floor(Math.random() * 2));
    const timestamp = now - minutesAgo * 60 * 1000;
    
    const timeAgo = minutesAgo <= 1 
      ? 'Just now' 
      : `${minutesAgo} mins ago`;

    const variantLabel = product.colors && product.colors.length > 0 
      ? product.colors[index % product.colors.length].label 
      : product.specsVariants?.[0]?.label;

    return {
      id: `act_${product.id}_${index}`,
      customerName: buyer.name,
      location: buyer.location,
      productId: product.id,
      productName: product.name,
      productImage: product.imageUrl,
      priceBDT: product.priceBDT,
      timeAgo,
      timestamp,
      paymentMethod: buyer.paymentMethod,
      variantLabel,
      stockRemaining: Math.max(2, Math.min(9, product.stockCount % 10 || 3)),
      viewersCount: 6 + ((index * 7) % 22),
    };
  });
}

// In-memory cache of generated activities
let cachedActivities: PurchaseActivityEvent[] | null = null;
let currentActivityIndex = 0;

export function getRecentActivitiesList(): PurchaseActivityEvent[] {
  if (!cachedActivities) {
    cachedActivities = generateRecentActivities();
  }
  return cachedActivities;
}

export function getNextActivityEvent(): PurchaseActivityEvent {
  const activities = getRecentActivitiesList();
  const event = activities[currentActivityIndex % activities.length];
  currentActivityIndex = (currentActivityIndex + 1) % activities.length;
  
  // Refresh the relative time text dynamically
  const minutes = Math.floor(Math.random() * 4) + 1;
  const timeAgo = minutes === 1 ? 'Just now' : `${minutes} mins ago`;
  
  return {
    ...event,
    timeAgo,
    timestamp: Date.now() - minutes * 60 * 1000,
  };
}

/**
 * Check if the user has muted the recent activity toasts
 */
export function isActivityToastMuted(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return localStorage.getItem(MUTE_STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

/**
 * Set user mute preference
 */
export function setActivityToastMuted(muted: boolean): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(MUTE_STORAGE_KEY, muted ? 'true' : 'false');
  } catch {
    // Ignore storage errors in restricted iframe
  }
}
