import { NextRequest, NextResponse } from "next/server";
import { generateRoutine } from "../../../../lib/routineEngine";
import { resolveLocationDataLive } from "../../../../lib/geocoding";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

const widgetRateMap = new Map<string, { count: number; resetAt: number }>();

function isWidgetRateLimited(ip: string, limit = 30): boolean {
  const now = Date.now();
  const entry = widgetRateMap.get(ip);
  if (!entry || now > entry.resetAt) {
    widgetRateMap.set(ip, { count: 1, resetAt: now + 60_000 });
    return false;
  }
  entry.count++;
  return entry.count > limit;
}

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/javascript",
  "Cache-Control": "public, max-age=300",
};

export async function GET(req: NextRequest) {
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "unknown";

  if (isWidgetRateLimited(ip, 30)) {
    return new NextResponse("// Rate limit exceeded", { status: 429, headers: CORS_HEADERS });
  }

  const { searchParams } = new URL(req.url);
  const apiKey = searchParams.get("apiKey");
  const postalCode = searchParams.get("postalCode") || searchParams.get("city") || "90210";
  const skinType = searchParams.get("skinType") || "oily";
  const mainConcern = searchParams.get("mainConcern") || "acne";

  // ── API Key validation ──────────────────────────────────────────────────────
  if (!apiKey) {
    return new NextResponse(
      "// Mirha Widget Error: Missing apiKey query parameter. Obtain a B2B key at mirhaandco.com/b2b",
      { status: 401, headers: CORS_HEADERS }
    );
  }

  const isTrial = apiKey === "b2b_trial_key";
  let logKeyId: string | null = null;

  if (!isTrial) {
    const keyHash = crypto.createHash("sha256").update(apiKey).digest("hex");
    const b2bKey = await prisma.b2BApiKey.findFirst({
      where: { OR: [{ keyHash }, { key: apiKey }] },
    });

    if (!b2bKey || b2bKey.status !== "active") {
      return new NextResponse(
        "// Mirha Widget Error: Invalid or suspended API key.",
        { status: 401, headers: CORS_HEADERS }
      );
    }

    logKeyId = b2bKey.id;
  }

  // ── Resolve location & generate recommendation ──────────────────────────────
  const locationDetails = await resolveLocationDataLive({ postalCode });
  const routine = generateRoutine(
    { skinType, mainConcern, budget: "under_1000", experience: "beginner" },
    {
      city: locationDetails.city,
      country: locationDetails.countryCode,
      postalCode,
      ppm: locationDetails.ppm,
      temp: locationDetails.temp,
      humidity: locationDetails.humidity,
      dewpoint: locationDetails.dewpoint,
    }
  );

  // Log widget usage (fire-and-forget, only for verified live keys)
  if (logKeyId) {
    prisma.b2BUsageLog.create({
      data: {
        keyId: logKeyId,
        endpoint: "/api/v1/widget",
        skinType: skinType || null,
        city: locationDetails.city || null,
        ppm: locationDetails.ppm || null,
      },
    }).catch(() => {});
  }

  // ── Build embeddable JS widget ──────────────────────────────────────────────
  const jsScript = `
(function() {
  var container = document.getElementById('mirha-climate-widget');
  if (!container) return;

  var html = \`
    <div style="background: linear-gradient(135deg, #090d16 0%, #0d1527 100%); border: 1px solid #1e293b; color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 16px; border-radius: 14px; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5); max-width: 420px; margin: 12px 0;">
      <div style="display: flex; align-items: center; justify-content: space-between; border-b: 1px solid #1e293b; padding-bottom: 10px; margin-bottom: 10px;">
        <span style="font-size: 11px; font-weight: 700; color: #38bdf8; text-transform: uppercase; letter-spacing: 0.5px; display: flex; align-items: center; gap: 4px;">
          💧 Hard Water & Climate Shield
        </span>
        <span style="font-size: 11px; color: #34d399; font-weight: 600; background: rgba(52, 211, 153, 0.1); padding: 2px 8px; border-radius: 99px; border: 1px solid rgba(52, 211, 153, 0.2);">
          ${locationDetails.ppm} PPM (${locationDetails.waterCategory})
        </span>
      </div>

      <div style="margin-bottom: 8px;">
        <div style="font-size: 11px; color: #94a3b8; text-transform: uppercase;">Location Diagnostic</div>
        <div style="font-size: 13px; font-weight: 600; color: #f1f5f9;">${locationDetails.city}, ${locationDetails.country} (${locationDetails.temp}°C, ${locationDetails.humidity}% Humidity)</div>
      </div>

      <div style="background: rgba(15, 23, 42, 0.8); border: 1px solid #334155; border-radius: 8px; padding: 10px; margin-top: 8px;">
        <div style="font-size: 11px; font-weight: 600; color: #38bdf8;">Recommended Compatible Formula</div>
        <div style="font-size: 13px; font-weight: 700; color: #ffffff; margin-top: 2px;">${routine.cleanser.name}</div>
        <div style="font-size: 11px; color: #cbd5e1; margin-top: 4px; line-height: 1.4;">${routine.cleanser.reason}</div>
      </div>
    </div>
  \`;

  container.innerHTML = html;
})();
  `;

  return new NextResponse(jsScript, { headers: CORS_HEADERS });
}
