import { PRODUCTS } from "@/lib/products";
import { POSTS } from "@/lib/posts";

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

const productItems: SearchItem[] = (PRODUCTS as any[]).map((product) => ({
  id: `product-${product.asin}`,
  type: "product",
  title: product.name,
  description: product.description,
  url: `/product/${product.asin}`,
  image: product.image,
  price: product.price,
  tags: [
    product.brand,
    product.category,
    product.subcat,
    ...(product.tags || []),
    ...(product.concerns || []),
    ...(product.skinTypes || []),
    ...(product.ingredients || []),
    ...Object.values(product.specs || {}),
  ].filter(Boolean),
}));

const guideItems: SearchItem[] = POSTS.map((post) => ({
  id: `guide-${post.slug}`,
  type: "guide",
  title: post.title,
  description: post.excerpt,
  url: `/blog/${post.slug}`,
  tags: [post.category, post.readTime, post.title],
}));

const routineItems: SearchItem[] = [
  {
    id: "routine-builder",
    type: "routine",
    title: "Build your 4-step routine",
    description: "Answer skin type, concern and budget to get cleanser, treatment, moisturiser and sunscreen.",
    url: "/tools/routine",
    tags: ["routine", "oily skin", "dry skin", "acne", "pigmentation", "sunscreen", "beginner"],
  },
];

const ingredientItems: SearchItem[] = [
  {
    id: "ingredient-niacinamide",
    type: "ingredient",
    title: "Niacinamide",
    description: "Good for oil control, pores, barrier support and post-acne marks.",
    url: "/search?q=niacinamide",
    tags: ["niacinamide", "oily skin", "pores", "acne marks"],
  },
  {
    id: "ingredient-vitamin-c",
    type: "ingredient",
    title: "Vitamin C",
    description: "Useful for dullness, glow and uneven tone when paired with daily SPF.",
    url: "/search?q=vitamin%20c",
    tags: ["vitamin c", "glow", "dullness", "pigmentation"],
  },
  {
    id: "ingredient-salicylic",
    type: "ingredient",
    title: "Salicylic Acid",
    description: "A pore-focused exfoliant often used for oily, acne-prone skin.",
    url: "/search?q=salicylic%20acid",
    tags: ["salicylic acid", "acne", "pores", "oily skin"],
  },
];

export const SEARCH_INDEX: SearchItem[] = [
  ...routineItems,
  ...ingredientItems,
  ...guideItems,
  ...productItems,
];
