import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");
    if (!slug) {
      return NextResponse.json({ error: "Missing slug" }, { status: 400 });
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
