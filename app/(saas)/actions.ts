"use server";

import { getSession, logout } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { aiSearch, analyzeSkinJournal, generateWithRetry } from "@/lib/ai";
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
 where: { id: routineId, userId: session.userId }
 });

 if (!routine) {
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

 // Optimize sequential awaits into parallel execution to eliminate database query water-falling
 const [routines, recentJournal, journalCount, recentEntries] = await Promise.all([
 prisma.routine.findMany({
 where: { userId: session.userId },
 orderBy: { createdAt: "asc" }
 }),
 prisma.skinJournal.findFirst({
 where: { userId: session.userId },
 orderBy: { date: "desc" }
 }),
 prisma.skinJournal.count({
 where: { userId: session.userId }
 }),
 prisma.skinJournal.findMany({
 where: { userId: session.userId },
 take: 5,
 orderBy: { date: "desc" },
 select: { rating: true }
 })
 ]);

 // ── STATS LOGIC ──────────────────────────────────────────────────────────
 
 // Average rating for last 5 entries
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


import { hashPassword, verifyPassword, isLegacyHash, createSession } from "@/lib/auth";
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

const loginRateMap = new Map<string, { count: number; resetAt: number }>();

function isLoginRateLimited(identifier: string, limit = 5, windowMs = 15 * 60 * 1000): boolean {
  const now = Date.now();
  const entry = loginRateMap.get(identifier);
  if (!entry || now > entry.resetAt) {
    loginRateMap.set(identifier, { count: 1, resetAt: now + windowMs });
    return false;
  }
  entry.count++;
  return entry.count > limit;
}

export async function loginAction(_state: AuthState, formData: FormData): Promise<AuthState> {
  const email = normalizeEmail(formData.get("email"));
  const password = String(formData.get("password") || "");

  if (!email || !password) return { error: "Please enter your email and password." };

  const headerStore = await headers();
  const ip = headerStore.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const rateLimitKey = `${ip}:${email}`;

  // Allow up to 50 attempts per 15 minutes to prevent lockouts during testing
  if (isLoginRateLimited(rateLimitKey, 50)) {
    return { error: "Too many login attempts. Please wait 15 minutes before trying again." };
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return { error: "Invalid email or password." };
    }

    // Verify existing password
    const isValid = await verifyPassword(password, user.passwordHash);
    if (!isValid) {
      return { error: "Invalid email or password." };
    }

    // 🔐 TRANSPARENT MIGRATION: upgrade legacy SHA-256 hashes → bcrypt on login
    if (isLegacyHash(user.passwordHash)) {
      try {
        const newHash = await hashPassword(password);
        await prisma.user.update({
          where: { id: user.id },
          data: { passwordHash: newHash },
        });
      } catch (upgradeError) {
        console.error("Hash upgrade error (non-fatal):", upgradeError);
      }
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
    if (existing) {
      return { error: "Email already in use. Please sign in instead." };
    }

    const user = await prisma.user.create({
      data: {
        email,
        name,
        passwordHash: await hashPassword(password),
      }
    });

    await prisma.subscription.create({
      data: {
        userId: user.id,
        tier: "pro",
        status: "active"
      }
    });

    // ✅ SEND WELCOME EMAIL IF CONFIG HAS RESEND
    if (process.env.RESEND_API_KEY && process.env.PASSWORD_RESET_FROM) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: process.env.PASSWORD_RESET_FROM,
          to: email,
          subject: "Welcome to Mirha & Co! 🌸",
          html: `<div style="font-family: sans-serif; padding: 20px;"><h1>Welcome to Mirha & Co, ${name}!</h1></div>`
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

  const success = `Password reset request created! Check your inbox, or log in directly with your email.`;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    
    if (!user) {
      // Return success to prevent user enumeration security issues
      return { success };
    }

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

    // ── Diagnostic: log env var presence only (never log token values)
    console.log("[forgot-password] RESEND_API_KEY present:", !!process.env.RESEND_API_KEY);
    console.log("[forgot-password] PASSWORD_RESET_FROM present:", !!process.env.PASSWORD_RESET_FROM);
    console.log("[forgot-password] Reset URL base:", await getBaseUrl());

    if (process.env.RESEND_API_KEY && process.env.PASSWORD_RESET_FROM) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const result = await resend.emails.send({
          from: process.env.PASSWORD_RESET_FROM,
          to: email,
          subject: "Reset your Mirha & Co. password 🌸",
          html: `
<div style="font-family: 'DM Sans', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 24px; background: #fcfbf9;">
  <h1 style="font-family: Georgia, serif; font-size: 1.75rem; color: #2b2826; margin: 0 0 1rem;">
    Reset your password
  </h1>
  <p style="color: #6b5e57; font-size: 0.95rem; line-height: 1.6; margin: 0 0 1.5rem;">
    We received a request to reset the password for your Mirha &amp; Co. account.<br>
    Click the button below to set a new password. This link expires in <strong>1 hour</strong>.
  </p>
  <a href="${resetUrl}" style="display: inline-block; background: #fc2779; color: #fff; text-decoration: none; padding: 12px 32px; border-radius: 8px; font-weight: 600; font-size: 0.95rem; margin-bottom: 1.5rem;">
    Reset Password
  </a>
  <p style="color: #9a8a84; font-size: 0.8rem; line-height: 1.6; margin: 0;">
    If you didn't request this, you can safely ignore this email — your password won't change.<br>
    Or copy this link: <a href="${resetUrl}" style="color: #fc2779;">${resetUrl}</a>
  </p>
</div>`,
        });
        if (result.error) {
          console.error("[forgot-password] Resend rejected email:", result.error);
        } else {
          console.log("[forgot-password] Email sent successfully. ID:", result.data?.id);
        }
      } catch (resendError) {
        console.error("[forgot-password] Resend threw exception:", resendError);
      }
    } else {
      console.warn("[forgot-password] Email NOT sent — RESEND_API_KEY or PASSWORD_RESET_FROM env var is missing/empty in this environment.");
    }
  } catch (error) {
    console.error("Forgot password database/logic error:", error);
    return { error: "Unable to process password reset right now." };
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
 data: { passwordHash: await hashPassword(password) },
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
import { getLocalSearchAdvice, searchMirha } from "@/lib/searchIndex";

export async function getAISearchAdvice(query: string) {
 const session = await getSession();
 if (!session) return null;

 if (!process.env.GEMINI_API_KEY) {
 return getLocalSearchAdvice(query);
 }

 try {
 // 1. Get search context matches from our index
 const searchContext = searchMirha(query, 10);

 // 2. Call our modernized Gemini RAG Search engine
 const response = await aiSearch(query, searchContext);
 if (!response || !response.advice) {
 return getLocalSearchAdvice(query);
 }

 // Log the search
 try {
 await prisma.aiQueryLog.create({
 data: {
 userId: session.userId,
 query: query,
 response: response.advice,
 type: "search",
 metadata: { productsRecommended: response.products.map((p: any) => p.name) }
 }
 });
 } catch (e) {
 console.error("Failed to log search query:", e);
 }

 return response;
 } catch (error) {
 console.error("AI Search Advice fallback trigger:", error);
 return getLocalSearchAdvice(query);
 }
}

// ? BRAIN: JOURNAL ANALYSIS
export async function getJournalAnalysis() {
 const session = await getSession();
 if (!session) return null;

 const sub = await prisma.subscription.findUnique({ where: { userId: session.userId } });
 const isPro = sub?.tier === 'pro' && sub?.status === 'active';

 if (!isPro) return { error: 'UPGRADE_PRO' };

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
 
 if (!isPro) return { error: 'UPGRADE_PRO' };

 if (!process.env.GEMINI_API_KEY) {
 return "AI Analysis is currently disabled (Missing API Key).";
 }

 try {
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

 return await generateWithRetry(contents);
 } catch (error) {
 console.error('AI Analysis failed', error);
 return 'Unable to analyze skin right now.';
 }
}

// ? BRAIN: AI RAG SKINCARE CONSULTANT (With Premium Rate Limiting)
export async function askSkincareConsultant(userQuery: string) {
 const session = await getSession();
 if (!session) throw new Error("Please log in to ask the AI Skincare Consultant.");

 // 1. Check user's subscription tier
 const sub = await prisma.subscription.findUnique({ where: { userId: session.userId } });
 const isPro = sub?.tier === 'pro' && sub?.status === 'active';
 const maxQueriesPerDay = isPro ? 20 : 3; // 3 for free users, 20 for Pro users

 // 2. Count current daily usage
 const today = new Date();
 today.setHours(0, 0, 0, 0);

 const dailyCount = await prisma.aiQueryLog.count({
 where: {
 userId: session.userId,
 createdAt: { gte: today }
 }
 });

 // 3. Enforce the rate limit
 if (dailyCount >= maxQueriesPerDay) {
 if (isPro) {
 throw new Error(`You have reached your Pro daily limit of ${maxQueriesPerDay} consultations. Please try again tomorrow!`);
 } else {
 // Free limit hit
 throw new Error("LIMIT_REACHED_UPGRADE");
 }
 }

 // 4. Retrieve all products from the local database for retrieval
 const products = await prisma.product.findMany();
 
 // Clean products list for parsing
 const catalog = products.map(p => ({
 name: p.name,
 brand: p.brand,
 ingredients: p.ingredients,
 concerns: p.concerns,
 skinTypes: p.skinTypes,
 category: p.category
 }));

 // Simple cosine term vector search to get the single most relevant product context
 const queryTerms = userQuery.toLowerCase().split(/\W+/).filter(t => t.length > 2);
 let bestScore = 0;
 let bestProduct = null;

 for (const item of catalog) {
 const text = `${item.name} ${item.brand} ${item.ingredients} ${item.concerns} ${item.skinTypes}`.toLowerCase();
 const matches = queryTerms.filter(t => text.includes(t));
 const score = matches.length / (Math.sqrt(queryTerms.length) * Math.sqrt(text.split(/\W+/).length || 1));
 if (score > bestScore) {
 bestScore = score;
 bestProduct = item;
 }
 }

 // 5. Synthesize prompt context
 let contextSnippet = "No specific database product was found matching this concern. Advise based on general skin health.";
 if (bestProduct) {
 contextSnippet = `Recommended Product: "${bestProduct.name}" by brand "${bestProduct.brand}". 
 Key Ingredients: ${bestProduct.ingredients}. 
 Designed for: ${bestProduct.concerns}. 
 Skin Types: ${bestProduct.skinTypes}. 
 Category: ${bestProduct.category}.`;
 }

 const prompt = `
 You are Mirha, a warm, honest, and experienced skincare consultant for Indian skin at Mirha & Co. (mirhaandco.com).
 You help users navigate real Indian skin challenges like humidity, pollution, pigmentation, acne, combination/oily skin, and budget constraints with practical, hype-free advice.
 
 The user is asking: "${userQuery}"

 Use the following verified product knowledge from our inventory to ground your advice:
 [CONTEXT]
 ${contextSnippet}
 [/CONTEXT]

 Core Principles:
 - Be friendly, empowering, and conversational — like a trusted friend who knows dermatology basics.
 - Synthesize all information into a smooth, connected response. Never sound like a raw data dump or disconnected bullet points.
 - Always connect ideas naturally with transitions ("This works well because...", "It pairs nicely with...", "However, keep in mind...").
 - Base every single claim strictly on the retrieved context. Never hallucinate products, ingredients, or results.

 Response Style:
 - Start with a short, empathetic acknowledgment of the user's query.
 - Give a clear, flowing main answer in natural paragraphs (3-4 sentences max).
 - Explicitly explain WHY the recommended ingredients suit their specific skin concerns.
 - End with a helpful next step.
 - Tone: Warm, practical, confident, caring. No marketing hype.
 `;

 // 6. Gemini Inference
 if (!process.env.GEMINI_API_KEY) {
 throw new Error("Skincare Consultant is currently offline (API key missing).");
 }

 try {
 const answer = await generateWithRetry(prompt);

 // 7. Log the query ONLY upon successful generation to count towards usage
 await prisma.aiQueryLog.create({
 data: {
 userId: session.userId,
 query: userQuery,
 response: answer,
 type: "consultant",
 metadata: { contextSnippet }
 }
 });

 return answer;
 } catch (err: any) {
 console.error("AI Consultant inference failed:", err);
 throw new Error("Unable to contact the AI Consultant right now. Please try again.");
 }
}

export async function submitLeadAction(email: string, type: string, data?: string) {
  try {
    const normalizedEmail = email.trim().toLowerCase();

    // ✅ Bypass rate limiting if this lead already exists in the system
    const existingLead = await (prisma as any).lead.findFirst({
      where: {
        email: normalizedEmail,
        type
      }
    });
    if (existingLead) {
      return { success: true, id: existingLead.id };
    }

    // ✅ Rate limiting: 3 per day per email
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const recentLeadsCount = await (prisma as any).lead.count({
      where: {
        email: normalizedEmail,
        createdAt: { gte: today }
      }
    });

    if (recentLeadsCount >= 3) {
      return { error: "You've reached the daily limit of 3 reports. Please try again tomorrow!" };
    }

    const lead = await (prisma as any).lead.create({
      data: {
        email: normalizedEmail,
        type,
        data,
      }
    });

 if (process.env.RESEND_API_KEY && process.env.PASSWORD_RESET_FROM) {
 try {
 const resend = new Resend(process.env.RESEND_API_KEY);
 let subject = "Welcome to Mirha & Co! 🌸";
 let htmlContent = `<p>Thank you for subscribing to our newsletter!</p>`;

 if (type === "hardwater") {
 const parsedData = data ? JSON.parse(data) : {};
 subject = "Your Hard Water Recovery Guide — Mirha & Co. 💧";
 htmlContent = `
 <div style="font-family: 'DM Sans', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #161412;">
 <h2 style="font-family: 'DM Serif Display', serif; font-size: 1.8rem; color: #161412; margin-bottom: 1rem; font-weight: normal;">Your Hard Water Analysis is Ready!</h2>
 <p style="font-size: 1rem; line-height: 1.6;">Hi there,</p>
 <p style="font-size: 1rem; line-height: 1.6;">Here is a summary of your hair and skin damage index:</p>
 <div style="background: #fff0e8; border: 1px dashed #fc2779; padding: 20px; border-radius: 12px; margin: 20px 0; text-align: center;">
 <span style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em; color: #756b63; font-weight: 700;">Your Damage Index</span>
 <div style="font-size: 3rem; font-weight: bold; color: #fc2779; margin: 5px 0;">${parsedData.score || 0}%</div>
 <div style="font-size: 0.95rem; color: #161412; font-weight: 600;">Risk Level: ${parsedData.level || "Moderate"}</div>
 </div>
 <p style="font-size: 1rem; line-height: 1.6;">To restore your skin and hair barrier from calcium and magnesium mineral buildup, we recommend starting a chelating wash and using barrier repair creams. You can review your customized recommendations and products anytime on our website.</p>
 <p style="font-size: 0.9rem; color: #756b63; margin-top: 30px;">Best wishes,<br/>The Mirha & Co. Team</p>
 </div>
 `;
 } else if (type === "dupe") {
 const parsedData = data ? JSON.parse(data) : {};

 let recommendationsHtml = "";
 if (parsedData.recommendations && parsedData.recommendations.length > 0) {
 recommendationsHtml = `
 <div style="margin: 30px 0;">
 <h3 style="font-family: 'DM Serif Display', serif; font-size: 1.4rem; color: #161412; margin-bottom: 16px; font-weight: normal;">Your Personalized Matches</h3>
 ${parsedData.recommendations.map((rec: any) => `
 <div style="background: #fff; border: 1px solid #ede5dc; padding: 16px; border-radius: 8px; margin-bottom: 12px; display: flex; flex-direction: column; gap: 8px;">
 <div style="font-size: 0.75rem; color: #756b63; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 700;">Instead of ${rec.luxuryBrand} ${rec.luxuryName}</div>
 <div style="font-size: 1.1rem; color: #161412; font-weight: 600;">${rec.dupeName}</div>
 <div style="font-size: 0.9rem; color: #756b63;">By ${rec.dupeBrand} • ${rec.price}</div>
 <a href="${rec.link}" style="display: inline-block; background: #fc2779; color: #fff; text-decoration: none; padding: 8px 16px; border-radius: 6px; font-weight: 600; font-size: 0.9rem; margin-top: 8px; text-align: center; width: fit-content;">Shop Dupe →</a>
 </div>
 `).join("")}
 </div>
 `;
 }

 subject = "Your Skincare Dupes Catalog & Savings Sheet 🏷️";
 htmlContent = `
 <div style="font-family: 'DM Sans', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #161412;">
 <h2 style="font-family: 'DM Serif Display', serif; font-size: 1.8rem; color: #161412; margin-bottom: 1rem; font-weight: normal;">Your Skincare Savings Breakdown!</h2>
 <p style="font-size: 1rem; line-height: 1.6;">Hi there,</p>
 <p style="font-size: 1rem; line-height: 1.6;">By switching luxury beauty items for science-backed, high-quality clinical alternatives, you are on track to save:</p>
 <div style="background: #eef7f2; border: 1px dashed #2d8a5c; padding: 20px; border-radius: 12px; margin: 20px 0; text-align: center;">
 <span style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em; color: #756b63; font-weight: 700;">Estimated Annual Savings</span>
 <div style="font-size: 3rem; font-weight: bold; color: #2d8a5c; margin: 5px 0;">${parsedData.formattedSavings || `₹${(parsedData.savings || 0).toLocaleString("en-IN")}`}</div>
 </div>
 ${recommendationsHtml}
 <div style="background: #fdfaf7; border-left: 4px solid #fc2779; padding: 15px 20px; border-radius: 4px; margin: 30px 0;">
 <p style="font-size: 0.95rem; line-height: 1.5; margin: 0; color: #161412;"><strong>Want deeper insights into your skincare?</strong><br/>
 Unlock AI-powered ingredient analysis, personalized routine tracking, and endless dupe matching by upgrading to <a href="https://mirhaandco.com/pricing" style="color: #fc2779; text-decoration: none; font-weight: bold;">Mirha & Co. Premium</a>.</p>
 </div>
 <p style="font-size: 0.9rem; color: #756b63; margin-top: 30px;">Best wishes,<br/>The Mirha & Co. Team</p>
 </div>
 `;
 } else if (type === "collab") {
 const parsedData = data ? JSON.parse(data) : {};
 subject = "Product Submission Received — Mirha & Co. 🌸";
 htmlContent = `
 <div style="font-family: 'DM Sans', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #161412;">
 <h2 style="font-family: 'DM Serif Display', serif; font-size: 1.8rem; color: #161412; margin-bottom: 1rem; font-weight: normal;">We've received your brand submission!</h2>
 <p style="font-size: 1rem; line-height: 1.6;">Hi ${parsedData.contactName || "there"},</p>
 <p style="font-size: 1rem; line-height: 1.6;">Thank you for submitting <strong>${parsedData.brandName || "your brand"}</strong> for review on Mirha & Co.</p>
 <p style="font-size: 1rem; line-height: 1.6;">Our Curation Board audits all submissions based on active ingredient concentrations, clinical evidence, and climate suitability. We will be in touch within 5-7 business days if your products match our editorial parameters.</p>
 <div style="background: #f6f4f2; border: 1px dashed #a27b5c; padding: 15px 20px; border-radius: 8px; margin: 20px 0; font-size: 0.9rem;">
 <strong>Submission Details:</strong><br/>
 • Brand: ${parsedData.brandName || "N/A"}<br/>
 • Product Link: ${parsedData.productUrl || "N/A"}<br/>
 • Key Actives: ${parsedData.actives || "N/A"}
 </div>
 <p style="font-size: 0.95rem; line-height: 1.6;">Please note: Mirha & Co. does not accept paid sponsorship for placements. Curation is entirely merit-based.</p>
 <p style="font-size: 0.9rem; color: #756b63; margin-top: 30px;">Best regards,<br/>The Mirha & Co. Curation Board</p>
 </div>
 `;
  } else if (type === "b2b_api") {
    const parsedData = data ? JSON.parse(data) : {};
    subject = "B2B API Integration Request — Mirha & Co. 🌸";
    htmlContent = `
    <div style="font-family: 'DM Sans', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #161412;">
      <h2 style="font-family: 'DM Serif Display', serif; font-size: 1.8rem; color: #161412; margin-bottom: 1rem; font-weight: normal;">B2B API Key Request Received!</h2>
      <p style="font-size: 1rem; line-height: 1.6;">Hi ${parsedData.name || "there"},</p>
      <p style="font-size: 1rem; line-height: 1.6;">Thank you for your interest in our climate-aware formulation matching API. We have received your request for <strong>${parsedData.brand || "your brand"}</strong>.</p>
      <p style="font-size: 1rem; line-height: 1.6;">Our team is reviewing your brand catalog. We will get back to you with your trial key and setup instructions shortly.</p>
      <p style="font-size: 0.9rem; color: #756b63; margin-top: 30px;">Best wishes,<br/>The Mirha & Co. B2B Team</p>
    </div>
    `;

    // Also send notification email to the admin
    try {
      await resend.emails.send({
        from: process.env.PASSWORD_RESET_FROM,
        to: "tanizcoldz@gmail.com",
        subject: `🚨 New B2B API Key Request: ${parsedData.brand || "Unknown Brand"}`,
        html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
          <h2 style="color: #fc2779; margin-bottom: 20px;">New B2B Lead Registered</h2>
          <p><strong>Name:</strong> ${parsedData.name || "N/A"}</p>
          <p><strong>Brand:</strong> ${parsedData.brand || "N/A"}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Comments / Platform:</strong> ${parsedData.message || "N/A"}</p>
        </div>
        `
      });
    } catch (adminEmailError) {
      console.error("Failed to send admin notification email:", adminEmailError);
    }
  } else {
 // Newsletter
 subject = "Welcome to the Mirha Skin Desk! 🌸";
 htmlContent = `
 <div style="font-family: 'DM Sans', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #161412;">
 <h2 style="font-family: 'DM Serif Display', serif; font-size: 1.8rem; color: #161412; margin-bottom: 1rem; font-weight: normal;">Welcome to the Mirha Skin Desk!</h2>
 <p style="font-size: 1rem; line-height: 1.6;">Hi there,</p>
 <p style="font-size: 1rem; line-height: 1.6;">Thanks for subscribing! You are now joined to receive our weekly, science-backed skincare breakdowns.</p>
 <p style="font-size: 1rem; line-height: 1.6;">We cover ingredient analysis, hard water issues, skincare science, and value comparisons without the marketing fluff or sponsored bias.</p>
 <p style="font-size: 0.9rem; color: #756b63; margin-top: 30px;">Best wishes,<br/>The Mirha & Co. Team</p>
 </div>
 `;
 }

 await resend.emails.send({
 from: process.env.PASSWORD_RESET_FROM,
 to: email.trim().toLowerCase(),
 subject,
 html: htmlContent,
 });
 } catch (emailError) {
 console.error("Resend lead email failed:", emailError);
 }
 }

 return { success: true, id: lead.id };
 } catch (error) {
 console.error("Failed to save lead:", error);
 return { error: "Failed to submit. Please try again." };
 }
}

export async function updateUserBlacklist(blacklist: string[]) {
 const session = await getSession();
 if (!session) throw new Error("Unauthorized");

 const user = await prisma.user.findUnique({ where: { id: session.userId } });
 if (!user) throw new Error("User not found");

 let profile: any = {};
 if (user.skinProfile) {
 try {
 profile = JSON.parse(user.skinProfile);
 } catch (e) {
 // ignore
 }
 }

 const updatedProfile = { ...profile, blacklist };

 await prisma.user.update({
 where: { id: session.userId },
 data: { skinProfile: JSON.stringify(updatedProfile) }
 });

 revalidatePath("/dashboard/conflicts");
 revalidatePath("/dashboard");
}

