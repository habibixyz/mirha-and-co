"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Check, Copy, RefreshCw, KeyRound, Mail, AlertCircle, ChevronDown, ChevronUp } from "lucide-react";
import { B2BApiSandbox } from "@/components/B2BApiSandbox";

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

interface KeyDetails {
  tier: string;
  monthlyQuota: number;
  usageThisMonth: number;
  brandName: string;
  quotaResetAt: string;
  allowedOrigins?: string;
}

export default function B2BDashboardPage() {
  const searchParams = useSearchParams();
  const isWelcome = searchParams.get("welcome") === "true";

  const [showWelcome, setShowWelcome] = useState(false);
  const [apiKey, setApiKey] = useState("b2b_trial_key");
  const [keyDetails, setKeyDetails] = useState<KeyDetails | null>(null);
  const [isLiveKey, setIsLiveKey] = useState(false);

  // B2B Advanced Features States
  const [allowedOrigins, setAllowedOrigins] = useState("*");
  const [updatingOrigins, setUpdatingOrigins] = useState(false);
  const [updateOriginsSuccess, setUpdateOriginsSuccess] = useState(false);
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);

  // Key retrieval state
  const [lookupEmail, setLookupEmail] = useState("");
  const [isLookingUp, setIsLookingUp] = useState(false);
  const [lookupError, setLookupError] = useState<string | null>(null);
  const [showRetrieveForm, setShowRetrieveForm] = useState(false);

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

  // ── Key lookup helper ──────────────────────────────────────────────────────
  const lookupKey = useCallback(async (email: string) => {
    setIsLookingUp(true);
    setLookupError(null);
    try {
      const res = await fetch("/api/b2b/lookup-key", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.found) {
        setApiKey(data.apiKey);
        setIsLiveKey(true);
        setKeyDetails({
          tier: data.tier,
          monthlyQuota: data.monthlyQuota,
          usageThisMonth: data.usageThisMonth,
          brandName: data.brandName,
          quotaResetAt: data.quotaResetAt,
          allowedOrigins: data.allowedOrigins || "*",
        });
        setLookupError(null);
        setShowRetrieveForm(false);
        return true;
      } else {
        setLookupError(data.hint || "No active key found. Check your inbox or contact support.");
        return false;
      }
    } catch {
      setLookupError("Lookup failed. Please try again.");
      return false;
    } finally {
      setIsLookingUp(false);
    }
  }, []);

  // Sync allowedOrigins when keyDetails changes
  useEffect(() => {
    if (keyDetails?.allowedOrigins) {
      setAllowedOrigins(keyDetails.allowedOrigins);
    }
  }, [keyDetails]);

  // Fetch B2B analytics when apiKey changes
  useEffect(() => {
    if (!apiKey) return;
    setLoadingAnalytics(true);
    fetch(`/api/v1/analytics?apiKey=${apiKey}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setAnalyticsData(data.analytics);
        } else {
          setAnalyticsData(null);
        }
      })
      .catch(() => setAnalyticsData(null))
      .finally(() => setLoadingAnalytics(false));
  }, [apiKey]);

  const handleUpdateOrigins = async () => {
    if (apiKey === "b2b_trial_key") return;
    setUpdatingOrigins(true);
    setUpdateOriginsSuccess(false);
    try {
      const res = await fetch("/api/b2b/update-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiKey, allowedOrigins }),
      });
      const data = await res.json();
      if (data.success) {
        setUpdateOriginsSuccess(true);
        setTimeout(() => setUpdateOriginsSuccess(false), 2000);
        setKeyDetails(prev => prev ? { ...prev, allowedOrigins: data.allowedOrigins } : null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingOrigins(false);
    }
  };

  // ── On mount: restore welcome state & auto-lookup key ──────────────────────
  useEffect(() => {
    const storedWelcome = sessionStorage.getItem("b2b_welcome_active");

    if (isWelcome || storedWelcome === "true") {
      setShowWelcome(true);
      // Persist so refresh doesn't clear the banner
      sessionStorage.setItem("b2b_welcome_active", "true");
    }

    // Auto-retrieve key from email stored before checkout redirect
    const pendingEmail = sessionStorage.getItem("b2b_checkout_email");
    if (pendingEmail && (isWelcome || storedWelcome === "true")) {
      setLookupEmail(pendingEmail);
      lookupKey(pendingEmail).then((found) => {
        if (found) {
          // Consume the stored email only after successful retrieval
          sessionStorage.removeItem("b2b_checkout_email");
        }
      });
    }
  }, [isWelcome, lookupKey]);

  const handleManualLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lookupEmail.trim()) return;
    await lookupKey(lookupEmail.trim());
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
        return `curl -X POST "https://www.mirhaandco.com/api/v1/recommend" \\
  -H "Content-Type: application/json" \\
  -d '{
    "apiKey": "${apiKey}",
    "postalCode": "${location}",
    "skinType": "${skinType}",
    "mainConcern": "${mainConcern}",

    // Optional: pass your own product catalog for SKU-matched results.
    // Replace these with your real product IDs, names, ingredients & prices.
    // The API scores each item against local water hardness + climate and
    // returns the best-matched products for this shopper's location.
    "catalog": [
      { "id": "YOUR-SKU-001", "name": "Your Cleanser",    "ingredients": ["Salicylic Acid", "Niacinamide"], "price": 18.00 },
      { "id": "YOUR-SKU-002", "name": "Your Moisturiser", "ingredients": ["Ceramide", "Hyaluronic Acid"],   "price": 24.00 },
      { "id": "YOUR-SKU-003", "name": "Your Serum",       "ingredients": ["Vitamin C", "Ferulic Acid"],     "price": 32.00 }
    ]
  }'`;
      case "Fetch":
        return `const response = await fetch("https://www.mirhaandco.com/api/v1/recommend", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    apiKey: "${apiKey}",
    postalCode: "${location}",
    skinType: "${skinType}",
    mainConcern: "${mainConcern}",

    // Optional: pass your own product catalog for SKU-level matching.
    // The API scores your products against local water hardness + climate
    // and returns the best-matched items. Use your own IDs — any format works.
    catalog: [
      { id: "YOUR-SKU-001", name: "Your Cleanser",    ingredients: ["Salicylic Acid", "Niacinamide"], price: 18.00 },
      { id: "YOUR-SKU-002", name: "Your Moisturiser", ingredients: ["Ceramide", "Hyaluronic Acid"],   price: 24.00 },
      { id: "YOUR-SKU-003", name: "Your Serum",       ingredients: ["Vitamin C", "Ferulic Acid"],     price: 32.00 },
    ]
  })
});

const data = await response.json();
// data.recommendation   → matched routine (cleanser, moisturiser, serum…)
// data.diagnostics      → waterHardnessPpm, temperatureC, humidityPercent
// data.quota.remaining  → how many API calls you have left this month`;
      case "Python":
        return `import requests

url = "https://www.mirhaandco.com/api/v1/recommend"
payload = {
    "apiKey": "${apiKey}",
    "postalCode": "${location}",
    "skinType": "${skinType}",
    "mainConcern": "${mainConcern}",

    # Optional: your own product catalog for SKU-level matching.
    # Replace with your real inventory — any product ID format works.
    "catalog": [
        { "id": "YOUR-SKU-001", "name": "Your Cleanser",    "ingredients": ["Salicylic Acid", "Niacinamide"], "price": 18.00 },
        { "id": "YOUR-SKU-002", "name": "Your Moisturiser", "ingredients": ["Ceramide", "Hyaluronic Acid"],   "price": 24.00 },
        { "id": "YOUR-SKU-003", "name": "Your Serum",       "ingredients": ["Vitamin C", "Ferulic Acid"],     "price": 32.00 },
    ]
}

res = requests.post(url, json=payload)
data = res.json()

print("Recommendation:", data["recommendation"])
print("Water Hardness:", data["diagnostics"]["waterHardnessPpm"], "PPM")
print("Quota remaining:", data["quota"]["remaining"])`;
      case "React":
        return `import { useState, useEffect } from 'react';

// Replace YOUR-SKU-* with your real product IDs.
const MY_CATALOG = [
  { id: "YOUR-SKU-001", name: "Your Cleanser",    ingredients: ["Salicylic Acid", "Niacinamide"], price: 18.00 },
  { id: "YOUR-SKU-002", name: "Your Moisturiser", ingredients: ["Ceramide", "Hyaluronic Acid"],   price: 24.00 },
  { id: "YOUR-SKU-003", name: "Your Serum",       ingredients: ["Vitamin C", "Ferulic Acid"],     price: 32.00 },
];

export function SkincareRecs({ postalCode, skinType = "${skinType}" }) {
  const [recs, setRecs] = useState(null);

  useEffect(() => {
    fetch("https://www.mirhaandco.com/api/v1/recommend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        apiKey: "${apiKey}",
        postalCode,
        skinType,
        mainConcern: "${mainConcern}",
        catalog: MY_CATALOG,
      })
    }).then(r => r.json()).then(setRecs);
  }, [postalCode, skinType]);

  if (!recs) return <div>Loading recommendations...</div>;
  return (
    <div>
      <p>Water: {recs.diagnostics?.waterHardnessCategory} ({recs.diagnostics?.waterHardnessPpm} PPM)</p>
      <p>Top pick: {recs.recommendation?.cleanser?.name}</p>
    </div>
  );
}`;
      case "Shopify":
        return `<!-- Mirha & Co. Skincare Intelligence API — Shopify Liquid Snippet -->
<!-- Drop this into theme.liquid or your product page template.        -->
<!-- Replace YOUR-PRODUCT-* with your real Shopify product handles.   -->
<script>
  const myProductCatalog = [
    { id: "YOUR-PRODUCT-001", name: "Your Cleanser",    ingredients: ["Salicylic Acid"], price: 18.00 },
    { id: "YOUR-PRODUCT-002", name: "Your Moisturiser", ingredients: ["Ceramide"],       price: 24.00 },
    { id: "YOUR-PRODUCT-003", name: "Your Serum",       ingredients: ["Vitamin C"],      price: 32.00 },
  ];

  fetch('https://www.mirhaandco.com/api/v1/recommend', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      apiKey: '${apiKey}',
      postalCode: '{{ customer.default_address.zip | default: "${location}" }}',
      skinType: '${skinType}',
      mainConcern: '${mainConcern}',
      catalog: myProductCatalog,
    })
  })
  .then(res => res.json())
  .then(data => {
    // data.recommendation.cleanser → best-matched cleanser from your catalog
    // data.diagnostics.waterHardnessPpm → local water hardness in PPM
    console.log('Top recommendation:', data.recommendation?.cleanser?.name);
    console.log('Water hardness:', data.diagnostics?.waterHardnessPpm, 'PPM');
  });
</script>`;
      default:
        return "";
    }
  };

  const usagePct = keyDetails
    ? Math.min(100, Math.round((keyDetails.usageThisMonth / keyDetails.monthlyQuota) * 100))
    : 0;

  return (
    <div style={{ background: "var(--dbd-bg)", color: "var(--dbd-text)", minHeight: "100vh", fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>

      {/* ── CSS Variables exactly matching user HTML spec ── */}
      <style>{`
        :root {
          --dbd-pink: #ec1f6a;
          --dbd-pink-dark: #ff2d78;
          --dbd-bg: #0b0b0e;
          --dbd-panel: #131318;
          --dbd-panel-alt: #0f0f13;
          --dbd-border: #26262e;
          --dbd-text: #e9e9ee;
          --dbd-text-dim: #9a9aa5;
          --dbd-text-faint: #5c5c66;
          --dbd-green: #3ddc84;
          --dbd-blue: #79c0ff;
          --dbd-yellow: #e3b341;
          --dbd-amber-bg: #3a2a05;
          --dbd-amber-border: #6b4e08;
          --dbd-amber-ink: #f0b90b;
          --dbd-code-bg: #0b0b0e;
        }
        html.dark, [data-theme="dark"] {
          --dbd-bg: #0b0b0e;
          --dbd-panel: #131318;
          --dbd-panel-alt: #0f0f13;
          --dbd-border: #26262e;
          --dbd-text: #e9e9ee;
          --dbd-text-dim: #9a9aa5;
          --dbd-text-faint: #5c5c66;
        }
        html:not(.dark) {
          --dbd-bg: #f5f6f8;
          --dbd-panel: #ffffff;
          --dbd-panel-alt: #f0f1f3;
          --dbd-border: #e2e4e8;
          --dbd-text: #1a1a1a;
          --dbd-text-dim: #5a5f6e;
          --dbd-text-faint: #9aa0b0;
          --dbd-code-bg: #0b0b0e;
        }
        .dbd-key-reveal { animation: dbd-slide-in 0.35s cubic-bezier(0.16,1,0.3,1); }
        @keyframes dbd-slide-in { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
        .dbd-lookup-btn:hover { opacity: 0.88; }
        .dbd-lookup-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        /* ── Responsive: Tablet (≤1024px) ── */
        @media (max-width: 1024px) {
          .dbd-outer-pad { padding-left: 18px !important; padding-right: 18px !important; }
          .dbd-crumb-sub { display: none; }
          .dbd-steps { gap: 20px !important; }
          .dbd-hero h1 { font-size: 24px !important; }
          .dbd-int-tabs { gap: 10px !important; font-size: 11px !important; }
        }

        /* ── Responsive: Mobile (≤640px) ── */
        @media (max-width: 640px) {
          .dbd-outer-pad { padding-left: 12px !important; padding-right: 12px !important; }
          .dbd-crumb-row { flex-direction: column !important; align-items: flex-start !important; gap: 8px !important; }
          .dbd-crumb-sub { display: none; }
          .dbd-crumb-live { align-self: flex-end; }
          .dbd-banner { flex-direction: column !important; align-items: flex-start !important; gap: 8px !important; margin-left: 12px !important; margin-right: 12px !important; }
          .dbd-hero { padding-left: 12px !important; padding-right: 12px !important; }
          .dbd-hero h1 { font-size: 20px !important; line-height: 1.25 !important; }
          .dbd-hero p { font-size: 12.5px !important; }
          .dbd-steps { flex-direction: column !important; gap: 10px !important; margin-left: 12px !important; margin-right: 12px !important; }
          .dbd-sandbox-wrap { margin-left: 12px !important; margin-right: 12px !important; }
          .dbd-int-wrap { margin-left: 12px !important; margin-right: 12px !important; }
          .dbd-int-head { flex-wrap: wrap !important; gap: 8px !important; }
          .dbd-int-tabs { gap: 8px !important; margin-left: 0 !important; }
          .dbd-int-body { font-size: 11px !important; overflow-x: auto !important; }
          .dbd-int-body pre { min-width: 500px; }
        }
      `}</style>

      {/* ── Crumb / Top Row ── */}
      <div className="dbd-crumb-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 28px", fontSize: "12px", color: "var(--dbd-text-dim)", borderBottom: "1px solid var(--dbd-border)" }}>
        <div>
          <b style={{ color: "var(--dbd-pink)" }}>B2B API PLAYGROUND</b>
          <span className="dbd-crumb-sub" style={{ margin: "0 8px" }}>›</span>
          <span className="dbd-crumb-sub">Try the Skincare Intelligence API — no account needed</span>
        </div>
        <div className="dbd-crumb-live" style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span style={{ color: "var(--dbd-green)", fontWeight: 700, display: "flex", alignItems: "center", gap: "5px", fontSize: "12px" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--dbd-green)", display: "inline-block" }} />
            Live
          </span>
          <Link href="/b2b" style={{ border: "1px solid var(--dbd-border)", borderRadius: "6px", padding: "5px 12px", fontSize: "11.5px", color: "var(--dbd-text-dim)", textDecoration: "none" }}>
            Pricing ⌄
          </Link>
        </div>
      </div>

      {/* ── Trial key banner ── */}
      {!isLiveKey && (
        <div className="dbd-banner" style={{ margin: "0 28px", marginTop: "16px", background: "var(--dbd-amber-bg)", border: "1px solid var(--dbd-amber-border)", color: "var(--dbd-amber-ink)", padding: "9px 14px", borderRadius: "6px", fontSize: "12.5px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>⚠️ Demo — uses shared <code style={{ fontFamily: "monospace" }}>b2b_trial_key</code></span>
          <Link href="/b2b#pricing" style={{ color: "#ffdb70", fontWeight: 700, textDecoration: "none" }}>Get a live key →</Link>
        </div>
      )}

      {/* ── Welcome / Key reveal banner ── */}
      {showWelcome && (
        <div className="dbd-key-reveal" style={{ margin: "12px 28px 0", background: "linear-gradient(135deg, #0b1f14 0%, #0d2818 100%)", border: "1px solid #22c55e", borderRadius: "10px", overflow: "hidden" }}>
          <div style={{ padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Check size={18} style={{ color: "#22c55e", flexShrink: 0 }} />
              <div style={{ fontSize: "13.5px" }}>
                <strong style={{ color: "#4ade80" }}>Payment successful!</strong>{" "}
                {isLiveKey
                  ? <span style={{ color: "#86efac" }}>Your API key has been loaded below and is ready to use.</span>
                  : isLookingUp
                  ? <span style={{ color: "#86efac" }}>Retrieving your API key…</span>
                  : <span style={{ color: "#86efac" }}>Your key has been emailed — paste it below or retrieve it here.</span>
                }
              </div>
            </div>
            <button onClick={() => { setShowWelcome(false); sessionStorage.removeItem("b2b_welcome_active"); }}
              style={{ background: "none", border: "none", color: "#86efac", cursor: "pointer", fontSize: "18px", padding: "0 4px" }}>×</button>
          </div>
          {isLiveKey && keyDetails && (
            <div style={{ padding: "0 18px 16px" }}>
              <div style={{ background: "rgba(0,0,0,0.35)", border: "1px solid rgba(34,197,94,0.3)", borderRadius: "8px", padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", marginBottom: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: 0 }}>
                  <KeyRound size={15} style={{ color: "#4ade80", flexShrink: 0 }} />
                  <code style={{ fontFamily: "ui-monospace, Menlo, monospace", fontSize: "12.5px", color: "#4ade80", wordBreak: "break-all" }}>{apiKey}</code>
                </div>
                <button onClick={() => copy(apiKey, true)}
                  style={{ background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.3)", borderRadius: "6px", padding: "6px 12px", color: "#4ade80", cursor: "pointer", fontSize: "12px", fontWeight: 600, flexShrink: 0, display: "flex", alignItems: "center", gap: "5px" }}>
                  {copiedKey ? <><Check size={12} /> Copied</> : <><Copy size={12} /> Copy Key</>}
                </button>
              </div>
              <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                <div style={{ fontSize: "12px", color: "#86efac" }}>
                  <span style={{ color: "#6ee7b7", fontWeight: 700 }}>{keyDetails.brandName}</span>{" · "}
                  <span style={{ textTransform: "capitalize" }}>{keyDetails.tier}</span> tier
                </div>
                <div style={{ fontSize: "12px", color: "#86efac" }}>
                  Quota: <span style={{ fontWeight: 700, color: "#4ade80" }}>{keyDetails.usageThisMonth.toLocaleString()}</span>{" / "}{keyDetails.monthlyQuota.toLocaleString()} calls this month
                </div>
                <div style={{ fontSize: "12px", color: "#86efac" }}>
                  Resets: {new Date(keyDetails.quotaResetAt).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                </div>
              </div>
              <div style={{ marginTop: "10px", height: "4px", background: "rgba(0,0,0,0.4)", borderRadius: "99px", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${usagePct}%`, background: "linear-gradient(90deg, #22c55e, #4ade80)", borderRadius: "99px", transition: "width 0.6s ease" }} />
              </div>
            </div>
          )}
          {isLookingUp && (
            <div style={{ padding: "0 18px 16px", display: "flex", alignItems: "center", gap: "8px", color: "#86efac", fontSize: "13px" }}>
              <RefreshCw size={14} className="animate-spin" />
              Fetching your API key from our servers…
            </div>
          )}
        </div>
      )}

      {/* ── Retrieve Key Row ── */}
      <div style={{ margin: "10px 28px 0" }}>
        <button onClick={() => setShowRetrieveForm(v => !v)}
          style={{ display: "flex", alignItems: "center", gap: "6px", background: "none", border: "none", color: "var(--dbd-text-dim)", fontSize: "12px", cursor: "pointer", padding: "4px 0", fontWeight: 500 }}>
          <KeyRound size={13} />
          {showRetrieveForm ? "Hide key retrieval" : "Already a partner? Retrieve your live key →"}
          {showRetrieveForm ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
        </button>
        {showRetrieveForm && (
          <form onSubmit={handleManualLookup} style={{ marginTop: "8px", display: "flex", gap: "8px", alignItems: "flex-start", flexWrap: "wrap" }}>
            <div style={{ position: "relative", flex: "1 1 280px", minWidth: "220px" }}>
              <Mail size={14} style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "var(--dbd-text-faint)", pointerEvents: "none" }} />
              <input type="email" placeholder="your@company.com" value={lookupEmail} onChange={e => setLookupEmail(e.target.value)} required
                style={{ width: "100%", padding: "9px 10px 9px 32px", border: "1px solid var(--dbd-border)", borderRadius: "6px", fontSize: "13px", color: "var(--dbd-text)", background: "var(--dbd-panel)", boxSizing: "border-box" }} />
            </div>
            <button type="submit" disabled={isLookingUp || !lookupEmail.trim()} className="dbd-lookup-btn"
              style={{ background: "var(--dbd-pink)", color: "#fff", border: "none", borderRadius: "6px", padding: "9px 18px", fontSize: "13px", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", flexShrink: 0 }}>
              {isLookingUp ? <RefreshCw size={13} className="animate-spin" /> : <KeyRound size={13} />}
              {isLookingUp ? "Retrieving…" : "Retrieve Key"}
            </button>
            {lookupError && (
              <div style={{ width: "100%", display: "flex", alignItems: "center", gap: "6px", color: "#ef4444", fontSize: "12px", marginTop: "2px" }}>
                <AlertCircle size={13} style={{ flexShrink: 0 }} />{lookupError}
              </div>
            )}
            {isLiveKey && !isLookingUp && (
              <div style={{ width: "100%", display: "flex", alignItems: "center", gap: "6px", color: "#22c55e", fontSize: "12px", marginTop: "2px" }}>
                <Check size={13} style={{ flexShrink: 0 }} /> Key loaded — it&apos;s now set in the API key field below.
              </div>
            )}
          </form>
        )}
      </div>

      {/* ── Hero ── */}
      <div className="dbd-hero dbd-outer-pad" style={{ padding: "22px 28px 0" }}>
        <h1 style={{ margin: 0, fontSize: "28px", fontWeight: 800, lineHeight: 1.2, color: "var(--dbd-text)" }}>
          Skincare Recommendation<br />API Playground
        </h1>
        <p style={{ color: "var(--dbd-text-dim)", fontSize: "13px", maxWidth: "640px", lineHeight: 1.6, marginTop: "12px" }}>
          Send a customer&apos;s location and skin type — get back product recommendations tuned to their local tap water hardness and climate. Plug in your own SKUs to match results to your store.
        </p>
      </div>

      {/* ── Steps ── */}
      <div className="dbd-steps" style={{ display: "flex", gap: "36px", margin: "20px 28px 0", borderBottom: "1px solid var(--dbd-border)", paddingBottom: "14px" }}>
        {STEPS.map((step, i) => (
          <div key={i} style={{ display: "flex", gap: "9px", alignItems: "flex-start" }}>
            <div style={{
              width: "20px", height: "20px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "11px", fontWeight: 700, flexShrink: 0,
              background: i === 0 ? "var(--dbd-pink)" : "transparent",
              color: i === 0 ? "#fff" : "var(--dbd-text-faint)",
              border: i === 0 ? "none" : "1px solid var(--dbd-border)"
            }}>{i + 1}</div>
            <div>
              <div style={{ fontSize: "12.5px", fontWeight: 700, color: i === 0 ? "var(--dbd-text)" : "var(--dbd-text-faint)" }}>{step.label}</div>
              <div style={{ fontSize: "10.5px", color: i === 0 ? "var(--dbd-text-dim)" : "var(--dbd-text-faint)", marginTop: "1px" }}>{step.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Developer Console (live keys only) ── */}
      {isLiveKey && (
        <div style={{ margin: "20px 28px 0", padding: "20px", border: "1px solid var(--dbd-border)", borderRadius: "10px", background: "var(--dbd-panel)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--dbd-border)", paddingBottom: "12px", marginBottom: "16px" }}>
            <div>
              <h2 style={{ margin: 0, fontSize: "15px", fontWeight: 700, color: "var(--dbd-text)", display: "flex", alignItems: "center", gap: "8px" }}>💻 B2B Developer Console</h2>
              <p style={{ margin: "2px 0 0", fontSize: "12px", color: "var(--dbd-text-dim)" }}>Manage your API key security settings and monitor real-time integration usage metrics.</p>
            </div>
            {apiKey !== "b2b_trial_key" && keyDetails && (
              <span style={{ fontSize: "11px", background: "rgba(236,31,106,0.12)", border: "1px solid rgba(236,31,106,0.3)", color: "var(--dbd-pink)", borderRadius: "99px", padding: "2px 10px", fontWeight: 700 }}>
                {keyDetails.tier.toUpperCase()} MEMBER
              </span>
            )}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: apiKey === "b2b_trial_key" ? "1fr" : "1fr 1fr", gap: "24px" }}>
            {apiKey !== "b2b_trial_key" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label style={{ fontSize: "12.5px", fontWeight: 700, color: "var(--dbd-text)", display: "flex", alignItems: "center", gap: "6px" }}>🔒 Domain Whitelisting (CORS)</label>
                <p style={{ margin: 0, fontSize: "11.5px", color: "var(--dbd-text-dim)", lineHeight: 1.45 }}>
                  Secure your key. Restrict it to specific hostnames (comma-separated, e.g. <code>localhost, partner.com</code>). Set to <code>*</code> to disable.
                </p>
                <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
                  <input type="text" value={allowedOrigins} onChange={(e) => setAllowedOrigins(e.target.value)} placeholder="e.g. localhost, partner-site.com"
                    style={{ flex: 1, padding: "8px 10px", border: "1px solid var(--dbd-border)", borderRadius: "6px", fontSize: "12.5px", color: "var(--dbd-text)", background: "var(--dbd-panel)" }} />
                  <button onClick={handleUpdateOrigins} disabled={updatingOrigins}
                    style={{ background: "var(--dbd-pink)", color: "#fff", border: "none", borderRadius: "6px", padding: "8px 14px", fontSize: "12.5px", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}>
                    {updatingOrigins ? <RefreshCw size={13} className="animate-spin" /> : "Save"}
                  </button>
                </div>
                {updateOriginsSuccess && <span style={{ fontSize: "12px", color: "var(--dbd-green)", fontWeight: 600 }}>✓ Settings saved successfully.</span>}
              </div>
            )}
            <div>
              <label style={{ fontSize: "12.5px", fontWeight: 700, color: "var(--dbd-text)", display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>📊 API Usage Insights</label>
              {loadingAnalytics ? (
                <div style={{ fontSize: "12px", color: "var(--dbd-text-dim)", display: "flex", alignItems: "center", gap: "6px" }}><RefreshCw size={12} className="animate-spin" /> Fetching statistics...</div>
              ) : !analyticsData ? (
                <div style={{ fontSize: "12px", color: "var(--dbd-text-dim)" }}>No analytics record found. Make calls below to start tracking.</div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", background: "rgba(0,0,0,0.15)", padding: "8px 12px", borderRadius: "6px" }}>
                    <span style={{ fontSize: "12px", color: "var(--dbd-text-dim)" }}>Total API Queries logged:</span>
                    <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--dbd-pink)" }}>{analyticsData.totalRequests} requests</span>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    <div style={{ border: "1px solid var(--dbd-border)", borderRadius: "6px", padding: "8px" }}>
                      <div style={{ fontSize: "10.5px", fontWeight: 700, color: "var(--dbd-text-faint)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "6px" }}>Skin Types</div>
                      {Object.entries(analyticsData.skinTypes || {}).slice(0, 3).map(([type, val]: any) => (
                        <div key={type} style={{ display: "flex", justifyContent: "space-between", fontSize: "11.5px", margin: "2px 0" }}>
                          <span style={{ textTransform: "capitalize", color: "var(--dbd-text)" }}>{type}</span>
                          <span style={{ fontWeight: 600, color: "var(--dbd-text-dim)" }}>{val}</span>
                        </div>
                      ))}
                    </div>
                    <div style={{ border: "1px solid var(--dbd-border)", borderRadius: "6px", padding: "8px" }}>
                      <div style={{ fontSize: "10.5px", fontWeight: 700, color: "var(--dbd-text-faint)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "6px" }}>Water Hardness</div>
                      {Object.entries(analyticsData.waterHardness || {}).filter(([, val]: any) => val > 0).map(([cat, val]: any) => (
                        <div key={cat} style={{ display: "flex", justifyContent: "space-between", fontSize: "11.5px", margin: "2px 0" }}>
                          <span style={{ textTransform: "capitalize", color: "var(--dbd-text)" }}>{cat}</span>
                          <span style={{ fontWeight: 600, color: "var(--dbd-text-dim)" }}>{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Playground (B2BApiSandbox) ── */}
      <div className="dbd-sandbox-wrap" style={{ margin: "20px 28px 0" }}>
        <B2BApiSandbox defaultApiKey={apiKey} />
      </div>

      {/* ── Partner Integration Code Snippets ── */}
      <div className="dbd-int-wrap" style={{ margin: "18px 28px 40px", border: "1px solid var(--dbd-border)", borderRadius: "10px", overflow: "hidden" }}>
        {/* int-head */}
        <div className="dbd-int-head" style={{ display: "flex", alignItems: "center", gap: "8px", padding: "12px 16px", borderBottom: "1px solid var(--dbd-border)", background: "var(--dbd-panel-alt)", flexWrap: "wrap" }}>
          <span style={{ fontWeight: 700, fontSize: "13.5px", color: "var(--dbd-text)" }}>&lt; / &gt; Partner Integration Code Snippets</span>
          <div className="dbd-int-tabs" style={{ display: "flex", gap: "14px", marginLeft: "auto", fontSize: "11.5px", color: "var(--dbd-text-faint)" }}>
            {(["cURL", "Fetch", "Python", "React", "Shopify"] as const).map((tab) => (
              <span key={tab} onClick={() => setActiveCodeTab(tab)}
                style={{ cursor: "pointer", color: activeCodeTab === tab ? "var(--dbd-pink)" : "var(--dbd-text-faint)", fontWeight: activeCodeTab === tab ? 700 : 400 }}>
                {tab}
              </span>
            ))}
          </div>
          <span onClick={() => copy(getSnippet() ?? "")}
            style={{ color: "var(--dbd-text-dim)", fontSize: "11.5px", cursor: "pointer", marginLeft: "14px" }}>
            {copiedCode ? "✓ Copied" : "⧉ Copy Snippet"}
          </span>
        </div>
        {/* int-body */}
        <div className="dbd-int-body" style={{ padding: "16px", fontFamily: "ui-monospace, Menlo, Consolas, monospace", fontSize: "12.5px", lineHeight: 1.75, background: "var(--dbd-code-bg)", overflowX: "auto" }}>
          <pre style={{ margin: 0, color: "#7ee787", overflowX: "auto", whiteSpace: "pre", minWidth: 0 }}>
            <code>{getSnippet()}</code>
          </pre>
        </div>
      </div>

    </div>
  );
}

