import { NextRequest, NextResponse } from "next/server";
import { runWeatherGuardAgent } from "@/lib/agents/weatherGuardAgent";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { city = "London" } = body;

    const alert = await runWeatherGuardAgent(city);

    return NextResponse.json({
      success: true,
      agentName: "Daily Weather Guard Agent v1.0",
      alert,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Weather Guard Agent execution failed" },
      { status: 500 }
    );
  }
}
