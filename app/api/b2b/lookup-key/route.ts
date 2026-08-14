import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyB2BRetrievalToken } from "@/lib/b2bRetrievalToken";

/* ─── Per-IP rate limiter: max 5 lookups/min ─── */
const lookupRateMap = new Map<string, { count: number; resetAt: number }>();

function isLookupRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = lookupRateMap.get(ip);
  if (!entry || now > entry.resetAt) {
    lookupRateMap.set(ip, { count: 1, resetAt: now + 60_000 });
    return false;
  }
  entry.count++;
  return entry.count > 5;
}

// Cleanup old entries every 10 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, val] of lookupRateMap) {
    if (now > val.resetAt) lookupRateMap.delete(key);
  }
}, 10 * 60_000);

const HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Cache-Control": "no-store",
};

export async function POST(req: NextRequest) {
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "unknown";

  if (isLookupRateLimited(ip)) {
    return NextResponse.json(
      { found: false, error: "Too many requests. Please wait a minute and try again." },
      { status: 429, headers: HEADERS }
    );
  }

  let email: string;
  let retrievalToken: string;
  try {
    const body = await req.json();
    email = (body.email || "").trim().toLowerCase();
    retrievalToken = String(body.retrievalToken || "");
  } catch {
    return NextResponse.json(
      { found: false, error: "Invalid request body." },
      { status: 400, headers: HEADERS }
    );
  }

  if (!email || !email.includes("@")) {
    return NextResponse.json(
      { found: false, error: "A valid email address is required." },
      { status: 400, headers: HEADERS }
    );
  }

  if (!verifyB2BRetrievalToken(email, retrievalToken)) {
    return NextResponse.json(
      {
        found: false,
        hint: "For security, automatic key retrieval only works from the checkout success flow. Use the API key that was emailed to you, or contact support to resend it.",
      },
      { status: 403, headers: HEADERS }
    );
  }

  const b2bKey = await prisma.b2BApiKey.findFirst({
    where: {
      email: { equals: email, mode: "insensitive" },
      status: "active",
    },
  });

  if (!b2bKey) {
    // Generic response — don't leak whether the email exists or not
    return NextResponse.json(
      {
        found: false,
        hint: "No active API key found for this email. Check your inbox for the welcome email, or contact tanizcoldz@gmail.com.",
      },
      { status: 200, headers: HEADERS }
    );
  }

  // ── 24-hour retrieval window ──────────────────────────────────────────────
  // The key is only returned in-band within 24 hours of being provisioned or
  // renewed. After that, the partner must use the emailed copy or contact
  // support. This prevents an attacker who knows a partner's email from
  // silently harvesting live keys days/weeks after provisioning.
  const TWENTY_FOUR_HOURS_MS = 24 * 60 * 60 * 1000;
  const hoursSinceUpdate = Date.now() - b2bKey.updatedAt.getTime();

  if (hoursSinceUpdate > TWENTY_FOUR_HOURS_MS) {
    return NextResponse.json(
      {
        found: false,
        hint: "Your API key was emailed to you when your subscription activated. Check your inbox (including spam) or contact tanizcoldz@gmail.com to have it resent.",
      },
      { status: 200, headers: HEADERS }
    );
  }

  return NextResponse.json(
    {
      found: true,
      apiKey: b2bKey.key,
      tier: b2bKey.tier,
      brandName: b2bKey.brandName,
      monthlyQuota: b2bKey.monthlyQuota,
      usageThisMonth: b2bKey.usageThisMonth,
      quotaResetAt: b2bKey.quotaResetAt.toISOString(),
      allowedOrigins: b2bKey.allowedOrigins,
    },
    { status: 200, headers: HEADERS }
  );
}
