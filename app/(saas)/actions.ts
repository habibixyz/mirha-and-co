"use server";

import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";


export async function saveRoutine(name: string, steps: string[]) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

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
  const session = await getSession();
  if (!session) return { routines: [], journal: null, user: null, error: "Unauthorized" };

  try {
    const routines = await prisma.routine.findMany({
      where: { userId: session.userId },
      orderBy: { createdAt: "asc" }
    });

    const recentJournal = await prisma.skinJournal.findFirst({
      where: { userId: session.userId },
      orderBy: { date: "desc" }
    });

    return { 
      routines: routines.map(r => ({ id: r.id, name: r.name, steps: JSON.parse(r.routine) })), 
      journal: recentJournal,
      user: session.user
    };
  } catch (error) {
    return { error: "Failed to fetch data" };
  }
}

export async function getUserProfile() {
  const session = await getSession();
  if (!session) return null;

  return prisma.user.findUnique({
    where: { id: session.userId },
    include: { subscription: true }
  });
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

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  
  if (!email || !password) throw new Error("Missing fields");

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || user.passwordHash !== hashPassword(password)) {
    throw new Error("Invalid credentials");
  }

  await createSession(user.id);
  redirect("/dashboard");
}

export async function registerAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;

  if (!email || !password || !name) throw new Error("Missing fields");

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new Error("Email already in use");

  const user = await prisma.user.create({
    data: {
      email,
      name,
      passwordHash: hashPassword(password),
    }
  });

  await createSession(user.id);
  redirect("/dashboard");
}
