import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hard Water Hair & Skin Damage Test | Mirha & Co.",
  description: "Calculate your water hardness risk score. Get personalized recovery routines, dermatologist-backed chelating shampoo guides, and skin barrier recommendations tailored for Indian cities like Bangalore, Delhi, and Mumbai.",
};

export default function HardWaterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
