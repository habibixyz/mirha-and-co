import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import { redisCache } from "@/lib/redis";
import { sendQuotaWarningEmail, sendQuotaExhaustedEmail } from "@/lib/b2bEmail";

// ─────────────────────────────────────────────────────────────────────────────
// Shared security headers for all B2B endpoints
// ─────────────────────────────────────────────────────────────────────────────
export const securityHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS, GET",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
};

const GLOBAL_TRIAL_LIMIT_PER_MIN = 500;
const TRIAL_QUOTA_INFO = { remaining: 9999, monthlyQuota: 10000, quotaResetAt: null as string | null };

// ─────────────────────────────────────────────────────────────────────────────
// isOriginAllowed — canonical implementation (do NOT duplicate in route files)
// ─────────────────────────────────────────────────────────────────────────────
export function isOriginAllowed(request: NextRequest, allowedOrigins: string): boolean {
  if (allowedOrigins === "*") return true;

  const originHeader = request.headers.get("origin");
  const refererHeader = request.headers.get("referer");

  let requestDomain = "";

  if (originHeader) {
    try {
      requestDomain = new URL(originHeader).hostname.toLowerCase();
    } catch {
      requestDomain = originHeader.toLowerCase();
    }
  } else if (refererHeader) {
    try {
      requestDomain = new URL(refererHeader).hostname.toLowerCase();
    } catch {
      requestDomain = refererHeader.toLowerCase();
    }
  }

  requestDomain = requestDomain.split(":")[0];
  if (!requestDomain) return false;

  const whitelist = allowedOrigins
    .split(",")
    .map((d) => d.trim().toLowerCase())
    .filter(Boolean);

  return whitelist.some((domain) => {
    if (requestDomain === domain) return true;
    if (domain.startsWith("*.")) {
      const baseDomain = domain.slice(2);
      return requestDomain === baseDomain || requestDomain.endsWith("." + baseDomain);
    }
    return false;
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// isRateLimited — canonical Redis rate limiter (do NOT duplicate in route files)
// Uses a fixed-window counter. Key format: rate:b2b:<identifier>
// ─────────────────────────────────────────────────────────────────────────────
export async function isRateLimited(identifier: string, limit: number): Promise<boolean> {
  const key = `rate:b2b:${identifier}`;
  const count = await redisCache.incr(key);
  if (count === 1) {
    await redisCache.expire(key, 60);
  }
  return count > limit;
}

// ─────────────────────────────────────────────────────────────────────────────
// B2BAuthResult — returned by validateB2BRequest
// ─────────────────────────────────────────────────────────────────────────────
export interface B2BAuthResult {
  success: boolean;
  /** Pre-built error response. Only present when success === false. */
  errorResponse?: NextResponse;
  /** HTTP status of the error. Lets non-JSON endpoints (e.g. widget) map to their own format. */
  errorStatus?: number;
  /** Full Prisma B2BApiKey row — only present for authenticated live-key requests. */
  b2bKey?: any;
  /** CORS + security headers to forward to the response. */
  headers: Record<string, string>;
  /** True for b2b_trial_key requests. */
  isTrial: boolean;
  /** Key ID to use for fire-and-forget usage logging. null for trial keys. */
  logKeyId: string | null;
  /** Quota counters for building response bodies and headers. */
  quotaInfo: {
    remaining: number;
    monthlyQuota: number;
    quotaResetAt: string | null;
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// validateB2BRequest — the single source of truth for B2B auth + quota.
//
// Handles:
//   • Missing API key → 401
//   • Trial key: per-IP + global rate limits
//   • Live key: DB lookup, status check, domain locking, quota reset,
//               burst rate limit, atomic quota increment, quota threshold emails
//
// All B2B route files MUST call this instead of duplicating the logic.
// ─────────────────────────────────────────────────────────────────────────────
export async function validateB2BRequest(
  req: NextRequest,
  apiKey: string | null,
  apiName: string
): Promise<B2BAuthResult> {
  const origin = req.headers.get("origin") || req.headers.get("referer") || "*";
  const dynamicHeaders = {
    ...securityHeaders,
    "Access-Control-Allow-Origin": origin.startsWith("http") ? new URL(origin).origin : "*",
  };

  // Helper to build a failed result
  const fail = (status: number, body: object): B2BAuthResult => ({
    success: false,
    errorResponse: NextResponse.json(body, { status, headers: dynamicHeaders }),
    errorStatus: status,
    headers: dynamicHeaders,
    isTrial: false,
    logKeyId: null,
    quotaInfo: TRIAL_QUOTA_INFO,
  });

  // ── Missing key ────────────────────────────────────────────────────────────
  if (!apiKey) {
    return fail(401, { success: false, error: "Unauthorized. A valid B2B API Key is required." });
  }

  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "unknown";
  const isTrial = apiKey === "b2b_trial_key";

  // ── Trial key ─────────────────────────────────────────────────────────────
  if (isTrial) {
    if (await isRateLimited(`${ip}:trial:${apiName}`, 60)) {
      return {
        ...fail(429, { success: false, error: "Rate limit exceeded. Trial keys allow 60 requests per minute per IP." }),
        isTrial: true,
      };
    }
    if (await isRateLimited(`global:trial:${apiName}`, GLOBAL_TRIAL_LIMIT_PER_MIN)) {
      return {
        ...fail(429, { success: false, error: "Trial API global limit reached. Please try again shortly or upgrade to a live key." }),
        isTrial: true,
      };
    }
    return {
      success: true,
      headers: dynamicHeaders,
      isTrial: true,
      logKeyId: null,
      quotaInfo: TRIAL_QUOTA_INFO,
    };
  }

  // ── Live key: DB lookup ────────────────────────────────────────────────────
  const keyHash = crypto.createHash("sha256").update(apiKey).digest("hex");
  const b2bKey = await prisma.b2BApiKey.findFirst({
    where: { OR: [{ keyHash }, { key: apiKey }] },
  });

  if (!b2bKey || b2bKey.status !== "active") {
    return fail(401, { success: false, error: "Invalid or suspended API key." });
  }

  // ── Domain locking ─────────────────────────────────────────────────────────
  if (b2bKey.allowedOrigins && b2bKey.allowedOrigins !== "*") {
    if (!isOriginAllowed(req, b2bKey.allowedOrigins)) {
      return fail(403, { success: false, error: "Forbidden: Origin not whitelisted." });
    }
  }

  // ── Monthly quota reset ────────────────────────────────────────────────────
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

  // ── Per-minute burst limit (1 000/min per IP+key) ──────────────────────────
  if (await isRateLimited(`${ip}:${apiKey}:${apiName}`, 1000)) {
    return fail(429, { success: false, error: "Burst rate limit exceeded. Max 1,000 requests per minute per key." });
  }

  // ── Atomic quota check-and-increment ───────────────────────────────────────
  // updateMany returns count=0 if usageThisMonth >= monthlyQuota (quota exhausted).
  const quotaUpdate = await prisma.b2BApiKey.updateMany({
    where: {
      id: b2bKey.id,
      usageThisMonth: { lt: b2bKey.monthlyQuota },
    },
    data: { usageThisMonth: { increment: 1 } },
  });

  if (quotaUpdate.count === 0) {
    const resetAt = b2bKey.quotaResetAt.toISOString();
    const retryAfterSecs = Math.max(0, Math.ceil((b2bKey.quotaResetAt.getTime() - Date.now()) / 1000));
    return {
      success: false,
      errorResponse: NextResponse.json(
        {
          success: false,
          error: `Monthly quota of ${b2bKey.monthlyQuota.toLocaleString()} API calls exceeded.`,
          quota: {
            used: b2bKey.usageThisMonth,
            monthlyQuota: b2bKey.monthlyQuota,
            quotaResetAt: resetAt,
            upgradeUrl: "https://www.mirhaandco.com/b2b#pricing",
          },
        },
        {
          status: 429,
          headers: {
            ...dynamicHeaders,
            "Retry-After": String(retryAfterSecs),
            "X-Quota-Reset": resetAt,
          },
        }
      ),
      errorStatus: 429,
      headers: dynamicHeaders,
      isTrial: false,
      logKeyId: null,
      quotaInfo: TRIAL_QUOTA_INFO,
    };
  }

  const usageBefore = b2bKey.usageThisMonth;
  const usageAfter  = b2bKey.usageThisMonth + 1;
  const quota       = b2bKey.monthlyQuota;
  const remaining   = Math.max(0, quota - usageAfter);

  // ── Quota threshold emails (fire-and-forget, fires once per billing cycle) ─
  // Runs for ALL endpoints that use validateB2BRequest — including /widget.
  if (b2bKey.email) {
    const threshold80 = Math.floor(quota * 0.8);
    if (usageBefore < threshold80 && usageAfter >= threshold80) {
      sendQuotaWarningEmail({
        email:        b2bKey.email,
        brandName:    b2bKey.brandName,
        tier:         b2bKey.tier,
        used:         usageAfter,
        monthlyQuota: quota,
        quotaResetAt: b2bKey.quotaResetAt,
      }).catch(() => {});
    }
    if (usageAfter === quota) {
      sendQuotaExhaustedEmail({
        email:        b2bKey.email,
        brandName:    b2bKey.brandName,
        tier:         b2bKey.tier,
        monthlyQuota: quota,
        quotaResetAt: b2bKey.quotaResetAt,
      }).catch(() => {});
    }
  }

  return {
    success: true,
    b2bKey,
    headers: dynamicHeaders,
    isTrial: false,
    logKeyId: b2bKey.id,
    quotaInfo: {
      remaining,
      monthlyQuota: quota,
      quotaResetAt: b2bKey.quotaResetAt.toISOString(),
    },
  };
}
