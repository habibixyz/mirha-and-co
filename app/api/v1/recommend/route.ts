import { NextRequest, NextResponse } from "next/server";
import { generateRoutine, QuizAnswers } from "../../../../lib/routineEngine";

// List of allowed API keys
const DEFAULT_KEYS = ["b2b_trial_key", "b2b_grow_key"];

// Handle CORS preflight options request
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

export async function POST(req: NextRequest) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };

  try {
    const body = await req.json().catch(() => ({}));
    const { apiKey, skinType, mainConcern, budget, experience = "beginner", climate } = body;

    // 1. API Key Validation
    const envKeys = process.env.B2B_API_KEYS ? process.env.B2B_API_KEYS.split(",") : [];
    const validKeys = [...DEFAULT_KEYS, ...envKeys];

    if (!apiKey || !validKeys.includes(apiKey)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. A valid B2B API Key is required." },
        { status: 401, headers }
      );
    }

    // 2. Input Parameter Validation
    const allowedSkinTypes = ["oily", "dry", "combination", "sensitive"];
    const allowedConcerns = ["acne", "pigmentation", "dullness", "dehydration"];
    const allowedBudgets = ["under_500", "under_1000", "under_2000"];

    if (!skinType || !allowedSkinTypes.includes(skinType)) {
      return NextResponse.json(
        { success: false, error: `Invalid skinType. Must be one of: ${allowedSkinTypes.join(", ")}` },
        { status: 400, headers }
      );
    }

    if (skinType !== "sensitive" && (!mainConcern || !allowedConcerns.includes(mainConcern))) {
      return NextResponse.json(
        { success: false, error: `Invalid mainConcern. Must be one of: ${allowedConcerns.join(", ")}` },
        { status: 400, headers }
      );
    }

    if (!budget || !allowedBudgets.includes(budget)) {
      return NextResponse.json(
        { success: false, error: `Invalid budget. Must be one of: ${allowedBudgets.join(", ")}` },
        { status: 400, headers }
      );
    }

    // 3. Assemble inputs for the routine engine
    const answers: QuizAnswers = {
      skinType,
      mainConcern: mainConcern || "acne",
      budget,
      experience,
    };

    // 4. Generate the recommendation
    const recommendation = generateRoutine(answers, climate);

    return NextResponse.json(
      {
        success: true,
        recommendation,
      },
      { status: 200, headers }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Internal Server Error" },
      { status: 500, headers }
    );
  }
}
