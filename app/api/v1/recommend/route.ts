import { NextRequest, NextResponse } from "next/server";
import { generateRoutine, QuizAnswers } from "../../../../lib/routineEngine";
import { resolveLocationDataLive } from "../../../../lib/geocoding";
import { prisma } from "@/lib/prisma";
import { getPostsForConcern } from "@/lib/blog-utils";
import { validateB2BRequest, securityHeaders } from "@/lib/b2bAuth";

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: securityHeaders });
}

export async function POST(req: NextRequest) {
  try {
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

    // ── Step 1: Auth + quota (before geocoding — fail fast for bad/exhausted keys) ─
    // All rate limiting, domain locking, quota increment, and quota emails are
    // handled inside validateB2BRequest — do NOT duplicate any of that logic here.
    const auth = await validateB2BRequest(req, apiKey ?? null, "recommend");
    if (!auth.success) return auth.errorResponse!;

    const { isTrial, logKeyId, quotaInfo, headers: dynamicHeaders } = auth;

    // ── Step 2: Input validation (cheap, before geocoding) ────────────────────
    const allowedSkinTypes = ["oily", "dry", "combination", "sensitive"];
    const allowedConcerns  = ["acne", "pigmentation", "dullness", "dehydration"];

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

    // ── Step 3: Geocoding (10-min cached — only runs for valid, authed requests) ─
    const liveLocation = await resolveLocationDataLive({
      postalCode: postalCode || climate?.postalCode,
      city:       city       || climate?.city,
      country:    country    || climate?.country,
      ppm:        climate?.ppm,
      temp:       climate?.temp,
      humidity:   climate?.humidity,
      dewpoint:   climate?.dewpoint,
    });

    // Cap the custom catalog at 100 SKUs to prevent CPU-spike attacks
    // via arbitrarily large arrays being iterated by classifyClientProduct().
    const rawCatalog = catalog || climate?.catalog;
    let safeCatalog = Array.isArray(rawCatalog) ? rawCatalog.slice(0, 100) : undefined;

    // Fallback to DB customCatalog if request catalog is empty
    if ((!safeCatalog || safeCatalog.length === 0) && !isTrial && auth.b2bKey?.customCatalog) {
      const dbCatalog = auth.b2bKey.customCatalog;
      if (Array.isArray(dbCatalog)) {
        safeCatalog = dbCatalog.slice(0, 100) as any;
      }
    }

    const climatePayload = {
      city:       liveLocation.city,
      country:    liveLocation.countryCode,
      postalCode: postalCode || climate?.postalCode,
      ppm:        liveLocation.ppm,
      temp:       liveLocation.temp,
      humidity:   liveLocation.humidity,
      dewpoint:   liveLocation.dewpoint,
      catalog:    safeCatalog,
    };

    // ── Step 4: Generate recommendation ───────────────────────────────────────
    const answers: QuizAnswers = {
      skinType,
      mainConcern: mainConcern || "acne",
      budget,
      experience,
    };

    const recommendation = generateRoutine(answers, climatePayload);

    // Fire-and-forget usage log (quota already incremented atomically in step 1)
    if (logKeyId) {
      prisma.b2BUsageLog.create({
        data: {
          keyId:    logKeyId,
          endpoint: "/api/v1/recommend",
          skinType: skinType    || null,
          city:     liveLocation.city || null,
          ppm:      liveLocation.ppm  || null,
        },
      }).catch(() => {});
    }

    // Environmental barrier stress factors
    const humidity = liveLocation.humidity ?? 50;
    const ppm      = liveLocation.ppm      ?? 150;

    const tewlRiskLevel = humidity < 35
      ? "High (Severe Barrier Evaporation)"
      : humidity < 50 ? "Moderate" : "Low (Optimal Moisture Preservation)";

    const mineralScumRiskLevel = ppm >= 250
      ? "Critical Calcium Binding"
      : ppm >= 180 ? "High Soap Scum Deposition"
      : ppm >= 120 ? "Moderate Mineral Friction" : "Minimal Mineral Impact";

    // Quota warning: surface a heads-up when the partner is below 20% remaining
    const quotaWarning =
      !isTrial && quotaInfo.remaining < quotaInfo.monthlyQuota * 0.2
        ? `You have ${quotaInfo.remaining.toLocaleString()} calls remaining this month (${Math.round((quotaInfo.remaining / quotaInfo.monthlyQuota) * 100)}% left). Upgrade at mirhaandco.com/b2b#pricing before your quota resets on ${quotaInfo.quotaResetAt ? new Date(quotaInfo.quotaResetAt).toLocaleDateString("en-GB", { day: "numeric", month: "short" }) : "month end"}.`
        : undefined;

    // Educational guides matched to the caller's skin concern
    const educationalGuides = getPostsForConcern(mainConcern || "acne", skinType, 2).map((g) => ({
      title:    g.title,
      excerpt:  g.excerpt,
      url:      `https://www.mirhaandco.com/blog/${g.slug}`,
      readTime: g.readTime,
    }));

    return NextResponse.json(
      {
        success: true,
        diagnostics: {
          location:              `${liveLocation.city}, ${liveLocation.countryCode}`,
          resolvedVia:           liveLocation.source,
          waterHardnessPpm:      liveLocation.ppm,
          waterHardnessCategory: liveLocation.waterCategory,
          temperatureC:          liveLocation.temp,
          humidityPercent:       liveLocation.humidity,
          dewpointC:             liveLocation.dewpoint,
          environmentalStress:   { tewlRiskLevel, mineralScumRiskLevel },
          coordinates:           liveLocation.source === "live"
            ? { lat: liveLocation.lat, lon: liveLocation.lon }
            : null,
          evaluatedCustomSkus:   climatePayload.catalog?.length || 0,
        },
        quota: {
          remaining:    quotaInfo.remaining,
          monthlyQuota: quotaInfo.monthlyQuota,
          ...(quotaInfo.quotaResetAt ? { quotaResetAt: quotaInfo.quotaResetAt } : {}),
          ...(quotaWarning           ? { quotaWarning }                         : {}),
        },
        recommendation,
        educationalGuides,
      },
      {
        status: 200,
        headers: {
          ...dynamicHeaders,
          // Standard rate-limit headers for partner backend auto-inspection
          "X-RateLimit-Limit":     isTrial ? "60" : "1000",
          "X-RateLimit-Remaining": isTrial ? "59" : "999",
          "X-Quota-Limit":         String(quotaInfo.monthlyQuota),
          "X-Quota-Remaining":     String(quotaInfo.remaining),
          ...(quotaInfo.quotaResetAt ? { "X-Quota-Reset": quotaInfo.quotaResetAt } : {}),
        },
      }
    );
  } catch (error: any) {
    console.error("[/api/v1/recommend] Unhandled error:", error);
    return NextResponse.json(
      { success: false, error: "An internal error occurred. Please try again." },
      { status: 500 }
    );
  }
}
