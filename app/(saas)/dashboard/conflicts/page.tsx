import { getUserProfile } from "../../actions";
import { ConflictsClient } from "./ConflictsClient";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function ConflictsPage() {
 const user = await getUserProfile();

 if (!user) {
 redirect("/login");
 }

 const isPro = user.subscription?.tier === "pro" && user.subscription?.status === "active";

 let blacklist: string[] = [];
 if (user.skinProfile) {
 try {
 const profile = JSON.parse(user.skinProfile);
 blacklist = profile.blacklist || [];
 } catch (e) {
 // ignore
 }
 }

 return <ConflictsClient isPro={isPro} initialBlacklist={blacklist} />;
}
