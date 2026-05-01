import { PRODUCTS } from "@/lib/products";
import { POSTS } from "@/lib/posts";

/* ─────────────────────────────
   TYPES
───────────────────────────── */
export type SearchItem = {
  id: string;
  type: "product" | "guide" | "routine" | "ingredient";
  title: string;
  description: string;
  url: string;
  image?: string;
  tags: string[];
  price?: number;
};

export type SearchResult = {
  items: SearchItem[];
  totalTime: number;
};

/* ─────────────────────────────
   UTILS
───────────────────────────── */

/**
 * Normalize text: lowercase, trim, remove extra whitespace
 */
function normalize(text: string): string {
  return text.toLowerCase().trim().replace(/\s+/g, " ");
}

/**
 * Clean & dedupe tags with normalization
 */
function cleanTags(tags: any[]): string[] {
  return Array.from(
    new Set(
      tags
        .filter(Boolean)
        .map((t) => normalize(String(t)))
        .filter((t) => t.length > 0)
    )
  );
}

/* ─────────────────────────────
   SYNONYM MAP (INTENT ENGINE)
───────────────────────────── */
const SYNONYMS: Record<string, string[]> = {
  // Skin concerns
  acne: ["acne", "pimple", "breakout", "breakouts", "blackheads", "whiteheads", "zits", "spots"],
  oily: ["oily", "oil", "sebum", "sebaceous", "greasy", "shine", "shiny"],
  dry: ["dry", "dryness", "dehydrated", "dehydration", "flaky", "tight", "parched"],
  sensitive: ["sensitive", "irritated", "irritation", "reactive", "delicate"],
  pigmentation: ["pigmentation", "dark spots", "hyperpigmentation", "acne marks", "post-acne", "tan", "discoloration"],
  aging: ["aging", "anti-aging", "fine lines", "wrinkles", "mature", "age spots"],
  
  // Ingredients
  sunscreen: ["sunscreen", "spf", "sun protection", "uv", "uva", "uvb", "spf 30", "spf 50"],
  moisturiser: ["moisturiser", "moisturizer", "cream", "lotion", "hydration", "moisturizing"],
  antiaging: ["anti-aging", "antiaging", "wrinkles", "fine lines", "aging"],
  niacinamide: ["niacinamide", "vitamin b3", "oil control", "pore minimizer"],
  retinol: ["retinol", "retinoid", "vitamin a", "anti-aging"],
  salicylic: ["salicylic", "bha", "beta hydroxy", "exfoliant", "chemical exfoliant"],
  glycolic: ["glycolic", "aha", "alpha hydroxy", "exfoliant"],
  hyaluronic: ["hyaluronic", "hyaluronic acid", "hydration", "humectant"],
  vitamin_c: ["vitamin c", "ascorbic acid", "brightening", "antioxidant"],
  
  // Skin types
  combination: ["combination", "combo", "mixed"],
  normal: ["normal", "balanced"],
};

/* ─────────────────────────────
   PRODUCT INDEX
───────────────────────────── */
const productItems: SearchItem[] = (PRODUCTS as any[]).map((product) => ({
  id: `product-${product.asin}`,
  type: "product",
  title: product.name,
  description: product.description,
  url: `/product/${product.asin}`,
  image: product.image,
  price: product.price,
  tags: cleanTags([
    product.name,
    product.brand,
    product.category,
    product.subcat,
    ...(product.tags || []),
    ...(product.concerns || []),
    ...(product.skinTypes || []),
    ...(product.ingredients || []),
    ...Object.values(product.specs || {}).map(String),
  ]),
}));

/* ─────────────────────────────
   GUIDE INDEX (BLOGS)
───────────────────────────── */
const guideItems: SearchItem[] = POSTS.map((post) => ({
  id: `guide-${post.slug}`,
  type: "guide",
  title: post.title,
  description: post.excerpt,
  url: `/blog/${post.slug}`,
  tags: cleanTags([
    post.title,
    post.category,
    ...(post.tags || []),
    // Optional: extract semantic keywords from excerpt
    // Example: if post is about acne, add 'acne' tag
  ]),
}));

/* ─────────────────────────────
   STATIC ITEMS
───────────────────────────── */
const staticItems: SearchItem[] = [
  {
    id: "routine-builder",
    type: "routine",
    title: "Build your 4-step routine",
    description: "Answer skin type, concern and budget to get a personalized skincare routine.",
    url: "/tools/routine",
    tags: cleanTags([
      "routine",
      "skincare",
      "routine builder",
      "oily skin",
      "dry skin",
      "combination skin",
      "acne",
      "pigmentation",
      "sensitive",
      "anti-aging",
    ]),
  },
  {
    id: "ingredient-niacinamide",
    type: "ingredient",
    title: "Niacinamide",
    description: "Useful for oil control, pores, barrier support and acne marks. Also known as Vitamin B3.",
    url: "/search?q=niacinamide",
    tags: cleanTags([
      "niacinamide",
      "vitamin b3",
      "ingredient",
      "oily skin",
      "pores",
      "acne marks",
      "oil control",
    ]),
  },
];

/* ─────────────────────────────
   FINAL SEARCH INDEX
───────────────────────────── */
export const SEARCH_INDEX: SearchItem[] = [
  ...staticItems,
  ...guideItems,
  ...productItems,
];

/* ─────────────────────────────
   QUERY EXPANSION ENGINE
───────────────────────────── */

/**
 * Expand query with synonyms
 * Example: "acne" → ["acne", "pimple", "breakout", "zits", ...]
 */
function expandTerms(query: string): string[] {
  const base = normalize(query)
    .split(/\s+/)
    .filter((t) => t.length > 0);

  const expanded = new Set(base);

  base.forEach((term) => {
    // Check if term matches any synonym key or value
    Object.entries(SYNONYMS).forEach(([key, values]) => {
      if (key === term || values.includes(term)) {
        values.forEach((v) => expanded.add(v));
        expanded.add(key);
      }
    });
  });

  return Array.from(expanded);
}

/* ─────────────────────────────
   SCORING ENGINE
───────────────────────────── */

/**
 * Calculate relevance score for an item against search terms
 */
function scoreItem(item: SearchItem, terms: string[]): number {
  const title = normalize(item.title);
  const desc = normalize(item.description);
  const tagsStr = item.tags.join(" ");

  let score = 0;

  terms.forEach((term) => {
    // Title matches (highest priority)
    if (title === term) {
      score += 20; // Exact match
    } else if (title.startsWith(term)) {
      score += 15; // Prefix match
    } else if (title.includes(term)) {
      score += 10; // Substring match
    }

    // Tag matches
    if (item.tags.some((tag) => tag === term)) {
      score += 8; // Exact tag
    } else if (item.tags.some((tag) => tag.includes(term))) {
      score += 5; // Partial tag
    }

    // Description matches (lowest priority)
    if (desc.includes(term)) {
      score += 3;
    }
  });

  // Type weighting (editorial content ranks higher)
  const typeWeight = {
    guide: 3,
    routine: 2,
    ingredient: 1.5,
    product: 1,
  };
  score *= typeWeight[item.type];

  // Multi-term match boost (queries with multiple terms)
  const matchedTermCount = terms.filter(
    (t) => title.includes(t) || tagsStr.includes(t) || desc.includes(t)
  ).length;

  score += matchedTermCount * 3;

  // Price relevance (if product and query contains price info)
  if (item.price && item.price > 0) {
    score += 0.5; // Small boost for products with valid prices
  }

  return score;
}

/* ─────────────────────────────
   MAIN SEARCH FUNCTION
───────────────────────────── */

/**
 * Search the Mirha catalog with synonym expansion & relevance ranking
 * @param query - Search query (e.g., "acne products", "dry skin routine")
 * @param limit - Maximum results to return (default: 24)
 * @returns SearchResult with items and execution time
 */
export function searchMirha(query: string, limit: number = 24): SearchItem[] {
  const startTime = performance.now();

  // Expand query with synonyms
  const terms = expandTerms(query);

  // Empty query → return popular items
  if (terms.length === 0) {
    return SEARCH_INDEX.slice(0, limit);
  }

  // Score all items
  const scored = SEARCH_INDEX.map((item) => ({
    item,
    score: scoreItem(item, terms),
  }));

  // Filter (score > 0), sort, return top N
  const results = scored
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.item);

  // Fallback: if no matches, return popular items
  if (results.length === 0) {
    return SEARCH_INDEX.slice(0, limit / 2);
  }

  return results;
}

/**
 * Advanced search with debugging info
 * Useful for analytics and understanding relevance
 */
export function searchMirhaDebug(query: string, limit: number = 24) {
  const startTime = performance.now();
  const terms = expandTerms(query);

  const scored = SEARCH_INDEX.map((item) => ({
    item,
    score: scoreItem(item, terms),
  }));

  const results = scored
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  const endTime = performance.now();

  return {
    query,
    expandedTerms: terms,
    results: results.map((r) => r.item),
    scores: results.map((r) => ({
      title: r.item.title,
      score: r.score.toFixed(2),
    })),
    totalResults: results.length,
    executionTime: `${(endTime - startTime).toFixed(2)}ms`,
  };
}

/* ─────────────────────────────
   HELPER: GET TRENDING ITEMS
───────────────────────────── */

/**
 * Get trending/featured items (e.g., for homepage)
 */
export function getTrendingItems(limit: number = 12): SearchItem[] {
  // Prioritize guides and ingredients
  const featured = SEARCH_INDEX.filter(
    (item) => item.type === "guide" || item.type === "ingredient"
  ).slice(0, limit);

  return featured.length >= limit
    ? featured
    : [...featured, ...SEARCH_INDEX.slice(0, limit - featured.length)];
}

/* ─────────────────────────────
   HELPER: AUTOCOMPLETE SUGGESTIONS
───────────────────────────── */

/**
 * Get autocomplete suggestions for a partial query
 */
export function getAutocompleteSuggestions(
  partial: string,
  limit: number = 5
): string[] {
  const norm = normalize(partial);
  if (norm.length < 2) return [];

  const suggestions = new Set<string>();

  // From all tags
  SEARCH_INDEX.forEach((item) => {
    item.tags.forEach((tag) => {
      if (tag.includes(norm)) {
        suggestions.add(tag);
      }
    });
  });

  // From synonyms
  Object.keys(SYNONYMS).forEach((key) => {
    if (key.includes(norm)) {
      suggestions.add(key);
    }
  });

  return Array.from(suggestions).slice(0, limit);
}