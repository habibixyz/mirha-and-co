import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy");
const FROM = "Mirha & Co. B2B <noreply@mirhaandco.com>";

/* ─────────────────────────────────────────────────────────────────────────────
   sendQuotaWarningEmail
   Called when a partner's usage crosses 80% of their monthly quota.
   Fires exactly once per month (checked at boundary crossing in recommend route).
───────────────────────────────────────────────────────────────────────────── */
export async function sendQuotaWarningEmail({
  email,
  brandName,
  tier,
  used,
  monthlyQuota,
  quotaResetAt,
}: {
  email: string;
  brandName: string;
  tier: string;
  used: number;
  monthlyQuota: number;
  quotaResetAt: Date;
}): Promise<void> {
  const remaining = monthlyQuota - used;
  const pctUsed = Math.round((used / monthlyQuota) * 100);
  const resetDate = quotaResetAt.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const tierLabel = tier === "scale" ? "Scale Enterprise" : "Growth";
  const upgradeUrl = "https://www.mirhaandco.com/b2b#pricing";

  if (!process.env.RESEND_API_KEY) {
    console.warn("[b2bEmail] RESEND_API_KEY not set — quota warning email skipped for", email);
    return;
  }

  try {
    await resend.emails.send({
      from: FROM,
      to: email,
      subject: `⚠️ You've used ${pctUsed}% of your Mirha API quota — ${remaining.toLocaleString()} calls left`,
      html: `
        <div style="font-family: -apple-system, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #f1f5f9; border-radius: 12px; overflow: hidden;">

          <!-- Header -->
          <div style="background: linear-gradient(135deg, #1a0a12 0%, #0a0a1a 100%); padding: 36px 32px 28px; border-bottom: 1px solid rgba(252,39,121,0.2);">
            <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em; color: #fc2779; margin-bottom: 12px;">Mirha & Co. B2B API</div>
            <h1 style="margin: 0; font-size: 22px; font-weight: 700; color: #fff; line-height: 1.3;">Quota Warning — 80% Used</h1>
            <p style="margin: 10px 0 0; color: #94a3b8; font-size: 14px;">Hi ${brandName} team, you're approaching your monthly API limit.</p>
          </div>

          <!-- Usage bar -->
          <div style="padding: 28px 32px 0;">
            <div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 8px;">
              <span style="color: #94a3b8;">Monthly usage</span>
              <span style="color: #fc2779; font-weight: 700; font-family: monospace;">${used.toLocaleString()} / ${monthlyQuota.toLocaleString()} calls (${pctUsed}%)</span>
            </div>
            <div style="height: 8px; background: rgba(255,255,255,0.08); border-radius: 99px; overflow: hidden;">
              <div style="height: 100%; width: ${pctUsed}%; background: linear-gradient(90deg, #fc2779, #f472b6); border-radius: 99px;"></div>
            </div>
            <div style="margin-top: 8px; font-size: 12px; color: #64748b;">
              <strong style="color: #f1f5f9;">${remaining.toLocaleString()} calls remaining</strong> · Quota resets on ${resetDate}
            </div>
          </div>

          <!-- Warning box -->
          <div style="margin: 24px 32px 0; background: rgba(252,39,121,0.06); border: 1px solid rgba(252,39,121,0.2); border-radius: 8px; padding: 16px 20px;">
            <p style="margin: 0; font-size: 14px; color: #f1f5f9; line-height: 1.6;">
              At your current rate, you may exhaust your <strong>${tierLabel}</strong> quota before ${resetDate}.
              Once you hit <strong>${monthlyQuota.toLocaleString()} calls</strong>, the API will return <code style="background: rgba(255,255,255,0.08); padding: 1px 5px; border-radius: 4px; font-size: 13px; color: #fc2779;">HTTP 429</code> until your quota resets.
            </p>
          </div>

          <!-- CTA -->
          <div style="padding: 24px 32px; text-align: center;">
            <a href="${upgradeUrl}" style="display: inline-block; background: #fc2779; color: #fff; text-decoration: none; padding: 13px 32px; border-radius: 8px; font-weight: 700; font-size: 14px; letter-spacing: 0.02em;">
              Upgrade Your Plan →
            </a>
            <p style="margin: 12px 0 0; font-size: 12px; color: #475569;">Or reply to this email to talk to our B2B team about a custom quota.</p>
          </div>

          <!-- What you can do -->
          <div style="padding: 0 32px 28px;">
            <h2 style="font-size: 13px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px;">Your options</h2>
            <ul style="margin: 0; padding: 0 0 0 16px; color: #94a3b8; font-size: 13px; line-height: 2;">
              <li>Upgrade to the next tier for a higher monthly quota</li>
              <li>Wait for your quota to reset on ${resetDate}</li>
              <li>Reduce request volume by caching results on your end</li>
              <li>Contact us for a custom enterprise quota</li>
            </ul>
          </div>

          <!-- Footer -->
          <div style="border-top: 1px solid rgba(255,255,255,0.06); padding: 20px 32px; display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 12px; color: #475569;">Mirha & Co. — B2B API Platform</span>
            <a href="${upgradeUrl}" style="font-size: 12px; color: #fc2779; text-decoration: none;">View Pricing →</a>
          </div>

        </div>
      `,
    });
  } catch (err) {
    console.error("[b2bEmail] Failed to send quota warning email:", err);
  }
}

/* ─────────────────────────────────────────────────────────────────────────────
   sendQuotaExhaustedEmail
   Called when a partner uses their very last API call for the month.
   Fires exactly once (when usageThisMonth + 1 === monthlyQuota).
───────────────────────────────────────────────────────────────────────────── */
export async function sendQuotaExhaustedEmail({
  email,
  brandName,
  tier,
  monthlyQuota,
  quotaResetAt,
}: {
  email: string;
  brandName: string;
  tier: string;
  monthlyQuota: number;
  quotaResetAt: Date;
}): Promise<void> {
  const resetDate = quotaResetAt.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const tierLabel = tier === "scale" ? "Scale Enterprise" : "Growth";
  const upgradeUrl = "https://www.mirhaandco.com/b2b#pricing";
  const retryAfterMs = quotaResetAt.getTime() - Date.now();
  const daysUntilReset = Math.ceil(retryAfterMs / (1000 * 60 * 60 * 24));

  if (!process.env.RESEND_API_KEY) {
    console.warn("[b2bEmail] RESEND_API_KEY not set — quota exhausted email skipped for", email);
    return;
  }

  try {
    await resend.emails.send({
      from: FROM,
      to: email,
      subject: `🚨 Your Mirha API quota is exhausted — API returning 429 until ${resetDate}`,
      html: `
        <div style="font-family: -apple-system, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #f1f5f9; border-radius: 12px; overflow: hidden;">

          <!-- Header -->
          <div style="background: linear-gradient(135deg, #1a0505 0%, #0a0a1a 100%); padding: 36px 32px 28px; border-bottom: 1px solid rgba(239,68,68,0.3);">
            <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em; color: #ef4444; margin-bottom: 12px;">Mirha & Co. B2B API — Urgent</div>
            <h1 style="margin: 0; font-size: 22px; font-weight: 700; color: #fff; line-height: 1.3;">Monthly Quota Exhausted</h1>
            <p style="margin: 10px 0 0; color: #94a3b8; font-size: 14px;">Hi ${brandName} team — your API is currently returning <code style="background: rgba(255,255,255,0.08); padding: 1px 5px; border-radius: 4px; color: #ef4444;">HTTP 429</code> for all requests.</p>
          </div>

          <!-- Status banner -->
          <div style="margin: 24px 32px 0; background: rgba(239,68,68,0.06); border: 1px solid rgba(239,68,68,0.25); border-radius: 8px; padding: 16px 20px;">
            <div style="font-size: 13px; color: #f1f5f9; line-height: 1.7;">
              <strong>Plan:</strong> ${tierLabel} — ${monthlyQuota.toLocaleString()} calls/month<br>
              <strong>Status:</strong> <span style="color: #ef4444; font-weight: 700;">QUOTA EXHAUSTED</span><br>
              <strong>Resets automatically:</strong> <span style="color: #10b981; font-weight: 700;">${resetDate}</span> (${daysUntilReset} day${daysUntilReset !== 1 ? "s" : ""} from now)
            </div>
          </div>

          <!-- Immediate action -->
          <div style="padding: 24px 32px; text-align: center;">
            <p style="margin: 0 0 16px; font-size: 14px; color: #94a3b8;">To restore API access immediately, upgrade your plan:</p>
            <a href="${upgradeUrl}" style="display: inline-block; background: #ef4444; color: #fff; text-decoration: none; padding: 13px 32px; border-radius: 8px; font-weight: 700; font-size: 14px; letter-spacing: 0.02em;">
              Upgrade Now — Restore Access →
            </a>
            <p style="margin: 12px 0 0; font-size: 12px; color: #475569;">
              Or reply to this email to arrange a temporary quota extension while your order is processed.
            </p>
          </div>

          <!-- What's happening -->
          <div style="padding: 0 32px 28px;">
            <h2 style="font-size: 13px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px;">What's happening right now</h2>
            <ul style="margin: 0; padding: 0 0 0 16px; color: #94a3b8; font-size: 13px; line-height: 2;">
              <li>All calls to <code style="color: #94a3b8;">/api/v1/recommend</code> return <code style="color: #ef4444;">HTTP 429</code></li>
              <li>The response includes a <code style="color: #94a3b8;">Retry-After</code> header with seconds until reset</li>
              <li>Your quota resets automatically on ${resetDate} at 00:00 UTC</li>
              <li>No data or configuration is lost — your key is still active</li>
            </ul>
          </div>

          <!-- Footer -->
          <div style="border-top: 1px solid rgba(255,255,255,0.06); padding: 20px 32px; display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 12px; color: #475569;">Mirha & Co. — B2B API Platform</span>
            <a href="${upgradeUrl}" style="font-size: 12px; color: #ef4444; text-decoration: none; font-weight: 700;">Upgrade Now →</a>
          </div>

        </div>
      `,
    });
  } catch (err) {
    console.error("[b2bEmail] Failed to send quota exhausted email:", err);
  }
}
