import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redisCache } from "@/lib/redis";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

function isUrlSafeForSsrf(urlString: string): boolean {
  try {
    const parsed = new URL(urlString);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return false;
    
    const hostname = parsed.hostname.toLowerCase();
    
    if (
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      hostname === "0.0.0.0" ||
      hostname === "::1" ||
      hostname.endsWith(".local") ||
      hostname.endsWith(".internal")
    ) {
      return false;
    }

    const ipv4Match = hostname.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
    if (ipv4Match) {
      const [_, a, b] = ipv4Match.map(Number);
      if (a === 10) return false;
      if (a === 172 && b >= 16 && b <= 31) return false;
      if (a === 192 && b === 168) return false;
      if (a === 169 && b === 254) return false;
      if (a === 127) return false;
      if (a === 0) return false;
    }

    return true;
  } catch {
    return false;
  }
}

async function urlToGenerativePart(url: string) {
  try {
    if (!isUrlSafeForSsrf(url)) {
      throw new Error("Invalid or unsafe image URL provided.");
    }
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
    // 1. IP Detection for Rate Limiting & Abuse Prevention
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";

    const { image } = await req.json();
    if (!image || typeof image !== "string") {
      return NextResponse.json({ error: "Single image string is required for analysis." }, { status: 400 });
    }

    // 2. Check Auth Session
    const session = await getSession();
    const userId = session?.userId || null;

    if (!userId) {
      return NextResponse.json(
        {
          error: "Authentication required",
          message: "Please sign in to run your free daily skin scan.",
        },
        { status: 401 }
      );
    }

    let user: any = null;
    let isPro = false;
    let hasCredits = false;

    if (userId) {
      user = await prisma.user.findUnique({
        where: { id: userId },
        include: { subscription: true },
      });
      if (user) {
        isPro =
          (user.subscription?.tier === "pro" && user.subscription?.status === "active") ||
          user.isAdmin ||
          user.email === "tanizcoldz@gmail.com";
        hasCredits = user.credits > 0;
      }
    }

    // 3. Abuse Guardrail: 1 Free Scan per IP per Calendar Day (24h Window)
    const todayStr = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    const ipScanKey = `free_scan_ip:${ip}:${todayStr}`;
    const userScanKey = userId ? `free_scan_user:${userId}:${todayStr}` : null;

    const hasIpScannedToday = await redisCache.get<string>(ipScanKey);
    const hasUserScannedToday = userScanKey ? await redisCache.get<string>(userScanKey) : null;

    let recentDbScan = null;
    if (userId && !isPro) {
      const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      recentDbScan = await prisma.faceAnalysis.findFirst({
        where: {
          userId,
          createdAt: { gte: twentyFourHoursAgo },
        },
      });
    }

    const freeScanAlreadyUsed = !!(hasIpScannedToday || hasUserScannedToday || recentDbScan);
    let useCredit = false;

    if (!isPro) {
      if (freeScanAlreadyUsed) {
        // Free scan has been used today by this IP or User
        if (hasCredits) {
          useCredit = true;
        } else {
          const resetTime = new Date();
          resetTime.setUTCHours(23, 59, 59, 999);
          return NextResponse.json(
            {
              error: "Daily free scan limit reached (1 scan/day per IP).",
              message:
                "You have used your 1 free daily skin scan for today. Subscribe to Pro or buy a pass to perform additional scans!",
              requiresSubscription: true,
              nextAvailableAt: resetTime.toISOString(),
            },
            { status: 429 }
          );
        }
      }
    }

    // 4. Run Gemini Vision AI Analysis
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

    // Record the free daily scan rate limit usage in Redis (24h TTL)
    await redisCache.set(ipScanKey, "1", { ex: 86400 });
    if (userScanKey) {
      await redisCache.set(userScanKey, "1", { ex: 86400 });
    }

    // Save to Database if user exists
    let savedAnalysis = null;
    if (user) {
      const dbImageUrl = image.startsWith("data:") ? "base64_uploaded_image" : image;
      savedAnalysis = await prisma.faceAnalysis.create({
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

      if (useCredit) {
        await prisma.user.update({
          where: { id: user.id },
          data: { credits: { decrement: 1 } },
        });
      }
    }

    return NextResponse.json({
      status: "success",
      analysis: savedAnalysis || {
        id: `guest_${Date.now()}`,
        imageUrl: image.startsWith("data:") ? "base64_uploaded_image" : image,
        barrierScore: analysisData.barrierScore || 50,
        acneScore: analysisData.acneScore || 50,
        rednessScore: analysisData.rednessScore || 50,
        oilinessScore: analysisData.oilinessScore || 50,
        detailedJson: analysisData,
        createdAt: new Date().toISOString(),
      },
      isGuest: !user,
      freeScanUsedToday: true,
    });
  } catch (error: any) {
    console.error("AI Analysis API Error:", error);
    return NextResponse.json({ error: error.message || "Failed to analyze skin" }, { status: 500 });
  }
}
