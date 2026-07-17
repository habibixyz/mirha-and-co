import { NextRequest, NextResponse } from "next/server";
import { generateWithRetry } from "@/lib/ai";
import { getSession } from "@/lib/auth";

const translateRateMap = new Map<string, { count: number; resetAt: number }>();

function checkTranslateRateLimit(ip: string, limit = 10): boolean {
  const now = Date.now();
  const entry = translateRateMap.get(ip);
  if (!entry || now > entry.resetAt) {
    translateRateMap.set(ip, { count: 1, resetAt: now + 60_000 });
    return false;
  }
  entry.count++;
  return entry.count > limit;
}

export async function POST(req: NextRequest) {
  try {
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0]?.trim() || "unknown";

    if (checkTranslateRateLimit(ip, 10)) {
      return NextResponse.json(
        { error: "Too many requests. Please slow down." },
        { status: 429 }
      );
    }

    const session = await getSession();
    const isSecretValid = process.env.TRANSLATE_API_SECRET && req.headers.get("x-translate-secret") === process.env.TRANSLATE_API_SECRET;
    
    const referer = req.headers.get("referer") || "";
    const origin = req.headers.get("origin") || "";
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.mirhaandco.com";
    
    const isSameSite = (origin && siteUrl.includes(origin)) || 
                       (referer && referer.includes(new URL(siteUrl).hostname)) ||
                       origin.includes("localhost") || 
                       referer.includes("localhost");

    if (!session && !isSecretValid && !isSameSite) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { text, targetLanguage } = body;

    if (!text || !targetLanguage) {
      return NextResponse.json(
        { error: "Text and targetLanguage are required" },
        { status: 400 }
      );
    }

    const isJson = text.trim().startsWith("{") || text.trim().startsWith("[");

    const prompt = isJson
      ? `
    You are an expert translator specializing in skincare, beauty, and wellness terms.
    Translate the values inside the following JSON structure into ${targetLanguage}.
    
    Requirements:
    - Translate all string values (skincare terms, brand descriptions, concerns) accurately.
    - Preserve all JSON keys, structure, array structures, and numbers exactly.
    - Do not translate keys, only their values.
    - Return ONLY the translated JSON object. Do not wrap it in markdown code blocks (like \`\`\`json), do not include any introductions, explanations, or notes. Output must be raw parseable JSON.
    
    JSON to translate:
    ${text}
    `
      : `
    You are an expert translator specializing in skincare, beauty, and wellness terms.
    Translate the following text into ${targetLanguage}.
    
    Requirements:
    - Translate accurately, preserving the tone (warm, professional, and authentic).
    - Maintain standard formatting like bullet points or list items if present.
    - Return ONLY the translation. Do not wrap it in markdown code blocks, do not add introductions, explanations, or notes.
    
    Text to translate:
    ${text}
    `;

    const translatedText = await generateWithRetry(prompt);
    
    // Clean up markdown wrapper if any
    let cleaned = translatedText.trim();
    if (cleaned.startsWith("```")) {
      cleaned = cleaned.replace(/^```(json)?/, "").replace(/```$/, "").trim();
    }

    return NextResponse.json({ translation: cleaned });
  } catch (error: any) {
    console.error("Translation API Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to translate text" },
      { status: 500 }
    );
  }
}
