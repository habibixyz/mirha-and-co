import { cookies } from "next/headers";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";
import crypto from "crypto";

export async function getSession() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("mirha_session")?.value;

  if (!sessionId) return null;

  let session;
  try {
    session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: { user: true }
    });
  } catch (error) {
    console.error("Session lookup error:", error);
    return null;
  }

  if (!session || session.expiresAt < new Date()) {
    try {
      cookieStore.delete({ name: "mirha_session", path: "/" });
    } catch {
      // Ignore if called in read-only render context
    }
    return null;
  }

  return session;
}

export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

  const session = await prisma.session.create({
    data: {
      userId,
      expiresAt
    }
  });

  const cookieStore = await cookies();
  cookieStore.set("mirha_session", session.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt
  });

  return session;
}

export async function logout() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("mirha_session")?.value;

  if (sessionId) {
    try {
      await prisma.session.delete({ where: { id: sessionId } });
    } catch (e) {
      console.error("Session deletion error on logout:", e);
    }
  }

  try {
    cookieStore.delete({ name: "mirha_session", path: "/" });
  } catch {
    cookieStore.delete("mirha_session");
  }
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

/**
 * ⚠️  AUDIT SAFETY — DO NOT REMOVE SHA-256 FALLBACK ⚠️
 *
 * Background: Early users of Mirha & Co. had passwords stored as plain
 * SHA-256 hex hashes (64 lowercase hex chars). All accounts created after
 * the bcrypt migration store passwords as bcrypt hashes ($2b$... prefix).
 *
 * REMOVING the SHA-256 fallback will silently lock out every pre-migration
 * user with no error visible in the build — their login just fails with
 * "Invalid email or password" and they have no way to know why.
 *
 * This regression already happened once (commit d1bd86b, security audit).
 * Fix was commit 835941d. Do not repeat it.
 *
 * The correct approach to phase out SHA-256 entirely:
 *   1. Keep the fallback until all users have logged in at least once
 *      (the transparent upgrade in loginAction replaces their hash with bcrypt).
 *   2. Add a DB query to count users WHERE passwordHash NOT LIKE '$2b$%'.
 *   3. Only remove this fallback when that count is 0 for 30+ days.
 *
 * Run `node tests/auth.smoke.mjs` to verify both hash types still work
 * before committing any changes to this file.
 */
export async function verifyPassword(password: string, hash: string) {
  // Try bcrypt first (all new accounts use bcrypt)
  try {
    const isBcrypt = await bcrypt.compare(password, hash);
    if (isBcrypt) return true;
  } catch (e) {
    // Not a valid bcrypt hash — fall through to legacy check
  }

  // Fallback: legacy SHA-256 check (accounts created before bcrypt migration)
  // See audit warning above before touching this block.
  const legacyHash = crypto.createHash("sha256").update(password).digest("hex");
  return legacyHash === hash;
}

/**
 * Returns true if hash is a legacy SHA-256 hex string (64 lowercase hex chars).
 * Used by loginAction to trigger transparent bcrypt upgrade on login.
 * Keep in sync with verifyPassword — if you stub this out, the upgrade
 * never fires and old users will be stuck on SHA-256 indefinitely.
 */
export function isLegacyHash(hash: string) {
  return hash.length === 64 && /^[0-9a-f]+$/.test(hash);
}
