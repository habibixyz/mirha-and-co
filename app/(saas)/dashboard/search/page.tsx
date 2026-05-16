import { Suspense } from "react";
import { getUserProfile } from "../../actions";
import { SearchClient } from "./SearchClient";
import { redirect } from "next/navigation";

export default async function SearchGuidePage() {
  const user = await getUserProfile();
  
  if (!user) {
    redirect("/login");
  }

  const isPro = user.subscription?.tier === "pro";

  return (
    <Suspense fallback={<div>Loading search...</div>}>
      <SearchClient isPro={isPro} />
    </Suspense>
  );
}
