import { MetadataRoute } from "next";
import { POSTS } from "@/lib/posts";
import { PRODUCTS } from "@/lib/products";
import { getAllProgrammaticSlugs } from "@/lib/programmatic-posts";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.mirhaandco.com";

  // Standard static pages
  const staticRoutes = [
    "",
    "/about",
    "/blog",
    "/tools/routine",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Skincare guides & blog posts
  const blogRoutes = POSTS.map((post) => {
    // Parse the post date (e.g., "May 2026", "March 2026") into a safe Date object
    let postDate = new Date();
    try {
      if (post.date) {
        postDate = new Date(`${post.date} 01:00:00 UTC`);
        if (isNaN(postDate.getTime())) {
          postDate = new Date();
        }
      }
    } catch {
      postDate = new Date();
    }

    return {
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: postDate,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    };
  });

  // Programmatic SEO routes
  const programmaticSlugs = getAllProgrammaticSlugs();
  const programmaticRoutes = programmaticSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));

  // Dynamic product pages
  const productRoutes = PRODUCTS.filter((product: any) => !product.hideFromShop).map((product) => ({
    url: `${baseUrl}/product/${product.asin}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const allRoutes = [...staticRoutes, ...blogRoutes, ...programmaticRoutes, ...productRoutes];
  
  // Deduplicate routes by URL, keeping the one with higher priority
  const uniqueRoutesMap = new Map<string, any>();
  for (const route of allRoutes) {
    const existing = uniqueRoutesMap.get(route.url);
    if (!existing || (route.priority || 0) > (existing.priority || 0)) {
      uniqueRoutesMap.set(route.url, route);
    }
  }

  return Array.from(uniqueRoutesMap.values());
}
