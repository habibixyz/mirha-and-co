import fs from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";
import { Resend } from "resend";

// Load environment variables from .env or .env.local if not already set
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

const prisma = new PrismaClient();
const resendApiKey = process.env.RESEND_API_KEY;
const senderEmail = process.env.PASSWORD_RESET_FROM || "Mirha & Co. <noreply@mirhaandco.com>";

const BANNER_URL = "https://www.mirhaandco.com/email_header_banner.png";

const TEMPLATES = {
  1: {
    subject: "Quick question about your current skincare routine",
    html: (name) => `
      <div style="font-family: 'DM Sans', -apple-system, sans-serif; max-width: 580px; margin: 0 auto; background: #ffffff; border: 1px solid #e7e5e4; border-radius: 12px; overflow: hidden; color: #1c1917; line-height: 1.6;">
        
        <!-- Header Banner Image -->
        <div style="width: 100%; background: #141210; text-align: center;">
          <img src="${BANNER_URL}" alt="Mirha & Co. Skincare" style="width: 100%; max-height: 220px; object-fit: cover; display: block;" />
        </div>

        <div style="padding: 32px 28px;">
          <h2 style="font-family: Georgia, serif; font-size: 1.5rem; font-weight: normal; color: #1c1917; margin-top: 0; margin-bottom: 20px;">
            Hi ${name || "there"},
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
    `
  },
  2: {
    subject: "Is your tap water quietly ruining your skin barrier?",
    html: (name) => `
      <div style="font-family: 'DM Sans', -apple-system, sans-serif; max-width: 580px; margin: 0 auto; background: #ffffff; border: 1px solid #e7e5e4; border-radius: 12px; overflow: hidden; color: #1c1917; line-height: 1.6;">
        
        <!-- Header Banner Image -->
        <div style="width: 100%; background: #141210; text-align: center;">
          <img src="${BANNER_URL}" alt="Mirha & Co. Skincare" style="width: 100%; max-height: 220px; object-fit: cover; display: block;" />
        </div>

        <div style="padding: 32px 28px;">
          <h2 style="font-family: Georgia, serif; font-size: 1.5rem; font-weight: normal; color: #1c1917; margin-top: 0; margin-bottom: 20px;">
            Hi ${name || "there"},
          </h2>
          <p>Ever felt like your skin is tight, itchy, or breaking out even though you're using good products?</p>
          <p>One thing most people overlook is <strong>tap water quality</strong>. Hard water rich in calcium and magnesium leaves an invisible mineral layer on your face. This strips your natural moisture barrier and makes active ingredients sting or fail.</p>
          <p>At <strong>Mirha & Co.</strong>, we built a free live telemetry tool that checks your local city's water hardness index and gives you a 2-minute recovery routine.</p>
          
          <div style="text-align: center; margin: 32px 0;">
            <a href="https://www.mirhaandco.com/tools/hard-water" style="background: #fc2779; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 0.95rem; display: inline-block; box-shadow: 0 4px 12px rgba(252,39,121,0.25);">
              Check Your City's Water Score →
            </a>
          </div>
          
          <p style="font-size: 0.95rem; color: #57534e;">Let me know what city you're in if you'd like a quick product recommendation to counter mineral buildup!</p>
          
          <div style="border-top: 1px solid #f5f5f4; margin-top: 32px; padding-top: 20px; color: #78716c; font-size: 0.9rem;">
            Best,<br/>
            <strong>Tanvir Khan</strong><br/>
            <span style="color: #a8a29e;">Mirha & Co.</span>
          </div>
        </div>
      </div>
    `
  }
};

async function main() {
  const args = process.argv.slice(2);
  const isDryRun = args.includes("--dry-run");
  const templateArg = args.find(a => a.startsWith("--template="));
  const templateId = templateArg ? parseInt(templateArg.split("=")[1]) : 1;

  const selectedTemplate = TEMPLATES[templateId] || TEMPLATES[1];

  console.log("==================================================");
  console.log(" 🚀 MIRHA & CO. BROADCAST EMAIL SENDER");
  console.log("==================================================");
  console.log(` Mode:        ${isDryRun ? "🔍 DRY-RUN (No real emails will be sent)" : "⚡ LIVE SENDING"}`);
  console.log(` Sender:      ${senderEmail}`);
  console.log(` Banner Image: ${BANNER_URL}`);
  console.log(` Template ID: ${templateId} ("${selectedTemplate.subject}")`);
  console.log("==================================================\n");

  if (!isDryRun && !resendApiKey) {
    console.error("❌ ERROR: RESEND_API_KEY environment variable is missing!");
    console.error("Please add RESEND_API_KEY to your .env or .env.local file.");
    process.exit(1);
  }

  // Fetch Users & Leads
  const users = await prisma.user.findMany({ select: { email: true, name: true } });
  const leads = await prisma.lead.findMany({ select: { email: true, type: true } });

  const recipientMap = new Map();

  users.forEach(u => {
    const email = u.email.trim().toLowerCase();
    if (email && !email.includes("example.com")) {
      recipientMap.set(email, u.name || "Friend");
    }
  });

  leads.forEach(l => {
    const email = l.email.trim().toLowerCase();
    if (email && !email.includes("example.com") && !recipientMap.has(email)) {
      recipientMap.set(email, "Friend");
    }
  });

  const recipients = Array.from(recipientMap.entries());

  console.log(`📍 Found ${recipients.length} valid recipients (excluding test examples):\n`);

  let sentCount = 0;
  let failCount = 0;

  const resend = isDryRun ? null : new Resend(resendApiKey);

  for (let i = 0; i < recipients.length; i++) {
    const [email, name] = recipients[i];
    const html = selectedTemplate.html(name);

    if (isDryRun) {
      console.log(` [DRY-RUN ${i + 1}/${recipients.length}] Would send to: ${name} <${email}>`);
    } else {
      try {
        const response = await resend.emails.send({
          from: senderEmail,
          to: email,
          subject: selectedTemplate.subject,
          html
        });
        if (response.error) {
          console.error(` ❌ [${i + 1}/${recipients.length}] Failed to send to ${email}:`, response.error.message);
          failCount++;
        } else {
          console.log(` ✅ [${i + 1}/${recipients.length}] Sent to ${email} (ID: ${response.data.id})`);
          sentCount++;
        }
      } catch (err) {
        console.error(` ❌ [${i + 1}/${recipients.length}] Exception sending to ${email}:`, err.message);
        failCount++;
      }
      // Rate limit buffer: 200ms
      await new Promise(res => setTimeout(res, 200));
    }
  }

  console.log("\n==================================================");
  if (isDryRun) {
    console.log(` 🔍 DRY RUN COMPLETE: ${recipients.length} recipients verified.`);
    console.log(` To execute live send, run:`);
    console.log(` node scripts/send-broadcast.mjs --template=${templateId}`);
  } else {
    console.log(` 🎉 BROADCAST COMPLETE: ${sentCount} sent, ${failCount} failed out of ${recipients.length}.`);
  }
  console.log("==================================================\n");

  await prisma.$disconnect();
}

main().catch(err => {
  console.error("Fatal error running broadcast script:", err);
  process.exit(1);
});
