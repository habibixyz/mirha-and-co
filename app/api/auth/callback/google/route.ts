import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createSession, hashPassword } from "@/lib/auth";
import crypto from "crypto";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");

  const returnTo = state ? decodeURIComponent(state) : "/dashboard";

  if (error || !code) {
    console.error("Google OAuth error or code missing:", error);
    return NextResponse.redirect(
      new URL(`/login?error=${encodeURIComponent(error || "Google sign-in was cancelled")}`, req.url)
    );
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  const host = req.headers.get("host") || "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  const redirectUri = `${protocol}://${host}/api/auth/callback/google`;

  try {
    // 1. Exchange authorization code for tokens
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: clientId || "",
        client_secret: clientSecret || "",
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    if (!tokenRes.ok) {
      const errText = await tokenRes.text();
      console.error("Google token exchange failed:", errText);
      return NextResponse.redirect(
        new URL("/login?error=Failed+to+authenticate+with+Google", req.url)
      );
    }

    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;

    // 2. Fetch User Profile from Google
    const profileRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!profileRes.ok) {
      return NextResponse.redirect(
        new URL("/login?error=Failed+to+fetch+Google+profile", req.url)
      );
    }

    const profile = await profileRes.json();
    const email = profile.email?.toLowerCase().trim();
    const name = profile.name || email.split("@")[0];
    const picture = profile.picture;

    if (!email) {
      return NextResponse.redirect(
        new URL("/login?error=Google+account+did+not+provide+an+email", req.url)
      );
    }

    // 3. Find or Create User in PostgreSQL via Prisma
    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Secure random password hash for OAuth accounts (can still reset password if needed)
      const randomSecret = crypto.randomBytes(32).toString("hex");
      const passwordHash = await hashPassword(randomSecret);

      user = await prisma.user.create({
        data: {
          email,
          name,
          passwordHash,
          avatar: picture,
        },
      });
    } else if (picture && !user.avatar) {
      // Update avatar if not already set
      await prisma.user.update({
        where: { id: user.id },
        data: { avatar: picture },
      });
    }

    // 4. Create Session (sets mirha_session cookie)
    await createSession(user.id);

    // 5. Redirect to destination
    return NextResponse.redirect(new URL(returnTo, req.url));
  } catch (err: any) {
    console.error("Google OAuth callback error:", err);
    return NextResponse.redirect(
      new URL("/login?error=An+unexpected+error+occurred+during+sign-in", req.url)
    );
  }
}
