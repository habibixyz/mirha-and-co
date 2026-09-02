import { MetadataRoute } from "next";
import { POSTS } from "@/lib/posts";
import { PRODUCTS } from "@/lib/products";
import { getAllProgrammaticSlugs, CITIES, GLOBAL_CITIES } from "@/lib/programmatic-posts";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.mirhaandco.com";

  // Stable revision timestamp to prevent fake-freshness penalties from Googlebot
  const buildRevisionDate = new Date("2026-08-25T00:00:00.000Z");
  const defaultPostDate = new Date("2026-06-15T00:00:00.000Z");

  const staticRoutes = [
    { route: "", changeFrequency: "daily" as const, priority: 1.0 },
    { route: "/pricing", changeFrequency: "weekly" as const, priority: 0.9 },
    { route: "/water-quality", changeFrequency: "weekly" as const, priority: 0.9 },
    { route: "/tools/analysis", changeFrequency: "daily" as const, priority: 1.0 },
    { route: "/tools/routine", changeFrequency: "weekly" as const, priority: 0.9 },
    { route: "/tools/ingredients", changeFrequency: "weekly" as const, priority: 0.9 },
    { route: "/tools/hard-water", changeFrequency: "weekly" as const, priority: 0.9 },
    { route: "/tools/dupes", changeFrequency: "weekly" as const, priority: 0.9 },
    { route: "/blog", changeFrequency: "daily" as const, priority: 0.8 },
    { route: "/k-beauty", changeFrequency: "weekly" as const, priority: 0.8 },
    { route: "/mens-grooming", changeFrequency: "weekly" as const, priority: 0.8 },
    { route: "/about", changeFrequency: "monthly" as const, priority: 0.7 },
    { route: "/privacy", changeFrequency: "monthly" as const, priority: 0.4 },
    { route: "/terms", changeFrequency: "monthly" as const, priority: 0.4 },
    { route: "/refunds", changeFrequency: "monthly" as const, priority: 0.4 },
  ].map(({ route, changeFrequency, priority }) => ({
    url: `${baseUrl}${route}`,
    lastModified: buildRevisionDate,
    changeFrequency,
    priority,
  }));

  // Skincare guides & editorial blog posts
  const blogRoutes = POSTS.map((post) => {
    let postDate = defaultPostDate;
    try {
      if (post.date) {
        const parsed = new Date(`${post.date} 01:00:00 UTC`);
        if (!isNaN(parsed.getTime())) {
          postDate = parsed;
        }
      }
    } catch {
      postDate = defaultPostDate;
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
    lastModified: defaultPostDate,
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));

  // Dynamic product pages
  const productRoutes = PRODUCTS.filter((product: any) => !product.hideFromShop).map((product) => ({
    url: `${baseUrl}/product/${product.asin}`,
    lastModified: buildRevisionDate,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  // Dynamic water quality pages
  const citySlugs = [
    "delhi",
    "mumbai",
    "london",
    "new-york",
    "paris",
    "dubai",
    "los-angeles",
    "bengaluru",
    ...CITIES.map((c) => c.slug),
    ...GLOBAL_CITIES.map((c) => c.slug),
  ];
  const uniqueCitySlugs = Array.from(new Set(citySlugs));
  const waterQualityRoutes = uniqueCitySlugs.map((slug) => ({
    url: `${baseUrl}/water-quality/${slug}`,
    lastModified: buildRevisionDate,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const allRoutes = [...staticRoutes, ...blogRoutes, ...programmaticRoutes, ...productRoutes, ...waterQualityRoutes];

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
