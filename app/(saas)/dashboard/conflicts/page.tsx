import { getUserProfile } from "../../actions";
import { ConflictsClient } from "./ConflictsClient";
import { redirect } from "next/navigation";

export default async function ConflictsPage() {
 const user = await getUserProfile();

 if (!user) {
 redirect("/login");
 }

 const isPro = user.subscription?.tier === "pro" && user.subscription?.status === "active";

 return <ConflictsClient isPro={isPro} />;
}
