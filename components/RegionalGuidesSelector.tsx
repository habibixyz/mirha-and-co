"use client";

import React, { useState } from "react";
import { CITIES, GLOBAL_CITIES, CONCERNS } from "@/lib/programmatic-posts";

export default function RegionalGuidesSelector({ currency = "INR" }: { currency?: string }) {
  const citiesList = currency === "INR" ? CITIES : GLOBAL_CITIES;
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedConcern, setSelectedConcern] = useState("");

  const handleNavigate = () => {
    if (selectedCity && selectedConcern) {
      window.location.href = `/blog/best-moisturizer-for-${selectedConcern}-in-${selectedCity}`;
    }
  };

  return (
    <div
      style={{
        background: "var(--dash-surface, #fff)",
        padding: "2rem 1.5rem",
        borderRadius: "16px",
        border: "1px solid var(--dash-border, #ded7cf)",
        maxWidth: "680px",
        margin: "0 auto 3rem",
        textAlign: "center",
        boxShadow: "0 4px 24px rgba(0,0,0,0.02)",
      }}
    >
      <h3
        style={{
          fontFamily: "var(--font-playfair), serif",
          fontSize: "1.25rem",
          marginBottom: "1.2rem",
          fontWeight: 400,
          color: "var(--dash-ink, #1a1714)",
        }}
      >
        Select Your City &amp; Concern Climate Guide
      </h3>
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
            padding: "0.7rem 1.2rem",
            borderRadius: "8px",
            border: "1px solid var(--dash-border, #ded7cf)",
            background: "var(--dash-bg, #fff)",
            color: "var(--dash-ink, #111)",
            outline: "none",
            fontSize: "0.85rem",
            minWidth: "180px",
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
            padding: "0.7rem 1.2rem",
            borderRadius: "8px",
            border: "1px solid var(--dash-border, #ded7cf)",
            background: "var(--dash-bg, #fff)",
            color: "var(--dash-ink, #111)",
            outline: "none",
            fontSize: "0.85rem",
            minWidth: "180px",
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
      </div>

      <button
        onClick={handleNavigate}
        disabled={!selectedCity || !selectedConcern}
        style={{
          background: selectedCity && selectedConcern ? "#fc2779" : "#d1ccc9",
          color: "#fff",
          border: "none",
          padding: "0.7rem 2.2rem",
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
        View Climate Guide
      </button>
    </div>
  );
}
