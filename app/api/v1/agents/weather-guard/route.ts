import { NextRequest, NextResponse } from "next/server";
import { runWeatherGuardAgent } from "@/lib/agents/weatherGuardAgent";
import { validateB2BRequest, securityHeaders } from "@/lib/b2bAuth";

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: securityHeaders });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { apiKey, city = "London" } = body;

    const auth = await validateB2BRequest(req, apiKey, "weather-guard");
    if (!auth.success) {
      return auth.errorResponse!;
    }

    const alert = await runWeatherGuardAgent(city);

    return NextResponse.json(
      {
        success: true,
        agentName: "Daily Weather Guard Agent v1.0",
        alert,
      },
      { headers: auth.headers }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Weather Guard Agent execution failed" },
      { status: 500, headers: securityHeaders }
    );
  }
}
