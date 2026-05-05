import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const bodyText = await req.text();
    const signature = req.headers.get("x-razorpay-signature");

    if (!signature) {
      return NextResponse.json({ error: "Missing signature" }, { status: 400 });
    }

    // Verify signature
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET || "")
      .update(bodyText)
      .digest("hex");

    if (expectedSignature !== signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const event = JSON.parse(bodyText);

    // If subscription is authenticated or activated
    if (event.event === "subscription.authenticated" || event.event === "subscription.activated") {
      const subscription = event.payload.subscription.entity;
      
      const userId = subscription.notes?.userId;
      if (userId) {
        // Find user by userId in prisma
        const user = await prisma.user.findUnique({
          where: { id: userId },
          include: { subscription: true }
        });

        if (user) {
          const endsAtDate = subscription.current_end ? new Date(subscription.current_end * 1000) : null;
          
          if (user.subscription) {
            await prisma.subscription.update({
              where: { id: user.subscription.id },
              data: {
                tier: "pro",
                stripeSubscriptionId: subscription.id, // Reusing this field for Razorpay subscription ID
                endsAt: endsAtDate
              }
            });
          } else {
            await prisma.subscription.create({
              data: {
                userId: user.id,
                tier: "pro",
                stripeSubscriptionId: subscription.id,
                endsAt: endsAtDate
              }
            });
          }
        }
      }
    }

    return NextResponse.json({ status: "success" });
  } catch (error: any) {
    console.error("Razorpay Webhook Error:", error);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }
}
