import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Personalized Skincare Routine Builder & Quiz | Mirha & Co.",
  description:
    "Take our free skincare routine quiz to build a customized AM/PM routine. Tailored for Indian skin types, climate realities, and hard water conditions.",
  keywords: [
    "skincare routine quiz",
    "personalized skincare routine India",
    "AM PM skincare routine",
    "Indian skin routine builder",
    "skincare routine for oily skin",
    "skincare routine for dry skin",
    "best skincare routine India",
  ],
  alternates: {
    canonical: "https://mirhaandco.com/tools/routine",
  },
  openGraph: {
    title: "Personalized Skincare Routine Builder & Quiz",
    description:
      "Answer a few questions about your skin type, climate, and concerns. Get a customized AM/PM skincare routine built for Indian realities — free, no sign-up required.",
    url: "https://mirhaandco.com/tools/routine",
    type: "website",
  },
};

export default function RoutineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
