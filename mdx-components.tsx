import type { MDXComponents } from "mdx/types";
import BlogProductCard from "@/components/BlogProductCard";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    BlogProductCard,
    ...components,
  };
}