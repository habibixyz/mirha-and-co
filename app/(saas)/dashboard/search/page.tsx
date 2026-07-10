import { Suspense } from "react";
import { getUserProfile } from "../../actions";
import { SearchClient } from "./SearchClient";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function SearchGuidePage() {
 const user = await getUserProfile();
 
 if (!user) {
 redirect("/login");
 }

 const isPro = user.subscription?.tier === "pro";

 let blacklist: string[] = [];
 if (user.skinProfile) {
 try {
 const profile = JSON.parse(user.skinProfile);
 blacklist = profile.blacklist || [];
 } catch (e) {
 // ignore
 }
 }

 return (
 <Suspense fallback={<div>Loading search...</div>}>
 <SearchClient isPro={isPro} blacklist={blacklist} />
 </Suspense>
 );
}
