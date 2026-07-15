import { NextResponse } from "next/server";
import { getRazorpay } from "@/lib/razorpay";

// Tier pricing in paise (INR) — or USD cents if using international
// Growth: $499/mo = ₹41,500/mo approx | Scale: $1,899/mo = ₹1,58,000/mo approx
const TIER_CONFIG = {
  growth: {
    monthly: { amount: 4150000, label: "Growth Tier — Monthly ($499/mo)" },
    annual:  { amount: 39840000, label: "Growth Tier — Annual ($399/mo × 12)" },
    quota: 150000,
  },
  scale: {
    monthly: { amount: 15800000, label: "Scale Enterprise — Monthly ($1,899/mo)" },
    annual:  { amount: 15168000, label: "Scale Enterprise — Annual ($1,499/mo × 12)" },
    quota: 1000000,
  },
} as const;

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { tier = "growth", billing = "monthly", email, brandName } = body;

    if (!email || !brandName) {
      return NextResponse.json(
        { error: "email and brandName are required" },
        { status: 400 }
      );
    }

    if (!["growth", "scale"].includes(tier)) {
      return NextResponse.json({ error: "Invalid tier" }, { status: 400 });
    }

    const razorpay = getRazorpay();
    const config = TIER_CONFIG[tier as keyof typeof TIER_CONFIG];
    const pricing = billing === "annual" ? config.annual : config.monthly;

    // Create or find a Razorpay plan for this tier+billing combo
    let planId = "";
    try {
      const plans = await razorpay.plans.all({ count: 50 });
      const existing = plans.items.find(
        (p: any) =>
          p.item.amount === pricing.amount &&
          p.item.currency === "INR" &&
          p.period === (billing === "annual" ? "yearly" : "monthly")
      );
      if (existing) {
        planId = existing.id;
      } else {
        const newPlan = await razorpay.plans.create({
          period: billing === "annual" ? "yearly" : "monthly",
          interval: 1,
          item: {
            name: pricing.label,
            amount: pricing.amount,
            currency: "INR",
            description: `Mirha & Co. B2B API — ${pricing.label}`,
          },
        });
        planId = newPlan.id;
      }
    } catch (err: any) {
      throw new Error("Failed to configure plan in Razorpay: " + err.message);
    }

    // Create the subscription with B2B metadata in notes
    const subscription = await razorpay.subscriptions.create({
      plan_id: planId,
      customer_notify: 1,
      total_count: billing === "annual" ? 10 : 120,
      notes: {
        b2b_email: email,
        b2b_brand: brandName,
        b2b_tier: tier,
      },
    });

    return NextResponse.json({
      subscriptionId: subscription.id,
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      tier,
      billing,
      quota: config.quota,
      amount: pricing.amount,
    });
  } catch (error: any) {
    console.error("B2B Checkout Error:", error);
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
