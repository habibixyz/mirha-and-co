import { NextRequest, NextResponse } from "next/server";
import { runConciergeAgent } from "@/lib/agents/conciergeAgent";
import { validateB2BRequest, securityHeaders } from "@/lib/b2bAuth";

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: securityHeaders });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const {
      apiKey,
      query = "Optimize my routine and check ingredient conflicts",
      skinType,
      mainConcern,
      city,
      currentProducts,
    } = body;

    const auth = await validateB2BRequest(req, apiKey, "concierge");
    if (!auth.success) {
      return auth.errorResponse!;
    }

    const result = await runConciergeAgent({
      query,
      skinType,
      mainConcern,
      city,
      currentProducts,
    });

    return NextResponse.json(
      {
        success: true,
        agent: result,
      },
      { headers: auth.headers }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Concierge Agent execution failed" },
      { status: 500, headers: securityHeaders }
    );
  }
}
