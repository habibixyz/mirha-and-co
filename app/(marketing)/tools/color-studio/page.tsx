import { Metadata } from "next";
import ColorStudioClient from "@/components/ColorStudioClient";

export const metadata: Metadata = {
  title: "Color Analysis & Harmony Studio | Mirha & Co.",
  description:
    "Discover your seasonal color palette, contrast level, best lip & cheek shade harmonies, and cross-brand foundation shade converter for Indian and global skin tones.",
  keywords: [
    "seasonal color analysis india",
    "personal color analysis online",
    "best lipstick for warm undertone",
    "mac shade converter",
    "deep autumn makeup palette",
    "foundation shade finder across brands",
    "blush colors for olive skin"
  ],
  alternates: {
    canonical: "https://www.mirhaandco.com/tools/color-studio",
  },
  openGraph: {
    title: "Color Analysis & Harmony Studio | Mirha & Co.",
    description:
      "Find your seasonal color profile, harmonic lip & blush swatches, and cross-brand foundation matches.",
    url: "https://www.mirhaandco.com/tools/color-studio",
    siteName: "Mirha & Co.",
    locale: "en_IN",
    type: "website",
  },
};

export default function ColorStudioPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Color Analysis & Harmony Studio",
    url: "https://www.mirhaandco.com/tools/color-studio",
    applicationCategory: "LifestyleApplication",
    operatingSystem: "All",
    description:
      "Interactive personal color analysis tool providing harmonic lip/cheek swatches and universal foundation shade conversion.",
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
      <ColorStudioClient />
    </>
  );
}
