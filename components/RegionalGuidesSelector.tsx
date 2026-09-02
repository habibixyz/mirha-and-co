"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CITIES, GLOBAL_CITIES, CONCERNS } from "@/lib/programmatic-posts";

export default function RegionalGuidesSelector({ currency = "INR" }: { currency?: string }) {
  const citiesList = currency === "INR" ? CITIES : GLOBAL_CITIES;
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedConcern, setSelectedConcern] = useState("");
  const [showAllLinks, setShowAllLinks] = useState(false);

  const handleNavigate = () => {
    if (selectedCity && selectedConcern) {
      window.location.href = `/blog/best-moisturizer-for-${selectedConcern}-in-${selectedCity}`;
    }
  };

  const topCities = citiesList.slice(0, 12);
  const featuredConcern = CONCERNS[0]; // oily-skin

  return (
    <div
      style={{
        background: "var(--dash-surface, #fff)",
        padding: "2.2rem 1.5rem",
        borderRadius: "16px",
        border: "1px solid var(--dash-border, #ded7cf)",
        maxWidth: "840px",
        margin: "0 auto 3rem",
        textAlign: "center",
        boxShadow: "0 4px 24px rgba(0,0,0,0.02)",
      }}
    >
      <h3
        style={{
          fontFamily: "var(--font-playfair), serif",
          fontSize: "1.35rem",
          marginBottom: "0.5rem",
          fontWeight: 600,
          color: "var(--dash-ink, #1a1714)",
        }}
      >
        Regional Skincare &amp; Climate Guides
      </h3>
      <p
        style={{
          fontSize: "0.85rem",
          color: "#6b6560",
          marginBottom: "1.5rem",
        }}
      >
        Select your city and primary skin concern for a customized climate intelligence analysis.
      </p>

      {/* Interactive Select Controls */}
      <div
        style={{
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
          flexWrap: "wrap",
          marginBottom: "1.5rem",
        }}
      >
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          style={{
            padding: "0.75rem 1.2rem",
            borderRadius: "8px",
            border: "1px solid var(--dash-border, #ded7cf)",
            background: "var(--dash-bg, #fff)",
            color: "var(--dash-ink, #111)",
            outline: "none",
            fontSize: "0.85rem",
            minWidth: "200px",
            fontFamily: "var(--font-dm-sans), sans-serif",
          }}
        >
          <option value="" style={{ background: "var(--dash-bg, #fff)", color: "var(--dash-ink, #111)" }}>Select City</option>
          {citiesList.map((city) => (
            <option key={city.slug} value={city.slug} style={{ background: "var(--dash-bg, #fff)", color: "var(--dash-ink, #111)" }}>
              {city.name}
            </option>
          ))}
        </select>

        <select
          value={selectedConcern}
          onChange={(e) => setSelectedConcern(e.target.value)}
          style={{
            padding: "0.75rem 1.2rem",
            borderRadius: "8px",
            border: "1px solid var(--dash-border, #ded7cf)",
            background: "var(--dash-bg, #fff)",
            color: "var(--dash-ink, #111)",
            outline: "none",
            fontSize: "0.85rem",
            minWidth: "200px",
            fontFamily: "var(--font-dm-sans), sans-serif",
          }}
        >
          <option value="" style={{ background: "var(--dash-bg, #fff)", color: "var(--dash-ink, #111)" }}>Select Concern</option>
          {CONCERNS.map((concern) => (
            <option key={concern.slug} value={concern.slug} style={{ background: "var(--dash-bg, #fff)", color: "var(--dash-ink, #111)" }}>
              {concern.name}
            </option>
          ))}
        </select>

        <button
          onClick={handleNavigate}
          disabled={!selectedCity || !selectedConcern}
          style={{
            background: selectedCity && selectedConcern ? "#fc2779" : "#d1ccc9",
            color: "#fff",
            border: "none",
            padding: "0.75rem 2rem",
            borderRadius: "8px",
            cursor: selectedCity && selectedConcern ? "pointer" : "not-allowed",
            fontSize: "0.85rem",
            fontWeight: 700,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            transition: "all 0.2s ease",
            boxShadow: selectedCity && selectedConcern ? "0 4px 12px rgba(252, 39, 121, 0.15)" : "none",
          }}
        >
          View Guide
        </button>
      </div>

      {/* Crawlable Link Directory for SEO & Accessibility */}
      <div style={{ borderTop: "1px solid var(--dash-border, #eae5df)", paddingTop: "1.25rem", marginTop: "1rem" }}>
        <button
          onClick={() => setShowAllLinks(!showAllLinks)}
          style={{
            background: "none",
            border: "none",
            color: "#8c8179",
            fontSize: "0.8rem",
            fontWeight: 600,
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
          }}
        >
          <span>{showAllLinks ? "Hide Regional Index" : "Browse Popular City Guides"}</span>
          <span>{showAllLinks ? "▲" : "▼"}</span>
        </button>

        {showAllLinks && (
          <div style={{ marginTop: "1.25rem", textAlign: "left" }}>
            {CONCERNS.map((concern) => (
              <div key={concern.slug} style={{ marginBottom: "1.25rem" }}>
                <div style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "#a27b5c", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>
                  {concern.name} Guides by City
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {topCities.map((city) => (
                    <Link
                      key={`${concern.slug}-${city.slug}`}
                      href={`/blog/best-moisturizer-for-${concern.slug}-in-${city.slug}`}
                      style={{
                        padding: "0.3rem 0.65rem",
                        background: "#faf8f5",
                        border: "1px solid #e3ded8",
                        borderRadius: "6px",
                        fontSize: "0.75rem",
                        color: "#4a4540",
                        textDecoration: "none",
                        transition: "all 0.15s ease",
                      }}
                    >
                      {city.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
