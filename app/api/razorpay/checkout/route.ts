import { NextResponse } from "next/server";
import { getRazorpay } from "@/lib/razorpay";
import { getSession } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session || !session.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const planId = process.env.RAZORPAY_PRO_PLAN_ID;
    if (!planId) {
      throw new Error("Razorpay Plan ID is not configured");
    }

    const razorpay = getRazorpay();

    // Create a new subscription in Razorpay
    const subscription = await razorpay.subscriptions.create({
      plan_id: planId,
      customer_notify: 1,
      total_count: 120, // Example: billing for 10 years max
      notes: {
        userId: session.userId,
      },
    });

    return NextResponse.json({
      subscriptionId: subscription.id,
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    });
  } catch (error: any) {
    console.error("Razorpay Checkout Error:", error);
    return NextResponse.json({ error: error.message || "Something went wrong" }, { status: 500 });
  }
}
