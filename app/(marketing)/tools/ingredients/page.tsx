import type { Metadata } from "next";
import IngredientChecker from "./IngredientChecker";

// ─── SEO METADATA ────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Skincare Ingredient Compatibility Checker — Mirha & Co.",
  description:
    "Find out if your skincare actives are safe to layer together. Check conflicts between Retinol, Vitamin C, AHAs, BHAs, Niacinamide, Peptides, and 20+ more ingredients. Get a personalized AM/PM routine schedule instantly.",
  keywords: [
    "skincare ingredient checker",
    "ingredient compatibility",
    "can I use retinol with vitamin c",
    "niacinamide and vitamin c together",
    "skincare layering guide",
    "AHA BHA retinol combination",
    "skincare conflict checker",
    "active ingredients routine",
    "skincare routine builder",
  ],
  alternates: {
    canonical: "https://mirhaandco.com/tools/ingredients",
  },
  openGraph: {
    title: "Skincare Ingredient Compatibility Checker",
    description:
      "Stop guessing what actives to layer. Get instant compatibility analysis for 20+ skincare ingredients — from Retinol to Copper Peptides — plus a safe AM/PM routine schedule.",
    url: "https://mirhaandco.com/tools/ingredients",
    type: "website",
    images: [
      {
        url: "https://mirhaandco.com/og/ingredient-checker.jpg",
        width: 1200,
        height: 630,
        alt: "Mirha & Co. Skincare Ingredient Compatibility Checker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Skincare Ingredient Compatibility Checker — Mirha & Co.",
    description:
      "Find out if your skincare actives are safe to use together. Instant AM/PM routine advice for Retinol, Vitamin C, AHAs, Niacinamide, Peptides & more.",
    images: ["https://mirhaandco.com/og/ingredient-checker.jpg"],
  },
};

// ─── JSON-LD STRUCTURED DATA (WebApplication + FAQPage) ──────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Skincare Ingredient Compatibility Checker",
      url: "https://mirhaandco.com/tools/ingredients",
      applicationCategory: "HealthApplication",
      description:
        "An interactive skincare tool that checks chemical compatibility between active ingredients like Retinol, Vitamin C, AHAs, BHAs, Niacinamide and more. It generates a safe AM/PM routine schedule based on your selection.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      operatingSystem: "Any",
      browserRequirements: "Requires JavaScript",
      creator: {
        "@type": "Organization",
        name: "Mirha & Co.",
        url: "https://mirhaandco.com",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Can I use Retinol and Vitamin C together?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Using Retinol and Vitamin C together is generally a caution. Their opposing pH levels can decrease each ingredient's efficacy. The best practice is to apply Vitamin C in the morning under your SPF, and Retinol in the evening.",
          },
        },
        {
          "@type": "Question",
          name: "Can I use Niacinamide with Vitamin C?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes! Niacinamide and Vitamin C are a highly synergistic pairing. Vitamin C neutralizes free radicals while Niacinamide repairs the skin barrier and evens tone. Layer them together in the morning, applying Vitamin C first, then Niacinamide, then SPF.",
          },
        },
        {
          "@type": "Question",
          name: "Can I mix AHA and BHA?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "AHAs (like Glycolic or Lactic Acid) and BHAs (like Salicylic Acid) can be used together but with caution, as layering multiple exfoliants increases the risk of irritation and a damaged skin barrier. It is safer to alternate them — using one in the morning and the other at night, or on different days.",
          },
        },
        {
          "@type": "Question",
          name: "Can I use Retinol with Salicylic Acid?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Retinol and Salicylic Acid are a high-conflict combination. Layering them risks severe irritation, flaking, and a damaged skin barrier. Use Salicylic Acid in the morning and Retinol in the evening, or alternate them on different nights.",
          },
        },
        {
          "@type": "Question",
          name: "What skincare ingredients should not be mixed?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Key combinations to avoid include: Retinol + AHAs/BHAs (risk of over-exfoliation), Vitamin C + Copper Peptides (Copper degrades Vitamin C), and Retinol + Benzoyl Peroxide (Benzoyl Peroxide oxidizes Retinol). Always use the Ingredient Compatibility Checker for personalized advice.",
          },
        },
      ],
    },
  ],
};

export default function IngredientsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <IngredientChecker />
    </>
  );
}
