import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Indian Pigmentation Playbook — Fade Dark Spots & Melasma | Mirha & Co.",
  description:
    "A dermatologist-backed playbook for treating hyperpigmentation, dark spots, and melasma in Indian skin. Science-based ingredient analysis and product reviews.",
  openGraph: {
    title: "The Indian Pigmentation Playbook — Fade Dark Spots & Melasma | Mirha & Co.",
    description:
      "A dermatologist-backed playbook for treating hyperpigmentation, dark spots, and melasma in Indian skin. Science-based ingredient analysis and product reviews.",
  },
};

export default function PigmentationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
