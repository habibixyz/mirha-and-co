import { NextRequest, NextResponse } from "next/server";
import { runCatalogAuditAgent } from "@/lib/agents/catalogAuditAgent";
import { validateB2BRequest, securityHeaders } from "@/lib/b2bAuth";

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: securityHeaders });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { apiKey, products = [] } = body;

    const auth = await validateB2BRequest(req, apiKey, "catalog-audit");
    if (!auth.success) {
      return auth.errorResponse!;
    }

    const audit = runCatalogAuditAgent(products);

    return NextResponse.json(
      {
        success: true,
        agentName: "B2B Catalog Audit & Auto-Tagging Agent v1.0",
        audit,
      },
      { headers: auth.headers }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Catalog Audit Agent execution failed" },
      { status: 500, headers: securityHeaders }
    );
  }
}
