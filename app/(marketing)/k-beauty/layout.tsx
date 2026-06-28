import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Curated K-Beauty Collection & Skincare Rituals | Mirha & Co.",
  description: "Discover the South Korean philosophy of gentle, multi-layered hydration. Shop curated K-Beauty products for double cleansing, glass skin, and barrier repair.",
  openGraph: {
    title: "Curated K-Beauty Collection & Skincare Rituals | Mirha & Co.",
    description: "Discover the South Korean philosophy of gentle, multi-layered hydration. Shop curated K-Beauty products for double cleansing, glass skin, and barrier repair.",
  },
};

export default function KBeautyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
