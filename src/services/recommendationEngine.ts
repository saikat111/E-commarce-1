import { 
  Product, ProductCategory, BrowsingHistoryItem, ScoredRecommendation, RecommendationReason 
} from '../types';
import { CATEGORIES_METADATA } from '../data/products';
import { formatBDT } from '../utils/formatters';

interface UserBrowsingProfile {
  totalViews: number;
  categoryWeights: Map<ProductCategory, number>;
  favoriteCategory?: ProductCategory;
  subcategoryCounts: Map<string, number>;
  averagePriceBDT: number;
  minPriceBDT: number;
  maxPriceBDT: number;
  mostRecentProductId?: string;
  viewedProductIds: Set<string>;
}

/**
 * Extract heuristic profile and preferences from user's browsing history
 */
export function analyzeBrowsingProfile(history: BrowsingHistoryItem[]): UserBrowsingProfile {
  const profile: UserBrowsingProfile = {
    totalViews: history.length,
    categoryWeights: new Map<ProductCategory, number>(),
    subcategoryCounts: new Map<string, number>(),
    averagePriceBDT: 0,
    minPriceBDT: Infinity,
    maxPriceBDT: 0,
    mostRecentProductId: history.length > 0 ? history[0].productId : undefined,
    viewedProductIds: new Set(history.map((h) => h.productId)),
  };

  if (history.length === 0) {
    return profile;
  }

  let weightedPriceSum = 0;
  let totalRecencyWeight = 0;

  // Process history with recency decay: most recent items have highest weights
  history.forEach((item, index) => {
    // Recency decay factor: first item = 1.0, decreases gradually down to 0.4
    const recencyFactor = Math.max(0.4, 1.0 - index * 0.08);
    const viewWeight = (item.viewCount || 1) * recencyFactor;

    // Category affinity
    const currentCatWeight = profile.categoryWeights.get(item.category) || 0;
    profile.categoryWeights.set(item.category, currentCatWeight + viewWeight);

    // Subcategory counts
    if (item.subcategory) {
      const currentSubCount = profile.subcategoryCounts.get(item.subcategory) || 0;
      profile.subcategoryCounts.set(item.subcategory, currentSubCount + 1);
    }

    // Price statistics
    weightedPriceSum += item.priceBDT * viewWeight;
    totalRecencyWeight += viewWeight;
    if (item.priceBDT < profile.minPriceBDT) profile.minPriceBDT = item.priceBDT;
    if (item.priceBDT > profile.maxPriceBDT) profile.maxPriceBDT = item.priceBDT;
  });

  // Calculate weighted average price
  profile.averagePriceBDT = totalRecencyWeight > 0 ? Math.round(weightedPriceSum / totalRecencyWeight) : 0;

  // Identify favorite category
  let maxWeight = 0;
  profile.categoryWeights.forEach((weight, cat) => {
    if (weight > maxWeight) {
      maxWeight = weight;
      profile.favoriteCategory = cat;
    }
  });

  return profile;
}

/**
 * Heuristic Recommendation Algorithm:
 * Evaluates candidate products against user browsing history, wishlist, and cart state
 */
export function getRecommendedProducts(
  catalog: Product[],
  history: BrowsingHistoryItem[],
  wishlistIds: string[] = [],
  cartProductIds: string[] = [],
  limit: number = 8
): ScoredRecommendation[] {
  const profile = analyzeBrowsingProfile(history);
  const catalogMap = new Map<string, Product>();
  catalog.forEach((p) => catalogMap.set(p.id, p));

  const mostRecentProduct = profile.mostRecentProductId 
    ? catalogMap.get(profile.mostRecentProductId) 
    : undefined;

  // Handle Cold-Start (Fresh Visitor with no browsing history yet)
  if (history.length === 0) {
    return generateColdStartRecommendations(catalog, wishlistIds, limit);
  }

  const categoryMetaMap = new Map(CATEGORIES_METADATA.map((c) => [c.id, c]));
  const scoredItems: ScoredRecommendation[] = [];

  for (const product of catalog) {
    let score = 0;
    const reasons: RecommendationReason[] = [];

    // 1. Category Affinity Heuristic (Max 45 pts)
    const catWeight = profile.categoryWeights.get(product.category) || 0;
    if (catWeight > 0) {
      const isTopCategory = product.category === profile.favoriteCategory;
      const catBonus = isTopCategory ? 45 : Math.min(30, catWeight * 12);
      score += catBonus;

      const catMeta = categoryMetaMap.get(product.category);
      reasons.push({
        signal: 'category_affinity',
        title: isTopCategory ? 'Top Category Affinity' : 'Browsed Category Match',
        badgeLabel: isTopCategory ? `Top Interest: ${catMeta?.shortName || product.category}` : 'Category Interest',
        description: `Recommended because you actively browsed ${catMeta?.name || product.category}`,
        scoreBonus: catBonus,
      });
    }

    // 2. Subcategory Specific Match (Max 25 pts)
    if (product.subcategory && profile.subcategoryCounts.has(product.subcategory)) {
      const subBonus = 25;
      score += subBonus;
      reasons.push({
        signal: 'subcategory_match',
        title: 'Similar Item Style',
        badgeLabel: `Style: ${product.subcategory}`,
        description: `Shares subcategory "${product.subcategory}" with items you recently inspected`,
        scoreBonus: subBonus,
      });
    }

    // 3. Price Proximity Heuristic (Max 22 pts)
    if (profile.averagePriceBDT > 0) {
      const priceDiffPercent = Math.abs(product.priceBDT - profile.averagePriceBDT) / profile.averagePriceBDT;
      if (priceDiffPercent <= 0.35) {
        // Within 35% of user's typical viewed price
        const priceBonus = 22;
        score += priceBonus;
        reasons.push({
          signal: 'price_proximity',
          title: 'Budget Proximity Fit',
          badgeLabel: `Budget Fit (~${formatBDT(profile.averagePriceBDT)})`,
          description: `Priced comfortably close to your average viewed budget of ${formatBDT(profile.averagePriceBDT)}`,
          scoreBonus: priceBonus,
        });
      } else if (priceDiffPercent <= 0.65) {
        const priceBonus = 12;
        score += priceBonus;
        reasons.push({
          signal: 'price_proximity',
          title: 'Price Range Fit',
          badgeLabel: 'Price Range Fit',
          description: `Aligns with your explored price tier`,
          scoreBonus: priceBonus,
        });
      }
    }

    // 4. Synergistic Similarity to Most Recently Viewed Product (Max 20 pts)
    if (mostRecentProduct && mostRecentProduct.id !== product.id) {
      if (mostRecentProduct.category === product.category) {
        const simBonus = 18;
        score += simBonus;
        reasons.push({
          signal: 'similar_item',
          title: 'Complementary to Last Viewed',
          badgeLabel: `Similar to ${mostRecentProduct.name.slice(0, 18)}...`,
          description: `Frequently explored alongside ${mostRecentProduct.name}`,
          scoreBonus: simBonus,
        });
      }
    }

    // 5. Wishlist Engagement Boost (Max 30 pts)
    if (wishlistIds.includes(product.id)) {
      const wishBonus = 30;
      score += wishBonus;
      reasons.push({
        signal: 'wishlist_synergy',
        title: 'Saved in Your Wishlist',
        badgeLabel: 'In Your Saved Wishlist',
        description: 'You marked this item for future purchase',
        scoreBonus: wishBonus,
      });
    }

    // 6. Quality & Social Proof Booster (Max 18 pts)
    if (product.rating >= 4.8) {
      score += 10;
    }
    if (product.ordersCount > 1000) {
      score += 5;
    }
    if (product.isChoice) {
      score += 5;
    }

    // 7. Exploration & Diversity Adjustment
    // If product was already viewed, slight penalty so we don't just echo what they just saw,
    // encouraging discovery while keeping them visible if relevance is extremely high.
    if (profile.viewedProductIds.has(product.id)) {
      if (history.length >= 3) {
        score -= 20; // Favor unviewed items for discovery
      } else {
        score += 5; // User has small history, showing recent item is relevant
      }
    }

    // In Cart adjustment: if user already has it in cart, reduce score to suggest alternative/accessories
    if (cartProductIds.includes(product.id)) {
      score -= 30;
    }

    // Normalize final match percentage between 78% and 99%
    const normalizedMatch = Math.min(
      99,
      Math.max(76, Math.round(50 + score * 0.45))
    );

    // Primary reason and badge
    const topReason = reasons.length > 0 ? reasons[0] : {
      signal: 'trending_popular' as const,
      title: 'Trending Quality',
      badgeLabel: 'Highly Rated Choice',
      description: 'Popular high-demand item across marketplace shoppers',
      scoreBonus: 10,
    };

    scoredItems.push({
      product,
      score,
      matchPercentage: normalizedMatch,
      reasons,
      primaryReason: topReason.description,
      badgeText: topReason.badgeLabel,
      basedOnProduct: mostRecentProduct,
    });
  }

  // Sort by score descending and return top recommendations
  scoredItems.sort((a, b) => b.score - a.score);
  return scoredItems.slice(0, limit);
}

/**
 * Cold-Start Fallback Generator for new users with no browsing history
 */
function generateColdStartRecommendations(
  catalog: Product[],
  wishlistIds: string[],
  limit: number
): ScoredRecommendation[] {
  // Select diverse top performers: high rating, choice, flash deals, high orders
  const candidates = [...catalog].sort((a, b) => {
    const aScore = (a.rating * 10) + (a.isChoice ? 15 : 0) + (a.isFlashSale ? 10 : 0) + (wishlistIds.includes(a.id) ? 30 : 0);
    const bScore = (b.rating * 10) + (b.isChoice ? 15 : 0) + (b.isFlashSale ? 10 : 0) + (wishlistIds.includes(b.id) ? 30 : 0);
    return bScore - aScore;
  });

  // Pick top items ensuring category variety
  const picked: ScoredRecommendation[] = [];
  const usedCategories = new Set<ProductCategory>();

  // Pass 1: diverse categories
  for (const product of candidates) {
    if (!usedCategories.has(product.category)) {
      usedCategories.add(product.category);
      picked.push(createColdStartRecommendation(product, 95 - picked.length * 2));
      if (picked.length >= limit) break;
    }
  }

  // Pass 2: fill remaining slots if needed
  if (picked.length < limit) {
    for (const product of candidates) {
      if (!picked.some((p) => p.product.id === product.id)) {
        picked.push(createColdStartRecommendation(product, 88 - picked.length));
        if (picked.length >= limit) break;
      }
    }
  }

  return picked;
}

function createColdStartRecommendation(product: Product, matchPercent: number): ScoredRecommendation {
  let badge = '🔥 Curated Starter Pick';
  let desc = 'Popular trending item recommended for new visitors';

  if (product.isFlashSale) {
    badge = '⚡ Flash Deal Pick';
    desc = 'Special discount deal currently trending across Bangladesh';
  } else if (product.isChoice) {
    badge = '💎 Nexus Choice Verified';
    desc = 'Top-tier verified product with nationwide express shipping';
  } else if (product.rating >= 4.9) {
    badge = '⭐ 4.9+ Top Rated';
    desc = 'Celebrated by hundreds of verified customer reviews';
  }

  return {
    product,
    score: matchPercent,
    matchPercentage: matchPercent,
    reasons: [
      {
        signal: 'trending_popular',
        title: 'Trending Marketplace Selection',
        badgeLabel: badge,
        description: desc,
        scoreBonus: 20,
      },
    ],
    primaryReason: desc,
    badgeText: badge,
  };
}
