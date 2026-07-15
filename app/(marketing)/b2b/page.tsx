"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Code, Server, Smartphone, Zap, Check, Send, CheckCircle2 } from "lucide-react";
import { submitLeadAction } from "../../(saas)/actions";

export default function B2BPlayground() {
  const [paymentRegion, setPaymentRegion] = useState<"INR" | "USD">("INR");

  // Automatically detect timezone to set default region
  useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tz && (tz.includes("Kolkata") || tz.includes("Calcutta") || tz.includes("Delhi") || tz.includes("Mumbai"))) {
        setPaymentRegion("INR");
      } else {
        setPaymentRegion("USD");
      }
    } catch (e) {
      console.warn("Timezone detection failed, defaulting to INR");
    }
  }, []);
  const [skinType, setSkinType] = useState("oily");
  const [mainConcern, setMainConcern] = useState("acne");
  const [budget, setBudget] = useState("under_1000");
  const [city, setCity] = useState("Mumbai");
  const [temp, setTemp] = useState(32);
  const [humidity, setHumidity] = useState(80);
  
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactBrand, setContactBrand] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [submittedContact, setSubmittedContact] = useState(false);

  const triggerAPI = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);
    try {
      const res = await fetch("/api/v1/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          apiKey: "b2b_trial_key",
          skinType,
          mainConcern,
          budget,
          climate: {
            city,
            temp: Number(temp),
            humidity: Number(humidity),
          },
        }),
      });
      
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to query API");
      }
      setResponse(data.recommendation);
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactBrand) return;
    try {
      const dataStr = JSON.stringify({
        name: contactName,
        brand: contactBrand,
        message: contactMessage,
      });
      await submitLeadAction(contactEmail, "b2b_api", dataStr);
      setSubmittedContact(true);
    } catch (err) {
      console.error("Database lead submission error:", err);
    }
  };

  return (
    <main className="b2b-page">
      <style>{`
        .b2b-page {
          background: #fcfbf9;
          color: #2b2826;
          font-family: var(--font-dm-sans), system-ui, sans-serif;
          line-height: 1.6;
        }
        .b2b-container { max-width: 1100px; margin: 0 auto; padding: 5rem 1.5rem; }
        @media (max-width: 640px) { .b2b-container { padding: 3rem 1.25rem; } }

        /* ── Hero ── */
        .b2b-hero { text-align: center; max-width: 720px; margin: 0 auto 4.5rem; }
        .b2b-hero h1 { font-family: "Playfair Display", Georgia, serif; font-size: clamp(2rem, 5vw, 3rem); font-weight: 700; line-height: 1.15; margin-bottom: 1.25rem; }
        .b2b-hero p { font-size: 1.05rem; color: #8c857f; margin-bottom: 2rem; max-width: 600px; margin-left: auto; margin-right: auto; }
        .b2b-hero-btns { display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap; }

        /* ── Buttons (hardcoded colors) ── */
        .b2b-page .b2b-btn-primary {
          background: #fc2779; color: #fff; border: none;
          padding: 0.75rem 2rem; border-radius: 8px; font-weight: 600; font-size: 0.95rem;
          cursor: pointer; text-decoration: none; display: inline-flex; align-items: center;
          justify-content: center; gap: 0.5rem; transition: background 0.2s, transform 0.15s;
        }
        .b2b-page .b2b-btn-primary:hover { background: #d41a65; transform: translateY(-1px); }
        .b2b-page .b2b-btn-primary:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

        .b2b-page .b2b-btn-outline {
          background: #ffe6f0; color: #fc2779; border: 1px solid #fc2779;
          padding: 0.75rem 2rem; border-radius: 8px; font-weight: 600; font-size: 0.95rem;
          cursor: pointer; text-decoration: none; display: inline-flex; align-items: center;
          justify-content: center; gap: 0.5rem; transition: all 0.2s;
        }
        .b2b-page .b2b-btn-outline:hover { background: #ffd6e8; transform: translateY(-1px); }

        /* ── 3-col value cards ── */
        .b2b-grid3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-bottom: 5rem; }
        @media (max-width: 768px) { .b2b-grid3 { grid-template-columns: 1fr; } }
        .b2b-card { background: #fff; border: 1px solid rgba(0,0,0,0.05); border-radius: 14px; padding: 2rem; transition: transform 0.25s, box-shadow 0.25s; }
        .b2b-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,0.04); }
        .b2b-icon { width: 44px; height: 44px; border-radius: 10px; background: #ffe6f0; color: #fc2779; display: flex; align-items: center; justify-content: center; margin-bottom: 1.25rem; }
        .b2b-card h3 { font-size: 1.1rem; font-weight: 700; margin-bottom: 0.5rem; }
        .b2b-card p { color: #8c857f; font-size: 0.9rem; line-height: 1.6; }

        /* ── Sandbox ── */
        .b2b-sandbox { background: #fff; border: 1px solid rgba(0,0,0,0.05); border-radius: 20px; padding: 2.5rem; margin-bottom: 5rem; }
        @media (max-width: 640px) { .b2b-sandbox { padding: 1.5rem; } }
        .b2b-sandbox-head { text-align: center; margin-bottom: 2.5rem; }
        .b2b-sandbox-head h2 { font-family: "Playfair Display", Georgia, serif; font-size: 1.8rem; margin-bottom: 0.4rem; }
        .b2b-sandbox-head p { color: #8c857f; font-size: 0.9rem; }
        .b2b-sandbox-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2.5rem; align-items: start; max-width: 100%; }
        @media (max-width: 860px) { .b2b-sandbox-grid { grid-template-columns: 1fr; } }

        .b2b-sandbox-col { display: flex; flex-direction: column; gap: 1rem; min-width: 0; max-width: 100%; }
        .b2b-sandbox-col h3 { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: #8c857f; margin-bottom: 0.25rem; }
        .b2b-form-group { display: flex; flex-direction: column; gap: 0.35rem; width: 100%; max-width: 100%; }
        .b2b-form-group label { font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: #8c857f; }
        .b2b-form-control { width: 100%; box-sizing: border-box; padding: 0.65rem 0.85rem; border: 1px solid rgba(0,0,0,0.08); border-radius: 6px; background: #fcfbf9; color: #2b2826; font-size: 0.9rem; transition: border-color 0.2s; }
        .b2b-form-control:focus { outline: none; border-color: #fc2779; }
        .b2b-row2 { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; width: 100%; max-width: 100%; }

        /* Code block */
        .b2b-code-block { background: #0f172a; border-radius: 10px; overflow: hidden; width: 100%; max-width: 100%; }
        .b2b-code-head { background: #1e293b; padding: 0.6rem 1rem; font-family: monospace; font-size: 0.75rem; color: #94a3b8; display: flex; justify-content: space-between; border-bottom: 1px solid #334155; }
        .b2b-code-body { padding: 1rem; font-family: "Courier New", monospace; font-size: 0.8rem; color: #f1f5f9; margin: 0; white-space: pre-wrap; overflow-x: auto; max-height: 280px; width: 100%; max-width: 100%; box-sizing: border-box; }

        /* Preview pane */
        .b2b-preview { background: #fcfbf9; border: 1px solid rgba(0,0,0,0.05); border-radius: 12px; padding: 1.5rem; min-height: 200px; width: 100%; max-width: 100%; box-sizing: border-box; }
        .b2b-product-list { display: flex; flex-direction: column; gap: 1rem; width: 100%; }
        .b2b-product-item { background: #fff; border: 1px solid rgba(0,0,0,0.04); border-radius: 8px; padding: 1.1rem; transition: transform 0.2s; width: 100%; box-sizing: border-box; }
        .b2b-product-item:hover { transform: translateY(-1px); border-color: rgba(252,39,121,0.15); }
        .b2b-product-tag { display: inline-block; font-size: 0.65rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; background: #ffe6f0; color: #fc2779; padding: 0.2rem 0.5rem; border-radius: 3px; margin-bottom: 0.4rem; }
        .b2b-product-item h5 { font-size: 0.95rem; font-weight: 700; margin-bottom: 0.2rem; }
        .b2b-product-item p { font-size: 0.82rem; color: #8c857f; line-height: 1.5; margin: 0; }

        /* ── Integration snippet ── */
        .b2b-integration { background: #fff; border: 1px solid rgba(0,0,0,0.05); border-radius: 20px; padding: 2.5rem; margin-bottom: 5rem; max-width: 800px; margin-left: auto; margin-right: auto; }
        .b2b-integration h2 { font-family: "Playfair Display", serif; font-size: 1.8rem; text-align: center; margin-bottom: 0.5rem; }
        .b2b-integration > p { color: #8c857f; text-align: center; margin-bottom: 1.5rem; font-size: 0.9rem; }

        /* ── Pricing ── */
        .b2b-pricing { text-align: center; margin-bottom: 5rem; }
        .b2b-pricing h2 { font-family: "Playfair Display", serif; font-size: clamp(1.6rem, 4vw, 2.2rem); margin-bottom: 0.5rem; }
        .b2b-pricing > p { color: #8c857f; margin-bottom: 2.5rem; font-size: 0.95rem; }
        .b2b-pricing-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; max-width: 960px; margin: 0 auto; }
        @media (max-width: 768px) { .b2b-pricing-grid { grid-template-columns: 1fr; max-width: 400px; } }
        .b2b-price-card { background: #fff; border: 1px solid rgba(0,0,0,0.05); border-radius: 16px; padding: 2.5rem 1.75rem; display: flex; flex-direction: column; text-align: left; position: relative; transition: transform 0.25s, box-shadow 0.25s; }
        .b2b-price-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,0.04); }
        .b2b-price-card.popular { border-color: #fc2779; box-shadow: 0 8px 30px rgba(252,39,121,0.06); }
        .b2b-price-badge { position: absolute; top: 0.75rem; right: 0.75rem; background: #fc2779; color: #fff; font-size: 0.65rem; font-weight: 700; padding: 0.2rem 0.6rem; border-radius: 20px; letter-spacing: 0.03em; }
        .b2b-price-card h3 { font-size: 1.2rem; font-weight: 700; margin-bottom: 0.25rem; }
        .b2b-price-card .price-desc { color: #8c857f; font-size: 0.85rem; }
        .b2b-price-amount { font-size: 2.2rem; font-weight: 800; margin: 1rem 0; }
        .b2b-price-amount span { font-size: 0.9rem; font-weight: 500; color: #8c857f; }
        .b2b-price-features { list-style: none; margin-bottom: 2rem; flex: 1; padding: 0; }
        .b2b-price-features li { margin-bottom: 0.6rem; display: flex; align-items: center; gap: 0.4rem; font-size: 0.85rem; color: #8c857f; }

        /* ── FAQ ── */
        .b2b-faq { max-width: 720px; margin: 0 auto 5rem; }
        .b2b-faq h2 { font-family: "Playfair Display", serif; font-size: 1.8rem; text-align: center; margin-bottom: 2.5rem; }
        .b2b-faq-list { display: flex; flex-direction: column; gap: 1.5rem; }
        .b2b-faq-item { border-bottom: 1px solid rgba(0,0,0,0.05); padding-bottom: 1.25rem; }
        .b2b-faq-item h3 { font-size: 1rem; font-weight: 700; margin-bottom: 0.4rem; }
        .b2b-faq-item p { color: #8c857f; font-size: 0.9rem; line-height: 1.6; }

        /* ── Contact form ── */
        .b2b-contact { background: #fff; border: 1px solid rgba(0,0,0,0.05); border-radius: 20px; padding: 2.5rem; max-width: 560px; margin: 0 auto; }

        /* ══════════════════════════════════════
           MOBILE RESPONSIVE (≤ 640px)
           ══════════════════════════════════════ */
        @media (max-width: 640px) {
          .b2b-container { padding: 2.5rem 1rem; }
          .b2b-hero { margin-bottom: 3rem; }
          .b2b-hero h1 { font-size: 1.75rem; }
          .b2b-hero p { font-size: 0.9rem; margin-bottom: 1.5rem; }
          .b2b-hero-btns { flex-direction: column; gap: 0.5rem; }
          .b2b-page .b2b-btn-primary,
          .b2b-page .b2b-btn-outline { width: 100%; justify-content: center; padding: 0.7rem 1rem; font-size: 0.9rem; }

          .b2b-grid3 { gap: 1rem; margin-bottom: 3rem; }
          .b2b-card { padding: 1.5rem; }
          .b2b-card h3 { font-size: 1rem; }
          .b2b-card p { font-size: 0.85rem; }

          .b2b-sandbox { padding: 1.25rem; margin-bottom: 3rem; border-radius: 14px; }
          .b2b-sandbox-head { margin-bottom: 1.5rem; }
          .b2b-sandbox-head h2 { font-size: 1.4rem; }
          .b2b-sandbox-head p { font-size: 0.82rem; }
          .b2b-sandbox-grid { gap: 1.5rem; }
          .b2b-sandbox-col h3 { font-size: 0.65rem; }
          .b2b-form-group label { font-size: 0.68rem; }
          .b2b-form-control { padding: 0.55rem 0.7rem; font-size: 0.85rem; }

          .b2b-code-block { border-radius: 8px; }
          .b2b-code-head { padding: 0.5rem 0.75rem; font-size: 0.65rem; }
          .b2b-code-body { padding: 0.75rem; font-size: 0.65rem; max-height: 200px; word-break: break-all; }

          .b2b-preview { padding: 1rem; border-radius: 10px; }
          .b2b-product-item { padding: 0.85rem; }
          .b2b-product-tag { font-size: 0.58rem; }
          .b2b-product-item h5 { font-size: 0.88rem; }
          .b2b-product-item p { font-size: 0.78rem; }

          .b2b-integration { padding: 1.5rem; margin-bottom: 3rem; border-radius: 14px; }
          .b2b-integration h2 { font-size: 1.35rem; }
          .b2b-integration > p { font-size: 0.82rem; }

          .b2b-pricing { margin-bottom: 3rem; }
          .b2b-pricing h2 { font-size: 1.4rem; }
          .b2b-pricing > p { font-size: 0.85rem; margin-bottom: 1.5rem; }
          .b2b-price-card { padding: 1.75rem 1.25rem; border-radius: 14px; }
          .b2b-price-card h3 { font-size: 1.05rem; }
          .b2b-price-amount { font-size: 1.8rem; margin: 0.75rem 0; }
          .b2b-price-amount span { font-size: 0.8rem; }
          .b2b-price-features li { font-size: 0.8rem; }
          .b2b-price-badge { font-size: 0.58rem; padding: 0.15rem 0.5rem; }

          .b2b-faq { margin-bottom: 3rem; }
          .b2b-faq h2 { font-size: 1.4rem; margin-bottom: 1.5rem; }
          .b2b-faq-list { gap: 1rem; }
          .b2b-faq-item { padding-bottom: 1rem; }
          .b2b-faq-item h3 { font-size: 0.9rem; }
          .b2b-faq-item p { font-size: 0.82rem; }

          .b2b-contact { padding: 1.5rem; border-radius: 14px; }
        }
      `}</style>

      <div className="b2b-container">
        {/* Dynamic Region Selector Toggle */}
        <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginBottom: "2rem" }}>
          <button
            onClick={() => setPaymentRegion("USD")}
            style={{
              padding: "0.4rem 1.1rem",
              borderRadius: "99px",
              border: "1px solid " + (paymentRegion === "USD" ? "#fc2779" : "rgba(0,0,0,0.08)"),
              background: paymentRegion === "USD" ? "#fc2779" : "transparent",
              color: paymentRegion === "USD" ? "#fff" : "#2b2826",
              cursor: "pointer",
              fontSize: "0.8rem",
              fontWeight: 600,
              transition: "all 0.3s ease"
            }}
          >
            🇺🇸 Global (USD)
          </button>
          <button
            onClick={() => setPaymentRegion("INR")}
            style={{
              padding: "0.4rem 1.1rem",
              borderRadius: "99px",
              border: "1px solid " + (paymentRegion === "INR" ? "#fc2779" : "rgba(0,0,0,0.08)"),
              background: paymentRegion === "INR" ? "#fc2779" : "transparent",
              color: paymentRegion === "INR" ? "#fff" : "#2b2826",
              cursor: "pointer",
              fontSize: "0.8rem",
              fontWeight: 600,
              transition: "all 0.3s ease"
            }}
          >
            🇮🇳 India (INR)
          </button>
        </div>
        <section className="b2b-hero">
          <h1>{paymentRegion === "INR" ? "Plug-and-Play AI Skincare for Indian Brands" : "Plug-and-Play AI Skincare for Global Brands"}</h1>
          <p>Rent our climate-aware recommendation engine. Boost your store sales, cut returns, and give customers dermatologist-level routines {paymentRegion === "INR" ? "adapted for their tap water and weather" : "adapted for their local water and weather"}.</p>
          <div className="b2b-hero-btns">
            <Link href="/b2b/pitch" className="b2b-btn-primary" style={{ background: "linear-gradient(135deg, #fc2779 0%, #8b5cf6 100%)" }}>
              View Interactive Pitch Deck
            </Link>
            <a href="#sandbox" className="b2b-btn-outline">Try Sandbox</a>
            <a href="#pricing" className="b2b-btn-outline">View Pricing {paymentRegion === "INR" ? "(INR)" : "(USD)"}</a>
          </div>
        </section>

        <section className="b2b-grid3">
          <div className="b2b-card">
            <div className="b2b-icon"><Zap size={22} /></div>
            <h3>Embed With One Line</h3>
            <p>Copy-paste our JavaScript snippet into your Shopify, WooCommerce, or HTML page. No developer setup required.</p>
          </div>
          <div className="b2b-card">
            <div className="b2b-icon"><Server size={22} /></div>
            <h3>Climate-Aware Algorithm</h3>
            <p>{paymentRegion === "INR" ? "Our backend calculates real-time temperature, humidity, and water hardness metrics across India to suggest the best skincare fits." : "Our backend calculates real-time temperature, humidity, and water hardness metrics globally to suggest the best skincare fits."}</p>
          </div>
          <div className="b2b-card">
            <div className="b2b-icon"><Smartphone size={22} /></div>
            <h3>Proven Conversion Boost</h3>
            <p>Customers shopping with personalized routines buy more items and experience 40% fewer product mismatches and returns.</p>
          </div>
        </section>

        <section id="sandbox" className="b2b-sandbox">
          <div className="b2b-sandbox-head">
            <h2>Interactive Sandbox</h2>
            <p>Test the recommendation engine with live parameters and inspect the raw B2B API response.</p>
          </div>
          <div className="b2b-sandbox-grid">
            <div className="b2b-sandbox-col">
              <h3>Parameters</h3>
              <div className="b2b-form-group">
                <label>Skin Type</label>
                <select className="b2b-form-control" value={skinType} onChange={(e) => setSkinType(e.target.value)}>
                  <option value="oily">Oily Skin</option>
                  <option value="dry">Dry Skin</option>
                  <option value="combination">Combination Skin</option>
                  <option value="sensitive">Sensitive Skin</option>
                </select>
              </div>
              <div className="b2b-form-group">
                <label>Main Concern</label>
                <select className="b2b-form-control" value={mainConcern} onChange={(e) => setMainConcern(e.target.value)}>
                  <option value="acne">Acne & Breakouts</option>
                  <option value="pigmentation">Pigmentation / Dark Spots</option>
                  <option value="dullness">Dullness / Lack of Glow</option>
                  <option value="dehydration">Dehydration / Dry Patches</option>
                </select>
              </div>
              <div className="b2b-form-group">
                <label>Budget Tier</label>
                <select className="b2b-form-control" value={budget} onChange={(e) => setBudget(e.target.value)}>
                  {paymentRegion === "INR" ? (
                    <>
                      <option value="under_500">Under ₹500 / product</option>
                      <option value="under_1000">Under ₹1,000 / product</option>
                      <option value="under_2000">All Products / High-end</option>
                    </>
                  ) : (
                    <>
                      <option value="under_500">Under $15 / product</option>
                      <option value="under_1000">Under $30 / product</option>
                      <option value="under_2000">All Products / High-end</option>
                    </>
                  )}
                </select>
              </div>
              <div className="b2b-form-group">
                <label>City</label>
                <input type="text" className="b2b-form-control" value={city} onChange={(e) => setCity(e.target.value)} />
              </div>
              <div className="b2b-row2">
                <div className="b2b-form-group">
                  <label>Temp (°C)</label>
                  <input type="number" className="b2b-form-control" value={temp} onChange={(e) => setTemp(Number(e.target.value))} />
                </div>
                <div className="b2b-form-group">
                  <label>Humidity (%)</label>
                  <input type="number" className="b2b-form-control" value={humidity} onChange={(e) => setHumidity(Number(e.target.value))} />
                </div>
              </div>
              <button className="b2b-btn-primary" onClick={triggerAPI} disabled={loading} style={{ width: "100%", marginTop: "0.5rem" }}>
                {loading ? "Generating..." : "Call API & Get Recommendations"}
              </button>

              <h3 style={{ marginTop: "1.5rem" }}>API Response</h3>
              <div className="b2b-code-block">
                <div className="b2b-code-head">
                  <span>POST /api/v1/recommend</span>
                  <span style={{ color: "#22c55e" }}>200 OK</span>
                </div>
                <pre className="b2b-code-body">
                  {error ? (
                    <span style={{ color: "#ef4444" }}>Error: {error}</span>
                  ) : response ? (
                    JSON.stringify(response, null, 2)
                  ) : (
                    `{\n  "message": "Click the button to run the AI engine."\n}`
                  )}
                </pre>
              </div>
            </div>

            <div className="b2b-sandbox-col">
              <h3>Storefront Preview</h3>
              <div className="b2b-preview">
                {response ? (
                  <>
                    {response.climateAdjustment && (
                      <div style={{ background: "rgba(252,39,121,0.06)", borderLeft: "4px solid #fc2779", padding: "0.75rem", borderRadius: "4px", fontSize: "0.85rem", marginBottom: "1rem" }}>
                        <strong>Climate Alert:</strong> {response.climateAdjustment.alertText}
                      </div>
                    )}
                    <div className="b2b-product-list">
                      {["cleanser", "treatment", "moisturiser", "sunscreen"].map((step) => {
                        const item = response[step];
                        if (!item) return null;
                        return (
                          <div className="b2b-product-item" key={step}>
                            <span className="b2b-product-tag">{step}</span>
                            <h5>{item.name}</h5>
                            <p>{item.reason}</p>
                          </div>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <div style={{ textAlign: "center", padding: "3rem 1rem", color: "#8c857f" }}>
                    <Zap size={28} style={{ margin: "0 auto 0.75rem", opacity: 0.4, color: "#fc2779" }} />
                    <p style={{ fontSize: "0.85rem" }}>Adjust parameters and click <strong>Call API</strong> to preview the storefront widget.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="b2b-integration">
          <h2>Integration is This Simple</h2>
          <p>Paste this snippet inside the header of your website to let your storefront request recommendations.</p>
          <div className="b2b-code-block">
            <div className="b2b-code-head"><span>Shopify / WooCommerce Embed Code</span></div>
            <pre className="b2b-code-body" style={{ color: "#38bdf8" }}>
{`<!-- Paste this inside your page header -->
<script
  src="https://www.mirhaandco.com/widgets/recommend.js"
  data-api-key="YOUR_API_KEY"
  data-theme="light"
  async
></script>

<div id="mirha-skincare-widget"></div>`}
            </pre>
          </div>
        </section>

        <section id="pricing" className="b2b-pricing">
          <h2>{paymentRegion === "INR" ? "Simple, Flat INR Pricing" : "Simple, Flat USD Pricing"}</h2>
          <p>{paymentRegion === "INR" ? "Start testing for free and scale as your traffic grows. Keep it local, pay in Rupees." : "Start testing for free and scale as your traffic grows. Keep it global, pay in Dollars."}</p>
          <div className="b2b-pricing-grid">
            <div className="b2b-price-card">
              <h3>Starter</h3>
              <p className="price-desc">Best for dev testing and setting up.</p>
              <div className="b2b-price-amount">{paymentRegion === "INR" ? "₹0" : "$0"} <span>/ month</span></div>
              <ul className="b2b-price-features">
                <li><Check size={14} color="#fc2779" /> 100 API requests / month</li>
                <li><Check size={14} color="#fc2779" /> Full climate adjustments</li>
                <li><Check size={14} color="#fc2779" /> Standard developer support</li>
              </ul>
              <a href="#contact" className="b2b-btn-outline" style={{ width: "100%", justifyContent: "center" }}>Get Trial Key</a>
            </div>
            <div className="b2b-price-card popular">
              <span className="b2b-price-badge">Most Popular</span>
              <h3>Grow Plan</h3>
              <p className="price-desc">{paymentRegion === "INR" ? "Perfect for active Indian beauty brands." : "Perfect for active global beauty brands."}</p>
              <div className="b2b-price-amount">{paymentRegion === "INR" ? "₹3,999" : "$49"} <span>/ month</span></div>
              <ul className="b2b-price-features">
                <li><Check size={14} color="#fc2779" /> 5,000 API requests / month</li>
                <li><Check size={14} color="#fc2779" /> Custom product recommendations</li>
                <li><Check size={14} color="#fc2779" /> Analytics dashboard</li>
                <li><Check size={14} color="#fc2779" /> Priority support</li>
              </ul>
              <a href="#contact" className="b2b-btn-primary" style={{ width: "100%", justifyContent: "center" }}>Subscribe Now</a>
            </div>
            <div className="b2b-price-card">
              <h3>Scale Plan</h3>
              <p className="price-desc">Designed for high-traffic stores.</p>
              <div className="b2b-price-amount">{paymentRegion === "INR" ? "₹7,999" : "$99"} <span>/ month</span></div>
              <ul className="b2b-price-features">
                <li><Check size={14} color="#fc2779" /> 20,000 API requests / month</li>
                <li><Check size={14} color="#fc2779" /> Multi-domain licensing</li>
                <li><Check size={14} color="#fc2779" /> Dedicated Slack channel</li>
                <li><Check size={14} color="#fc2779" /> 99.9% API uptime SLA</li>
              </ul>
              <a href="#contact" className="b2b-btn-outline" style={{ width: "100%", justifyContent: "center" }}>Subscribe Now</a>
            </div>
          </div>
        </section>

        <section className="b2b-faq">
          <h2>Frequently Asked Questions</h2>
          <div className="b2b-faq-list">
            <div className="b2b-faq-item">
              <h3>Will the widget recommend Amazon products or competitor links to my customers?</h3>
              <p><strong>Absolutely not.</strong> Your custom integration only recommends products from <strong>your own brand{"'"}s inventory</strong>. It syncs with your Shopify catalog to drive sales directly to your own checkout page.</p>
            </div>
            <div className="b2b-faq-item">
              <h3>How do we load our products into your recommendation system?</h3>
              <p>Once you subscribe to the Grow or Scale plan, you can easily sync your store{"'"}s catalog (via a CSV upload or a simple Shopify API integration). Our system automatically categorizes and matches your products to different skin concerns and climates.</p>
            </div>
            <div className="b2b-faq-item">
              <h3>How difficult is it to install the assistant widget?</h3>
              <p>It takes under 3 minutes. You just copy-paste a single line of JavaScript code into your website{"'"}s header (e.g. your Shopify theme header or WooCommerce builder). No software engineering skills are required.</p>
            </div>
            <div className="b2b-faq-item">
              <h3>How does the climate-aware recommendation work?</h3>
              <p>{paymentRegion === "INR" ? "The assistant automatically detects the shopper's location within India. It checks regional tap water hardness and real-time weather data (temperature and humidity) to swap products dynamically—ensuring they get the perfect skincare routine for their environment." : "The assistant automatically detects the shopper's location globally. It checks local tap water hardness and real-time weather data (temperature and humidity) to swap products dynamically—ensuring they get the perfect skincare routine for their environment."}</p>
            </div>
            <div className="b2b-faq-item">
              <h3>How long does onboarding and delivery of our custom widget take?</h3>
              <p>It depends on your catalog size and plan. For the <strong>Starter</strong> plan, you get test key instructions instantly (under 10 minutes). For the <strong>Grow</strong> plan (small brands with 10–40 products), delivery takes <strong>1 to 2 days</strong>. For the <strong>Scale</strong> plan (larger stores with automated Shopify API syncing), it takes <strong>3 to 5 days</strong> to set up, test, and go live.</p>
            </div>
          </div>
        </section>

        <section id="contact" className="b2b-contact">
          {submittedContact ? (
            <div style={{ textAlign: "center", padding: "2rem 0" }}>
              <div style={{ display: "inline-flex", background: "rgba(252,39,121,0.08)", padding: "1rem", borderRadius: "50%", color: "#fc2779", marginBottom: "1.5rem" }}>
                <CheckCircle2 size={48} />
              </div>
              <h3 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.6rem", marginBottom: "0.5rem" }}>Request Submitted!</h3>
              <p style={{ color: "#8c857f", fontSize: "0.9rem" }}>{paymentRegion === "INR" ? "Thank you, we've registered your interest. We will email you with your active API key and UPI payment details within 24 hours." : "Thank you, we've registered your interest. We will email you with your active API key and checkout details within 24 hours."}</p>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div style={{ textAlign: "center", marginBottom: "0.5rem" }}>
                <h3 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.6rem", marginBottom: "0.4rem" }}>Get Started Today</h3>
                <p style={{ color: "#8c857f", fontSize: "0.85rem" }}>Provide your brand details to receive your API test key and payment setup instructions.</p>
              </div>
              <div className="b2b-form-group">
                <label>Name</label>
                <input type="text" required className="b2b-form-control" value={contactName} onChange={(e) => setContactName(e.target.value)} placeholder="e.g. Tanvir Khan" />
              </div>
              <div className="b2b-form-group">
                <label>Email Address</label>
                <input type="email" required className="b2b-form-control" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} placeholder="e.g. contact@yourbrand.com" />
              </div>
              <div className="b2b-form-group">
                <label>Brand / Store Name</label>
                <input type="text" required className="b2b-form-control" value={contactBrand} onChange={(e) => setContactBrand(e.target.value)} placeholder={paymentRegion === "INR" ? "e.g. Indie Organics India" : "e.g. Aura Skincare US"} />
              </div>
              <div className="b2b-form-group">
                <label>Integration Platform / Comments</label>
                <textarea className="b2b-form-control" rows={3} value={contactMessage} onChange={(e) => setContactMessage(e.target.value)} placeholder="e.g. Shopify store selling organic sunscreens..." />
              </div>
              <button type="submit" className="b2b-btn-primary" style={{ width: "100%" }}>
                Submit & Request Key <Send size={16} />
              </button>
            </form>
          )}
        </section>
      </div>
    </main>
  );
}

