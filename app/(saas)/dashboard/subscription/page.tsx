import { getUserProfile } from "../../actions";
import { SubscriptionClient } from "./SubscriptionClient";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function SubscriptionPage() {
 const user = await getUserProfile();
 
 if (!user) {
 redirect("/login");
 }

 const isPro = user.subscription?.tier === "pro";

 return <SubscriptionClient isPro={isPro} />;
}
