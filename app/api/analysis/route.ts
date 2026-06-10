import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// Helper to convert remote image URL to generative part
async function urlToGenerativePart(url: string) {
 try {
 const response = await fetch(url);
 if (!response.ok) throw new Error("Failed to fetch image from URL");
 const arrayBuffer = await response.arrayBuffer();
 const contentType = response.headers.get("content-type") || "image/jpeg";
 
 return {
 inlineData: {
 data: Buffer.from(arrayBuffer).toString("base64"),
 mimeType: contentType,
 },
 };
 } catch (error: any) {
 console.error("Error converting image URL to generative part:", error);
 throw new Error(`Failed to process image URL: ${error.message}`);
 }
}

export async function POST(req: Request) {
 try {
 const session = await getSession();
 if (!session || !session.userId) {
 return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
 }

 const { image } = await req.json(); // Accept image as URL or Base64 string
 if (!image) {
 return NextResponse.json({ error: "Image data is required" }, { status: 400 });
 }

 // Fetch user and active subscription
 const user = await prisma.user.findUnique({
 where: { id: session.userId },
 include: { subscription: true },
 });

 if (!user) {
 return NextResponse.json({ error: "User not found" }, { status: 404 });
 }

 const isPro = (user.subscription?.tier === "pro" && user.subscription?.status === "active") || user.email === "tanizcoldz@gmail.com";
 const hasCredits = user.credits > 0;

 if (!isPro && !hasCredits) {
 return NextResponse.json(
 { error: "Access denied. Please subscribe or buy a scan pass." },
 { status: 403 }
 );
 }

 // Determine if we should consume a free daily scan or a paid credit
 let useCredit = false;

 if (isPro) {
 // Check if user has scanned in the last 24 hours (bypassed for admin tanizcoldz@gmail.com)
 const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
 const recentScan = user.email === "tanizcoldz@gmail.com" ? null : await prisma.faceAnalysis.findFirst({
 where: {
 userId: user.id,
 createdAt: { gte: twentyFourHoursAgo },
 },
 });

 if (recentScan) {
 // Already scanned in the last 24h. If they have credits, consume 1 credit.
 if (hasCredits) {
 useCredit = true;
 } else {
 const nextAvailableTime = new Date(recentScan.createdAt.getTime() + 24 * 60 * 60 * 1000);
 return NextResponse.json(
 { 
 error: "Daily limit reached",
 message: "You get 1 free scan per day as a Pro subscriber. Please wait or use/buy a single scan pass.",
 nextAvailableAt: nextAvailableTime.toISOString()
 },
 { status: 429 }
 );
 }
 }
 } else {
 // User is not Pro but has credits, so we must consume a credit.
 useCredit = true;
 }

 // Call Gemini Vision to analyze the selfie
 if (!process.env.GEMINI_API_KEY) {
 return NextResponse.json({ error: "Gemini API key is not configured" }, { status: 500 });
 }

 let imagePart;
 if (image.startsWith("data:")) {
 const mimeType = image.split(";")[0].split(":")[1];
 const base64Data = image.split(",")[1];
 imagePart = {
 inlineData: {
 data: base64Data,
 mimeType,
 },
 };
 } else {
 imagePart = await urlToGenerativePart(image);
 }

 const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

 const prompt = `
 You are an expert dermatological AI skin analysis tool for Mirha & Co.
 Analyze this user selfie and return a strictly formatted JSON response detailing their skin condition.
 
 Look for:
 1. Moisture barrier health (dryness, scaling, flaking).
 2. Acne/congestion (breakouts, comedones, clogged pores).
 3. Redness/sensitivity (inflammation, vascular visibility, irritation).
 4. Sebum/oiliness levels.

 For each category (barrier, acne, redness, oiliness), assign a score from 0 to 100.
 A higher score means BETTER condition (e.g., 100 barrierScore means perfect hydration, 100 acneScore means perfectly clear skin with no active breakouts, 100 rednessScore means no redness/irritation, 100 oilinessScore means perfectly balanced skin).

 Provide:
 - A comprehensive summary paragraph.
 - A list of specific concerns visible.
 - 2-3 specific routine adjustments or ingredient recommendations.
 - A short, encouraging agent welcome message to start the consultation chat.

 Return ONLY a JSON object with this exact structure:
 {
 "barrierScore": 85,
 "acneScore": 90,
 "rednessScore": 95,
 "oilinessScore": 80,
 "summary": "Your skin looks...",
 "concerns": ["Concern 1", "Concern 2"],
 "routineAdjustments": ["Adjustment 1", "Adjustment 2"],
 "agentWelcomeMessage": "Empathetic welcome message based on the analysis..."
 }
 `;

 const result = await model.generateContent([prompt, imagePart]);
 const responseText = await result.response.text();
 const cleanText = responseText.replace(/```json|```/g, "").trim();
 
 let analysisData;
 try {
 analysisData = JSON.parse(cleanText);
 } catch (parseErr) {
 console.error("Gemini failed to return valid JSON. Raw response:", responseText);
 return NextResponse.json({ error: "Failed to parse skin analysis report" }, { status: 500 });
 }

 // Save to PostgreSQL database
 // We only save the first 1000 chars of base64 to avoid bloating the database, or save a placeholder
 const dbImageUrl = image.startsWith("data:") ? "base64_uploaded_image" : image;

 const savedAnalysis = await prisma.faceAnalysis.create({
 data: {
 userId: user.id,
 imageUrl: dbImageUrl,
 barrierScore: analysisData.barrierScore || 50,
 acneScore: analysisData.acneScore || 50,
 rednessScore: analysisData.rednessScore || 50,
 oilinessScore: analysisData.oilinessScore || 50,
 detailedJson: analysisData,
 },
 });

 // If we consumed a credit, decrement it
 if (useCredit) {
 await prisma.user.update({
 where: { id: user.id },
 data: { credits: { decrement: 1 } },
 });
 }

 return NextResponse.json({
 status: "success",
 analysis: savedAnalysis,
 });
 } catch (error: any) {
 console.error("AI Analysis API Error:", error);
 return NextResponse.json({ error: error.message || "Failed to analyze skin" }, { status: 500 });
 }
}
