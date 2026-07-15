import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "B2B SaaS — Global Climate & Hard Water Skincare API | Mirha & Co.",
  description:
    "Embed Mirha & Co.'s climate-aware AI skincare recommendation engine on your e-commerce store. Personalized routines adapted for local tap water, weather, and skin types globally.",
  alternates: {
    canonical: "https://www.mirhaandco.com/b2b",
  },
  keywords: [
    "AI skincare API",
    "skincare recommendation engine",
    "Shopify skincare widget",
    "B2B skincare SaaS",
    "climate-aware skincare",
    "hard water skincare",
    "personalized skincare API",
    "white label skincare widget",
    "Mirha and Co B2B",
  ],
  openGraph: {
    title: "B2B SaaS — Global Climate & Hard Water Skincare API | Mirha & Co.",
    description:
      "Rent our climate-aware AI recommendation engine. Boost conversions, cut returns, and give your customers personalized skincare routines adapted for their city.",
    url: "https://www.mirhaandco.com/b2b",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mirha & Co. Global B2B AI Skincare API",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "B2B SaaS — Global Climate & Hard Water Skincare API | Mirha & Co.",
    description:
      "Embed a climate-aware AI skincare assistant on your store. Personalized for global cities, tap water, and weather.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const b2bStructuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Mirha & Co. Climate & Hard Water API",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "AggregateOffer",
    lowPrice: "499",
    highPrice: "1899",
    priceCurrency: "USD"
  },
  description: "B2B API for E-commerce skincare personalization using real-time hard water and climate telemetry."
};

export default function B2BLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(b2bStructuredData) }}
      />
      {children}
    </>
  );
}
