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
  You are an expert dermatological AI skin analysis tool for Mirha & Co., an advanced skincare intelligence platform.
  Analyze the uploaded user selfie with high diagnostic precision and return a strictly formatted JSON response detailing their skin condition.
  
  Please analyze and evaluate:
  1. Moisture barrier health (hydration level, trans-epidermal water loss, presence of flaking, dry patches).
  2. Acne/congestion (comedones, whiteheads, blackheads, pustules, papules, active breakout areas, and clogged pores).
  3. Redness/sensitivity (capillary visibility, inflammation, irritation, skin flushing, or potential rosacea-like symptoms).
  4. Sebum/oiliness levels (T-zone shine, sebaceous activity, hyper-secretion).

  Scoring Rubric (assign a score from 0 to 100 for each category where a higher score represents BETTER/HEALTHIER condition):
  - 85-100: Excellent (optimal balance, clear skin, strong barrier, minimal irritation).
  - 70-84: Good (minor concerns, occasional breakouts, mild flaking or shine).
  - 50-69: Moderate Concerns (visible congestion, localized redness, flaky patches, or noticeable excess oil).
  - 0-49: High Attention Required (active inflamed breakouts, severe barrier compromise, intense redness/irritation, or extreme sebum overproduction).

  Provide:
  - "summary": A detailed, clinical-grade synthesis (3-4 sentences) outlining the main observations, skin type classification, and overall condition. Keep the tone professional, authoritative, yet warm and encouraging.
  - "concerns": A list of 2-4 highly specific observed concerns (e.g., "Mild redness around the nasal folds", "Congestion on the forehead", "Dehydrated cheeks").
  - "routineAdjustments": A list of 3 specific, actionable product adjustments or active ingredient recommendations (e.g., "Introduce a 2% Salicylic Acid (BHA) toner 2 nights a week to clear forehead comedones", "Apply a ceramide-rich barrier repair cream in your PM routine to soothe cheek redness", "Use a daily broad-spectrum SPF 50 sunscreen to prevent UV-induced redness"). Specify the active ingredients, concentration if applicable, and recommended application time (AM/PM).
  - "agentWelcomeMessage": A warm, personalized introduction from "Mirha", your virtual skincare consultant, summarizing the key finding and inviting the user to ask questions (e.g., "Hi! I'm Mirha, your skincare guide. I've finished analyzing your scan and noticed some mild redness around the cheeks along with forehead congestion. Would you like me to help you design a daily routine with Ceramides and BHA to address these areas?").

  Return ONLY a JSON object with this exact structure:
  {
    "barrierScore": 85,
    "acneScore": 90,
    "rednessScore": 95,
    "oilinessScore": 80,
    "summary": "Your skin displays...",
    "concerns": ["Concern 1", "Concern 2"],
    "routineAdjustments": ["Adjustment 1", "Adjustment 2"],
    "agentWelcomeMessage": "Greeting message..."
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
