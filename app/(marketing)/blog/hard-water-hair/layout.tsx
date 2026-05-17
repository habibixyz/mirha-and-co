import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Why Your Hair Won't Stop Falling (Hard Water India Guide) | Mirha & Co.",
  description:
    "The complete guide to hard water hair damage in India. Learn the signs of mineral buildup, how it causes hair fall, and the exact routine to repair your scalp.",
  openGraph: {
    title: "Why Your Hair Won't Stop Falling (Hard Water India Guide) | Mirha & Co.",
    description:
      "The complete guide to hard water hair damage in India. Learn the signs of mineral buildup, how it causes hair fall, and the exact routine to repair your scalp.",
  },
};

export default function HardWaterHairLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
