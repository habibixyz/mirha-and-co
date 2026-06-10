import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { AnalysisClient } from "./AnalysisClient";

export default async function AnalysisPage() {
 const session = await getSession();
 if (!session || !session.userId) {
 redirect("/login");
 }

 // Fetch current user and subscription details
 const user = await prisma.user.findUnique({
 where: { id: session.userId },
 include: { subscription: true },
 });

 if (!user) {
 redirect("/login");
 }

 // Fetch past face analyses
 const pastAnalyses = await prisma.faceAnalysis.findMany({
 where: { userId: session.userId },
 orderBy: { createdAt: "desc" },
 take: 5,
 });

 // Calculate if the user has scanned in the last 24 hours
 const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
 const recentScan = await prisma.faceAnalysis.findFirst({
 where: {
 userId: user.id,
 createdAt: { gte: twentyFourHoursAgo },
 },
 });

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
 detailedJson: typeof a.detailedJson === "string" 
 ? JSON.parse(a.detailedJson) 
 : a.detailedJson,
 createdAt: a.createdAt.toISOString(),
 }))}
 nextAvailableAt={nextAvailableAt}
 />
 );
}


