import fs from "fs";
import path from "path";
import { Resend } from "resend";

function loadEnv() {
  const envFiles = [".env.local", ".env"];
  for (const file of envFiles) {
    const fullPath = path.join(process.cwd(), file);
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, "utf-8");
      content.split("\n").forEach(line => {
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
const BANNER_URL = "https://www.mirhaandco.com/email_header_banner.png";
const targetEmail = "tanvirk140@gmail.com";
const recipientName = "Tanvir";

const htmlContent = `
<div style="font-family: 'DM Sans', -apple-system, sans-serif; max-width: 580px; margin: 0 auto; background: #ffffff; border: 1px solid #e7e5e4; border-radius: 12px; overflow: hidden; color: #1c1917; line-height: 1.6;">
  
  <!-- Header Banner Image -->
  <div style="width: 100%; background: #141210; text-align: center;">
    <img src="${BANNER_URL}" alt="Mirha & Co. Skincare" style="width: 100%; max-height: 220px; object-fit: cover; display: block;" />
  </div>

  <div style="padding: 32px 28px;">
    <h2 style="font-family: Georgia, serif; font-size: 1.5rem; font-weight: normal; color: #1c1917; margin-top: 0; margin-bottom: 20px;">
      Hi ${recipientName},
    </h2>
    <p>Tanvir here from <strong>Mirha & Co.</strong></p>
    <p>I noticed you checked out our platform recently, and I wanted to reach out directly. I started Mirha & Co. to solve a simple problem: cut through all the confusing skincare ads and help you find products that actually work for your specific skin and climate—without overspending.</p>
    
    <p>If you haven't checked your skin barrier or routine lately, here are 3 quick tools available for free on our site:</p>
    
    <div style="background: #fafaf9; border-left: 4px solid #fc2779; padding: 18px 20px; border-radius: 6px; margin: 24px 0;">
      <ul style="margin: 0; padding-left: 18px; color: #44403c; line-height: 1.8;">
        <li style="margin-bottom: 8px;"><strong>Free AI Skin Scan:</strong> Test your skin barrier score, acne risks, and redness.</li>
        <li style="margin-bottom: 8px;"><strong>City Tap Water Check:</strong> See if hard water in your area is secretly causing breakouts or hair fall.</li>
        <li><strong>Budget Dupe Finder:</strong> Find affordable Indian & K-beauty alternatives for high-end luxury products.</li>
      </ul>
    </div>
    
    <div style="text-align: center; margin: 32px 0;">
      <a href="https://www.mirhaandco.com/dashboard/analysis" style="background: #fc2779; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 0.95rem; display: inline-block; box-shadow: 0 4px 12px rgba(252,39,121,0.25);">
        Try Free AI Skin Scan →
      </a>
    </div>
    
    <p style="font-size: 0.95rem; color: #57534e;">If you ever have a question about your routine or an ingredient list you're unsure about, just reply to this email! I read every message.</p>
    
    <div style="border-top: 1px solid #f5f5f4; margin-top: 32px; padding-top: 20px; color: #78716c; font-size: 0.9rem;">
      Warmly,<br/>
      <strong>Tanvir Khan</strong><br/>
      <span style="color: #a8a29e;">Founder, Mirha & Co.</span>
    </div>
  </div>
</div>
`;

async function run() {
  console.log(`Sending test email to ${targetEmail} from ${senderEmail}...`);
  try {
    const res = await resend.emails.send({
      from: senderEmail,
      to: targetEmail,
      subject: "[TEST PREVIEW] Quick question about your current skincare routine",
      html: htmlContent
    });
    console.log("Response:", res);
  } catch (err) {
    console.error("Failed to send test email:", err);
  }
}

run();
