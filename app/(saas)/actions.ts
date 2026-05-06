"use server";

import { getSession, logout } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";


export async function saveRoutine(name: string, steps: string[]) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  // ✅ RATE LIMITING: Max 1 routine per day
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const routineToday = await prisma.routine.findFirst({
    where: {
      userId: session.userId,
      createdAt: { gte: today }
    }
  });

  if (routineToday) {
    throw new Error("You can create only 1 routine per day. Please try again tomorrow.");
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

export async function updateRoutine(id: string, name: string, steps: string[]) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  await prisma.routine.update({
    where: { id },
    data: { name, routine: JSON.stringify(steps) }
  });

  revalidatePath("/dashboard/routines");
}

export async function deleteRoutine(id: string) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  await prisma.routine.delete({ where: { id } });

  revalidatePath("/dashboard/routines");
}

export async function saveJournalEntry(note: string, rating: number, photos: string = "[]", aiAnalysis: string | null = null) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

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

    return {
      routines: routines.map((r: any) => ({ id: r.id, name: r.name, steps: JSON.parse(r.routine) })),
      journal: recentJournal,
      user: session.user
    };
  } catch (error) {
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



import { GoogleGenAI } from "@google/genai";

export async function analyzeSkinPhoto(photoBase64: string) {
  if (!process.env.GEMINI_API_KEY) {
    return "AI Analysis is currently disabled (Missing API Key). Please add GEMINI_API_KEY to your environment variables.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    // Remove the data URL prefix if present (e.g. data:image/jpeg;base64,)
    const base64Data = photoBase64.replace(/^data:image\/\w+;base64,/, "");

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        "Act as an esthetician. Analyze this skin photo. Comment briefly on skin barrier health, hydration, visible redness, and congestion. Provide 2 short, actionable skincare tips based on the image. Do not provide medical diagnoses. Keep the total response under 4 sentences.",
        { inlineData: { data: base64Data, mimeType: "image/jpeg" } }
      ]
    });

    return response.text;
  } catch (error) {
    console.error("AI Analysis Error:", error);
    return "Failed to analyze photo. Please ensure the image is clear and try again later.";
  }
}

import { hashPassword, createSession } from "@/lib/auth";
import { redirect } from "next/navigation";
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
