import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signatureHeader = req.headers.get("paddle-signature") || "";

    if (!signatureHeader) {
      return NextResponse.json({ error: "Missing signature" }, { status: 400 });
    }

    // Parse Paddle-Signature header (ts=1690000000;h1=hash)
    const parts = signatureHeader.split(";");
    const tsPart = parts.find((p) => p.startsWith("ts="));
    const h1Part = parts.find((p) => p.startsWith("h1="));

    if (!tsPart || !h1Part) {
      return NextResponse.json({ error: "Invalid signature format" }, { status: 400 });
    }

    const ts = tsPart.split("=")[1];
    const h1 = h1Part.split("=")[1];

    // Compute expected signature
    const secret = process.env.PADDLE_WEBHOOK_SECRET || "";
    const message = `${ts}:${rawBody}`;
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(message)
      .digest("hex");

    if (expectedSignature !== h1) {
      console.error("Paddle Webhook Signature Mismatch!");
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const event = JSON.parse(rawBody);
    const eventType = event.event_type;
    const data = event.data;

    // Retrieve userId passed in checkout custom_data
    const userId = data.custom_data?.userId;

    if (!userId) {
      console.log("Paddle Webhook: No userId found in custom_data");
      return NextResponse.json({ status: "ignored_no_user" });
    }

    // Handle Subscription Created/Activated/Updated
    if (
      eventType === "subscription.activated" ||
      eventType === "subscription.updated"
    ) {
      const endsAtDate = data.current_billing_period?.ends_at
        ? new Date(data.current_billing_period.ends_at)
        : null;

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
              stripeSubscriptionId: data.id, // Storing Paddle subscription ID in this field
              status: "active",
              endsAt: endsAtDate,
            },
          });
        } else {
          await prisma.subscription.create({
            data: {
              userId: user.id,
              tier: "pro",
              stripeSubscriptionId: data.id,
              status: "active",
              endsAt: endsAtDate,
            },
          });
        }
        console.log(`Paddle Webhook: User ${userId} subscription activated.`);
      }
    }

    // Handle One-Time purchases (e.g. transactions)
    if (eventType === "transaction.completed") {
      const type = data.custom_data?.type;

      if (type === "onetime_scan") {
        // Increment user's credits
        await prisma.user.update({
          where: { id: userId },
          data: {
            credits: { increment: 1 },
          },
        });
        console.log(`Paddle Webhook: Incremented credits for user ${userId}.`);
      }
    }

    return NextResponse.json({ status: "success" });
  } catch (error: any) {
    console.error("Paddle Webhook Error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}
