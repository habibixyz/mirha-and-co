import { NextRequest, NextResponse } from "next/server";
import { runConciergeAgent } from "@/lib/agents/conciergeAgent";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { query = "Optimize my routine and check ingredient conflicts", skinType, mainConcern, city, currentProducts } = body;

    const result = await runConciergeAgent({
      query,
      skinType,
      mainConcern,
      city,
      currentProducts,
    });

    return NextResponse.json({
      success: true,
      agent: result,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Concierge Agent execution failed" },
      { status: 500 }
    );
  }
}
