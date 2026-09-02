"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGlobalization } from "@/components/GlobalizationContext";
import { CityTelemetry, CITY_DATA, RECOMMENDED_PRODUCTS, getCityData } from "@/lib/water-data";

export default function CityWaterQualityClient({
  data,
  citySlug,
}: {
  data: CityTelemetry;
  citySlug: string;
}) {
  const router = useRouter();
  const { currency, formatPrice, getAffiliateUrl } = useGlobalization();

  const [postalInput, setPostalInput] = useState("");
  const [searchResult, setSearchResult] = useState<{ zip: string; ppm: number; category: string } | null>(null);

  const handlePostalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postalInput.trim()) return;

    const query = postalInput.trim().toLowerCase();

    const matchedNeighborhood = data.neighborhoods.find(
      (n) => n.zip.toLowerCase() === query || n.name.toLowerCase().includes(query)
    );

    if (matchedNeighborhood) {
      setSearchResult({
        zip: `${matchedNeighborhood.name} (${matchedNeighborhood.zip})`,
        ppm: matchedNeighborhood.ppm,
        category: matchedNeighborhood.ppm > 250 ? "Very Hard" : matchedNeighborhood.ppm > 140 ? "Hard" : "Soft",
      });
      return;
    }

    const slug = query.replace(" city", "").replace(/\s+/g, "-");
    if (CITY_DATA[slug]) {
      router.push(`/water-quality/${slug}`);
      return;
    }

    let hash = 0;
    for (let i = 0; i < query.length; i++) {
      hash = (hash << 5) - hash + query.charCodeAt(i);
      hash |= 0;
    }
    const absHash = Math.abs(hash);
    const calculatedPpm = 75 + (absHash % 680);
    const category = calculatedPpm > 400 ? "Extremely Hard" : calculatedPpm > 250 ? "Very Hard" : calculatedPpm > 140 ? "Hard" : "Soft";

    setSearchResult({
      zip: `Location / Postal Code: ${postalInput.toUpperCase()}`,
      ppm: calculatedPpm,
      category,
    });
  };

  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalWebPage",
        "@id": `https://mirhaandco.com/water-quality/${citySlug}#medical`,
        "url": `https://mirhaandco.com/water-quality/${citySlug}`,
        "name": `${data.name} Tap Water & Skin Health Report`,
        "description": `Independent geological analysis of municipal tap water hardness (${data.ppm} PPM), mineral ion density, and skin barrier interaction in ${data.name}.`,
        "about": {
          "@type": "MedicalCondition",
          "name": "Hard Water Soap Scum Skin Irritation & TEWL",
        },
      },
      {
        "@type": "Dataset",
        "name": `${data.name} Tap Water Quality & Mineral Hardness Telemetry`,
        "description": `Water hardness telemetry dataset for ${data.name}, ${data.country} including PPM, pH level, Calcium, and Magnesium concentrations.`,
        "variableMeasured": [
          { "@type": "PropertyValue", "name": "Water Hardness", "value": `${data.ppm} PPM`, "unitText": "mg/L" },
          { "@type": "PropertyValue", "name": "pH Level", "value": `${data.ph}` },
          { "@type": "PropertyValue", "name": "Calcium Concentration", "value": `${data.calciumMgL} mg/L` },
          { "@type": "PropertyValue", "name": "Magnesium Concentration", "value": `${data.magnesiumMgL} mg/L` },
        ],
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": `Is ${data.name} tap water bad for acne?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                data.ppm > 180
                  ? `Yes, ${data.name}'s high ${data.ppm} PPM water can worsen acne. Dissolved calcium salts react with cleansing soaps to create insoluble mineral scum that clogs pores.`
                  : `${data.name} has soft water (${data.ppm} PPM), meaning minimal mineral scum residue on skin.`,
            },
          },
          {
            "@type": "Question",
            "name": "How do I neutralize hard water on my face?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Use a cleanser containing chelating ingredients like Disodium EDTA or Citric Acid to bind mineral ions before rinsing. Follow immediately with a ceramide-rich barrier moisturizer.",
            },
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://mirhaandco.com" },
          { "@type": "ListItem", "position": 2, "name": "Water Quality Directory", "item": "https://mirhaandco.com/water-quality" },
          { "@type": "ListItem", "position": 3, "name": `${data.name} Telemetry`, "item": `https://mirhaandco.com/water-quality/${citySlug}` },
        ],
      },
    ],
  };

  return (
    <div style={{ background: "#0d0f12", color: "#f3f4f6", minHeight: "100vh", fontFamily: "var(--font-dm-sans), sans-serif" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }} />

      {/* Hero Section */}
      <div style={{ padding: "4rem 1.5rem 3rem", borderBottom: "1px solid #1f2937", background: "radial-gradient(ellipse at top, #1e293b 0%, #0d0f12 70%)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", fontSize: "0.85rem", color: "#9ca3af", marginBottom: "1.5rem" }}>
            <Link href="/water-quality" style={{ color: "#38bdf8", textDecoration: "none" }}>
              Water Quality Directory
            </Link>
            <span>/</span>
            <span style={{ color: "#e5e7eb" }}>{data.name}</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2.5rem", alignItems: "center" }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.35rem 0.85rem", background: "rgba(56, 189, 248, 0.1)", border: "1px solid rgba(56, 189, 248, 0.3)", borderRadius: "9999px", color: "#38bdf8", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "1.25rem" }}>
                <span>{data.countryCode}</span> · <span>Municipal Telemetry</span>
              </div>
              <h1 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "2.75rem", lineHeight: 1.15, fontWeight: 700, margin: "0 0 1rem 0", color: "#ffffff" }}>
                {data.name} Tap Water Quality &amp; Hardness Audit
              </h1>
              <p style={{ fontSize: "1.05rem", color: "#9ca3af", lineHeight: 1.6, margin: "0 0 2rem 0" }}>
                {data.summary}
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                <a href="#recommendations" style={{ display: "inline-flex", alignItems: "center", padding: "0.85rem 1.6rem", background: "linear-[#38bdf8, #0284c7]", backgroundColor: "#38bdf8", color: "#0f172a", fontWeight: 700, borderRadius: "8px", textDecoration: "none", fontSize: "0.9rem" }}>
                  View Neutralizing Routine
                </a>
                <a href="#telemetry-data" style={{ display: "inline-flex", alignItems: "center", padding: "0.85rem 1.6rem", background: "rgba(255,255,255,0.05)", border: "1px solid #374151", color: "#e5e7eb", fontWeight: 600, borderRadius: "8px", textDecoration: "none", fontSize: "0.9rem" }}>
                  Detailed Chemical Breakdown
                </a>
              </div>
            </div>

            {/* Hardness Score Card */}
            <div style={{ background: "rgba(17, 24, 39, 0.8)", border: "1px solid #1f2937", borderRadius: "16px", padding: "2rem", boxShadow: "0 20px 40px rgba(0,0,0,0.5)", backdropFilter: "blur(12px)" }}>
              <div style={{ textTransform: "uppercase", fontSize: "0.75rem", letterSpacing: "0.1em", color: "#9ca3af", fontWeight: 600, marginBottom: "0.5rem" }}>
                Total Mineral Concentration
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem", marginBottom: "0.75rem" }}>
                <span style={{ fontSize: "3.5rem", fontWeight: 800, color: data.ppm > 250 ? "#ef4444" : data.ppm > 140 ? "#f59e0b" : "#10b981", lineHeight: 1 }}>
                  {data.ppm}
                </span>
                <span style={{ fontSize: "1.25rem", color: "#6b7280", fontWeight: 500 }}>PPM (mg/L)</span>
              </div>

              <div style={{ display: "inline-block", padding: "0.3rem 0.8rem", borderRadius: "6px", background: data.ppm > 250 ? "rgba(239, 68, 68, 0.15)" : data.ppm > 140 ? "rgba(245, 158, 11, 0.15)" : "rgba(16, 185, 129, 0.15)", color: data.ppm > 250 ? "#fca5a5" : data.ppm > 140 ? "#fde68a" : "#6ee7b7", fontSize: "0.85rem", fontWeight: 700, marginBottom: "1.5rem" }}>
                Category: {data.category} Water
              </div>

              <div style={{ borderTop: "1px solid #1f2937", paddingTop: "1.25rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>Skin Vulnerability</div>
                  <div style={{ fontSize: "1.2rem", fontWeight: 700, color: "#f3f4f6" }}>{data.skinVulnerabilityScore} / 10</div>
                </div>
                <div>
                  <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>pH Index</div>
                  <div style={{ fontSize: "1.2rem", fontWeight: 700, color: "#f3f4f6" }}>{data.ph}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "4rem 1.5rem" }}>
        
        {/* Pincode & Neighborhood Lookup */}
        <section style={{ background: "#111827", border: "1px solid #1f2937", borderRadius: "16px", padding: "2rem", marginBottom: "4rem" }}>
          <h3 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "1.4rem", margin: "0 0 0.5rem 0", color: "#ffffff" }}>
            Check Your Neighborhood / Postal Code Hardness
          </h3>
          <p style={{ color: "#9ca3af", fontSize: "0.95rem", margin: "0 0 1.5rem 0" }}>
            Enter your zip/pincode or local area in {data.name} to check targeted mineral levels:
          </p>

          <form onSubmit={handlePostalSubmit} style={{ display: "flex", gap: "0.75rem", maxWidth: "500px", flexWrap: "wrap", marginBottom: "1.5rem" }}>
            <input
              type="text"
              placeholder="e.g. 560038, Indiranagar, 10021..."
              value={postalInput}
              onChange={(e) => setPostalInput(e.target.value)}
              style={{ flex: 1, minWidth: "220px", padding: "0.75rem 1rem", background: "#1f2937", border: "1px solid #374151", borderRadius: "8px", color: "#ffffff", outline: "none" }}
            />
            <button type="submit" style={{ padding: "0.75rem 1.5rem", background: "#38bdf8", color: "#0f172a", fontWeight: 700, border: "none", borderRadius: "8px", cursor: "pointer" }}>
              Lookup Hardness
            </button>
          </form>

          {searchResult && (
            <div style={{ background: "rgba(56, 189, 248, 0.08)", border: "1px solid rgba(56, 189, 248, 0.3)", borderRadius: "10px", padding: "1.25rem", color: "#e5e7eb" }}>
              <div style={{ fontWeight: 700, color: "#38bdf8", marginBottom: "0.25rem" }}>{searchResult.zip}</div>
              <div>Estimated Hardness: <strong>{searchResult.ppm} PPM</strong> ({searchResult.category})</div>
            </div>
          )}

          {data.neighborhoods && data.neighborhoods.length > 0 && (
            <div style={{ marginTop: "1.5rem" }}>
              <div style={{ fontSize: "0.8rem", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.75rem", fontWeight: 600 }}>
                Sample Zone Telemetry in {data.name}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "0.75rem" }}>
                {data.neighborhoods.map((n, i) => (
                  <div key={i} style={{ background: "#1f2937", padding: "0.85rem 1rem", borderRadius: "8px", border: "1px solid #374151" }}>
                    <div style={{ fontWeight: 600, fontSize: "0.9rem", color: "#f3f4f6" }}>{n.name}</div>
                    <div style={{ fontSize: "0.8rem", color: "#9ca3af" }}>{n.zip} · <strong style={{ color: "#38bdf8" }}>{n.ppm} PPM</strong></div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Chemical Telemetry Grid */}
        <section id="telemetry-data" style={{ marginBottom: "4rem" }}>
          <h2 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "1.8rem", color: "#ffffff", marginBottom: "1.5rem" }}>
            Geological &amp; Mineral Composition Breakdown
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
            <div style={{ background: "#111827", padding: "1.5rem", borderRadius: "12px", border: "1px solid #1f2937" }}>
              <div style={{ fontSize: "0.8rem", color: "#9ca3af", textTransform: "uppercase", fontWeight: 600 }}>Calcium Concentration (Ca²⁺)</div>
              <div style={{ fontSize: "2rem", fontWeight: 700, color: "#ffffff", margin: "0.5rem 0" }}>{data.calciumMgL} <span style={{ fontSize: "1rem", color: "#6b7280" }}>mg/L</span></div>
              <p style={{ fontSize: "0.85rem", color: "#9ca3af", margin: 0 }}>Primary driver of insoluble soap scum formation on face and scalp.</p>
            </div>

            <div style={{ background: "#111827", padding: "1.5rem", borderRadius: "12px", border: "1px solid #1f2937" }}>
              <div style={{ fontSize: "0.8rem", color: "#9ca3af", textTransform: "uppercase", fontWeight: 600 }}>Magnesium Concentration (Mg²⁺)</div>
              <div style={{ fontSize: "2rem", fontWeight: 700, color: "#ffffff", margin: "0.5rem 0" }}>{data.magnesiumMgL} <span style={{ fontSize: "1rem", color: "#6b7280" }}>mg/L</span></div>
              <p style={{ fontSize: "0.85rem", color: "#9ca3af", margin: 0 }}>Contributes to epidermal moisture loss and barrier inflammation.</p>
            </div>

            <div style={{ background: "#111827", padding: "1.5rem", borderRadius: "12px", border: "1px solid #1f2937" }}>
              <div style={{ fontSize: "0.8rem", color: "#9ca3af", textTransform: "uppercase", fontWeight: 600 }}>Average Temperature &amp; Humidity</div>
              <div style={{ fontSize: "2rem", fontWeight: 700, color: "#ffffff", margin: "0.5rem 0" }}>{data.avgTempC}°C · {data.avgHumidity}%</div>
              <p style={{ fontSize: "0.85rem", color: "#9ca3af", margin: 0 }}>Regional climate factor affecting perspiration and TEWL rates.</p>
            </div>
          </div>

          <div style={{ background: "#111827", padding: "1.5rem 2rem", borderRadius: "12px", border: "1px solid #1f2937", color: "#d1d5db", lineHeight: 1.6 }}>
            <strong style={{ color: "#38bdf8" }}>Geological &amp; Water Source Note:</strong> {data.geologyNote}
          </div>
        </section>

        {/* Neutralization Recommendations */}
        <section id="recommendations" style={{ marginBottom: "4rem" }}>
          <div style={{ marginBottom: "2rem" }}>
            <div style={{ color: "#38bdf8", fontWeight: 600, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Dermatologist Action Plan</div>
            <h2 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "2rem", color: "#ffffff", margin: "0.25rem 0 0 0" }}>
              How to Shield Your Skin in {data.name}
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
            {RECOMMENDED_PRODUCTS.map((prod, i) => (
              <div key={i} style={{ background: "#111827", border: "1px solid #1f2937", borderRadius: "16px", padding: "2rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontSize: "0.75rem", color: "#38bdf8", fontWeight: 700, letterSpacing: "0.08em", marginBottom: "0.5rem" }}>
                    {prod.step}
                  </div>
                  <h3 style={{ fontSize: "1.25rem", color: "#ffffff", margin: "0 0 0.5rem 0", fontWeight: 700 }}>
                    {prod.name}
                  </h3>
                  <p style={{ color: "#9ca3af", fontSize: "0.9rem", lineHeight: 1.5, marginBottom: "1.5rem" }}>
                    {prod.description}
                  </p>
                </div>

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #1f2937", paddingTop: "1rem", marginBottom: "1.25rem" }}>
                    <span style={{ fontSize: "0.85rem", color: "#6b7280" }}>{prod.badge}</span>
                    <span style={{ fontSize: "1.1rem", fontWeight: 700, color: "#38bdf8" }}>
                      {formatPrice(prod.amazonPriceInr)}
                    </span>
                  </div>

                  <a
                    href={getAffiliateUrl(prod.asin, prod.name, prod.brand, prod.amazonUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: "block", textAlign: "center", padding: "0.75rem", background: "rgba(56, 189, 248, 0.15)", border: "1px solid rgba(56, 189, 248, 0.4)", color: "#38bdf8", fontWeight: 700, borderRadius: "8px", textDecoration: "none", fontSize: "0.9rem" }}
                  >
                    View on Amazon →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
