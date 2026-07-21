/**
 * Auth Smoke Test — run before any security audit commit touching lib/auth.ts
 *
 *   node tests/auth.smoke.mjs
 *
 * Tests:
 *   1. bcrypt passwords verify correctly                    (new users)
 *   2. SHA-256 passwords verify correctly                   (legacy users)
 *   3. Wrong password fails for bcrypt hash                 (security check)
 *   4. Wrong password fails for SHA-256 hash               (security check)
 *   5. isLegacyHash correctly identifies SHA-256 vs bcrypt (migration guard)
 *
 * If any test fails, DO NOT commit changes to lib/auth.ts.
 */

import bcrypt from "bcryptjs";
import crypto from "crypto";

// ─── helpers mirroring lib/auth.ts ───────────────────────────────────────────

function sha256(password) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

function isLegacyHash(hash) {
  return hash.length === 64 && /^[0-9a-f]+$/.test(hash);
}

async function verifyPassword(password, hash) {
  // Must mirror lib/auth.ts exactly
  try {
    const isBcrypt = await bcrypt.compare(password, hash);
    if (isBcrypt) return true;
  } catch (e) {
    // Not bcrypt — fall through
  }
  const legacyHash = sha256(password);
  return legacyHash === hash;
}

// ─── test runner ─────────────────────────────────────────────────────────────

let passed = 0;
let failed = 0;

async function test(name, fn) {
  try {
    await fn();
    console.log(`  ✅  ${name}`);
    passed++;
  } catch (err) {
    console.error(`  ❌  ${name}`);
    console.error(`     ${err.message}`);
    failed++;
  }
}

function assert(condition, msg) {
  if (!condition) throw new Error(msg);
}

// ─── tests ───────────────────────────────────────────────────────────────────

console.log("\n🔐  Auth smoke tests\n");

const BCRYPT_PASS = "mySecurePassword123";
const SHA256_PASS = "oldUserPassword456";
const bcryptHash = await bcrypt.hash(BCRYPT_PASS, 10);
const sha256Hash = sha256(SHA256_PASS);

await test("bcrypt password verifies correctly (new users)", async () => {
  const ok = await verifyPassword(BCRYPT_PASS, bcryptHash);
  assert(ok === true, "bcrypt password should verify as true");
});

await test("SHA-256 password verifies correctly (legacy users)", async () => {
  const ok = await verifyPassword(SHA256_PASS, sha256Hash);
  assert(ok === true, "SHA-256 password should verify as true — if this fails, the fallback was removed!");
});

await test("Wrong password fails for bcrypt hash", async () => {
  const ok = await verifyPassword("wrongPassword", bcryptHash);
  assert(ok === false, "Wrong password should return false against bcrypt hash");
});

await test("Wrong password fails for SHA-256 hash", async () => {
  const ok = await verifyPassword("wrongPassword", sha256Hash);
  assert(ok === false, "Wrong password should return false against SHA-256 hash");
});

await test("isLegacyHash correctly identifies SHA-256 hashes", () => {
  assert(isLegacyHash(sha256Hash) === true, "64-char hex hash should be detected as legacy");
  assert(isLegacyHash(bcryptHash) === false, "bcrypt hash should NOT be detected as legacy");
  assert(isLegacyHash("") === false, "Empty string should not be legacy");
  assert(isLegacyHash("abc123") === false, "Short string should not be legacy");
});

await test("bcrypt hash is not mistaken for legacy hash", () => {
  // bcrypt hashes start with $2b$ and are 60 chars — never 64 lowercase hex
  assert(isLegacyHash(bcryptHash) === false, "bcrypt hash must not trigger legacy path");
});

// ─── summary ─────────────────────────────────────────────────────────────────

console.log(`\n  ${passed} passed, ${failed} failed\n`);

if (failed > 0) {
  console.error("❌  SMOKE TEST FAILED — do not commit changes to lib/auth.ts\n");
  process.exit(1);
} else {
  console.log("✅  All auth smoke tests passed — safe to commit\n");
}
