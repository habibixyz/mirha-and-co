"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, Copy, RefreshCw } from "lucide-react";

const CATALOG_PRESETS = {
  clean: [
    { id: "MERCHANT-SKU-101", name: "Gentle Hydrating Cleanser", category: "Cleanser", ingredients: ["Squalane", "Glycerin", "EDTA"], price: 24.0 },
    { id: "MERCHANT-SKU-102", name: "Ceramide Barrier Barrier Balm", category: "Moisturizer", ingredients: ["Ceramide NP", "Squalane"], price: 32.0 },
  ],
  clinical: [
    { id: "CLINICAL-001", name: "2% Salicylic Acid BHA Liquid", category: "Treatment", ingredients: ["Salicylic Acid", "Green Tea"], price: 28.0 },
    { id: "CLINICAL-002", name: "Niacinamide 10% + Zinc 1%", category: "Serum", ingredients: ["Niacinamide", "Zinc PCA"], price: 18.0 },
  ],
  minimalist: [
    { id: "MIN-C01", name: "Oats Cleanser 06%", category: "Cleanser", ingredients: ["Oat Extract", "Amino Acids"], price: 12.0 },
    { id: "MIN-M02", name: "Marula Oil 05% Moisturizer", category: "Moisturizer", ingredients: ["Marula Oil", "Vitamin F"], price: 16.0 },
  ],
};

const STEPS = [
  { label: "Set parameters", sub: "Fill in the details" },
  { label: "Send the request", sub: "Hit Send Request" },
  { label: "Copy integration code", sub: "Use it in your app" },
];

export default function B2BDashboardPage() {
  const [apiKey, setApiKey] = useState("b2b_trial_key");
  const [location, setLocation] = useState("London");
  const [skinType, setSkinType] = useState("oily");
  const [mainConcern, setMainConcern] = useState("acne");
  const [catalogJson, setCatalogJson] = useState(
    JSON.stringify(CATALOG_PRESETS.clean, null, 2)
  );

  const [activeCodeTab, setActiveCodeTab] = useState<"cURL" | "Fetch" | "Python" | "React" | "Shopify">("cURL");
  const [loading, setLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState<any>(null);
  const [latency, setLatency] = useState<number | null>(null);

  const [copiedKey, setCopiedKey] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const copy = (text: string, isKey = false) => {
    navigator.clipboard.writeText(text);
    if (isKey) {
      setCopiedKey(true);
      setTimeout(() => setCopiedKey(false), 1500);
    } else {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 1500);
    }
  };

  let parsedCatalog = [];
  try {
    parsedCatalog = JSON.parse(catalogJson);
  } catch {}
  const catalogCount = Array.isArray(parsedCatalog) ? parsedCatalog.length : 0;

  const handleRun = async () => {
    setLoading(true);
    setApiResponse(null);
    setLatency(null);

    const t0 = performance.now();

    try {
      let catalogPayload = [];
      try {
        catalogPayload = JSON.parse(catalogJson);
      } catch (e) {
        setApiResponse({ error: "Invalid JSON catalog payload." });
        setLoading(false);
        return;
      }

      const res = await fetch("/api/v1/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          apiKey,
          postalCode: location,
          skinType,
          mainConcern,
          catalog: catalogPayload,
        }),
      });

      const data = await res.json();
      const t1 = performance.now();
      setLatency(Math.round(t1 - t0));
      setApiResponse(data);
    } catch (err: any) {
      setApiResponse({ error: err.message || "Failed to call API endpoint" });
    } finally {
      setLoading(false);
    }
  };

  const getSnippet = () => {
    switch (activeCodeTab) {
      case "cURL":
        return `curl -X POST "http://localhost:3000/api/v1/recommend" \\
  -H "Content-Type: application/json" \\
  -d '{
    "apiKey": "${apiKey}",
    "postalCode": "${location}",
    "skinType": "${skinType}",
    "mainConcern": "${mainConcern}"
  }'`;
      case "Fetch":
        return `const response = await fetch("http://localhost:3000/api/v1/recommend", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    apiKey: "${apiKey}",
    postalCode: "${location}",
    skinType: "${skinType}",
    mainConcern: "${mainConcern}"
  })
});
const data = await response.json();`;
      case "Python":
        return `import requests

url = "http://localhost:3000/api/v1/recommend"
payload = {
    "apiKey": "${apiKey}",
    "postalCode": "${location}",
    "skinType": "${skinType}",
    "mainConcern": "${mainConcern}"
}
res = requests.post(url, json=payload)
print(res.json())`;
      case "React":
        return `import { useState, useEffect } from 'react';

export function SkincareRecs({ postalCode }) {
  const [recs, setRecs] = useState(null);
  useEffect(() => {
    fetch("http://localhost:3000/api/v1/recommend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ apiKey: "${apiKey}", postalCode, skinType: "${skinType}" })
    }).then(r => r.json()).then(setRecs);
  }, [postalCode]);

  return <div>{recs ? recs.waterTelemetry?.hardnessCategory : "Loading..."}</div>;
}`;
      case "Shopify":
        return `<!-- Shopify Liquid Integration Snippet -->
<script>
  fetch('http://localhost:3000/api/v1/recommend', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      apiKey: '${apiKey}',
      postalCode: '{{ customer.default_address.zip | default: "London" }}',
      skinType: '${skinType}'
    })
  })
  .then(res => res.json())
  .then(data => {
    console.log('Mirha Water Hardness:', data.waterTelemetry);
  });
</script>`;
      default:
        return "";
    }
  };

  return (
    <div className="b2b-dashboard-root" style={{ background: "var(--bg-color)", color: "var(--text-main)", minHeight: "100vh", fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
      
      {/* ── Dynamic Light & Dark Mode CSS System ── */}
      <style>{`
        .b2b-dashboard-root {
          --bg-color: #ffffff;
          --text-main: #1a1a1a;
          --text-muted: #5f6368;
          --text-sub: #8a8f98;
          --card-bg: #ffffff;
          --card-border: #e2e4e8;
          --topbar-bg: #ffffff;
          --topbar-border: #e2e4e8;
          --topbar-accent: #c2185b;
          --banner-bg: #fff8e5;
          --banner-border: #f3d98b;
          --banner-text: #7a5b00;
          --input-bg: #ffffff;
          --input-border: #e2e4e8;
          --input-text: #1a1a1a;
          --code-bg: #0d0d0d;
          --code-text: #7ee787;
        }

        html.dark .b2b-dashboard-root,
        .dark .b2b-dashboard-root,
        [data-theme="dark"] .b2b-dashboard-root {
          --bg-color: #0d0c0b;
          --text-main: #f5f2ed;
          --text-muted: #a39e97;
          --text-sub: #827c75;
          --card-bg: #161514;
          --card-border: rgba(255, 255, 255, 0.12);
          --topbar-bg: #0d0c0b;
          --topbar-border: rgba(255, 255, 255, 0.1);
          --topbar-accent: #f472b6;
          --banner-bg: #261e08;
          --banner-border: #5e480d;
          --banner-text: #fef9c3;
          --input-bg: #1c1b1a;
          --input-border: rgba(255, 255, 255, 0.15);
          --input-text: #f5f2ed;
          --code-bg: #121110;
          --code-text: #7ee787;
        }

        @media (max-width: 900px) {
          .layout {
            grid-template-columns: 1fr !important;
          }
          .row-2 {
            grid-template-columns: 1fr !important;
          }
          .steps {
            flex-direction: column !important;
            gap: 12px !important;
          }
          .hero h1 {
            font-size: 24px !important;
          }
          .hero p {
            font-size: 13px !important;
          }
          .banner {
            margin: 12px 14px 0 !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 6px !important;
          }
        }
      `}</style>

      {/* ── Topbar ── */}
      <div className="topbar" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 28px", borderBottom: "1px solid var(--topbar-border)", fontSize: "13px", color: "var(--text-muted)", background: "var(--topbar-bg)" }}>
        <div>
          <span style={{ color: "var(--topbar-accent)", fontWeight: 700, letterSpacing: "0.02em" }}>B2B API PLAYGROUND</span>
          <span style={{ color: "var(--text-sub)", margin: "0 6px" }}>›</span>
          Try the Skincare Intelligence API — no account needed
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "#1a9c53", fontWeight: 600, fontSize: "12.5px" }}>
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#1a9c53" }} /> Live
          </span>
          <Link href="/b2b" style={{ border: "1px solid var(--card-border)", borderRadius: "6px", padding: "6px 12px", fontSize: "12.5px", background: "var(--card-bg)", color: "var(--text-main)", textDecoration: "none" }}>
            Pricing ⌄
          </Link>
        </div>
      </div>

      {/* ── Banner ── */}
      <div className="banner" style={{ margin: "18px 28px 0", background: "var(--banner-bg)", border: "1px solid var(--banner-border)", color: "var(--banner-text)", padding: "9px 14px", borderRadius: "6px", fontSize: "13px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span>⚠️ Demo — uses shared <code style={{ fontFamily: "monospace", fontWeight: 700 }}>b2b_trial_key</code></span>
        <Link href="/b2b#pricing" style={{ color: "#ec1f6a", fontWeight: 600, textDecoration: "none" }}>
          Get a live key &rarr;
        </Link>
      </div>

      {/* ── Hero ── */}
      <div className="hero" style={{ padding: "24px 28px 0" }}>
        <h1 style={{ margin: 0, fontSize: "30px", fontWeight: 800, letterSpacing: "-0.01em", color: "var(--text-main)" }}>Skincare Recommendation</h1>
        <h1 style={{ margin: "2px 0 0", fontSize: "30px", fontWeight: 800, letterSpacing: "-0.01em", color: "#ec1f6a" }}>API Playground</h1>
        <p style={{ color: "var(--text-muted)", fontSize: "14.5px", maxWidth: "640px", lineHeight: 1.5, marginTop: "10px" }}>
          Send a customer&apos;s location and skin type — get back product recommendations tuned to their local tap water hardness and climate. Plug in your own SKUs to match results to your store.
        </p>
      </div>

      {/* ── Steps ── */}
      <div className="steps" style={{ display: "flex", gap: "36px", margin: "22px 28px 0", borderBottom: "1px solid var(--card-border)", paddingBottom: "14px" }}>
        {STEPS.map((step, i) => (
          <div key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
            <div style={{
              width: "22px", height: "22px", borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "12px", fontWeight: 700, flexShrink: 0,
              background: i === 0 ? "#ec1f6a" : "var(--card-bg)",
              color: i === 0 ? "#fff" : "var(--text-sub)",
              border: i === 0 ? "none" : "1px solid var(--card-border)"
            }}>
              {i + 1}
            </div>
            <div>
              <div style={{ fontSize: "13.5px", fontWeight: 700, color: i === 0 ? "var(--text-main)" : "var(--text-sub)" }}>{step.label}</div>
              <div style={{ fontSize: "11.5px", color: i === 0 ? "var(--text-muted)" : "var(--text-sub)", marginTop: "1px" }}>{step.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Main Layout ── */}
      <div className="layout" style={{ display: "grid", gridTemplateColumns: "1.55fr 1fr", gap: "22px", padding: "22px 28px 40px", alignItems: "start" }}>

        {/* LEFT COLUMN: Request Parameters */}
        <div style={{ border: "1px solid var(--card-border)", borderRadius: "8px", background: "var(--card-bg)", minWidth: 0 }}>
          <div className="panel-head" style={{ padding: "14px 16px", borderBottom: "1px solid var(--card-border)", display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "15px" }}>🧮</span>
            <span style={{ fontWeight: 700, fontSize: "14px", color: "var(--text-main)" }}>Request Parameters</span>
            <span className="panel-desc" style={{ fontSize: "11.5px", color: "var(--text-sub)", marginLeft: "auto", textAlign: "right" }}>Provide customer details to get AI-powered skincare recommendations.</span>
          </div>

          <div style={{ padding: "16px" }}>
            
            {/* API Key */}
            <div style={{ marginBottom: "16px" }}>
              <label style={{ fontSize: "12.5px", fontWeight: 600, display: "flex", alignItems: "center", gap: "5px", marginBottom: "6px", color: "var(--text-main)" }}>
                API Key <span style={{ color: "var(--text-sub)", fontSize: "11px", border: "1px solid var(--card-border)", borderRadius: "50%", width: "13px", height: "13px", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>?</span>
              </label>
              <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                <input
                  type="text"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  style={{ width: "100%", padding: "9px 10px", border: "1px solid var(--input-border)", borderRadius: "6px", fontSize: "13px", color: "var(--input-text)", background: "var(--input-bg)" }}
                />
                <button
                  onClick={() => copy(apiKey, true)}
                  style={{ position: "absolute", right: "8px", background: "none", border: "none", cursor: "pointer", color: "var(--text-sub)" }}
                  title="Copy Key"
                >
                  {copiedKey ? <Check size={14} color="#1a9c53" /> : <Copy size={14} />}
                </button>
              </div>
              <div style={{ fontSize: "11.5px", color: "var(--text-sub)", marginTop: "5px", lineHeight: 1.4 }}>
                Leave as b2b_trial_key to explore for free. Replace with your live key after subscribing.
              </div>
            </div>

            {/* Row 1: Location & Skin Type */}
            <div className="row-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
              <div>
                <label style={{ fontSize: "12.5px", fontWeight: 600, display: "flex", alignItems: "center", gap: "5px", marginBottom: "6px", color: "var(--text-main)" }}>
                  Customer Location <span style={{ color: "var(--text-sub)", fontSize: "11px", border: "1px solid var(--card-border)", borderRadius: "50%", width: "13px", height: "13px", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>?</span>
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  style={{ width: "100%", padding: "9px 10px", border: "1px solid var(--input-border)", borderRadius: "6px", fontSize: "13px", color: "var(--input-text)", background: "var(--input-bg)" }}
                />
                <div style={{ fontSize: "11.5px", color: "var(--text-sub)", marginTop: "5px", lineHeight: 1.4 }}>
                  Used to fetch local tap water hardness (PPM) and live weather conditions.
                </div>
              </div>

              <div>
                <label style={{ fontSize: "12.5px", fontWeight: 600, display: "flex", alignItems: "center", gap: "5px", marginBottom: "6px", color: "var(--text-main)" }}>
                  Skin Type
                </label>
                <select
                  value={skinType}
                  onChange={(e) => setSkinType(e.target.value)}
                  style={{ width: "100%", padding: "9px 10px", border: "1px solid var(--input-border)", borderRadius: "6px", fontSize: "13px", color: "var(--input-text)", background: "var(--input-bg)" }}
                >
                  <option value="oily">Oily</option>
                  <option value="dry">Dry</option>
                  <option value="combination">Combination</option>
                  <option value="sensitive">Sensitive</option>
                </select>
              </div>
            </div>

            {/* Row 2: Concern & Product Catalog */}
            <div className="row-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
              <div>
                <label style={{ fontSize: "12.5px", fontWeight: 600, display: "flex", alignItems: "center", gap: "5px", marginBottom: "6px", color: "var(--text-main)" }}>
                  Main Concern
                </label>
                <select
                  value={mainConcern}
                  onChange={(e) => setMainConcern(e.target.value)}
                  style={{ width: "100%", padding: "9px 10px", border: "1px solid var(--input-border)", borderRadius: "6px", fontSize: "13px", color: "var(--input-text)", background: "var(--input-bg)" }}
                >
                  <option value="acne">Acne</option>
                  <option value="pigmentation">Dark spots</option>
                  <option value="dullness">Dullness</option>
                  <option value="dehydration">Dehydration</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: "12.5px", fontWeight: 600, display: "flex", alignItems: "center", gap: "5px", marginBottom: "6px", color: "var(--text-main)" }}>
                  Your Product Catalog (optional) <span style={{ color: "var(--text-sub)", fontSize: "11px", border: "1px solid var(--card-border)", borderRadius: "50%", width: "13px", height: "13px", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>?</span>
                </label>
                <input
                  type="text"
                  readOnly
                  placeholder="Array — { id, name, category, ingredients, price }"
                  style={{ width: "100%", padding: "9px 10px", border: "1px solid var(--input-border)", borderRadius: "6px", fontSize: "13px", color: "var(--text-sub)", background: "var(--input-bg)" }}
                />
                <div style={{ fontSize: "11.5px", color: "var(--text-sub)", marginTop: "5px", lineHeight: 1.4 }}>
                  Paste your own SKUs and the API recommends from your catalog instead of Mirha&apos;s defaults.
                </div>
              </div>
            </div>

            {/* Catalog JSON Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "6px" }}>
              <label style={{ fontSize: "12.5px", fontWeight: 600, color: "var(--text-main)" }}>Catalog Payload (JSON)</label>
              <span style={{ fontSize: "11px", color: "var(--text-sub)" }}>{catalogCount} SKUs</span>
            </div>

            <div style={{ fontSize: "11.5px", color: "var(--text-sub)", marginBottom: "8px" }}>
              Load example: 
              {(["clean", "clinical", "minimalist"] as const).map((p) => (
                <span
                  key={p}
                  onClick={() => setCatalogJson(JSON.stringify(CATALOG_PRESETS[p], null, 2))}
                  style={{ color: "#ec1f6a", cursor: "pointer", marginLeft: "6px", fontWeight: 600, textTransform: "capitalize" }}
                >
                  {p}
                </span>
              ))}
            </div>

            {/* Code Editor */}
            <div style={{ background: "var(--code-bg)", borderRadius: "6px", overflow: "hidden", border: "1px solid var(--card-border)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 12px", borderBottom: "1px solid var(--card-border)" }}>
                <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#ff5f57" }} />
                <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#febc2e" }} />
                <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#28c840" }} />
                <span style={{ color: "var(--text-sub)", fontSize: "11.5px", marginLeft: "8px", fontFamily: "ui-monospace, Menlo, monospace" }}>catalog_payload.json</span>
              </div>
              <textarea
                rows={8}
                value={catalogJson}
                onChange={(e) => setCatalogJson(e.target.value)}
                style={{
                  width: "100%", margin: 0, padding: "14px 16px",
                  fontFamily: "ui-monospace, Menlo, Consolas, monospace",
                  fontSize: "12.5px", lineHeight: "1.65",
                  maxHeight: "190px", overflowY: "auto",
                  color: "#7ee787", background: "transparent", border: "none", resize: "vertical"
                }}
              />
            </div>

            <button
              onClick={handleRun}
              disabled={loading}
              style={{
                marginTop: "16px", width: "100%", background: "#ec1f6a",
                color: "#fff", border: "none", borderRadius: "7px",
                padding: "12px", fontSize: "14px", fontWeight: 700,
                cursor: "pointer", display: "flex", alignItems: "center",
                justifyContent: "center", gap: "8px"
              }}
            >
              {loading ? <RefreshCw className="animate-spin" size={16} /> : "▶ Send Request"}
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Response + Integration code */}
        <div style={{ display: "flex", flexDirection: "column", gap: "22px", minWidth: 0 }}>
          
          {/* API Response Panel */}
          <div style={{ border: "1px solid var(--card-border)", borderRadius: "8px", background: "var(--card-bg)", minWidth: 0 }}>
            <div className="panel-head" style={{ padding: "14px 16px", borderBottom: "1px solid var(--card-border)", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "15px" }}>＜／＞</span>
              <span style={{ fontWeight: 700, fontSize: "14px", color: "var(--text-main)" }}>API Response</span>
              {latency !== null && (
                <span style={{ marginLeft: "auto", fontSize: "11px", fontWeight: 700, color: "#1a9c53" }}>
                  {latency}ms
                </span>
              )}
            </div>
            {!apiResponse ? (
              <div style={{ padding: "36px 20px", textAlign: "center", color: "var(--text-sub)" }}>
                <div style={{ fontWeight: 700, fontSize: "13.5px", color: "var(--text-main)", marginBottom: "4px" }}>Response will appear here</div>
                <div style={{ fontSize: "12px" }}>Fill in the parameters and click &quot;Send Request&quot;.</div>
              </div>
            ) : (
              <div style={{ padding: "16px" }}>
                <pre style={{ margin: 0, fontFamily: "ui-monospace, Menlo, monospace", fontSize: "12px", color: "#1a9c53", overflowX: "auto", whiteSpace: "pre-wrap" }}>
                  {JSON.stringify(apiResponse, null, 2)}
                </pre>
              </div>
            )}
          </div>

          {/* Integration Code Panel */}
          <div style={{ border: "1px solid var(--card-border)", borderRadius: "8px", background: "var(--card-bg)", minWidth: 0 }}>
            <div className="panel-head" style={{ padding: "14px 16px", borderBottom: "1px solid var(--card-border)", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "15px" }}>＜／＞</span>
              <span style={{ fontWeight: 700, fontSize: "14px", color: "var(--text-main)" }}>Integration Code</span>
              
              <div className="tabs-bar" style={{ display: "flex", gap: "14px", marginLeft: "auto", fontSize: "11.5px", color: "var(--text-sub)" }}>
                {(["cURL", "Fetch", "Python", "React", "Shopify"] as const).map((tab) => (
                  <span
                    key={tab}
                    onClick={() => setActiveCodeTab(tab)}
                    style={{ cursor: "pointer", color: activeCodeTab === tab ? "#ec1f6a" : "var(--text-sub)", fontWeight: activeCodeTab === tab ? 700 : 400 }}
                  >
                    {tab}
                  </span>
                ))}
              </div>

              <span
                onClick={() => copy(getSnippet() ?? "")}
                style={{ color: "var(--text-sub)", fontSize: "11.5px", cursor: "pointer", marginLeft: "10px" }}
              >
                {copiedCode ? "✓ Copied" : "⧉ Copy"}
              </span>
            </div>

            <div style={{ background: "var(--code-bg)", borderRadius: "0 0 8px 8px", overflow: "hidden" }}>
              <pre style={{ margin: 0, padding: "14px 16px", fontFamily: "ui-monospace, Menlo, Consolas, monospace", fontSize: "12.5px", lineHeight: 1.65, color: "#7ee787", overflowX: "auto", whiteSpace: "pre" }}>
                <code>{getSnippet()}</code>
              </pre>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
