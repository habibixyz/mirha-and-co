import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { generateWithRetry } from "@/lib/ai";
import { prisma } from "@/lib/prisma";
import { PRODUCTS } from "@/lib/products";

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session || !session.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Enforce subscription daily limits (3/day free, 20/day pro)
    const sub = await prisma.subscription.findUnique({ where: { userId: session.userId } });
    const isPro = sub?.tier === 'pro' && sub?.status === 'active';
    const maxQueriesPerDay = isPro ? 20 : 3;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dailyCount = await prisma.aiQueryLog.count({
      where: {
        userId: session.userId,
        createdAt: { gte: today }
      }
    });

    if (dailyCount >= maxQueriesPerDay) {
      return NextResponse.json(
        { error: isPro ? `You have reached your daily limit of ${maxQueriesPerDay} consultations.` : "LIMIT_REACHED_UPGRADE" },
        { status: 429 }
      );
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

    const lastUserMessage = messages.filter((m: any) => m.role === "user").pop()?.content || "";
    const conversationText = messages.map((m: any) => m.content).join(" ");

    // Extract face scan report details from systemInstruction if it exists
    let reportText = "";
    const reportMatch = systemInstruction.match(/face scan report:\s*(\{.*\})/);
    if (reportMatch) {
      try {
        const reportObj = JSON.parse(reportMatch[1]);
        reportText = `Concerns: ${reportObj.concerns?.join(", ") || ""}. Adjustments: ${reportObj.routineAdjustments?.join(", ") || ""}. Summary: ${reportObj.summary || ""}. Scores - Barrier: ${reportObj.barrierScore}, Acne: ${reportObj.acneScore}, Redness: ${reportObj.rednessScore}, Oiliness: ${reportObj.oilinessScore}.`;
      } catch (e) {
        // Ignore invalid JSON parsing
      }
    }

    // Search and match products from PRODUCTS
    const combinedText = `${lastUserMessage} ${conversationText} ${reportText}`.toLowerCase();
    
    // Simple relevance scorer
    const scoredProducts = PRODUCTS.map(p => {
      let score = 0;
      const name = p.name.toLowerCase();
      const brand = p.brand.toLowerCase();
      const desc = p.description.toLowerCase();
      
      if (combinedText.includes(brand)) score += 30;
      
      p.tags?.forEach(tag => {
        if (combinedText.includes(tag.toLowerCase())) score += 15;
      });
      
      p.concerns?.forEach(concern => {
        if (combinedText.includes(concern.toLowerCase())) score += 10;
      });
      
      // Category matches
      if (combinedText.includes("niacinamide") && (name.includes("niacinamide") || desc.includes("niacinamide"))) {
        score += 50;
      }
      if ((combinedText.includes("moisturizer") || combinedText.includes("moisturiser")) && 
          (p.subcat.toLowerCase().includes("moisturiser") || name.includes("moisturise") || name.includes("moisturizer") || p.specs["Texture"]?.toLowerCase()?.includes("gel"))) {
        score += 40;
      }
      if ((combinedText.includes("sunscreen") || combinedText.includes("spf")) && 
          (p.subcat.toLowerCase().includes("sunscreen") || name.includes("sunscreen") || name.includes("spf"))) {
        score += 40;
      }
      if ((combinedText.includes("cleanser") || combinedText.includes("face wash") || combinedText.includes("facewash")) && 
          (p.subcat.toLowerCase().includes("face wash") || name.includes("wash") || name.includes("cleanser"))) {
        score += 40;
      }
      
      if (combinedText.includes("acne") && (p as any).concerns?.includes("acne")) score += 20;
      if (combinedText.includes("pigmentation") && (p as any).concerns?.includes("pigmentation")) score += 20;
      if (combinedText.includes("dry") && (p as any).tags?.includes("dry skin")) score += 20;
      if (combinedText.includes("oily") && (p as any).tags?.includes("oily skin")) score += 20;

      return { product: p, score };
    });

    let matched = scoredProducts
      .filter(sp => sp.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(sp => sp.product);

    // Fallback/essential products to always include to give a good variety
    const essentialAsins = [
      "B0DH88LZ11", // Minimalist 10% Niacinamide
      "B01MDTVZTZ", // The Ordinary Niacinamide
      "B00BQFTQW6", // Neutrogena Hydro Boost Water Gel
      "B01CCGW4OE", // Cetaphil Gentle Cleanser
      "B09HC3QNLG", // Dot & Key CICA Gel
      "B0BDVG99J5", // Dot & Key Ceramides Moisturizer
      "B07VP5JFRB", // Re'equil Ultra Matte Sunscreen
      "B0DHY6LQTW", // Minimalist SPF 50
      "B0CW1N7QRT", // WishCare Niacinamide Sunscreen
      "B0B45RB1RV", // Deconstruct Gel Sunscreen
      "B0C9JPWLR4", // Aqualogica Sunscreen
      "B0CS1KT96"  // Lakme Sunscreen
    ];

    essentialAsins.forEach(asin => {
      if (matched.length < 15 && !matched.some(p => p.asin === asin)) {
        const prod = PRODUCTS.find(p => p.asin === asin);
        if (prod) matched.push(prod);
      }
    });

    const finalProducts = matched.slice(0, 12);

    // Inject strict instruction to only recommend from the product list and use markdown links
    const refinedInstruction = `
    ${systemInstruction}
    
    CRITICAL PRODUCT & BEHAVIORAL INSTRUCTIONS:
    1. You are Mirha, a human-like, warm, and highly professional skincare specialist at a premium boutique.
    2. When recommending products, DO NOT overwhelm the user with many options or list 10 products. Recommend ONLY a couple of products (usually 1 or 2 specific products total, maximum 3) that are the absolute best matches for their current question or scan findings.
    3. Be warm, empathetic, and premium. Speak conversationally like a real skincare guide, explaining the rationale behind your selection in a natural, friendly tone. Do not look like a robotic search engine or list-generator.
    4. You MUST only choose recommendations from the "Available Platform Products" list below. Do NOT suggest any external products or brands not present in the list (like Paula's Choice, Glow Recipe, Clinique, Belif, EltaMD, etc.).
    5. Always format each product recommendation as a markdown link: \`[Brand - Product Name](/product/ASIN)\`. You must use the exact ASIN from the list.
    6. Rationale Example: "Since you noticed some T-zone shine, I highly recommend introducing [The Ordinary - Niacinamide 10% + Zinc 1% 30ml](/product/B01MDTVZTZ) in the morning. It's incredibly effective at regulating excess sebum without drying out the rest of your skin."
    
    Available Platform Products:
    ${finalProducts.map(p => `- ${p.brand} - ${p.name} (ASIN: ${p.asin}): ${p.description} (Price: ₹${p.price})`).join("\n")}
    `;

    const prompt = `
    ${refinedInstruction}
    
    Here is the ongoing conversation history:
    ${chatHistory}
    
    Respond directly to the last message as Mirha. Keep it friendly, empathetic, and clear. Do NOT prepend "Mirha:" to the output.
    `;

    const reply = await generateWithRetry(prompt);
    
    // Log the interaction
    try {
      const lastUserMessageText = messages.filter((m: any) => m.role === "user").pop()?.content || "";
      await prisma.aiQueryLog.create({
        data: {
          userId: session.userId,
          query: lastUserMessageText,
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
