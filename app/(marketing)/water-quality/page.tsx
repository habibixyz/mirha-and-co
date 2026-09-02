import type { Metadata } from "next";
import Link from "next/link";
import { CITIES, GLOBAL_CITIES } from "@/lib/programmatic-posts";
import { getCityData } from "@/lib/water-data";

export const metadata: Metadata = {
  title: "Global Tap Water Hardness & Skin Health Directory | Mirha & Co.",
  description:
    "Independent geological analysis of municipal tap water hardness (PPM), mineral ion density, and dermatological skin barrier impact across 60+ global cities.",
  alternates: {
    canonical: "https://www.mirhaandco.com/water-quality",
  },
  openGraph: {
    title: "Global Tap Water Hardness & Skin Health Directory | Mirha & Co.",
    description:
      "Comprehensive mineral hardness scores (PPM), pH profiles, and neutralizing skincare routines for cities across India, Europe, the US, and UAE.",
    url: "https://www.mirhaandco.com/water-quality",
    siteName: "Mirha & Co.",
    type: "website",
  },
};

export default function WaterQualityDirectoryPage() {
  const allIndianCities = CITIES.map((c) => ({
    slug: c.slug,
    data: getCityData(c.slug),
    state: c.state,
    region: c.region,
  }));

  const allGlobalCities = GLOBAL_CITIES.map((c) => ({
    slug: c.slug,
    data: getCityData(c.slug),
    state: c.state,
    region: c.region,
  }));

  // Key metropolitan hubs
  const featuredSlugs = ["delhi", "mumbai", "bengaluru", "london", "new-york", "paris", "dubai", "los-angeles"];
  const featuredCities = featuredSlugs.map((slug) => ({
    slug,
    data: getCityData(slug),
  }));

  return (
    <main style={{ background: "#0d0f12", color: "#f3f4f6", minHeight: "100vh", fontFamily: "var(--font-dm-sans), sans-serif" }}>
      {/* Hero Header */}
      <section style={{ padding: "5rem 1.5rem 4rem", borderBottom: "1px solid #1f2937", background: "radial-gradient(ellipse at top, #1e293b 0%, #0d0f12 75%)", textAlign: "center" }}>
        <div style={{ maxWidth: "840px", margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.4rem 1rem", background: "rgba(56, 189, 248, 0.1)", border: "1px solid rgba(56, 189, 248, 0.25)", borderRadius: "9999px", color: "#38bdf8", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "1.5rem" }}>
            <span>Environmental Dermatology</span> · <span>Municipal Telemetry Index</span>
          </div>

          <h1 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "3.25rem", lineHeight: 1.12, fontWeight: 700, margin: "0 0 1.25rem 0", color: "#ffffff" }}>
            Global Tap Water Quality &amp; Hardness Intelligence
          </h1>

          <p style={{ fontSize: "1.15rem", color: "#9ca3af", lineHeight: 1.6, margin: "0 0 2.5rem 0", fontWeight: 400 }}>
            Dissolved calcium and magnesium salts in municipal tap water react with cleansing soaps to create insoluble mineral scum that clogs pores and strips intercellular lipids. Explore geological telemetry and neutralizing skincare routines for your city.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem", maxWidth: "600px", margin: "0 auto" }}>
            <div style={{ background: "rgba(17, 24, 39, 0.7)", border: "1px solid #1f2937", padding: "1rem", borderRadius: "12px", backdropFilter: "blur(8px)" }}>
              <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#ef4444" }}>63+</div>
              <div style={{ fontSize: "0.8rem", color: "#9ca3af" }}>Cities Audited</div>
            </div>
            <div style={{ background: "rgba(17, 24, 39, 0.7)", border: "1px solid #1f2937", padding: "1rem", borderRadius: "12px", backdropFilter: "blur(8px)" }}>
              <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#38bdf8" }}>50 - 950</div>
              <div style={{ fontSize: "0.8rem", color: "#9ca3af" }}>PPM Hardness Range</div>
            </div>
            <div style={{ background: "rgba(17, 24, 39, 0.7)", border: "1px solid #1f2937", padding: "1rem", borderRadius: "12px", backdropFilter: "blur(8px)" }}>
              <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#10b981" }}>100%</div>
              <div style={{ fontSize: "0.8rem", color: "#9ca3af" }}>Independent Data</div>
            </div>
          </div>
        </div>
      </section>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "4rem 1.5rem" }}>
        
        {/* Featured Key Hubs */}
        <section style={{ marginBottom: "4.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "1rem", marginBottom: "2rem" }}>
            <div>
              <div style={{ color: "#38bdf8", fontSize: "0.85rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Global Hubs</div>
              <h2 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "2rem", color: "#ffffff", margin: "0.25rem 0 0 0" }}>
                Featured Metropolitan Audits
              </h2>
            </div>
            <p style={{ color: "#6b7280", fontSize: "0.9rem", margin: 0 }}>High-density urban corridors with significant mineral telemetry variance.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.5rem" }}>
            {featuredCities.map(({ slug, data }) => (
              <Link
                key={slug}
                href={`/water-quality/${slug}`}
                style={{
                  display: "block",
                  background: "#111827",
                  border: "1px solid #1f2937",
                  borderRadius: "14px",
                  padding: "1.5rem",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                  color: "inherit",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                  <div>
                    <h3 style={{ fontSize: "1.25rem", color: "#ffffff", margin: 0, fontWeight: 700 }}>{data.name}</h3>
                    <span style={{ fontSize: "0.8rem", color: "#6b7280" }}>{data.country}</span>
                  </div>
                  <span
                    style={{
                      padding: "0.25rem 0.6rem",
                      borderRadius: "6px",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      background: data.ppm > 250 ? "rgba(239, 68, 68, 0.15)" : data.ppm > 140 ? "rgba(245, 158, 11, 0.15)" : "rgba(16, 185, 129, 0.15)",
                      color: data.ppm > 250 ? "#fca5a5" : data.ppm > 140 ? "#fde68a" : "#6ee7b7",
                    }}
                  >
                    {data.ppm} PPM
                  </span>
                </div>
                <p style={{ fontSize: "0.85rem", color: "#9ca3af", lineHeight: 1.5, margin: "0 0 1rem 0", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                  {data.summary}
                </p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.8rem", color: "#38bdf8", fontWeight: 600, borderTop: "1px solid #1f2937", paddingTop: "0.75rem" }}>
                  <span>View Telemetry Audit</span>
                  <span>→</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Complete Indian Cities Index */}
        <section style={{ marginBottom: "4.5rem" }}>
          <div style={{ marginBottom: "2rem" }}>
            <div style={{ color: "#38bdf8", fontSize: "0.85rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Indian Subcontinent</div>
            <h2 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "2rem", color: "#ffffff", margin: "0.25rem 0 0 0" }}>
              Indian Municipal Water Quality Index ({allIndianCities.length} Cities)
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1rem" }}>
            {allIndianCities.map(({ slug, data, state }) => (
              <Link
                key={slug}
                href={`/water-quality/${slug}`}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "#111827",
                  border: "1px solid #1f2937",
                  borderRadius: "10px",
                  padding: "1rem 1.25rem",
                  textDecoration: "none",
                  color: "#e5e7eb",
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.95rem", color: "#ffffff" }}>{data.name}</div>
                  <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>{state}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "0.9rem", fontWeight: 700, color: data.ppm > 250 ? "#ef4444" : data.ppm > 140 ? "#f59e0b" : "#10b981" }}>
                    {data.ppm} <span style={{ fontSize: "0.7rem", color: "#6b7280" }}>PPM</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Global Cities Index */}
        <section style={{ marginBottom: "4rem" }}>
          <div style={{ marginBottom: "2rem" }}>
            <div style={{ color: "#38bdf8", fontSize: "0.85rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>International Metropolises</div>
            <h2 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "2rem", color: "#ffffff", margin: "0.25rem 0 0 0" }}>
              Global Water Quality Telemetry
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1rem" }}>
            {allGlobalCities.map(({ slug, data, state }) => (
              <Link
                key={slug}
                href={`/water-quality/${slug}`}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "#111827",
                  border: "1px solid #1f2937",
                  borderRadius: "10px",
                  padding: "1rem 1.25rem",
                  textDecoration: "none",
                  color: "#e5e7eb",
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.95rem", color: "#ffffff" }}>{data.name}</div>
                  <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>{state}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "0.9rem", fontWeight: 700, color: data.ppm > 250 ? "#ef4444" : data.ppm > 140 ? "#f59e0b" : "#10b981" }}>
                    {data.ppm} <span style={{ fontSize: "0.7rem", color: "#6b7280" }}>PPM</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
