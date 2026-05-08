import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

/**
 * Intelligent search that understands skincare concerns and intent.
 */
export async function aiSearch(query: string, searchContext: any[]) {
  const prompt = `
    You are an expert Skincare Specialist for "Mirha & Co.", specialized in Indian skin types and tropical climates.
    A user is asking: "${query}"
    
    Here is a list of products, routines, and guides from our database:
    ${JSON.stringify(searchContext.slice(0, 15))}
    
    Tasks:
    1. Analyze the user's intent, skin type (Oily/Dry/Combo), and specific concerns (e.g., humidity-induced acne, pollution, tanning).
    2. MANDATORY: Select EXACTLY 3 to 4 most relevant items from the provided list to recommend.
    3. Provide a sophisticated (2-3 sentences) "Expert Advice" string. Mention specific active ingredients (like Niacinamide or Salicylic Acid) if relevant.
    
    Return ONLY a JSON object with:
    {
      "advice": "Expert advice string...",
      "recommendedIds": [id1, id2, ...]
    }
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
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
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return JSON.parse(text.replace(/```json|```/g, ""));
  } catch (error) {
    console.error("Journal Analysis Error:", error);
    return null;
  }
}
