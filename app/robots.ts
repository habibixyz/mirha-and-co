import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
 const baseUrl = "https://www.mirhaandco.com";

 return {
 rules: {
 userAgent: "*",
 allow: "/",
 disallow: [
 "/api/",
 "/dashboard/",
 "/reset-password/",
 "/forgot-password/",
 "/login",
 "/register",
 ],
 },
 sitemap: `${baseUrl}/sitemap.xml`,
 };
}
