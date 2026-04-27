import { Suspense } from "react";
import SearchExperience from "@/components/SearchExperience";

export const metadata = {
  title: "Search | Mirha & Co.",
  description: "Search skincare products, routines, ingredients, and beauty guides from Mirha & Co.",
};

export default function SearchPage() {
  return (
    <Suspense fallback={<main style={{ padding: 40 }}>Loading search...</main>}>
      <SearchExperience />
    </Suspense>
  );
}
