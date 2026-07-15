import { NextRequest, NextResponse } from "next/server";
import { generateRoutine, QuizAnswers } from "../../../../lib/routineEngine";
import { prisma } from "@/lib/prisma";

/* ─── In-memory rate limiter (per-IP burst protection) ─── */
const rateMap = new Map<string, { count: number; resetAt: number }>();
const RATE_WINDOW_MS = 60_000;

function isRateLimited(identifier: string, limit: number): boolean {
  const now = Date.now();
  const entry = rateMap.get(identifier);
  if (!entry || now > entry.resetAt) {
    rateMap.set(identifier, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > limit;
}

setInterval(() => {
  const now = Date.now();
  for (const [key, val] of rateMap) {
    if (now > val.resetAt) rateMap.delete(key);
  }
}, 5 * 60_000);

/* ─── Security headers ─── */
const securityHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: securityHeaders });
}

export async function POST(req: NextRequest) {
  try {
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0]?.trim() || "unknown";

    const body = await req.json().catch(() => ({}));
    const { apiKey, skinType, mainConcern, budget, experience = "beginner", climate } = body;

    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. A valid B2B API Key is required." },
        { status: 401, headers: securityHeaders }
      );
    }

    // ── Trial key: bypass DB, use static rate limit ──
    const isTrial = apiKey === "b2b_trial_key";
    if (isTrial) {
      if (isRateLimited(`${ip}:trial`, 60)) {
        return NextResponse.json(
          { success: false, error: "Rate limit exceeded. Trial keys allow 60 requests per minute." },
          { status: 429, headers: securityHeaders }
        );
      }
    } else {
      // ── Live B2B key: look up in DB ──
      const b2bKey = await prisma.b2BApiKey.findUnique({ where: { key: apiKey } });

      if (!b2bKey || b2bKey.status !== "active") {
        return NextResponse.json(
          { success: false, error: "Invalid or suspended API key." },
          { status: 401, headers: securityHeaders }
        );
      }

      // Reset monthly quota if we've rolled into a new month
      const now = new Date();
      if (now > b2bKey.quotaResetAt) {
        await prisma.b2BApiKey.update({
          where: { id: b2bKey.id },
          data: {
            usageThisMonth: 0,
            quotaResetAt: new Date(now.getFullYear(), now.getMonth() + 1, 1),
          },
        });
        b2bKey.usageThisMonth = 0;
      }

      // Enforce monthly quota
      if (b2bKey.usageThisMonth >= b2bKey.monthlyQuota) {
        return NextResponse.json(
          {
            success: false,
            error: `Monthly quota of ${b2bKey.monthlyQuota.toLocaleString()} API calls exceeded. Upgrade your plan or contact support.`,
          },
          { status: 429, headers: securityHeaders }
        );
      }

      // Per-minute burst limit (1000/min for any live key)
      if (isRateLimited(`${ip}:${apiKey}`, 1000)) {
        return NextResponse.json(
          { success: false, error: "Burst rate limit exceeded. Max 1,000 requests per minute per key." },
          { status: 429, headers: securityHeaders }
        );
      }

      // Increment usage + log call (fire-and-forget to not slow response)
      prisma.b2BApiKey.update({
        where: { id: b2bKey.id },
        data: { usageThisMonth: { increment: 1 } },
      }).catch(() => {});

      prisma.b2BUsageLog.create({
        data: {
          keyId: b2bKey.id,
          endpoint: "/api/v1/recommend",
          skinType: skinType || null,
          city: climate?.city || null,
          ppm: climate?.ppm || null,
        },
      }).catch(() => {});
    }

    /* ── Input Validation ── */
    const allowedSkinTypes = ["oily", "dry", "combination", "sensitive"];
    const allowedConcerns = ["acne", "pigmentation", "dullness", "dehydration"];
    const allowedBudgets = ["under_500", "under_1000", "under_2000"];

    if (!skinType || !allowedSkinTypes.includes(skinType)) {
      return NextResponse.json(
        { success: false, error: `Invalid skinType. Must be one of: ${allowedSkinTypes.join(", ")}` },
        { status: 400, headers: securityHeaders }
      );
    }

    if (skinType !== "sensitive" && (!mainConcern || !allowedConcerns.includes(mainConcern))) {
      return NextResponse.json(
        { success: false, error: `Invalid mainConcern. Must be one of: ${allowedConcerns.join(", ")}` },
        { status: 400, headers: securityHeaders }
      );
    }

    if (!budget || !allowedBudgets.includes(budget)) {
      return NextResponse.json(
        { success: false, error: `Invalid budget. Must be one of: ${allowedBudgets.join(", ")}` },
        { status: 400, headers: securityHeaders }
      );
    }

    /* ── Generate recommendation ── */
    const answers: QuizAnswers = {
      skinType,
      mainConcern: mainConcern || "acne",
      budget,
      experience,
    };

    const recommendation = generateRoutine(answers, climate);

    return NextResponse.json(
      { success: true, recommendation },
      { status: 200, headers: securityHeaders }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Internal Server Error" },
      { status: 500, headers: securityHeaders }
    );
  }
}
