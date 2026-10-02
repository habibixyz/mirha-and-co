import { NextRequest, NextResponse } from "next/server";
import { generateRoutine } from "../../../../lib/routineEngine";
import { resolveLocationDataLive } from "../../../../lib/geocoding";
import { prisma } from "@/lib/prisma";
import { validateB2BRequest, isRateLimited } from "@/lib/b2bAuth";

// Widget responses are always application/javascript — even errors.
// This is intentional: partner sites embed this via <script src="..."> and
// a non-JS Content-Type causes browsers to block the script execution.
const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/javascript",
  "Cache-Control": "public, max-age=300",
};

/** Separate IP-level rate limit for the widget endpoint (30/min/IP).
 *  Runs BEFORE auth so unauthenticated scrapers are shed cheaply.
 *  Uses the canonical isRateLimited from lib/b2bAuth — not a local copy. */
async function isWidgetIpLimited(ip: string): Promise<boolean> {
  return isRateLimited(`widget:ip:${ip}`, 30);
}

/** Map a B2B auth error HTTP status to a user-facing JS comment message. */
function widgetErrorMsg(status: number): string {
  if (status === 401) return "Invalid or missing API key. Obtain one at mirhaandco.com/b2b";
  if (status === 403) return "Forbidden. Origin not whitelisted for this API key.";
  if (status === 429) return "Rate limit or monthly quota exceeded. Please try again later.";
  return "Authentication failed. Contact support at mirhaandco.com/b2b";
}

export async function GET(req: NextRequest) {
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "unknown";

  // Shed unauthenticated/scraper traffic cheaply before touching the DB
  if (await isWidgetIpLimited(ip)) {
    return new NextResponse("// Rate limit exceeded", { status: 429, headers: CORS_HEADERS });
  }

  const { searchParams } = new URL(req.url);
  const apiKey      = searchParams.get("apiKey");
  const postalCode  = searchParams.get("postalCode") || searchParams.get("city") || "90210";
  const skinType    = searchParams.get("skinType")    || "oily";
  const mainConcern = searchParams.get("mainConcern") || "acne";

  // ── Missing key — return a descriptive error before DB lookup ──────────────
  if (!apiKey) {
    return new NextResponse(
      "// Mirha Widget Error: Missing apiKey query parameter. Obtain a B2B key at mirhaandco.com/b2b",
      { status: 401, headers: CORS_HEADERS }
    );
  }

  // ── Theme & branding params (purely cosmetic — never affect recommendations) ─
  const theme    = searchParams.get("theme") === "light" ? "light" : "dark";
  const rawAccent = searchParams.get("accentColor") || "";
  // Accept with or without leading #, validate as hex, fall back to brand pink
  const accentHex = /^[0-9a-fA-F]{3,6}$/.test(rawAccent.replace("#", ""))
    ? `#${rawAccent.replace("#", "")}`
    : "#fc2779";

  // Build colour tokens for dark vs light themes
  const colors =
    theme === "light"
      ? {
          bg:          "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
          border:      "#e2e8f0",
          shadow:      "0 4px 20px -4px rgba(0,0,0,0.10)",
          text:        "#0f172a",
          subtext:     "#64748b",
          label:       "#94a3b8",
          cardBg:      "rgba(248,250,252,0.9)",
          cardBorder:  "#e2e8f0",
          badgeBg:     `rgba(16,185,129,0.10)`,
          badgeColor:  "#059669",
          badgeBorder: "rgba(16,185,129,0.25)",
          accentColor: accentHex,
        }
      : {
          bg:          "linear-gradient(135deg, #090d16 0%, #0d1527 100%)",
          border:      "#1e293b",
          shadow:      "0 10px 25px -5px rgba(0,0,0,0.5)",
          text:        "#f8fafc",
          subtext:     "#cbd5e1",
          label:       "#94a3b8",
          cardBg:      "rgba(15,23,42,0.8)",
          cardBorder:  "#334155",
          badgeBg:     "rgba(52,211,153,0.10)",
          badgeColor:  "#34d399",
          badgeBorder: "rgba(52,211,153,0.20)",
          accentColor: accentHex,
        };

  // ── Auth + quota ───────────────────────────────────────────────────────────
  // validateB2BRequest handles: domain locking, quota reset, burst rate limit,
  // atomic quota increment, AND quota threshold emails (80% warning + exhaustion).
  const auth = await validateB2BRequest(req, apiKey, "widget");
  if (!auth.success) {
    const status = auth.errorStatus ?? 401;
    return new NextResponse(
      `// Mirha Widget Error: ${widgetErrorMsg(status)}`,
      { status, headers: CORS_HEADERS }
    );
  }

  const { isTrial, logKeyId } = auth;

  // ── Resolve location & generate recommendation ─────────────────────────────
  const locationDetails = await resolveLocationDataLive({ postalCode });

  let customCatalog: any[] | undefined = undefined;
  if (!isTrial && auth.b2bKey?.customCatalog && Array.isArray(auth.b2bKey.customCatalog)) {
    customCatalog = auth.b2bKey.customCatalog;
  }

  const routine = generateRoutine(
    { skinType, mainConcern, budget: "under_1000", experience: "beginner" },
    {
      city:       locationDetails.city,
      country:    locationDetails.countryCode,
      postalCode,
      ppm:        locationDetails.ppm,
      temp:       locationDetails.temp,
      humidity:   locationDetails.humidity,
      dewpoint:   locationDetails.dewpoint,
      catalog:    customCatalog,
    }
  );

  // Log widget usage (fire-and-forget, only for verified live keys)
  if (logKeyId) {
    prisma.b2BUsageLog.create({
      data: {
        keyId:    logKeyId,
        endpoint: "/api/v1/widget",
        skinType: skinType || null,
        city:     locationDetails.city || null,
        ppm:      locationDetails.ppm  || null,
      },
    }).catch(() => {});
  }

  // ── Build embeddable JS widget ─────────────────────────────────────────────
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
