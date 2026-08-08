import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import { redisCache } from "@/lib/redis";

export const securityHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS, GET",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
};

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

async function isRateLimited(identifier: string, limit: number): Promise<boolean> {
  const key = `rate:recommend:id:${identifier}`;
  const count = await redisCache.incr(key);
  if (count === 1) {
    await redisCache.expire(key, 60);
  }
  return count > limit;
}

export interface B2BAuthResult {
  success: boolean;
  errorResponse?: NextResponse;
  b2bKey?: any;
  headers: Record<string, string>;
}

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

  if (!apiKey) {
    return {
      success: false,
      headers: dynamicHeaders,
      errorResponse: NextResponse.json(
        { success: false, error: "Unauthorized. A valid B2B API Key is required." },
        { status: 401, headers: dynamicHeaders }
      ),
    };
  }

  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "unknown";

  const isTrial = apiKey === "b2b_trial_key";

  if (isTrial) {
    // Per-IP limit (60/min)
    if (await isRateLimited(`${ip}:trial:${apiName}`, 60)) {
      return {
        success: false,
        headers: dynamicHeaders,
        errorResponse: NextResponse.json(
          { success: false, error: `Rate limit exceeded. Trial keys allow 60 requests per minute per IP.` },
          { status: 429, headers: dynamicHeaders }
        ),
      };
    }
    // Global ceiling across all IPs (500/min)
    if (await isRateLimited(`global:trial:${apiName}`, 500)) {
      return {
        success: false,
        headers: dynamicHeaders,
        errorResponse: NextResponse.json(
          { success: false, error: `Trial API global limit reached. Please try again shortly.` },
          { status: 429, headers: dynamicHeaders }
        ),
      };
    }
    return { success: true, headers: dynamicHeaders };
  }

  // Live key lookup
  const keyHash = crypto.createHash("sha256").update(apiKey).digest("hex");
  const b2bKey = await prisma.b2BApiKey.findFirst({
    where: {
      OR: [{ keyHash }, { key: apiKey }],
    },
  });

  if (!b2bKey || b2bKey.status !== "active") {
    return {
      success: false,
      headers: dynamicHeaders,
      errorResponse: NextResponse.json(
        { success: false, error: "Invalid or suspended API key." },
        { status: 401, headers: dynamicHeaders }
      ),
    };
  }

  // Domain locking validation
  if (b2bKey.allowedOrigins && b2bKey.allowedOrigins !== "*") {
    if (!isOriginAllowed(req, b2bKey.allowedOrigins)) {
      return {
        success: false,
        headers: dynamicHeaders,
        errorResponse: NextResponse.json(
          { success: false, error: "Forbidden: Origin not whitelisted." },
          { status: 403, headers: dynamicHeaders }
        ),
      };
    }
  }

  // Quota reset checks
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

  // Live key rate limit (1000/min)
  if (await isRateLimited(`${ip}:${apiKey}:${apiName}`, 1000)) {
    return {
      success: false,
      headers: dynamicHeaders,
      errorResponse: NextResponse.json(
        { success: false, error: "Burst rate limit exceeded. Max 1,000 requests per minute per key." },
        { status: 429, headers: dynamicHeaders }
      ),
    };
  }

  // Atomic quota consumption
  const quotaUpdate = await prisma.b2BApiKey.updateMany({
    where: {
      id: b2bKey.id,
      usageThisMonth: { lt: b2bKey.monthlyQuota },
    },
    data: { usageThisMonth: { increment: 1 } },
  });

  if (quotaUpdate.count === 0) {
    return {
      success: false,
      headers: dynamicHeaders,
      errorResponse: NextResponse.json(
        { success: false, error: `Monthly quota of ${b2bKey.monthlyQuota.toLocaleString()} API calls exceeded.` },
        { status: 429, headers: dynamicHeaders }
      ),
    };
  }

  return { success: true, b2bKey, headers: dynamicHeaders };
}
