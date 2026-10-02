"use client";

import dynamic from "next/dynamic";

// ssr:false is only allowed in Client Components (Next.js App Router rule).
// This thin wrapper lets page.tsx remain a Server Component while still
// keeping IngredientChecker out of the SSR payload entirely.
const IngredientChecker = dynamic(() => import("./IngredientChecker"), {
  ssr: false,
  loading: () => <div style={{ minHeight: "80vh" }} />,
});

export default function IngredientCheckerLoader() {
  return <IngredientChecker />;
}
