import fs from "fs";
import path from "path";
import { Resend } from "resend";

function loadEnv() {
  const envFiles = [".env.local", ".env"];
  for (const file of envFiles) {
    const fullPath = path.join(process.cwd(), file);
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, "utf-8");
      content.split("\n").forEach((line) => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
          const [key, ...valueParts] = trimmed.split("=");
          const val = valueParts.join("=").replace(/^["']|["']$/g, "").trim();
          if (!process.env[key.trim()]) {
            process.env[key.trim()] = val;
          }
        }
      });
    }
  }
}

loadEnv();

const resend = new Resend(process.env.RESEND_API_KEY);
const senderEmail = process.env.PASSWORD_RESET_FROM || "Mirha & Co. <noreply@mirhaandco.com>";
const replyToEmail = "tanizcoldz@gmail.com";
const targetEmail = process.argv[2] || "tanizcoldz@gmail.com";
const recipientName = "Tanvir";

const HERO_IMAGE_URL =
  "https://azsofabirbgovazlfzvn.supabase.co/storage/v1/object/public/blog-images/diwali_unisex_festive_glow.jpg";
const BLOG_URL = "https://www.mirhaandco.com/blog/diwali-skincare-prep-glow-protocol";

export function getDiwaliEmailHtml(name = "there") {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>The 14-Day Pre-Diwali Glass Skin Protocol</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f7f4ef; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1c1917; -webkit-font-smoothing: antialiased;">
  <div style="max-width: 600px; margin: 24px auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e7ded5; box-shadow: 0 4px 20px rgba(0,0,0,0.04);">
    
    <!-- Top Brand Bar -->
    <div style="background-color: #121110; padding: 18px 24px; text-align: center; border-bottom: 1px solid #26221f;">
      <a href="https://www.mirhaandco.com" style="color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase;">
        MIRHA &amp; CO.
      </a>
    </div>

    <!-- Festive Hero Image -->
    <div style="width: 100%; background-color: #1c1611; text-align: center;">
      <a href="${BLOG_URL}" style="display: block; text-decoration: none;">
        <img 
          src="${HERO_IMAGE_URL}" 
          alt="14-Day Pre-Diwali Glass Skin Protocol" 
          style="width: 100%; max-height: 320px; object-fit: cover; display: block; border: 0;"
        />
      </a>
    </div>

    <!-- Main Content Container -->
    <div style="padding: 36px 32px 28px;">
      
      <!-- Festive Badge -->
      <div style="display: inline-block; background-color: #fef3c7; border: 1px solid #fde68a; border-radius: 999px; padding: 4px 14px; margin-bottom: 18px;">
        <span style="font-size: 11px; font-weight: 700; color: #92400e; letter-spacing: 0.12em; text-transform: uppercase;">
          Festive Skincare Protocol
        </span>
      </div>

      <h1 style="font-family: Georgia, 'Times New Roman', serif; font-size: 26px; line-height: 1.3; font-weight: normal; color: #181513; margin: 0 0 18px;">
        The 14-Day Pre-Diwali Protocol: Glass Skin &amp; Detox for Men &amp; Women
      </h1>

      <p style="font-size: 15px; line-height: 1.7; color: #44403c; margin: 0 0 16px;">
        Hi ${name || "there"},
      </p>

      <p style="font-size: 15px; line-height: 1.7; color: #44403c; margin: 0 0 16px;">
        Tanvir here from <strong>Mirha &amp; Co.</strong>
      </p>

      <p style="font-size: 15px; line-height: 1.7; color: #44403c; margin: 0 0 16px;">
        Every October across India, our skin faces an environmental perfect storm. Between late festive nights, sugar spikes from sweets, dry autumn winds, and post-shaving irritation, our skin barrier gets severely compromised just as Diwali cards parties kick off.
      </p>

      <p style="font-size: 15px; line-height: 1.7; color: #44403c; margin: 0 0 24px;">
        Most people make the mistake of rushing into last-minute salon bleach or harsh chemical peels within days of Diwali—which strips the acid mantle and triggers angry rebound redness when exposed to firecracker smoke.
      </p>

      <!-- Roadmap Box -->
      <div style="background-color: #fcfbf9; border: 1px solid #e7ded5; border-radius: 12px; padding: 24px 20px; margin: 28px 0 32px;">
        <p style="margin: 0 0 16px; font-size: 12px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: #a27b5c;">
          Your 14-Day Step-by-Step Roadmap
        </p>

        <!-- Phase 1 -->
        <div style="margin-bottom: 16px; padding-bottom: 16px; border-bottom: 1px solid #ede6dd;">
          <div style="font-size: 14px; font-weight: 700; color: #181513; margin-bottom: 4px;">
            1. Days 1–4: Gentle Pore &amp; Texture Reset
          </div>
          <div style="font-size: 13px; line-height: 1.6; color: #6b635b;">
            Unclog sweat, excess sebum, and post-shaving debris using buffered BHA and calming clay masks—without triggering a purge.
          </div>
        </div>

        <!-- Phase 2 -->
        <div style="margin-bottom: 16px; padding-bottom: 16px; border-bottom: 1px solid #ede6dd;">
          <div style="font-size: 14px; font-weight: 700; color: #181513; margin-bottom: 4px;">
            2. Days 5–8: Stratum Corneum Lipid Seal
          </div>
          <div style="font-size: 13px; line-height: 1.6; color: #6b635b;">
            Lock in deep hydration using bio-compatible ceramides and squalane to prevent trans-epidermal water loss (TEWL) in dry October air.
          </div>
        </div>

        <!-- Phase 3 -->
        <div style="margin-bottom: 16px; padding-bottom: 16px; border-bottom: 1px solid #ede6dd;">
          <div style="font-size: 14px; font-weight: 700; color: #181513; margin-bottom: 4px;">
            3. Days 9–12: Radiant Glow Without Irritation
          </div>
          <div style="font-size: 13px; line-height: 1.6; color: #6b635b;">
            Introduce gentle radiance boosters like Alpha Arbutin &amp; Azelaic Acid to fade hyperpigmentation without sun sensitivity or peeling.
          </div>
        </div>

        <!-- Phase 4 -->
        <div style="margin-bottom: 0;">
          <div style="font-size: 14px; font-weight: 700; color: #181513; margin-bottom: 4px;">
            4. Days 13–14 &amp; Diwali Day: Glass Skin Shield
          </div>
          <div style="font-size: 13px; line-height: 1.6; color: #6b635b;">
            Anti-pollution primer shield that stops airborne firecracker smog and carbon soot from binding to pores during festive evenings.
          </div>
        </div>
      </div>

      <!-- CTA Button -->
      <div style="text-align: center; margin: 34px 0 28px;">
        <a 
          href="${BLOG_URL}" 
          style="background-color: #181513; color: #ffffff; text-decoration: none; padding: 16px 36px; border-radius: 10px; font-weight: 600; font-size: 14px; letter-spacing: 0.04em; display: inline-block; box-shadow: 0 4px 14px rgba(0,0,0,0.12);"
        >
          Read the 14-Day Diwali Protocol &rarr;
        </a>
      </div>

      <!-- Founder Note on Replies -->
      <div style="background-color: #faf7f2; border-left: 3px solid #d4a373; padding: 16px 18px; border-radius: 6px; margin: 28px 0 24px;">
        <p style="margin: 0; font-size: 13px; line-height: 1.6; color: #575047;">
          <strong>Have a question about your specific skin type or product compatibility?</strong><br />
          Just hit reply to this email, write to me directly at <a href="mailto:${replyToEmail}" style="color: #181513; text-decoration: underline;">${replyToEmail}</a>, or DM us on Instagram <a href="https://www.instagram.com/mirha_andco/" target="_blank" style="color: #fc2779; font-weight: 600; text-decoration: none;">@mirha_andco</a>. I personally read and respond to every note.
        </p>
      </div>

      <!-- Signoff -->
      <div style="border-top: 1px solid #f0eae1; margin-top: 28px; padding-top: 20px; font-size: 14px; color: #575047; line-height: 1.6;">
        Warm festive wishes,<br />
        <strong style="color: #181513;">Tanvir Khan</strong><br />
        <span style="font-size: 12px; color: #8c827a;">Founder &amp; Formulations Curator · Mirha &amp; Co.</span>
      </div>

    </div>

    <!-- Footer -->
    <div style="background-color: #faf8f5; border-top: 1px solid #ede6dd; padding: 20px 24px; text-align: center; font-size: 11px; color: #8c827a; line-height: 1.6;">
      <p style="margin: 0 0 8px;">
        Mirha &amp; Co. — Evidence-based skincare, water telemetry &amp; honest product curation.
      </p>
      <p style="margin: 0;">
        <a href="https://www.mirhaandco.com" style="color: #8c827a; text-decoration: underline;">Visit Website</a> &nbsp;·&nbsp;
        <a href="${BLOG_URL}" style="color: #8c827a; text-decoration: underline;">Diwali Guide</a> &nbsp;·&nbsp;
        <a href="https://www.instagram.com/mirha_andco/" target="_blank" style="color: #8c827a; text-decoration: underline;">Instagram @mirha_andco</a>
      </p>
    </div>

  </div>
</body>
</html>
  `;
}

async function run() {
  console.log(`Sending Diwali test email to ${targetEmail}...`);
  console.log(`From:     ${senderEmail}`);
  console.log(`Reply-To: ${replyToEmail}`);

  try {
    const res = await resend.emails.send({
      from: senderEmail,
      reply_to: replyToEmail,
      to: targetEmail,
      subject: "🪔 The 14-Day Pre-Diwali Glass Skin Protocol (For Men & Women)",
      html: getDiwaliEmailHtml(recipientName),
    });
    console.log("Success! Resend response:", res);
  } catch (err) {
    console.error("Failed to send test email:", err);
  }
}

import { fileURLToPath } from "url";
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  run();
}
