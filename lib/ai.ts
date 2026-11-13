import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

/**
 * Helper to generate content with retries and fallback models.
 */
export async function generateWithRetry(prompt: string | any[]): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured");
  }

  const candidateModels = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-flash"];
  let lastError: any = null;

  for (const modelName of candidateModels) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error: any) {
      lastError = error;
      const msg = error?.message || String(error);
      // Immediately fail fast on invalid credentials instead of stalling
      if (msg.includes("API_KEY_INVALID") || msg.includes("API key not valid") || msg.includes("400")) {
        throw error;
      }
      console.warn(`Gemini (${modelName}) failed:`, msg);
    }
  }

  throw lastError || new Error("Failed to generate content with Gemini after model fallback");
}

/**
 * Intelligent search that understands skincare concerns and intent.
 */
export async function aiSearch(query: string, searchContext: any[]) {
 const prompt = `
 You are Mirha, a warm, honest, and experienced skincare consultant for Indian skin at Mirha & Co. (mirhaandco.com).
 You help users navigate real Indian skin challenges like humidity, pollution, pigmentation, acne, combination/oily skin, and budget constraints with practical, hype-free advice.

 A user is asking: "${query}"
 
 Here is a list of products, routines, and guides from our database (Retrieved Context):
 ${JSON.stringify(searchContext.slice(0, 15))}
 
 Core Principles:
 - Be friendly, empowering, and conversational — like a trusted friend who knows dermatology basics.
 - Synthesize all information into a smooth, connected response. Never sound like a raw data dump or disconnected bullet points.
 - Always connect ideas naturally with transitions ("This works well because...", "It pairs nicely with...", "However, keep in mind...").
 - Base every single claim strictly on the retrieved context. Never hallucinate products, ingredients, or results.
 - Think step-by-step: 1. Understand the query. 2. Identify the 2-3 most relevant insights from context. 3. Connect them logically before responding.

 Tasks:
 1. Analyze the user's intent, skin type (Oily/Dry/Combo), and specific concerns (e.g., humidity-induced acne, pollution, tanning).
 2. Select up to 4 most relevant items from the provided list to recommend. If the provided context is completely irrelevant to the user's query, you may return an empty array for "recommendedIds".
 3. Provide your response as Mirha (the "advice" string). Keep it warm, practical, confident, and caring. Start with a short, empathetic acknowledgment. Give a clear, flowing main answer in natural paragraphs. End with a helpful next step or soft follow-up question. Do not use marketing hype.
 
 Return ONLY a JSON object with:
 {
 "advice": "Mirha's warm, connected, flowing response...",
 "recommendedIds": [id1, id2, ...]
 }
 `;

 try {
 const text = await generateWithRetry(prompt);
 return JSON.parse(text.replace(/```json|```/g, ""));
 } catch (error) {
 console.error("AI Search Error:", error);
 return null;
 }
}

/**
 * Professional analysis of skin journal entries.
 */
export async function analyzeSkinJournal(entries: any[]) {
 const prompt = `
 You are a professional skincare analyst for "Mirha & Co.". 
 A user has logged the following skin journal entries over the last few days:
 ${JSON.stringify(entries)}
 
 Analyze the data and provide:
 1. A "Trend" (e.g., "Improving", "Irritated", "Stable").
 2. A "Key Observation" (e.g., "Your skin seems to react well to the new serum", "Late night entries correlate with lower skin score").
 3. An "Actionable Tip" for tomorrow.
 
 Keep it professional, encouraging, and concise.
 
 Return ONLY a JSON object with:
 {
 "trend": "...",
 "observation": "...",
 "tip": "..."
 }
 `;

 try {
 const text = await generateWithRetry(prompt);
 return JSON.parse(text.replace(/```json|```/g, ""));
 } catch (error) {
 console.warn("Journal Analysis AI fallback to heuristic:", error);
 if (Array.isArray(entries) && entries.length > 0) {
 const avg = entries.reduce((s: number, e: any) => s + (typeof e?.rating === "number" ? e.rating : 4), 0) / entries.length;
 return {
 trend: avg >= 4 ? "Improving" : avg >= 3 ? "Stable" : "Sensitive",
 observation: avg >= 4
 ? "Your barrier response has remained consistently steady across recent entries."
 : "Recent entries show minor sensitivity. Keep routines mild and prioritize barrier hydration.",
 tip: avg >= 4
 ? "Maintain your current routine steps and ensure sunscreen reapplication."
 : "Avoid introducing new high-percentage active exfoliants until irritation subsides.",
 };
 }
 return null;
 }
}

