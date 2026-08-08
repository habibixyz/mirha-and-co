import { Redis } from "@upstash/redis";

// A serverless-safe in-memory cache fallback for localhost development
class MemoryCache {
  private cache = new Map<string, any>();
  private expiries = new Map<string, number>();

  async get<T>(key: string): Promise<T | null> {
    const now = Date.now();
    const expiry = this.expiries.get(key);
    if (expiry && now > expiry) {
      this.cache.delete(key);
      this.expiries.delete(key);
      return null;
    }
    const val = this.cache.get(key);
    if (val === undefined) return null;
    return val as T;
  }

  async set(key: string, value: any, options?: { ex?: number }): Promise<void> {
    this.cache.set(key, value);
    if (options?.ex) {
      this.expiries.set(key, Date.now() + options.ex * 1000);
    } else {
      this.expiries.delete(key); // Persists indefinitely
    }
  }

  async incr(key: string): Promise<number> {
    const now = Date.now();
    const expiry = this.expiries.get(key);
    if (expiry && now > expiry) {
      this.cache.delete(key);
      this.expiries.delete(key);
    }
    const val = (this.cache.get(key) || 0) + 1;
    this.cache.set(key, val);
    return val;
  }

  async expire(key: string, seconds: number): Promise<void> {
    this.expiries.set(key, Date.now() + seconds * 1000);
  }
}

let redis: Redis | null = null;
const isConfigured = !!(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);

if (isConfigured) {
  try {
    redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    });
  } catch (err) {
    console.error("Failed to initialize Upstash Redis client:", err);
  }
} else {
  // Graceful local development logging
  if (process.env.NODE_ENV === "development") {
    console.log("ℹ️ Upstash Redis credentials not configured. Running B2B endpoints with local in-memory fallback.");
  }
}

const memory = new MemoryCache();

export const redisCache = {
  isConfigured,
  
  async get<T>(key: string): Promise<T | null> {
    if (redis) {
      try {
        const val = await redis.get(key);
        if (typeof val === "string") {
          try {
            return JSON.parse(val) as T;
          } catch {
            return val as unknown as T;
          }
        }
        return val as T;
      } catch (err) {
        console.error(`Redis GET error for key [${key}]:`, err);
        return memory.get<T>(key);
      }
    }
    return memory.get<T>(key);
  },

  async set(key: string, value: any, options?: { ex?: number }): Promise<void> {
    if (redis) {
      try {
        const valStr = typeof value === "object" ? JSON.stringify(value) : value;
        if (options?.ex) {
          await redis.set(key, valStr, { ex: options.ex });
        } else {
          await redis.set(key, valStr);
        }
        return;
      } catch (err) {
        console.error(`Redis SET error for key [${key}]:`, err);
        await memory.set(key, value, options);
        return;
      }
    }
    await memory.set(key, value, options);
  },

  async incr(key: string): Promise<number> {
    if (redis) {
      try {
        return await redis.incr(key);
      } catch (err) {
        console.error(`Redis INCR error for key [${key}]:`, err);
        return memory.incr(key);
      }
    }
    return memory.incr(key);
  },

  async expire(key: string, seconds: number): Promise<void> {
    if (redis) {
      try {
        await redis.expire(key, seconds);
        return;
      } catch (err) {
        console.error(`Redis EXPIRE error for key [${key}]:`, err);
        await memory.expire(key, seconds);
        return;
      }
    }
    await memory.expire(key, seconds);
  }
};
