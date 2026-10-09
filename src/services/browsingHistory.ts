import { Product, ProductCategory, BrowsingHistoryItem } from '../types';

export const STORAGE_BROWSING_HISTORY = 'nexus_browsing_history_bdt_v1';
export const BROWSING_HISTORY_EVENT = 'nexus_browsing_history_updated';
const MAX_HISTORY_ITEMS = 30;

/**
 * Retrieve user's saved browsing history from localStorage
 */
export function getBrowsingHistory(): BrowsingHistoryItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_BROWSING_HISTORY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch (err) {
    console.warn('Failed to load browsing history from localStorage:', err);
    return [];
  }
}

/**
 * Save browsing history array to localStorage and notify listeners
 */
function saveBrowsingHistory(history: BrowsingHistoryItem[]): void {
  try {
    localStorage.setItem(STORAGE_BROWSING_HISTORY, JSON.stringify(history));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent(BROWSING_HISTORY_EVENT, {
          detail: { history, timestamp: Date.now() },
        })
      );
    }
  } catch (err) {
    console.warn('Failed to save browsing history to localStorage:', err);
  }
}

/**
 * Record a user product page view or selection into browsing history
 */
export function recordProductView(product: Product): void {
  if (!product || !product.id) return;

  const current = getBrowsingHistory();
  const existingIndex = current.findIndex((item) => item.productId === product.id);

  let updated: BrowsingHistoryItem[];

  if (existingIndex > -1) {
    const existing = current[existingIndex];
    const updatedEntry: BrowsingHistoryItem = {
      ...existing,
      category: product.category,
      subcategory: product.subcategory,
      priceBDT: product.priceBDT,
      timestamp: Date.now(),
      viewCount: (existing.viewCount || 1) + 1,
    };
    // Move to front
    updated = [updatedEntry, ...current.filter((_, idx) => idx !== existingIndex)];
  } else {
    const newEntry: BrowsingHistoryItem = {
      productId: product.id,
      category: product.category,
      subcategory: product.subcategory,
      priceBDT: product.priceBDT,
      timestamp: Date.now(),
      viewCount: 1,
    };
    updated = [newEntry, ...current];
  }

  // Trim to max capacity
  const trimmed = updated.slice(0, MAX_HISTORY_ITEMS);
  saveBrowsingHistory(trimmed);
}

/**
 * Delete a specific product from browsing history
 */
export function removeProductFromHistory(productId: string): void {
  const current = getBrowsingHistory();
  const filtered = current.filter((item) => item.productId !== productId);
  saveBrowsingHistory(filtered);
}

/**
 * Clear all browsing history
 */
export function clearBrowsingHistory(): void {
  try {
    localStorage.removeItem(STORAGE_BROWSING_HISTORY);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent(BROWSING_HISTORY_EVENT, {
          detail: { history: [], timestamp: Date.now() },
        })
      );
    }
  } catch (err) {
    console.warn('Failed to clear browsing history:', err);
  }
}

/**
 * Get populated Product objects for recently viewed items
 */
export function getRecentlyViewedProducts(catalog: Product[], limit: number = 8): {
  product: Product;
  historyItem: BrowsingHistoryItem;
}[] {
  const history = getBrowsingHistory();
  const productMap = new Map<string, Product>();
  for (const prod of catalog) {
    productMap.set(prod.id, prod);
  }

  const results: { product: Product; historyItem: BrowsingHistoryItem }[] = [];
  for (const item of history) {
    const prod = productMap.get(item.productId);
    if (prod) {
      results.push({ product: prod, historyItem: item });
      if (results.length >= limit) break;
    }
  }

  return results;
}

/**
 * Quick Persona Simulator:
 * Allows user to seed browsing history with 1 click to test heuristic adaptation
 */
export function seedPersonaBrowsingHistory(
  persona: 'audio' | 'lighting' | 'watches' | 'furniture',
  catalog: Product[]
): void {
  let targetCategory: ProductCategory = 'electronics_audio';
  if (persona === 'lighting') targetCategory = 'smart_lighting';
  if (persona === 'watches') targetCategory = 'fashion_watches';
  if (persona === 'furniture') targetCategory = 'furniture_living';

  const matches = catalog.filter((p) => p.category === targetCategory);
  if (matches.length === 0) return;

  const now = Date.now();
  const seededItems: BrowsingHistoryItem[] = matches.slice(0, 3).map((prod, idx) => ({
    productId: prod.id,
    category: prod.category,
    subcategory: prod.subcategory,
    priceBDT: prod.priceBDT,
    timestamp: now - idx * 1000 * 60 * 5, // spaced 5 mins apart
    viewCount: idx === 0 ? 3 : 1,
  }));

  saveBrowsingHistory(seededItems);
}
