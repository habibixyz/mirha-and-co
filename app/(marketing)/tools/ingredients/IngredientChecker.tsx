"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, Check, AlertTriangle, AlertOctagon, HelpCircle, ArrowRight, Sun, Moon, Search, X, Trash2, Star } from "lucide-react";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [analyzedRules, setAnalyzedRules] = useState<ConflictRule[]>([]);
  const [countryCode, setCountryCode] = useState<string>("IN");

  // Geolocation detection fallback (client-side timezone lookup)
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (tz !== "Asia/Kolkata" && tz !== "Asia/Calcutta") {
          setCountryCode("GB");
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

  const removeSelected = (id: string) => {
    setSelectedIds(selectedIds.filter((item) => item !== id));
  };

  const clearAll = () => {
    setSelectedIds([]);
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

  // Filtered ingredients based on search query
  const filteredIngredients = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return INGREDIENTS;
    return INGREDIENTS.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.skinTypeFit.toLowerCase().includes(query)
    );
  }, [searchQuery]);

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
    }).slice(0, 3);
  };

  // Schedule logic: AM/PM step timeline with thinnest-to-thickest ordering rules
  const getVisualSchedule = () => {
    const amSteps: { name: string; type: "active" | "base"; desc?: string }[] = [
      { name: "Gentle Cleanser", type: "base", desc: "Prep skin surface" }
    ];
    const pmSteps: { name: string; type: "active" | "base"; desc?: string }[] = [
      { name: "Double Cleanse", type: "base", desc: "Remove impurities & makeup" }
    ];

    // Priority ordering for AM active serums
    const amOrder = ["vitamin_c", "salicylic_acid", "azelaic_acid", "alpha_arbutin", "tranexamic_acid", "niacinamide", "hyaluronic_acid", "panthenol", "centella", "snail_mucin", "peptides", "copper_peptides", "benzoyl_peroxide"];
    
    // Priority ordering for PM active treatments
    const pmOrder = ["glycolic_acid", "lactic_acid", "mandelic_acid", "pha", "retinol", "bakuchiol", "kojic_acid", "tranexamic_acid", "niacinamide", "hyaluronic_acid", "panthenol", "centella", "snail_mucin", "peptides", "copper_peptides"];

    // Populate AM
    const selectedAMIds = selectedIds.filter(id => 
      ["vitamin_c", "azelaic_acid", "alpha_arbutin", "tranexamic_acid", "benzoyl_peroxide", "niacinamide", "hyaluronic_acid", "ceramides", "peptides", "copper_peptides", "panthenol", "squalane", "centella", "snail_mucin"].includes(id) ||
      (id === "salicylic_acid" && (selectedIds.includes("retinol") || selectedIds.some(s => ["glycolic_acid", "lactic_acid", "mandelic_acid"].includes(s))))
    );
    
    selectedAMIds.sort((a, b) => amOrder.indexOf(a) - amOrder.indexOf(b));
    selectedAMIds.forEach(id => {
      const active = INGREDIENTS.find(i => i.id === id);
      if (active) {
        let note = "Apply onto dry skin";
        if (id === "hyaluronic_acid" || id === "snail_mucin") note = "Apply onto damp skin";
        if (id === "benzoyl_peroxide") note = "Apply as a spot treatment";
        amSteps.push({ name: active.name, type: "active", desc: note });
      }
    });

    // Populate PM
    const selectedPMIds = selectedIds.filter(id => 
      ["retinol", "bakuchiol", "glycolic_acid", "lactic_acid", "mandelic_acid", "pha", "kojic_acid", "niacinamide", "hyaluronic_acid", "ceramides", "peptides", "copper_peptides", "panthenol", "squalane", "centella", "snail_mucin", "tranexamic_acid"].includes(id) ||
      (id === "salicylic_acid" && !selectedIds.includes("retinol") && !selectedIds.some(s => ["glycolic_acid", "lactic_acid", "mandelic_acid"].includes(s)))
    );

    selectedPMIds.sort((a, b) => pmOrder.indexOf(a) - pmOrder.indexOf(b));
    selectedPMIds.forEach(id => {
      const active = INGREDIENTS.find(i => i.id === id);
      if (active) {
        let note = "Apply onto dry skin";
        if (id === "hyaluronic_acid" || id === "snail_mucin") note = "Apply onto damp skin";
        if (id === "retinol") note = "Apply onto clean, dry skin. Wait 10 mins";
        pmSteps.push({ name: active.name, type: "active", desc: note });
      }
    });

    // End locks
    amSteps.push({ name: "SPF 50 Sunscreen", type: "base", desc: "Essential daytime barrier protection" });
    pmSteps.push({ name: "Barrier Moisturizer", type: "base", desc: "Seal hydration & repair lipids" });

    return { amSteps, pmSteps };
  };

  const { amSteps, pmSteps } = getVisualSchedule();
  const conflictsCount = analyzedRules.filter((r) => r.severity === "conflict").length;
  const cautionsCount = analyzedRules.filter((r) => r.severity === "caution").length;

  return (
    <div className="ingredient-checker-page">
      <style dangerouslySetInnerHTML={{__html: `
        .ingredient-checker-page {
          min-height: 100vh;
          background: #fbf7f1;
          color: #161412;
          font-family: 'DM Sans', sans-serif;
          padding: 48px 20px 120px;
        }
        .shell {
          max-width: 1160px;
          margin: 0 auto;
        }
        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #756b63;
          font-size: 0.85rem;
          margin-bottom: 30px;
          text-decoration: none;
          font-weight: 500;
        }
        .back-link:hover {
          color: #fc2779;
        }
        .header {
          margin-bottom: 48px;
          text-align: center;
        }
        .header h1 {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(36px, 5vw, 56px);
          font-weight: 400;
          line-height: 1.1;
          margin-bottom: 14px;
          letter-spacing: -0.02em;
        }
        .header p {
          color: #756b63;
          font-size: 1.05rem;
          max-width: 580px;
          margin: 0 auto;
          line-height: 1.65;
        }
        .header-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(252, 39, 121, 0.08);
          color: #fc2779;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 6px 14px;
          border-radius: 99px;
          margin-bottom: 20px;
        }
        .grid-layout {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 28px;
          align-items: start;
        }
        @media (max-width: 960px) {
          .grid-layout {
            grid-template-columns: 1fr;
          }
          .sticky-sidebar {
            position: static !important;
            width: 100% !important;
          }
        }
        .search-container {
          margin-bottom: 20px;
          position: relative;
        }
        .search-input {
          width: 100%;
          padding: 14px 44px 14px 44px;
          border: 1.5px solid #ede5dc;
          border-radius: 14px;
          background: #fff;
          color: #161412;
          font-size: 0.95rem;
          font-family: inherit;
          outline: none;
          transition: all 0.2s ease;
        }
        .search-input:focus {
          border-color: #fc2779;
          box-shadow: 0 4px 12px rgba(252, 39, 121, 0.05);
        }
        .search-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: #8c8179;
          pointer-events: none;
        }
        .clear-search-btn {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #8c8179;
          cursor: pointer;
          font-size: 0.85rem;
          padding: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .clear-search-btn:hover {
          color: #fc2779;
        }
        .selected-shelf {
          background: #f6efe6;
          border: 1px solid #ede5dc;
          border-radius: 16px;
          padding: 16px;
          margin-bottom: 24px;
        }
        .shelf-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #756b63;
        }
        .shelf-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .shelf-tag {
          background: #fff;
          border: 1px solid #fc2779;
          color: #fc2779;
          border-radius: 99px;
          padding: 6px 12px;
          font-size: 0.82rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .shelf-tag:hover {
          background: #fff5f8;
          transform: scale(0.98);
        }
        .clear-shelf-btn {
          background: none;
          border: none;
          color: #756b63;
          cursor: pointer;
          font-size: 0.72rem;
          text-decoration: underline;
          font-weight: 700;
        }
        .clear-shelf-btn:hover {
          color: #fc2779;
        }
        .category-block {
          margin-bottom: 28px;
        }
        .category-title {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #8c8179;
          margin-bottom: 12px;
          padding-bottom: 8px;
          border-bottom: 1px solid #ede5dc;
        }
        .pills-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .ingredient-pill {
          background: #fff;
          border: 1.5px solid #ede5dc;
          color: #161412;
          padding: 8px 16px;
          border-radius: 99px;
          font-size: 0.85rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.15s ease;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .ingredient-pill:hover {
          border-color: #fc2779;
          transform: translateY(-1px);
        }
        .ingredient-pill.selected {
          background: #fc2779;
          border-color: #fc2779;
          color: #fff;
          box-shadow: 0 4px 12px rgba(252, 39, 121, 0.15);
        }
        .sticky-sidebar {
          background: #fff;
          border: 1.5px solid #ede5dc;
          border-radius: 24px;
          padding: 24px;
          box-shadow: 0 16px 48px rgba(38, 28, 20, 0.05);
          position: sticky;
          top: 100px;
        }
        .report-header {
          border-bottom: 1px solid #f6f4f2;
          padding-bottom: 16px;
          margin-bottom: 16px;
        }
        .badge-row {
          display: flex;
          gap: 10px;
          margin-bottom: 18px;
        }
        .stat-badge {
          flex: 1;
          text-align: center;
          padding: 8px;
          border-radius: 10px;
          font-size: 0.75rem;
          font-weight: 700;
        }
        .stat-badge.alert {
          background: #fff5f5;
          border: 1px solid #ffd8d8;
          color: #c92a2a;
        }
        .stat-badge.caution {
          background: #fff9db;
          border: 1px solid #ffe066;
          color: #e67700;
        }
        .stat-badge.safe {
          background: #f4fce3;
          border: 1px solid #d8f5a2;
          color: #2d8a5c;
        }
        .report-section-title {
          font-size: 0.7rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-weight: 700;
          color: #8c8179;
          margin-bottom: 10px;
          border-bottom: 1px solid #f6f4f2;
          padding-bottom: 6px;
        }
        .visual-rule-card {
          padding: 12px;
          border-radius: 12px;
          margin-bottom: 10px;
          font-size: 0.8rem;
          line-height: 1.45;
        }
        .visual-rule-card.conflict {
          background: #fff5f5;
          border: 1px solid #ffd8d8;
        }
        .visual-rule-card.caution {
          background: #fff9db;
          border: 1px solid #ffe066;
        }
        .visual-rule-card.safe {
          background: #f4fce3;
          border: 1px solid #d8f5a2;
        }
        .visual-timeline {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 18px;
        }
        .timeline-step {
          display: flex;
          align-items: center;
          gap: 12px;
          background: #fbf7f1;
          border: 1px solid #ede5dc;
          border-radius: 12px;
          padding: 8px 12px;
          position: relative;
        }
        .timeline-step.active-step {
          border-color: #fc2779;
          background: #fffaf8;
        }
        .step-num {
          font-size: 0.72rem;
          font-weight: 700;
          color: #756b63;
          background: rgba(117,107,99,0.1);
          width: 20px;
          height: 20px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .timeline-step.active-step .step-num {
          background: #fc2779;
          color: #fff;
        }
        .step-details {
          min-width: 0;
        }
        .step-name {
          font-weight: 600;
          font-size: 0.82rem;
          color: #161412;
        }
        .step-desc {
          font-size: 0.7rem;
          color: #756b63;
          margin-top: 1px;
        }

        /* ── Product Picks & Empty States */
        .product-card {
          display: flex;
          gap: 16px;
          background: #fff;
          border: 1px solid #ede8e0;
          border-radius: 12px;
          padding: 16px;
          text-decoration: none;
          color: inherit;
          transition: all 0.25s;
          box-shadow: 0 2px 8px rgba(0,0,0,0.01);
        }
        .product-card:hover {
          border-color: #fc2779;
          box-shadow: 0 8px 24px rgba(252, 39, 121, 0.05);
          transform: translateY(-1px);
        }
        .product-img-wrap {
          width: 70px;
          height: 70px;
          flex-shrink: 0;
          background: #fff;
          border-radius: 8px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #f0ebe3;
        }
        .product-card-name {
          font-size: 0.82rem;
          color: #161412;
          margin: 0;
          font-weight: 600;
          line-height: 1.3;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .product-card-price {
          font-size: 0.85rem;
          color: #161412;
          font-weight: 700;
        }
        .picks-container {
          margin-top: 5rem;
          padding-top: 3rem;
          border-top: 1px solid #ede5dc;
        }
        .picks-title {
          font-family: 'DM Serif Display', serif;
          font-size: 1.8rem;
          font-weight: 400;
          color: #161412;
          margin-bottom: 24px;
        }
        .empty-search-state {
          text-align: center;
          padding: 48px 24px;
          color: #8c8179;
          background: #fff;
          border: 1.5px dashed #ede5dc;
          border-radius: 18px;
        }
        .empty-search-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: #161412;
          margin-bottom: 4px;
        }
        .sun-warning-box {
          margin-top: 20px;
          padding: 12px;
          background: #fff9db;
          border-left: 4px solid #f59f00;
          border-radius: 6px;
          font-size: 0.72rem;
          color: #666;
          line-height: 1.45;
        }

        /* ── Dark Mode Overrides */
        html.dark .ingredient-checker-page, .dark .ingredient-checker-page {
          background: #0f0e0d;
          color: #f7f5f2;
        }
        html.dark .header p, .dark .header p {
          color: #aba49d;
        }
        html.dark .search-input, .dark .search-input {
          background: #181716;
          border-color: rgba(255, 255, 255, 0.12);
          color: #f7f5f2;
        }
        html.dark .search-input:focus, .dark .search-input:focus {
          border-color: #fc2779;
          box-shadow: 0 4px 12px rgba(252, 39, 121, 0.1);
        }
        html.dark .selected-shelf, .dark .selected-shelf {
          background: #1e1c1a;
          border-color: rgba(255, 255, 255, 0.12);
        }
        html.dark .shelf-header, .dark .shelf-header {
          color: #aba49d;
        }
        html.dark .shelf-tag, .dark .shelf-tag {
          background: #181716;
          border-color: #fc2779;
          color: #fc2779;
        }
        html.dark .shelf-tag:hover, .dark .shelf-tag:hover {
          background: rgba(252, 39, 121, 0.1);
        }
        html.dark .clear-shelf-btn, .dark .clear-shelf-btn {
          color: #aba49d;
        }
        html.dark .clear-shelf-btn:hover, .dark .clear-shelf-btn:hover {
          color: #fc2779;
        }
        html.dark .category-title, .dark .category-title {
          border-color: rgba(255, 255, 255, 0.12);
          color: #aba49d;
        }
        html.dark .ingredient-pill, .dark .ingredient-pill {
          background: #181716;
          border-color: rgba(255, 255, 255, 0.12);
          color: #f7f5f2;
        }
        html.dark .ingredient-pill:hover, .dark .ingredient-pill:hover {
          border-color: #fc2779;
        }
        html.dark .ingredient-pill.selected, .dark .ingredient-pill.selected {
          background: #fc2779;
          border-color: #fc2779;
          color: #fff;
        }
        html.dark .sticky-sidebar, .dark .sticky-sidebar {
          background: #181716;
          border-color: rgba(255, 255, 255, 0.12);
          box-shadow: 0 16px 48px rgba(0, 0, 0, 0.2);
        }
        html.dark .report-header, .dark .report-header {
          border-color: rgba(255, 255, 255, 0.08);
        }
        html.dark .report-section-title, .dark .report-section-title {
          color: #aba49d;
          border-color: rgba(255, 255, 255, 0.08);
        }
        html.dark .stat-badge.alert, .dark .stat-badge.alert {
          background: rgba(201, 42, 42, 0.15);
          border-color: rgba(201, 42, 42, 0.3);
          color: #ff8787;
        }
        html.dark .stat-badge.caution, .dark .stat-badge.caution {
          background: rgba(230, 119, 0, 0.15);
          border-color: rgba(230, 119, 0, 0.3);
          color: #ffd43b;
        }
        html.dark .stat-badge.safe, .dark .stat-badge.safe {
          background: rgba(45, 138, 92, 0.15);
          border-color: rgba(45, 138, 92, 0.3);
          color: #8ce99a;
        }
        html.dark .visual-rule-card.conflict, .dark .visual-rule-card.conflict {
          background: rgba(201, 42, 42, 0.1);
          border-color: rgba(201, 42, 42, 0.25);
          color: #ff8787;
        }
        html.dark .visual-rule-card.caution, .dark .visual-rule-card.caution {
          background: rgba(230, 119, 0, 0.1);
          border-color: rgba(230, 119, 0, 0.25);
          color: #ffd43b;
        }
        html.dark .visual-rule-card.safe, .dark .visual-rule-card.safe {
          background: rgba(45, 138, 92, 0.15);
          border-color: rgba(45, 138, 92, 0.25);
          color: #8ce99a;
        }
        html.dark .timeline-step, .dark .timeline-step {
          background: #1e1c1a;
          border-color: rgba(255, 255, 255, 0.12);
        }
        html.dark .timeline-step.active-step, .dark .timeline-step.active-step {
          border-color: #fc2779;
          background: rgba(252, 39, 121, 0.05);
        }
        html.dark .step-name, .dark .step-name {
          color: #ffffff;
        }
        html.dark .step-desc, .dark .step-desc {
          color: #aba49d;
        }
        html.dark .step-num, .dark .step-num {
          color: #aba49d;
          background: rgba(255, 255, 255, 0.08);
        }
        html.dark .product-card, .dark .product-card {
          background: #181716;
          border-color: rgba(255, 255, 255, 0.12);
        }
        html.dark .product-card:hover, .dark .product-card:hover {
          border-color: #fc2779;
          box-shadow: 0 8px 24px rgba(252, 39, 121, 0.1);
        }
        html.dark .product-img-wrap, .dark .product-img-wrap {
          background: #1e1c1a;
          border-color: rgba(255, 255, 255, 0.08);
        }
        html.dark .product-card-name, .dark .product-card-name {
          color: #ffffff;
        }
        html.dark .product-card-price, .dark .product-card-price {
          color: #ffffff;
        }
        html.dark .picks-container, .dark .picks-container {
          border-color: rgba(255, 255, 255, 0.12);
        }
        html.dark .picks-title, .dark .picks-title {
          color: #ffffff;
        }
        html.dark .empty-search-state, .dark .empty-search-state {
          background: #181716;
          border-color: rgba(255, 255, 255, 0.12);
          color: #aba49d;
        }
        html.dark .empty-search-title, .dark .empty-search-title {
          color: #ffffff;
        }
        html.dark .sun-warning-box, .dark .sun-warning-box {
          background: rgba(245, 159, 0, 0.15);
          color: #ffe066;
        }
      `}} />

      <div className="shell">
        <Link href="/" className="back-link">
          <ArrowLeft size={16} /> Back to Shop
        </Link>

        {/* Hero header */}
        <div className="header">
          <div className="header-badge">
            <Star size={12} /> Science-Backed Layering Rules
          </div>
          <h1>Ingredient Compatibility Checker</h1>
          <p>
            Avoid skin barrier damage. Select the active ingredients in your daily skincare routine to analyze chemical conflicts, discover synergies, and organize a safe AM/PM schedule.
          </p>
        </div>

        {/* Layout grid */}
        <div className="grid-layout">
          <div>
            {/* Search inputs */}
            <div className="search-container">
              <Search className="search-icon" size={18} />
              <input
                type="text"
                className="search-input"
                placeholder="Search ingredients (e.g. Retinol, Niacinamide, Vitamin C)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  type="button"
                  className="clear-search-btn"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Selected Actives Summary shelf */}
            {selectedIds.length > 0 && (
              <div className="selected-shelf">
                <div className="shelf-header">
                  <span>Selected Actives ({selectedIds.length})</span>
                  <button type="button" className="clear-shelf-btn" onClick={clearAll}>
                    Clear All
                  </button>
                </div>
                <div className="shelf-tags">
                  {selectedIds.map(id => {
                    const active = INGREDIENTS.find(i => i.id === id);
                    if (!active) return null;
                    return (
                      <button
                        key={id}
                        type="button"
                        className="shelf-tag"
                        onClick={() => removeSelected(id)}
                        title="Remove ingredient"
                      >
                        {active.name}
                        <X size={12} />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* List of Ingredients */}
            {filteredIngredients.length > 0 ? (
              <div>
                {Array.from(new Set(filteredIngredients.map(i => i.category))).map(category => (
                  <div key={category} className="category-block">
                    <h3 className="category-title">{category}</h3>
                    <div className="pills-grid">
                      {filteredIngredients.filter(i => i.category === category).map((item) => {
                        const isSelected = selectedIds.includes(item.id);
                        return (
                          <button
                            key={item.id}
                            type="button"
                            className={`ingredient-pill ${isSelected ? "selected" : ""}`}
                            onClick={() => toggleSelect(item.id)}
                            title={item.description}
                          >
                            {item.name}
                            {isSelected ? <Check size={14} /> : null}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-search-state">
                <AlertTriangle size={32} style={{ margin: "0 auto 12px", opacity: 0.5 }} />
                <h4 className="empty-search-title">No Actives Found</h4>
                <p style={{ fontSize: "0.9rem", margin: "0 0 16px" }}>We couldn't find any skincare ingredients matching "{searchQuery}".</p>
                <button
                  type="button"
                  className="next-btn"
                  style={{ padding: "8px 16px", fontSize: "0.85rem", background: "#fc2779", color: "#fff", margin: "0 auto" }}
                  onClick={() => setSearchQuery("")}
                >
                  Clear Search Filter
                </button>
              </div>
            )}
          </div>

          {/* Sticky sidebar */}
          <div>
            <div className="sticky-sidebar">
              <div className="report-header">
                <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.35rem", margin: "0 0 4px" }}>Routine Report</h3>
                <p style={{ fontSize: "0.8rem", color: "#8c8179", margin: 0 }}>Instant compatibility analysis</p>
              </div>

              {selectedIds.length === 0 ? (
                <div style={{ textAlign: "center", padding: "36px 0", color: "#8c8179" }}>
                  <HelpCircle size={36} style={{ margin: "0 auto 12px", opacity: 0.5 }} />
                  <p style={{ fontSize: "0.85rem", margin: 0, lineHeight: 1.5 }}>
                    Select two or more active ingredients on the left to check for conflicts and structure a safe routine.
                  </p>
                </div>
              ) : (
                <div>
                  {/* Badges overview */}
                  <div className="badge-row">
                    <div className={`stat-badge ${conflictsCount > 0 ? "alert" : "safe"}`}>
                      <div>Conflicts</div>
                      <div style={{ fontSize: "1.35rem", marginTop: "2px" }}>{conflictsCount}</div>
                    </div>
                    <div className={`stat-badge ${cautionsCount > 0 ? "caution" : "safe"}`}>
                      <div>Cautions</div>
                      <div style={{ fontSize: "1.35rem", marginTop: "2px" }}>{cautionsCount}</div>
                    </div>
                  </div>

                  {/* Compatibility Rules feedback */}
                  {analyzedRules.length > 0 ? (
                    <div>
                      <div className="report-section-title">Active Conflicts &amp; Cautions</div>
                      {analyzedRules.map((rule, idx) => {
                        const isConflict = rule.severity === "conflict";
                        const isCaution = rule.severity === "caution";
                        const severityClass = isConflict ? "conflict" : isCaution ? "caution" : "safe";
                        
                        return (
                          <div key={idx} className={`visual-rule-card ${severityClass}`}>
                            <div style={{ display: "flex", gap: "6px", alignItems: "center", fontWeight: 700, marginBottom: "4px" }}>
                              {isConflict ? <AlertOctagon size={14} /> : <AlertTriangle size={14} />}
                              <span>
                                {INGREDIENTS.find(i => i.id === rule.actives[0])?.name} + {INGREDIENTS.find(i => i.id === rule.actives[1])?.name}
                              </span>
                            </div>
                            <p style={{ margin: "0 0 6px", fontSize: "0.78rem" }}>{rule.message}</p>
                            <p style={{ margin: 0, fontSize: "0.78rem", fontWeight: 600 }}>
                              <strong>Tip:</strong> {rule.recommendation}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div style={{ background: "rgba(45, 138, 92, 0.08)", border: "1px solid #d8f5a2", padding: "12px", borderRadius: "12px", color: "#2b8a3e", fontSize: "0.8rem", display: "flex", gap: "8px", alignItems: "center", marginBottom: "20px" }}>
                      <Check size={16} />
                      <span style={{ fontWeight: 600 }}>All selected actives are safe to layer together!</span>
                    </div>
                  )}

                  {/* Visual Step timelines */}
                  <div className="report-section-title" style={{ marginTop: "24px" }}>AM/PM Application Timeline</div>
                  
                  {/* AM Schedule */}
                  <div style={{ marginBottom: "16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.8rem", fontWeight: 700, color: "#e67700", marginBottom: "8px" }}>
                      <Sun size={14} /> Morning Routine (AM)
                    </div>
                    <div className="visual-timeline">
                      {amSteps.map((step, idx) => (
                        <div key={idx} className={`timeline-step ${step.type === "active" ? "active-step" : ""}`}>
                          <div className="step-num">{idx + 1}</div>
                          <div className="step-details">
                            <div className="step-name">{step.name}</div>
                            {step.desc && <div className="step-desc">{step.desc}</div>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* PM Schedule */}
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.8rem", fontWeight: 700, color: "#4f46e5", marginBottom: "8px" }}>
                      <Moon size={14} /> Evening Routine (PM)
                    </div>
                    <div className="visual-timeline">
                      {pmSteps.map((step, idx) => (
                        <div key={idx} className={`timeline-step ${step.type === "active" ? "active-step" : ""}`}>
                          <div className="step-num">{idx + 1}</div>
                          <div className="step-details">
                            <div className="step-name">{step.name}</div>
                            {step.desc && <div className="step-desc">{step.desc}</div>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Sun warnings */}
                  {selectedIds.some(id => ["retinol", "glycolic_acid", "lactic_acid", "mandelic_acid", "salicylic_acid"].includes(id)) && (
                    <div className="sun-warning-box">
                      <strong>Sun Protection Required:</strong> Active exfoliants/retinoids increase sun sensitivity. Apply SPF 50 daily.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Recommended Products for selected actives */}
        {selectedIds.length > 0 && (
          <div className="picks-container">
            <h2 className="picks-title">
              Science-Backed Picks for your Actives
            </h2>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
              {selectedIds.map((id) => {
                const active = INGREDIENTS.find((i) => i.id === id);
                const matchingProducts = getProductsForActive(id);
                if (!active || matchingProducts.length === 0) return null;

                return (
                  <div key={id}>
                    <p style={{ fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#9b7e6b", fontWeight: 700, marginBottom: "12px", fontFamily: "monospace" }}>
                      Targeted {active.name} Formulations
                    </p>
                    
                    <div className="products-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "16px" }}>
                      {matchingProducts.map((product) => {
                        const affiliateUrl = getProductAffiliateUrl(product, countryCode);
                        const isCultBeauty = affiliateUrl.includes("cultbeauty");
                        return (
                          <a
                            key={product.id}
                            href={affiliateUrl}
                            target="_blank"
                            rel="noopener noreferrer sponsored"
                            className="product-card"
                          >
                            <div className="product-img-wrap">
                              <img
                                src={product.image}
                                alt={product.name}
                                style={{ width: "100%", height: "100%", objectFit: "contain", padding: "4px" }}
                              />
                            </div>

                            <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                              <div>
                                <p style={{ fontSize: "0.65rem", color: "#fc2779", margin: "0 0 2px", textTransform: "uppercase", fontWeight: 700 }}>
                                  {product.brand}
                                </p>
                                <h4 className="product-card-name">
                                  {product.name}
                                </h4>
                              </div>

                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "8px" }}>
                                {isCultBeauty ? (
                                  <span style={{ fontSize: "0.78rem", color: "#756b63" }}>Shop Global</span>
                                ) : (
                                  <span className="product-card-price">
                                    ₹{product.price.toLocaleString("en-IN")}
                                  </span>
                                )}
                                <span style={{ fontSize: "0.72rem", color: "#fc2779", display: "inline-flex", alignItems: "center", gap: "2px", fontWeight: 600 }}>
                                  {isCultBeauty ? "Cult Beauty" : "Shop"} <ArrowRight size={10} />
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
