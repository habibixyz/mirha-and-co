import { NextRequest, NextResponse } from "next/server";
import { generateRoutine } from "../../../../lib/routineEngine";
import { resolveLocationDataLive } from "../../../../lib/geocoding";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import { redisCache } from "@/lib/redis";

async function isWidgetRateLimited(ip: string, limit = 30): Promise<boolean> {
  const key = `rate:widget:ip:${ip}`;
  const count = await redisCache.incr(key);
  if (count === 1) {
    await redisCache.expire(key, 60);
  }
  return count > limit;
}

function isOriginAllowed(request: NextRequest, allowedOrigins: string): boolean {
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

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/javascript",
  "Cache-Control": "public, max-age=300",
};

export async function GET(req: NextRequest) {
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "unknown";

  if (await isWidgetRateLimited(ip, 30)) {
    return new NextResponse("// Rate limit exceeded", { status: 429, headers: CORS_HEADERS });
  }

  const { searchParams } = new URL(req.url);
  const apiKey = searchParams.get("apiKey");
  const postalCode = searchParams.get("postalCode") || searchParams.get("city") || "90210";
  const skinType = searchParams.get("skinType") || "oily";
  const mainConcern = searchParams.get("mainConcern") || "acne";

  // ── Theme & branding params (purely cosmetic — never affect recommendations) ─
  const theme = searchParams.get("theme") === "light" ? "light" : "dark";
  const rawAccent = searchParams.get("accentColor") || "";
  // Accept with or without leading #, validate as hex, fall back to brand pink
  const accentHex = /^[0-9a-fA-F]{3,6}$/.test(rawAccent.replace("#", ""))
    ? `#${rawAccent.replace("#", "")}`
    : "#fc2779";

  // Build colour tokens for dark vs light themes
  const colors =
    theme === "light"
      ? {
          bg: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
          border: "#e2e8f0",
          shadow: "0 4px 20px -4px rgba(0,0,0,0.10)",
          text: "#0f172a",
          subtext: "#64748b",
          label: "#94a3b8",
          cardBg: "rgba(248,250,252,0.9)",
          cardBorder: "#e2e8f0",
          badgeBg: `rgba(16,185,129,0.10)`,
          badgeColor: "#059669",
          badgeBorder: "rgba(16,185,129,0.25)",
          accentColor: accentHex,
        }
      : {
          bg: "linear-gradient(135deg, #090d16 0%, #0d1527 100%)",
          border: "#1e293b",
          shadow: "0 10px 25px -5px rgba(0,0,0,0.5)",
          text: "#f8fafc",
          subtext: "#cbd5e1",
          label: "#94a3b8",
          cardBg: "rgba(15,23,42,0.8)",
          cardBorder: "#334155",
          badgeBg: "rgba(52,211,153,0.10)",
          badgeColor: "#34d399",
          badgeBorder: "rgba(52,211,153,0.20)",
          accentColor: accentHex,
        };

  // ── API Key validation ──────────────────────────────────────────────────────
  if (!apiKey) {
    return new NextResponse(
      "// Mirha Widget Error: Missing apiKey query parameter. Obtain a B2B key at mirhaandco.com/b2b",
      { status: 401, headers: CORS_HEADERS }
    );
  }

  const isTrial = apiKey === "b2b_trial_key";
  let logKeyId: string | null = null;
  let b2bKey: any = null;
 
  if (!isTrial) {
    const keyHash = crypto.createHash("sha256").update(apiKey).digest("hex");
    b2bKey = await prisma.b2BApiKey.findFirst({
      where: { OR: [{ keyHash }, { key: apiKey }] },
    });
 
    if (!b2bKey || b2bKey.status !== "active") {
      return new NextResponse(
        "// Mirha Widget Error: Invalid or suspended API key.",
        { status: 401, headers: CORS_HEADERS }
      );
    }
 
    // ── Domain locking validation ──────────────────────────────────────────
    if (b2bKey.allowedOrigins && b2bKey.allowedOrigins !== "*") {
      if (!isOriginAllowed(req, b2bKey.allowedOrigins)) {
        return new NextResponse(
          "// Mirha Widget Error: Forbidden. Origin not whitelisted.",
          { status: 403, headers: CORS_HEADERS }
        );
      }
    }

    logKeyId = b2bKey.id;
  }

  // ── Resolve location & generate recommendation ──────────────────────────────
  const locationDetails = await resolveLocationDataLive({ postalCode });
  
  let customCatalog: any[] | undefined = undefined;
  if (!isTrial && b2bKey?.customCatalog && Array.isArray(b2bKey.customCatalog)) {
    customCatalog = b2bKey.customCatalog;
  }

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
      catalog: customCatalog,
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
    <div style="background: ${colors.bg}; border: 1px solid ${colors.border}; color: ${colors.text}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 16px; border-radius: 14px; box-shadow: ${colors.shadow}; max-width: 420px; margin: 12px 0;">
      <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid ${colors.border}; padding-bottom: 10px; margin-bottom: 10px;">
        <span style="font-size: 11px; font-weight: 700; color: ${colors.accentColor}; text-transform: uppercase; letter-spacing: 0.5px; display: flex; align-items: center; gap: 4px;">
          💧 Hard Water &amp; Climate Shield
        </span>
        <span style="font-size: 11px; color: ${colors.badgeColor}; font-weight: 600; background: ${colors.badgeBg}; padding: 2px 8px; border-radius: 99px; border: 1px solid ${colors.badgeBorder};">
          ${locationDetails.ppm} PPM (${locationDetails.waterCategory})
        </span>
      </div>

      <div style="margin-bottom: 8px;">
        <div style="font-size: 11px; color: ${colors.label}; text-transform: uppercase; margin-bottom: 2px;">Location Diagnostic</div>
        <div style="font-size: 13px; font-weight: 600; color: ${colors.text};">${locationDetails.city}, ${locationDetails.country} (${locationDetails.temp}°C, ${locationDetails.humidity}% Humidity)</div>
      </div>

      <div style="background: ${colors.cardBg}; border: 1px solid ${colors.cardBorder}; border-radius: 8px; padding: 10px; margin-top: 8px;">
        <div style="font-size: 11px; font-weight: 600; color: ${colors.accentColor};">Recommended Compatible Formula</div>
        <div style="font-size: 13px; font-weight: 700; color: ${colors.text}; margin-top: 2px;">${routine.cleanser.name}</div>
        <div style="font-size: 11px; color: ${colors.subtext}; margin-top: 4px; line-height: 1.4;">${routine.cleanser.reason}</div>
      </div>

      <div style="margin-top: 10px; padding-top: 8px; border-top: 1px solid ${colors.border}; font-size: 10px; color: ${colors.label}; text-align: right;">
        Powered by <a href="https://www.mirhaandco.com/b2b" target="_blank" rel="noopener" style="color: ${colors.accentColor}; text-decoration: none; font-weight: 600; opacity: 0.85;">Mirha Climate Intelligence</a>
      </div>
    </div>
  \`;

  container.innerHTML = html;
})();
  `;

  return new NextResponse(jsScript, { headers: CORS_HEADERS });
}
