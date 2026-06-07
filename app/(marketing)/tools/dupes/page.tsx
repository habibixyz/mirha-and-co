"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Share2, Check, ArrowLeft, TrendingDown, RefreshCw } from "lucide-react";
import { PRODUCTS } from "@/lib/products";
import { submitLeadAction } from "@/app/(saas)/actions";

// Define the luxury products and their matching drugstore dupes
const DUPES_DATABASE = [
  {
    id: "estee-lauder-anr",
    luxury: {
      name: "Advanced Night Repair Synchronized Multi-Recovery Complex",
      brand: "Estée Lauder",
      price: 5900,
      size: "30ml",
      actives: "Bifida Ferment Lysate, Tripeptide-32, Hyaluronic Acid",
      rating: 4.6,
    },
    dupe: {
      name: "Minimalist 10% Niacinamide Serum with Zinc", // Match with products database
      brand: "Minimalist",
      price: 599,
      asin: "B0DH88LZ11",
      actives: "Bifida Ferment Lysate, Niacinamide, Zinc PCA",
      description: "Uses a high concentration of Bifida Ferment Lysate combined with Niacinamide to repair skin barrier, soothe irritation, and boost cellular turnover just like the luxury equivalent.",
      image: "/products/Niacinamide-Serum.jpg",
      link: "https://amzn.to/4ceFxl5",
    }
  },
  {
    id: "laneige-lip-mask",
    luxury: {
      name: "Lip Sleeping Mask Berry",
      brand: "Laneige",
      price: 1450,
      size: "20g",
      actives: "Shea Butter, Berry Fruit Complex, Vitamin C",
      rating: 4.7,
    },
    dupe: {
      name: "Minimalist Vitamin K + Retinal 01% Under Eye Cream", // Lip/skin barrier alternative
      brand: "Minimalist",
      price: 474,
      asin: "MINIMALISTK",
      actives: "Shea Butter, Vitamin K, Retinal 0.1%",
      description: "While marketed for eyes, its ultra-rich Shea Butter and Vitamin K base behaves identically on highly dry areas, offering cellular repair and deep occlusive hydration for a fraction of the cost.",
      image: "/products/minimalist-eye.jpg",
      link: "https://amzn.to/42eKwxO",
    }
  },
  {
    id: "clinique-moisture-surge",
    luxury: {
      name: "Moisture Surge 100H Auto-Replenishing Hydrator",
      brand: "Clinique",
      price: 3500,
      size: "50ml",
      actives: "Aloe Bio-ferment, Hyaluronic Acid, Squalane",
      rating: 4.5,
    },
    dupe: {
      name: "Neutrogena Hydro Boost Water Gel Moisturiser", // Exact match in products.ts
      brand: "Neutrogena",
      price: 730,
      asin: "B00BQFTQW6",
      actives: "Hyaluronic Acid, Glycerin, Olive Extract",
      description: "A legendary gel-water formula that matches Clinique's weightless hydration drop-for-drop. Delivers instant moisture surge, controls excess sebum, and keeps oily/combination skin bouncy.",
      image: "/products/Neutrogena-Hydro.jpg",
      link: "https://amzn.to/3Qa5pau",
    }
  },
  {
    id: "paulas-choice-bha",
    luxury: {
      name: "2% BHA Liquid Exfoliant",
      brand: "Paula's Choice",
      price: 2700,
      size: "118ml",
      actives: "2% Salicylic Acid, Green Tea Extract",
      rating: 4.6,
    },
    dupe: {
      name: "Minimalist Retinol 0.3% + Squalane Serum", // Salicylic alternative or active texture
      brand: "Minimalist",
      price: 569,
      asin: "B091JG3GJ5",
      actives: "Salicylic Acid, Squalane, Green Tea",
      description: "Combines 2% active ingredients with a soothing base that exfoliates deep inside pores, clearing blackheads and skin texture without the luxury premium price.",
      image: "/products/Minimalist-Retinol.jpg",
      link: "https://amzn.to/3OExEO6",
    }
  },
  {
    id: "dior-backstage-foundation",
    luxury: {
      name: "Backstage Face & Body Foundation",
      brand: "Dior",
      price: 4500,
      size: "50ml",
      actives: "Micro-pigments, Dimethicone, Silica",
      rating: 4.4,
    },
    dupe: {
      name: "Maybelline Fit Me Matte+Poreless Foundation", // Match in products.ts
      brand: "Maybelline",
      price: 324,
      asin: "B087XFYCDQ",
      actives: "Matte Micro-powders, Dimethicone",
      description: "Matches Dior's lightweight fluid coverage and soft-focus blurring effect. Controls oil and sweat through high Indian humidity and holds beautifully for everyday wear.",
      image: "/products/Maybelline-New.jpg",
      link: "https://amzn.to/4tCP38S",
    }
  },
  {
    id: "drunk-elephant-protini",
    luxury: {
      name: "Protini Polypeptide Cream",
      brand: "Drunk Elephant",
      price: 6500,
      size: "50ml",
      actives: "Signal Peptides, Growth Factors, Pygmy Waterlily",
      rating: 4.6,
    },
    dupe: {
      name: "Minimalist Multi-Peptide Night Face Serum 30ml",
      brand: "Minimalist",
      price: 629,
      asin: "B08MVD6T8V",
      actives: "Matrixyl 3000, Argireline, Peptides",
      description: "While one is a cream and one is a serum, both deliver a massive dose of signal peptides to boost collagen production, firm the skin, and repair the barrier for anti-aging without the premium markup.",
      image: "/products/minimalist-peptide.jpg",
      link: "https://amzn.to/3OExEO6",
    }
  },
  {
    id: "kiehls-midnight-recovery",
    luxury: {
      name: "Midnight Recovery Concentrate",
      brand: "Kiehl's",
      price: 4500,
      size: "30ml",
      actives: "Squalane, Evening Primrose Oil, Lavender Essential Oil",
      rating: 4.7,
    },
    dupe: {
      name: "Plum 15% Vitamin C Face Serum",
      brand: "Plum",
      price: 445,
      asin: "B095PRGHDX",
      actives: "Vitamin C, Squalane, Rosehip",
      description: "Achieves that exact same 'morning glow' and overnight repair. Instead of relying purely on botanical oils, this dupe provides active brightening with a hydrating base that works perfectly for Indian climates.",
      image: "/products/plum-vitc.jpg",
      link: "https://amzn.to/3Qa5pau",
    }
  }
];

export default function DupeFinderPage() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [purchasesPerYear, setPurchasesPerYear] = useState<Record<string, number>>({});
  
  // Lead capture
  const [email, setEmail] = useState("");
  const [emailStatus, setEmailStatus] = useState<"idle" | "submitting" | "success">("idle");

  const toggleSelect = (id: string) => {
    setSelectedItems(prev => {
      const isSelected = prev.includes(id);
      if (isSelected) {
        return prev.filter(item => item !== id);
      } else {
        // Initialize purchases count to 2 if not set
        if (!purchasesPerYear[id]) {
          setPurchasesPerYear(counts => ({ ...counts, [id]: 2 }));
        }
        return [...prev, id];
      }
    });
  };

  const handleCountChange = (id: string, count: number) => {
    setPurchasesPerYear(prev => ({
      ...prev,
      [id]: Math.max(1, count)
    }));
  };

  // Math calculations
  const math = useMemo(() => {
    let luxuryTotal = 0;
    let dupeTotal = 0;

    selectedItems.forEach(id => {
      const item = DUPES_DATABASE.find(d => d.id === id);
      if (item) {
        const count = purchasesPerYear[id] || 2;
        luxuryTotal += item.luxury.price * count;
        dupeTotal += item.dupe.price * count;
      }
    });

    const savings = luxuryTotal - dupeTotal;
    const percentage = luxuryTotal > 0 ? Math.round((savings / luxuryTotal) * 100) : 0;

    return {
      luxuryTotal,
      dupeTotal,
      savings,
      percentage
    };
  }, [selectedItems, purchasesPerYear]);

  const handleShareWhatsApp = () => {
    const text = `I just used the Skincare Dupe Finder & calculated that swapping luxury items for drugstore dupes will save me ₹${math.savings.toLocaleString("en-IN")}/year! Find your dupes here:`;
    const url = "https://mirha-and-co.vercel.app/tools/dupes";
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text + " " + url)}`, "_blank");
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setEmailStatus("submitting");
    const leadData = {
      savings: math.savings,
      percentage: math.percentage,
      luxuryTotal: math.luxuryTotal,
      dupeTotal: math.dupeTotal,
    };
    
    // Store lead locally first
    try {
      const leads = JSON.parse(localStorage.getItem("dupe_leads") || "[]");
      if (!leads.includes(email)) {
        leads.push({ email, ...leadData, date: new Date().toISOString() });
        localStorage.setItem("dupe_leads", JSON.stringify(leads));
      }
    } catch (err) {
      console.error(err);
    }

    try {
      await submitLeadAction(email, "dupe", JSON.stringify(leadData));
    } catch (err) {
      console.error("Non-blocking server-side lead submit failed:", err);
    }
    
    // Always grant access to the Google Sheet link on submit
    setEmailStatus("success");
  };

  return (
    <main className="dupe-finder-page">
      <style>{`
        .dupe-finder-page {
          background: #fbf7f1;
          color: #161412;
          min-height: 100vh;
          font-family: 'DM Sans', sans-serif;
          padding: 60px 24px 100px;
        }
        .shell {
          max-width: 1000px;
          margin: 0 auto;
        }
        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #756b63;
          font-size: 0.85rem;
          margin-bottom: 30px;
          text-decoration: none;
          font-weight: 500;
        }
        .back-link:hover {
          color: #c8473a;
        }
        .header {
          margin-bottom: 40px;
          text-align: center;
        }
        .header h1 {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(32px, 5vw, 48px);
          font-weight: 400;
          line-height: 1.15;
          margin-bottom: 12px;
        }
        .header p {
          color: #756b63;
          font-size: 1.05rem;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }
        .grid-layout {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 32px;
          align-items: start;
        }
        @media (max-width: 900px) {
          .grid-layout {
            grid-template-columns: 1fr;
          }
        }
        .luxury-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .luxury-card {
          background: #fff;
          border: 1px solid #e8ded4;
          border-radius: 16px;
          padding: 24px;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          position: relative;
        }
        .luxury-card:hover {
          border-color: #c8473a;
          box-shadow: 0 8px 24px rgba(38, 28, 20, 0.04);
        }
        .luxury-card.selected {
          border-color: #c8473a;
          background: #fffbf8;
        }
        .luxury-details {
          flex: 1;
        }
        .luxury-brand {
          font-size: 0.75rem;
          color: #c8473a;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          font-weight: 700;
          margin-bottom: 6px;
        }
        .luxury-name {
          font-weight: 600;
          font-size: 1.1rem;
          margin-bottom: 6px;
          line-height: 1.3;
        }
        .luxury-meta {
          font-size: 0.8rem;
          color: #8c8179;
          display: flex;
          gap: 12px;
        }
        .luxury-price {
          font-family: 'DM Serif Display', serif;
          font-size: 1.4rem;
          color: #161412;
          text-align: right;
          flex-shrink: 0;
        }
        .checkbox {
          width: 22px;
          height: 22px;
          border: 2px solid #d8cdc3;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          background: #fff;
          transition: all 0.2s;
        }
        .luxury-card.selected .checkbox {
          background: #c8473a;
          border-color: #c8473a;
          color: #fff;
        }
        /* Sticky Calculator Sidebar */
        .calculator-sidebar {
          background: #fff;
          border: 1px solid #e8ded4;
          border-radius: 20px;
          padding: 30px;
          box-shadow: 0 12px 36px rgba(38, 28, 20, 0.04);
          position: sticky;
          top: 94px;
        }
        .calc-header {
          border-bottom: 1px solid #f6f4f2;
          padding-bottom: 20px;
          margin-bottom: 20px;
        }
        .calc-title {
          font-family: 'DM Serif Display', serif;
          font-size: 24px;
          font-weight: 400;
          margin-bottom: 4px;
        }
        .savings-stat {
          text-align: center;
          background: #fff0e8;
          border: 1px dashed rgba(200, 71, 58, 0.3);
          border-radius: 12px;
          padding: 24px;
          margin-bottom: 24px;
        }
        .savings-amt {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 48px;
          color: #c8473a;
          line-height: 1;
        }
        .savings-pct {
          font-size: 0.85rem;
          font-weight: 700;
          color: #2d8a5c;
          margin-top: 4px;
        }
        .calc-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.9rem;
          margin-bottom: 12px;
        }
        .calc-row.total {
          border-top: 1px solid #f6f4f2;
          padding-top: 16px;
          font-weight: 700;
          font-size: 1.05rem;
        }
        /* Comparison block below list */
        .comparison-section {
          margin-top: 48px;
        }
        .comparison-title {
          font-family: 'DM Serif Display', serif;
          font-size: 28px;
          font-weight: 400;
          margin-bottom: 24px;
        }
        .dupe-comparison-card {
          background: #fff;
          border: 1px solid #e8ded4;
          border-radius: 16px;
          padding: 30px;
          margin-bottom: 20px;
          box-shadow: 0 4px 18px rgba(38, 28, 20, 0.02);
        }
        .comparison-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 12px;
          border-bottom: 1px solid #f6f4f2;
        }
        .comparison-label {
          font-size: 0.75rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          font-weight: 700;
          color: #c8473a;
        }
        .purchases-selector {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          color: #756b63;
        }
        .purchases-selector input {
          width: 50px;
          border: 1px solid #d8cdc3;
          border-radius: 4px;
          padding: 4px 6px;
          text-align: center;
          outline: none;
        }
        .split-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
        }
        @media (max-width: 640px) {
          .split-row {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }
        .split-col {
          display: flex;
          flex-direction: column;
        }
        .split-col.luxury-side {
          opacity: 0.75;
          border-right: 1px solid #f6f4f2;
          padding-right: 24px;
        }
        @media (max-width: 640px) {
          .split-col.luxury-side {
            border-right: 0;
            border-bottom: 1px solid #f6f4f2;
            padding-right: 0;
            padding-bottom: 20px;
          }
        }
        .col-header {
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #8c8179;
          margin-bottom: 8px;
          font-weight: 700;
        }
        .split-price {
          font-family: 'DM Serif Display', serif;
          font-size: 1.6rem;
          margin-top: 10px;
        }
        .actives-label {
          font-size: 0.75rem;
          font-weight: 700;
          margin-top: 12px;
          color: #161412;
        }
        .actives-list {
          font-size: 0.8rem;
          color: #756b63;
          line-height: 1.4;
          margin-top: 2px;
        }
        /* Lead capture panel */
        .lead-panel {
          background: #161412;
          color: #fff;
          border-radius: 16px;
          padding: 32px;
          margin-top: 48px;
          text-align: center;
        }
        .lead-panel h3 {
          font-family: 'DM Serif Display', serif;
          font-size: 24px;
          margin: 0 0 8px;
        }
        .lead-panel p {
          color: rgba(255,255,255,0.6);
          font-size: 0.9rem;
          line-height: 1.6;
          margin: 0 0 24px;
        }
        .lead-form {
          display: flex;
          gap: 8px;
          max-width: 480px;
          margin: 0 auto;
        }
        @media (max-width: 640px) {
          .lead-form {
            flex-direction: column;
          }
        }
        .lead-form input {
          flex: 1;
          border: 1px solid rgba(255,255,255,0.15);
          background: rgba(255,255,255,0.06);
          border-radius: 8px;
          padding: 12px 16px;
          color: #fff;
          font-size: 0.9rem;
          outline: none;
        }
        .lead-form input:focus {
          border-color: #c8473a;
        }
        .lead-form button {
          background: #c8473a;
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 12px 24px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
        }
        .lead-form button:hover {
          background: #b23b2f;
        }
        .shop-dupe-btn {
          background: #161412;
          color: #fff;
          border-radius: 6px;
          padding: 10px 16px;
          font-size: 0.8rem;
          font-weight: 700;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          align-self: flex-start;
          margin-top: 14px;
        }
        .shop-dupe-btn:hover {
          background: #2b2826;
        }
      `}</style>

      <div className="shell">
        <Link href="/" className="back-link">
          <ArrowLeft size={16} /> Back to Shop
        </Link>

        <div className="header">
          <h1>Skincare Dupe Finder &amp; Savings Calculator</h1>
          <p>
            Stop overpaying for marketing. Pair highly coveted luxury beauty products with science-backed, active-equivalent Indian drugstore dupes and calculate your yearly savings.
          </p>
        </div>

        <div className="grid-layout">
          <div>
            <h2 className="comparison-title" style={{ fontSize: "20px", marginBottom: "16px" }}>Select Luxury Products You Use</h2>
            <div className="luxury-list">
              {DUPES_DATABASE.map(item => {
                const isSelected = selectedItems.includes(item.id);
                return (
                  <div
                    key={item.id}
                    className={`luxury-card ${isSelected ? "selected" : ""}`}
                    onClick={() => toggleSelect(item.id)}
                  >
                    <div className="checkbox">
                      {isSelected && <Check size={14} />}
                    </div>
                    <div className="luxury-details">
                      <div className="luxury-brand">{item.luxury.brand}</div>
                      <h3 className="luxury-name">{item.luxury.name}</h3>
                      <div className="luxury-meta">
                        <span>{item.luxury.size}</span>
                        <span>•</span>
                        <span style={{ fontStyle: "italic", fontSize: "0.78rem" }}>Actives: {item.luxury.actives.split(",")[0]}...</span>
                      </div>
                    </div>
                    <div className="luxury-price">
                      ₹{item.luxury.price.toLocaleString("en-IN")}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <div className="calculator-sidebar">
              <div className="calc-header">
                <h3 className="calc-title">Savings Summary</h3>
                <p style={{ fontSize: "0.8rem", color: "#8c8179", margin: 0 }}>Based on your selections</p>
              </div>

              {selectedItems.length > 0 ? (
                <div>
                  <div className="savings-stat">
                    <span style={{ fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 700, color: "#756b63" }}>Estimated Annual Savings</span>
                    <div className="savings-amt">₹{math.savings.toLocaleString("en-IN")}</div>
                    <div className="savings-pct">Save {math.percentage}% on this routine</div>
                  </div>

                  <div className="calc-row">
                    <span>Luxury Total (Annual):</span>
                    <span>₹{math.luxuryTotal.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="calc-row">
                    <span>Dupe Total (Annual):</span>
                    <span>₹{math.dupeTotal.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="calc-row total">
                    <span>Net Annual Savings:</span>
                    <span style={{ color: "#c8473a" }}>₹{math.savings.toLocaleString("en-IN")}</span>
                  </div>

                  <button
                    onClick={handleShareWhatsApp}
                    className="next-btn"
                    style={{ background: "#25d366", color: "#fff", display: "flex", gap: "8px", justifyContent: "center", width: "100%", padding: "14px", marginTop: "20px" }}
                  >
                    <Share2 size={16} /> Share Savings on WhatsApp
                  </button>
                </div>
              ) : (
                <div style={{ textAlign: "center", padding: "20px 0", color: "#8c8179" }}>
                  <TrendingDown size={36} style={{ margin: "0 auto 12px", opacity: 0.5 }} />
                  <p style={{ fontSize: "0.9rem", margin: 0 }}>Select at least one luxury product on the left to see comparisons and estimate your annual savings.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {selectedItems.length > 0 && (
          <div className="comparison-section">
            <h2 className="comparison-title">Formula Compatibility &amp; Science Breakdown</h2>
            
            {selectedItems.map(id => {
              const item = DUPES_DATABASE.find(d => d.id === id);
              if (!item) return null;

              const count = purchasesPerYear[id] || 2;
              const savings = (item.luxury.price - item.dupe.price) * count;

              return (
                <div key={item.id} className="dupe-comparison-card">
                  <div className="comparison-header">
                    <span className="comparison-label">Chemical Equivalency Profile</span>
                    <div className="purchases-selector">
                      <span>Purchases per year:</span>
                      <input
                        type="number"
                        min="1"
                        value={count}
                        onChange={(e) => handleCountChange(item.id, parseInt(e.target.value) || 1)}
                      />
                    </div>
                  </div>

                  <div className="split-row">
                    <div className="split-col luxury-side">
                      <span className="col-header">High-End Luxury</span>
                      <span style={{ fontSize: "0.8rem", color: "#c8473a", fontWeight: 700 }}>{item.luxury.brand}</span>
                      <h4 style={{ fontSize: "1.05rem", fontWeight: 600, margin: "2px 0 6px" }}>{item.luxury.name}</h4>
                      <span className="actives-label">Key Actives:</span>
                      <p className="actives-list">{item.luxury.actives}</p>
                      <div className="split-price">₹{item.luxury.price.toLocaleString("en-IN")}</div>
                    </div>

                    <div className="split-col">
                      <span className="col-header" style={{ color: "#2d8a5c", display: "flex", alignItems: "center", gap: "4px" }}>
                        Active Dupe Match <Check size={12} />
                      </span>
                      <span style={{ fontSize: "0.8rem", color: "#756b63", fontWeight: 700 }}>{item.dupe.brand}</span>
                      <h4 style={{ fontSize: "1.05rem", fontWeight: 600, margin: "2px 0 6px" }}>{item.dupe.name}</h4>
                      <p style={{ fontSize: "0.82rem", color: "#756b63", lineHeight: 1.5, margin: "8px 0" }}>
                        {item.dupe.description}
                      </p>
                      <span className="actives-label">Dupe Actives:</span>
                      <p className="actives-list">{item.dupe.actives}</p>
                      
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: "auto" }}>
                        <div className="split-price" style={{ color: "#2d8a5c" }}>₹{item.dupe.price.toLocaleString("en-IN")}</div>
                        <span style={{ fontSize: "0.78rem", color: "#2d8a5c", fontWeight: 600 }}>Save ₹{savings.toLocaleString("en-IN")}/yr</span>
                      </div>

                      <a href={item.dupe.link} target="_blank" rel="noopener noreferrer" className="shop-dupe-btn">
                        Shop Dupe on Amazon <ArrowRight size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Lead Capture - Hidden from front end but kept in stack */}
        {/* <div className="lead-panel">
          <h3>Get the Complete Skincare Dupes Catalog (50+ Products)</h3>
          <p>We've researched 50+ premium products (Estée Lauder, Clinique, Kiehl's, Laneige, Tatcha) and found their exact active-ingredient equivalent drugstore dupes under ₹800. Sign up to get the free Google Sheets list.</p>
          {emailStatus === "success" ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", background: "rgba(45, 138, 92, 0.12)", border: "1px solid #2d8a5c", color: "#2d8a5c", padding: "24px", borderRadius: "12px", fontSize: "0.95rem", maxWidth: "520px", margin: "0 auto" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: "600", fontSize: "1.1rem" }}>
                <Check size={20} /> Access Approved!
              </div>
              <p style={{ margin: "0 0 10px", fontSize: "0.85rem", color: "#756b63", lineHeight: 1.5 }}>
                Click below to instantly open the master Google Sheets catalog containing 50+ luxury skincare swaps.
              </p>
              <a 
                href="https://docs.google.com/spreadsheets/d/1X5-t4q3fD-n_T_BvM8GvQz_Nf8_V64VpW-R_bX4yU3w/edit?usp=sharing" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ 
                  background: "#2d8a5c", 
                  color: "#fff", 
                  padding: "12px 24px", 
                  borderRadius: "8px", 
                  textDecoration: "none", 
                  fontWeight: "600", 
                  fontSize: "0.9rem",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  transition: "background 0.2s" 
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = "#246e49"}
                onMouseLeave={(e) => e.currentTarget.style.background = "#2d8a5c"}
              >
                Open Google Sheets Catalog <ArrowRight size={16} />
              </a>
            </div>
          ) : (
            <form onSubmit={handleEmailSubmit} className="lead-form">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" disabled={emailStatus === "submitting"}>
                {emailStatus === "submitting" ? "Sending Catalog..." : "Get Free Access"}
              </button>
            </form>
          )}
        </div> */}
      </div>
    </main>
  );
}
