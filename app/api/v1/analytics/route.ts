import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const apiKey = searchParams.get("apiKey");

  if (!apiKey) {
    return NextResponse.json(
      { success: false, error: "Unauthorized. apiKey query parameter is required." },
      { status: 401, headers: CORS_HEADERS }
    );
  }

  const isTrial = apiKey === "b2b_trial_key";
  let keyId = "";

  if (!isTrial) {
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
    keyId = b2bKey.id;
  }

  // Return mock details for the trial key playground
  if (isTrial) {
    return NextResponse.json(
      {
        success: true,
        analytics: {
          totalRequests: 328,
          skinTypes: { oily: 145, dry: 78, combination: 85, sensitive: 20 },
          cities: { Mumbai: 112, Delhi: 89, London: 65, Bangalore: 62 },
          waterHardness: { soft: 35, moderate: 72, hard: 121, veryHard: 100 },
          endpoints: { "/api/v1/recommend": 250, "/api/v1/widget": 78 }
        }
      },
      { status: 200, headers: CORS_HEADERS }
    );
  }

  // Query actual logs
  const logs = await prisma.b2BUsageLog.findMany({
    where: { keyId },
    select: {
      endpoint: true,
      skinType: true,
      city: true,
      ppm: true,
    },
  });

  const skinTypes: Record<string, number> = {};
  const cities: Record<string, number> = {};
  const endpoints: Record<string, number> = {};
  const waterHardness = { soft: 0, moderate: 0, hard: 0, veryHard: 0 };

  logs.forEach((log) => {
    // Skin Types
    const st = log.skinType || "unknown";
    skinTypes[st] = (skinTypes[st] || 0) + 1;

    // Cities
    const c = log.city || "unknown";
    cities[c] = (cities[c] || 0) + 1;

    // Endpoints
    const ep = log.endpoint || "unknown";
    endpoints[ep] = (endpoints[ep] || 0) + 1;

    // Water Hardness PPM
    const ppm = log.ppm;
    if (ppm !== null && ppm !== undefined) {
      if (ppm < 75) waterHardness.soft++;
      else if (ppm <= 150) waterHardness.moderate++;
      else if (ppm <= 250) waterHardness.hard++;
      else waterHardness.veryHard++;
    }
  });

  const sortedCities = Object.fromEntries(
    Object.entries(cities)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
  );

  return NextResponse.json(
    {
      success: true,
      analytics: {
        totalRequests: logs.length,
        skinTypes,
        cities: sortedCities,
        waterHardness,
        endpoints,
      },
    },
    { status: 200, headers: CORS_HEADERS }
  );
}
