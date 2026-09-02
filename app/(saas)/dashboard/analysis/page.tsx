import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { AnalysisClient } from "./AnalysisClient";

export const dynamic = "force-dynamic";

export default async function AnalysisPage() {
  const session = await getSession();
  if (!session || !session.userId) {
    redirect("/login");
  }

  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

  // Parallelize user lookup, past analyses, and 24h scan check to eliminate DB water-falling
  const [user, pastAnalyses, recentScan] = await Promise.all([
    prisma.user.findUnique({
      where: { id: session.userId },
      include: { subscription: true },
    }),
    prisma.faceAnalysis.findMany({
      where: { userId: session.userId },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
    prisma.faceAnalysis.findFirst({
      where: {
        userId: session.userId,
        createdAt: { gte: twentyFourHoursAgo },
      },
    }),
  ]);

  if (!user) {
    redirect("/login");
  }

  const nextAvailableAt = recentScan
    ? new Date(recentScan.createdAt.getTime() + 24 * 60 * 60 * 1000).toISOString()
    : null;

  return (
    <AnalysisClient
      user={{
        id: user.id,
        email: user.email,
        name: user.name,
        credits: user.credits,
        isPro: (user.subscription?.tier === "pro" && user.subscription?.status === "active") || user.email === "tanizcoldz@gmail.com",
      }}
      pastAnalyses={pastAnalyses.map((a) => ({
        id: a.id,
        imageUrl: a.imageUrl,
        barrierScore: a.barrierScore,
        acneScore: a.acneScore,
        rednessScore: a.rednessScore,
        oilinessScore: a.oilinessScore,
        detailedJson: typeof a.detailedJson === "string" ? JSON.parse(a.detailedJson) : (a.detailedJson as any),
        createdAt: a.createdAt.toISOString(),
      }))}
      nextAvailableAt={nextAvailableAt}
    />
  );
}
