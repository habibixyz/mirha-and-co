import { NextRequest, NextResponse } from "next/server";
import { generateRoutine, QuizAnswers } from "../../../../lib/routineEngine";
import { resolveLocationDataLive } from "../../../../lib/geocoding";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import { sendQuotaWarningEmail, sendQuotaExhaustedEmail } from "@/lib/b2bEmail";

/* ─── In-memory rate limiter (per-IP burst protection + global trial cap) ─── */
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

// Global trial request ceiling — caps all trial-key calls across every IP.
// Prevents rotating-proxy abuse where many IPs each stay under the per-IP limit
// but together hammer the geocoding/recommendation pipeline at zero cost.
const GLOBAL_TRIAL_LIMIT_PER_MIN = 500;

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
  const origin = req.headers.get("origin") || req.headers.get("referer") || "*";
  const dynamicHeaders = {
    ...securityHeaders,
    "Access-Control-Allow-Origin": origin.startsWith("http") ? new URL(origin).origin : "*",
  };

  try {
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0]?.trim() || "unknown";

    const body = await req.json().catch(() => ({}));
    const {
      apiKey,
      skinType,
      mainConcern,
      budget = "under_1000",
      experience = "beginner",
      climate,
      postalCode,
      city,
      country,
      catalog,
    } = body;

    // ── Step 1: API key required ──────────────────────────────────────────────
    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. A valid B2B API Key is required." },
        { status: 401, headers: dynamicHeaders }
      );
    }

    // ── Step 2: Auth + quota (BEFORE geocoding — fail fast for bad/exhausted keys) ─
    // Invalid, rate-limited, or quota-exceeded requests are rejected here in
    // ~5ms (a DB index lookup) without ever touching Nominatim or Open-Meteo.
    const isTrial = apiKey === "b2b_trial_key";
    let quotaInfo = { remaining: 9999, monthlyQuota: 10000, quotaResetAt: null as string | null };
    let logKeyId: string | null = null; // captured for deferred usage logging

    if (isTrial) {
      // Per-IP limit (60/min)
      if (isRateLimited(`${ip}:trial`, 60)) {
        return NextResponse.json(
          { success: false, error: "Rate limit exceeded. Trial keys allow 60 requests per minute per IP." },
          { status: 429, headers: dynamicHeaders }
        );
      }
      // Global ceiling across all IPs — prevents rotating-proxy abuse
      if (isRateLimited("global:trial", GLOBAL_TRIAL_LIMIT_PER_MIN)) {
        return NextResponse.json(
          { success: false, error: "Trial API global limit reached. Please try again shortly or upgrade to a live key." },
          { status: 429, headers: dynamicHeaders }
        );
      }
    } else {
      // ── Live B2B key: look up in DB via SHA-256 hash or fallback plaintext key ──
      const keyHash = crypto.createHash("sha256").update(apiKey).digest("hex");
      const b2bKey = await prisma.b2BApiKey.findFirst({
        where: {
          OR: [{ keyHash }, { key: apiKey }],
        },
      });

      if (!b2bKey || b2bKey.status !== "active") {
        return NextResponse.json(
          { success: false, error: "Invalid or suspended API key." },
          { status: 401, headers: dynamicHeaders }
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

      // Per-minute burst limit (1000/min for any live key) — cheap in-memory check
      if (isRateLimited(`${ip}:${apiKey}`, 1000)) {
        return NextResponse.json(
          { success: false, error: "Burst rate limit exceeded. Max 1,000 requests per minute per key." },
          { status: 429, headers: dynamicHeaders }
        );
      }

      // Atomic quota check-and-increment — prevents race conditions under concurrent load.
      // updateMany returns count=0 if usageThisMonth already >= monthlyQuota,
      // meaning no row was updated and the quota is exhausted.
      const quotaUpdate = await prisma.b2BApiKey.updateMany({
        where: {
          id: b2bKey.id,
          usageThisMonth: { lt: b2bKey.monthlyQuota },
        },
        data: { usageThisMonth: { increment: 1 } },
      });

      if (quotaUpdate.count === 0) {
        // Tell the partner exactly when their quota resets so they can plan
        const resetAt = b2bKey.quotaResetAt.toISOString();
        const retryAfterSecs = Math.max(
          0,
          Math.ceil((b2bKey.quotaResetAt.getTime() - Date.now()) / 1000)
        );
        return NextResponse.json(
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
        );
      }

      const remaining = Math.max(0, b2bKey.monthlyQuota - (b2bKey.usageThisMonth + 1));
      quotaInfo = {
        remaining,
        monthlyQuota: b2bKey.monthlyQuota,
        quotaResetAt: b2bKey.quotaResetAt.toISOString(),
      };
      logKeyId = b2bKey.id;

      // ── Quota threshold emails (fire-and-forget, non-blocking) ──────────────
      // Each email fires exactly once per billing cycle by checking whether
      // the increment just crossed the threshold boundary.
      if (b2bKey.email) {
        const usageBefore = b2bKey.usageThisMonth;       // value BEFORE this request
        const usageAfter  = b2bKey.usageThisMonth + 1;   // value AFTER this request
        const quota       = b2bKey.monthlyQuota;
        const threshold80 = Math.floor(quota * 0.8);

        // 80% warning: fires the first time usage crosses the 80% mark
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

        // Exhaustion notice: fires on the very last successful call
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
    }

    // ── Step 3: Input validation (cheap CPU check, before geocoding) ──────────
    const allowedSkinTypes = ["oily", "dry", "combination", "sensitive"];
    const allowedConcerns = ["acne", "pigmentation", "dullness", "dehydration"];

    if (!skinType || !allowedSkinTypes.includes(skinType)) {
      return NextResponse.json(
        { success: false, error: `Invalid skinType. Must be one of: ${allowedSkinTypes.join(", ")}` },
        { status: 400, headers: dynamicHeaders }
      );
    }

    if (skinType !== "sensitive" && (!mainConcern || !allowedConcerns.includes(mainConcern))) {
      return NextResponse.json(
        { success: false, error: `Invalid mainConcern. Must be one of: ${allowedConcerns.join(", ")}` },
        { status: 400, headers: dynamicHeaders }
      );
    }

    // ── Step 4: Geocoding (10-min cached — only runs for valid, authed requests) ─
    const liveLocation = await resolveLocationDataLive({
      postalCode: postalCode || climate?.postalCode,
      city: city || climate?.city,
      country: country || climate?.country,
      ppm: climate?.ppm,
      temp: climate?.temp,
      humidity: climate?.humidity,
      dewpoint: climate?.dewpoint,
    });

    // Cap the custom catalog at 100 SKUs to prevent CPU-spike attacks
    // via arbitrarily large arrays being iterated through classifyClientProduct().
    const rawCatalog = catalog || climate?.catalog;
    const safeCatalog = Array.isArray(rawCatalog) ? rawCatalog.slice(0, 100) : rawCatalog;

    const climatePayload = {
      city: liveLocation.city,
      country: liveLocation.countryCode,
      postalCode: postalCode || climate?.postalCode,
      ppm: liveLocation.ppm,
      temp: liveLocation.temp,
      humidity: liveLocation.humidity,
      dewpoint: liveLocation.dewpoint,
      catalog: safeCatalog,
    };

    // ── Step 5: Generate recommendation ───────────────────────────────────────
    const answers: QuizAnswers = {
      skinType,
      mainConcern: mainConcern || "acne",
      budget,
      experience,
    };

    const recommendation = generateRoutine(answers, climatePayload);

    // Fire-and-forget usage log (quota already incremented atomically in step 2)
    if (logKeyId) {
      prisma.b2BUsageLog.create({
        data: {
          keyId: logKeyId,
          endpoint: "/api/v1/recommend",
          skinType: skinType || null,
          city: liveLocation.city || null,
          ppm: liveLocation.ppm || null,
        },
      }).catch(() => {});
    }

    // Calculate environmental barrier stress factors
    const humidity = liveLocation.humidity ?? 50;
    const temp = liveLocation.temp ?? 22;
    const ppm = liveLocation.ppm ?? 150;

    const tewlRiskLevel = humidity < 35 ? "High (Severe Barrier Evaporation)" : humidity < 50 ? "Moderate" : "Low (Optimal Moisture Preservation)";
    const mineralScumRiskLevel = ppm >= 250 ? "Critical Calcium Binding" : ppm >= 180 ? "High Soap Scum Deposition" : ppm >= 120 ? "Moderate Mineral Friction" : "Minimal Mineral Impact";

    // Quota warning: surface a heads-up when the partner is below 20% remaining
    // so they can upgrade before hitting a hard stop.
    const quotaWarning =
      !isTrial && quotaInfo.remaining < quotaInfo.monthlyQuota * 0.2
        ? `You have ${quotaInfo.remaining.toLocaleString()} calls remaining this month (${Math.round((quotaInfo.remaining / quotaInfo.monthlyQuota) * 100)}% left). Upgrade at mirhaandco.com/b2b#pricing before your quota resets on ${quotaInfo.quotaResetAt ? new Date(quotaInfo.quotaResetAt).toLocaleDateString("en-GB", { day: "numeric", month: "short" }) : "month end"}.`
        : undefined;

    return NextResponse.json(
      {
        success: true,
        diagnostics: {
          location: `${liveLocation.city}, ${liveLocation.countryCode}`,
          resolvedVia: liveLocation.source,         // "live" | "fallback"
          waterHardnessPpm: liveLocation.ppm,
          waterHardnessCategory: liveLocation.waterCategory,
          temperatureC: liveLocation.temp,
          humidityPercent: liveLocation.humidity,
          dewpointC: liveLocation.dewpoint,
          environmentalStress: {
            tewlRiskLevel,
            mineralScumRiskLevel,
          },
          coordinates: liveLocation.source === "live"
            ? { lat: liveLocation.lat, lon: liveLocation.lon }
            : null,
          evaluatedCustomSkus: climatePayload.catalog?.length || 0,
        },
        quota: {
          remaining: quotaInfo.remaining,
          monthlyQuota: quotaInfo.monthlyQuota,
          ...(quotaInfo.quotaResetAt ? { quotaResetAt: quotaInfo.quotaResetAt } : {}),
          ...(quotaWarning ? { quotaWarning } : {}),
        },
        recommendation,
      },
      { status: 200, headers: dynamicHeaders }
    );
  } catch (error: any) {
    // Log full error server-side; never expose internal details to the client
    console.error("[/api/v1/recommend] Unhandled error:", error);
    return NextResponse.json(
      { success: false, error: "An internal error occurred. Please try again." },
      { status: 500, headers: dynamicHeaders }
    );
  }
}
