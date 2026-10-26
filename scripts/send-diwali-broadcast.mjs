import fs from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";
import { Resend } from "resend";
import { getDiwaliEmailHtml } from "./send-diwali-test.mjs";

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

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);
const senderEmail = process.env.PASSWORD_RESET_FROM || "Mirha & Co. <noreply@mirhaandco.com>";
const replyToEmail = "tanizcoldz@gmail.com";

const isDryRun = process.argv.includes("--dry-run");
const isLive = process.argv.includes("--live");

async function broadcast() {
  console.log("=== PREPARING DIWALI EMAIL BROADCAST ===");
  console.log(`From:     ${senderEmail}`);
  console.log(`Reply-To: ${replyToEmail}`);
  console.log(`Mode:     ${isLive ? "LIVE BROADCAST" : "DRY RUN (Preview Only)"}\n`);

  try {
    const users = await prisma.user.findMany({ select: { email: true, name: true } });
    const leads = await prisma.lead.findMany({ select: { email: true } });
    const b2b = await prisma.b2BApiKey.findMany({ select: { email: true, brandName: true } });

    // Deduplicate recipients by lowercase email
    const recipientMap = new Map();

    users.forEach((u) => {
      if (u.email) {
        const clean = u.email.toLowerCase().trim();
        recipientMap.set(clean, { email: clean, name: u.name || "there" });
      }
    });

    leads.forEach((l) => {
      if (l.email) {
        const clean = l.email.toLowerCase().trim();
        if (!recipientMap.has(clean)) {
          recipientMap.set(clean, { email: clean, name: "there" });
        }
      }
    });

    b2b.forEach((b) => {
      if (b.email) {
        const clean = b.email.toLowerCase().trim();
        if (!recipientMap.has(clean)) {
          recipientMap.set(clean, { email: clean, name: b.brandName || "there" });
        }
      }
    });

    const recipients = Array.from(recipientMap.values()).filter((r) => {
      const domain = r.email.split("@")[1] || "";
      return domain !== "example.com" && domain !== "test.com";
    });
    console.log(`Found ${recipients.length} deliverable recipients in database:\n`);
    recipients.forEach((r, idx) => {
      console.log(`  ${idx + 1}. ${r.email} (${r.name})`);
    });

    if (!isLive) {
      console.log("\n[DRY RUN FINISHED] No live emails were sent.");
      console.log("To send for real to all recipients, execute:");
      console.log("  node scripts/send-diwali-broadcast.mjs --live");
      return;
    }

    console.log(`\nStarting live broadcast to ${recipients.length} recipients...`);
    let sentCount = 0;
    let failCount = 0;

    for (const [index, r] of recipients.entries()) {
      try {
        console.log(`[${index + 1}/${recipients.length}] Sending to ${r.email}...`);
        const res = await resend.emails.send({
          from: senderEmail,
          reply_to: replyToEmail,
          to: r.email,
          subject: "🪔 The 14-Day Pre-Diwali Glass Skin Protocol (For Men & Women)",
          html: getDiwaliEmailHtml(r.name),
        });

        if (res.error) {
          console.error(`  ❌ Error: ${res.error.message}`);
          failCount++;
        } else {
          console.log(`  ✓ Sent (ID: ${res.data?.id})`);
          sentCount++;
        }

        // 600ms delay to comfortably stay below Resend's 2 req/sec rate limit
        await new Promise((resolve) => setTimeout(resolve, 600));
      } catch (sendErr) {
        console.error(`  ❌ Failed sending to ${r.email}:`, sendErr.message || sendErr);
        failCount++;
      }
    }

    console.log("\n=== BROADCAST COMPLETE ===");
    console.log(`Successfully sent: ${sentCount}`);
    console.log(`Failed:            ${failCount}`);
  } catch (err) {
    console.error("Database query error:", err);
  } finally {
    await prisma.$disconnect();
  }
}

broadcast();
