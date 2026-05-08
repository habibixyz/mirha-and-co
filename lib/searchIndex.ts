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
  acne: ["acne", "pimple", "breakout", "breakouts", "blackheads", "whiteheads", "zits", "spots", "active acne", "marks", "salicylic acid", "benzoyl peroxide", "pimple patch"],
  product: ["product", "buy", "shop", "recommendation", "best"],
  oily: ["oily", "oil", "sebum", "sebaceous", "greasy", "shine", "shiny", "pores", "blackheads", "salicylic acid", "niacinamide", "clay"],
  dry: ["dry", "dryness", "dehydrated", "dehydration", "flaky", "tight", "parched", "barrier", "ceramides", "hyaluronic acid", "squalane", "moisturizer"],
  sensitive: ["sensitive", "irritated", "irritation", "reactive", "delicate"],
  pigmentation: ["pigmentation", "dark spots", "hyperpigmentation", "acne marks", "post-acne", "tan", "discoloration", "marks", "melasma", "tanning", "vitamin c", "arbutin", "kojic", "glycolic"],
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

// 🎯 SMART CONCERN MAPPING: Maps user feelings to scientific ingredients
const CONCERN_MAP: Record<string, string[]> = {
  dry: ["ingredient-hyaluronic", "ingredient-ceramide", "ingredient-squalane"],
  oily: ["ingredient-niacinamide", "ingredient-salicylic", "ingredient-clay"],
  pigmentation: ["ingredient-vitamin-c", "ingredient-arbutin", "ingredient-kojic", "ingredient-glycolic"],
  acne: ["ingredient-salicylic", "routine-acne-basic", "ingredient-benzoyl"],
  aging: ["ingredient-retinol", "ingredient-peptides", "routine-anti-aging"],
  glow: ["ingredient-vitamin-c", "ingredient-glycolic", "guide-why-skin-looks-dull"],
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
    id: "routine-pigmentation",
    type: "routine",
    title: "Pigmentation & Dark Spot Routine",
    description: "A specialized PM routine to fade acne marks and melasma using targeted actives.",
    url: "/dashboard/search?q=pigmentation+guide",
    tags: cleanTags(["routine", "pigmentation", "dark spots", "marks", "fading", "brightening"]),
  },
  {
    id: "routine-oily-basic",
    type: "routine",
    title: "Oily Skin Morning Essentials",
    description: "A quick 3-step routine designed to control sebum and keep you matte all day.",
    url: "/dashboard/search?q=oily+routine",
    tags: cleanTags(["routine", "oily skin", "morning", "sebum control", "matte"]),
  },
  {
    id: "ingredient-niacinamide",
    type: "ingredient",
    title: "Niacinamide",
    description: "Useful for oil control, pores, barrier support and acne marks. Also known as Vitamin B3.",
    url: "/dashboard/search?q=niacinamide",
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
  {
    id: "ingredient-salicylic",
    type: "ingredient",
    title: "Salicylic Acid (BHA)",
    description: "The gold standard for oily and acne-prone skin. Deeply cleanses pores and prevents breakouts.",
    url: "/dashboard/search?q=salicylic",
    tags: cleanTags(["ingredient", "oily skin", "acne", "bha", "pores", "blackheads"]),
  },
  {
    id: "ingredient-clay",
    type: "ingredient",
    title: "Kaolin & Bentonite Clay",
    description: "Natural minerals that absorb excess oil and detoxify the skin without stripping it.",
    url: "/dashboard/search?q=clay",
    tags: cleanTags(["ingredient", "oily skin", "clay", "sebum", "detox"]),
  },
  {
    id: "ingredient-vitamin-c",
    type: "ingredient",
    title: "Vitamin C (L-Ascorbic Acid)",
    description: "The gold standard for brightening skin and fading sun spots. Best used in the morning.",
    url: "/dashboard/search?q=vitamin+c",
    tags: cleanTags(["ingredient", "pigmentation", "brightening", "vitamin c", "glow"]),
  },
  {
    id: "ingredient-arbutin",
    type: "ingredient",
    title: "Alpha Arbutin",
    description: "A gentle yet effective skin brightener that specifically targets hyperpigmentation and acne marks.",
    url: "/dashboard/search?q=arbutin",
    tags: cleanTags(["ingredient", "pigmentation", "arbutin", "dark spots", "marks"]),
  },
  {
    id: "ingredient-kojic",
    type: "ingredient",
    title: "Kojic Acid",
    description: "Derived from mushrooms, this acid inhibits melanin production to fade dark spots and even skin tone.",
    url: "/dashboard/search?q=kojic",
    tags: cleanTags(["ingredient", "pigmentation", "kojic", "dark spots", "melasma"]),
  },
  {
    id: "ingredient-retinol",
    type: "ingredient",
    title: "Retinol (Vitamin A)",
    description: "The gold standard for anti-aging. Stimulates collagen and speeds up cell turnover to fade fine lines and acne marks.",
    url: "/dashboard/search?q=retinol",
    tags: cleanTags(["ingredient", "retinol", "anti-aging", "wrinkles", "fine lines", "vitamin a"]),
  },
  {
    id: "ingredient-hyaluronic",
    type: "ingredient",
    title: "Hyaluronic Acid",
    description: "A hydration powerhouse that holds 1000x its weight in water. Essential for dehydrated or dry skin.",
    url: "/dashboard/search?q=hyaluronic",
    tags: cleanTags(["ingredient", "dry skin", "hydration", "hyaluronic", "plumping"]),
  },
  {
    id: "ingredient-ceramide",
    type: "ingredient",
    title: "Ceramides",
    description: "Lipids that help form the skin's barrier and help skin retain moisture. Best for damaged barriers.",
    url: "/dashboard/search?q=ceramide",
    tags: cleanTags(["ingredient", "dry skin", "barrier repair", "ceramide", "sensitive"]),
  },
  {
    id: "product-minimalist-niacinamide",
    type: "product",
    title: "Minimalist 10% Niacinamide Serum",
    description: "A cult-favorite for oil control and fading acne marks. Best for oily to combination skin.",
    url: "/product/B08F9M6N8L",
    tags: cleanTags(["product", "minimalist", "niacinamide", "oil control", "marks"]),
    price: 599,
  },
  {
    id: "product-reequil-sunscreen",
    type: "product",
    title: "Re'equil Ultra Matte Dry Touch Sunscreen",
    description: "The highest-rated sunscreen for Indian summers. No white cast, waterproof, and extremely matte.",
    url: "/product/B07G7N9B7N",
    tags: cleanTags(["product", "reequil", "sunscreen", "matte", "oily skin"]),
    price: 780,
  },
  {
    id: "product-dot-key-barrier",
    type: "product",
    title: "Dot & Key Barrier Repair Ceramides Moisturizer",
    description: "Intense hydration for very dry or compromised skin. Fragrance-free and rice-water based.",
    url: "/product/B0B7H8S7H1",
    tags: cleanTags(["product", "dot and key", "ceramides", "dry skin", "moisturizer"]),
    price: 395,
  },
  {
    id: "routine-double-cleanse",
    type: "routine",
    title: "The Double Cleansing Protocol",
    description: "How to properly remove water-resistant sunscreen and makeup without stripping your skin.",
    url: "/dashboard/search?q=double+cleanse",
    tags: cleanTags(["routine", "cleansing", "oil cleanser", "double cleanse", "clogged pores"]),
  },
  {
    id: "guide-barrier-repair",
    type: "guide",
    title: "How to Repair a Damaged Skin Barrier — The 4-Week Protocol",
    description: "Is your skin burning or red? Follow this 4-week protocol to fix your skin barrier fast.",
    url: "/blog/damaged-skin-barrier-repair",
    tags: cleanTags(["guide", "barrier repair", "sensitive skin", "redness", "burning"]),
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
function scoreItem(item: SearchItem, terms: string[], query: string): number {
  const title = normalize(item.title);
  const desc = normalize(item.description);
  const tagsStr = item.tags.join(" ");

  let score = 0;

  const normalizedQuery = normalize(query);

  // 🧠 CONCERN MAPPING BOOST
  Object.entries(CONCERN_MAP).forEach(([concern, relatedIds]) => {
    if (normalizedQuery.includes(concern) && relatedIds.includes(item.id)) {
      score += 50; // Huge boost for items that scientifically solve the user's "feeling"
    }
  });

  terms.forEach((term) => {
    const isTitleMatch = title.includes(term);
    const isTagMatch = item.tags.some((tag) => tag.includes(term));
    const isDescMatch = desc.includes(term);

    if (isTitleMatch) score += 15;
    if (isTagMatch) score += 10;
    if (isDescMatch) score += 5;

    // Exact matches get massive boosts
    if (title === term) score += 30;
    if (item.tags.includes(term)) score += 20;
  });

  // MULTI-TERM BOOST: If the query has multiple words, and we match many of them, boost exponentially
  const matchedTermCount = terms.filter(
    (t) => title.includes(t) || item.tags.some(tag => tag.includes(t)) || desc.includes(t)
  ).length;

  if (matchedTermCount > 1) {
    score += Math.pow(matchedTermCount, 2) * 10;
  }

  // Type weighting (actionable items first)
  const typeWeight = {
    routine: 4,
    ingredient: 3,
    guide: 2,
    product: 1,
  };
  score *= typeWeight[item.type];

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
    score: scoreItem(item, terms, query),
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