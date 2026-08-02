import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  let dbOk = false;
  let dbLatencyMs: number | null = null;

  try {
    const t0 = Date.now();
    await prisma.$queryRaw`SELECT 1`;
    dbLatencyMs = Date.now() - t0;
    dbOk = true;
  } catch {
    // DB unreachable — respond 503 so monitors can alert
  }

  const status = dbOk ? "ok" : "degraded";

  return NextResponse.json(
    {
      status,
      service: "mirha-b2b-api",
      timestamp: new Date().toISOString(),
      checks: {
        database: dbOk ? "connected" : "unreachable",
        ...(dbLatencyMs !== null && { dbLatencyMs }),
      },
    },
    {
      status: dbOk ? 200 : 503,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-store",
      },
    }
  );
}
