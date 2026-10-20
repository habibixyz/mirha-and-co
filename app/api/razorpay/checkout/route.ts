import { NextResponse } from "next/server";
import { getRazorpay } from "@/lib/razorpay";
import { getSession } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session || !session.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    const planType = body.planType || "onetime";

    const razorpay = getRazorpay();

    // 1. One-time Protocol Pass (High-conversion UPI / RuPay / Cards — zero recurring friction)
    if (planType === "onetime" || planType === "protocol" || planType === "protocol_pass") {
      const amount = 19900; // ₹199 in paise
      const order = await razorpay.orders.create({
        amount,
        currency: "INR",
        receipt: `rcpt_${session.userId.slice(-6)}_${Date.now().toString().slice(-6)}`,
        notes: {
          userId: session.userId,
          planType: "protocol_pass",
        },
      });

      return NextResponse.json({
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        isOrder: true,
      });
    }

    // 2. Subscriptions (Yearly or Monthly)
    let planId = "";

    if (planType === "yearly") {
      try {
        const plans = await razorpay.plans.all();
        const existingYearly = plans.items.find(
          (p: any) => p.period === "yearly" && p.item.amount === 149900 && p.item.currency === "INR"
        );
        if (existingYearly) {
          planId = existingYearly.id;
        } else {
          const newPlan = await razorpay.plans.create({
            period: "yearly",
            interval: 1,
            item: {
              name: "Mirha Pro Yearly",
              amount: 149900,
              currency: "INR",
              description: "Annual Pro Subscription",
            },
          });
          planId = newPlan.id;
        }
      } catch (err: any) {
        console.error("Error creating yearly plan in Razorpay:", err);
        throw new Error("Failed to configure yearly plan in Razorpay: " + err.message);
      }
    } else {
      planId = process.env.RAZORPAY_PRO_PLAN_ID || "";
      if (!planId) {
        throw new Error("Razorpay Monthly Plan ID is not configured");
      }
    }

    // Create a new subscription in Razorpay
    const subscription = await razorpay.subscriptions.create({
      plan_id: planId,
      customer_notify: 1,
      total_count: planType === "yearly" ? 10 : 120, // 10 years max for annual
      notes: {
        userId: session.userId,
      },
    });

    return NextResponse.json({
      subscriptionId: subscription.id,
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      isOrder: false,
    });
  } catch (error: any) {
    console.error("Razorpay Checkout Error:", error);
    return NextResponse.json({ error: error.message || "Something went wrong" }, { status: 500 });
  }
}
