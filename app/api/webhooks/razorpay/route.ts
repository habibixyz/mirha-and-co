import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy");

function generateB2BKey(tier: string): string {
  const prefix = tier === "scale" ? "b2b_scale_" : "b2b_live_";
  return prefix + crypto.randomBytes(20).toString("hex");
}

export async function POST(req: Request) {
  try {
    const bodyText = await req.text();
    const signature = req.headers.get("x-razorpay-signature");

    if (!signature) {
      return NextResponse.json({ error: "Missing signature" }, { status: 400 });
    }

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET || "")
      .update(bodyText)
      .digest("hex");

    if (expectedSignature !== signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const event = JSON.parse(bodyText);

    // ── Subscription activated → provision B2B API key ──
    if (
      event.event === "subscription.authenticated" ||
      event.event === "subscription.activated"
    ) {
      const subscription = event.payload.subscription.entity;
      const notes = subscription.notes || {};

      // B2B subscriptions carry b2b_email and b2b_brand in notes
      const email: string = notes.b2b_email;
      const brandName: string = notes.b2b_brand || "Unknown Brand";
      const tier: string = notes.b2b_tier || "growth"; // "growth" | "scale"

      if (!email) {
        // Not a B2B subscription — fall through to regular user logic
        const userId = notes.userId;
        if (userId) {
          const user = await prisma.user.findUnique({
            where: { id: userId },
            include: { subscription: true },
          });
          if (user) {
            const endsAt = subscription.current_end
              ? new Date(subscription.current_end * 1000)
              : null;
            if (user.subscription) {
              await prisma.subscription.update({
                where: { id: user.subscription.id },
                data: { tier: "pro", stripeSubscriptionId: subscription.id, endsAt },
              });
            } else {
              await prisma.subscription.create({
                data: { userId: user.id, tier: "pro", stripeSubscriptionId: subscription.id, endsAt },
              });
            }
          }
        }
        return NextResponse.json({ status: "success" });
      }

      // ── Idempotency & Upsert Check ──
      const existing = await prisma.b2BApiKey.findFirst({ where: { email } });
      
      // If key already provisioned for this subscription and active, skip duplicate email
      if (existing && existing.razorpaySubscriptionId === subscription.id && existing.status === "active") {
        console.log(`Razorpay Webhook: Key for subscription ${subscription.id} already active. Skipping duplicate email.`);
        return NextResponse.json({ status: "success", idempotency: "already_processed" });
      }

      const monthlyQuota = tier === "scale" ? 1000000 : 150000;
      const apiKey = generateB2BKey(tier);
      const nextMonth = new Date();
      nextMonth.setDate(1);
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      nextMonth.setHours(0, 0, 0, 0);

      let savedKey;
      if (existing) {
        savedKey = await prisma.b2BApiKey.update({
          where: { id: existing.id },
          data: {
            key: apiKey,
            tier,
            monthlyQuota,
            usageThisMonth: 0,
            quotaResetAt: nextMonth,
            razorpaySubscriptionId: subscription.id,
            status: "active",
          },
        });
      } else {
        savedKey = await prisma.b2BApiKey.create({
          data: {
            key: apiKey,
            email,
            brandName,
            tier,
            monthlyQuota,
            quotaResetAt: nextMonth,
            razorpaySubscriptionId: subscription.id,
            status: "active",
          },
        });
      }

      // ── Email the API key to the client ──
      await resend.emails.send({
        from: "Mirha & Co. B2B <noreply@mirhaandco.com>",
        to: email,
        subject: `Your Mirha & Co. API Key is Ready — ${tier === "scale" ? "Scale Enterprise" : "Growth"} Tier`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background: #0a0a0a; color: #f1f5f9; border-radius: 12px;">
            <h1 style="font-size: 1.5rem; color: #fc2779; margin-bottom: 0.5rem;">Welcome to Mirha & Co. B2B</h1>
            <p style="color: #94a3b8; margin-bottom: 2rem;">Hi ${brandName} team, your subscription is active. Here is your API key:</p>
            
            <div style="background: #0f172a; border: 1px solid #1e293b; border-radius: 8px; padding: 20px; margin-bottom: 2rem; font-family: monospace; font-size: 0.9rem; word-break: break-all; color: #38bdf8;">
              ${apiKey}
            </div>

            <h2 style="font-size: 1rem; font-weight: 700; color: #fff; margin-bottom: 0.5rem;">How to use it:</h2>
            <pre style="background: #0f172a; border-radius: 8px; padding: 16px; font-size: 0.8rem; color: #38bdf8; overflow-x: auto; white-space: pre-wrap;">POST https://www.mirhaandco.com/api/v1/recommend
Content-Type: application/json

{
  "apiKey": "${apiKey}",
  "skinType": "oily",
  "mainConcern": "acne",
  "budget": "under_1000",
  "climate": {
    "city": "London",
    "temp": 18,
    "humidity": 78,
    "ppm": 280,
    "dewpoint": 14.4
  }
}</pre>

            <h2 style="font-size: 1rem; font-weight: 700; color: #fff; margin-bottom: 0.5rem; margin-top: 2rem;">Your Plan:</h2>
            <ul style="color: #94a3b8; font-size: 0.9rem; line-height: 1.8;">
              <li>Tier: <strong style="color: #fff;">${tier === "scale" ? "Scale Enterprise" : "Growth"}</strong></li>
              <li>Monthly quota: <strong style="color: #fc2779;">${monthlyQuota.toLocaleString()} API calls</strong></li>
              <li>Hard Water Matrix: <strong style="color: #10b981;">✓ Enabled — pass <code>ppm</code> in climate object</strong></li>
              ${tier === "scale" ? '<li>Dewpoint Adjusters: <strong style="color: #10b981;">✓ Enabled — pass <code>dewpoint</code> in climate object</strong></li>' : ""}
            </ul>

            <p style="color: #94a3b8; font-size: 0.85rem; margin-top: 2rem;">
              Keep this key private. Do not expose it in client-side code. Reply to this email to reach our B2B support team.
            </p>
            <p style="color: #fc2779; font-size: 0.85rem;">— Mirha & Co. Team</p>
          </div>
        `,
      });

      return NextResponse.json({ status: "success", keyProvisioned: true });
    }

    // ── Subscription cancelled → suspend key ──
    if (
      event.event === "subscription.cancelled" ||
      event.event === "subscription.halted"
    ) {
      const subscription = event.payload.subscription.entity;
      await prisma.b2BApiKey.updateMany({
        where: { razorpaySubscriptionId: subscription.id },
        data: { status: "suspended" },
      });
      // Also handle regular user subscriptions
      await prisma.subscription.updateMany({
        where: { stripeSubscriptionId: subscription.id },
        data: { tier: "free", status: "cancelled", endsAt: new Date() },
      });
    }

    return NextResponse.json({ status: "success" });
  } catch (error: any) {
    console.error("Razorpay Webhook Error:", error);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }
}
