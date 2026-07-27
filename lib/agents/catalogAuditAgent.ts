export interface CatalogProduct {
  id: string;
  name: string;
  category: string;
  ingredients: string[];
  price: number;
}

export interface CatalogAuditResult {
  totalSkus: number;
  catalogHealthScore: number; // 0 - 100
  missingCategories: string[];
  ingredientConflictRisks: string[];
  climateSuitability: {
    hardWaterReadyCount: number;
    highHumidityReadyCount: number;
    aridDesertReadyCount: number;
  };
  taggedSkus: {
    id: string;
    name: string;
    climateTags: string[];
    hardWaterSafe: boolean;
  }[];
}

export function runCatalogAuditAgent(products: CatalogProduct[]): CatalogAuditResult {
  const taggedSkus = products.map(p => {
    const ingLower = p.ingredients.map(i => i.toLowerCase());
    const isChelating = ingLower.some(i => i.includes("edta") || i.includes("citric acid") || i.includes("gluconolactone"));
    const isBarrierRep = ingLower.some(i => i.includes("ceramide") || i.includes("squalane") || i.includes("panthenol"));
    const isAcneFighting = ingLower.some(i => i.includes("salicylic") || i.includes("niacinamide") || i.includes("zinc"));

    const climateTags: string[] = [];
    if (isChelating) climateTags.push("Hard Water Anti-Mineral");
    if (isBarrierRep) climateTags.push("Arid / Winter Cold Shield");
    if (isAcneFighting) climateTags.push("High Humidity Sebum Balance");

    return {
      id: p.id,
      name: p.name,
      climateTags: climateTags.length > 0 ? climateTags : ["General Care"],
      hardWaterSafe: isChelating || isBarrierRep,
    };
  });

  const hardWaterCount = taggedSkus.filter(t => t.hardWaterSafe).length;
  const highHumidityCount = taggedSkus.filter(t => t.climateTags.includes("High Humidity Sebum Balance")).length;
  const aridCount = taggedSkus.filter(t => t.climateTags.includes("Arid / Winter Cold Shield")).length;

  const missingCategories: string[] = [];
  if (hardWaterCount === 0) missingCategories.push("Chelating Micellar Cleanser (Hard Water Protection)");
  if (aridCount === 0) missingCategories.push("Lipid Barrier Recovery Balm (Dry Cold Air Shield)");

  // Health Score Calculation
  let healthScore = 100;
  if (missingCategories.length > 0) healthScore -= missingCategories.length * 20;

  return {
    totalSkus: products.length,
    catalogHealthScore: Math.max(20, healthScore),
    missingCategories,
    ingredientConflictRisks: [
      "Check catalog bundles pairing Retinol items directly with AHA toners without night-alternating instructions.",
    ],
    climateSuitability: {
      hardWaterReadyCount: hardWaterCount,
      highHumidityReadyCount: highHumidityCount,
      aridDesertReadyCount: aridCount,
    },
    taggedSkus,
  };
}
