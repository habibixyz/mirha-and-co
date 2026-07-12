import { getUserProfile } from "../../actions";
import { SubscriptionClient } from "./SubscriptionClient";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function SubscriptionPage() {
  const user = await getUserProfile();
  
  if (!user) {
    redirect("/login");
  }

  const isPro = user.subscription?.tier === "pro" && user.subscription?.status === "active";
  const subscriptionId = user.subscription?.stripeSubscriptionId || null;
  
  let provider: "dodo" | "razorpay" | null = null;
  let cleanSubscriptionId = subscriptionId;
  
  if (subscriptionId) {
    if (subscriptionId.startsWith("dodo_")) {
      provider = "dodo";
      cleanSubscriptionId = subscriptionId.replace("dodo_", "");
    } else {
      provider = "razorpay";
    }
  }

  return (
    <SubscriptionClient 
      isPro={isPro} 
      subscriptionId={cleanSubscriptionId}
      provider={provider}
      userId={user.id}
    />
  );
}
