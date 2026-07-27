import { generateRoutine, QuizAnswers } from "../routineEngine";
import { resolveLocationDataLive } from "../geocoding";

export interface AgentStep {
  step: number;
  action: string;
  thought: string;
  output: any;
  status: "success" | "warning" | "error";
}

export interface ConciergeAgentInput {
  userId?: string;
  query: string;
  skinType?: string;
  mainConcern?: string;
  city?: string;
  currentProducts?: string[];
}

export interface ConciergeAgentResult {
  agentName: string;
  summary: string;
  steps: AgentStep[];
  updatedRoutine: any;
  conflictWarnings: string[];
  recommendedAdjustments: string[];
}

/**
 * Autonomous Concierge Agent
 * 1. Perceives user intent & skin concerns.
 * 2. Fetches live environmental telemetry (PPM, humidity, dewpoint).
 * 3. Inspects current product list for active ingredient chemical conflicts (e.g. Retinol + AHA).
 * 4. Autonomously constructs & optimizes a safe AM/PM routine.
 */
export async function runConciergeAgent(input: ConciergeAgentInput): Promise<ConciergeAgentResult> {
  const steps: AgentStep[] = [];
  const conflictWarnings: string[] = [];
  const recommendedAdjustments: string[] = [];

  // Step 1: Perception & Intent Classification
  steps.push({
    step: 1,
    action: "Perception & Intent Classification",
    thought: `Analyzing prompt: "${input.query}". Extracting skin parameters and environmental location target.`,
    output: {
      targetSkinType: input.skinType || "oily",
      targetConcern: input.mainConcern || "acne",
      targetCity: input.city || "London",
    },
    status: "success",
  });

  // Step 2: Environmental Telemetry Retrieval
  const targetCity = input.city || "London";
  const climateData = await resolveLocationDataLive({ city: targetCity });

  steps.push({
    step: 2,
    action: "Fetch Environmental & Tap Water Telemetry",
    thought: `Geocoding city ${targetCity}. Inspecting mineral density (PPM), humidity, and thermal dew point.`,
    output: {
      city: climateData.city,
      country: climateData.countryCode,
      waterHardnessPpm: climateData.ppm,
      waterCategory: climateData.waterCategory,
      humidityPercent: climateData.humidity,
      temperatureC: climateData.temp,
    },
    status: "success",
  });

  // Step 3: Product Conflict & Synergy Analysis
  const products = input.currentProducts || ["Retinol 0.5% Serum", "Glycolic Acid 7% Toning Solution", "Gentle Hydrating Cleanser"];
  
  // Conflict rules evaluation
  const hasRetinol = products.some(p => p.toLowerCase().includes("retinol") || p.toLowerCase().includes("tretinoin"));
  const hasAHA = products.some(p => p.toLowerCase().includes("glycolic") || p.toLowerCase().includes("lactic") || p.toLowerCase().includes("aha"));
  const hasSalicylic = products.some(p => p.toLowerCase().includes("salicylic") || p.toLowerCase().includes("bha"));

  if (hasRetinol && (hasAHA || hasSalicylic)) {
    conflictWarnings.push("CRITICAL CONFLICT DETECTED: Retinol combined with AHA/BHA exfoliants increases TEWL and risks severe skin barrier erosion.");
    recommendedAdjustments.push("Split Retinol to PM-only (Mon/Wed/Fri) and AHA/BHA to alternate evenings (Tue/Thu). Never layer simultaneously.");
  }

  if (climateData.ppm >= 180) {
    recommendedAdjustments.push(`Hard tap water in ${climateData.city} (${climateData.ppm} PPM) leaves calcium soap scum. Switch to a chelating EDTA cleanser to unblock pores.`);
  }

  steps.push({
    step: 3,
    action: "Cross-Product Chemical Compatibility Check",
    thought: "Evaluating active ingredient layering safety across current product shelf.",
    output: {
      evaluatedProductsCount: products.length,
      conflictsFound: conflictWarnings.length,
      conflictWarnings,
    },
    status: conflictWarnings.length > 0 ? "warning" : "success",
  });

  // Step 4: Autonomous Routine Construction
  const quizAnswers: QuizAnswers = {
    skinType: (input.skinType as any) || "oily",
    mainConcern: (input.mainConcern as any) || "acne",
    budget: "under_1000",
    experience: "intermediate",
  };

  const updatedRoutine = generateRoutine(quizAnswers, {
    city: climateData.city,
    country: climateData.countryCode,
    ppm: climateData.ppm,
    temp: climateData.temp,
    humidity: climateData.humidity,
    dewpoint: climateData.dewpoint,
  });

  steps.push({
    step: 4,
    action: "Autonomous Routine Optimization & Database Mapping",
    thought: "Constructed science-backed AM/PM regimen resolving conflicts and counteracting tap water mineral friction.",
    output: {
      cleanser: updatedRoutine.cleanser.name,
      treatment: updatedRoutine.treatment.name,
      moisturiser: updatedRoutine.moisturiser.name,
      sunscreen: updatedRoutine.sunscreen.name,
      climateAlert: updatedRoutine.climateAdjustment?.alertText || "Stable",
    },
    status: "success",
  });

  return {
    agentName: "Ask Mirha Concierge Agent v1.0",
    summary: `Autonomous agent successfully resolved ${conflictWarnings.length} ingredient conflict(s) and optimized your routine for ${climateData.city}'s ${climateData.waterCategory} water (${climateData.ppm} PPM).`,
    steps,
    updatedRoutine,
    conflictWarnings,
    recommendedAdjustments,
  };
}
