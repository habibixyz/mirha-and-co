"use client";

import React, { useState } from "react";
import { 
  Play, 
  Copy, 
  Check, 
  Terminal, 
  Zap, 
  Code2, 
  ShieldCheck, 
  RefreshCw
} from "lucide-react";

interface B2BApiSandboxProps {
  defaultApiKey?: string;
  className?: string;
}

export function B2BApiSandbox({ defaultApiKey = "b2b_trial_key", className = "" }: B2BApiSandboxProps) {
  // Configurable Request Inputs
  const [apiKey, setApiKey] = useState(defaultApiKey);
  const [skinType, setSkinType] = useState("oily");
  const [mainConcern, setMainConcern] = useState("acne");
  const [selectedCity, setSelectedCity] = useState("London");
  const [budget, setBudget] = useState("under_1000");

  // Execution State
  const [isLoading, setIsLoading] = useState(false);
  const [responseData, setResponseData] = useState<any>(null);
  const [status, setStatus] = useState<number | null>(null);
  const [latencyMs, setLatencyMs] = useState<number | null>(null);
  const [copiedResponse, setCopiedResponse] = useState(false);
  const [copiedCurl, setCopiedCurl] = useState(false);

  // Preset City Climate Data
  const CITIES: Record<string, { city: string; country: string; ppm: number; temp: number; humidity: number; dewpoint: number }> = {
    London: { city: "London", country: "UK", ppm: 280, temp: 18, humidity: 78, dewpoint: 14.4 },
    "Los Angeles": { city: "Los Angeles", country: "US", ppm: 320, temp: 26, humidity: 45, dewpoint: 13.0 },
    Mumbai: { city: "Mumbai", country: "IN", ppm: 140, temp: 32, humidity: 85, dewpoint: 29.1 },
    "New York": { city: "New York", country: "US", ppm: 55, temp: 4, humidity: 35, dewpoint: -9.5 },
    Stockholm: { city: "Stockholm", country: "SE", ppm: 20, temp: 8, humidity: 60, dewpoint: 0.8 },
  };

  const activeClimate = CITIES[selectedCity] || CITIES["London"];

  // Execute Live API Call
  const handleExecute = async () => {
    setIsLoading(true);
    setResponseData(null);
    setStatus(null);
    setLatencyMs(null);

    const startTime = performance.now();

    try {
      const res = await fetch("/api/v1/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          apiKey,
          skinType,
          mainConcern,
          budget,
          climate: activeClimate,
        }),
      });

      const endTime = performance.now();
      setLatencyMs(Math.round(endTime - startTime));
      setStatus(res.status);

      const json = await res.json();
      setResponseData(json);
    } catch (err: any) {
      const endTime = performance.now();
      setLatencyMs(Math.round(endTime - startTime));
      setStatus(500);
      setResponseData({ success: false, error: err.message || "Network Error" });
    } finally {
      setIsLoading(false);
    }
  };

  // cURL Command Generator
  const generateCurl = () => {
    return `curl -X POST https://www.mirhaandco.com/api/v1/recommend \\
  -H "Content-Type: application/json" \\
  -d '{
    "apiKey": "${apiKey}",
    "skinType": "${skinType}",
    "mainConcern": "${mainConcern}",
    "budget": "${budget}",
    "climate": ${JSON.stringify(activeClimate, null, 4).replace(/\n/g, "\n    ")}
  }'`;
  };

  const copyToClipboard = (text: string, type: "response" | "curl") => {
    navigator.clipboard.writeText(text);
    if (type === "response") {
      setCopiedResponse(true);
      setTimeout(() => setCopiedResponse(false), 2000);
    } else {
      setCopiedCurl(true);
      setTimeout(() => setCopiedCurl(false), 2000);
    }
  };

  return (
    <div className={`sandbox-root ${className}`}>
      <style>{`
        .sandbox-root {
          background: #080c16;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
          color: #f1f5f9;
          font-family: var(--font-dm-sans), sans-serif;
        }

        .sandbox-header {
          background: #0d1322;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          padding: 1rem 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .sandbox-title {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.95rem;
          font-weight: 700;
          color: #fff;
        }

        .sandbox-grid {
          display: grid;
          grid-template-columns: 340px 1fr;
          min-height: 480px;
        }

        @media (max-width: 900px) {
          .sandbox-grid {
            grid-template-columns: 1fr;
          }
        }

        .sandbox-controls {
          background: #090e1b;
          border-right: 1px solid rgba(255, 255, 255, 0.06);
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
        }

        @media (max-width: 900px) {
          .sandbox-controls {
            border-right: none;
            border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          }
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .form-label {
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #94a3b8;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .form-select, .form-input {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          padding: 0.55rem 0.75rem;
          color: #fff;
          font-size: 0.85rem;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
        }

        .form-select option {
          background-color: #090e1b;
          color: #fff;
        }

        .form-select:focus, .form-input:focus {
          border-color: #fc2779;
          background: rgba(252, 39, 121, 0.04);
        }

        .run-btn {
          background: linear-gradient(135deg, #fc2779 0%, #e11d48 100%);
          color: #fff;
          border: none;
          border-radius: 10px;
          padding: 0.75rem 1.25rem;
          font-weight: 700;
          font-size: 0.88rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          transition: all 0.2s ease;
          box-shadow: 0 4px 15px rgba(252, 39, 121, 0.3);
          margin-top: 0.5rem;
        }

        .run-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(252, 39, 121, 0.45);
        }

        .run-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .sandbox-terminal {
          background: #03060d;
          padding: 1.25rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          overflow: hidden;
          position: relative;
        }

        .terminal-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          padding-bottom: 0.75rem;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.25rem 0.6rem;
          border-radius: 6px;
          font-family: monospace;
          font-size: 0.75rem;
          font-weight: 700;
        }

        .status-badge.s200 {
          background: rgba(16, 185, 129, 0.15);
          color: #34d399;
          border: 1px solid rgba(16, 185, 129, 0.3);
        }

        .status-badge.s401, .status-badge.s429, .status-badge.s500 {
          background: rgba(239, 68, 68, 0.15);
          color: #f87171;
          border: 1px solid rgba(239, 68, 68, 0.3);
        }

        .json-viewer {
          flex: 1;
          background: #010307;
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 10px;
          padding: 1rem;
          font-family: "Fira Code", "Courier New", monospace;
          font-size: 0.78rem;
          color: #38bdf8;
          overflow-y: auto;
          max-height: 380px;
          white-space: pre-wrap;
          word-break: break-all;
          line-height: 1.5;
        }

        .action-icon-btn {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #94a3b8;
          border-radius: 6px;
          padding: 0.35rem 0.65rem;
          font-size: 0.75rem;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          transition: all 0.2s;
        }

        .action-icon-btn:hover {
          color: #fff;
          background: rgba(255, 255, 255, 0.08);
        }
      `}</style>

      {/* Top Bar */}
      <div className="sandbox-header">
        <div className="sandbox-title">
          <Terminal size={16} color="#fc2779" />
          <span>Interactive Live B2B API Playground</span>
          <span style={{ fontSize: "0.65rem", padding: "0.15rem 0.5rem", borderRadius: "99px", background: "rgba(56, 189, 248, 0.15)", color: "#38bdf8", border: "1px solid rgba(56, 189, 248, 0.3)", textTransform: "uppercase", fontWeight: 700 }}>
            v1 Live Edge Engine
          </span>
        </div>

        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button 
            onClick={() => copyToClipboard(generateCurl(), "curl")}
            className="action-icon-btn"
            title="Copy cURL snippet"
          >
            {copiedCurl ? <Check size={13} color="#10b981" /> : <Code2 size={13} />}
            <span>{copiedCurl ? "cURL Copied" : "Copy cURL"}</span>
          </button>
        </div>
      </div>

      {/* Main Sandbox Grid */}
      <div className="sandbox-grid">
        {/* Left: Input Parameters */}
        <div className="sandbox-controls">
          <div className="form-group">
            <label className="form-label">
              <ShieldCheck size={12} color="#fc2779" /> B2B API Key
            </label>
            <input 
              type="text" 
              className="form-input" 
              value={apiKey} 
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="e.g. b2b_trial_key"
            />
            <span style={{ fontSize: "0.68rem", color: "#64748b" }}>
              Trial key: <code>b2b_trial_key</code> (60 req/min limit)
            </span>
          </div>

          <div className="form-group">
            <label className="form-label">Skin Type</label>
            <select className="form-select" value={skinType} onChange={(e) => setSkinType(e.target.value)}>
              <option value="oily">Oily</option>
              <option value="dry">Dry</option>
              <option value="combination">Combination</option>
              <option value="sensitive">Sensitive</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Primary Skin Concern</label>
            <select className="form-select" value={mainConcern} onChange={(e) => setMainConcern(e.target.value)}>
              <option value="acne">Acne & Breakouts</option>
              <option value="pigmentation">Hyperpigmentation</option>
              <option value="dullness">Dullness</option>
              <option value="dehydration">Dehydration</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Shopper City Matrix</label>
            <select className="form-select" value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
              <option value="London">London, UK (280 PPM - Very Hard)</option>
              <option value="Los Angeles">Los Angeles, US (320 PPM - Very Hard)</option>
              <option value="Mumbai">Mumbai, IN (140 PPM - Mod. Hard)</option>
              <option value="New York">New York, US (55 PPM - Soft)</option>
              <option value="Stockholm">Stockholm, SE (20 PPM - Very Soft)</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Catalog Price Tier</label>
            <select className="form-select" value={budget} onChange={(e) => setBudget(e.target.value)}>
              <option value="under_1000">Budget / Everyday ($)</option>
              <option value="mid_tier">Mid-Range ($$)</option>
              <option value="luxury">Luxury / Medical Grade ($$$)</option>
            </select>
          </div>

          <button 
            onClick={handleExecute} 
            disabled={isLoading}
            className="run-btn"
          >
            {isLoading ? (
              <>
                <RefreshCw size={15} className="animate-spin" />
                <span>Executing Call...</span>
              </>
            ) : (
              <>
                <Play size={15} fill="#fff" />
                <span>Execute Live API Request</span>
              </>
            )}
          </button>
        </div>

        {/* Right: Response Output Terminal */}
        <div className="sandbox-terminal">
          <div className="terminal-bar">
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <span style={{ fontSize: "0.72rem", color: "#94a3b8", fontWeight: 700, textTransform: "uppercase" }}>
                Response Body
              </span>
              {status && (
                <span className={`status-badge s${status}`}>
                  {status} {status === 200 ? "OK" : status === 401 ? "UNAUTHORIZED" : status === 429 ? "TOO MANY REQUESTS" : "ERROR"}
                </span>
              )}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              {latencyMs !== null && (
                <span style={{ fontSize: "0.75rem", color: "#10b981", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: "0.3rem" }}>
                  <Zap size={12} /> {latencyMs} ms
                </span>
              )}

              {responseData && (
                <button 
                  onClick={() => copyToClipboard(JSON.stringify(responseData, null, 2), "response")}
                  className="action-icon-btn"
                >
                  {copiedResponse ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
                  <span>{copiedResponse ? "Copied" : "Copy JSON"}</span>
                </button>
              )}
            </div>
          </div>

          {/* JSON Tree Box */}
          <div className="json-viewer">
            {responseData ? (
              JSON.stringify(responseData, null, 2)
            ) : isLoading ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "220px", color: "#94a3b8", gap: "0.75rem" }}>
                <RefreshCw size={24} className="animate-spin" color="#fc2779" />
                <span>Pinging <code>/api/v1/recommend</code> edge node...</span>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "220px", color: "#64748b", gap: "0.5rem" }}>
                <Code2 size={28} color="#334155" />
                <span>Click <strong>"Execute Live API Request"</strong> to send a real HTTP call and inspect diagnostics JSON.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
