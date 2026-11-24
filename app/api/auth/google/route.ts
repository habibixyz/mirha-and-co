import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  if (!clientId) {
    return NextResponse.json(
      { error: "Google Client ID is not configured." },
      { status: 500 }
    );
  }

  const searchParams = req.nextUrl.searchParams;
  const redirectVal = searchParams.get("redirect") || "/dashboard";

  // Determine redirect URI matching authorized Google Cloud URIs
  const host = req.headers.get("host") || "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  const redirectUri = `${protocol}://${host}/api/auth/callback/google`;

  const state = encodeURIComponent(redirectVal);

  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&response_type=code&scope=openid%20email%20profile&state=${state}&access_type=online&prompt=select_account`;

  return NextResponse.redirect(googleAuthUrl);
}
