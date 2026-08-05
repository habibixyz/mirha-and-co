"use client";

import { useState } from "react";
import { Locale, LANGUAGE_NAMES } from "@/lib/globalization";
import { Check, Loader2, Star } from "lucide-react";

interface AiProductTranslatorProps {
  description: string;
  bestFor: string[];
  avoidIf: string[];
  usage: string;
  ingredients: string[];
  locale: Locale;
  mirhaNotes: string;
}

export default function AiProductTranslator({
  description,
  bestFor,
  avoidIf,
  usage,
  ingredients,
  locale,
  mirhaNotes,
}: AiProductTranslatorProps) {
  const [translatedData, setTranslatedData] = useState<{
    description: string;
    bestFor: string[];
    avoidIf: string[];
    usage: string;
    ingredients: string[];
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTranslate = async () => {
    setIsLoading(true);
    setError(null);
    const dataToTranslate = { description, bestFor, avoidIf, usage, ingredients };
    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: JSON.stringify(dataToTranslate),
          targetLanguage: LANGUAGE_NAMES[locale],
        }),
      });
      if (!response.ok) throw new Error("Failed to translate details");
      const resBody = await response.json();
      const parsed = JSON.parse(resBody.translation);
      setTranslatedData({
        description: parsed.description || description,
        bestFor: Array.isArray(parsed.bestFor) ? parsed.bestFor : bestFor,
        avoidIf: Array.isArray(parsed.avoidIf) ? parsed.avoidIf : avoidIf,
        usage: parsed.usage || usage,
        ingredients: Array.isArray(parsed.ingredients) ? parsed.ingredients : ingredients,
      });
    } catch (err: any) {
      console.error(err);
      setError("AI Translation failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const isTranslated = !!translatedData;
  const isEnglish = locale === "en";

  const activeDesc = translatedData?.description || description;
  const activeBestFor = translatedData?.bestFor || bestFor;
  const activeAvoidIf = translatedData?.avoidIf || avoidIf;
  const activeUsage = translatedData?.usage || usage;
  const activeIngredients = translatedData?.ingredients || ingredients;

  /* ─── Icon helpers ──────────────────────────────────────────── */
  const TickItem = ({ text }: { text: string }) => (
    <li style={{ display: "flex", alignItems: "flex-start", gap: "8px", listStyle: "none", marginBottom: "6px" }}>
      <span style={{ color: "#2d8a5c", flexShrink: 0, marginTop: "2px" }}>✓</span>
      <span>{text}</span>
    </li>
  );
  const WarnItem = ({ text }: { text: string }) => (
    <li style={{ display: "flex", alignItems: "flex-start", gap: "8px", listStyle: "none", marginBottom: "6px" }}>
      <span style={{ color: "#fc2779", flexShrink: 0, marginTop: "2px" }}>✕</span>
      <span>{text}</span>
    </li>
  );
  const DotItem = ({ text }: { text: string }) => (
    <li style={{ display: "flex", alignItems: "flex-start", gap: "8px", listStyle: "none", marginBottom: "6px" }}>
      <span style={{ color: "#968a80", flexShrink: 0, marginTop: "3px", fontSize: "10px" }}>●</span>
      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "12.5px", letterSpacing: "0.01em" }}>{text}</span>
    </li>
  );

  if (isEnglish) {
    return (
      <>
        <p className="description">{description}</p>

        {/* Row 1 — Best For + Avoid If */}
        <section className="info-grid">
          <div className="info-block">
            <h2>Best For</h2>
            {bestFor.length ? (
              <ul style={{ padding: 0, margin: 0 }}>
                {bestFor.map((item) => <TickItem key={item} text={item} />)}
              </ul>
            ) : (
              <p>Suitable for general skin care needs. Check your skin type match.</p>
            )}
          </div>

          <div className="info-block">
            <h2>Avoid If</h2>
            {avoidIf.length ? (
              <ul style={{ padding: 0, margin: 0 }}>
                {avoidIf.map((item) => <WarnItem key={item} text={item} />)}
              </ul>
            ) : (
              <ul style={{ padding: 0, margin: 0 }}>
                <WarnItem text="Patch test first if skin is reactive or compromised" />
              </ul>
            )}
          </div>

          <div className="info-block">
            <h2>How To Use</h2>
            <p style={{ lineHeight: 1.75 }}>{usage}</p>
          </div>

          <div className="info-block">
            <h2>Mirha Notes</h2>
            <p style={{ lineHeight: 1.75 }}>{mirhaNotes}</p>
          </div>
        </section>

        {/* Row 2 — Ingredients */}
        {ingredients.length > 0 && (
          <section className="info-grid" style={{ marginTop: "14px" }}>
            <div className="info-block">
              <h2>Key Actives</h2>
              <ul style={{ padding: 0, margin: 0 }}>
                {ingredients.map((item) => <DotItem key={item} text={item} />)}
              </ul>
            </div>
          </section>
        )}
      </>
    );
  }

  return (
    <div style={{ marginTop: "14px" }}>
      {/* Translation bar */}
      <div
        className={`ai-translator-bar ${isTranslated ? "translated" : ""}`}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "20px",
          padding: "10px 14px",
          borderRadius: "10px",
          fontSize: "13px",
        }}
      >
        {!isTranslated ? (
          <>
            <span>Translate this page details to {LANGUAGE_NAMES[locale]}?</span>
            <button
              onClick={handleTranslate}
              disabled={isLoading}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                background: "linear-gradient(135deg, #fc2779, #b3392d)",
                color: "#fff",
                border: 0,
                borderRadius: "6px",
                padding: "6px 12px",
                fontSize: "11px",
                fontWeight: 600,
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(252, 39, 121, 0.2)",
                marginLeft: "auto",
                transition: "opacity 0.2s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.opacity = "0.9")}
              onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
            >
              {isLoading ? (
                <><Loader2 size={12} className="animate-spin" />Translating...</>
              ) : (
                <><Star size={12} />Translate with AI ⭐</>
              )}
            </button>
          </>
        ) : (
          <>
            <span className="translated-success" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontWeight: 500 }}>
              <Check size={14} />Translated to {LANGUAGE_NAMES[locale]} with AI
            </span>
            <button
              onClick={() => setTranslatedData(null)}
              className="translator-reset-btn"
              style={{
                background: "transparent",
                border: 0,
                fontSize: "11px",
                cursor: "pointer",
                marginLeft: "auto",
                textDecoration: "underline",
              }}
            >
              Reset to original
            </button>
          </>
        )}
      </div>

      {error && (
        <p style={{ color: "var(--rose)", fontSize: "12px", marginTop: "-12px", marginBottom: "12px" }}>
          {error}
        </p>
      )}

      {isLoading ? (
        <div style={{ display: "grid", gap: "8px", marginBottom: "22px" }}>
          <div className="skeleton-line" style={{ height: "16px", borderRadius: "4px", width: "95%", animation: "pulse 1.5s infinite" }} />
          <div className="skeleton-line" style={{ height: "16px", borderRadius: "4px", width: "90%", animation: "pulse 1.5s infinite" }} />
          <div className="skeleton-line" style={{ height: "16px", borderRadius: "4px", width: "70%", animation: "pulse 1.5s infinite" }} />
        </div>
      ) : (
        <p className="description">{activeDesc}</p>
      )}

      <section className="info-grid">
        <div className="info-block">
          <h2>Best For</h2>
          {isLoading ? (
            <div className="skeleton-line" style={{ height: "40px", borderRadius: "4px", animation: "pulse 1.5s infinite" }} />
          ) : activeBestFor.length ? (
            <ul style={{ padding: 0, margin: 0 }}>
              {activeBestFor.map((item) => <TickItem key={item} text={item} />)}
            </ul>
          ) : (
            <p>Suitable for general skin care needs.</p>
          )}
        </div>

        <div className="info-block">
          <h2>Avoid If</h2>
          {isLoading ? (
            <div className="skeleton-line" style={{ height: "40px", borderRadius: "4px", animation: "pulse 1.5s infinite" }} />
          ) : activeAvoidIf.length ? (
            <ul style={{ padding: 0, margin: 0 }}>
              {activeAvoidIf.map((item) => <WarnItem key={item} text={item} />)}
            </ul>
          ) : (
            <ul style={{ padding: 0, margin: 0 }}>
              <WarnItem text="Patch test first if skin is reactive or compromised" />
            </ul>
          )}
        </div>

        <div className="info-block">
          <h2>How To Use</h2>
          {isLoading ? (
            <div className="skeleton-line" style={{ height: "45px", borderRadius: "4px", animation: "pulse 1.5s infinite" }} />
          ) : (
            <p style={{ lineHeight: 1.75 }}>{activeUsage}</p>
          )}
        </div>

        <div className="info-block">
          <h2>Mirha Notes</h2>
          <p style={{ lineHeight: 1.75 }}>{mirhaNotes}</p>
        </div>
      </section>

      {activeIngredients.length > 0 && (
        <section className="info-grid" style={{ marginTop: "14px" }}>
          <div className="info-block">
            <h2>Key Actives</h2>
            {isLoading ? (
              <div className="skeleton-line" style={{ height: "40px", borderRadius: "4px", animation: "pulse 1.5s infinite" }} />
            ) : (
              <ul style={{ padding: 0, margin: 0 }}>
                {activeIngredients.map((item) => <DotItem key={item} text={item} />)}
              </ul>
            )}
          </div>
        </section>
      )}

      <style>{`
        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 0.3; }
          100% { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}
