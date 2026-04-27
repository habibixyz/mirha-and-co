import { POSTS } from "@/lib/posts";
import { PRODUCTS } from "@/lib/products";

export type SearchItemType = "product" | "guide" | "routine" | "ingredient";

export type SearchItem = {
  id: string;
  type: SearchItemType;
  title: string;
  description: string;
  url: string;
  tags: string[];
  image?: string;
  price?: number;
  badge?: string;
};

const ROUTINES: SearchItem[] = [
  {
    id: "routine-oily-acne",
    type: "routine",
    title: "Oily Acne Routine",
    description: "A simple 4-step routine for oily, acne-prone skin with cleanser, treatment, moisturiser, and sunscreen.",
    url: "/tools/routine",
    tags: ["routine", "oily skin", "acne", "pores", "niacinamide", "sunscreen", "under 500", "under 1000"],
  },
  {
    id: "routine-pigmentation",
    type: "routine",
    title: "Pigmentation Routine",
    description: "Brightening routine logic for dark spots, uneven tone, vitamin C, and daily SPF.",
    url: "/tools/routine",
    tags: ["routine", "pigmentation", "dark spots", "vitamin c", "niacinamide", "sunscreen"],
  },
  {
    id: "routine-dry-sensitive",
    type: "routine",
    title: "Dry Sensitive Skin Routine",
    description: "Barrier-first routine for dry, sensitive, or easily irritated skin.",
    url: "/tools/routine",
    tags: ["routine", "dry skin", "sensitive skin", "barrier repair", "hydration", "cetaphil"],
  },
  {
    id: "routine-beginner",
    type: "routine",
    title: "Beginner Skincare Routine",
    description: "A low-risk cleanser, moisturiser, sunscreen, and one treatment approach for beginners.",
    url: "/tools/routine",
    tags: ["routine", "beginner", "cleanser", "moisturiser", "sunscreen", "simple"],
  },
];

const INGREDIENTS: SearchItem[] = [
  {
    id: "ingredient-niacinamide",
    type: "ingredient",
    title: "Niacinamide",
    description: "Best for oil control, barrier support, pores, acne marks, and uneven tone.",
    url: "/blog/what-niacinamide-does-to-your-skin",
    tags: ["niacinamide", "oil control", "pores", "acne marks", "pigmentation", "barrier"],
  },
  {
    id: "ingredient-vitamin-c",
    type: "ingredient",
    title: "Vitamin C",
    description: "Best for dullness, glow, uneven tone, and pigmentation when paired with sunscreen.",
    url: "/blog/niacinamide-vs-vitamin-c",
    tags: ["vitamin c", "glow", "dullness", "pigmentation", "brightening", "sunscreen"],
  },
  {
    id: "ingredient-retinol",
    type: "ingredient",
    title: "Retinol",
    description: "Best for fine lines, texture, and long-term skin renewal. Night use only.",
    url: "/?q=retinol",
    tags: ["retinol", "anti-ageing", "fine lines", "texture", "night serum"],
  },
  {
    id: "ingredient-salicylic-acid",
    type: "ingredient",
    title: "Salicylic Acid",
    description: "Best for oily skin, blackheads, clogged pores, and acne-prone routines.",
    url: "/?q=salicylic",
    tags: ["salicylic acid", "bha", "acne", "blackheads", "pores", "oily skin"],
  },
  {
    id: "ingredient-hyaluronic-acid",
    type: "ingredient",
    title: "Hyaluronic Acid",
    description: "Best for dehydration, plumping, and lightweight hydration across skin types.",
    url: "/?q=hyaluronic",
    tags: ["hyaluronic acid", "hydration", "dehydration", "dryness", "plumping"],
  },
];

const productItems: SearchItem[] = PRODUCTS.map((product) => ({
  id: `product-${product.id}`,
  type: "product",
  title: product.name,
  description: product.description,
  url: `/product/${product.asin}`,
  tags: [
    product.brand,
    product.category,
    product.subcat,
    product.budgetTier,
    ...product.tags,
    ...product.skinTypes,
    ...product.hairTypes,
    ...product.concerns,
    ...product.ingredients,
    ...product.routineSteps,
  ],
  image: product.image,
  price: product.price,
  badge: product.badge,
}));

const guideItems: SearchItem[] = POSTS.map((post) => ({
  id: `guide-${post.slug}`,
  type: "guide",
  title: post.title,
  description: post.excerpt,
  url: `/blog/${post.slug}`,
  tags: [post.category, post.readTime, post.date, ...post.tags],
  badge: `${post.productCount} picks`,
}));

export const SEARCH_INDEX: SearchItem[] = [
  ...productItems,
  ...guideItems,
  ...ROUTINES,
  ...INGREDIENTS,
];
