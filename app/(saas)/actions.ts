"use server";

import { getSession, logout } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { aiSearch, analyzeSkinJournal } from "@/lib/ai";
import { SEARCH_INDEX } from "@/lib/searchIndex";
import { GoogleGenerativeAI } from "@google/generative-ai";


export async function saveRoutine(name: string, steps: string[]) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  // ✅ CHECK SUBSCRIPTION STATUS
  const subscription = await prisma.subscription.findUnique({
    where: { userId: session.userId }
  });

  const isPaid = subscription?.tier === "pro" && subscription?.status === "active";
  const maxRoutinesPerDay = isPaid ? 10 : 2;

  // ✅ RATE LIMITING
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const routineCountToday = await prisma.routine.count({
    where: {
      userId: session.userId,
      createdAt: { gte: today }
    }
  });

  if (routineCountToday >= maxRoutinesPerDay) {
    if (isPaid) {
      throw new Error(`You've reached your daily limit of ${maxRoutinesPerDay} routines. Please try again tomorrow.`);
    } else {
      throw new Error("UPGRADE_ROUTINE");
    }
  }

  await prisma.routine.create({
    data: {
      userId: session.userId,
      name,
      routine: JSON.stringify(steps),
    }
  });

  revalidatePath("/dashboard/routines");
}

export async function deleteRoutine(id: string) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  // ✅ CHECK IF ROUTINE BELONGS TO THIS USER
  const existingRoutine = await prisma.routine.findFirst({
    where: {
      id,
      userId: session.userId
    }
  });

  if (!existingRoutine) {
    throw new Error("Routine not found");
  }

  // ✅ DELETE THE ROUTINE
  await prisma.routine.delete({
    where: { id }
  });

  revalidatePath("/dashboard/routines");
}

export async function updateRoutine(id: string, name: string, steps: string[]) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  const existingRoutine = await prisma.routine.findFirst({
    where: { id, userId: session.userId }
  });

  if (!existingRoutine) throw new Error("Routine not found");

  await prisma.routine.update({
    where: { id },
    data: {
      name,
      routine: JSON.stringify(steps)
    }
  });

  revalidatePath("/dashboard/routines");
}

export async function toggleRoutineStep(routineId: string, stepIndex: number, completed: boolean) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  const routine = await prisma.routine.findUnique({
    where: { id: routineId }
  });

  if (!routine || routine.userId !== session.userId) {
    throw new Error("Routine not found");
  }

  const today = new Date().toISOString().split("T")[0];
  let metadata = routine.metadata ? JSON.parse(routine.metadata) : { logs: {} };
  
  if (!metadata.logs) metadata.logs = {};
  if (!metadata.logs[today]) metadata.logs[today] = [];

  let completedSteps: number[] = metadata.logs[today];

  if (completed) {
    if (!completedSteps.includes(stepIndex)) {
      completedSteps.push(stepIndex);
    }
  } else {
    completedSteps = completedSteps.filter((idx: number) => idx !== stepIndex);
  }

  metadata.logs[today] = completedSteps;

  await prisma.routine.update({
    where: { id: routineId },
    data: { metadata: JSON.stringify(metadata) }
  });

  revalidatePath("/dashboard");
}

export async function saveJournalEntry(note: string, rating: number, photos: string = "[]", aiAnalysis: string | null = null) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  // ✅ CHECK SUBSCRIPTION STATUS
  const subscription = await prisma.subscription.findUnique({
    where: { userId: session.userId }
  });

  const isPaid = subscription?.tier === "pro" && subscription?.status === "active";
  const maxEntriesPerDay = isPaid ? 10 : 2;

  // ✅ RATE LIMITING
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const entryCountToday = await prisma.skinJournal.count({
    where: {
      userId: session.userId,
      date: { gte: today }
    }
  });

  if (entryCountToday >= maxEntriesPerDay) {
    if (isPaid) {
      throw new Error(`You've reached your daily limit of ${maxEntriesPerDay} journal entries. Please try again tomorrow.`);
    } else {
      throw new Error("UPGRADE_JOURNAL");
    }
  }

  await prisma.skinJournal.create({
    data: {
      userId: session.userId,
      entry: note,
      rating,
      photos,
      concerns: "[]",
      aiAnalysis
    }
  });

  revalidatePath("/dashboard/journal");
}

export async function getJournalEntries() {
  const session = await getSession();
  if (!session) return [];

  return prisma.skinJournal.findMany({
    where: { userId: session.userId },
    orderBy: { date: "desc" }
  });
}

export async function getDashboardData() {
  try {
    const session = await getSession();
    if (!session) return { routines: [], journal: null, user: null, error: "Unauthorized" };

    const routines = await prisma.routine.findMany({
      where: { userId: session.userId },
      orderBy: { createdAt: "asc" }
    });

    const recentJournal = await prisma.skinJournal.findFirst({
      where: { userId: session.userId },
      orderBy: { date: "desc" }
    });

    // ── STATS LOGIC ──────────────────────────────────────────────────────────
    
    // 1. Journal Count
    const journalCount = await prisma.skinJournal.count({
      where: { userId: session.userId }
    });

    // 2. Skin Score (Average of last 5 ratings * 20 for %)
    const recentEntries = await prisma.skinJournal.findMany({
      where: { userId: session.userId },
      take: 5,
      orderBy: { date: "desc" },
      select: { rating: true }
    });
    const avgRating = recentEntries.length > 0 
      ? recentEntries.reduce((acc, curr) => acc + (curr.rating || 0), 0) / recentEntries.length 
      : 0;
    const skinScore = Math.round(avgRating * 20);

    // 3. Streak (Calculate from metadata logs)
    let routineStreak = 0;
    if (routines.length > 0) {
      const logs = routines[0].metadata ? JSON.parse(routines[0].metadata).logs || {} : {};
      const dates = Object.keys(logs).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
      
      const today = new Date().toISOString().split("T")[0];
      const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
      
      let current = dates.includes(today) ? today : dates.includes(yesterday) ? yesterday : null;
      
      if (current) {
        routineStreak = 1;
        let checkDate = new Date(current);
        while (true) {
          checkDate.setDate(checkDate.getDate() - 1);
          const formatted = checkDate.toISOString().split("T")[0];
          if (dates.includes(formatted)) {
            routineStreak++;
          } else {
            break;
          }
        }
      }
    }

    // 4. Completed Goals (Total steps completed today)
    const todayStr = new Date().toISOString().split("T")[0];
    let completedGoals = 0;
    routines.forEach((r: any) => {
      const logs = r.metadata ? JSON.parse(r.metadata).logs || {} : {};
      if (logs[todayStr]) {
        completedGoals += logs[todayStr].length;
      }
    });

    return {
      routines: routines.map((r: any) => ({ 
        id: r.id, 
        name: r.name, 
        steps: JSON.parse(r.routine),
        metadata: r.metadata ? JSON.parse(r.metadata) : { logs: {} }
      })),
      journal: recentJournal,
      stats: {
        routineStreak,
        journalCount,
        skinScore,
        completedGoals
      },
      user: session.user
    };
  } catch (error) {
    console.error("Dashboard data error:", error);
    return { error: "Failed to fetch data" };
  }
}

export async function getUserProfile() {
  try {
    const session = await getSession();
    if (!session) return null;

    return prisma.user.findUnique({
      where: { id: session.userId },
      include: { subscription: true }
    });
  } catch (error) {
    console.error("Profile lookup error:", error);
    return null;
  }
}

export async function upgradeToPro() {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  await prisma.subscription.upsert({
    where: { userId: session.userId },
    update: { tier: "pro", status: "active" },
    create: { userId: session.userId, tier: "pro", status: "active" }
  });

  revalidatePath("/dashboard/subscription");
  revalidatePath("/dashboard/search");
  revalidatePath("/dashboard/journal");
}

export async function searchProducts(query: string) {
  if (!query) return [];
  return prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { brand: { contains: query, mode: "insensitive" } },
        { category: { contains: query, mode: "insensitive" } },
        { concerns: { contains: query, mode: "insensitive" } }
      ]
    },
    take: 10
  });
}


import { hashPassword, createSession } from "@/lib/auth";
import crypto from "crypto";
import { headers } from "next/headers";
import { Resend } from "resend";

type AuthState = {
  error?: string;
  success?: string;
};

function normalizeEmail(email: FormDataEntryValue | null) {
  return String(email || "").trim().toLowerCase();
}

function hashResetToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

async function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  const headerStore = await headers();
  const host = headerStore.get("host") || "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  return `${protocol}://${host}`;
}

export async function loginAction(_state: AuthState, formData: FormData): Promise<AuthState> {
  const email = normalizeEmail(formData.get("email"));
  const password = String(formData.get("password") || "");

  if (!email || !password) return { error: "Please enter your email and password." };

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || user.passwordHash !== hashPassword(password)) {
      return { error: "Invalid email or password." };
    }

    await createSession(user.id);
  } catch (error) {
    console.error("Login error:", error);
    return { error: "Unable to sign in right now. Please try again." };
  }

  redirect("/dashboard");
}

export async function registerAction(_state: AuthState, formData: FormData): Promise<AuthState> {
  const email = normalizeEmail(formData.get("email"));
  const password = String(formData.get("password") || "");
  const name = String(formData.get("name") || "").trim();

  if (!email || !password || !name) {
    return { error: "Please fill in all fields." };
  }

  if (password.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }

  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return { error: "Email already in use. Please sign in instead." };

    const user = await prisma.user.create({
      data: {
        email,
        name,
        passwordHash: hashPassword(password),
      }
    });
    // ✅ SEND WELCOME EMAIL
    if (process.env.RESEND_API_KEY && process.env.PASSWORD_RESET_FROM) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: process.env.PASSWORD_RESET_FROM,
          to: email,
          subject: "Welcome to Mirha & Co! 🌸",
          html: `
        <div style="font-family: 'DM Sans', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
          <h1 style="font-family: 'DM Serif Display', serif; font-size: 2rem; margin: 0 0 1rem; color: #1a1a1a;">
            Welcome to Mirha & Co, ${name.split(' ')[0]}! 🌸
          </h1>
          <p style="font-size: 1rem; color: #666; line-height: 1.6;">Your account is ready. Start your skincare journey now!</p>
          <a href="${await getBaseUrl()}/dashboard" style="background: #c8473a; color: white; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block; margin: 2rem 0;">
            Go to Dashboard
          </a>
        </div>
      `
        });
      } catch (emailError) {
        console.error("Welcome email error:", emailError);
      }
    }
    await createSession(user.id);
  } catch (error) {
    console.error("Register error:", error);
    return { error: "Unable to create your account right now. Please try again." };
  }

  redirect("/dashboard");
}

export async function forgotPasswordAction(_state: AuthState, formData: FormData): Promise<AuthState> {
  const email = normalizeEmail(formData.get("email"));

  if (!email) {
    return { error: "Please enter your email address." };
  }

  const success = "If an account exists for this email, a reset link has been sent.";

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return { success };

    const token = crypto.randomBytes(32).toString("hex");
    const tokenHash = hashResetToken(token);
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

    await prisma.passwordResetToken.create({
      data: {
        tokenHash,
        userId: user.id,
        expiresAt,
      }
    });

    const resetUrl = `${await getBaseUrl()}/reset-password?token=${token}`;

    if (process.env.RESEND_API_KEY && process.env.PASSWORD_RESET_FROM) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: process.env.PASSWORD_RESET_FROM,
        to: email,
        subject: "Reset your Mirha & Co. password",
        html: `<p>Use this link to reset your password. It expires in 1 hour.</p><p><a href="${resetUrl}">Reset password</a></p>`,
      });
    } else {
      console.log("Password reset link:", resetUrl);
    }
  } catch (error) {
    console.error("Forgot password error:", error);
  }

  return { success };
}

export async function resetPasswordAction(_state: AuthState, formData: FormData): Promise<AuthState> {
  const token = String(formData.get("token") || "");
  const password = String(formData.get("password") || "");

  if (!token || !password) {
    return { error: "Please enter a new password." };
  }

  if (password.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }

  const tokenHash = hashResetToken(token);
  const resetToken = await prisma.passwordResetToken.findUnique({
    where: { tokenHash },
  });

  if (!resetToken || resetToken.usedAt || resetToken.expiresAt < new Date()) {
    return { error: "This reset link is invalid or expired." };
  }

  try {
    await prisma.$transaction([
      prisma.user.update({
        where: { id: resetToken.userId },
        data: { passwordHash: hashPassword(password) },
      }),
      prisma.passwordResetToken.update({
        where: { id: resetToken.id },
        data: { usedAt: new Date() },
      }),
      prisma.session.deleteMany({
        where: { userId: resetToken.userId },
      }),
    ]);
  } catch (error) {
    console.error("Reset password error:", error);
    return { error: "Unable to reset your password right now. Please try again." };
  }

  return { success: "Password reset. You can now sign in." };
}

export async function logoutAction() {
  await logout();
  redirect("/login");
}
// ? BRAIN: AI SEARCH ADVICE
export async function getAISearchAdvice(query: string) {
  const session = await getSession();
  if (!session) return null;

  // 🔓 TEST MODE: Bypassing DB call due to connection issues
  // const sub = await prisma.subscription.findUnique({ where: { userId: session.userId } });
  const isPro = true;
  
  // 🔓 TEST MODE: Bypassing Pro check
  // if (!isPro) return { error: 'UPGRADE_PRO' };

  return await aiSearch(query, SEARCH_INDEX);
}

// ? BRAIN: JOURNAL ANALYSIS
export async function getJournalAnalysis() {
  const session = await getSession();
  if (!session) return null;

  const sub = await prisma.subscription.findUnique({ where: { userId: session.userId } });
  const isPro = sub?.tier === 'pro' && sub?.status === 'active';

  // 🔓 TEST MODE: Bypassing Pro check
  // if (!isPro) return { error: 'UPGRADE_PRO' };

  const entries = await prisma.skinJournal.findMany({
    where: { userId: session.userId },
    orderBy: { date: 'desc' },
    take: 7
  });

  if (entries.length < 3) return { error: 'NOT_ENOUGH_DATA' };

  return await analyzeSkinJournal(entries);
}

// ? BRAIN: PHOTO/NOTE SKIN ANALYSIS
export async function analyzeSkinPhoto(note: string, photoBase64?: string) {
  const session = await getSession();
  if (!session) return null;

  const sub = await prisma.subscription.findUnique({ where: { userId: session.userId } });
  const isPro = sub?.tier === 'pro' && sub?.status === 'active';
  
  // 🔓 TEST MODE: Bypassing Pro check
  // if (!isPro) return { error: 'UPGRADE_PRO' };

  if (!process.env.GEMINI_API_KEY) {
    return "AI Analysis is currently disabled (Missing API Key).";
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    let contents: any[] = [];
    const prompt = `Act as an expert esthetician. Analyze this skin journal entry. 
    User note: "${note}"
    ${photoBase64 ? "Analyze the attached photo as well. Comment on skin barrier health, hydration, visible redness, and congestion." : ""}
    Provide a professional, brief analysis (2-3 sentences max) with actionable skincare advice. 
    Do not provide medical diagnoses.`;

    if (photoBase64) {
      const base64Data = photoBase64.replace(/^data:image\/\w+;base64,/, "");
      contents = [
        prompt,
        { inlineData: { data: base64Data, mimeType: "image/jpeg" } }
      ];
    } else {
      contents = [prompt];
    }

    const result = await model.generateContent(contents);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('AI Analysis failed', error);
    return 'Unable to analyze skin right now.';
  }
}
