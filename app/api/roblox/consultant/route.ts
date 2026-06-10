import { NextRequest, NextResponse } from "next/server";
import { generateWithRetry } from "@/lib/ai";

export async function POST(req: NextRequest) {
 try {
 const { query } = await req.json();
 if (!query) {
 return NextResponse.json({ error: "Missing query parameter" }, { status: 400 });
 }

 const prompt = `
 You are Mirha, a warm, honest, and experienced skincare consultant for Indian skin at Mirha & Co. (mirhaandco.com).
 A player in a Roblox game is asking you for skincare advice: "${query}"
 
 Respond directly to them as a friendly, supportive skincare expert.
 
 CRITICAL Roblox constraints:
 - Keep your response under 150 characters.
 - Return ONLY plain text.
 - DO NOT use markdown, emojis, asterisks, bullet points, or complex formatting.
 - Keep it short, conversational, and direct.
 `;

 const rawResponse = await generateWithRetry(prompt);
 
 // Clean up any extra whitespace or accidental markdown
 const advice = rawResponse
 .replace(/[*#`_\-]/g, "")
 .replace(/\s+/g, " ")
 .trim();

 // Set CORS headers so Roblox or other testers can access it if needed
 const response = NextResponse.json({ advice });
 response.headers.set("Access-Control-Allow-Origin", "*");
 response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
 response.headers.set("Access-Control-Allow-Headers", "Content-Type");
 
 return response;
 } catch (error: any) {
 console.error("Roblox API Error:", error);
 return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
 }
}

// Handle OPTIONS preflight requests
export async function OPTIONS() {
 const response = new NextResponse(null, { status: 204 });
 response.headers.set("Access-Control-Allow-Origin", "*");
 response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
 response.headers.set("Access-Control-Allow-Headers", "Content-Type");
 return response;
}
