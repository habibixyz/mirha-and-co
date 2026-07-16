import { NextRequest, NextResponse } from "next/server";
import { generateRoutine, QuizAnswers, resolveLocationData } from "../../../../lib/routineEngine";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const apiKey = searchParams.get("apiKey") || "b2b_trial_key";
  const postalCode = searchParams.get("postalCode") || searchParams.get("city") || "90210";
  const skinType = searchParams.get("skinType") || "oily";
  const mainConcern = searchParams.get("mainConcern") || "acne";

  const locationDetails = resolveLocationData({ postalCode });
  const routine = generateRoutine(
    { skinType, mainConcern, budget: "under_1000", experience: "beginner" },
    { postalCode }
  );

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

  return new NextResponse(jsScript, {
    headers: {
      "Content-Type": "application/javascript",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=300",
    },
  });
}
