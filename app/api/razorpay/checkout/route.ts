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
 const planType = body.planType || "monthly";

 const razorpay = getRazorpay();
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
 });
 } catch (error: any) {
 console.error("Razorpay Checkout Error:", error);
 return NextResponse.json({ error: error.message || "Something went wrong" }, { status: 500 });
 }
}
