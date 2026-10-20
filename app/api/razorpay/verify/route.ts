import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session || !session.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    const { orderId, paymentId, signature, subscriptionId } = body;

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      return NextResponse.json({ error: "Server configuration missing" }, { status: 500 });
    }

    // Verify Order (One-time payment)
    if (orderId && paymentId && signature) {
      const generatedSignature = crypto
        .createHmac("sha256", keySecret)
        .update(`${orderId}|${paymentId}`)
        .digest("hex");

      if (generatedSignature !== signature) {
        return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
      }

      // 1 Year / Lifetime VIP Protocol Pass
      const oneYearFromNow = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);

      await prisma.subscription.upsert({
        where: { userId: session.userId },
        create: {
          userId: session.userId,
          tier: "pro",
          stripeSubscriptionId: `rzp_order_${paymentId}`,
          status: "active",
          endsAt: oneYearFromNow
        },
        update: {
          tier: "pro",
          stripeSubscriptionId: `rzp_order_${paymentId}`,
          status: "active",
          endsAt: oneYearFromNow
        }
      });

      return NextResponse.json({ success: true, message: "Protocol pass activated" });
    }

    // Verify Subscription
    if (subscriptionId && paymentId && signature) {
      const generatedSignature = crypto
        .createHmac("sha256", keySecret)
        .update(`${paymentId}|${subscriptionId}`)
        .digest("hex");

      if (generatedSignature !== signature) {
        return NextResponse.json({ error: "Invalid subscription signature" }, { status: 400 });
      }

      await prisma.subscription.upsert({
        where: { userId: session.userId },
        create: {
          userId: session.userId,
          tier: "pro",
          stripeSubscriptionId: subscriptionId,
          status: "active"
        },
        update: {
          tier: "pro",
          stripeSubscriptionId: subscriptionId,
          status: "active"
        }
      });

      return NextResponse.json({ success: true, message: "Subscription verified" });
    }

    return NextResponse.json({ error: "Missing verification parameters" }, { status: 400 });
  } catch (error: any) {
    console.error("Razorpay verify error:", error);
    return NextResponse.json({ error: error.message || "Verification failed" }, { status: 500 });
  }
}
