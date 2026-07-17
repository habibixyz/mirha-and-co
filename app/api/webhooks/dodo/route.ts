import { NextResponse } from "next/server";
import { Webhook } from "standardwebhooks";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy");

function generateB2BKey(tier: string): string {
  const prefix = tier === "scale" ? "b2b_scale_" : "b2b_live_";
  return prefix + crypto.randomBytes(20).toString("hex");
}

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
    
    if (!secret || secret === "dodo_webhook_secret_placeholder") {
      console.error("Dodo Webhook: Signature verification failed - DODO_WEBHOOK_SECRET is not configured.");
      return NextResponse.json({ error: "Webhook server misconfigured" }, { status: 500 });
    }

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

    const event = JSON.parse(rawBody);
    const eventType = event.type;
    const data = event.data;

    // Retrieve metadata
    const userId = data.metadata?.userId;
    const b2bEmail = data.metadata?.b2b_email;

    if (!userId && !b2bEmail) {
      console.log("Dodo Webhook: No relevant metadata found", data.metadata);
      return NextResponse.json({ status: "ignored_no_metadata" });
    }


    // Handle Subscription active / updated / renewed AND one-time payment (annual billing)
    if (
      eventType === "subscription.active" ||
      eventType === "subscription.renewed" ||
      eventType === "subscription.updated" ||
      eventType === "payment.succeeded"
    ) {
      const endsAtDate = data.next_billing_date
        ? new Date(data.next_billing_date)
        : null;

      const subscriptionId = data.subscription_id;

      // --- B2B Flow ---
      if (b2bEmail) {
        // Idempotency check: If key already provisioned and active for this subscription ID, return early
        const existing = await prisma.b2BApiKey.findFirst({ where: { email: b2bEmail } });
        if (existing && existing.razorpaySubscriptionId === subscriptionId && existing.status === "active") {
          console.log(`Dodo Webhook: Subscription ${subscriptionId} key already active. Skipping duplicate email.`);
          return NextResponse.json({ status: "success", idempotency: "already_processed" });
        }

        const brandName = data.metadata?.b2b_brand || "Unknown Brand";
        const tier = data.metadata?.b2b_tier || "growth"; // "growth" | "scale"
        const monthlyQuota = tier === "scale" ? 1000000 : 150000;
        const apiKey = generateB2BKey(tier);
        const keyHash = crypto.createHash("sha256").update(apiKey).digest("hex");
        const nextMonth = new Date();
        nextMonth.setDate(1);
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        nextMonth.setHours(0, 0, 0, 0);

        if (existing) {
          await prisma.b2BApiKey.update({
            where: { id: existing.id },
            data: {
              key: apiKey,
              keyHash,
              tier,
              monthlyQuota,
              usageThisMonth: 0,
              quotaResetAt: nextMonth,
              razorpaySubscriptionId: subscriptionId, // Using this generic field for both
              status: "active",
            },
          });
        } else {
          await prisma.b2BApiKey.create({
            data: {
              key: apiKey,
              keyHash,
              email: b2bEmail,
              brandName,
              tier,
              monthlyQuota,
              quotaResetAt: nextMonth,
              razorpaySubscriptionId: subscriptionId,
              status: "active",
            },
          });
        }

        // Email the API key to the client
        await resend.emails.send({
          from: "Mirha & Co. B2B <noreply@mirhaandco.com>",
          to: b2bEmail,
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

        console.log(`Dodo Webhook: B2B key provisioned for ${b2bEmail}`);
        return NextResponse.json({ status: "success", keyProvisioned: true });
      }

      // --- Normal User Flow ---
      // Find user
      if (userId) {
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
