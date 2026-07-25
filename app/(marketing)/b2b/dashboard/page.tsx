"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Key, Terminal, Code2, Copy, Check, Play,
  Sparkles, Droplets, ArrowRight, RefreshCw,
  FileJson, Eye, Globe, CloudSun, Flame,
  ChevronRight, HelpCircle, SlidersHorizontal,
} from "lucide-react";

/* ─── Catalog presets ─── */
const CATALOG_PRESETS = {
  clean: [
    { id: "MERCHANT-SKU-101", name: "Oat & Green Tea Purifying Gel Cleanser", category: "cleanser", ingredients: "Aqua, Green Tea Extract, Glycerin, Oat Kernel Extract, Centella Asiatica", price: 19.50 },
    { id: "MERCHANT-SKU-202", name: "Barrier Support Ceramide Cream", category: "moisturiser", ingredients: "Squalane, Ceramide NP, Hyaluronic Acid, Panthenol", price: 26.00 },
  ],
  clinical: [
    { id: "CLINICAL-SKU-11", name: "2% Salicylic Acid Acne Clearing Wash", category: "cleanser", ingredients: "Salicylic Acid, Niacinamide, Zinc PCA, Tea Tree Oil", price: 32.00 },
    { id: "CLINICAL-SKU-22", name: "Multi-Peptide Hydration Shield Gel", category: "moisturiser", ingredients: "Peptides, Hyaluronic Acid, Panthenol, Niacinamide", price: 45.00 },
  ],
  minimalist: [
    { id: "MIN-SKU-01", name: "Ultra Gentle Coco-Glucoside Wash", category: "cleanser", ingredients: "Aqua, Coco-Glucoside, Glycerin", price: 14.00 },
    { id: "MIN-SKU-02", name: "100% Sugarcane Squalane Oil", category: "moisturiser", ingredients: "Squalane Oil", price: 18.00 },
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
  const [catalogJson, setCatalogJson] = useState(JSON.stringify(CATALOG_PRESETS.clean, null, 2));
  const [activeCodeTab, setActiveCodeTab] = useState<"cURL" | "Fetch" | "Python" | "React" | "Shopify">("cURL");
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState<any>(null);
  const [latency, setLatency] = useState<number | null>(null);
  const [baseUrl, setBaseUrl] = useState("http://localhost:3000");

  useEffect(() => {
    setBaseUrl(window.location.origin);
  }, []);

  const handleRun = async () => {
    setLoading(true);
    setApiResponse(null);
    const t0 = performance.now();
    try {
      let catalog = undefined;
      if (catalogJson.trim()) {
        try {
          catalog = JSON.parse(catalogJson);
        } catch {
          alert("Invalid JSON syntax in catalog.");
          setLoading(false);
          return;
        }
      }
      const res = await fetch("/api/v1/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiKey, postalCode: location, skinType, mainConcern, budget: "under_1000", catalog }),
      });
      setLatency(Math.round(performance.now() - t0));
      setApiResponse(await res.json());
    } catch (err: any) {
      setLatency(Math.round(performance.now() - t0));
      setApiResponse({ success: false, error: err.message || "Network error" });
    } finally {
      setLoading(false);
    }
  };

  const getSnippet = () => {
    const url = `${baseUrl}/api/v1/recommend`;
    switch (activeCodeTab) {
      case "cURL":
        return `curl -X POST "${url}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "apiKey": "${apiKey}",
    "postalCode": "${location}",
    "skinType": "${skinType}",
    "mainConcern": "${mainConcern}"
  }'`;
      case "Fetch":
        return `const res = await fetch("${url}", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    apiKey: "${apiKey}",
    postalCode: "${location}",
    skinType: "${skinType}",
    mainConcern: "${mainConcern}"
  })
});
const data = await res.json();`;
      case "Python":
        return `import requests

data = requests.post("${url}", json={
    "apiKey": "${apiKey}",
    "postalCode": "${location}",
    "skinType": "${skinType}",
    "mainConcern": "${mainConcern}"
}).json()`;
      case "React":
        return `import { useEffect, useState } from "react";

export function SkincareRec({ postalCode, skinType }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("${url}", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ apiKey: "${apiKey}", postalCode, skinType, mainConcern: "${mainConcern}" })
    }).then(r => r.json()).then(setData);
  }, [postalCode, skinType]);

  if (!data?.success) return null;
  return <div>{data.recommendation.cleanser.name}</div>;
}`;
      case "Shopify":
        return `<!-- sections/main-product.liquid -->
<div id="mirha-rec"></div>
<script>
  fetch("${url}", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      apiKey: "${apiKey}",
      postalCode: Shopify?.checkout?.shipping_address?.zip || "${location}",
      skinType: "${skinType}",
      mainConcern: "${mainConcern}"
    })
  }).then(r => r.json()).then(d => {
    if (d.success) document.getElementById("mirha-rec").innerText = d.recommendation.cleanser.name;
  });
</script>`;
    }
  };

  const copy = (text: string, isKey = false) => {
    navigator.clipboard.writeText(text ?? "");
    if (isKey) {
      setCopiedKey(true);
      setTimeout(() => setCopiedKey(false), 2000);
    } else {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const catalogCount = (() => {
    try {
      const p = JSON.parse(catalogJson);
      return Array.isArray(p) ? p.length : 0;
    } catch {
      return 0;
    }
  })();

  return (
    <div style={{ background: "#ffffff", color: "#1a1a1a", minHeight: "100vh", fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif', width: "100%", overflowX: "hidden" }}>
      <style>{`
        @media (max-width: 1024px) {
          .layout {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 768px) {
          .layout {
            padding: 14px 14px 30px !important;
            gap: 16px !important;
          }
          .panel-head {
            flex-wrap: wrap !important;
            gap: 4px !important;
          }
          .panel-desc {
            margin-left: 0 !important;
            text-align: left !important;
            width: 100% !important;
          }
          .tabs-bar {
            margin-left: 0 !important;
            width: 100% !important;
            overflow-x: auto !important;
            white-space: nowrap !important;
            padding-top: 6px !important;
          }
          .row-2 {
            grid-template-columns: 1fr !important;
          }
          .steps {
            flex-direction: column !important;
            gap: 12px !important;
            margin: 16px 14px 0 !important;
          }
          .topbar {
            padding: 10px 14px !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 8px !important;
          }
          .hero {
            padding: 16px 14px 0 !important;
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
      <div className="topbar" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 28px", borderBottom: "1px solid #e2e4e8", fontSize: "13px", color: "#5f6368" }}>
        <div>
          <span style={{ color: "#c2185b", fontWeight: 700, letterSpacing: "0.02em" }}>B2B API PLAYGROUND</span>
          <span style={{ color: "#8a8f98", margin: "0 6px" }}>›</span>
          Try the Skincare Intelligence API — no account needed
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "#1a9c53", fontWeight: 600, fontSize: "12.5px" }}>
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#1a9c53" }} /> Live
          </span>
          <Link href="/b2b" style={{ border: "1px solid #e2e4e8", borderRadius: "6px", padding: "6px 12px", fontSize: "12.5px", background: "#fff", color: "#1a1a1a", textDecoration: "none" }}>
            Pricing ⌄
          </Link>
        </div>
      </div>

      {/* ── Banner ── */}
      <div className="banner" style={{ margin: "18px 28px 0", background: "#fff8e5", border: "1px solid #f3d98b", color: "#7a5b00", padding: "9px 14px", borderRadius: "6px", fontSize: "13px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span>⚠️ Demo — uses shared <code style={{ fontFamily: "monospace", fontWeight: 700 }}>b2b_trial_key</code></span>
        <Link href="/b2b#pricing" style={{ color: "#c2185b", fontWeight: 600, textDecoration: "none" }}>
          Get a live key &rarr;
        </Link>
      </div>

      {/* ── Hero ── */}
      <div className="hero" style={{ padding: "24px 28px 0" }}>
        <h1 style={{ margin: 0, fontSize: "30px", fontWeight: 800, letterSpacing: "-0.01em" }}>Skincare Recommendation</h1>
        <h1 style={{ margin: "2px 0 0", fontSize: "30px", fontWeight: 800, letterSpacing: "-0.01em", color: "#ec1f6a" }}>API Playground</h1>
        <p style={{ color: "#5f6368", fontSize: "14.5px", maxWidth: "640px", lineHeight: 1.5, marginTop: "10px" }}>
          Send a customer&apos;s location and skin type — get back product recommendations tuned to their local tap water hardness and climate. Plug in your own SKUs to match results to your store.
        </p>
      </div>

      {/* ── Steps ── */}
      <div className="steps" style={{ display: "flex", gap: "36px", margin: "22px 28px 0", borderBottom: "1px solid #e2e4e8", paddingBottom: "14px" }}>
        {STEPS.map((step, i) => (
          <div key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
            <div style={{
              width: "22px", height: "22px", borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "12px", fontWeight: 700, flexShrink: 0,
              background: i === 0 ? "#ec1f6a" : "#f4f5f7",
              color: i === 0 ? "#fff" : "#8a8f98",
              border: i === 0 ? "none" : "1px solid #e2e4e8"
            }}>
              {i + 1}
            </div>
            <div>
              <div style={{ fontSize: "13.5px", fontWeight: 700, color: i === 0 ? "#1a1a1a" : "#8a8f98" }}>{step.label}</div>
              <div style={{ fontSize: "11.5px", color: i === 0 ? "#5f6368" : "#8a8f98", marginTop: "1px" }}>{step.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Main Layout ── */}
      <div className="layout" style={{ display: "grid", gridTemplateColumns: "1.55fr 1fr", gap: "22px", padding: "22px 28px 40px", alignItems: "start" }}>

        {/* LEFT COLUMN: Request Parameters */}
        <div style={{ border: "1px solid #e2e4e8", borderRadius: "8px", background: "#fff", minWidth: 0 }}>
          <div className="panel-head" style={{ padding: "14px 16px", borderBottom: "1px solid #e2e4e8", display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "15px" }}>🧮</span>
            <span style={{ fontWeight: 700, fontSize: "14px" }}>Request Parameters</span>
            <span className="panel-desc" style={{ fontSize: "11.5px", color: "#8a8f98", marginLeft: "auto", textAlign: "right" }}>Provide customer details to get AI-powered skincare recommendations.</span>
          </div>

          <div style={{ padding: "16px" }}>
            
            {/* API Key */}
            <div style={{ marginBottom: "16px" }}>
              <label style={{ fontSize: "12.5px", fontWeight: 600, display: "flex", alignItems: "center", gap: "5px", marginBottom: "6px" }}>
                API Key <span style={{ color: "#8a8f98", fontSize: "11px", border: "1px solid #d1d5db", borderRadius: "50%", width: "13px", height: "13px", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>?</span>
              </label>
              <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                <input
                  type="text"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  style={{ width: "100%", padding: "9px 10px", border: "1px solid #e2e4e8", borderRadius: "6px", fontSize: "13px", color: "#1a1a1a", background: "#fff" }}
                />
                <button
                  onClick={() => copy(apiKey, true)}
                  style={{ position: "absolute", right: "8px", background: "none", border: "none", cursor: "pointer", color: "#8a8f98" }}
                  title="Copy Key"
                >
                  {copiedKey ? <Check size={14} color="#1a9c53" /> : <Copy size={14} />}
                </button>
              </div>
              <div style={{ fontSize: "11.5px", color: "#8a8f98", marginTop: "5px", lineHeight: 1.4 }}>
                Leave as b2b_trial_key to explore for free. Replace with your live key after subscribing.
              </div>
            </div>

            {/* Row 1: Location & Skin Type */}
            <div className="row-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
              <div>
                <label style={{ fontSize: "12.5px", fontWeight: 600, display: "flex", alignItems: "center", gap: "5px", marginBottom: "6px" }}>
                  Customer Location <span style={{ color: "#8a8f98", fontSize: "11px", border: "1px solid #d1d5db", borderRadius: "50%", width: "13px", height: "13px", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>?</span>
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  style={{ width: "100%", padding: "9px 10px", border: "1px solid #e2e4e8", borderRadius: "6px", fontSize: "13px", color: "#1a1a1a", background: "#fff" }}
                />
                <div style={{ fontSize: "11.5px", color: "#8a8f98", marginTop: "5px", lineHeight: 1.4 }}>
                  Used to fetch local tap water hardness (PPM) and live weather conditions.
                </div>
              </div>

              <div>
                <label style={{ fontSize: "12.5px", fontWeight: 600, display: "flex", alignItems: "center", gap: "5px", marginBottom: "6px" }}>
                  Skin Type
                </label>
                <select
                  value={skinType}
                  onChange={(e) => setSkinType(e.target.value)}
                  style={{ width: "100%", padding: "9px 10px", border: "1px solid #e2e4e8", borderRadius: "6px", fontSize: "13px", color: "#1a1a1a", background: "#fff" }}
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
                <label style={{ fontSize: "12.5px", fontWeight: 600, display: "flex", alignItems: "center", gap: "5px", marginBottom: "6px" }}>
                  Main Concern
                </label>
                <select
                  value={mainConcern}
                  onChange={(e) => setMainConcern(e.target.value)}
                  style={{ width: "100%", padding: "9px 10px", border: "1px solid #e2e4e8", borderRadius: "6px", fontSize: "13px", color: "#1a1a1a", background: "#fff" }}
                >
                  <option value="acne">Acne</option>
                  <option value="pigmentation">Dark spots</option>
                  <option value="dullness">Dullness</option>
                  <option value="dehydration">Dehydration</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: "12.5px", fontWeight: 600, display: "flex", alignItems: "center", gap: "5px", marginBottom: "6px" }}>
                  Your Product Catalog (optional) <span style={{ color: "#8a8f98", fontSize: "11px", border: "1px solid #d1d5db", borderRadius: "50%", width: "13px", height: "13px", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>?</span>
                </label>
                <input
                  type="text"
                  readOnly
                  placeholder="Array — { id, name, category, ingredients, price }"
                  style={{ width: "100%", padding: "9px 10px", border: "1px solid #e2e4e8", borderRadius: "6px", fontSize: "13px", color: "#8a8f98", background: "#fff" }}
                />
                <div style={{ fontSize: "11.5px", color: "#8a8f98", marginTop: "5px", lineHeight: 1.4 }}>
                  Paste your own SKUs and the API recommends from your catalog instead of Mirha&apos;s defaults.
                </div>
              </div>
            </div>

            {/* Catalog JSON Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "6px" }}>
              <label style={{ fontSize: "12.5px", fontWeight: 600 }}>Catalog Payload (JSON)</label>
              <span style={{ fontSize: "11px", color: "#8a8f98" }}>{catalogCount} SKUs</span>
            </div>

            <div style={{ fontSize: "11.5px", color: "#8a8f98", marginBottom: "8px" }}>
              Load example: 
              {(["clean", "clinical", "minimalist"] as const).map((p) => (
                <span
                  key={p}
                  onClick={() => setCatalogJson(JSON.stringify(CATALOG_PRESETS[p], null, 2))}
                  style={{ color: "#c2185b", cursor: "pointer", marginLeft: "6px", fontWeight: 600, textTransform: "capitalize" }}
                >
                  {p}
                </span>
              ))}
            </div>

            {/* Code Editor */}
            <div style={{ background: "#0d0d0d", borderRadius: "6px", overflow: "hidden", border: "1px solid #262626" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 12px", borderBottom: "1px solid #262626" }}>
                <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#ff5f57" }} />
                <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#febc2e" }} />
                <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#28c840" }} />
                <span style={{ color: "#8a8f98", fontSize: "11.5px", marginLeft: "8px", fontFamily: "ui-monospace, Menlo, monospace" }}>catalog_payload.json</span>
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
          <div style={{ border: "1px solid #e2e4e8", borderRadius: "8px", background: "#fff", minWidth: 0 }}>
            <div className="panel-head" style={{ padding: "14px 16px", borderBottom: "1px solid #e2e4e8", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "15px" }}>＜／＞</span>
              <span style={{ fontWeight: 700, fontSize: "14px" }}>API Response</span>
              {latency !== null && (
                <span style={{ marginLeft: "auto", fontSize: "11px", fontWeight: 700, color: "#1a9c53" }}>
                  {latency}ms
                </span>
              )}
            </div>
            {!apiResponse ? (
              <div style={{ padding: "36px 20px", textAlign: "center", color: "#8a8f98" }}>
                <div style={{ fontWeight: 700, fontSize: "13.5px", color: "#1a1a1a", marginBottom: "4px" }}>Response will appear here</div>
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
          <div style={{ border: "1px solid #e2e4e8", borderRadius: "8px", background: "#fff", minWidth: 0 }}>
            <div className="panel-head" style={{ padding: "14px 16px", borderBottom: "1px solid #e2e4e8", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "15px" }}>＜／＞</span>
              <span style={{ fontWeight: 700, fontSize: "14px" }}>Integration Code</span>
              
              <div className="tabs-bar" style={{ display: "flex", gap: "14px", marginLeft: "auto", fontSize: "11.5px", color: "#8a8f98" }}>
                {(["cURL", "Fetch", "Python", "React", "Shopify"] as const).map((tab) => (
                  <span
                    key={tab}
                    onClick={() => setActiveCodeTab(tab)}
                    style={{ cursor: "pointer", color: activeCodeTab === tab ? "#c2185b" : "#8a8f98", fontWeight: activeCodeTab === tab ? 700 : 400 }}
                  >
                    {tab}
                  </span>
                ))}
              </div>

              <span
                onClick={() => copy(getSnippet() ?? "")}
                style={{ color: "#8a8f98", fontSize: "11.5px", cursor: "pointer", marginLeft: "10px" }}
              >
                {copiedCode ? "✓ Copied" : "⧉ Copy"}
              </span>
            </div>

            <div style={{ background: "#0d0d0d", borderRadius: "0 0 8px 8px", overflow: "hidden" }}>
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
