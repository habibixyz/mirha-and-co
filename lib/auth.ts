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
    expires: expiresAt
  });

  return session;
}

export async function logout() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("mirha_session")?.value;

  if (sessionId) {
    await prisma.session.delete({ where: { id: sessionId } });
  }

  cookieStore.delete("mirha_session");
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string) {
  // Try bcrypt first
  try {
    const isBcrypt = await bcrypt.compare(password, hash);
    if (isBcrypt) return true;
  } catch (e) {
    // Not a bcrypt hash, continue to legacy check
  }

  // Fallback to legacy SHA-256 check
  const legacyHash = crypto.createHash("sha256").update(password).digest("hex");
  return legacyHash === hash;
}

export function isLegacyHash(hash: string) {
  // SHA-256 hashes are exactly 64 characters of hex
  return hash.length === 64 && /^[0-9a-f]+$/.test(hash);
}
