"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Code, Server, Smartphone, Zap, Check, Send, CheckCircle2 } from "lucide-react";

export default function B2BPlayground() {
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

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactBrand) return;
    setSubmittedContact(true);
  };

  return (
    <main className="b2b-page">
      <style>{`
        .b2b-page {
          --black: #0c0a09;
          --white: #fafaf8;
          --rose: #a27b5c;
          --rose-light: #fbf7f2;
          --paper: #fffcf8;
          --ink: #2b2826;
          --muted: #8c8179;
          --rule: #e8ded6;
          background: var(--paper);
          color: var(--ink);
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          line-height: 1.5;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 6rem 2rem;
        }

        .hero {
          text-align: center;
          max-width: 800px;
          margin: 0 auto 5rem auto;
        }

        .hero h1 {
          font-family: "Playfair Display", Georgia, serif;
          font-size: 3.2rem;
          font-weight: 700;
          color: var(--ink);
          line-height: 1.2;
          margin-bottom: 1.5rem;
        }

        .hero p {
          font-size: 1.25rem;
          color: var(--muted);
          margin-bottom: 2rem;
        }

        .grid-3 {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2.5rem;
          margin-bottom: 6rem;
        }

        .card {
          background: var(--rose-light);
          border: 1px solid var(--rule);
          border-radius: 16px;
          padding: 2.5rem;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(162, 123, 92, 0.08);
        }

        .icon-box {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: var(--rose);
          color: var(--white);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
        }

        .card h3 {
          font-size: 1.3rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
          color: var(--ink);
        }

        .card p {
          color: var(--muted);
          font-size: 0.95rem;
          line-height: 1.6;
        }

        .sandbox-section {
          background: var(--white);
          border: 1px solid var(--rule);
          border-radius: 24px;
          padding: 3.5rem;
          margin-bottom: 6rem;
        }

        .sandbox-header {
          margin-bottom: 3rem;
          text-align: center;
        }

        .sandbox-header h2 {
          font-family: "Playfair Display", Georgia, serif;
          font-size: 2.2rem;
          margin-bottom: 0.5rem;
        }

        .sandbox-header p {
          color: var(--muted);
        }

        .sandbox-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 3.5rem;
        }

        @media (max-width: 968px) {
          .sandbox-grid {
            grid-template-columns: 1fr;
          }
        }

        .sandbox-controls {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group label {
          font-size: 0.85rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--muted);
        }

        .form-control {
          padding: 0.8rem 1rem;
          border: 1px solid var(--rule);
          border-radius: 8px;
          background: var(--paper);
          color: var(--ink);
          font-size: 0.95rem;
        }

        .form-control:focus {
          outline: none;
          border-color: var(--rose);
        }

        .btn-api {
          margin-top: 1rem;
          background: var(--rose);
          color: var(--white);
          border: none;
          padding: 1rem;
          font-weight: 600;
          font-size: 1rem;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .btn-api:hover {
          background: #8c6a4e;
        }

        .sandbox-results {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .tab-container {
          background: var(--black);
          border-radius: 12px;
          overflow: hidden;
        }

        .tab-header {
          background: #1c1917;
          padding: 0.75rem 1.5rem;
          font-family: monospace;
          font-size: 0.8rem;
          color: #a8a29e;
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #2e2a24;
        }

        .code-display {
          padding: 1.5rem;
          font-family: "Courier New", Courier, monospace;
          font-size: 0.85rem;
          color: #f5f5f4;
          overflow-x: auto;
          margin: 0;
          white-space: pre-wrap;
        }

        .preview-pane {
          background: var(--rose-light);
          border: 1px solid var(--rule);
          border-radius: 12px;
          padding: 2rem;
        }

        .preview-pane h4 {
          font-family: "Playfair Display", Georgia, serif;
          font-size: 1.25rem;
          margin-bottom: 1.5rem;
          border-bottom: 1px solid var(--rule);
          padding-bottom: 0.5rem;
        }

        .product-list {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }

        .product-item {
          background: var(--white);
          border: 1px solid var(--rule);
          border-radius: 8px;
          padding: 1.2rem;
        }

        .product-item h5 {
          font-size: 1rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
        }

        .product-item p {
          font-size: 0.85rem;
          color: var(--muted);
          margin: 0;
        }

        .product-tag {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          background: var(--rose-light);
          color: var(--rose);
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          margin-bottom: 0.5rem;
        }

        .integration-section {
          background: var(--rose-light);
          border: 1px solid var(--rule);
          border-radius: 24px;
          padding: 3.5rem;
          margin-bottom: 6rem;
        }

        .pricing-section {
          text-align: center;
          margin-bottom: 6rem;
        }

        .pricing-section h2 {
          font-family: "Playfair Display", Georgia, serif;
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .pricing-section p {
          color: var(--muted);
          margin-bottom: 3rem;
        }

        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2.5rem;
          max-width: 1000px;
          margin: 0 auto;
        }

        .price-card {
          background: var(--white);
          border: 1px solid var(--rule);
          border-radius: 16px;
          padding: 3rem 2rem;
          display: flex;
          flex-direction: column;
          text-align: left;
        }

        .price-card.popular {
          border-color: var(--rose);
          box-shadow: 0 10px 30px rgba(162, 123, 92, 0.08);
          position: relative;
        }

        .price-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: var(--rose);
          color: var(--white);
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
        }

        .price-card h3 {
          font-size: 1.4rem;
          margin-bottom: 0.5rem;
        }

        .price-amount {
          font-size: 2.5rem;
          font-weight: 800;
          margin: 1.5rem 0;
          color: var(--ink);
        }

        .price-amount span {
          font-size: 1rem;
          font-weight: 500;
          color: var(--muted);
        }

        .price-features {
          list-style: none;
          margin-bottom: 2.5rem;
          flex: 1;
        }

        .price-features li {
          margin-bottom: 0.8rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          color: var(--muted);
        }

        .btn-price {
          background: var(--rose-light);
          color: var(--rose);
          border: 1px solid var(--rose);
          padding: 0.8rem;
          border-radius: 8px;
          font-weight: 600;
          text-align: center;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-price.popular-btn {
          background: var(--rose);
          color: var(--white);
          border: none;
        }

        .btn-price:hover {
          opacity: 0.9;
          transform: scale(1.02);
        }

        .contact-section {
          background: var(--white);
          border: 1px solid var(--rule);
          border-radius: 24px;
          padding: 3.5rem;
          max-width: 600px;
          margin: 0 auto;
        }
      `}</style>

      <div className="container">
        {/* HERO SECTION */}
        <section className="hero">
          <h1>Plug-and-Play AI Skincare for Indian Brands</h1>
          <p>
            Renting out our custom formulation matching technology. Boost your store's sales, cut return rates, and give your customers dermatologist-level routines adapted for their regional tap water and weather.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
            <a href="#sandbox" className="btn-api" style={{ textDecoration: "none", padding: "0.8rem 1.8rem" }}>
              Try Sandbox
            </a>
            <a href="#pricing" className="btn-price" style={{ padding: "0.8rem 1.8rem", borderRadius: "8px" }}>
              View Pricing (INR)
            </a>
          </div>
        </section>

        {/* THREE COLUMN VALUES */}
        <section className="grid-3">
          <div className="card">
            <div className="icon-box">
              <Zap size={24} />
            </div>
            <h3>Embed With One Line</h3>
            <p>
              Copy-paste our JavaScript snippet directly into your Shopify, WooCommerce, or HTML page. No complex developer setup required.
            </p>
          </div>

          <div className="card">
            <div className="icon-box">
              <Server size={24} />
            </div>
            <h3>Climate-Aware Algorithm</h3>
            <p>
              Our backend calculates real-time temperature, humidity, and water hardness metrics across India to suggest the best skincare fits.
            </p>
          </div>

          <div className="card">
            <div className="icon-box">
              <Smartphone size={24} />
            </div>
            <h3>Proven Conversion Boost</h3>
            <p>
              Customers shopping with personalized routines buy more items and experience 40% fewer product mismatches and returns.
            </p>
          </div>
        </section>

        {/* SANDBOX DEV PLAYGROUND */}
        <section id="sandbox" className="sandbox-section">
          <div className="sandbox-header">
            <h2>Interactive Sandbox</h2>
            <p>Test the recommendation engine with live parameters and inspect the raw B2B API response.</p>
          </div>

          <div className="sandbox-grid">
            <div className="sandbox-controls">
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.5rem" }}>Parameters</h3>
              
              <div className="form-group">
                <label>Skin Type</label>
                <select className="form-control" value={skinType} onChange={(e) => setSkinType(e.target.value)}>
                  <option value="oily">Oily Skin</option>
                  <option value="dry">Dry Skin</option>
                  <option value="combination">Combination Skin</option>
                  <option value="sensitive">Sensitive Skin</option>
                </select>
              </div>

              <div className="form-group">
                <label>Main Concern</label>
                <select className="form-control" value={mainConcern} onChange={(e) => setMainConcern(e.target.value)}>
                  <option value="acne">Acne & Breakouts</option>
                  <option value="pigmentation">Pigmentation / Dark Spots</option>
                  <option value="dullness">Dullness / Lack of Glow</option>
                  <option value="dehydration">Dehydration / Dry Patches</option>
                </select>
              </div>

              <div className="form-group">
                <label>Budget Tier</label>
                <select className="form-control" value={budget} onChange={(e) => setBudget(e.target.value)}>
                  <option value="under_500">Under ₹500 / product</option>
                  <option value="under_1000">Under ₹1,000 / product</option>
                  <option value="under_2000">All Products / High-end</option>
                </select>
              </div>

              <div className="form-group">
                <label>City (For Climate Adaptability)</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={city} 
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div className="form-group">
                  <label>Temp (°C)</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    value={temp} 
                    onChange={(e) => setTemp(Number(e.target.value))}
                  />
                </div>
                <div className="form-group">
                  <label>Humidity (%)</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    value={humidity} 
                    onChange={(e) => setHumidity(Number(e.target.value))}
                  />
                </div>
              </div>

              <button className="btn-api" onClick={triggerAPI} disabled={loading}>
                {loading ? "Generating..." : "Call API & Get Recommendations"}
              </button>
            </div>

            <div className="sandbox-results">
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.5rem" }}>API Response</h3>
              
              {/* Tab component displaying the raw JSON */}
              <div className="tab-container">
                <div className="tab-header">
                  <span>POST /api/v1/recommend</span>
                  <span style={{ color: "#22c55e" }}>200 OK</span>
                </div>
                <pre className="code-display">
                  {error ? (
                    <span style={{ color: "#ef4444" }}>Error: {error}</span>
                  ) : response ? (
                    JSON.stringify(response, null, 2)
                  ) : (
                    `{
  "message": "Click the button to run the AI engine."
}`
                  )}
                </pre>
              </div>

              {/* Renders the output visually to simulate rendering on a client's page */}
              {response && (
                <div className="preview-pane">
                  <h4>Interactive Preview on Storefront</h4>
                  
                  {response.climateAdjustment && (
                    <div style={{ background: "rgba(162,123,92,0.1)", borderLeft: "4px solid var(--rose)", padding: "0.75rem", borderRadius: "4px", fontSize: "0.85rem", marginBottom: "1rem" }}>
                      <strong>Climate Alert:</strong> {response.climateAdjustment.alertText}
                    </div>
                  )}

                  <div className="product-list">
                    {["cleanser", "treatment", "moisturiser", "sunscreen"].map((step) => {
                      const item = response[step];
                      if (!item) return null;
                      return (
                        <div className="product-item" key={step}>
                          <span className="product-tag">{step}</span>
                          <h5>{item.name}</h5>
                          <p>{item.reason}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ONE-LINE INTEGRATION DEMO */}
        <section className="integration-section">
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "2rem", marginBottom: "1rem", textAlign: "center" }}>
              Integration is This Simple
            </h2>
            <p style={{ color: "var(--muted)", marginBottom: "2rem", textAlign: "center" }}>
              Paste this snippet inside the header of your website to let your storefront request recommendations.
            </p>
            <div className="tab-container">
              <div className="tab-header">
                <span>Shopify / WooCommerce Embed Code</span>
              </div>
              <pre className="code-display" style={{ color: "#38bdf8" }}>
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
          </div>
        </section>

        {/* PRICING SECTION */}
        <section id="pricing" className="pricing-section">
          <h2>Simple, Flat INR Pricing</h2>
          <p>Start testing for free and scale as your traffic grows. Keep it local, pay in Rupees.</p>

          <div className="pricing-grid">
            <div className="price-card">
              <h3>Starter</h3>
              <p style={{ color: "var(--muted)", fontSize: "0.9rem" }}>Best for dev testing and setting up.</p>
              <div className="price-amount">
                ₹0 <span>/ month</span>
              </div>
              <ul className="price-features">
                <li><Check size={16} color="var(--rose)" /> 100 API requests / month</li>
                <li><Check size={16} color="var(--rose)" /> Full climate adjustments</li>
                <li><Check size={16} color="var(--rose)" /> Standard developer support</li>
              </ul>
              <a href="#contact" className="btn-price">
                Get Trial Key
              </a>
            </div>

            <div className="price-card popular">
              <span className="price-badge">Most Popular</span>
              <h3>Grow Plan</h3>
              <p style={{ color: "var(--muted)", fontSize: "0.9rem" }}>Perfect for active Indian beauty brands.</p>
              <div className="price-amount">
                ₹3,999 <span>/ month</span>
              </div>
              <ul className="price-features">
                <li><Check size={16} color="var(--rose)" /> 5,000 API requests / month</li>
                <li><Check size={16} color="var(--rose)" /> Custom product recommendations</li>
                <li><Check size={16} color="var(--rose)" /> Analytics dashboard</li>
                <li><Check size={16} color="var(--rose)" /> Priority support</li>
              </ul>
              <a href="#contact" className="btn-price popular-btn">
                Subscribe Now
              </a>
            </div>

            <div className="price-card">
              <h3>Scale Plan</h3>
              <p style={{ color: "var(--muted)", fontSize: "0.9rem" }}>Designed for high-traffic stores.</p>
              <div className="price-amount">
                ₹7,999 <span>/ month</span>
              </div>
              <ul className="price-features">
                <li><Check size={16} color="var(--rose)" /> 20,000 API requests / month</li>
                <li><Check size={16} color="var(--rose)" /> Multi-domain licensing</li>
                <li><Check size={16} color="var(--rose)" /> Dedicated Slack channel</li>
                <li><Check size={16} color="var(--rose)" /> 99.9% API uptime SLA</li>
              </ul>
              <a href="#contact" className="btn-price">
                Subscribe Now
              </a>
            </div>
          </div>
        </section>

        {/* REGISTRATION AND SALES FORM */}
        <section id="contact" className="contact-section">
          {submittedContact ? (
            <div style={{ textAlign: "center", padding: "2rem 0" }}>
              <div style={{ display: "inline-flex", background: "rgba(162,123,92,0.1)", padding: "1rem", borderRadius: "50%", color: "var(--rose)", marginBottom: "1.5rem" }}>
                <CheckCircle2 size={48} />
              </div>
              <h3 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.8rem", marginBottom: "0.5rem" }}>Request Submitted!</h3>
              <p style={{ color: "var(--muted)", fontSize: "0.95rem" }}>
                Thank you, we've registered your interest. We will email you with your active API key and UPI payment details within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div style={{ textAlign: "center", marginBottom: "1rem" }}>
                <h3 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.8rem", marginBottom: "0.5rem" }}>Get Started Today</h3>
                <p style={{ color: "var(--muted)", fontSize: "0.9rem" }}>
                  Provide your brand details to receive your API test key and payment setup instructions.
                </p>
              </div>

              <div className="form-group">
                <label>Name</label>
                <input 
                  type="text" 
                  required 
                  className="form-control" 
                  value={contactName} 
                  onChange={(e) => setContactName(e.target.value)} 
                  placeholder="e.g. Tanvir Khan"
                />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input 
                  type="email" 
                  required 
                  className="form-control" 
                  value={contactEmail} 
                  onChange={(e) => setContactEmail(e.target.value)} 
                  placeholder="e.g. contact@yourbrand.com"
                />
              </div>

              <div className="form-group">
                <label>Brand / Store Name</label>
                <input 
                  type="text" 
                  required 
                  className="form-control" 
                  value={contactBrand} 
                  onChange={(e) => setContactBrand(e.target.value)} 
                  placeholder="e.g. Indie Organics India"
                />
              </div>

              <div className="form-group">
                <label>Integration Platform / Comments</label>
                <textarea 
                  className="form-control" 
                  rows={3}
                  value={contactMessage} 
                  onChange={(e) => setContactMessage(e.target.value)} 
                  placeholder="e.g. Shopify store selling organic sunscreens..."
                />
              </div>

              <button type="submit" className="btn-api">
                Submit & Request Key <Send size={16} />
              </button>
            </form>
          )}
        </section>
      </div>
    </main>
  );
}
