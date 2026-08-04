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
    const { apiKey, allowedOrigins } = body;

    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. apiKey is required." },
        { status: 401, headers: CORS_HEADERS }
      );
    }

    if (allowedOrigins === undefined || allowedOrigins === null) {
      return NextResponse.json(
        { success: false, error: "allowedOrigins is required." },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    const isTrial = apiKey === "b2b_trial_key";

    if (isTrial) {
      return NextResponse.json(
        {
          success: true,
          message: "Settings updated successfully (Trial mode — not saved to DB).",
          allowedOrigins,
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

    const sanitizedOrigins = (allowedOrigins || "").trim();

    await prisma.b2BApiKey.update({
      where: { id: b2bKey.id },
      data: { allowedOrigins: sanitizedOrigins },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Settings updated successfully.",
        allowedOrigins: sanitizedOrigins,
      },
      { status: 200, headers: CORS_HEADERS }
    );
  } catch (error) {
    console.error("[/api/b2b/update-settings] Error updating settings:", error);
    return NextResponse.json(
      { success: false, error: "An internal error occurred." },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
