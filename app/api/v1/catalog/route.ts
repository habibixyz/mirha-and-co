import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { apiKey, catalog } = body;

    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. apiKey is required." },
        { status: 401, headers: CORS_HEADERS }
      );
    }

    if (!catalog || !Array.isArray(catalog)) {
      return NextResponse.json(
        { success: false, error: "Invalid catalog format. Must be an array of products." },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    const isTrial = apiKey === "b2b_trial_key";
    
    // Validate trial key vs live key
    if (isTrial) {
      return NextResponse.json(
        {
          success: true,
          message: "Catalog synchronized successfully (Trial mode — not saved to DB).",
          syncedItemsCount: Math.min(catalog.length, 100),
        },
        { status: 200, headers: CORS_HEADERS }
      );
    }

    const keyHash = crypto.createHash("sha256").update(apiKey).digest("hex");
    const b2bKey = await prisma.b2BApiKey.findFirst({
      where: { OR: [{ keyHash }, { key: apiKey }] },
    });

    if (!b2bKey || b2bKey.status !== "active") {
      return NextResponse.json(
        { success: false, error: "Invalid or suspended API key." },
        { status: 401, headers: CORS_HEADERS }
      );
    }

    // Cap the catalog at 100 items for security/performance
    const safeCatalog = catalog.slice(0, 100);

    // Save to the database
    await prisma.b2BApiKey.update({
      where: { id: b2bKey.id },
      data: { customCatalog: safeCatalog as any },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Catalog synchronized successfully.",
        syncedItemsCount: safeCatalog.length,
      },
      { status: 200, headers: CORS_HEADERS }
    );
  } catch (error) {
    console.error("[/api/v1/catalog] Error syncing catalog:", error);
    return NextResponse.json(
      { success: false, error: "An internal error occurred." },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
