// components/IngredientConflictChecker.tsx
// NEW FILE — Cross-product ingredient conflict checker (Pro feature).
//
// Usage on the ingredient checker page:
//   import IngredientConflictChecker from "@/components/IngredientConflictChecker";
//   <IngredientConflictChecker />
//
// This is a static rule-based checker. For production, replace RULES with
// an API call to your ingredient database.

"use client";

import { useState } from "react";
import { ProGate } from "@/lib/auth";

interface ConflictRule {
  a: string;
  b: string;
  severity: "avoid" | "caution" | "ok";
  reason: string;
}

const RULES: ConflictRule[] = [
  {
    a: "retinol",
    b: "aha",
    severity: "avoid",
    reason: "Using AHA and retinol together can cause significant irritation and barrier damage. Use AHA in the morning and retinol at night, or alternate nights.",
  },
  {
    a: "retinol",
    b: "glycolic acid",
    severity: "avoid",
    reason: "Glycolic acid and retinol together are too aggressive for most skin types. Alternate nights.",
  },
  {
    a: "retinol",
    b: "salicylic acid",
    severity: "caution",
    reason: "Can be used together if skin is not sensitive, but introduce gradually. If irritation occurs, use on separate nights.",
  },
  {
    a: "niacinamide",
    b: "vitamin c",
    severity: "caution",
    reason: "High concentrations of niacinamide and vitamin C together may reduce efficacy. Use them at different times of day (vitamin C AM, niacinamide PM).",
  },
  {
    a: "benzoyl peroxide",
    b: "retinol",
    severity: "avoid",
    reason: "Benzoyl peroxide can oxidise and deactivate retinol. Do not use at the same time.",
  },
  {
    a: "aha",
    b: "bha",
    severity: "caution",
    reason: "Combining AHA and BHA can over-exfoliate. Use one at a time, or alternate days.",
  },
  {
    a: "vitamin c",
    b: "retinol",
    severity: "caution",
    reason: "Both are active and can destabilise each other. Vitamin C is ideal for AM, retinol for PM.",
  },
  {
    a: "niacinamide",
    b: "aha",
    severity: "ok",
    reason: "Generally fine to use together. Niacinamide can help buffer sensitivity from AHA exfoliants.",
  },
];

const SEVERITY_STYLE = {
  avoid: { bg: "#FCEBEB", color: "#A32D2D", label: "Avoid together" },
  caution: { bg: "#FAEEDA", color: "#854F0B", label: "Use with caution" },
  ok: { bg: "#EAF3DE", color: "#3B6D11", label: "Generally safe" },
};

function normalize(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function findConflicts(a: string, b: string): ConflictRule[] {
  const found: ConflictRule[] = [];
  const termsA = a.toLowerCase().split(/[\s,;]+/).filter(Boolean);
  const termsB = b.toLowerCase().split(/[\s,;]+/).filter(Boolean);

  for (const rule of RULES) {
    const ruleA = normalize(rule.a);
    const ruleB = normalize(rule.b);
    const matchA = termsA.some((t) => normalize(t).includes(ruleA) || ruleA.includes(normalize(t)));
    const matchB = termsB.some((t) => normalize(t).includes(ruleB) || ruleB.includes(normalize(t)));
    const matchAB = termsA.some((t) => normalize(t).includes(ruleB) || ruleB.includes(normalize(t)));
    const matchBA = termsB.some((t) => normalize(t).includes(ruleA) || ruleA.includes(normalize(t)));

    if ((matchA && matchB) || (matchAB && matchBA)) {
      if (!found.find((f) => f.a === rule.a && f.b === rule.b)) {
        found.push(rule);
      }
    }
  }
  return found;
}

export default function IngredientConflictChecker() {
  const [productA, setProductA] = useState("");
  const [productB, setProductB] = useState("");
  const [results, setResults] = useState<ConflictRule[] | null>(null);

  function check() {
    if (!productA.trim() || !productB.trim()) return;
    setResults(findConflicts(productA, productB));
  }

  return (
    <ProGate>
      <div style={{ fontFamily: "inherit" }}>
        <p
          style={{
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: "0.07em",
            textTransform: "uppercase",
            color: "#aaa",
            marginBottom: 16,
          }}
        >
          Conflict checker
        </p>
        <p style={{ fontSize: 14, color: "#555", marginBottom: 24 }}>
          Enter the key ingredients (or active names) from two products to check for conflicts.
          For example: <em>retinol, squalane</em> vs <em>glycolic acid, niacinamide</em>
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
          <div>
            <label style={{ fontSize: 12, color: "#888", display: "block", marginBottom: 6 }}>
              Product A ingredients
            </label>
            <textarea
              value={productA}
              onChange={(e) => setProductA(e.target.value)}
              placeholder="e.g. retinol, squalane, vitamin E"
              rows={3}
              style={{
                width: "100%",
                fontSize: 13,
                padding: "10px 12px",
                border: "1px solid #e5e5e5",
                borderRadius: 8,
                resize: "vertical",
                boxSizing: "border-box",
                fontFamily: "inherit",
              }}
            />
          </div>
          <div>
            <label style={{ fontSize: 12, color: "#888", display: "block", marginBottom: 6 }}>
              Product B ingredients
            </label>
            <textarea
              value={productB}
              onChange={(e) => setProductB(e.target.value)}
              placeholder="e.g. glycolic acid, hyaluronic acid"
              rows={3}
              style={{
                width: "100%",
                fontSize: 13,
                padding: "10px 12px",
                border: "1px solid #e5e5e5",
                borderRadius: 8,
                resize: "vertical",
                boxSizing: "border-box",
                fontFamily: "inherit",
              }}
            />
          </div>
        </div>

        <button
          onClick={check}
          style={{
            background: "#1a1a1a",
            color: "#fff",
            border: "none",
            padding: "11px 28px",
            borderRadius: 8,
            fontSize: 13,
            fontWeight: 500,
            cursor: "pointer",
            marginBottom: 28,
          }}
        >
          Check conflicts
        </button>

        {results !== null && (
          <div>
            {results.length === 0 ? (
              <div
                style={{
                  background: "#EAF3DE",
                  border: "1px solid #c0dd97",
                  borderRadius: 10,
                  padding: "16px 18px",
                  fontSize: 14,
                  color: "#3B6D11",
                }}
              >
                ✓ No known conflicts found between these ingredients. Always patch test when
                introducing actives.
              </div>
            ) : (
              results.map((r) => {
                const style = SEVERITY_STYLE[r.severity];
                return (
                  <div
                    key={`${r.a}-${r.b}`}
                    style={{
                      background: style.bg,
                      borderRadius: 10,
                      padding: "16px 18px",
                      marginBottom: 12,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 500,
                          color: style.color,
                          background: "rgba(255,255,255,0.5)",
                          padding: "3px 10px",
                          borderRadius: 99,
                        }}
                      >
                        {style.label}
                      </span>
                      <span style={{ fontSize: 13, fontWeight: 500, color: style.color }}>
                        {r.a} + {r.b}
                      </span>
                    </div>
                    <p style={{ fontSize: 13, color: style.color, margin: 0, opacity: 0.85 }}>
                      {r.reason}
                    </p>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </ProGate>
  );
}
