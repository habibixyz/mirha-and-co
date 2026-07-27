import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    { status: "ok", service: "mirha-ai", timestamp: new Date().toISOString() },
    { status: 200 }
  );
}
