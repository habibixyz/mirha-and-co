import { NextResponse } from "next/server";
import { Webhook } from "standardwebhooks";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const webhookId = req.headers.get("webhook-id") || "";
    const webhookSignature = req.headers.get("webhook-signature") || "";
    const webhookTimestamp = req.headers.get("webhook-timestamp") || "";

    if (!webhookSignature || !webhookId || !webhookTimestamp) {
      return NextResponse.json({ error: "Missing webhook headers" }, { status: 400 });
    }

    const secret = process.env.DODO_WEBHOOK_SECRET || "";
    
    // In test/dev mode, bypass signature verification if secret is not yet set
    if (secret && secret !== "dodo_webhook_secret_placeholder") {
      try {
        const wh = new Webhook(secret);
        wh.verify(rawBody, {
          "webhook-id": webhookId,
          "webhook-signature": webhookSignature,
          "webhook-timestamp": webhookTimestamp,
        });
      } catch (err: any) {
        console.error("Dodo Webhook Signature Verification Failed:", err.message);
        return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
      }
    } else {
      console.warn("Dodo Webhook: Signature verification skipped because DODO_WEBHOOK_SECRET is not configured.");
    }

    const event = JSON.parse(rawBody);
    const eventType = event.type;
    const data = event.data;

    // Retrieve userId passed in checkout metadata
    const userId = data.metadata?.userId;

    if (!userId) {
      console.log("Dodo Webhook: No userId found in metadata", data.metadata);
      return NextResponse.json({ status: "ignored_no_user" });
    }

    // Handle Subscription active / updated / renewed
    if (
      eventType === "subscription.active" ||
      eventType === "subscription.renewed" ||
      eventType === "subscription.updated"
    ) {
      const endsAtDate = data.next_billing_date
        ? new Date(data.next_billing_date)
        : null;

      const subscriptionId = data.subscription_id;

      // Find user
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { subscription: true },
      });

      if (user) {
        if (user.subscription) {
          await prisma.subscription.update({
            where: { id: user.subscription.id },
            data: {
              tier: "pro",
              stripeSubscriptionId: subscriptionId, // Store Dodo subscription_id
              status: "active",
              endsAt: endsAtDate,
            },
          });
        } else {
          await prisma.subscription.create({
            data: {
              userId: user.id,
              tier: "pro",
              stripeSubscriptionId: subscriptionId,
              status: "active",
              endsAt: endsAtDate,
            },
          });
        }
        console.log(`Dodo Webhook: User ${userId} subscription activated/updated successfully.`);
      }
    }

    // Handle cancellation / expiration
    if (eventType === "subscription.cancelled" || eventType === "subscription.expired") {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { subscription: true },
      });

      if (user && user.subscription) {
        await prisma.subscription.update({
          where: { id: user.subscription.id },
          data: {
            status: "canceled",
            tier: "free",
          },
        });
        console.log(`Dodo Webhook: User ${userId} subscription set to canceled/free.`);
      }
    }

    return NextResponse.json({ status: "success" });
  } catch (error: any) {
    console.error("Dodo Webhook Error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}
