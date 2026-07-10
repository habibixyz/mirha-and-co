import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hard Water Hair & Skin Damage Test | Mirha & Co.",
  description: "Calculate your water hardness risk score. Get personalized recovery routines, dermatologist-backed chelating shampoo guides, and skin barrier recommendations tailored for all states and major cities across India including Bangalore, Delhi, and Mumbai.",
  alternates: {
    canonical: "https://www.mirhaandco.com/tools/hard-water",
  },
  openGraph: {
    title: "Hard Water Hair & Skin Damage Test | Mirha & Co.",
    description:
      "Calculate your water hardness risk score and get personalized recovery routines for Indian cities and states.",
    url: "https://www.mirhaandco.com/tools/hard-water",
    type: "website",
  },
};

export default function HardWaterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
