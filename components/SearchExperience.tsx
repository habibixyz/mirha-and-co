"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { Search, Sparkles } from "lucide-react";
import { searchMirha } from "@/lib/searchEngine";

const QUICK_SEARCHES = [
  "oily skin sunscreen under 500",
  "pigmentation routine",
  "niacinamide acne marks",
  "dry sensitive cleanser",
  "beginner skincare routine",
  "retinol night serum",
];

const TYPE_LABEL: Record<string, string> = {
  product: "Product",
  guide: "Guide",
  routine: "Routine",
  ingredient: "Ingredient",
};

const TRUST_POINTS = [
  "Indian skin + climate",
  "Budget-aware picks",
  "Ingredient reasoning",
  "Affiliate links disclosed",
];

export default function SearchExperience() {
  const params = useSearchParams();
  const initialQuery = params.get("q") || "";
  const [query, setQuery] = useState(initialQuery);

  const results = useMemo(() => searchMirha(query), [query]);
  const grouped = useMemo(() => {
    return results.reduce<Record<string, typeof results>>((acc, result) => {
      acc[result.type] ||= [];
      acc[result.type].push(result);
      return acc;
    }, {});
  }, [results]);

  return (
    <main style={{ minHeight: "100vh", background: "#faf8f5", color: "#111", padding: "48px 20px 80px" }}>
      <div style={{ maxWidth: 980, margin: "0 auto" }}>
        <div style={{ marginBottom: 34 }}>
          <p style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "#9b7e6b", marginBottom: 12 }}>
            Mirha Search
          </p>
          <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(38px, 7vw, 68px)", fontWeight: 400, lineHeight: 1, margin: "0 0 14px" }}>
            Find what works.
            <br />
            Skip what doesn't.
          </h1>
          <p style={{ maxWidth: 660, color: "#6f6963", lineHeight: 1.7, fontSize: 15, margin: 0 }}>
            Search by concern, ingredient, skin type, or budget. Mirha pulls together products, routines, and guides with clear reasoning - built for Indian skin, not generic beauty noise.
          </p>
        </div>

        <div style={{ background: "#fff", border: "1px solid #e6ded4", borderRadius: 10, padding: 16, marginBottom: 18 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Search size={18} color="#9b7e6b" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Try: oily skin sunscreen under 500"
              style={{ flex: 1, border: 0, outline: 0, fontSize: 16, background: "transparent", color: "#111", padding: "10px 0" }}
              autoFocus
            />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 8, marginBottom: 18 }}>
          {TRUST_POINTS.map((point) => (
            <div key={point} style={{ background: "#fff", border: "1px solid #eee7de", borderRadius: 8, padding: "10px 12px", color: "#6f6963", fontSize: 12 }}>
              {point}
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 36 }}>
          {QUICK_SEARCHES.map((item) => (
            <button
              key={item}
              onClick={() => setQuery(item)}
              style={{
                border: "1px solid #e6ded4",
                background: query === item ? "#111" : "#fff",
                color: query === item ? "#fff" : "#5c544d",
                borderRadius: 999,
                padding: "8px 12px",
                fontSize: 12,
                cursor: "pointer",
              }}
            >
              {item}
            </button>
          ))}
        </div>

        {!query ? (
          <div style={{ border: "1px solid #e6ded4", background: "#fff", borderRadius: 10, padding: 28 }}>
            <Sparkles size={18} color="#9b7e6b" />
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, margin: "12px 0 8px", fontSize: 24 }}>
              Start with a concern, ingredient, or budget.
            </h2>
            <p style={{ color: "#777", margin: 0, lineHeight: 1.7 }}>
              Good searches look like acne marks, dry skin moisturiser, SPF 50 oily skin, or vitamin C pigmentation.
            </p>
          </div>
        ) : results.length === 0 ? (
          <div style={{ border: "1px solid #e6ded4", background: "#fff", borderRadius: 10, padding: 28 }}>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, margin: "0 0 8px", fontSize: 24 }}>
              No strong matches yet.
            </h2>
            <p style={{ color: "#777", margin: 0, lineHeight: 1.7 }}>
              Try a broader word like sunscreen, acne, pigmentation, oily skin, dry skin, or niacinamide.
            </p>
          </div>
        ) : (
          <div style={{ display: "grid", gap: 28 }}>
            <div style={{ background: "#111", color: "#fff", borderRadius: 10, padding: "18px 20px", display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
              <div>
                <p style={{ margin: "0 0 4px", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#9b7e6b" }}>
                  Search logic
                </p>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "#ddd" }}>
                  Ranking uses product tags, concerns, ingredients, budget tier, and guide relevance.
                </p>
              </div>
              <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 28, lineHeight: 1 }}>
                {results.length}
                <span style={{ display: "block", fontFamily: "inherit", fontSize: 13, color: "#777", marginTop: 4 }}>
                  matches
                </span>
              </div>
            </div>

            {(["routine", "product", "guide", "ingredient"] as const).map((type) => {
              const items = grouped[type] || [];
              if (!items.length) return null;

              return (
                <section key={type}>
                  <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 12 }}>
                    <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 26, fontWeight: 400, margin: 0 }}>
                      {TYPE_LABEL[type]}s
                    </h2>
                    <span style={{ color: "#aaa", fontSize: 12 }}>{items.length} matches</span>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12 }}>
                    {items.map((item) => (
                      <Link
                        key={item.id}
                        href={item.url}
                        style={{
                          background: "#fff",
                          border: "1px solid #e6ded4",
                          borderRadius: 10,
                          padding: 16,
                          textDecoration: "none",
                          color: "inherit",
                          display: "flex",
                          gap: 14,
                          minHeight: 142,
                        }}
                      >
                        {item.image ? (
                          <div style={{ width: 72, height: 72, background: "#fff", border: "1px solid #eee7de", borderRadius: 8, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <img src={item.image} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "contain", padding: 6 }} />
                          </div>
                        ) : (
                          <div style={{ width: 72, height: 72, background: "#111", color: "#fff", borderRadius: 8, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase" }}>
                            {TYPE_LABEL[item.type]}
                          </div>
                        )}

                        <div style={{ minWidth: 0 }}>
                          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6 }}>
                            <span style={{ fontSize: 10, color: "#9b7e6b", textTransform: "uppercase", letterSpacing: "0.15em" }}>
                              {TYPE_LABEL[item.type]}
                            </span>
                            {item.price ? <span style={{ fontSize: 12, color: "#555" }}>Rs {item.price.toLocaleString("en-IN")}</span> : null}
                          </div>
                          <h3 style={{ margin: "0 0 7px", fontSize: 15, lineHeight: 1.35 }}>{item.title}</h3>
                          <p style={{ margin: 0, color: "#777", fontSize: 12, lineHeight: 1.55 }}>
                            {item.description}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
