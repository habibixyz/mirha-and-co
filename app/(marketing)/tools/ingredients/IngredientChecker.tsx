"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, Check, AlertTriangle, AlertOctagon, HelpCircle, ArrowRight, Sun, Moon, Search, X, Trash2, Star, Sparkles } from "lucide-react";
import { PRODUCTS, getProductAffiliateUrl } from "@/lib/products";

// ─── ACTIVE INGREDIENTS DEFINITION ──────────────────────────────────────────
interface ActiveIngredient {
  id: string;
  name: string;
  category: string;
  description: string;
  skinTypeFit: string;
  tags: string[];
  concerns?: string[];
  skinTypes?: string[];
}

const INGREDIENTS: ActiveIngredient[] = [
  // Retinoids & Anti-Aging
  {
    id: "retinol",
    name: "Retinol / Retinoids",
    category: "Retinoids & Anti-Aging",
    description: "Speeds up skin cell turnover to reduce fine lines, acne, and pigmentation. Increases sun sensitivity.",
    skinTypeFit: "Mature, Acne-prone, Textured",
    tags: ["retinol", "retinal"],
    concerns: ["aging", "acne"],
    skinTypes: ["dry", "oily"]
  },
  {
    id: "bakuchiol",
    name: "Bakuchiol",
    category: "Retinoids & Anti-Aging",
    description: "A plant-based, gentle alternative to retinol that targets fine lines and loss of firmness without the irritation.",
    skinTypeFit: "Sensitive, All Skin Types",
    tags: ["bakuchiol"],
    concerns: ["aging"],
    skinTypes: ["sensitive", "dry", "oily"]
  },
  {
    id: "copper_peptides",
    name: "Copper Peptides",
    category: "Retinoids & Anti-Aging",
    description: "Boosts collagen and elastin production, aiding in skin regeneration and reducing fine lines.",
    skinTypeFit: "Mature, All Skin Types",
    tags: ["copper peptides", "copper"],
    concerns: ["aging"],
    skinTypes: ["dry", "oily"]
  },

  // Antioxidants & Brighteners
  {
    id: "vitamin_c",
    name: "Vitamin C",
    category: "Antioxidants & Brighteners",
    description: "Neutralizes free radicals, boosts collagen, and fades dark spots. Best used in the morning under SPF.",
    skinTypeFit: "All Skin Types, Dull, Hyperpigmented",
    tags: ["vitamin c", "vit c", "ascorbic"],
    concerns: ["dullness", "aging"],
    skinTypes: ["dry", "oily"]
  },
  {
    id: "azelaic_acid",
    name: "Azelaic Acid",
    category: "Antioxidants & Brighteners",
    description: "Reduces redness, clears acne, and fades hyperpigmentation. Great for rosacea-prone skin.",
    skinTypeFit: "Sensitive, Acne-prone, Rosacea",
    tags: ["azelaic"],
    concerns: ["redness", "acne", "dullness"],
    skinTypes: ["sensitive", "dry", "oily"]
  },
  {
    id: "alpha_arbutin",
    name: "Alpha Arbutin",
    category: "Antioxidants & Brighteners",
    description: "A safe brightening ingredient that reduces melanin production to target dark spots and uneven tone.",
    skinTypeFit: "Hyperpigmented, All Skin Types",
    tags: ["arbutin"],
    concerns: ["dullness"],
    skinTypes: ["dry", "oily", "sensitive"]
  },
  {
    id: "kojic_acid",
    name: "Kojic Acid",
    category: "Antioxidants & Brighteners",
    description: "Derived from fungi, it's a powerful lightening agent for sun damage, scars, and age spots.",
    skinTypeFit: "Hyperpigmented",
    tags: ["kojic"],
    concerns: ["dullness"],
    skinTypes: ["dry", "oily"]
  },
  {
    id: "tranexamic_acid",
    name: "Tranexamic Acid",
    category: "Antioxidants & Brighteners",
    description: "Reduces melanin synthesis, highly effective against melasma and stubborn post-inflammatory erythema.",
    skinTypeFit: "Hyperpigmented, Melasma",
    tags: ["tranexamic"],
    concerns: ["dullness", "redness"],
    skinTypes: ["dry", "oily", "sensitive"]
  },

  // Exfoliants
  {
    id: "salicylic_acid",
    name: "Salicylic Acid (BHA)",
    category: "Exfoliants",
    description: "Oil-soluble acid that penetrates deep into pores to dissolve excess sebum, blackheads, and dirt.",
    skinTypeFit: "Oily, Acne-prone, Congested",
    tags: ["salicylic", "bha"],
    concerns: ["acne"],
    skinTypes: ["oily"]
  },
  {
    id: "glycolic_acid",
    name: "Glycolic Acid (AHA)",
    category: "Exfoliants",
    description: "Water-soluble acid that dissolves dead cells on the skin surface, improving texture and skin tone.",
    skinTypeFit: "Dry, Sun-damaged, Hyperpigmented",
    tags: ["glycolic", "aha"],
    concerns: ["dullness", "aging"],
    skinTypes: ["dry", "oily"]
  },
  {
    id: "lactic_acid",
    name: "Lactic Acid (AHA)",
    category: "Exfoliants",
    description: "A gentler AHA that also draws moisture to the skin. Great for surface exfoliation.",
    skinTypeFit: "Dry, Sensitive",
    tags: ["lactic"],
    concerns: ["dullness", "dryness"],
    skinTypes: ["dry", "sensitive"]
  },
  {
    id: "mandelic_acid",
    name: "Mandelic Acid (AHA)",
    category: "Exfoliants",
    description: "A large-molecule AHA that penetrates slowly, making it extremely gentle for sensitive skin.",
    skinTypeFit: "Sensitive, Acne-prone",
    tags: ["mandelic"],
    concerns: ["acne", "dullness"],
    skinTypes: ["sensitive", "dry", "oily"]
  },
  {
    id: "pha",
    name: "Polyhydroxy Acids (PHA)",
    category: "Exfoliants",
    description: "The most gentle exfoliants that act on the skin's surface without irritation while providing hydration.",
    skinTypeFit: "Ultra-sensitive, Rosacea",
    tags: ["pha", "gluconolactone", "lactobionic"],
    concerns: ["dullness", "dryness"],
    skinTypes: ["sensitive", "dry"]
  },

  // Hydrators & Barrier Repair
  {
    id: "niacinamide",
    name: "Niacinamide (Vitamin B3)",
    category: "Hydrators & Barrier Repair",
    description: "Strengthens skin barrier, regulates sebum, minimizes pores, and calms redness/irritation.",
    skinTypeFit: "All Skin Types, Sensitive, Oily",
    tags: ["niacinamide"],
    concerns: ["redness", "acne", "dullness"],
    skinTypes: ["sensitive", "dry", "oily"]
  },
  {
    id: "hyaluronic_acid",
    name: "Hyaluronic Acid",
    category: "Hydrators & Barrier Repair",
    description: "Humectant that draws moisture into the skin, holding up to 1000x its weight in water.",
    skinTypeFit: "Dry, Dehydrated, All Skin Types",
    tags: ["hyaluronic", "hydrating"],
    concerns: ["dryness"],
    skinTypes: ["sensitive", "dry", "oily"]
  },
  {
    id: "ceramides",
    name: "Ceramides",
    category: "Hydrators & Barrier Repair",
    description: "Lipids that make up 50% of the skin barrier, essential for retaining moisture and protecting from damage.",
    skinTypeFit: "Dry, Damaged Barrier",
    tags: ["ceramide", "ceramides"],
    concerns: ["dryness", "redness"],
    skinTypes: ["sensitive", "dry", "oily"]
  },
  {
    id: "peptides",
    name: "Peptides",
    category: "Hydrators & Barrier Repair",
    description: "Amino acid chains that act as building blocks for collagen and elastin, improving skin firmness.",
    skinTypeFit: "Mature, Damaged Barrier",
    tags: ["peptide", "peptides"],
    concerns: ["aging"],
    skinTypes: ["sensitive", "dry", "oily"]
  },
  {
    id: "panthenol",
    name: "Panthenol (Vitamin B5)",
    category: "Hydrators & Barrier Repair",
    description: "Deeply soothing and hydrating ingredient that speeds up skin healing and reduces inflammation.",
    skinTypeFit: "Sensitive, Irritated",
    tags: ["panthenol", "b5"],
    concerns: ["redness", "dryness"],
    skinTypes: ["sensitive", "dry", "oily"]
  },
  {
    id: "squalane",
    name: "Squalane",
    category: "Hydrators & Barrier Repair",
    description: "A lightweight, non-comedogenic oil that mimics skin's natural sebum to lock in moisture.",
    skinTypeFit: "Dry, All Skin Types",
    tags: ["squalane"],
    concerns: ["dryness"],
    skinTypes: ["sensitive", "dry", "oily"]
  },
  {
    id: "centella",
    name: "Centella Asiatica (Cica)",
    category: "Hydrators & Barrier Repair",
    description: "Powerful wound-healing herb that calms severe irritation, redness, and inflammation.",
    skinTypeFit: "Sensitive, Acne-prone, Rosacea",
    tags: ["centella", "cica", "madecassoside"],
    concerns: ["redness"],
    skinTypes: ["sensitive", "dry", "oily"]
  },
  {
    id: "snail_mucin",
    name: "Snail Mucin",
    category: "Hydrators & Barrier Repair",
    description: "Rich in glycoproteins, hyaluronic acid, and peptides. Deeply hydrating and reparative.",
    skinTypeFit: "Dehydrated, Acne-prone",
    tags: ["snail"],
    concerns: ["dryness", "redness"],
    skinTypes: ["sensitive", "dry", "oily"]
  },

  // Targeted Treatments
  {
    id: "benzoyl_peroxide",
    name: "Benzoyl Peroxide",
    category: "Targeted Treatments",
    description: "Kills acne-causing bacteria and dries out active inflammatory blemishes.",
    skinTypeFit: "Acne-prone, Oily",
    tags: ["benzoyl", "benzac"],
    concerns: ["acne"],
    skinTypes: ["oily"]
  }
];

interface QuickTemplate {
  name: string;
  emoji: string;
  description: string;
  ingredients: string[];
}

const QUICK_TEMPLATES: QuickTemplate[] = [
  {
    name: "Glass Skin Glow",
    emoji: "✨",
    description: "Brightens, hydrates, and evens skin tone.",
    ingredients: ["hyaluronic_acid", "niacinamide", "vitamin_c", "snail_mucin"]
  },
  {
    name: "Anti-Aging Starter",
    emoji: "⏳",
    description: "Combats fine lines and boosts collagen safely.",
    ingredients: ["retinol", "hyaluronic_acid", "ceramides", "peptides"]
  },
  {
    name: "Acne-Clear Essentials",
    emoji: "🛡️",
    description: "Clears pores and calms redness.",
    ingredients: ["salicylic_acid", "niacinamide", "centella", "panthenol"]
  },
  {
    name: "Barrier Recovery",
    emoji: "🩹",
    description: "Deeply restores irritated or dry skin.",
    ingredients: ["ceramides", "hyaluronic_acid", "panthenol", "centella"]
  }
];

interface SynergyRule {
  actives: [string, string];
  message: string;
  benefit: string;
}

const SYNERGIES: SynergyRule[] = [
  {
    actives: ["retinol", "niacinamide"],
    message: "Barrier Buffering",
    benefit: "Niacinamide strengthens the skin barrier and reduces the irritation, flaking, and redness commonly caused by Retinol."
  },
  {
    actives: ["retinol", "hyaluronic_acid"],
    message: "Hydration Buffer",
    benefit: "Hyaluronic Acid draws water into skin layers, buffering against Retinol-induced dryness."
  },
  {
    actives: ["vitamin_c", "niacinamide"],
    message: "Brightening Synergy",
    benefit: "Vitamin C neutralizes free radicals while Niacinamide prevents transfer of melanin, offering a dual brightening effect."
  },
  {
    actives: ["bakuchiol", "retinol"],
    message: "Retinoid Boosting",
    benefit: "Bakuchiol stabilizes Retinol and boosts its anti-aging power, while acting as an anti-inflammatory agent."
  },
  {
    actives: ["glycolic_acid", "centella"],
    message: "Acid Soothing",
    benefit: "Centella Asiatica (Cica) deeply calms the skin barrier to minimize stinging or redness from glycolic acid exfoliation."
  },
  {
    actives: ["retinol", "ceramides"],
    message: "Lipid Replenishment",
    benefit: "Ceramides patch up dry gaps in the skin barrier, countering the dry/flaky side effects of Retinoids."
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

interface NodeMapProps {
  selectedIds: string[];
  ingredients: ActiveIngredient[];
  conflictRules: ConflictRule[];
  synergies: SynergyRule[];
}

function SkincareNodeMap({ selectedIds, ingredients, conflictRules, synergies }: NodeMapProps) {
  const width = 340;
  const height = 280;
  const cx = width / 2;
  const cy = height / 2;
  const r = 85; 
  
  const [hoveredLink, setHoveredLink] = useState<{
    text: string;
    type: "conflict" | "caution" | "synergy" | "neutral";
    x: number;
    y: number;
  } | null>(null);

  if (selectedIds.length === 0) {
    return (
      <div className="node-map-placeholder">
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
          <circle cx={cx} cy={cy} r="60" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 4" className="empty-orbit" />
          <circle cx={cx} cy={cy} r="4" fill="currentColor" className="empty-dot" />
        </svg>
        <span className="placeholder-text">Vanity Shelf Empty</span>
      </div>
    );
  }

  // Calculate coordinates for selected active ingredients
  const nodes = selectedIds.map((id, index) => {
    const angle = (index * 2 * Math.PI) / selectedIds.length - Math.PI / 2;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    const active = ingredients.find((i) => i.id === id);
    return {
      id,
      name: active ? active.name.split(" ")[0] : id, 
      fullName: active ? active.name : id,
      x,
      y,
    };
  });

  // Calculate links between nodes
  const links: {
    source: typeof nodes[0];
    target: typeof nodes[0];
    type: "conflict" | "caution" | "synergy" | "neutral";
    message: string;
  }[] = [];

  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const nodeA = nodes[i];
      const nodeB = nodes[j];

      const conflict = conflictRules.find(
        (rule) =>
          (rule.actives[0] === nodeA.id && rule.actives[1] === nodeB.id) ||
          (rule.actives[0] === nodeB.id && rule.actives[1] === nodeA.id)
      );

      const synergy = synergies.find(
        (syn) =>
          (syn.actives[0] === nodeA.id && syn.actives[1] === nodeB.id) ||
          (syn.actives[0] === nodeB.id && syn.actives[1] === nodeA.id)
      );

      let type: "conflict" | "caution" | "synergy" | "neutral" = "neutral";
      let message = "";

      if (conflict) {
        type = conflict.severity === "conflict" ? "conflict" : "caution";
        message = conflict.message;
      } else if (synergy) {
        type = "synergy";
        message = synergy.benefit;
      }

      links.push({
        source: nodeA,
        target: nodeB,
        type,
        message,
      });
    }
  }

  return (
    <div className="node-map-wrapper">
      <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} className="node-map-svg">
        <defs>
          <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fc2779" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#fc2779" stopOpacity="0" />
          </radialGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {selectedIds.length > 2 && (
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(252, 39, 121, 0.05)" strokeWidth="1.5" />
        )}

        {links.map((link, idx) => {
          const midX = (link.source.x + link.target.x) / 2;
          const midY = (link.source.y + link.target.y) / 2;
          const isNeutral = link.type === "neutral";
          
          let stroke = "rgba(140, 129, 121, 0.15)";
          let strokeWidth = "1";
          let strokeDasharray = undefined;
          let className = "link-line";

          if (link.type === "conflict") {
            stroke = "#fc2779";
            strokeWidth = "2.5";
            className = "link-line link-conflict";
          } else if (link.type === "caution") {
            stroke = "#f59f00";
            strokeWidth = "2";
            strokeDasharray = "4 3";
            className = "link-line link-caution";
          } else if (link.type === "synergy") {
            stroke = "#10b981";
            strokeWidth = "2.5";
            className = "link-line link-synergy";
          }

          return (
            <g key={idx} className="link-group">
              <line
                x1={link.source.x}
                y1={link.source.y}
                x2={link.target.x}
                y2={link.target.y}
                stroke={stroke}
                strokeWidth={strokeWidth}
                strokeDasharray={strokeDasharray}
                className={className}
              />
              
              {link.type === "synergy" && (
                <circle r="3.5" fill="#34d399" filter="url(#glow)">
                  <animateMotion
                    dur="3s"
                    repeatCount="indefinite"
                    path={`M ${link.source.x} ${link.source.y} L ${link.target.x} ${link.target.y}`}
                  />
                </circle>
              )}

              {link.type === "conflict" && (
                <g 
                  transform={`translate(${midX}, ${midY})`}
                  className="alert-node"
                  style={{ cursor: "pointer" }}
                  onMouseEnter={() => setHoveredLink({
                    text: `Conflict: ${link.source.fullName} + ${link.target.fullName}. ${link.message}`,
                    type: "conflict",
                    x: midX,
                    y: midY - 15
                  })}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  <circle r="7.5" fill="#fc2779" />
                  <text y="3" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">!</text>
                </g>
              )}

              {!isNeutral && link.type !== "conflict" && (
                <circle
                  cx={midX}
                  cy={midY}
                  r="5"
                  fill={link.type === "synergy" ? "#10b981" : "#f59f00"}
                  style={{ cursor: "pointer" }}
                  onMouseEnter={() => setHoveredLink({
                    text: `${link.type === "synergy" ? "Synergy" : "Caution"}: ${link.message}`,
                    type: link.type,
                    x: midX,
                    y: midY - 15
                  })}
                  onMouseLeave={() => setHoveredLink(null)}
                />
              )}
            </g>
          );
        })}

        {nodes.map((node) => (
          <g key={node.id} className="node-group">
            <circle cx={node.x} cy={node.y} r="25" fill="url(#nodeGlow)" />
            
            <circle
              cx={node.x}
              cy={node.y}
              r="18"
              className="node-circle"
              filter="url(#glow)"
            />
            
            <text
              x={node.x}
              y={node.y + 3}
              textAnchor="middle"
              className="node-text"
            >
              {node.name.substring(0, 5)}
            </text>

            <circle
              cx={node.x}
              cy={node.y}
              r="22"
              fill="transparent"
              style={{ cursor: "pointer" }}
              onMouseEnter={() => setHoveredLink({
                text: node.fullName,
                type: "neutral",
                x: node.x,
                y: node.y - 28
              })}
              onMouseLeave={() => setHoveredLink(null)}
            />
          </g>
        ))}
      </svg>

      {hoveredLink && (
        <div 
          className="map-tooltip"
          style={{
            position: "absolute",
            left: `${hoveredLink.x}px`,
            top: `${hoveredLink.y}px`,
            transform: "translate(-50%, -100%)",
            pointerEvents: "none"
          }}
        >
          <div className={`tooltip-content ${hoveredLink.type}`}>
            {hoveredLink.text}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ActiveIngredientChecker() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>([]);
  const [selectedSkinTypes, setSelectedSkinTypes] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [analyzedRules, setAnalyzedRules] = useState<ConflictRule[]>([]);
  const [countryCode, setCountryCode] = useState<string>("IN");

  const toggleConcern = (concern: string) => {
    setSelectedConcerns((prev) =>
      prev.includes(concern) ? prev.filter((c) => c !== concern) : [...prev, concern]
    );
  };

  const toggleSkinType = (skinType: string) => {
    setSelectedSkinTypes((prev) =>
      prev.includes(skinType) ? prev.filter((t) => t !== skinType) : [...prev, skinType]
    );
  };

  const isRecommended = useMemo(() => {
    return (item: ActiveIngredient) => {
      const matchesConcern = selectedConcerns.length > 0 && item.concerns?.some(c => selectedConcerns.includes(c));
      const matchesSkinType = selectedSkinTypes.length > 0 && item.skinTypes?.some(t => selectedSkinTypes.includes(t));
      return matchesConcern || matchesSkinType;
    };
  }, [selectedConcerns, selectedSkinTypes]);

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

  const getSafetyScore = () => {
    if (selectedIds.length < 2) return { score: 100, rating: "Safe & Clean", color: "#2d8a5c", darkColor: "#8ce99a" };
    
    let baseScore = 100;
    let conflicts = 0;
    let cautions = 0;
    let synergyBonus = 0;
    
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
          if (rule.severity === "conflict") {
            baseScore -= 35;
            conflicts += 1;
          } else if (rule.severity === "caution") {
            baseScore -= 15;
            cautions += 1;
          }
        }
        
        const syn = SYNERGIES.find(
          (s) =>
            (s.actives[0] === idA && s.actives[1] === idB) ||
            (s.actives[0] === idB && s.actives[1] === idA)
        );
        if (syn) {
          synergyBonus += 10;
        }
      }
    }
    
    let finalScore = baseScore + synergyBonus;
    if (finalScore > 100) finalScore = 100;
    if (finalScore < 10) finalScore = 10;
    
    let rating = "Safe & Clean";
    let color = "#2d8a5c"; 
    let darkColor = "#8ce99a";
    
    if (conflicts > 0) {
      rating = "Barrier Risk";
      color = "#fc2779"; 
      darkColor = "#ff8787";
    } else if (cautions > 0) {
      rating = "Caution Layering";
      color = "#e67700"; 
      darkColor = "#ffd43b";
    } else if (synergyBonus > 0) {
      rating = "Synergistic & Balanced";
      color = "#2d8a5c"; 
      darkColor = "#8ce99a";
    }
    
    return { score: finalScore, rating, color, darkColor };
  };

  const getMatchingSynergies = () => {
    const list: SynergyRule[] = [];
    for (let i = 0; i < selectedIds.length; i++) {
      for (let j = i + 1; j < selectedIds.length; j++) {
        const idA = selectedIds[i];
        const idB = selectedIds[j];
        const syn = SYNERGIES.find(
          (s) =>
            (s.actives[0] === idA && s.actives[1] === idB) ||
            (s.actives[0] === idB && s.actives[1] === idA)
        );
        if (syn && !list.some(item => item.message === syn.message)) {
          list.push(syn);
        }
      }
    }
    return list;
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
  const { score: safetyScore, rating: safetyRating, color: safetyColor } = getSafetyScore();
  const matchingSynergies = getMatchingSynergies();
  const conflictsCount = analyzedRules.filter((r) => r.severity === "conflict").length;
  const cautionsCount = analyzedRules.filter((r) => r.severity === "caution").length;

  return (
    <div className="ingredient-checker-page">
      <style dangerouslySetInnerHTML={{__html: `
        /* ── Biotech Facelift & Node Map CSS ── */
        .node-map-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.02);
          border: 1.5px dashed rgba(140, 129, 121, 0.18);
          border-radius: 18px;
          padding: 20px;
          text-align: center;
          color: #756b63;
          margin-bottom: 20px;
          min-height: 280px;
          position: relative;
        }
        html.dark .node-map-placeholder {
          border-color: rgba(255, 255, 255, 0.08);
          color: #aba49d;
        }
        .placeholder-text {
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-top: 12px;
          color: #8c8179;
        }
        .empty-orbit {
          stroke: rgba(140, 129, 121, 0.2);
          animation: spin 20s linear infinite;
          transform-origin: 50% 50%;
        }
        html.dark .empty-orbit {
          stroke: rgba(255, 255, 255, 0.05);
        }
        .empty-dot {
          fill: rgba(252, 39, 121, 0.3);
          animation: pulse 2s ease-in-out infinite;
        }

        .node-map-wrapper {
          position: relative;
          background: #fff;
          border: 1.5px solid #ede5dc;
          border-radius: 18px;
          margin-bottom: 24px;
          overflow: visible;
          box-shadow: 0 4px 12px rgba(38, 28, 20, 0.02);
          padding: 10px;
        }
        html.dark .node-map-wrapper {
          background: #181716;
          border-color: rgba(255, 255, 255, 0.1);
          box-shadow: 0 8px 32px rgba(0,0,0,0.2);
        }
        
        .node-map-svg {
          overflow: visible;
        }

        .node-circle {
          fill: #fff;
          stroke: #ede5dc;
          stroke-width: 2;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        html.dark .node-circle {
          fill: #22201e;
          stroke: rgba(255, 255, 255, 0.15);
        }
        .node-group:hover .node-circle {
          r: 21;
          stroke: #fc2779;
          stroke-width: 3;
        }
        
        .node-text {
          font-size: 8px;
          font-weight: 800;
          letter-spacing: -0.02em;
          text-transform: uppercase;
          fill: #161412;
          pointer-events: none;
          transition: all 0.3s;
        }
        html.dark .node-text {
          fill: #ffffff;
        }
        .node-group:hover .node-text {
          font-size: 9.5px;
          font-weight: 950;
          fill: #fc2779;
        }

        .link-line {
          transition: stroke-width 0.3s, opacity 0.3s;
          opacity: 0.8;
        }
        .link-conflict {
          animation: linePulse 2s infinite ease-in-out;
        }
        .link-caution {
          animation: dashMove 30s linear infinite;
        }
        .link-synergy {
          filter: drop-shadow(0px 0px 2px rgba(16, 185, 129, 0.4));
        }

        @keyframes linePulse {
          0%, 100% { stroke-width: 2.5; filter: drop-shadow(0px 0px 1px rgba(252, 39, 121, 0.4)); }
          50% { stroke-width: 4; filter: drop-shadow(0px 0px 4px rgba(252, 39, 121, 0.8)); }
        }
        @keyframes dashMove {
          to { stroke-dashoffset: -20; }
        }

        .map-tooltip {
          z-index: 100;
          width: max-content;
          max-width: 240px;
          transition: opacity 0.15s ease-out;
          filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.15));
        }
        .tooltip-content {
          background: #1e1c1a;
          color: #f7f5f2;
          padding: 8px 12px;
          border-radius: 8px;
          font-size: 0.72rem;
          line-height: 1.4;
          font-weight: 600;
          border: 1px solid rgba(255,255,255,0.12);
        }
        .tooltip-content.conflict {
          border-color: #fc2779;
          background: #1f0b0f;
          color: #ff8787;
        }
        .tooltip-content.caution {
          border-color: #f59f00;
          background: #211a0b;
          color: #ffd43b;
        }
        .tooltip-content.synergy {
          border-color: #10b981;
          background: #0b1f14;
          color: #8ce99a;
        }

        /* Ambient Glow in Sidebar */
        .sticky-sidebar {
          backdrop-filter: blur(16px);
          background: rgba(255, 255, 255, 0.75) !important;
          border: 1px solid rgba(140, 129, 121, 0.15) !important;
          position: relative;
        }
        html.dark .sticky-sidebar {
          backdrop-filter: blur(16px);
          background: rgba(24, 23, 22, 0.8) !important;
          border: 1px solid rgba(255, 255, 255, 0.08) !important;
        }
        .sticky-sidebar::before {
          content: "";
          position: absolute;
          width: 280px;
          height: 280px;
          background: radial-gradient(circle, rgba(252, 39, 121, 0.03) 0%, transparent 70%);
          top: -140px;
          right: -100px;
          z-index: 0;
          pointer-events: none;
        }
        html.dark .sticky-sidebar::before {
          background: radial-gradient(circle, rgba(252, 39, 121, 0.07) 0%, transparent 70%);
        }

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
            max-height: none !important;
            overflow-y: visible !important;
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
        
        .ingredient-pill.recommended-highlight {
          border-color: #f59f00;
          background: #fffbeb;
          color: #b25e00;
        }
        html.dark .ingredient-pill.recommended-highlight {
          border-color: #f59f00;
          background: rgba(245, 159, 0, 0.08);
          color: #ffd43b;
        }
        
        .profile-filters-card {
          background: #fff;
          border: 1.5px solid #ede5dc;
          border-radius: 18px;
          padding: 20px;
          margin-bottom: 24px;
          box-shadow: 0 4px 12px rgba(38, 28, 20, 0.02);
        }
        html.dark .profile-filters-card {
          background: #181716;
          border-color: rgba(255, 255, 255, 0.12);
        }
        .filter-group {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }
        .filter-label {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: #756b63;
          min-width: 110px;
        }
        html.dark .filter-label {
          color: #aba49d;
        }
        .filter-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .filter-btn {
          background: #fbf7f1;
          border: 1px solid #ede5dc;
          color: #161412;
          padding: 6px 14px;
          border-radius: 99px;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s ease;
          display: inline-flex;
          align-items: center;
        }
        .filter-btn:hover {
          border-color: #fc2779;
          background: #fff;
        }
        .filter-btn.active {
          background: rgba(252, 39, 121, 0.08);
          border-color: #fc2779;
          color: #fc2779;
        }
        html.dark .filter-btn {
          background: #1e1c1a;
          border-color: rgba(255, 255, 255, 0.12);
          color: #f7f5f2;
        }
        html.dark .filter-btn:hover {
          border-color: #fc2779;
          background: #181716;
        }
        html.dark .filter-btn.active {
          background: rgba(252, 39, 121, 0.15);
          border-color: #fc2779;
          color: #fc2779;
        }

        .templates-section {
          margin-bottom: 24px;
        }
        .templates-label {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: #756b63;
          margin-bottom: 10px;
        }
        html.dark .templates-label {
          color: #aba49d;
        }
        .templates-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }
        @media (max-width: 580px) {
          .templates-grid {
            grid-template-columns: 1fr;
          }
        }
        .template-card {
          background: #fff;
          border: 1.5px solid #ede5dc;
          border-radius: 14px;
          padding: 12px;
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: left;
        }
        .template-card:hover {
          border-color: #fc2779;
          box-shadow: 0 4px 12px rgba(252, 39, 121, 0.05);
        }
        .template-card.active {
          border-color: #fc2779;
          background: rgba(252, 39, 121, 0.02);
          box-shadow: 0 4px 12px rgba(252, 39, 121, 0.05);
        }
        html.dark .template-card {
          background: #181716;
          border-color: rgba(255, 255, 255, 0.12);
        }
        html.dark .template-card.active {
          background: rgba(252, 39, 121, 0.05);
        }
        .template-emoji {
          font-size: 1.5rem;
          background: #fbf7f1;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        html.dark .template-emoji {
          background: #1e1c1a;
        }
        .template-info {
          flex: 1;
          min-width: 0;
        }
        .template-name {
          font-size: 0.82rem;
          font-weight: 700;
          color: #161412;
        }
        html.dark .template-name {
          color: #f7f5f2;
        }
        .template-desc {
          font-size: 0.7rem;
          color: #756b63;
          margin-top: 2px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        html.dark .template-desc {
          color: #aba49d;
        }

        .dial-text {
          color: #161412;
        }
        html.dark .dial-text {
          color: #ffffff !important;
        }
        .sticky-sidebar {
          background: #fff;
          border: 1.5px solid #ede5dc;
          border-radius: 24px;
          padding: 24px;
          box-shadow: 0 16px 48px rgba(38, 28, 20, 0.05);
          position: sticky;
          top: 100px;
          max-height: calc(100vh - 140px);
          overflow-y: auto;
          scrollbar-width: thin;
          scrollbar-color: rgba(252, 39, 121, 0.25) transparent;
        }
        .sticky-sidebar::-webkit-scrollbar {
          width: 5px;
        }
        .sticky-sidebar::-webkit-scrollbar-track {
          background: transparent;
        }
        .sticky-sidebar::-webkit-scrollbar-thumb {
          background: rgba(252, 39, 121, 0.25);
          border-radius: 99px;
        }
        .sticky-sidebar::-webkit-scrollbar-thumb:hover {
          background: rgba(252, 39, 121, 0.45);
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
          background: #fff;
          border: 1px solid #ede5dc;
          border-left: 4px solid #ede5dc;
          border-radius: 12px;
          padding: 10px 14px;
          position: relative;
          box-shadow: 0 2px 4px rgba(38, 28, 20, 0.02);
          transition: all 0.2s ease;
        }
        .timeline-step:hover {
          transform: translateX(2px);
          box-shadow: 0 4px 8px rgba(38, 28, 20, 0.04);
        }
        .timeline-step.active-step {
          border-color: #fc2779;
          border-left-color: #fc2779;
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
          border-left: 4px solid rgba(255, 255, 255, 0.2);
        }
        html.dark .timeline-step.active-step, .dark .timeline-step.active-step {
          border-color: #fc2779;
          border-left-color: #fc2779;
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
          background: #ffffff;
          border-color: rgba(255, 255, 255, 0.08);
          opacity: 0.92;
          filter: brightness(0.93) contrast(1.02);
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
            {/* Quick Routine Templates */}
            <div className="templates-section">
              <div className="templates-label">
                <span>💡 Quick Routine Templates</span>
              </div>
              <div className="templates-grid">
                {QUICK_TEMPLATES.map((tpl) => {
                  const isTemplateActive = tpl.ingredients.every((id) => selectedIds.includes(id));
                  return (
                    <button
                      key={tpl.name}
                      type="button"
                      className={`template-card ${isTemplateActive ? "active" : ""}`}
                      onClick={() => {
                        if (isTemplateActive) {
                          setSelectedIds(prev => prev.filter(id => !tpl.ingredients.includes(id)));
                        } else {
                          setSelectedIds(tpl.ingredients);
                        }
                      }}
                    >
                      <div className="template-emoji">{tpl.emoji}</div>
                      <div className="template-info">
                        <div className="template-name">{tpl.name}</div>
                        <div className="template-desc">{tpl.description}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Skin Profile Filters */}
            <div className="profile-filters-card">
              <div className="filter-group">
                <span className="filter-label">Skin Type:</span>
                <div className="filter-buttons">
                  {[
                    { id: "sensitive", label: "Sensitive", emoji: "🧴" },
                    { id: "dry", label: "Dry", emoji: "🌵" },
                    { id: "oily", label: "Oily", emoji: "🧪" }
                  ].map(type => {
                    const active = selectedSkinTypes.includes(type.id);
                    return (
                      <button
                        key={type.id}
                        type="button"
                        className={`filter-btn ${active ? "active" : ""}`}
                        onClick={() => toggleSkinType(type.id)}
                      >
                        <span style={{ marginRight: '4px' }}>{type.emoji}</span> {type.label}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="filter-group" style={{ marginTop: '12px' }}>
                <span className="filter-label">Target Concern:</span>
                <div className="filter-buttons">
                  {[
                    { id: "aging", label: "Anti-Aging", emoji: "⏳" },
                    { id: "acne", label: "Acne", emoji: "🛡️" },
                    { id: "dullness", label: "Dullness / Dark Spots", emoji: "✨" },
                    { id: "redness", label: "Redness / Rosacea", emoji: "🩹" },
                    { id: "dryness", label: "Dryness", emoji: "💧" }
                  ].map(concern => {
                    const active = selectedConcerns.includes(concern.id);
                    return (
                      <button
                        key={concern.id}
                        type="button"
                        className={`filter-btn ${active ? "active" : ""}`}
                        onClick={() => toggleConcern(concern.id)}
                      >
                        <span style={{ marginRight: '4px' }}>{concern.emoji}</span> {concern.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

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
                        const isRec = isRecommended(item);
                        return (
                          <button
                            key={item.id}
                            type="button"
                            className={`ingredient-pill ${isSelected ? "selected" : ""} ${isRec ? "recommended-highlight" : ""}`}
                            onClick={() => toggleSelect(item.id)}
                            title={item.description}
                          >
                            {item.name}
                            {isRec && !isSelected && <Sparkles size={12} style={{ color: "#e67700", marginLeft: "4px" }} />}
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
                <div>
                  <SkincareNodeMap 
                    selectedIds={selectedIds}
                    ingredients={INGREDIENTS}
                    conflictRules={CONFLICT_RULES}
                    synergies={SYNERGIES}
                  />
                  <div style={{ textAlign: "center", padding: "10px 0 20px", color: "#8c8179" }}>
                    <HelpCircle size={28} style={{ margin: "0 auto 8px", opacity: 0.5 }} />
                    <p style={{ fontSize: "0.85rem", margin: 0, lineHeight: 1.5 }}>
                      Select two or more active ingredients on the left to check for conflicts and structure a safe routine.
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  {/* Safety Score Dial */}
                  <div className="safety-dial-wrapper" style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "24px", marginTop: "12px" }}>
                    <div style={{ position: "relative", width: "100px", height: "100px" }}>
                      <svg width="100" height="100" viewBox="0 0 100 100" style={{ transform: "rotate(-90deg)" }}>
                        <circle
                          cx="50"
                          cy="50"
                          r="36"
                          fill="transparent"
                          stroke="#f0ebe3"
                          strokeWidth="8"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="36"
                          fill="transparent"
                          stroke={safetyColor}
                          strokeWidth="8"
                          strokeDasharray={226.2}
                          strokeDashoffset={226.2 - (safetyScore / 100) * 226.2}
                          strokeLinecap="round"
                          style={{ transition: "stroke-dashoffset 0.5s ease" }}
                        />
                      </svg>
                      <div style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                      }}>
                        <span style={{ fontSize: "1.6rem", fontWeight: 800, fontFamily: "var(--font-bebas), sans-serif", letterSpacing: "0.02em" }} className="dial-text">
                          {safetyScore}%
                        </span>
                      </div>
                    </div>
                    <div style={{ textAlign: "center", marginTop: "8px" }}>
                      <span style={{
                        fontSize: "0.72rem",
                        fontWeight: 800,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        color: safetyColor
                      }}>{safetyRating}</span>
                    </div>
                  </div>

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

                  {/* Routine Synergies highlights */}
                  {matchingSynergies.length > 0 && (
                    <div style={{ marginTop: "20px" }}>
                      <div className="report-section-title">Routine Synergies</div>
                      {matchingSynergies.map((syn, idx) => (
                        <div key={idx} className="visual-rule-card safe" style={{ borderLeft: "4px solid #2d8a5c" }}>
                          <div style={{ display: "flex", gap: "6px", alignItems: "center", fontWeight: 700, marginBottom: "4px", color: "#2b8a3e" }}>
                            <Sparkles size={14} />
                            <span>{syn.message}</span>
                          </div>
                          <p style={{ margin: "0 0 4px", fontSize: "0.78rem", color: "#2b8a3e" }}>
                            <strong>Pairing:</strong> {INGREDIENTS.find(i => i.id === syn.actives[0])?.name} + {INGREDIENTS.find(i => i.id === syn.actives[1])?.name}
                          </p>
                          <p style={{ margin: 0, fontSize: "0.75rem", lineHeight: 1.4, color: "#476e52" }} className="synergy-benefit">
                            {syn.benefit}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}


                  {/* Skincare Node Map */}
                  <div className="report-section-title" style={{ marginTop: "20px" }}>Skincare Chemistry Map</div>
                  <SkincareNodeMap 
                    selectedIds={selectedIds}
                    ingredients={INGREDIENTS}
                    conflictRules={CONFLICT_RULES}
                    synergies={SYNERGIES}
                  />

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
