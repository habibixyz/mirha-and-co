import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

const nextConfig: NextConfig = {
  poweredByHeader: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  pageExtensions: ["ts", "tsx", "mdx"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
      },
      {
        protocol: "https",
        hostname: "images-na.ssl-images-amazon.com",
      },
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
    ],
  },
  turbopack: {
    root: __dirname,
  },
  experimental: {
    mdxRs: true,
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  async redirects() {
    return [
      // 404 Blog Slugs (Renamed / Consolidated)
      {
        source: "/blog/barrier-repair-protocol",
        destination: "/blog/damaged-skin-barrier-repair",
        permanent: true,
      },
      {
        source: "/blog/beginner-retinol-guide-india",
        destination: "/blog/best-retinol-serum-for-beginners-india",
        permanent: true,
      },
      {
        source: "/blog/niacinamide-benefits",
        destination: "/blog/best-niacinamide-serums-india",
        permanent: true,
      },
      // 404 Product ASINs (Corrected / Fallback)
      {
        source: "/product/B07G7N9B7N",
        destination: "/product/B07VP5JFRB",
        permanent: true,
      },
      {
        source: "/product/B08GG9M863",
        destination: "/product/B01MDTVZTZ",
        permanent: true,
      },
      {
        source: "/product/B087H8S7H1",
        destination: "/#shop",
        permanent: true,
      },
      // Old generic search path
      {
        source: "/search",
        destination: "/blog",
        permanent: true,
      },
      // City Water Quality Duplicate Consolidation (Google chose bengaluru)
      {
        source: "/water-quality/bangalore",
        destination: "/water-quality/bengaluru",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
        ],
      },
    ];
  },
};

export default withMDX(nextConfig);