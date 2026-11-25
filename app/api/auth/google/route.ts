import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export const dynamic = "force-dynamic";

function sanitizeRedirectPath(raw: string | null): string {
  if (!raw) return "/dashboard";
  const trimmed = raw.trim();
  if (!trimmed.startsWith("/") || trimmed.startsWith("//") || trimmed.includes("\\")) {
    return "/dashboard";
  }
  return trimmed;
}

export async function GET(req: NextRequest) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  if (!clientId) {
    return NextResponse.json(
      { error: "Google Client ID is not configured." },
      { status: 500 }
    );
  }

  const searchParams = req.nextUrl.searchParams;
  const safeRedirect = sanitizeRedirectPath(searchParams.get("redirect"));

  // Determine redirect URI matching authorized Google Cloud URIs
  const host = req.headers.get("host") || "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  const redirectUri = `${protocol}://${host}/api/auth/callback/google`;

  const nonce = crypto.randomBytes(16).toString("hex");
  const state = Buffer.from(
    JSON.stringify({ nonce, redirect: safeRedirect }),
    "utf8"
  ).toString("base64url");

  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&response_type=code&scope=openid%20email%20profile&state=${encodeURIComponent(
    state
  )}&access_type=online&prompt=select_account`;

  const res = NextResponse.redirect(googleAuthUrl);
  res.cookies.set("google_oauth_nonce", nonce, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 600,
  });

  return res;
}
