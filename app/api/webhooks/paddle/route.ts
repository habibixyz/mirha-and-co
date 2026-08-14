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

 const timestampSeconds = Number(ts);
 if (!Number.isFinite(timestampSeconds) || Math.abs(Date.now() / 1000 - timestampSeconds) > 300) {
 return NextResponse.json({ error: "Stale or invalid signature timestamp" }, { status: 400 });
 }

 // Compute expected signature
 const secret = process.env.PADDLE_WEBHOOK_SECRET;
 if (!secret) {
 console.error("Paddle Webhook: PADDLE_WEBHOOK_SECRET is not configured.");
 return NextResponse.json({ error: "Webhook server misconfigured" }, { status: 500 });
 }
 const message = `${ts}:${rawBody}`;
 const expectedSignature = crypto
 .createHmac("sha256", secret)
 .update(message)
 .digest("hex");

  const expectedBuf = Buffer.from(expectedSignature);
  const h1Buf = Buffer.from(h1);

  if (expectedBuf.length !== h1Buf.length || !crypto.timingSafeEqual(expectedBuf, h1Buf)) {
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
            stripeSubscriptionId: "paddle_" + data.id, // Prefix to identify Paddle
            status: "active",
            endsAt: endsAtDate,
          },
        });
      } else {
        await prisma.subscription.create({
          data: {
            userId: user.id,
            tier: "pro",
            stripeSubscriptionId: "paddle_" + data.id,
            status: "active",
            endsAt: endsAtDate,
          },
        });
      }
      console.log(`Paddle Webhook: User ${userId} subscription activated.`);
    }
  }

  // Handle Cancellation
  if (eventType === "subscription.canceled") {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { subscription: true },
    });

    if (user && user.subscription) {
      await prisma.subscription.update({
        where: { id: user.subscription.id },
        data: {
          tier: "free",
          status: "canceled",
          endsAt: new Date(),
        },
      });
      console.log(`Paddle Webhook: Downgraded user ${userId} to free (subscription canceled).`);
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
