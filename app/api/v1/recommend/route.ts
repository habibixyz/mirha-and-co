import { NextRequest, NextResponse } from "next/server";
import { generateRoutine, QuizAnswers } from "../../../../lib/routineEngine";

/* ─── In-memory rate limiter (per-IP, per-key) ─── */
const rateMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 30;           // max requests per window
const RATE_WINDOW_MS = 60_000;   // 1-minute window

function isRateLimited(identifier: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(identifier);

  if (!entry || now > entry.resetAt) {
    rateMap.set(identifier, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT;
}

// Periodically purge stale entries to prevent memory leak
setInterval(() => {
  const now = Date.now();
  for (const [key, val] of rateMap) {
    if (now > val.resetAt) rateMap.delete(key);
  }
}, 5 * 60_000);

/* ─── Allowed API keys ─── */
const DEFAULT_KEYS = ["b2b_trial_key", "b2b_grow_key"];

/* ─── Security response headers ─── */
const securityHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
};

// Handle CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: securityHeaders });
}

export async function POST(req: NextRequest) {
  try {
    /* ── Rate limiting by IP + API key ── */
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0]?.trim() || "unknown";

    const body = await req.json().catch(() => ({}));
    const { apiKey, skinType, mainConcern, budget, experience = "beginner", climate } = body;

    const rateLimitId = `${ip}:${apiKey || "none"}`;
    if (isRateLimited(rateLimitId)) {
      return NextResponse.json(
        { success: false, error: "Rate limit exceeded. Max 30 requests per minute." },
        { status: 429, headers: securityHeaders }
      );
    }

    /* ── API Key Validation ── */
    const envKeys = process.env.B2B_API_KEYS ? process.env.B2B_API_KEYS.split(",") : [];
    const validKeys = [...DEFAULT_KEYS, ...envKeys];

    if (!apiKey || !validKeys.includes(apiKey)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. A valid B2B API Key is required." },
        { status: 401, headers: securityHeaders }
      );
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
