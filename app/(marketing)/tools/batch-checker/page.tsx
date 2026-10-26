import { Metadata } from "next";
import CosmeticBatchCheckerClient from "@/components/CosmeticBatchCheckerClient";

export const metadata: Metadata = {
  title: "Cosmetic Batch Code & Shelf Life Checker | Mirha & Co.",
  description:
    "Decode production dates, check PAO (Period After Opening) freshness, and verify shelf life for MAC, Maybelline, Dior, Clinique, The Ordinary, and 40+ luxury cosmetic brands.",
  keywords: [
    "cosmetic batch code checker",
    "makeup expiration date check",
    "checkcosmetic alternative",
    "check perfume batch code",
    "mac cosmetics batch code",
    "maybelline manufacturing date check",
    "pao period after opening calculator",
    "how to know if foundation expired"
  ],
  alternates: {
    canonical: "https://www.mirhaandco.com/tools/batch-checker",
  },
  openGraph: {
    title: "Cosmetic Batch Code & Shelf Life Checker | Mirha & Co.",
    description:
      "Decode cosmetic production dates, shelf life, and PAO freshness for 40+ luxury beauty brands with clinical precision.",
    url: "https://www.mirhaandco.com/tools/batch-checker",
    siteName: "Mirha & Co.",
    locale: "en_IN",
    type: "website",
  },
};

export default function BatchCheckerPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Cosmetic Batch Code & Shelf Life Checker",
    url: "https://www.mirhaandco.com/tools/batch-checker",
    applicationCategory: "UtilityApplication",
    operatingSystem: "All",
    description:
      "Clinical diagnostic tool to decode cosmetics production dates and calculate period after opening (PAO) freshness.",
    publisher: {
      "@type": "Organization",
      name: "Mirha & Co.",
      url: "https://www.mirhaandco.com",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CosmeticBatchCheckerClient />
    </>
  );
}
