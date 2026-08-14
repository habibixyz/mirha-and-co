import { redisCache } from "@/lib/redis";

/**
 * Fixed-window rate limiter backed by Redis (falls back to in-memory in dev).
 *
 * Algorithm: INCR the key on every request. On the first hit (count === 1),
 * set the TTL so the window starts from that moment. This is a fixed window —
 * not sliding — meaning the counter resets cleanly after `windowSecs` seconds
 * from the first request in each window, regardless of when subsequent
 * requests arrived.
 *
 * @param key        Redis key, should be endpoint-scoped + IP, e.g. "rl:b2b-lookup:1.2.3.4"
 * @param limit      Maximum allowed requests per window
 * @param windowSecs Window duration in seconds
 * @returns          true if the caller is rate-limited (over limit), false otherwise
 */
export async function redisRateLimit(
  key: string,
  limit: number,
  windowSecs: number
): Promise<boolean> {
  const count = await redisCache.incr(key);
  if (count === 1) {
    await redisCache.expire(key, windowSecs);
  }
  return count > limit;
}

/**
 * Extracts the real client IP from x-forwarded-for (Vercel/proxy-safe).
 * Falls back to "unknown" when the header is absent.
 */
export function getClientIp(req: Request): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
  );
}
