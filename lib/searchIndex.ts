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
  ].filter(Boolean) as string[],
}));

const guideItems: SearchItem[] = POSTS.map((post) => ({
  id: `guide-${post.slug}`,
  type: "guide",
  title: post.title,
  description: post.excerpt,
  url: `/blog/${post.slug}`,
  tags: [post.category, post.readTime, post.title],
}));

export const SEARCH_INDEX: SearchItem[] = [
  {
    id: "routine-builder",
    type: "routine",
    title: "Build your 4-step routine",
    description: "Answer skin type, concern and budget to get a simple routine.",
    url: "/tools/routine",
    tags: ["routine", "skincare", "oily skin", "dry skin", "acne", "pigmentation"],
  },
  {
    id: "ingredient-niacinamide",
    type: "ingredient",
    title: "Niacinamide",
    description: "Useful for oil control, pores, barrier support and acne marks.",
    url: "/search?q=niacinamide",
    tags: ["niacinamide", "oily skin", "pores", "acne marks"],
  },
  ...guideItems,
  ...productItems,
];
