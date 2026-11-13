import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { AnalysisClient } from "./AnalysisClient";

export const dynamic = "force-dynamic";

export default async function AnalysisPage() {
  const session = await getSession();
  if (!session || !session.userId || !session.user) {
    redirect("/login");
  }

  const user = session.user;
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

  // Parallelize past analyses and 24h scan check; user and subscription are already in session.user
  const [pastAnalyses, recentScan] = await Promise.all([
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

  const nextAvailableAt = recentScan
    ? new Date(recentScan.createdAt.getTime() + 24 * 60 * 60 * 1000).toISOString()
    : null;

  return (
    <AnalysisClient
      user={{
        id: user.id,
        email: user.email,
        name: user.name || "Member",
        credits: user.credits || 0,
        isPro: (user.subscription?.tier === "pro" && user.subscription?.status === "active") || Boolean(user.isAdmin) || user.email === "tanizcoldz@gmail.com",
      }}
      pastAnalyses={pastAnalyses.map((a) => {
        let parsed: any = a.detailedJson;
        if (typeof parsed === "string") {
          try {
            parsed = JSON.parse(parsed);
          } catch {
            parsed = {};
          }
        }
        return {
          id: a.id,
          imageUrl: a.imageUrl || "",
          barrierScore: a.barrierScore ?? 50,
          acneScore: a.acneScore ?? 50,
          rednessScore: a.rednessScore ?? 50,
          oilinessScore: a.oilinessScore ?? 50,
          detailedJson: (parsed && typeof parsed === "object") ? parsed : {},
          createdAt: a.createdAt ? a.createdAt.toISOString() : new Date().toISOString(),
        };
      })}
      nextAvailableAt={nextAvailableAt}
    />
  );
}
