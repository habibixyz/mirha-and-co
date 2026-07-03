import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skincare & Beauty Dupe Finder & Savings Calculator | Mirha & Co.",
  description:
    "Find active-equivalent drugstore dupes for luxury beauty brands like Estée Lauder, Olaplex, and Tatcha. Compare ingredients side-by-side and calculate your annual routine savings instantly.",
  keywords: [
    "skincare dupes India",
    "drugstore beauty dupes",
    "luxury skincare alternatives",
    "beauty savings calculator",
    "affordable skincare India",
    "Estée Lauder dupe",
    "Olaplex dupe India",
    "budget beauty routine",
  ],
  alternates: {
    canonical: "https://mirhaandco.com/tools/dupes",
  },
  openGraph: {
    title: "Beauty Dupe Finder & Savings Calculator",
    description:
      "Stop overpaying for marketing. Find active-equivalent drugstore dupes for luxury skincare, makeup, and hair care brands. Calculate your annual savings instantly.",
    url: "https://mirhaandco.com/tools/dupes",
    type: "website",
  },
};

export default function DupesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
