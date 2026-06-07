"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Check, AlertTriangle, AlertOctagon, HelpCircle, ArrowRight, Sun, Moon } from "lucide-react";
import { PRODUCTS, getProductAffiliateUrl } from "@/lib/products";

// ─── ACTIVE INGREDIENTS DEFINITION ──────────────────────────────────────────
interface ActiveIngredient {
  id: string;
  name: string;
  category: string;
  description: string;
  skinTypeFit: string;
  tags: string[];
}

const INGREDIENTS: ActiveIngredient[] = [
  // Retinoids & Anti-Aging
  {
    id: "retinol",
    name: "Retinol / Retinoids",
    category: "Retinoids & Anti-Aging",
    description: "Speeds up skin cell turnover to reduce fine lines, acne, and pigmentation. Increases sun sensitivity.",
    skinTypeFit: "Mature, Acne-prone, Textured",
    tags: ["retinol", "retinal"]
  },
  {
    id: "bakuchiol",
    name: "Bakuchiol",
    category: "Retinoids & Anti-Aging",
    description: "A plant-based, gentle alternative to retinol that targets fine lines and loss of firmness without the irritation.",
    skinTypeFit: "Sensitive, All Skin Types",
    tags: ["bakuchiol"]
  },
  {
    id: "copper_peptides",
    name: "Copper Peptides",
    category: "Retinoids & Anti-Aging",
    description: "Boosts collagen and elastin production, aiding in skin regeneration and reducing fine lines.",
    skinTypeFit: "Mature, All Skin Types",
    tags: ["copper peptides", "copper"]
  },

  // Antioxidants & Brighteners
  {
    id: "vitamin_c",
    name: "Vitamin C",
    category: "Antioxidants & Brighteners",
    description: "Neutralizes free radicals, boosts collagen, and fades dark spots. Best used in the morning under SPF.",
    skinTypeFit: "All Skin Types, Dull, Hyperpigmented",
    tags: ["vitamin c", "vit c", "ascorbic"]
  },
  {
    id: "azelaic_acid",
    name: "Azelaic Acid",
    category: "Antioxidants & Brighteners",
    description: "Reduces redness, clears acne, and fades hyperpigmentation. Great for rosacea-prone skin.",
    skinTypeFit: "Sensitive, Acne-prone, Rosacea",
    tags: ["azelaic"]
  },
  {
    id: "alpha_arbutin",
    name: "Alpha Arbutin",
    category: "Antioxidants & Brighteners",
    description: "A safe brightening ingredient that reduces melanin production to target dark spots and uneven tone.",
    skinTypeFit: "Hyperpigmented, All Skin Types",
    tags: ["arbutin"]
  },
  {
    id: "kojic_acid",
    name: "Kojic Acid",
    category: "Antioxidants & Brighteners",
    description: "Derived from fungi, it's a powerful lightening agent for sun damage, scars, and age spots.",
    skinTypeFit: "Hyperpigmented",
    tags: ["kojic"]
  },
  {
    id: "tranexamic_acid",
    name: "Tranexamic Acid",
    category: "Antioxidants & Brighteners",
    description: "Reduces melanin synthesis, highly effective against melasma and stubborn post-inflammatory erythema.",
    skinTypeFit: "Hyperpigmented, Melasma",
    tags: ["tranexamic"]
  },

  // Exfoliants
  {
    id: "salicylic_acid",
    name: "Salicylic Acid (BHA)",
    category: "Exfoliants",
    description: "Oil-soluble acid that penetrates deep into pores to dissolve excess sebum, blackheads, and dirt.",
    skinTypeFit: "Oily, Acne-prone, Congested",
    tags: ["salicylic", "bha"]
  },
  {
    id: "glycolic_acid",
    name: "Glycolic Acid (AHA)",
    category: "Exfoliants",
    description: "Water-soluble acid that dissolves dead cells on the skin surface, improving texture and skin tone.",
    skinTypeFit: "Dry, Sun-damaged, Hyperpigmented",
    tags: ["glycolic", "aha"]
  },
  {
    id: "lactic_acid",
    name: "Lactic Acid (AHA)",
    category: "Exfoliants",
    description: "A gentler AHA that also draws moisture to the skin. Great for surface exfoliation.",
    skinTypeFit: "Dry, Sensitive",
    tags: ["lactic"]
  },
  {
    id: "mandelic_acid",
    name: "Mandelic Acid (AHA)",
    category: "Exfoliants",
    description: "A large-molecule AHA that penetrates slowly, making it extremely gentle for sensitive skin.",
    skinTypeFit: "Sensitive, Acne-prone",
    tags: ["mandelic"]
  },
  {
    id: "pha",
    name: "Polyhydroxy Acids (PHA)",
    category: "Exfoliants",
    description: "The most gentle exfoliants that act on the skin's surface without irritation while providing hydration.",
    skinTypeFit: "Ultra-sensitive, Rosacea",
    tags: ["pha", "gluconolactone", "lactobionic"]
  },

  // Hydrators & Barrier Repair
  {
    id: "niacinamide",
    name: "Niacinamide (Vitamin B3)",
    category: "Hydrators & Barrier Repair",
    description: "Strengthens skin barrier, regulates sebum, minimizes pores, and calms redness/irritation.",
    skinTypeFit: "All Skin Types, Sensitive, Oily",
    tags: ["niacinamide"]
  },
  {
    id: "hyaluronic_acid",
    name: "Hyaluronic Acid",
    category: "Hydrators & Barrier Repair",
    description: "Humectant that draws moisture into the skin, holding up to 1000x its weight in water.",
    skinTypeFit: "Dry, Dehydrated, All Skin Types",
    tags: ["hyaluronic", "hydrating"]
  },
  {
    id: "ceramides",
    name: "Ceramides",
    category: "Hydrators & Barrier Repair",
    description: "Lipids that make up 50% of the skin barrier, essential for retaining moisture and protecting from damage.",
    skinTypeFit: "Dry, Damaged Barrier",
    tags: ["ceramide", "ceramides"]
  },
  {
    id: "peptides",
    name: "Peptides",
    category: "Hydrators & Barrier Repair",
    description: "Amino acid chains that act as building blocks for collagen and elastin, improving skin firmness.",
    skinTypeFit: "Mature, Damaged Barrier",
    tags: ["peptide", "peptides"]
  },
  {
    id: "panthenol",
    name: "Panthenol (Vitamin B5)",
    category: "Hydrators & Barrier Repair",
    description: "Deeply soothing and hydrating ingredient that speeds up skin healing and reduces inflammation.",
    skinTypeFit: "Sensitive, Irritated",
    tags: ["panthenol", "b5"]
  },
  {
    id: "squalane",
    name: "Squalane",
    category: "Hydrators & Barrier Repair",
    description: "A lightweight, non-comedogenic oil that mimics skin's natural sebum to lock in moisture.",
    skinTypeFit: "Dry, All Skin Types",
    tags: ["squalane"]
  },
  {
    id: "centella",
    name: "Centella Asiatica (Cica)",
    category: "Hydrators & Barrier Repair",
    description: "Powerful wound-healing herb that calms severe irritation, redness, and inflammation.",
    skinTypeFit: "Sensitive, Acne-prone, Rosacea",
    tags: ["centella", "cica", "madecassoside"]
  },
  {
    id: "snail_mucin",
    name: "Snail Mucin",
    category: "Hydrators & Barrier Repair",
    description: "Rich in glycoproteins, hyaluronic acid, and peptides. Deeply hydrating and reparative.",
    skinTypeFit: "Dehydrated, Acne-prone",
    tags: ["snail"]
  },

  // Targeted Treatments
  {
    id: "benzoyl_peroxide",
    name: "Benzoyl Peroxide",
    category: "Targeted Treatments",
    description: "Kills acne-causing bacteria and dries out active inflammatory blemishes.",
    skinTypeFit: "Acne-prone, Oily",
    tags: ["benzoyl", "benzac"]
  }
];

// ─── COMPATIBILITY RULES DEFINITION ─────────────────────────────────────────
interface ConflictRule {
  actives: [string, string];
  severity: "safe" | "caution" | "conflict";
  message: string;
  recommendation: string;
}

const CONFLICT_RULES: ConflictRule[] = [
  {
    actives: ["retinol", "salicylic_acid"],
    severity: "conflict",
    message: "High risk of severe irritation, flaking, and a damaged skin barrier.",
    recommendation: "Never layer them in the same routine step. Use Salicylic Acid in the morning and Retinol in the evening, or alternate nights."
  },
  {
    actives: ["retinol", "glycolic_acid"],
    severity: "conflict",
    message: "Dual exfoliation triggers extreme dryness, redness, and peeling.",
    recommendation: "Use AHAs 1-2 nights a week, and Retinol on the other nights. Never layer them together."
  },
  {
    actives: ["retinol", "lactic_acid"],
    severity: "conflict",
    message: "Dual exfoliation triggers severe dryness and redness.",
    recommendation: "Alternate your AHA and Retinol on different nights."
  },
  {
    actives: ["vitamin_c", "salicylic_acid"],
    severity: "caution",
    message: "Destabilization risk. Acidic environments can render Vitamin C less stable or cause skin stinging.",
    recommendation: "Apply Vitamin C in the morning (for daytime antioxidant shield) and Salicylic Acid at night."
  },
  {
    actives: ["vitamin_c", "glycolic_acid"],
    severity: "caution",
    message: "Both are low-pH active formulas. Layering them can cause stinging and redness.",
    recommendation: "Use Vitamin C in your morning routine and your AHA in your evening routine."
  },
  {
    actives: ["retinol", "benzoyl_peroxide"],
    severity: "conflict",
    message: "Benzoyl Peroxide oxidizes Retinol, rendering both ingredients ineffective while compounding irritation.",
    recommendation: "Apply Benzoyl Peroxide in the morning as a spot treatment, and use Retinol at night."
  },
  {
    actives: ["retinol", "vitamin_c"],
    severity: "caution",
    message: "Opposing pH levels. Layering them can decrease efficacy and increase irritation risk.",
    recommendation: "Apply Vitamin C in the morning under sunscreen, and Retinol in the evening."
  },
  {
    actives: ["benzoyl_peroxide", "salicylic_acid"],
    severity: "caution",
    message: "Dual-drying effect. Combining both can strip skin lipids and dry out the skin surface.",
    recommendation: "Use Salicylic Acid as a daily wash/toner and Benzoyl Peroxide purely as a targeted overnight spot-treatment."
  },
  {
    actives: ["niacinamide", "vitamin_c"],
    severity: "safe",
    message: "Highly synergistic pairing. Vitamin C neutralizes free radicals while Niacinamide repairs lipids and evens tone.",
    recommendation: "Layer them together in the morning. Apply Vitamin C first, wait 2 minutes, then apply Niacinamide followed by SPF."
  },
  {
    actives: ["niacinamide", "retinol"],
    severity: "safe",
    message: "Perfect clinical pairing. Niacinamide strengthens skin lipids and calms the irritation commonly associated with Retinol.",
    recommendation: "Apply your Niacinamide serum first to soothe the skin barrier, followed by your Retinol cream in your PM routine."
  },
  {
    actives: ["hyaluronic_acid", "retinol"],
    severity: "safe",
    message: "Excellent hydration buffering. Hyaluronic Acid draws moisture into the skin cells to counter Retinol dryness.",
    recommendation: "Apply Hyaluronic Acid to damp skin, let it dry, and then layer your Retinol on top."
  },
  {
    actives: ["hyaluronic_acid", "salicylic_acid"],
    severity: "safe",
    message: "Restores hydration balance. BHA clears sebum while Hyaluronic Acid reintroduces critical moisture.",
    recommendation: "Use Hyaluronic Acid immediately after your Salicylic Acid treatment step to maintain skin comfort."
  },
  {
    actives: ["copper_peptides", "vitamin_c"],
    severity: "conflict",
    message: "Copper can oxidize and degrade Vitamin C, rendering both inactive.",
    recommendation: "Use Vitamin C in the morning and Copper Peptides at night, or alternate days."
  },
  {
    actives: ["copper_peptides", "glycolic_acid"],
    severity: "conflict",
    message: "Strong acids can hydrolyze and break down peptides, destroying their benefits.",
    recommendation: "Use AHAs on alternate nights to your Copper Peptide serums."
  },
  {
    actives: ["copper_peptides", "salicylic_acid"],
    severity: "conflict",
    message: "BHAs can degrade copper peptides due to low pH.",
    recommendation: "Separate these ingredients into morning and evening routines."
  },
  {
    actives: ["azelaic_acid", "salicylic_acid"],
    severity: "caution",
    message: "Layering multiple exfoliants increases the risk of barrier impairment and stinging.",
    recommendation: "Use them on alternate days, or one in the AM and one in the PM."
  },
  {
    actives: ["azelaic_acid", "glycolic_acid"],
    severity: "caution",
    message: "Combining AHAs and Azelaic Acid can be too harsh and sensitizing for most skin types.",
    recommendation: "Avoid layering. Alternate their usage on different nights."
  },
  {
    actives: ["bakuchiol", "retinol"],
    severity: "safe",
    message: "Highly synergistic. Bakuchiol stabilizes retinol and boosts its efficacy while providing soothing benefits.",
    recommendation: "Layer them together in your evening routine for maximum anti-aging results."
  },
  {
    actives: ["ceramides", "retinol"],
    severity: "safe",
    message: "Ceramides replenish the skin barrier, mitigating the dry, flaky side effects of retinol.",
    recommendation: "Apply a ceramide-rich moisturizer over your retinol every night."
  },
  {
    actives: ["centella", "glycolic_acid"],
    severity: "safe",
    message: "Centella Asiatica powerfully soothes the irritation and redness that AHAs can sometimes cause.",
    recommendation: "Follow your exfoliating step with a Centella serum or cream to keep skin calm."
  }
];

export default function ActiveIngredientChecker() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [analyzedRules, setAnalyzedRules] = useState<ConflictRule[]>([]);
  const [countryCode, setCountryCode] = useState<string>("IN");

  // Geolocation detection fallback (client-side timezone lookup)
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (tz !== "Asia/Kolkata" && tz !== "Asia/Calcutta") {
          setCountryCode("GB"); // Default to global simulated country code
        }
      } catch (e) {
        console.error("Timezone detection failed", e);
      }
    }
  }, []);

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // Run compatibility checks whenever selected actives change
  useEffect(() => {
    const rules: ConflictRule[] = [];
    for (let i = 0; i < selectedIds.length; i++) {
      for (let j = i + 1; j < selectedIds.length; j++) {
        const idA = selectedIds[i];
        const idB = selectedIds[j];
        const rule = CONFLICT_RULES.find(
          (r) =>
            (r.actives[0] === idA && r.actives[1] === idB) ||
            (r.actives[0] === idB && r.actives[1] === idA)
        );
        if (rule) {
          rules.push(rule);
        }
      }
    }
    setAnalyzedRules(rules);
  }, [selectedIds]);

  // Find products in PRODUCTS matching active ingredients keyword filters
  const getProductsForActive = (ingredientId: string) => {
    const active = INGREDIENTS.find((i) => i.id === ingredientId);
    if (!active) return [];

    return PRODUCTS.filter((p) => {
      const matchTag = p.tags?.some((t: string) =>
        active.tags.some((at) => t.toLowerCase().includes(at.toLowerCase()))
      );
      const matchName = active.tags.some((at) =>
        p.name?.toLowerCase().includes(at.toLowerCase())
      );
      const matchDesc = active.tags.some((at) =>
        p.description?.toLowerCase().includes(at.toLowerCase())
      );
      return matchTag || matchName || matchDesc;
    }).slice(0, 3); // Max 3 per ingredient to keep it clean
  };

  // Schedule logic: AM, PM or both
  const getScheduling = () => {
    const amList: string[] = [];
    const pmList: string[] = [];

    selectedIds.forEach((id) => {
      const active = INGREDIENTS.find((i) => i.id === id);
      if (!active) return;

      if (["vitamin_c", "azelaic_acid", "alpha_arbutin", "tranexamic_acid"].includes(id)) {
        amList.push(active.name);
      } else if (["retinol", "bakuchiol", "glycolic_acid", "lactic_acid", "mandelic_acid", "pha", "kojic_acid"].includes(id)) {
        pmList.push(active.name);
      } else if (id === "benzoyl_peroxide") {
        amList.push(`${active.name} (Spot)`);
      } else if (id === "salicylic_acid") {
        // If Retinol or AHA is used in PM, shift BHA to AM, else default BHA to PM
        if (selectedIds.includes("retinol") || selectedIds.some(s => ["glycolic_acid", "lactic_acid", "mandelic_acid"].includes(s))) {
          amList.push(active.name);
        } else {
          pmList.push(active.name);
        }
      } else if (["niacinamide", "hyaluronic_acid", "ceramides", "peptides", "copper_peptides", "panthenol", "squalane", "centella", "snail_mucin"].includes(id)) {
        amList.push(active.name);
        pmList.push(active.name);
      }
    });

    return { amList, pmList };
  };

  const { amList, pmList } = getScheduling();
  const conflictsCount = analyzedRules.filter((r) => r.severity === "conflict").length;
  const cautionsCount = analyzedRules.filter((r) => r.severity === "caution").length;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #FAF8F5 0%, #F5F1ED 100%)",
        fontFamily: "var(--font-dm-sans), sans-serif",
        padding: "4rem 20px 6rem",
      }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 820px) {
          .grid-container {
            display: flex !important;
            flex-direction: column !important;
            gap: 30px !important;
          }
          .sticky-report {
            position: static !important;
            z-index: 10 !important;
            width: 100% !important;
            box-sizing: border-box !important;
            max-height: none !important;
            overflow-y: visible !important;
            box-shadow: 0 10px 30px rgba(0,0,0,0.03) !important;
            border-radius: 16px !important;
          }
          .hero-title {
            font-size: 2.2rem !important;
          }
          .products-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}} />
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        
        {/* Header Breadcrumbs */}
        <div style={{ marginBottom: "2rem" }}>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "12px",
              color: "#888",
              textDecoration: "none",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              fontFamily: "var(--font-mono, monospace)",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#111")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#888")}
          >
            <ArrowLeft size={12} />
            Back to Hub
          </Link>
        </div>

        {/* Hero Section */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <span
            style={{
              fontSize: "10px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#9b7e6b",
              fontWeight: 600,
              display: "block",
              marginBottom: "12px",
              fontFamily: "var(--font-mono, monospace)",
            }}
          >
            Mirha & Co. Labs
          </span>
          <h1
            className="hero-title"
            style={{
              fontFamily: "var(--font-dm-serif), serif",
              fontSize: "2.8rem",
              color: "#111",
              margin: "0 0 16px",
              fontWeight: "normal",
              lineHeight: 1.2,
            }}
          >
            Ingredient Compatibility Checker
          </h1>
          <p
            style={{
              fontSize: "15px",
              color: "#666",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Layering actives is cosmetic science, not guesswork. Select the ingredients in your routine 
            to analyze chemical conflicts, discover synergies, and organize a safe AM/PM schedule.
          </p>

          <div style={{ marginTop: "24px", display: "inline-block", background: "#fcf9f7", border: "1px solid #efe5de", padding: "12px 24px", borderRadius: "30px", fontSize: "13px", color: "#8a6652", transition: "all 0.2s ease" }}>
            New to skincare? <Link href="/tools/routine" style={{ fontWeight: 600, color: "#7a5642", textDecoration: "underline", marginLeft: "4px" }}>Try our Beginner Routine Builder instead!</Link>
          </div>
        </div>

        {/* Grid Split: Left Actives, Right Report */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 380px",
            gap: "40px",
            alignItems: "start",
          }}
          className="grid-container"
        >
          
          {/* LEFT: Ingredients Selector */}
          <div>
            <h2
              style={{
                fontFamily: "var(--font-dm-serif), serif",
                fontSize: "1.6rem",
                color: "#111",
                marginBottom: "20px",
                fontWeight: "normal",
              }}
            >
              1. Choose your Active Ingredients
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
              {Array.from(new Set(INGREDIENTS.map(i => i.category))).map(category => (
                <div key={category}>
                  <h3 style={{
                    fontSize: "13px",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "#9b7e6b",
                    fontWeight: 600,
                    marginBottom: "16px",
                    fontFamily: "var(--font-mono, monospace)",
                    borderBottom: "1px solid #ede8e0",
                    paddingBottom: "8px"
                  }}>
                    {category}
                  </h3>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                    {INGREDIENTS.filter(i => i.category === category).map((item) => {
                      const isSelected = selectedIds.includes(item.id);
                      return (
                        <div
                          key={item.id}
                          onClick={() => toggleSelect(item.id)}
                          title={item.description}
                          style={{
                            background: isSelected ? "#9b7e6b" : "rgba(255,255,255,0.7)",
                            color: isSelected ? "#fff" : "#333",
                            border: isSelected ? "1px solid #9b7e6b" : "1px solid #e2ddd7",
                            borderRadius: "30px",
                            padding: "10px 18px",
                            fontSize: "13px",
                            fontWeight: 500,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            transition: "all 0.2s ease",
                            boxShadow: isSelected ? "0 4px 12px rgba(155, 126, 107, 0.2)" : "0 2px 4px rgba(0,0,0,0.02)",
                          }}
                          onMouseEnter={(e) => {
                            if (!isSelected) {
                              e.currentTarget.style.borderColor = "#c4b9b0";
                              e.currentTarget.style.background = "#fff";
                              e.currentTarget.style.transform = "translateY(-1px)";
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!isSelected) {
                              e.currentTarget.style.borderColor = "#e2ddd7";
                              e.currentTarget.style.background = "rgba(255,255,255,0.7)";
                              e.currentTarget.style.transform = "translateY(0)";
                            }
                          }}
                        >
                          {item.name}
                          {isSelected && <Check size={14} color="#fff" />}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Dynamic Compatibility Analyzer Report */}
          <div
            className="sticky-report"
            style={{
              position: "sticky",
              top: "40px",
              background: "#fff",
              border: "1px solid #ede8e0",
              borderRadius: "16px",
              padding: "28px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.03)",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-dm-serif), serif",
                fontSize: "1.4rem",
                color: "#111",
                margin: "0 0 16px",
                fontWeight: "normal",
              }}
            >
              Routine Analysis
            </h2>

            {selectedIds.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "40px 20px",
                  color: "#999",
                  border: "1px dashed #e8e3d9",
                  borderRadius: "12px",
                  background: "#faf8f5",
                }}
              >
                <HelpCircle size={32} style={{ color: "#ccc", marginBottom: "12px" }} />
                <p style={{ fontSize: "13px", margin: 0, lineHeight: 1.5 }}>
                  Select two or more active ingredients on the left to analyze chemical safety and conflicts.
                </p>
              </div>
            ) : (
              <div>
                
                {/* Summary Badges */}
                <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
                  <div
                    style={{
                      flex: 1,
                      textAlign: "center",
                      padding: "10px",
                      borderRadius: "8px",
                      background: conflictsCount > 0 ? "#fff5f5" : "#f4fce3",
                      border: conflictsCount > 0 ? "1px solid #ffd8d8" : "1px solid #d8f5a2",
                    }}
                  >
                    <p style={{ fontSize: "10px", textTransform: "uppercase", color: "#888", margin: "0 0 4px" }}>
                      Conflicts
                    </p>
                    <p
                      style={{
                        fontSize: "20px",
                        fontWeight: "bold",
                        margin: 0,
                        color: conflictsCount > 0 ? "#c92a2a" : "#37b24d",
                      }}
                    >
                      {conflictsCount}
                    </p>
                  </div>

                  <div
                    style={{
                      flex: 1,
                      textAlign: "center",
                      padding: "10px",
                      borderRadius: "8px",
                      background: cautionsCount > 0 ? "#fff9db" : "#faf8f5",
                      border: cautionsCount > 0 ? "1px solid #ffe066" : "1px solid #ede8e0",
                    }}
                  >
                    <p style={{ fontSize: "10px", textTransform: "uppercase", color: "#888", margin: "0 0 4px" }}>
                      Cautions
                    </p>
                    <p
                      style={{
                        fontSize: "20px",
                        fontWeight: "bold",
                        margin: 0,
                        color: cautionsCount > 0 ? "#e67700" : "#666",
                      }}
                    >
                      {cautionsCount}
                    </p>
                  </div>
                </div>

                {/* Compatibility Rules list */}
                {analyzedRules.length > 0 && (
                  <div style={{ marginBottom: "24px" }}>
                    <p
                      style={{
                        fontSize: "10px",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: "#bbb",
                        margin: "0 0 12px",
                        fontFamily: "var(--font-mono, monospace)",
                      }}
                    >
                      Compatibility Rules
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      {analyzedRules.map((rule, idx) => {
                        const isConflict = rule.severity === "conflict";
                        const isCaution = rule.severity === "caution";
                        return (
                          <div
                            key={idx}
                            style={{
                              padding: "14px",
                              borderRadius: "8px",
                              background: isConflict ? "#fff5f5" : isCaution ? "#fff9db" : "#f4fce3",
                              border: isConflict
                                ? "1px solid #ffd8d8"
                                : isCaution
                                ? "1px solid #ffe066"
                                : "1px solid #d8f5a2",
                            }}
                          >
                            <div style={{ display: "flex", gap: "8px", alignItems: "flex-start", marginBottom: "6px" }}>
                              {isConflict ? (
                                <AlertOctagon size={16} color="#c92a2a" style={{ flexShrink: 0, marginTop: "2px" }} />
                              ) : isCaution ? (
                                <AlertTriangle size={16} color="#e67700" style={{ flexShrink: 0, marginTop: "2px" }} />
                              ) : (
                                <Check size={16} color="#37b24d" style={{ flexShrink: 0, marginTop: "2px" }} />
                              )}
                              <p
                                style={{
                                  fontSize: "12px",
                                  fontWeight: 600,
                                  color: isConflict ? "#c92a2a" : isCaution ? "#e67700" : "#2b8a3e",
                                  margin: 0,
                                }}
                              >
                                {INGREDIENTS.find((i) => i.id === rule.actives[0])?.name} +{" "}
                                {INGREDIENTS.find((i) => i.id === rule.actives[1])?.name}
                              </p>
                            </div>
                            <p style={{ fontSize: "11px", color: "#555", margin: "0 0 6px", lineHeight: 1.4 }}>
                              {rule.message}
                            </p>
                            <p style={{ fontSize: "11px", fontWeight: 500, color: "#222", margin: 0, lineHeight: 1.4 }}>
                              <strong>Tip:</strong> {rule.recommendation}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* AM/PM Sequencing Timeline */}
                <div style={{ marginBottom: "24px" }}>
                  <p
                    style={{
                      fontSize: "10px",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "#bbb",
                      margin: "0 0 12px",
                      fontFamily: "var(--font-mono, monospace)",
                    }}
                  >
                    Suggested AM/PM Schedule
                  </p>
                  
                  {/* AM */}
                  <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
                    <div
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "50%",
                        background: "#fff9db",
                        border: "1px solid #ffe066",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Sun size={14} color="#e67700" />
                    </div>
                    <div>
                      <p style={{ fontSize: "12px", fontWeight: 600, color: "#111", margin: "0 0 4px" }}>
                        Morning Routine (AM)
                      </p>
                      {amList.length === 0 ? (
                        <p style={{ fontSize: "11px", color: "#999", margin: 0 }}>Gentle cleanser + Hydrator + SPF</p>
                      ) : (
                        <p style={{ fontSize: "11px", color: "#555", margin: 0, lineHeight: 1.4 }}>
                          {amList.join(" → ")}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* PM */}
                  <div style={{ display: "flex", gap: "12px" }}>
                    <div
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "50%",
                        background: "#eef2ff",
                        border: "1px solid #c7d2fe",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Moon size={14} color="#4f46e5" />
                    </div>
                    <div>
                      <p style={{ fontSize: "12px", fontWeight: 600, color: "#111", margin: "0 0 4px" }}>
                        Evening Routine (PM)
                      </p>
                      {pmList.length === 0 ? (
                        <p style={{ fontSize: "11px", color: "#999", margin: 0 }}>Cleanser + Moisturiser</p>
                      ) : (
                        <p style={{ fontSize: "11px", color: "#555", margin: 0, lineHeight: 1.4 }}>
                          {pmList.join(" → ")}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    padding: "12px 16px",
                    background: "#fff9db",
                    borderLeft: "4px solid #f59f00",
                    borderRadius: "4px",
                    fontSize: "11px",
                    color: "#666",
                    lineHeight: 1.5,
                  }}
                >
                  <strong>Sun Protection Warning:</strong> Using active acids (AHAs/BHAs) or Retinoids increases your skin's sun sensitivity. Daily application of SPF 50 sunscreen is non-negotiable regardless of your climate or location.
                </div>

              </div>
            )}
          </div>

        </div>

        {/* SECTION 3: Dynamic Recommended Products */}
        {selectedIds.length > 0 && (
          <div style={{ marginTop: "5rem", paddingTop: "3rem", borderTop: "1px solid #ede8e0" }}>
            <h2
              style={{
                fontFamily: "var(--font-dm-serif), serif",
                fontSize: "1.8rem",
                color: "#111",
                marginBottom: "24px",
                fontWeight: "normal",
              }}
            >
              Recommended Products for Selected Actives
            </h2>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
              {selectedIds.map((id) => {
                const active = INGREDIENTS.find((i) => i.id === id);
                const matchingProducts = getProductsForActive(id);
                if (!active || matchingProducts.length === 0) return null;

                return (
                  <div key={id}>
                    <p
                      style={{
                        fontSize: "11px",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: "#9b7e6b",
                        fontWeight: 600,
                        marginBottom: "12px",
                        fontFamily: "var(--font-mono, monospace)",
                      }}
                    >
                      {active.name} matches
                    </p>
                    
                    <div 
                      className="products-grid"
                      style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "16px" }}
                    >
                      {matchingProducts.map((product) => {
                        const affiliateUrl = getProductAffiliateUrl(product, countryCode);
                        const isCultBeauty = affiliateUrl.includes("cultbeauty");
                        return (
                          <a
                            key={product.id}
                            href={affiliateUrl}
                            target="_blank"
                            rel="noopener noreferrer sponsored"
                            style={{
                              display: "flex",
                              gap: "16px",
                              background: "#fff",
                              border: "1px solid #ede8e0",
                              borderRadius: "12px",
                              padding: "16px",
                              textDecoration: "none",
                              color: "inherit",
                              transition: "all 0.25s",
                              boxShadow: "0 2px 8px rgba(0,0,0,0.01)",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.borderColor = "#c4b9b0";
                              e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.04)";
                              e.currentTarget.style.transform = "translateY(-1px)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.borderColor = "#ede8e0";
                              e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.01)";
                              e.currentTarget.style.transform = "translateY(0)";
                            }}
                          >
                            {/* Product Image */}
                            <div
                              style={{
                                width: "70px",
                                height: "70px",
                                flexShrink: 0,
                                background: "#fff",
                                borderRadius: "8px",
                                overflow: "hidden",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                border: "1px solid #f0ebe3",
                              }}
                            >
                              <img
                                src={product.image}
                                alt={product.name}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "contain",
                                  padding: "4px",
                                }}
                              />
                            </div>

                            {/* Product Info */}
                            <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                              <div>
                                <p style={{ fontSize: "10px", color: "#999", margin: "0 0 2px", textTransform: "uppercase" }}>
                                  {product.brand}
                                </p>
                                <h4
                                  style={{
                                    fontSize: "12px",
                                    color: "#111",
                                    margin: 0,
                                    fontWeight: 600,
                                    lineHeight: 1.3,
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  {product.name}
                                </h4>
                              </div>

                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "8px" }}>
                                {isCultBeauty ? (
                                  <span style={{ fontSize: "11px", color: "#9b7e6b" }}>
                                    Shop on Cult Beauty
                                  </span>
                                ) : (
                                  <span style={{ fontSize: "12px", color: "#111", fontWeight: 600 }}>
                                    ₹{product.price.toLocaleString("en-IN")}
                                  </span>
                                )}
                                
                                <span style={{ fontSize: "10px", color: "#888", display: "inline-flex", alignItems: "center", gap: "2px" }}>
                                  {isCultBeauty ? "Shop Global" : "View"} <ArrowRight size={10} />
                                </span>
                              </div>
                            </div>

                          </a>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
