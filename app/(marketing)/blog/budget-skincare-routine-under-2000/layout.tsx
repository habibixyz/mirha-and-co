import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "4-Step Indian Skincare Routine Under ₹2000 (2026) | Mirha & Co.",
  description:
    "A simple, no-fluff skincare routine built for Indian skin, Indian weather, and Indian budgets under ₹2000 total. Cleanse, treat, moisturise, and protect.",
  openGraph: {
    title: "4-Step Indian Skincare Routine Under ₹2000 (2026) | Mirha & Co.",
    description:
      "A simple, no-fluff skincare routine built for Indian skin, Indian weather, and Indian budgets under ₹2000 total. Cleanse, treat, moisturise, and protect.",
  },
};

export default function BudgetSkincareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
