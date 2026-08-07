"use client";

import React, { useState } from "react";
import { Play, Copy, Check, RefreshCw } from "lucide-react";

interface B2BApiSandboxProps {
  defaultApiKey?: string;
  className?: string;
}

// ── JSON Syntax Highlighter ──────────────────────────────────────────────────
function JsonSyntaxHighlighter({ json }: { json: any }) {
  if (!json) return null;
  const str = JSON.stringify(json, null, 2);
  const lines = str.split("\n").map((line, idx) => {
    const formatted = line.replace(
      /(\"(?:\\u[a-fA-F0-9]{4}|\\[^u]|[^\\"])*\")(\s*:)?|(\b(true|false|null)\b)|(-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
      (match, p1, p2, p3, _p4, p5) => {
        if (p2) return `<span style="color:#79c0ff">${p1}</span>${p2}`;
        if (p1) return `<span style="color:#3ddc84">${p1}</span>`;
        if (p3) return `<span style="color:#d2a8ff">${p3}</span>`;
        if (p5) return `<span style="color:#e3b341">${p5}</span>`;
        return match;
      }
    );
    return <div key={idx} dangerouslySetInnerHTML={{ __html: formatted }} />;
  });
  return (
    <div style={{ fontFamily: "ui-monospace,Menlo,Consolas,monospace", fontSize: "12px", lineHeight: 1.7 }}>
      {lines}
    </div>
  );
}

// ── CSS injected once at module level ────────────────────────────────────────
const SANDBOX_CSS = `
  .b2b-sandbox-root {
    --sb-pink:#ec1f6a;
    --sb-pink-dark:#ff2d78;
    --sb-bg:#0b0b0e;
    --sb-panel:#131318;
    --sb-panel-alt:#0f0f13;
    --sb-border:#26262e;
    --sb-text:#e9e9ee;
    --sb-text-dim:#9a9aa5;
    --sb-text-faint:#5c5c66;
    --sb-green:#3ddc84;
    --sb-blue:#79c0ff;
    --sb-yellow:#e3b341;
    --sb-input-bg:#1a1a20;
  }
  html:not(.dark) .b2b-sandbox-root {
    --sb-bg:#ffffff;
    --sb-panel:#f8f9fa;
    --sb-panel-alt:#f0f1f3;
    --sb-border:#e2e4e8;
    --sb-text:#1a1a1a;
    --sb-text-dim:#5a5f6e;
    --sb-text-faint:#9aa0b0;
    --sb-input-bg:#ffffff;
  }
  .b2b-sandbox-root *{box-sizing:border-box;}
  .sb-field label {
    display:block;font-size:10.5px;font-weight:700;
    letter-spacing:.04em;color:var(--sb-text-dim);margin-bottom:6px;text-transform:uppercase;
  }
  .sb-field input,.sb-field select {
    width:100%;padding:8px 10px;background:var(--sb-input-bg);border:1px solid var(--sb-border);
    border-radius:6px;color:var(--sb-text);font-size:12.5px;outline:none;
    font-family:inherit;
  }
  .sb-field input:focus,.sb-field select:focus{border-color:var(--sb-pink);}
  .sb-field .helper{font-size:10.5px;color:var(--sb-text-faint);margin-top:5px;}
  .sb-send-btn{
    margin-top:6px;width:100%;background:var(--sb-pink);color:#fff;border:none;border-radius:7px;
    padding:11px;font-size:13px;font-weight:700;cursor:pointer;
    display:flex;align-items:center;justify-content:center;gap:8px;transition:background .15s;
  }
  .sb-send-btn:hover{background:var(--sb-pink-dark);}
  .sb-send-btn:disabled{opacity:.6;cursor:not-allowed;}
  .sb-copy-btn{
    display:inline-flex;align-items:center;gap:4px;
    background:none;border:none;cursor:pointer;font-size:11.5px;color:var(--sb-text-dim);
    font-family:inherit;transition:color .15s;padding:0;
  }
  .sb-copy-btn:hover{color:var(--sb-text);}

  /* ── Tablet: 768–1024px — shrink left col slightly ── */
  @media (max-width: 1024px) {
    .sb-pg-body { grid-template-columns: 240px 1fr !important; }
  }

  /* ── Mobile: ≤768px — stack columns vertically ── */
  @media (max-width: 768px) {
    .sb-pg-body {
      grid-template-columns: 1fr !important;
      min-height: auto !important;
    }
    .sb-pg-left {
      border-right: none !important;
      border-bottom: 1px solid var(--sb-border) !important;
    }
    .sb-resp-body {
      max-height: 360px !important;
    }
  }
`;


export function B2BApiSandbox({ defaultApiKey = "b2b_trial_key", className = "" }: B2BApiSandboxProps) {
  const [apiKey, setApiKey] = useState(defaultApiKey);
  const [skinType, setSkinType] = useState("oily");
  const [mainConcern, setMainConcern] = useState("acne");
  const [selectedCity, setSelectedCity] = useState("London");
  const [budget, setBudget] = useState("under_1000");

  const [isLoading, setIsLoading] = useState(false);
  const [responseData, setResponseData] = useState<any>(null);
  const [status, setStatus] = useState<number | null>(null);
  const [latencyMs, setLatencyMs] = useState<number | null>(null);
  const [copiedResponse, setCopiedResponse] = useState(false);
  const [copiedCurl, setCopiedCurl] = useState(false);

  const CITIES: Record<string, { city: string; country: string; ppm: number; temp: number; humidity: number; dewpoint: number }> = {
    London:         { city: "London",      country: "UK", ppm: 280, temp: 18, humidity: 78,  dewpoint: 14.4 },
    "Los Angeles":  { city: "Los Angeles", country: "US", ppm: 320, temp: 26, humidity: 45,  dewpoint: 13.0 },
    Mumbai:         { city: "Mumbai",      country: "IN", ppm: 140, temp: 32, humidity: 85,  dewpoint: 29.1 },
    "New York":     { city: "New York",    country: "US", ppm: 55,  temp: 4,  humidity: 35,  dewpoint: -9.5 },
    Stockholm:      { city: "Stockholm",   country: "SE", ppm: 20,  temp: 8,  humidity: 60,  dewpoint: 0.8  },
  };

  const activeClimate = CITIES[selectedCity] || CITIES["London"];

  const handleExecute = async () => {
    setIsLoading(true);
    setResponseData(null);
    setStatus(null);
    setLatencyMs(null);
    const t0 = performance.now();
    try {
      const res = await fetch("/api/v1/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiKey, skinType, mainConcern, budget, climate: activeClimate }),
      });
      setLatencyMs(Math.round(performance.now() - t0));
      setStatus(res.status);
      setResponseData(await res.json());
    } catch (err: any) {
      setLatencyMs(Math.round(performance.now() - t0));
      setStatus(500);
      setResponseData({ success: false, error: err.message || "Network Error" });
    } finally {
      setIsLoading(false);
    }
  };

  const generateCurl = () =>
    `curl -X POST "https://www.mirhaandco.com/api/v1/recommend" \\
  -H "Content-Type: application/json" \\
  -d '{"apiKey":"${apiKey}","skinType":"${skinType}","mainConcern":"${mainConcern}"}'`;

  const copyToClipboard = (text: string, type: "response" | "curl") => {
    navigator.clipboard.writeText(text);
    if (type === "response") { setCopiedResponse(true); setTimeout(() => setCopiedResponse(false), 2000); }
    else { setCopiedCurl(true); setTimeout(() => setCopiedCurl(false), 2000); }
  };

  const requestsUsed = responseData?.quota?.remaining !== undefined ? 10000 - responseData.quota.remaining : 1;
  const quotaBarWidth = `${Math.min(100, Math.max(1, Math.round((requestsUsed / 10000) * 100)))}%`;

  // Preview JSON when no real response yet
  const displayJson = responseData ?? {
    success: true,
    diagnostics: {
      location: `${activeClimate.city}, ${activeClimate.country}`,
      resolvedVia: "fallback",
      waterHardnessPpm: activeClimate.ppm,
      waterHardnessCategory: activeClimate.ppm >= 180 ? "Very Hard" : activeClimate.ppm >= 120 ? "Hard" : "Soft",
      temperatureC: activeClimate.temp,
      humidityPercent: activeClimate.humidity,
      dewpointC: activeClimate.dewpoint,
      environmentalStress: {
        tewlRiskLevel: activeClimate.humidity < 50 ? "Moderate" : "Low (Optimal Moisture Preservation)",
        mineralScumRiskLevel: activeClimate.ppm >= 250 ? "Critical Calcium Binding" : "High Soap Scum Deposition",
      },
      coordinates: null,
      evaluatedCustomSkus: 0,
    },
    quota: { remaining: 9999, monthlyQuota: 10000 },
  };

  return (
    <div className={`b2b-sandbox-root ${className}`} style={{ borderRadius: "10px", overflow: "hidden", border: "1px solid var(--sb-border)", fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif' }}>

      {/* Inject scoped CSS */}
      <style>{SANDBOX_CSS}</style>

      {/* ── pg-head ── */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 16px", borderBottom: "1px solid var(--sb-border)", background: "var(--sb-panel-alt)", fontSize: "12.5px" }}>
        <span style={{ fontWeight: 700, color: "var(--sb-text)" }}>&gt;_ Interactive Live B2B API Playground</span>
        <span style={{ fontSize: "9.5px", fontWeight: 800, background: "#1a1a3a", color: "var(--sb-blue)", padding: "2px 7px", borderRadius: "4px", letterSpacing: ".03em" }}>
          V1 LIVE EDGE ENGINE
        </span>
        <button
          className="sb-copy-btn"
          style={{ marginLeft: "auto" }}
          onClick={() => copyToClipboard(generateCurl(), "curl")}
          title="Copy cURL snippet"
        >
          {copiedCurl ? <Check size={13} style={{ color: "var(--sb-green)" }} /> : <span>⧉</span>}
          <span>{copiedCurl ? "cURL Copied" : "Copy cURL"}</span>
        </button>
      </div>

      {/* ── pg-body: the key fix — 290px fixed left, 1fr right, shared min-height ── */}
      <div className="sb-pg-body" style={{ display: "grid", gridTemplateColumns: "290px 1fr", minHeight: "520px" }}>

        {/* ── pg-left ── */}
        <div className="sb-pg-left" style={{ display: "flex", flexDirection: "column", padding: "14px 16px", borderRight: "1px solid var(--sb-border)", background: "var(--sb-panel)" }}>

          <div className="sb-field" style={{ marginBottom: "14px" }}>
            <label>B2B API KEY</label>
            <input type="text" value={apiKey} onChange={e => setApiKey(e.target.value)} placeholder="b2b_trial_key" />
            <div className="helper">Trial key: <code>b2b_trial_key</code> (60 req/min)</div>
          </div>

          <div className="sb-field" style={{ marginBottom: "14px" }}>
            <label>SKIN TYPE</label>
            <select value={skinType} onChange={e => setSkinType(e.target.value)}>
              <option value="oily">Oily</option>
              <option value="dry">Dry</option>
              <option value="combination">Combination</option>
              <option value="sensitive">Sensitive</option>
            </select>
          </div>

          <div className="sb-field" style={{ marginBottom: "14px" }}>
            <label>PRIMARY SKIN CONCERN</label>
            <select value={mainConcern} onChange={e => setMainConcern(e.target.value)}>
              <option value="acne">Acne &amp; Breakouts</option>
              <option value="pigmentation">Hyperpigmentation</option>
              <option value="dullness">Dullness</option>
              <option value="dehydration">Dehydration</option>
            </select>
          </div>

          <div className="sb-field" style={{ marginBottom: "14px" }}>
            <label>SHOPPER CITY MATRIX</label>
            <select value={selectedCity} onChange={e => setSelectedCity(e.target.value)}>
              <option value="London">London, UK (280 PPM – Very Hard)</option>
              <option value="Los Angeles">Los Angeles, US (320 PPM – Very Hard)</option>
              <option value="Mumbai">Mumbai, IN (140 PPM – Mod. Hard)</option>
              <option value="New York">New York, US (55 PPM – Soft)</option>
              <option value="Stockholm">Stockholm, SE (20 PPM – Very Soft)</option>
            </select>
          </div>

          <div className="sb-field" style={{ marginBottom: "14px" }}>
            <label>CATALOG PRICE TIER</label>
            <select value={budget} onChange={e => setBudget(e.target.value)}>
              <option value="under_1000">Budget / Everyday ($)</option>
              <option value="mid_tier">Mid-Range ($$)</option>
              <option value="luxury">Luxury / Medical Grade ($$$)</option>
            </select>
          </div>

          <button className="sb-send-btn" onClick={handleExecute} disabled={isLoading}>
            {isLoading
              ? <><RefreshCw size={14} style={{ animation: "spin 1s linear infinite" }} /><span>Executing Call...</span></>
              : <><Play size={14} fill="#fff" /><span>Execute Live API Request</span></>
            }
          </button>

          {/* ── fill-panel: session status fills the dead space ── */}
          <div style={{ marginTop: "18px", borderTop: "1px solid var(--sb-border)", paddingTop: "14px", flex: 1, display: "flex", flexDirection: "column", gap: "10px" }}>
            <div style={{ fontSize: "10.5px", fontWeight: 800, color: "var(--sb-text-faint)", letterSpacing: ".04em", textTransform: "uppercase" }}>
              SESSION STATUS
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "var(--sb-text-dim)" }}>
              <span>Requests used</span>
              <b style={{ color: "var(--sb-text)", fontWeight: 700 }}>{requestsUsed} / 9999</b>
            </div>
            <div style={{ height: "5px", borderRadius: "3px", background: "var(--sb-input-bg)", overflow: "hidden" }}>
              <div style={{ height: "100%", width: quotaBarWidth, background: "var(--sb-green)", transition: "width .3s" }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "var(--sb-text-dim)" }}>
              <span>Monthly quota</span>
              <b style={{ color: "var(--sb-text)", fontWeight: 700 }}>
                {responseData?.quota?.monthlyQuota ? responseData.quota.monthlyQuota.toLocaleString() : "10,000"}
              </b>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "var(--sb-text-dim)" }}>
              <span>Avg latency</span>
              <b style={{ color: "var(--sb-text)", fontWeight: 700 }}>
                {latencyMs !== null ? `${latencyMs} ms` : "72 ms"}
              </b>
            </div>
            <div style={{ marginTop: "auto", fontSize: "10.5px", lineHeight: 1.5, color: "var(--sb-text-faint)" }}>
              Trial key resets daily. Upgrade to a live key for higher rate limits and production SLAs.
            </div>
          </div>

        </div>

        {/* ── pg-right ── */}
        <div style={{ display: "flex", flexDirection: "column", background: "var(--sb-bg)" }}>

          {/* resp-head */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 16px", borderBottom: "1px solid var(--sb-border)", fontSize: "11.5px", color: "var(--sb-text-dim)" }}>
            <span>RESPONSE BODY</span>
            <span style={{ background: "#0c2b17", color: "var(--sb-green)", fontWeight: 700, padding: "2px 8px", borderRadius: "4px", fontSize: "10.5px" }}>
              {status ? `${status} ${status === 200 ? "OK" : "ERROR"}` : "200 OK"}
            </span>
            <span style={{ marginLeft: "auto", color: "var(--sb-text-faint)" }}>
              ⚡ {latencyMs !== null ? `${latencyMs} ms` : "72 ms"}
            </span>
            <button
              className="sb-copy-btn"
              onClick={() => copyToClipboard(JSON.stringify(displayJson, null, 2), "response")}
            >
              {copiedResponse ? <Check size={12} style={{ color: "var(--sb-green)" }} /> : <span>⧉</span>}
              <span>{copiedResponse ? "Copied" : "Copy JSON"}</span>
            </button>
          </div>

          {/* resp-body */}
          <div className="sb-resp-body" style={{ flex: 1, padding: "14px 16px", overflowY: "auto", maxHeight: "520px" }}>
            {isLoading ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "300px", gap: "12px", color: "var(--sb-text-dim)" }}>
                <RefreshCw size={24} style={{ color: "var(--sb-pink)", animation: "spin 1s linear infinite" }} />
                <span>Pinging <code>/api/v1/recommend</code> edge node...</span>
              </div>
            ) : (
              <JsonSyntaxHighlighter json={displayJson} />
            )}
          </div>

        </div>
      </div>

      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}
