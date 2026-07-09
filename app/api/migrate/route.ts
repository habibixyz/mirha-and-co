import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (code !== "migrate2026") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Create temporary client for source database (old internal postgres)
  const sourceDb = new PrismaClient({
    datasources: {
      db: {
        url: "postgresql://postgres:MdeGjWOuoSnZVRIxqbVLEbOnHtkOyJNk@postgres.railway.internal:5432/railway",
      },
    },
  });

  // Create client for destination database (new postgres)
  const destDb = new PrismaClient({
    datasources: {
      db: {
        url: "postgresql://postgres:GTXfwPAGSDBgHCMsdDExsdoZyvVbhcEJ@postgres-7s0y.railway.internal:5432/railway",
      },
    },
  });

  const report: Record<string, any> = {};

  try {
    // 1. User
    const users = await sourceDb.user.findMany();
    report.usersSourceCount = users.length;
    for (const u of users) {
      await destDb.user.upsert({
        where: { id: u.id },
        update: {
          email: u.email,
          name: u.name,
          passwordHash: u.passwordHash,
          skinProfile: u.skinProfile as any,
          avatar: u.avatar,
          credits: u.credits,
          createdAt: u.createdAt,
          updatedAt: u.updatedAt,
        },
        create: {
          id: u.id,
          email: u.email,
          name: u.name,
          passwordHash: u.passwordHash,
          skinProfile: u.skinProfile as any,
          avatar: u.avatar,
          credits: u.credits,
          createdAt: u.createdAt,
          updatedAt: u.updatedAt,
        },
      });
    }
    report.usersMigrated = users.length;

    // 2. Routine
    const routines = await sourceDb.routine.findMany();
    for (const r of routines) {
      await destDb.routine.upsert({
        where: { id: r.id },
        update: {
          userId: r.userId,
          name: r.name,
          routine: r.routine as any,
          metadata: r.metadata as any,
          createdAt: r.createdAt,
          updatedAt: r.updatedAt,
        },
        create: {
          id: r.id,
          userId: r.userId,
          name: r.name,
          routine: r.routine as any,
          metadata: r.metadata as any,
          createdAt: r.createdAt,
          updatedAt: r.updatedAt,
        },
      });
    }
    report.routinesMigrated = routines.length;

    // 3. SkinJournal
    const journals = await sourceDb.skinJournal.findMany();
    for (const j of journals) {
      await destDb.skinJournal.upsert({
        where: { id: j.id },
        update: {
          userId: j.userId,
          date: j.date,
          entry: j.entry,
          photos: j.photos as any,
          concerns: j.concerns,
          aiAnalysis: j.aiAnalysis as any,
          rating: j.rating,
          createdAt: j.createdAt,
        },
        create: {
          id: j.id,
          userId: j.userId,
          date: j.date,
          entry: j.entry,
          photos: j.photos as any,
          concerns: j.concerns,
          aiAnalysis: j.aiAnalysis as any,
          rating: j.rating,
          createdAt: j.createdAt,
        },
      });
    }
    report.journalsMigrated = journals.length;

    // 4. Subscription
    const subs = await sourceDb.subscription.findMany();
    for (const s of subs) {
      await destDb.subscription.upsert({
        where: { id: s.id },
        update: {
          userId: s.userId,
          tier: s.tier,
          stripePriceId: s.stripePriceId,
          stripeSubscriptionId: s.stripeSubscriptionId,
          status: s.status,
          trialEndsAt: s.trialEndsAt,
          endsAt: s.endsAt,
          createdAt: s.createdAt,
          updatedAt: s.updatedAt,
        },
        create: {
          id: s.id,
          userId: s.userId,
          tier: s.tier,
          stripePriceId: s.stripePriceId,
          stripeSubscriptionId: s.stripeSubscriptionId,
          status: s.status,
          trialEndsAt: s.trialEndsAt,
          endsAt: s.endsAt,
          createdAt: s.createdAt,
          updatedAt: s.updatedAt,
        },
      });
    }
    report.subscriptionsMigrated = subs.length;

    // 5. Session
    const sessions = await sourceDb.session.findMany();
    for (const s of sessions) {
      await destDb.session.upsert({
        where: { id: s.id },
        update: {
          userId: s.userId,
          expiresAt: s.expiresAt,
          createdAt: s.createdAt,
        },
        create: {
          id: s.id,
          userId: s.userId,
          expiresAt: s.expiresAt,
          createdAt: s.createdAt,
        },
      });
    }
    report.sessionsMigrated = sessions.length;

    // 6. PasswordResetToken
    const resetTokens = await sourceDb.passwordResetToken.findMany();
    for (const t of resetTokens) {
      await destDb.passwordResetToken.upsert({
        where: { id: t.id },
        update: {
          tokenHash: t.tokenHash,
          userId: t.userId,
          expiresAt: t.expiresAt,
          usedAt: t.usedAt,
          createdAt: t.createdAt,
        },
        create: {
          id: t.id,
          tokenHash: t.tokenHash,
          userId: t.userId,
          expiresAt: t.expiresAt,
          usedAt: t.usedAt,
          createdAt: t.createdAt,
        },
      });
    }
    report.resetTokensMigrated = resetTokens.length;

    // 7. AiQueryLog
    const queryLogs = await sourceDb.aiQueryLog.findMany();
    for (const q of queryLogs) {
      await destDb.aiQueryLog.upsert({
        where: { id: q.id },
        update: {
          userId: q.userId,
          type: q.type,
          query: q.query,
          response: q.response,
          metadata: q.metadata as any,
          createdAt: q.createdAt,
        },
        create: {
          id: q.id,
          userId: q.userId,
          type: q.type,
          query: q.query,
          response: q.response,
          metadata: q.metadata as any,
          createdAt: q.createdAt,
        },
      });
    }
    report.queryLogsMigrated = queryLogs.length;

    // 8. Lead
    const leads = await sourceDb.lead.findMany();
    for (const l of leads) {
      await destDb.lead.upsert({
        where: { id: l.id },
        update: {
          email: l.email,
          type: l.type,
          data: l.data,
          createdAt: l.createdAt,
        },
        create: {
          id: l.id,
          email: l.email,
          type: l.type,
          data: l.data,
          createdAt: l.createdAt,
        },
      });
    }
    report.leadsMigrated = leads.length;

    // 9. FaceAnalysis
    const faceAnalyses = await sourceDb.faceAnalysis.findMany();
    for (const f of faceAnalyses) {
      await destDb.faceAnalysis.upsert({
        where: { id: f.id },
        update: {
          userId: f.userId,
          imageUrl: f.imageUrl,
          barrierScore: f.barrierScore,
          acneScore: f.acneScore,
          rednessScore: f.rednessScore,
          oilinessScore: f.oilinessScore,
          detailedJson: f.detailedJson as any,
          createdAt: f.createdAt,
        },
        create: {
          id: f.id,
          userId: f.userId,
          imageUrl: f.imageUrl,
          barrierScore: f.barrierScore,
          acneScore: f.acneScore,
          rednessScore: f.rednessScore,
          oilinessScore: f.oilinessScore,
          detailedJson: f.detailedJson as any,
          createdAt: f.createdAt,
        },
      });
    }
    report.faceAnalysesMigrated = faceAnalyses.length;

    report.status = "SUCCESS";
  } catch (err: any) {
    report.status = "FAILED";
    report.error = err.message || String(err);
  } finally {
    await sourceDb.$disconnect();
    await destDb.$disconnect();
  }

  return NextResponse.json(report);
}
