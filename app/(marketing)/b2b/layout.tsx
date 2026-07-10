import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "B2B SaaS — AI Skincare Widget for Indian Brands | Mirha & Co.",
  description:
    "Embed Mirha & Co.'s climate-aware AI skincare recommendation engine on your Shopify or WooCommerce store. Personalized routines adapted for Indian tap water, weather, and skin types. Try the sandbox free.",
  alternates: {
    canonical: "https://www.mirhaandco.com/b2b",
  },
  keywords: [
    "AI skincare API",
    "skincare recommendation engine India",
    "Shopify skincare widget",
    "B2B skincare SaaS",
    "climate-aware skincare",
    "hard water skincare India",
    "personalized skincare API",
    "white label skincare widget",
    "Mirha and Co B2B",
  ],
  openGraph: {
    title: "B2B SaaS — AI Skincare Widget for Indian Brands | Mirha & Co.",
    description:
      "Rent our climate-aware AI recommendation engine. Boost conversions, cut returns, and give your customers personalized skincare routines adapted for their city.",
    url: "https://www.mirhaandco.com/b2b",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mirha & Co. B2B AI Skincare Widget",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "B2B SaaS — AI Skincare Widget for Indian Brands | Mirha & Co.",
    description:
      "Embed a climate-aware AI skincare assistant on your store. Personalized for Indian cities, tap water, and weather.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function B2BLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
