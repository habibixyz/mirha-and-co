import { MetadataRoute } from "next";
import { POSTS } from "@/lib/posts";
import { PRODUCTS } from "@/lib/products";

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

  // Dynamic product pages
  const productRoutes = PRODUCTS.map((product) => ({
    url: `${baseUrl}/product/${product.asin}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes, ...productRoutes];
}
