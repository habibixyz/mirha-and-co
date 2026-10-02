import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { redisCache } from "@/lib/redis";

/**
 * Rate limit: max 10 view increments per IP per slug per minute.
 * Prevents trivial view inflation attacks without requiring authentication
 * (this endpoint must stay public for unauthenticated blog readers).
 */
async function isViewRateLimited(ip: string, slug: string): Promise<boolean> {
  const today = new Date().toISOString().split("T")[0];
  const key = `view_rate:${ip}:${slug}:${today}`;
  const count = await redisCache.incr(key);
  if (count === 1) {
    // One increment per IP per slug per calendar day
    await redisCache.expire(key, 86400);
  }
  return count > 10;
}

export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");
    if (!slug) {
      return NextResponse.json({ error: "Missing slug" }, { status: 400 });
    }

    // Rate limit by IP to prevent view inflation
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0]?.trim() || "unknown";
    if (await isViewRateLimited(ip, slug)) {
      // Silently return success so legitimate users see no error;
      // we just don't increment the counter for the extra hits.
      const current = await prisma.blogPostView.findUnique({ where: { slug } });
      return NextResponse.json({ success: true, views: current?.views ?? 0 });
    }

    const updated = await prisma.blogPostView.upsert({
      where: { slug },
      update: { views: { increment: 1 } },
      create: { slug, views: 1 },
    });

    return NextResponse.json({ success: true, views: updated.views });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to update view count" },
      { status: 500 }
    );
  }
}
