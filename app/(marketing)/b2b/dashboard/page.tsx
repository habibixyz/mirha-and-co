"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Key,
  Terminal,
  Zap,
  Globe,
  Code2,
  Copy,
  Check,
  Play,
  Activity,
  Layers,
  Sparkles,
  ShieldCheck,
  Droplets,
  ArrowRight,
  RefreshCw
} from "lucide-react";

export default function B2BDashboardPage() {
  const [apiKey, setApiKey] = useState("b2b_trial_key");
  const [postalCode, setPostalCode] = useState("90210");
  const [skinType, setSkinType] = useState("oily");
  const [mainConcern, setMainConcern] = useState("acne");
  const [customCatalogJson, setCustomCatalogJson] = useState(
    JSON.stringify(
      [
        {
          id: "MERCHANT-SKU-101",
          name: "Botanical Salicylic Purifying Gel",
          category: "cleanser",
          ingredients: "Aqua, Disodium EDTA, Salicylic Acid, Tea Tree Oil",
          price: 24.0
        },
        {
          id: "MERCHANT-SKU-202",
          name: "Hydra-Luminate Water Gel Cream",
          category: "moisturiser",
          ingredients: "Hyaluronic Acid, Panthenol, Squalane",
          price: 32.0
        },
        {
          id: "MERCHANT-SKU-303",
          name: "Silk-Touch Dry Sun Shield SPF 50",
          category: "sunscreen",
          tags: ["matte", "dry_touch"],
          price: 28.0
        }
      ],
      null,
      2
    )
  );

  const [activeCodeTab, setActiveCodeTab] = useState<"curl" | "fetch" | "python" | "react" | "shopify">("curl");
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState<any>(null);

  const handleRunTest = async () => {
    setLoading(true);
    setApiResponse(null);
    try {
      let parsedCatalog = undefined;
      if (customCatalogJson.trim()) {
        try {
          parsedCatalog = JSON.parse(customCatalogJson);
        } catch (e) {
          alert("Invalid Custom Product JSON catalog format. Please check syntax.");
          setLoading(false);
          return;
        }
      }

      const res = await fetch("/api/v1/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          apiKey,
          postalCode,
          skinType,
          mainConcern,
          budget: "under_1000",
          catalog: parsedCatalog,
        }),
      });

      const data = await res.json();
      setApiResponse(data);
    } catch (err: any) {
      setApiResponse({ success: false, error: err.message || "Failed to call API" });
    } finally {
      setLoading(false);
    }
  };

  const getCodeSnippet = () => {
    const endpointUrl = typeof window !== "undefined" ? `${window.location.origin}/api/v1/recommend` : "https://mirhaandco.com/api/v1/recommend";
    
    switch (activeCodeTab) {
      case "curl":
        return `curl -X POST "${endpointUrl}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "apiKey": "${apiKey}",
    "postalCode": "${postalCode}",
    "skinType": "${skinType}",
    "mainConcern": "${mainConcern}"
  }'`;
      case "fetch":
        return `const response = await fetch("${endpointUrl}", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    apiKey: "${apiKey}",
    postalCode: "${postalCode}",
    skinType: "${skinType}",
    mainConcern: "${mainConcern}",
    catalog: [
      { id: "SKU-01", name: "Your Cleanser", category: "cleanser", ingredients: "Disodium EDTA, Salicylic..." },
      { id: "SKU-02", name: "Your Water Gel", category: "moisturiser", tags: ["water_gel"] }
    ]
  })
});
const data = await response.json();
console.log(data.recommendation);`;
      case "python":
        return `import requests

url = "${endpointUrl}"
payload = {
    "apiKey": "${apiKey}",
    "postalCode": "${postalCode}",
    "skinType": "${skinType}",
    "mainConcern": "${mainConcern}"
}
headers = {"Content-Type": "application/json"}

response = requests.post(url, json=payload, headers=headers)
print(response.json())`;
      case "react":
        return `import { useEffect, useState } from "react";

export function ClimateSkincareBadge({ postalCode, skinType }) {
  const [routine, setRoutine] = useState(null);

  useEffect(() => {
    fetch("${endpointUrl}", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        apiKey: "${apiKey}",
        postalCode,
        skinType,
        mainConcern: "acne"
      })
    })
    .then(r => r.json())
    .then(data => setRoutine(data));
  }, [postalCode, skinType]);

  if (!routine?.success) return null;

  return (
    <div className="p-4 rounded-xl bg-slate-900 text-white">
      <p className="font-semibold text-emerald-400">🌊 Tap Water: {routine.diagnostics.waterHardnessCategory} ({routine.diagnostics.waterHardnessPpm} PPM)</p>
      <p className="text-sm mt-1">{routine.recommendation.cleanser.name}</p>
    </div>
  );
}`;
      case "shopify":
        return `<!-- Copy & paste into your Shopify Liquid product template (e.g. sections/main-product.liquid) -->
<div id="mirha-climate-widget"></div>
<script>
  (function() {
    fetch("${endpointUrl}", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        apiKey: "${apiKey}",
        postalCode: Shopify?.checkout?.shipping_address?.zip || "${postalCode}",
        skinType: "${skinType}",
        mainConcern: "${mainConcern}"
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        document.getElementById('mirha-climate-widget').innerHTML = 
          '<div style="background:#090d16; color:#e2e8f0; border:1px solid #1e293b; padding:16px; border-radius:12px; margin:16px 0;">' +
          '<div style="font-weight:700; color:#38bdf8; font-size:13px; text-transform:uppercase;">💧 Climate & Hard Water Shield</div>' +
          '<div style="font-size:15px; font-weight:600; margin-top:4px;">' + data.recommendation.cleanser.name + '</div>' +
          '<div style="font-size:12px; color:#94a3b8; margin-top:4px;">' + data.recommendation.cleanser.reason + '</div>' +
          '</div>';
      }
    });
  })();
</script>`;
    }
  };

  const copyToClipboard = (text: string, isKey = false) => {
    navigator.clipboard.writeText(text);
    if (isKey) {
      setCopiedKey(true);
      setTimeout(() => setCopiedKey(false), 2000);
    } else {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#060911] text-slate-100 font-sans">
      {/* Top Navigation */}
      <header className="border-b border-slate-800 bg-[#090d16]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/b2b" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-emerald-400 p-0.5 shadow-lg shadow-cyan-500/20">
                <div className="w-full h-full bg-[#060911] rounded-[7px] flex items-center justify-center">
                  <Zap className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                </div>
              </div>
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                Mirha & Co. <span className="text-cyan-400 font-normal">API Portal</span>
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              API Status: 100% Operational
            </span>
            <Link
              href="/b2b"
              className="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1"
            >
              API Pitch Deck <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* API Key Header Banner */}
        <section className="bg-gradient-to-r from-slate-900 via-[#0d1527] to-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden shadow-2xl">
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div>
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-semibold tracking-wider uppercase">
                <ShieldCheck className="w-4 h-4" /> B2B Developer Console
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 tracking-tight">
                Enterprise API Sandbox & Management
              </h1>
              <p className="text-slate-400 text-sm mt-1 max-w-2xl">
                Test real-time zip code geocoding, tap water PPM resolution, and custom store product catalog mapping.
              </p>
            </div>

            <div className="bg-[#060911]/90 border border-slate-700/80 rounded-xl p-3 sm:w-96 flex flex-col gap-2">
              <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider flex items-center justify-between">
                <span>Active API Key</span>
                <span className="text-cyan-400 font-sans text-xs">Sandbox Mode</span>
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="bg-slate-900/90 text-emerald-400 font-mono text-xs px-3 py-1.5 rounded-lg border border-slate-700 w-full focus:outline-none focus:border-cyan-500"
                  placeholder="b2b_live_key_..."
                />
                <button
                  onClick={() => copyToClipboard(apiKey, true)}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors shrink-0"
                  title="Copy API Key"
                >
                  {copiedKey ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#090d16] border border-slate-800/80 rounded-xl p-4 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-cyan-500/10 text-cyan-400">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <div className="text-slate-400 text-xs font-medium">Monthly Quota</div>
              <div className="text-xl font-bold text-white font-mono mt-0.5">150,000 req/mo</div>
              <div className="text-[11px] text-emerald-400 font-mono mt-0.5">Growth Plan Active</div>
            </div>
          </div>

          <div className="bg-[#090d16] border border-slate-800/80 rounded-xl p-4 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-slate-400 text-xs font-medium">Avg. Edge Latency</div>
              <div className="text-xl font-bold text-white font-mono mt-0.5">38ms</div>
              <div className="text-[11px] text-slate-500 font-mono mt-0.5">Global CDN Accelerated</div>
            </div>
          </div>

          <div className="bg-[#090d16] border border-slate-800/80 rounded-xl p-4 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-indigo-500/10 text-indigo-400">
              <Droplets className="w-5 h-5" />
            </div>
            <div>
              <div className="text-slate-400 text-xs font-medium">Auto-Geocoded Cities</div>
              <div className="text-xl font-bold text-white font-mono mt-0.5">500+ Cities</div>
              <div className="text-[11px] text-indigo-400 font-mono mt-0.5">PPM Water Matrix Built-in</div>
            </div>
          </div>

          <div className="bg-[#090d16] border border-slate-800/80 rounded-xl p-4 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-purple-500/10 text-purple-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="text-slate-400 text-xs font-medium">Catalog Adapter</div>
              <div className="text-xl font-bold text-white font-mono mt-0.5">Custom SKUs</div>
              <div className="text-[11px] text-purple-400 font-mono mt-0.5">Ingredient Classification</div>
            </div>
          </div>
        </div>

        {/* Interactive Playground & Code Snippets Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Playground Left Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-[#090d16] border border-slate-800 rounded-2xl p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <Play className="w-5 h-5 text-cyan-400" />
                  <h2 className="font-bold text-lg text-white">Live API Payload Tester</h2>
                </div>
                <span className="text-xs text-slate-400 font-mono">POST /api/v1/recommend</span>
              </div>

              {/* Input Form Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Zip Code / Postal Code / City
                  </label>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-cyan-500"
                    placeholder="90210, London, Delhi..."
                  />
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    Auto-resolves tap water PPM & weather
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Shopper Skin Type
                  </label>
                  <select
                    value={skinType}
                    onChange={(e) => setSkinType(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="oily">Oily Skin</option>
                    <option value="dry">Dry Skin</option>
                    <option value="combination">Combination Skin</option>
                    <option value="sensitive">Sensitive Skin</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Main Skin Concern
                </label>
                <select
                  value={mainConcern}
                  onChange={(e) => setMainConcern(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="acne">Acne & Breakouts</option>
                  <option value="pigmentation">Pigmentation & Dark Spots</option>
                  <option value="dullness">Dullness & Lack of Glow</option>
                  <option value="dehydration">Dehydration & Dry Flakes</option>
                </select>
              </div>

              {/* Custom Store SKU Catalog Editor */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-medium text-slate-300">
                    Custom Store Product Catalog (Optional JSON)
                  </label>
                  <span className="text-[11px] text-cyan-400 font-mono">Evaluated on-the-fly</span>
                </div>
                <textarea
                  rows={6}
                  value={customCatalogJson}
                  onChange={(e) => setCustomCatalogJson(e.target.value)}
                  className="w-full bg-slate-950 font-mono text-xs text-emerald-300 p-3 rounded-lg border border-slate-800 focus:outline-none focus:border-cyan-500 leading-relaxed"
                ></textarea>
              </div>

              <button
                onClick={handleRunTest}
                disabled={loading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" /> Resolving Water Hardness & Geocoding...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-slate-950" /> Execute Diagnostic API Request
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Response Viewer & Code Snippets Right Column */}
          <div className="lg:col-span-6 space-y-6">
            {/* Live Output Section */}
            <div className="bg-[#090d16] border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-emerald-400" />
                  <h2 className="font-bold text-lg text-white">API Response Output</h2>
                </div>
                {apiResponse && (
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-mono font-semibold ${apiResponse.success ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-red-500/10 text-red-400"}`}>
                    Status: {apiResponse.success ? "200 OK" : "Error"}
                  </span>
                )}
              </div>

              {apiResponse ? (
                <div className="space-y-4">
                  {/* Resolved Diagnostics Card */}
                  {apiResponse.diagnostics && (
                    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400">Resolved Geolocation:</span>
                        <span className="font-bold text-white">{apiResponse.diagnostics.location}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400">Tap Water PPM Hardness:</span>
                        <span className="font-mono text-cyan-400 font-semibold">{apiResponse.diagnostics.waterHardnessPpm} PPM ({apiResponse.diagnostics.waterHardnessCategory})</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400">Dewpoint / Temperature:</span>
                        <span className="font-mono text-slate-300">{apiResponse.diagnostics.dewpointC}°C Dewpoint ({apiResponse.diagnostics.temperatureC}°C Air)</span>
                      </div>
                    </div>
                  )}

                  {/* Formatted JSON Output */}
                  <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 max-h-72 overflow-y-auto">
                    <pre className="text-xs font-mono text-slate-300 whitespace-pre-wrap">
                      {JSON.stringify(apiResponse, null, 2)}
                    </pre>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-950/60 rounded-xl p-8 border border-dashed border-slate-800 text-center space-y-2">
                  <Sparkles className="w-8 h-8 text-slate-600 mx-auto" />
                  <p className="text-slate-400 text-sm">Click &quot;Execute Diagnostic API Request&quot; to test your zip code & product catalog in real-time.</p>
                </div>
              )}
            </div>

            {/* Ready-to-use Code Generators */}
            <div className="bg-[#090d16] border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-purple-400" />
                  <h2 className="font-bold text-base text-white">Integration Code Generator</h2>
                </div>

                <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800 overflow-x-auto">
                  {(["curl", "fetch", "python", "react", "shopify"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveCodeTab(tab)}
                      className={`px-2.5 py-1 rounded-md text-xs font-mono font-medium capitalize transition-colors cursor-pointer ${
                        activeCodeTab === tab
                          ? "bg-purple-600 text-white shadow-sm"
                          : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              <div className="relative group">
                <pre className="bg-slate-950 text-purple-300 font-mono text-xs p-4 rounded-xl border border-slate-800 overflow-x-auto leading-relaxed">
                  {getCodeSnippet()}
                </pre>
                <button
                  onClick={() => copyToClipboard(getCodeSnippet())}
                  className="absolute top-3 right-3 p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 opacity-90 transition-opacity"
                  title="Copy Snippet"
                >
                  {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
