/**
 * ⚡ Mirha & Co. — Live End-to-End RAG Sandbox Simulation
 * 
 * To ensure your main project workspace stays 100% pristine, this sandbox runs
 * completely in isolation. It implements a fully functional RAG pipeline using
 * pure JavaScript to simulate:
 *   1. Ingestion (Knowledge Base Indexing)
 *   2. Retrieval (Simulated Semantic Vector Search using Cosine Similarity)
 *   3. Context Augmentation (Prompt Generation)
 *   4. Live Generation (Google Gemini 1.5 Flash API Call)
 * 
 * Run this script in your terminal using:
 *   node scratch/rag_demo.js
 */

const fs = require('fs');
const path = require('path');

// ─── 0. DYNAMIC KEY LOADER (Zero-dependency .env parsing) ───────────────────
let geminiApiKey = "";
try {
  const envPath = path.join(__dirname, '../.env');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const match = envContent.match(/GEMINI_API_KEY=["']?([^"'\r\n]+)["']?/);
    if (match) {
      geminiApiKey = match[1];
    }
  }
} catch (err) {
  console.error("Failed to read .env file:", err);
}

// Fallback to process.env if available
geminiApiKey = geminiApiKey || process.env.GEMINI_API_KEY || "";
geminiApiKey = geminiApiKey.trim().replace(/^["']|["']$/g, ""); // Strip any trailing or leading quotes cleanly!

if (geminiApiKey) {
  console.log(`🔑 DEBUG: Parsed API Key preview: "${geminiApiKey.substring(0, 8)}...${geminiApiKey.substring(geminiApiKey.length - 4)}" (Length: ${geminiApiKey.length})`);
} else {
  console.log("❌ DEBUG: No API key parsed from .env");
}

// ─── 1. THE KNOWLEDGE BASE (Our simulated database) ─────────────────────────
const SKINCARE_KNOWLEDGE_BASE = [
  {
    id: "doc_1",
    title: "Simple Kind to Skin Hydrating Cleanser",
    category: "Cleanser",
    content: "Perfect for dry and sensitive skin. It is soap-free, contains Panthenol, and cleanses the skin without stripping any moisture or breaking down the protective skin barrier. Fragrance-free."
  },
  {
    id: "doc_2",
    title: "Minimalist 7% ALA + Glycolic Acid Face Wash",
    category: "Cleanser",
    content: "Designed for oily and combination skin. Contains glycolic acid which acts as an active chemical exfoliant to regulate excess sebum, clear clogged pores, and eliminate surface dullness."
  },
  {
    id: "doc_3",
    title: "Neutrogena Hydro Boost Water Gel",
    category: "Moisturizer",
    content: "An ultra-lightweight, oil-free gel moisturizer powered by Hyaluronic Acid. Instantly hydrates combination and dehydrated oily skin without clogging pores or feeling sticky. Great for hot, humid weather."
  },
  {
    id: "doc_4",
    title: "Cetaphil Moisturising Cream",
    category: "Moisturizer",
    content: "A rich, deeply emollient cream designed for extremely dry, peeling, and sensitive skin profiles. Provides intense 48-hour moisture barrier repair. Avoid on active acne-prone oily skin."
  },
  {
    id: "doc_5",
    title: "Deconstruct Gel Sunscreen SPF 50 PA++++",
    category: "Sunscreen",
    content: "A lightweight, zero-grease gel sunscreen designed for Indian summer conditions. Uses next-generation photostable UV filters. Leaves no white cast and prevents sun-induced pigmentation."
  }
];

// ─── 2. PURE JAVASCRIPT VECTOR MATCHING ENGINE (Cosine Similarity) ─────────
function textToVector(text) {
  const words = text.toLowerCase().match(/\w+/g) || [];
  const vector = {};
  for (const word of words) {
    const stopWords = new Set(['is', 'it', 'a', 'an', 'and', 'the', 'for', 'to', 'in', 'on', 'with', 'without']);
    if (!stopWords.has(word)) {
      vector[word] = (vector[word] || 0) + 1;
    }
  }
  return vector;
}

function calculateCosineSimilarity(vec1, vec2) {
  let dotProduct = 0;
  let magnitude1 = 0;
  let magnitude2 = 0;

  for (const term in vec1) {
    if (term in vec2) {
      dotProduct += vec1[term] * vec2[term];
    }
    magnitude1 += vec1[term] * vec1[term];
  }

  for (const term in vec2) {
    magnitude2 += vec2[term] * vec2[term];
  }

  magnitude1 = Math.sqrt(magnitude1);
  magnitude2 = Math.sqrt(magnitude2);

  if (magnitude1 === 0 || magnitude2 === 0) return 0;
  return dotProduct / (magnitude1 * magnitude2);
}

// ─── 3. THE RAG PIPELINE (Retrieve, Augment, Synthesize, Generate) ──────────
async function runRagPipeline(userQuery) {
  console.log("\n" + "═".repeat(60));
  console.log(`🔎 USER QUERY: "${userQuery}"`);
  console.log("═".repeat(60));

  // STEP 1: Vectorize user query
  const queryVector = textToVector(userQuery);

  console.log("⚡ [Step 1: Retrieval] Scanning database for semantic similarity...\n");

  // STEP 2: Query database & score matches
  const scoredDocuments = SKINCARE_KNOWLEDGE_BASE.map(doc => {
    const docVector = textToVector(doc.title + " " + doc.content);
    const score = calculateCosineSimilarity(queryVector, docVector);
    return { ...doc, score };
  })
  .sort((a, b) => b.score - a.score); // Sort by highest score

  // Print search results
  scoredDocuments.forEach(doc => {
    const bar = "█".repeat(Math.round(doc.score * 20));
    console.log(`  [Score: ${doc.score.toFixed(3)}] ${bar.padEnd(20)} | ${doc.title}`);
  });

  // STEP 3: Retrieve top matching document
  const topMatch = scoredDocuments[0];
  
  if (!topMatch || topMatch.score === 0) {
    console.log("\n❌ No relevant context found in database.");
    return;
  }

  console.log(`\n✅ [Step 2: Context Selected] Retrieved most relevant chunk: "${topMatch.title}"`);

  // STEP 4: Synthesize context-aware prompt
  const augmentedPrompt = `
SYSTEM ROLE: You are an expert AI Skincare consultant for Mirha & Co.
Use the verified knowledge block provided below to answer the user's question.
Keep the tone helpful, professional, and friendly.

[VERIFIED KNOWLEDGE BASE BLOCK]
Product: ${topMatch.title} (${topMatch.category})
Description: ${topMatch.content}

[USER QUESTION]
${userQuery}

[AI INFERENCE RESPONSE GENERATION]
  `.trim();

  console.log("\n────────────────────────────────────────────────────────────");
  console.log("🚀 [Step 3: Prompt Synthesized] Injected prompt to hand over to LLM.");
  console.log("────────────────────────────────────────────────────────────\n");

  // STEP 5: Live Gemini Generation
  if (geminiApiKey) {
    console.log("🤖 [Step 4: LLM Inference] Querying live Google Gemini API...\n");
    const { GoogleGenerativeAI } = require("@google/generative-ai");
    const genAI = new GoogleGenerativeAI(geminiApiKey);

    const modelsToTry = [
      "gemini-2.0-flash", 
      "gemini-2.5-flash", 
      "gemini-1.5-flash", 
      "gemini-pro"
    ];
    let success = false;

    for (const modelName of modelsToTry) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent(augmentedPrompt);
        const response = await result.response;
        const responseText = response.text();

        console.log(`✨ [Step 5: Synthesized Output] Real-time AI response using "${modelName}":`);
        console.log("═".repeat(60));
        console.log(responseText.trim());
        console.log("═".repeat(60) + "\n");
        success = true;
        break; // Exit the loop on successful generation
      } catch (err) {
        console.log(`⚠️  Endpoint "${modelName}" failed:`, err.message);
        try {
          console.log("📡 Sending direct HTTP POST request via fetch...");
          const url = `https://generativelanguage.googleapis.com/v1/models/${modelName}:generateContent?key=${geminiApiKey}`;
          const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ parts: [{ text: "Hello, who are you?" }] }]
            })
          });
          const resJson = await res.json();
          console.log("Direct HTTP Response status:", res.status);
          console.log("Direct HTTP Response body:", JSON.stringify(resJson, null, 2));
        } catch (fetchErr) {
          console.log("❌ Direct HTTP call failed:", fetchErr.message);
        }
      }
    }

    if (!success) {
      console.log("❌ All model endpoints failed. Please check if your API key is correctly enabled for the Generative Language API in Google AI Studio.");
    }
  } else {
    console.log("ℹ️ No GEMINI_API_KEY found in .env. Add it to run live AI generation.");
  }
}

// ─── 4. RUN DEMONSTRATIONS ──────────────────────────────────────────────────
async function main() {
  if (geminiApiKey) {
    try {
      console.log("🔍 Checking allowed models for this API key via direct GET request...");
      const url = `https://generativelanguage.googleapis.com/v1/models?key=${geminiApiKey}`;
      const res = await fetch(url);
      const resJson = await res.json();
      if (resJson.error) {
        console.log("❌ listModels Error:", JSON.stringify(resJson.error, null, 2));
      } else if (resJson.models) {
        console.log("Allowed models:");
        resJson.models.forEach(m => console.log(`  - ${m.name}`));
      } else {
        console.log("Response:", resJson);
      }
    } catch (err) {
      console.log("❌ Failed to list models:", err.message);
    }
  }

  // Test Query 1: Looking for dry, reactive skin cleansers
  await runRagPipeline("I need a gentle soap-free cleanser for my extremely dry sensitive skin");
}

main();
