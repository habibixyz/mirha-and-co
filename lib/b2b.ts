import crypto from "crypto";

/**
 * Generates a new B2B API key with the appropriate prefix for the given tier.
 * "scale" → "b2b_scale_<40 hex chars>"
 * "growth" (default) → "b2b_live_<40 hex chars>"
 */
export function generateB2BKey(tier: string): string {
  const prefix = tier === "scale" ? "b2b_scale_" : "b2b_live_";
  return prefix + crypto.randomBytes(20).toString("hex");
}

/**
 * Returns the first day of next month at 00:00:00 UTC — used for monthly quota resets.
 * Using UTC avoids timezone-dependent drift on different server environments.
 */
export function nextMonthUTC(): Date {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1, 0, 0, 0, 0));
}

/**
 * Returns the monthly call quota for a given B2B tier.
 */
export function quotaForTier(tier: string): number {
  return tier === "scale" ? 1_000_000 : 150_000;
}
