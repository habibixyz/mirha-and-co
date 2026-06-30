import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Men's Grooming, Skincare & Haircare Catalog | Mirha & Co.",
  description: "Browse the expert-curated Men's Grooming collection. Compare prices, check ingredients, and find top-rated beard oils, face washes, fragrances, and tools specifically selected for Indian men.",
};

export default function MensGroomingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
