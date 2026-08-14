import crypto from "crypto";

const TOKEN_TTL_MS = 24 * 60 * 60 * 1000;

function getLookupSecret() {
  return (
    process.env.B2B_KEY_LOOKUP_SECRET ||
    process.env.RAZORPAY_WEBHOOK_SECRET ||
    process.env.DODO_WEBHOOK_SECRET ||
    process.env.PADDLE_WEBHOOK_SECRET ||
    ""
  );
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function sign(payload: string, secret: string) {
  return crypto.createHmac("sha256", secret).update(payload).digest("base64url");
}

export function createB2BRetrievalToken(email: string) {
  const secret = getLookupSecret();
  if (!secret) return null;

  const payload = Buffer.from(
    JSON.stringify({
      email: normalizeEmail(email),
      exp: Date.now() + TOKEN_TTL_MS,
      nonce: crypto.randomBytes(16).toString("hex"),
    })
  ).toString("base64url");

  return `${payload}.${sign(payload, secret)}`;
}

export function verifyB2BRetrievalToken(email: string, token: string) {
  const secret = getLookupSecret();
  if (!secret || !token) return false;

  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;

  const expected = sign(payload, secret);
  const expectedBuf = Buffer.from(expected);
  const signatureBuf = Buffer.from(signature);
  if (expectedBuf.length !== signatureBuf.length || !crypto.timingSafeEqual(expectedBuf, signatureBuf)) {
    return false;
  }

  try {
    const parsed = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    return parsed.email === normalizeEmail(email) && typeof parsed.exp === "number" && parsed.exp > Date.now();
  } catch {
    return false;
  }
}
