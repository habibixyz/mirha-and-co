import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { generateWithRetry } from "@/lib/ai";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session || !session.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { messages } = await req.json();
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages array" }, { status: 400 });
    }

    // Extract system instructions and format the chat history
    const systemInstruction = messages.find((m: any) => m.role === "system")?.content || 
      "You are Mirha, a warm skincare consultant at Mirha & Co.";
    
    const chatHistory = messages
      .filter((m: any) => m.role !== "system")
      .map((m: any) => `${m.role === "user" ? "User" : "Mirha"}: ${m.content}`)
      .join("\n");

    const prompt = `
      ${systemInstruction}
      
      Here is the ongoing conversation history:
      ${chatHistory}
      
      Respond directly to the last message as Mirha. Keep it friendly, empathetic, and clear. Do not prepend "Mirha:" to the output.
    `;

    const reply = await generateWithRetry(prompt);
    
    // Log the interaction
    try {
      const lastUserMessage = messages.filter((m: any) => m.role === "user").pop()?.content || "";
      await prisma.aiQueryLog.create({
        data: {
          userId: session.userId,
          query: lastUserMessage,
          response: reply,
          type: "chat",
          metadata: { chatHistory }
        }
      });
    } catch (dbError) {
      console.error("Failed to log chat interaction:", dbError);
    }

    return NextResponse.json({ response: reply });
  } catch (error: any) {
    console.error("Chat API Error:", error);
    return NextResponse.json({ error: error.message || "Failed to process chat" }, { status: 500 });
  }
}
