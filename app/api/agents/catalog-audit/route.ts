import { NextRequest, NextResponse } from "next/server";
import { runCatalogAuditAgent, CatalogProduct } from "@/lib/agents/catalogAuditAgent";

const DEFAULT_SAMPLE_CATALOG: CatalogProduct[] = [
  { id: "SKU-101", name: "Gentle Hydrating Cleanser", category: "Cleanser", ingredients: ["Squalane", "Glycerin", "EDTA"], price: 24.0 },
  { id: "SKU-102", name: "Ceramide Barrier Balm", category: "Moisturizer", ingredients: ["Ceramide NP", "Squalane"], price: 32.0 },
  { id: "SKU-103", name: "2% Salicylic Acid BHA Liquid", category: "Treatment", ingredients: ["Salicylic Acid", "Green Tea"], price: 28.0 },
];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const products: CatalogProduct[] = body.products || DEFAULT_SAMPLE_CATALOG;

    const audit = runCatalogAuditAgent(products);

    return NextResponse.json({
      success: true,
      agentName: "B2B Catalog Audit & Auto-Tagging Agent v1.0",
      audit,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Catalog Audit Agent execution failed" },
      { status: 500 }
    );
  }
}
