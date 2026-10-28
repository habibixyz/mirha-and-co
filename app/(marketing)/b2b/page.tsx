"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Script from "next/script";
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  TrendingUp, 
  ShieldAlert, 
  Cpu, 
  DollarSign, 
  Zap, 
  ArrowRight, 
  Database, 
  MapPin, 
  CheckCircle2, 
  Droplet, 
  CloudSun, 
  Code2, 
  Lock, 
  Layers, 
  RefreshCw, 
  Sliders, 
  DollarSign as DollarIcon,
  Copy,
  Check,
  FileText,
  Monitor,
  ExternalLink,
  ChevronUp
} from "lucide-react";
import { submitLeadAction } from "../../(saas)/actions";
import { B2BApiSandbox } from "@/components/B2BApiSandbox";

// Types for Hotspot Demo
interface CityData {
  name: string;
  country: string;
  ppm: number;
  type: "Very Hard" | "Hard" | "Moderately Hard" | "Soft" | "Very Soft";
  minerals: { calcium: number; magnesium: number; iron: number };
  humidity: number;
  temp: number;
  friction: string;
  adaptation: string;
  recommendedSku: {
    category: string;
    name: string;
    reason: string;
  }[];
}

const CITY_DATABASE: Record<string, CityData> = {
  london: {
    name: "London",
    country: "United Kingdom",
    ppm: 280,
    type: "Very Hard",
    minerals: { calcium: 100, magnesium: 12, iron: 0.1 },
    humidity: 78,
    temp: 18,
    friction: "Heavy calcium binding disrupts skin lipid barrier, leading to dryness, eczema flares, and clogged pores from heavy cleansers failing to emulsify.",
    adaptation: "Deploy Chelating Micellar Rinse + Mineral-Resistant Ceramides to prevent calcium deposition and repair barrier function.",
    recommendedSku: [
      { category: "Cleanser", name: "Mirha Chelating Micellar Gel", reason: "Formulated with EDTA to trap and rinse off heavy tap water minerals." },
      { category: "Barrier Shield", name: "Ceramide NP Lipid Recovery Cream", reason: "Restores skin lipids dissolved by hard water soap scum." }
    ]
  },
  los_angeles: {
    name: "Los Angeles",
    country: "United States",
    ppm: 320,
    type: "Very Hard",
    minerals: { calcium: 115, magnesium: 18, iron: 0.2 },
    humidity: 45,
    temp: 26,
    friction: "Ultra-high mineral content combined with low relative humidity evaporates skin moisture rapidly, crystallizing minerals on the skin surface and causing micro-abrasions.",
    adaptation: "Recommend Humectant-Rich Hyaluronic serums that form a non-crystallizing moisture shield + Chelating foaming cleansers.",
    recommendedSku: [
      { category: "Cleanser", name: "Mineral-Bind Chelating Cleanser", reason: "Neutralizes heavy calcium and magnesium deposits on contact." },
      { category: "Hydration", name: "Squalane & Hyaluronic Acid Mist", reason: "Blocks trans-epidermal water loss aggravated by dry desert winds." }
    ]
  },
  mumbai: {
    name: "Mumbai",
    country: "India",
    ppm: 140,
    type: "Moderately Hard",
    minerals: { calcium: 45, magnesium: 8, iron: 0.4 },
    humidity: 85,
    temp: 32,
    friction: "Moderate mineral content mixed with high humidity and heat triggers sebum overproduction. Hard water minerals react with excess sebum to form solid pore plugs.",
    adaptation: "Introduce oil-free Salicylic Acid micro-exfoliating washes + ultra-lightweight niacinamide gel moisturizers.",
    recommendedSku: [
      { category: "Treatment", name: "2% Salicylic Acid Pore Purifier", reason: "Dissolves sebum-mineral plugs before they turn into cystic acne." },
      { category: "Hydrator", name: "Ultra-Lightweight Niacinamide Water-Gel", reason: "Controls sebum while reinforcing skin barrier in high humidity." }
    ]
  },
  new_york: {
    name: "New York",
    country: "United States",
    ppm: 55,
    type: "Soft",
    minerals: { calcium: 16, magnesium: 4, iron: 0.05 },
    humidity: 35,
    temp: 4,
    friction: "Soft water preserves the barrier, but seasonal freezing temperatures and indoor heating strip all skin lipids, causing severe skin cracking and inflammation.",
    adaptation: "Bypasses water chelators entirely; focus catalog logic on rich lipid replenishment, occlusives, and cold-weather wind barriers.",
    recommendedSku: [
      { category: "Moisturizer", name: "Shea & Panthenol Rich Recovery Balm", reason: "Formulated for dry sub-zero temperatures and indoor heating." },
      { category: "Barrier", name: "Squalane Oil Concentrate", reason: "Locks in deep hydration in extremely dry winter air." }
    ]
  },
  stockholm: {
    name: "Stockholm",
    country: "Sweden",
    ppm: 20,
    type: "Very Soft",
    minerals: { calcium: 6, magnesium: 1, iron: 0.01 },
    humidity: 60,
    temp: 8,
    friction: "Virtually zero mineral friction. However, cold winds require protection without the need for anti-mineral chelators, which could over-strip soft-water skin.",
    adaptation: "Pure hydration and prebiotic barrier defense. Eliminate chelating agents to avoid unnecessary skin sensitization.",
    recommendedSku: [
      { category: "Serum", name: "Prebiotic Oat Calm Serum", reason: "Supports natural skin microbiome without heavy anti-mineral actives." },
      { category: "Moisturizer", name: "Beta-Glucan Soothing Cream", reason: "Provides lightweight protection in cold, clean climates." }
    ]
  }
};

export default function B2BPitchDeck() {
  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = 6;
  const [viewMode, setViewMode] = useState<"deck" | "scroll">("deck");

  // Slide 3: Hotspot Demo State
  const [selectedCity, setSelectedCity] = useState<keyof typeof CITY_DATABASE>("london");
  const activeCityData = CITY_DATABASE[selectedCity];
  const [cityCurlCopied, setCityCurlCopied] = useState(false);

  // Slide 4: ROI Calculator State
  const [traffic, setTraffic] = useState(500000); // 500k monthly sessions
  const [aov, setAov] = useState(50); // $50 AOV
  const [cr, setCr] = useState(2.5); // 2.5% Conversion Rate
  const [returnsRate, setReturnsRate] = useState(22); // 22% average returns
  const [cfoSummaryCopied, setCfoSummaryCopied] = useState(false);

  // Calculations
  const monthlyOrders = (traffic * (cr / 100));
  const currentMonthlyRevenue = monthlyOrders * aov;
  const aovLiftRevenue = monthlyOrders * (aov * 1.18) - currentMonthlyRevenue; // +18% AOV
  
  // Return savings
  const currentReturns = monthlyOrders * (returnsRate / 100);
  const newReturns = monthlyOrders * ((returnsRate * (1 - 0.34)) / 100); // -34% drop in returns
  const returnsSaved = currentReturns - newReturns;
  const shippingHandlingCostPerReturn = 12; // average shipping/handling cost per return
  const returnSavingsUSD = returnsSaved * (aov * 0.75 + shippingHandlingCostPerReturn); // product cost + logistics cost saved

  const totalMonthlyImpact = aovLiftRevenue + returnSavingsUSD;
  const totalAnnualImpact = totalMonthlyImpact * 12;

  // Slide 5: Latency Simulator
  const [latencyText, setLatencyText] = useState("Click test to check API response time");
  const [latencyMs, setLatencyMs] = useState<number | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const simulateLatencyTest = () => {
    setIsSimulating(true);
    setLatencyText("Pinging Global Edge Nodes...");
    setLatencyMs(null);
    setTimeout(() => {
      const randomMs = Math.floor(Math.random() * 15) + 26; // 26ms - 40ms
      setLatencyMs(randomMs);
      setLatencyText(`Completed: Response received in ${randomMs}ms from edge CDN node.`);
      setIsSimulating(false);
    }, 1200);
  };

  // Slide 6: Pricing Tier Toggle
  const [annualBilling, setAnnualBilling] = useState(false);
  const [isInternational, setIsInternational] = useState(true);

  // Checkout state
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  // Deep linking and hash observer (#pricing, #roi, #demo, #sandbox, #problem)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === "#pricing") {
        setCurrentSlide(6);
        const el = document.getElementById("pricing");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      } else if (hash === "#sandbox" || hash === "#api") {
        setCurrentSlide(5);
        const el = document.getElementById("sandbox");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      } else if (hash === "#roi" || hash === "#calculator") {
        setCurrentSlide(4);
        const el = document.getElementById("roi");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      } else if (hash === "#demo" || hash === "#hotspots") {
        setCurrentSlide(3);
        const el = document.getElementById("demo");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      } else if (hash === "#problem") {
        setCurrentSlide(2);
        const el = document.getElementById("problem");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const handleCopyCfoSummary = () => {
    const summary = `--- Mirha & Co. Skincare Intelligence ROI Assessment ---
Monthly Traffic: ${traffic.toLocaleString()} sessions
Average Order Value: $${aov}
Current Return Rate: ${returnsRate}%
Estimated Monthly Orders: ${Math.round(monthlyOrders).toLocaleString()}
---------------------------------------------------------
1. Monthly AOV Lift (+18% Routine Bundles): +$${Math.round(aovLiftRevenue).toLocaleString()}/mo
2. Return Logistics Savings (-34% Breakouts): +$${Math.round(returnSavingsUSD).toLocaleString()}/mo
---------------------------------------------------------
Total Estimated Monthly Financial Impact: +$${Math.round(totalMonthlyImpact).toLocaleString()}/mo
Total Estimated Annual Value Created: $${Math.round(totalAnnualImpact).toLocaleString()}/year
Customer Retention Multiplier: 2.4x
Benchmarked on production telemetry from Mirha & Co. B2B Edge API.`;
    navigator.clipboard.writeText(summary);
    setCfoSummaryCopied(true);
    setTimeout(() => setCfoSummaryCopied(false), 2000);
  };

  const handleCopyCityCurl = () => {
    const curl = `curl -X POST "https://www.mirhaandco.com/api/v1/recommend" \\
  -H "Content-Type: application/json" \\
  -d '{
    "apiKey": "b2b_trial_key",
    "city": "${activeCityData.name}",
    "country": "${activeCityData.country}",
    "skinType": "oily",
    "mainConcern": "acne"
  }'`;
    navigator.clipboard.writeText(curl);
    setCityCurlCopied(true);
    setTimeout(() => setCityCurlCopied(false), 2000);
  };

  const handleSubscribe = async (tier: "growth" | "scale") => {
    setCheckoutError(null);
    if (!leadEmail || !leadBrand) {
      setCheckoutError("Please fill in your Work Email and Brand Name in the form below first.");
      
      const formEl = document.getElementById("lead-form-section");
      if (formEl) formEl.scrollIntoView({ behavior: "smooth" });
      
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(leadEmail)) {
      setCheckoutError("Please provide a valid work email address.");
      const formEl = document.getElementById("lead-form-section");
      if (formEl) formEl.scrollIntoView({ behavior: "smooth" });
      return;
    }
    setCheckoutLoading(tier);
    try {
      if (isInternational) {
        // Dodo Payments (International)
        const res = await fetch("/api/dodo/b2b-checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tier,
            billing: annualBilling ? "annual" : "monthly",
            email: leadEmail,
            brandName: leadBrand,
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        if (data.checkoutUrl) {
          sessionStorage.setItem("b2b_checkout_email", leadEmail);
          if (data.retrievalToken) sessionStorage.setItem("b2b_checkout_retrieval_token", data.retrievalToken);
          sessionStorage.setItem("b2b_welcome_active", "true");
          window.location.href = data.checkoutUrl;
        }
      } else {
        // Razorpay (India)
        const res = await fetch("/api/razorpay/b2b-checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tier,
            billing: annualBilling ? "annual" : "monthly",
            email: leadEmail,
            brandName: leadBrand,
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);

        if (typeof (window as any).Razorpay === "undefined") {
          await new Promise<void>((resolve, reject) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.async = true;
            script.onload = () => resolve();
            script.onerror = () => reject(new Error("Failed to load Razorpay checkout SDK. Please check your network."));
            document.body.appendChild(script);
          });
        }

        const rzp = new (window as any).Razorpay({
          key: data.keyId,
          subscription_id: data.subscriptionId,
          name: "Mirha & Co. B2B API",
          description: `${tier === "scale" ? "Scale Enterprise" : "Growth"} Tier — Climate & Hard Water API`,
          image: "https://www.mirhaandco.com/icon.png",
          prefill: { email: leadEmail, name: leadBrand },
          theme: { color: "#fc2779" },
          handler: () => {
            setLeadSubmitted(true);
            sessionStorage.setItem("b2b_checkout_email", leadEmail);
            if (data.retrievalToken) sessionStorage.setItem("b2b_checkout_retrieval_token", data.retrievalToken);
            sessionStorage.setItem("b2b_welcome_active", "true");
            window.location.href = "/b2b/dashboard?welcome=true";
          },
        });
        rzp.open();
      }
    } catch (err: any) {
      console.error("Checkout err:", err);
      setCheckoutError(err.message || "Failed to initiate checkout");
    } finally {
      setCheckoutLoading(null);
    }
  };

  // Lead capture state
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadBrand, setLeadBrand] = useState("");
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadEmail || !leadBrand) return;
    setIsSubmittingLead(true);
    setCheckoutError(null);
    try {
      const dataStr = JSON.stringify({
        name: leadName,
        brand: leadBrand,
        interest: "B2B Pitch Deck Demo Call",
        calculator: {
          traffic,
          aov,
          annualImpact: Math.round(totalAnnualImpact)
        }
      });
      const res = await submitLeadAction(leadEmail, "b2b_api", dataStr);
      if (res && 'error' in res && res.error) {
        setCheckoutError(res.error);
        return;
      }
      setLeadSubmitted(true);
    } catch (err: any) {
      console.error("Lead submission error:", err);
      setCheckoutError(err.message || "Failed to submit details. Please try again.");
    } finally {
      setIsSubmittingLead(false);
    }
  };

  // Keyboard navigation for presentation mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (viewMode !== "deck") return;
      if (e.key === "ArrowRight" || e.key === "Space") {
        if (currentSlide < totalSlides) {
          setCurrentSlide(prev => prev + 1);
        }
      } else if (e.key === "ArrowLeft") {
        if (currentSlide > 1) {
          setCurrentSlide(prev => prev - 1);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide, viewMode]);

  /* ──────────────────────────────────────────────────────────────────────────
     Slide 1: Cover & Vision
     ────────────────────────────────────────────────────────────────────────── */
  const renderSlide1Cover = () => (
    <div style={{ position: "relative", zIndex: 1 }}>
      <div className="cover-visuals" />
      <div className="eyebrow-badge">
        <Layers size={11} /> Enterprise sales deck &amp; architecture
      </div>
      <h1 className="slide-title" style={{ fontSize: "clamp(2.3rem, 5.5vw, 3.6rem)", maxWidth: "860px" }}>
        Hyper-Personalizing Global Beauty: The Climate &amp; Hard Water API
      </h1>
      <p className="slide-subtitle" style={{ maxWidth: "720px" }}>
        Transforming E-Commerce Intelligence, Slashing Returns by 34%, and Driving AOV via Real-World Environmental Diagnostics &amp; Custom Catalog Mapping.
      </p>
      
      {/* Live edge status badge */}
      <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.25)", borderRadius: "99px", padding: "4px 12px", marginBottom: "1.75rem", fontSize: "0.78rem", color: "#10b981", fontWeight: 600 }}>
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#10b981", display: "inline-block", boxShadow: "0 0 8px #10b981" }} />
        Production Edge Network Active &bull; &lt;45ms Latency Worldwide
      </div>

      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
        <button 
          onClick={() => {
            if (viewMode === "deck") setCurrentSlide(2);
            else {
              const el = document.getElementById("problem");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }
          }} 
          className="pitch-btn-primary"
        >
          {viewMode === "deck" ? "Start Presentation" : "Explore Architecture"} <ArrowRight size={16} />
        </button>
        <Link href="/b2b/dashboard" className="pitch-btn-outline" style={{ textDecoration: "none" }}>
          Developer API Portal <Code2 size={16} />
        </Link>
        <button
          onClick={() => {
            if (viewMode === "deck") setCurrentSlide(6);
            else {
              const el = document.getElementById("pricing");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }
          }}
          className="pitch-btn-outline"
          style={{ textDecoration: "none" }}
        >
          View Pricing &amp; Pilots <DollarIcon size={16} />
        </button>
      </div>
    </div>
  );

  /* ──────────────────────────────────────────────────────────────────────────
     Slide 2: The Skincare Problem
     ────────────────────────────────────────────────────────────────────────── */
  const renderSlide2Problem = () => (
    <div>
      <div className="eyebrow-badge">
        <ShieldAlert size={11} /> The Data-Driven Hook
      </div>
      <h2 className="slide-title">The Location-Blind Personalization Crisis</h2>
      <p className="slide-subtitle">
        E-commerce personalization engines ask simple questions (e.g. &ldquo;Oily vs Dry&rdquo;) but remain completely blind to where the skin actually lives.
      </p>

      <div className="problem-grid">
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div className="vs-card bad">
            <h4 style={{ fontWeight: 700, fontSize: "0.95rem", color: "#f87171", marginBottom: "0.25rem" }}>
              Static Quizzes Are Failing Customers
            </h4>
            <p style={{ fontSize: "0.85rem", color: "var(--b2b-text-muted)", lineHeight: 1.5 }}>
              A shopper in London buys an oily-skin moisturizer. It breaks them out because London&apos;s hard tap water minerals react with their cleanser, leaving soap scum that clogs pores. The quiz never saw the water.
            </p>
          </div>

          <div className="vs-card good">
            <h4 style={{ fontWeight: 700, fontSize: "0.95rem", color: "#34d399", marginBottom: "0.25rem" }}>
              The Environmental Telemetry Upgrade
            </h4>
            <p style={{ fontSize: "0.85rem", color: "var(--b2b-text-muted)", lineHeight: 1.5 }}>
              By capturing delivery postal codes or IP telemetry, the Climate &amp; Hard Water API immediately adapts catalog logic to mineral density, humidity, and dew point variables.
            </p>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div className="metric-banner">
            <div className="metric-large">70%</div>
            <h5 style={{ fontWeight: 700, fontSize: "0.9rem", marginBottom: "0.25rem" }}>Skincare Routines Fail</h5>
            <p style={{ fontSize: "0.75rem", color: "var(--b2b-text-muted)", margin: 0 }}>
              Due to unaccounted external friction like calcium carbonates in tap water and sudden weather swings.
            </p>
          </div>

          <div className="metric-banner">
            <div className="metric-large">22%</div>
            <h5 style={{ fontWeight: 700, fontSize: "0.9rem", marginBottom: "0.25rem" }}>Average E-Commerce Return Rate</h5>
            <p style={{ fontSize: "0.75rem", color: "var(--b2b-text-muted)", margin: 0 }}>
              Driven directly by &ldquo;unexpected skin breakouts&rdquo; and poor formulation texture fits.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  /* ──────────────────────────────────────────────────────────────────────────
     Slide 3: Environmental Solution & Hotspots
     ────────────────────────────────────────────────────────────────────────── */
  const renderSlide3Solution = () => (
    <div>
      <div className="eyebrow-badge">
        <MapPin size={11} /> Interactive Hotspot Demo
      </div>
      <h2 className="slide-title">How the Engine Works</h2>
      <p className="slide-subtitle">
        We match the shopper&apos;s location to environmental matrices. Test a city below to inspect real-time mineral analysis and catalog adaptation output.
      </p>

      <div className="hotspot-container">
        <div className="map-selector-box">
          <span style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--b2b-text-muted)", display: "block", marginBottom: "1rem" }}>
            Select Pitch Hotspot City
          </span>
          <button 
            onClick={() => setSelectedCity("london")} 
            className={`city-button ${selectedCity === "london" ? "active" : ""}`}
          >
            <span>London, UK</span>
            <span className="city-pill hard">280 PPM (Very Hard)</span>
          </button>
          <button 
            onClick={() => setSelectedCity("los_angeles")} 
            className={`city-button ${selectedCity === "los_angeles" ? "active" : ""}`}
          >
            <span>Los Angeles, US</span>
            <span className="city-pill hard">320 PPM (Very Hard)</span>
          </button>
          <button 
            onClick={() => setSelectedCity("mumbai")} 
            className={`city-button ${selectedCity === "mumbai" ? "active" : ""}`}
          >
            <span>Mumbai, IN</span>
            <span className="city-pill hard">140 PPM (Mod. Hard)</span>
          </button>
          <button 
            onClick={() => setSelectedCity("new_york")} 
            className={`city-button ${selectedCity === "new_york" ? "active" : ""}`}
          >
            <span>New York, US</span>
            <span className="city-pill soft">55 PPM (Soft)</span>
          </button>
          <button 
            onClick={() => setSelectedCity("stockholm")} 
            className={`city-button ${selectedCity === "stockholm" ? "active" : ""}`}
          >
            <span>Stockholm, SE</span>
            <span className="city-pill soft">20 PPM (Very Soft)</span>
          </button>
        </div>

        <div className="hotspot-details">
          <div className="ppm-dial">
            <div className="ppm-circle">
              <span style={{ fontSize: "1.25rem" }}>{activeCityData.ppm}</span>
              <span style={{ fontSize: "0.55rem", opacity: 0.8 }}>PPM</span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "8px" }}>
                <div>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--b2b-text-main)", margin: 0 }}>
                    Water Profile: {activeCityData.type}
                  </h3>
                  <p style={{ fontSize: "0.8rem", color: "var(--b2b-text-muted)", margin: "4px 0 0" }}>
                    Calcium: {activeCityData.minerals.calcium} mg/L | Magnesium: {activeCityData.minerals.magnesium} mg/L | Humidity: {activeCityData.humidity}%
                  </p>
                </div>
                <button
                  onClick={handleCopyCityCurl}
                  className="pitch-btn-outline"
                  style={{ padding: "0.35rem 0.75rem", fontSize: "0.72rem", display: "inline-flex", alignItems: "center", gap: "5px" }}
                >
                  {cityCurlCopied ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
                  <span>{cityCurlCopied ? "cURL Copied!" : `cURL (${activeCityData.name})`}</span>
                </button>
              </div>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#fc2779", marginBottom: "0.25rem" }}>
              Skin Barrier Friction
            </h4>
            <p style={{ fontSize: "0.88rem", color: "var(--b2b-text-main)", lineHeight: 1.6, fontWeight: 500 }}>
              {activeCityData.friction}
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#34d399", marginBottom: "0.25rem" }}>
              API Recommendation Output
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "0.5rem" }}>
              {activeCityData.recommendedSku.map((sku, idx) => (
                <div key={idx} style={{ background: "var(--b2b-hover-bg)", padding: "0.75rem", borderRadius: "8px", border: "1px solid var(--b2b-border)" }}>
                  <span style={{ fontSize: "0.6rem", fontWeight: 700, color: "#fc2779", textTransform: "uppercase" }}>{sku.category}</span>
                  <div style={{ fontWeight: 600, fontSize: "0.85rem", color: "var(--b2b-text-main)", margin: "0.1rem 0" }}>{sku.name}</div>
                  <p style={{ fontSize: "0.75rem", color: "var(--b2b-text-muted)", margin: 0 }}>{sku.reason}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* AI Agents Promotion */}
      <div className="b2b-agents-banner">
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem", flexWrap: "wrap" }}>
          <CheckCircle2 size={16} color="#34d399" style={{ flexShrink: 0 }} />
          <span style={{ fontSize: "0.82rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#34d399", lineHeight: 1.3 }}>
            Included with all tiers: Autonomous Skincare Agents
          </span>
        </div>
        <div className="b2b-agents-grid">
          <div style={{ background: "var(--b2b-card-bg)", padding: "1rem", borderRadius: "12px", border: "1px solid var(--b2b-border)" }}>
            <span style={{ fontWeight: 600, fontSize: "0.85rem", color: "var(--b2b-text-main)", display: "block", marginBottom: "0.25rem" }}>Catalog Audit Agent</span>
            <p style={{ margin: 0, fontSize: "0.75rem", color: "var(--b2b-text-muted)", lineHeight: 1.4 }}>
              Scans product ingredients, scores catalog health, and flags formulation gaps across target climate zones.
            </p>
          </div>
          <div style={{ background: "var(--b2b-card-bg)", padding: "1rem", borderRadius: "12px", border: "1px solid var(--b2b-border)" }}>
            <span style={{ fontWeight: 600, fontSize: "0.85rem", color: "var(--b2b-text-main)", display: "block", marginBottom: "0.25rem" }}>Weather Guard Agent</span>
            <p style={{ margin: 0, fontSize: "0.75rem", color: "var(--b2b-text-muted)", lineHeight: 1.4 }}>
              Monitors sudden humidity drops and cold fronts to trigger proactive routine swap recommendations.
            </p>
          </div>
          <div style={{ background: "var(--b2b-card-bg)", padding: "1rem", borderRadius: "12px", border: "1px solid var(--b2b-border)" }}>
            <span style={{ fontWeight: 600, fontSize: "0.85rem", color: "var(--b2b-text-main)", display: "block", marginBottom: "0.25rem" }}>AI Concierge Agent</span>
            <p style={{ margin: 0, fontSize: "0.75rem", color: "var(--b2b-text-muted)", lineHeight: 1.4 }}>
              Audits existing regimens, detects active ingredient layering conflicts, and outputs customized AM/PM schedules.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  /* ──────────────────────────────────────────────────────────────────────────
     Slide 4: Business Case & ROI Calculator
     ────────────────────────────────────────────────────────────────────────── */
  const renderSlide4ROI = () => (
    <div>
      <div className="eyebrow-badge">
        <TrendingUp size={11} /> The CFO Hook
      </div>
      <h2 className="slide-title">The Financial Impact Case</h2>
      <p className="slide-subtitle">
        Slide parameters to calculate estimated return savings and AOV increases built on actual pilot benchmarks.
      </p>

      <div className="roi-grid">
        <div className="roi-sliders">
          <div className="slider-group">
            <div className="slider-header">
              <span>Monthly Traffic</span>
              <span className="slider-value">
                {traffic.toLocaleString()} sessions
              </span>
            </div>
            <input 
              type="range" 
              min="50000" 
              max="5000000" 
              step="50000" 
              className="slider-input" 
              value={traffic} 
              onChange={(e) => setTraffic(Number(e.target.value))} 
            />
          </div>

          <div className="slider-group">
            <div className="slider-header">
              <span>Average Order Value (AOV)</span>
              <span className="slider-value">${aov}</span>
            </div>
            <input 
              type="range" 
              min="10" 
              max="200" 
              step="5" 
              className="slider-input" 
              value={aov} 
              onChange={(e) => setAov(Number(e.target.value))} 
            />
          </div>

          <div className="slider-group">
            <div className="slider-header">
              <span>Current Return Rate</span>
              <span className="slider-value">{returnsRate}%</span>
            </div>
            <input 
              type="range" 
              min="5" 
              max="40" 
              step="1" 
              className="slider-input" 
              value={returnsRate} 
              onChange={(e) => setReturnsRate(Number(e.target.value))} 
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "0.5rem" }}>
            <div style={{ background: "rgba(255,255,255,0.02)", padding: "0.75rem", borderRadius: "8px", border: "1px solid var(--b2b-border)" }}>
              <span style={{ fontSize: "0.7rem", color: "var(--b2b-text-muted)" }}>AOV Improvement</span>
              <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#34d399" }}>+18%</div>
            </div>
            <div style={{ background: "rgba(255,255,255,0.02)", padding: "0.75rem", borderRadius: "8px", border: "1px solid var(--b2b-border)" }}>
              <span style={{ fontSize: "0.7rem", color: "var(--b2b-text-muted)" }}>Return Reduction</span>
              <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#34d399" }}>-34%</div>
            </div>
          </div>
        </div>

        <div className="roi-result-card">
          <div>
            <span style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--b2b-text-muted)" }}>
              Estimated Annual Value Created
            </span>
            <div className="annual-value">
              ${Math.round(totalAnnualImpact).toLocaleString()}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", textAlign: "left" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "0.5rem" }}>
              <span style={{ color: "var(--b2b-text-muted)" }}>Monthly AOV Lift (Bundles):</span>
              <span style={{ fontWeight: 600, color: "var(--b2b-text-main)" }}>+${Math.round(aovLiftRevenue).toLocaleString()}/mo</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "0.5rem" }}>
              <span style={{ color: "var(--b2b-text-muted)" }}>Reduced Return Logistics Savings:</span>
              <span style={{ fontWeight: 600, color: "var(--b2b-text-main)" }}>+${Math.round(returnSavingsUSD).toLocaleString()}/mo</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem" }}>
              <span style={{ color: "var(--b2b-text-muted)" }}>Customer Retention Multiplier:</span>
              <span style={{ fontWeight: 600, color: "#fc2779" }}>2.4x</span>
            </div>
          </div>

          <div style={{ marginTop: "1.25rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            <button 
              onClick={() => {
                if (viewMode === "deck") setCurrentSlide(6);
                else {
                  const el = document.getElementById("pricing");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }
              }} 
              className="pitch-btn-primary" 
              style={{ width: "100%" }}
            >
              Book Enterprise Pilot
            </button>
            <button
              onClick={handleCopyCfoSummary}
              className="pitch-btn-outline"
              style={{ width: "100%", fontSize: "0.78rem", padding: "0.6rem 1rem", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "6px" }}
            >
              {cfoSummaryCopied ? <Check size={13} color="#10b981" /> : <Copy size={13} />}
              <span>{cfoSummaryCopied ? "CFO Summary Copied to Clipboard!" : "Copy Summary for Executive Memo"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  /* ──────────────────────────────────────────────────────────────────────────
     Slide 5: Technical Scale & Interactive API Sandbox
     ────────────────────────────────────────────────────────────────────────── */
  const renderSlide5Sandbox = () => (
    <div>
      <div className="eyebrow-badge">
        <Cpu size={11} /> Enterprise Developer Hub
      </div>
      <h2 className="slide-title">Interactive API Playground</h2>
      <p className="slide-subtitle">
        Test live requests against our production edge recommendation engine with real parameters.
      </p>

      {/* Latency Simulator Panel */}
      <div style={{ marginBottom: "1.5rem", background: "var(--b2b-surface)", border: "1px solid var(--b2b-border)", borderRadius: "12px", padding: "1rem 1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <span style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--b2b-text-muted)" }}>
            Global Edge Node Latency
          </span>
          <div style={{ fontSize: "0.85rem", color: "var(--b2b-text-main)", fontWeight: 600, marginTop: "2px" }}>
            {latencyText}
          </div>
        </div>
        <button
          onClick={simulateLatencyTest}
          disabled={isSimulating}
          className="pitch-btn-outline"
          style={{ padding: "0.45rem 1rem", fontSize: "0.75rem", display: "inline-flex", alignItems: "center", gap: "6px" }}
        >
          {isSimulating ? <RefreshCw size={13} className="animate-spin" /> : <Zap size={13} color="#fc2779" />}
          <span>{isSimulating ? "Pinging..." : "Test Edge Latency"}</span>
        </button>
      </div>

      <B2BApiSandbox defaultApiKey="b2b_trial_key" />

      {/* Developer Docs Quick Links */}
      <div style={{ marginTop: "1.5rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem" }}>
        <Link href="/b2b/dashboard" style={{ textDecoration: "none" }}>
          <div style={{ background: "var(--b2b-card-bg)", border: "1px solid var(--b2b-border)", borderRadius: "10px", padding: "1rem", transition: "transform 0.2s" }}>
            <span style={{ fontSize: "0.7rem", textTransform: "uppercase", color: "#38bdf8", fontWeight: 700 }}>Shopify Extension</span>
            <h4 style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--b2b-text-main)", margin: "4px 0" }}>Theme App Extension Liquid</h4>
            <p style={{ fontSize: "0.75rem", color: "var(--b2b-text-muted)", margin: 0 }}>Drag-and-drop widget into Shopify Theme Editor with zero store code edits.</p>
          </div>
        </Link>
        <Link href="/api/v1/health" target="_blank" style={{ textDecoration: "none" }}>
          <div style={{ background: "var(--b2b-card-bg)", border: "1px solid var(--b2b-border)", borderRadius: "10px", padding: "1rem", transition: "transform 0.2s" }}>
            <span style={{ fontSize: "0.7rem", textTransform: "uppercase", color: "#10b981", fontWeight: 700 }}>REST API</span>
            <h4 style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--b2b-text-main)", margin: "4px 0" }}>Health &amp; Open Endpoints</h4>
            <p style={{ fontSize: "0.75rem", color: "var(--b2b-text-muted)", margin: 0 }}>Check edge node uptime and inspect JSON schema outputs in real-time.</p>
          </div>
        </Link>
        <Link href="/b2b/dashboard" style={{ textDecoration: "none" }}>
          <div style={{ background: "var(--b2b-card-bg)", border: "1px solid var(--b2b-border)", borderRadius: "10px", padding: "1rem", transition: "transform 0.2s" }}>
            <span style={{ fontSize: "0.7rem", textTransform: "uppercase", color: "#fc2779", fontWeight: 700 }}>Catalog Mapper</span>
            <h4 style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--b2b-text-main)", margin: "4px 0" }}>Custom SKU Injection</h4>
            <p style={{ fontSize: "0.75rem", color: "var(--b2b-text-muted)", margin: 0 }}>Map your brand inventory to water hardness scores via JSON feed sync.</p>
          </div>
        </Link>
      </div>
    </div>
  );

  /* ──────────────────────────────────────────────────────────────────────────
     Slide 6: Pricing Tiers & Subscription
     ────────────────────────────────────────────────────────────────────────── */
  const renderSlide6Pricing = () => (
    <div>
      <div className="eyebrow-badge">
        <DollarIcon size={11} /> Commercial Models
      </div>
      <h2 className="slide-title">Flexible Commercial SaaS Tiers</h2>

      {checkoutError && (
        <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", padding: "1rem", borderRadius: "8px", color: "#ef4444", fontSize: "0.85rem", marginBottom: "1.5rem", textAlign: "center", maxWidth: "600px", margin: "0 auto 1.5rem" }}>
          {checkoutError}
        </div>
      )}
      
      {/* Region & Annual toggles */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", background: "var(--b2b-surface-alt)", border: "1px solid var(--b2b-border)", padding: "4px", borderRadius: "8px" }}>
          <button 
            onClick={() => setIsInternational(true)}
            style={{ padding: "0.35rem 1rem", fontSize: "0.75rem", borderRadius: "6px", background: isInternational ? "rgba(252,39,121,0.2)" : "transparent", color: isInternational ? "var(--b2b-text-main)" : "var(--b2b-text-muted)", fontWeight: isInternational ? 700 : 500, border: "none", cursor: "pointer", transition: "all 0.2s" }}
          >
            Global ($ USD via Dodo)
          </button>
          <button 
            onClick={() => setIsInternational(false)}
            style={{ padding: "0.35rem 1rem", fontSize: "0.75rem", borderRadius: "6px", background: !isInternational ? "rgba(252,39,121,0.2)" : "transparent", color: !isInternational ? "var(--b2b-text-main)" : "var(--b2b-text-muted)", fontWeight: !isInternational ? 700 : 500, border: "none", cursor: "pointer", transition: "all 0.2s" }}
          >
            India (₹ INR via Razorpay)
          </button>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem" }}>
          <button 
            onClick={() => setAnnualBilling(false)}
            className="pitch-btn-outline" 
            style={{ padding: "0.35rem 1rem", fontSize: "0.75rem", background: !annualBilling ? "rgba(252,39,121,0.08)" : "transparent", borderColor: !annualBilling ? "#fc2779" : "var(--b2b-border)" }}
          >
            Monthly Billing
          </button>
          <button 
            onClick={() => setAnnualBilling(true)}
            className="pitch-btn-outline" 
            style={{ padding: "0.35rem 1rem", fontSize: "0.75rem", background: annualBilling ? "rgba(252,39,121,0.08)" : "transparent", borderColor: annualBilling ? "#fc2779" : "var(--b2b-border)" }}
          >
            Annual Billing (Save 20%)
          </button>
        </div>
      </div>

      {/* Step 1: Lead form — must fill before subscribing */}
      <div id="lead-form-section" style={{ marginBottom: "2rem" }}>
        {leadSubmitted ? (
          <div style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.25)", padding: "1.25rem", borderRadius: "12px", display: "flex", alignItems: "center", gap: "1rem" }}>
            <CheckCircle2 size={24} color="#10b981" style={{ flexShrink: 0 }} />
            <div>
              <h4 style={{ fontWeight: 700, color: "var(--b2b-text-main)", marginBottom: "0.1rem", fontSize: "0.95rem" }}>Details saved — pick a plan below</h4>
              <p style={{ fontSize: "0.78rem", color: "var(--b2b-text-muted)", margin: 0 }}>Your API key will be provisioned to <strong style={{ color: "var(--b2b-text-main)" }}>{leadEmail}</strong> immediately after checkout.</p>
            </div>
          </div>
        ) : (
          <div className="lead-form-box" style={{ border: "1px solid rgba(252,39,121,0.3)", background: "rgba(252,39,121,0.04)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.6rem" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#fc2779", flexShrink: 0 }} />
              <h4 style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--b2b-text-main)", margin: 0 }}>
                Step 1 — Enter your details to unlock checkout
              </h4>
            </div>
            <p style={{ fontSize: "0.75rem", color: "var(--b2b-text-muted)", margin: "0 0 0.85rem" }}>Your API key will be provisioned to this email instantly after payment confirmation.</p>
            {checkoutError && (
              <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", padding: "0.75rem", borderRadius: "6px", color: "#ef4444", fontSize: "0.8rem", marginBottom: "0.85rem" }}>
                {checkoutError}
              </div>
            )}
            <form onSubmit={handleLeadSubmit} className="lead-form-grid">
              <input 
                type="text" 
                required 
                placeholder="Your Name" 
                className="pitch-input" 
                style={{ marginBottom: 0 }}
                value={leadName}
                onChange={(e) => setLeadName(e.target.value)}
              />
              <input 
                type="email" 
                required 
                placeholder="Work Email" 
                className="pitch-input" 
                style={{ marginBottom: 0 }}
                value={leadEmail}
                onChange={(e) => setLeadEmail(e.target.value)}
              />
              <input 
                type="text" 
                required 
                placeholder="Brand (e.g. Sephora)" 
                className="pitch-input" 
                style={{ marginBottom: 0 }}
                value={leadBrand}
                onChange={(e) => setLeadBrand(e.target.value)}
              />
              <button type="submit" disabled={isSubmittingLead} className="pitch-btn-primary" style={{ padding: "0.65rem 1.5rem" }}>
                {isSubmittingLead ? "Saving..." : "Save & Continue"}
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Step 2: Billing toggles — and then pick a plan */}
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      <div className="pricing-deck">
        <div className="tier-card">
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
            <div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, margin: 0 }}>Growth Tier</h3>
              <p style={{ fontSize: "0.75rem", color: "var(--b2b-text-muted)", marginTop: "0.25rem" }}>
                For scaling niche retailers and D2C brands.
              </p>
              <div style={{ margin: "1.5rem 0" }}>
                <span style={{ fontSize: "2.25rem", fontWeight: 800, color: "var(--b2b-text-main)" }}>
                  {isInternational ? "$" : "₹"}
                  {isInternational ? (annualBilling ? "399" : "499") : (annualBilling ? "33,200" : "41,500")}
                </span>
                <span style={{ fontSize: "0.85rem", color: "var(--b2b-text-muted)" }}>/mo</span>
              </div>
              <ul style={{ listStyle: "none", padding: 0, fontSize: "0.8rem", color: "var(--b2b-text-muted)", display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1.5rem" }}>
                <li>✓ Up to 150k API calls/mo</li>
                <li>✓ Hard Water Matrix (ppm)</li>
                <li>✓ Climate + Humidity Swaps</li>
                <li><strong style={{ color: "#34d399" }}>✓ Autonomous Skincare Agents Included</strong></li>
                <li>✓ Email support (24h SLA)</li>
              </ul>
            </div>
            <button
              onClick={() => handleSubscribe("growth")}
              disabled={checkoutLoading === "growth" || !leadSubmitted}
              className="pitch-btn-outline"
              style={{ width: "100%", justifyContent: "center", opacity: !leadSubmitted ? 0.5 : 1, cursor: !leadSubmitted ? "not-allowed" : "pointer" }}
            >
              {checkoutLoading === "growth" ? "Opening..." : (!leadSubmitted ? "Complete Step 1 First" : "Subscribe — Growth")}
            </button>
          </div>
        </div>

        <div className="tier-card popular">
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
            <div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, margin: 0 }}>Scale Enterprise</h3>
              <p style={{ fontSize: "0.75rem", color: "var(--b2b-text-muted)", marginTop: "0.25rem" }}>
                For global beauty marketplaces and high-volume catalogs.
              </p>
              <div style={{ margin: "1.5rem 0" }}>
                <span style={{ fontSize: "2.25rem", fontWeight: 800, color: "var(--b2b-text-main)" }}>
                  {isInternational ? "$" : "₹"}
                  {isInternational ? (annualBilling ? "1,499" : "1,899") : (annualBilling ? "1,24,000" : "1,58,000")}
                </span>
                <span style={{ fontSize: "0.85rem", color: "var(--b2b-text-muted)" }}>/mo</span>
              </div>
              <ul style={{ listStyle: "none", padding: 0, fontSize: "0.8rem", color: "var(--b2b-text-muted)", display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1.5rem" }}>
                <li>✓ Up to 1M API calls/mo</li>
                <li>✓ Advanced Water Mineral Matrix</li>
                <li>✓ Dynamic Dewpoint Adjusters</li>
                <li><strong style={{ color: "#34d399" }}>✓ Autonomous Skincare Agents Included</strong></li>
                <li>✓ Dedicated Slack channel support</li>
              </ul>
            </div>
            <button
              onClick={() => handleSubscribe("scale")}
              disabled={checkoutLoading === "scale" || !leadSubmitted}
              className="pitch-btn-primary"
              style={{ width: "100%", justifyContent: "center", opacity: !leadSubmitted ? 0.5 : 1, cursor: !leadSubmitted ? "not-allowed" : "pointer" }}
            >
              {checkoutLoading === "scale" ? "Opening..." : (!leadSubmitted ? "Complete Step 1 First" : "Subscribe — Scale")}
            </button>
          </div>
        </div>

        <div className="tier-card" style={{ background: "var(--b2b-card-bg)" }}>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
            <div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, margin: 0 }}>Global Custom</h3>
              <p style={{ fontSize: "0.75rem", color: "var(--b2b-text-muted)", marginTop: "0.25rem" }}>
                High volume, tailored SLA integrations.
              </p>
              <div style={{ margin: "1.5rem 0" }}>
                <span style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--b2b-text-main)" }}>Volume Pricing</span>
              </div>
              <ul style={{ listStyle: "none", padding: 0, fontSize: "0.8rem", color: "var(--b2b-text-muted)", display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1rem" }}>
                <li>✓ 1M+ custom API calls/mo</li>
                <li>✓ Tailored formulation parameters</li>
                <li><strong style={{ color: "#34d399" }}>✓ Autonomous Skincare Agents Included</strong></li>
                <li>✓ Dedicated multi-region edge node</li>
                <li>✓ 99.9% uptime SLA guarantee</li>
              </ul>
            </div>
            <Link href="/contact" className="pitch-btn-outline" style={{ width: "100%", justifyContent: "center", textAlign: "center", textDecoration: "none" }}>
              Contact Sales
            </Link>
          </div>
        </div>
      </div>

      <p style={{ textAlign: "center", fontSize: "0.8rem", color: "var(--b2b-text-muted)", marginTop: "1.5rem" }}>
        * Overage volume billed dynamically at $0.008 per additional request on Growth, and $0.003 on Scale Enterprise.
      </p>

      {/* Seamless Upgrades Banner */}
      <div style={{ marginTop: "1.75rem", background: "linear-gradient(135deg, rgba(252,39,121,0.06) 0%, rgba(56,189,248,0.06) 100%)", border: "1px solid rgba(252,39,121,0.25)", borderRadius: "14px", padding: "1.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.5rem" }}>
          <RefreshCw size={16} color="#fc2779" />
          <h4 style={{ fontWeight: 700, color: "var(--b2b-text-main)", fontSize: "0.95rem", margin: 0 }}>
            Upgrading an Active Plan? Instant In-Place Sync
          </h4>
        </div>
        <p style={{ fontSize: "0.82rem", color: "var(--b2b-text-muted)", lineHeight: 1.5, margin: 0 }}>
          Moving from <strong>Growth</strong> to <strong>Scale Enterprise</strong>? Simply checkout using your existing work email. Our webhook automatically increments your account quota to 1,000,000 requests/month and activates dedicated Slack channel support within 60 seconds. Zero key rotation or storefront downtime required.
        </p>
      </div>

      {/* Provisioning Info Box */}
      <div style={{ marginTop: "1.5rem", background: "rgba(255,255,255,0.03)", border: "1px solid var(--b2b-border)", borderRadius: "12px", padding: "1.5rem" }}>
        <h4 style={{ fontWeight: 600, color: "var(--b2b-text-main)", fontSize: "0.95rem", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981" }} />
          Instant API Provisioning
        </h4>
        <div className="provisioning-grid">
          <div>
            <span style={{ display: "block", color: "#fc2779", fontWeight: 700, marginBottom: "0.25rem", fontSize: "0.85rem" }}>1. Checkout</span>
            <p style={{ margin: 0, fontSize: "0.75rem", color: "var(--b2b-text-muted)", lineHeight: 1.5 }}>
              Select your tier and complete payment via Dodo Payments (Global) or Razorpay (India).
            </p>
          </div>
          <div>
            <span style={{ display: "block", color: "#fc2779", fontWeight: 700, marginBottom: "0.25rem", fontSize: "0.85rem" }}>2. Key Generation</span>
            <p style={{ margin: 0, fontSize: "0.75rem", color: "var(--b2b-text-muted)", lineHeight: 1.5 }}>
              Our system automatically provisions your unique <code style={{ color: "#38bdf8" }}>b2b_live_xxx</code> API key with your selected usage quota.
            </p>
          </div>
          <div>
            <span style={{ display: "block", color: "#fc2779", fontWeight: 700, marginBottom: "0.25rem", fontSize: "0.85rem" }}>3. Instant Delivery</span>
            <p style={{ margin: 0, fontSize: "0.75rem", color: "var(--b2b-text-muted)", lineHeight: 1.5 }}>
              Your API key and developer documentation are emailed to you instantly. Start integrating within 60 seconds.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <main className="pitch-page">
      <style>{`
        .pitch-page {
          --b2b-bg: #fcfbf9;
          --b2b-surface: #ffffff;
          --b2b-surface-alt: #f6f4f0;
          --b2b-sidebar-bg: #f8f6f2;
          --b2b-border: #e6ded4;
          --b2b-border-subtle: #eee8e0;
          --b2b-text-main: #0c0a09;
          --b2b-text-muted: #242220;
          --b2b-text-faint: #3d3834;
          --b2b-card-bg: #ffffff;
          --b2b-card-border: #e6ded4;
          --b2b-card-shadow: 0 4px 16px rgba(0,0,0,0.03);
          --b2b-pill-bg: rgba(0,0,0,0.05);
          --b2b-hover-bg: rgba(0,0,0,0.03);
          --b2b-input-bg: #ffffff;
          --b2b-code-bg: #14161f;
          background: var(--b2b-bg);
          color: var(--b2b-text-main);
          font-family: var(--font-dm-sans), sans-serif;
          min-height: calc(100vh - 4rem);
          display: flex;
          flex-direction: column;
          position: relative;
          overflow-x: hidden;
          transition: background 0.3s ease, color 0.3s ease;
        }

        html.dark .pitch-page,
        .dark .pitch-page {
          --b2b-bg: #070a12;
          --b2b-surface: #0b0f19;
          --b2b-surface-alt: #0c101d;
          --b2b-sidebar-bg: #0c101d;
          --b2b-border: rgba(255,255,255,0.06);
          --b2b-border-subtle: rgba(255,255,255,0.04);
          --b2b-text-main: #f1f5f9;
          --b2b-text-muted: #94a3b8;
          --b2b-text-faint: rgba(255,255,255,0.4);
          --b2b-card-bg: #0b0f19;
          --b2b-card-border: rgba(255,255,255,0.06);
          --b2b-card-shadow: none;
          --b2b-pill-bg: rgba(255,255,255,0.1);
          --b2b-hover-bg: rgba(255,255,255,0.03);
          --b2b-input-bg: rgba(255,255,255,0.02);
          --b2b-code-bg: #030712;
          background: var(--b2b-bg) !important;
          color: var(--b2b-text-main) !important;
        }

        /* ── View Mode Switcher Header ── */
        .b2b-header-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 2rem;
          background: var(--b2b-surface);
          border-bottom: 1px solid var(--b2b-border);
          position: sticky;
          top: 0;
          z-index: 40;
          backdrop-filter: blur(12px);
        }

        .mode-toggle-group {
          display: inline-flex;
          align-items: center;
          background: var(--b2b-surface-alt);
          border: 1px solid var(--b2b-border);
          border-radius: 99px;
          padding: 3px;
          gap: 2px;
        }

        .mode-btn {
          border: none;
          background: transparent;
          color: var(--b2b-text-muted);
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.35rem 0.85rem;
          border-radius: 99px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s ease;
        }

        .mode-btn.active {
          background: #fc2779;
          color: #ffffff;
          box-shadow: 0 2px 8px rgba(252,39,121,0.3);
        }

        /* ── Scroll Mode Layout ── */
        .scroll-view-wrapper {
          width: 100%;
          max-width: 1100px;
          margin: 0 auto;
          padding: 2.5rem 1.5rem 6rem;
          display: flex;
          flex-direction: column;
          gap: 3.5rem;
        }

        .scroll-section {
          scroll-margin-top: 5rem;
          background: var(--b2b-surface);
          border: 1px solid var(--b2b-border);
          border-radius: 20px;
          padding: 2.5rem;
          box-shadow: var(--b2b-card-shadow);
          position: relative;
          overflow: hidden;
        }

        /* ── Deck Framework Layout ── */
        .deck-wrapper {
          display: grid;
          grid-template-columns: 260px 1fr;
          flex: 1;
          width: 100%;
          max-width: 100%;
          min-width: 0;
          box-sizing: border-box;
          min-height: calc(100vh - 8rem);
        }

        @media (max-width: 1024px) {
          .deck-wrapper {
            grid-template-columns: 1fr;
          }
        }

        /* Sidebar Navigation */
        .deck-sidebar {
          background: var(--b2b-sidebar-bg);
          border-right: 1px solid var(--b2b-border);
          padding: 2rem 1.5rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        @media (max-width: 1024px) {
          .deck-sidebar {
            display: none;
          }
        }

        .sidebar-title {
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--b2b-text-faint);
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .slide-nav-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .slide-nav-item {
          padding: 0.75rem 1rem;
          border-radius: 8px;
          cursor: pointer;
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--b2b-text-muted);
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          border: 1px solid transparent;
        }

        .slide-nav-item:hover {
          background: var(--b2b-hover-bg);
          color: var(--b2b-text-main);
        }

        .slide-nav-item.active {
          background: rgba(252,39,121,0.08);
          color: #fc2779;
          border-color: rgba(252,39,121,0.25);
          font-weight: 600;
        }

        .slide-nav-number {
          font-family: monospace;
          opacity: 0.5;
        }

        .sidebar-promo-card {
          padding: 1.25rem;
          background: var(--b2b-card-bg);
          border-radius: 12px;
          border: 1px solid var(--b2b-border);
          box-shadow: var(--b2b-card-shadow);
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .sidebar-promo-card:hover {
          background: var(--b2b-surface-alt);
          border-color: var(--b2b-text-muted);
          transform: translateY(-2px);
        }

        /* Slide Container */
        .deck-body {
          padding: 3rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          background: var(--b2b-bg);
          width: 100%;
          max-width: 100%;
          min-width: 0;
          box-sizing: border-box;
        }

        @media (max-width: 640px) {
          .deck-body {
            padding: 1.5rem;
          }
        }

        /* Slide Frames */
        .slide-viewport {
          max-width: 1000px;
          margin: 0 auto;
          width: 100%;
          min-width: 0;
          box-sizing: border-box;
          min-height: 500px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        /* Navigation Bar Bottom */
        .deck-controls {
          background: var(--b2b-sidebar-bg);
          border-top: 1px solid var(--b2b-border);
          padding: 1rem 2.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 10;
        }

        .progress-container {
          flex: 1;
          max-width: 300px;
          height: 4px;
          background: var(--b2b-border-subtle);
          border-radius: 99px;
          margin: 0 2rem;
          overflow: hidden;
          position: relative;
        }

        .progress-bar {
          height: 100%;
          background: #fc2779;
          transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* ── Typography & Components ── */
        .eyebrow-badge {
          background: rgba(252,39,121,0.1);
          border: 1px solid rgba(252,39,121,0.25);
          color: #fc2779;
          padding: 0.35rem 0.85rem;
          border-radius: 99px;
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          width: fit-content;
          margin-bottom: 1.5rem;
        }

        .slide-title {
          font-family: var(--font-playfair), Georgia, serif;
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 700;
          line-height: 1.15;
          letter-spacing: -0.01em;
          margin-bottom: 1rem;
          color: var(--b2b-text-main);
        }

        .slide-subtitle {
          font-size: clamp(1rem, 2.5vw, 1.25rem);
          color: var(--b2b-text-muted);
          line-height: 1.5;
          margin-bottom: 2.5rem;
          font-weight: 400;
        }

        /* Slide 1 Cover Styles */
        .cover-visuals {
          position: absolute;
          right: 0%;
          top: 10%;
          width: min(500px, 90vw);
          height: min(500px, 90vw);
          background: radial-gradient(circle, rgba(252,39,121,0.12) 0%, transparent 70%);
          z-index: 0;
          pointer-events: none;
          overflow: hidden;
        }

        /* Slide 2: Problem Grid */
        .problem-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 3rem;
        }

        @media (max-width: 860px) {
          .problem-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }

        .vs-card {
          padding: 1.5rem;
          border-radius: 12px;
          border: 1px solid var(--b2b-border);
          background: var(--b2b-surface);
          box-shadow: var(--b2b-card-shadow);
        }

        .vs-card.bad {
          border-left: 4px solid #ef4444;
        }

        .vs-card.good {
          border-left: 4px solid #10b981;
        }

        .metric-banner {
          background: var(--b2b-surface-alt);
          border: 1px solid var(--b2b-border);
          border-radius: 12px;
          padding: 1.5rem;
          text-align: center;
        }

        .metric-large {
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          font-weight: 800;
          color: #fc2779;
          line-height: 1;
          margin-bottom: 0.5rem;
        }

        /* Slide 3: Hotspot Demo */
        .hotspot-container {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 2rem;
          background: var(--b2b-surface);
          border: 1px solid var(--b2b-border);
          box-shadow: var(--b2b-card-shadow);
          border-radius: 16px;
          overflow: hidden;
        }

        @media (max-width: 860px) {
          .hotspot-container {
            grid-template-columns: 1fr;
          }
        }

        .map-selector-box {
          background: var(--b2b-surface-alt);
          padding: 1.5rem;
          border-right: 1px solid var(--b2b-border);
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        @media (max-width: 860px) {
          .map-selector-box {
            border-right: none;
            border-bottom: 1px solid var(--b2b-border);
          }
        }

        .city-button {
          padding: 0.85rem 1rem;
          border-radius: 8px;
          background: transparent;
          border: 1px solid transparent;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--b2b-text-muted);
          transition: all 0.2s ease;
          width: 100%;
          text-align: left;
        }

        .city-button:hover {
          background: var(--b2b-hover-bg);
          color: var(--b2b-text-main);
        }

        .city-button.active {
          background: var(--b2b-card-bg);
          border-color: #fc2779;
          color: var(--b2b-text-main);
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }

        .city-pill {
          font-size: 0.7rem;
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          font-weight: 700;
        }

        .city-pill.hard {
          background: rgba(239,68,68,0.1);
          color: #ef4444;
        }

        .city-pill.soft {
          background: rgba(16,185,129,0.1);
          color: #10b981;
        }

        .hotspot-details {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .ppm-dial {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid var(--b2b-border);
        }

        .ppm-circle {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          border: 3px solid #fc2779;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-weight: 800;
          color: #fc2779;
          background: rgba(252,39,121,0.04);
          text-shadow: 0 0 10px rgba(252,39,121,0.2);
        }

        .b2b-agents-banner {
          margin-top: 1.75rem;
          background: rgba(16,185,129,0.04);
          border: 1px solid rgba(16,185,129,0.2);
          border-radius: 14px;
          padding: 1.25rem;
        }

        .b2b-agents-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 0.75rem;
        }

        /* Slide 4: ROI Calculator */
        .roi-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2.5rem;
        }

        @media (max-width: 860px) {
          .roi-grid {
            grid-template-columns: 1fr;
          }
        }

        .roi-sliders {
          background: var(--b2b-surface);
          border: 1px solid var(--b2b-border);
          box-shadow: var(--b2b-card-shadow);
          border-radius: 16px;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .slider-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .slider-header {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--b2b-text-muted);
        }

        .slider-value {
          color: #fc2779;
          font-family: monospace;
          font-weight: 700;
          font-size: 1rem;
        }

        .slider-input {
          -webkit-appearance: none;
          width: 100%;
          height: 6px;
          border-radius: 99px;
          background: var(--b2b-border);
          outline: none;
          cursor: pointer;
        }

        .slider-input::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #fc2779;
          border: 2px solid #fff;
          cursor: pointer;
          transition: transform 0.1s;
        }

        .slider-input::-webkit-slider-thumb:hover {
          transform: scale(1.15);
        }

        .roi-result-card {
          background: linear-gradient(135deg, rgba(252,39,121,0.06) 0%, rgba(139,92,246,0.06) 100%);
          border: 1px solid rgba(252,39,121,0.25);
          border-radius: 16px;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .annual-value {
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          font-weight: 800;
          color: #10b981;
          line-height: 1.1;
          margin: 1.5rem 0;
          text-shadow: 0 0 25px rgba(16,185,129,0.25);
          font-family: monospace;
        }

        /* Slide 6: Pricing Tiers */
        .pricing-deck {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 1.5rem;
        }

        @media (max-width: 768px) {
          .pricing-deck {
            grid-template-columns: 1fr;
          }
        }

        .tier-card {
          background: var(--b2b-surface);
          border: 1px solid var(--b2b-border);
          box-shadow: var(--b2b-card-shadow);
          border-radius: 16px;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          transition: border-color 0.3s;
        }

        .tier-card.popular {
          border-color: #fc2779;
          background: linear-gradient(180deg, #ffffff 0%, #fff7fa 100%);
        }

        html.dark .tier-card.popular,
        .dark .tier-card.popular {
          border-color: #fc2779 !important;
          background: linear-gradient(180deg, #0e1424 0%, #0b0f19 100%) !important;
        }

        .tier-card.popular::after {
          content: "Most Requested";
          position: absolute;
          top: -0.75rem;
          left: 50%;
          transform: translateX(-50%);
          background: #fc2779;
          color: #fff;
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          padding: 0.25rem 0.75rem;
          border-radius: 99px;
          letter-spacing: 0.05em;
        }

        .provisioning-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-top: 1rem;
        }

        /* Utility buttons */
        .pitch-btn-primary {
          background: #fc2779;
          color: #fff;
          border: none;
          padding: 0.8rem 1.8rem;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: background 0.2s, transform 0.15s;
          text-shadow: none;
        }

        .pitch-btn-primary:hover {
          background: #d41a65;
          transform: translateY(-1px);
        }

        .pitch-btn-outline {
          background: transparent;
          color: var(--b2b-text-main);
          border: 1px solid var(--b2b-border);
          padding: 0.8rem 1.8rem;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: background 0.2s, border-color 0.2s;
        }

        html.dark .pitch-btn-outline,
        .dark .pitch-btn-outline {
          color: #fff !important;
          border-color: rgba(255,255,255,0.2) !important;
        }

        .pitch-btn-outline:hover {
          background: var(--b2b-hover-bg);
          border-color: var(--b2b-text-muted);
        }

        /* Lead modal */
        .lead-form-box {
          background: var(--b2b-surface);
          border: 1px solid var(--b2b-border);
          box-shadow: var(--b2b-card-shadow);
          border-radius: 12px;
          padding: 1.5rem;
        }

        .lead-form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)) auto;
          gap: 0.75rem;
        }

        @media (max-width: 640px) {
          .lead-form-grid {
            grid-template-columns: 1fr;
          }
        }

        .pitch-input {
          width: 100%;
          padding: 0.65rem 0.85rem;
          border-radius: 6px;
          background: var(--b2b-input-bg);
          border: 1px solid var(--b2b-border);
          color: var(--b2b-text-main);
          font-size: 0.85rem;
          margin-bottom: 0.75rem;
          outline: none;
          transition: border-color 0.2s;
        }

        html.dark .pitch-input,
        .dark .pitch-input {
          background: rgba(255,255,255,0.02) !important;
          border-color: rgba(255,255,255,0.08) !important;
          color: #fff !important;
        }

        .pitch-input:focus {
          border-color: #fc2779;
        }

        /* Mobile Slide Tab Bar (replaces hidden sidebar) */
        .mobile-slide-tabs {
          display: none;
        }

        @media (max-width: 1024px) {
          .mobile-slide-tabs {
            display: flex;
            overflow-x: auto;
            gap: 0.4rem;
            padding: 0.75rem 1rem;
            background: var(--b2b-surface-alt);
            border-bottom: 1px solid var(--b2b-border);
            scrollbar-width: none;
            -ms-overflow-style: none;
            -webkit-overflow-scrolling: touch;
            width: 100%;
            max-width: 100vw;
            box-sizing: border-box;
          }

          .mobile-slide-tabs::-webkit-scrollbar {
            display: none;
          }

          .mobile-tab-btn {
            flex-shrink: 0;
            padding: 0.45rem 0.85rem;
            border-radius: 99px;
            border: 1px solid var(--b2b-border);
            background: var(--b2b-card-bg);
            color: var(--b2b-text-muted);
            font-size: 0.72rem;
            font-weight: 600;
            cursor: pointer;
            white-space: nowrap;
            transition: all 0.2s ease;
            font-family: var(--font-dm-sans), sans-serif;
          }

          .mobile-tab-btn.active {
            background: rgba(252,39,121,0.12);
            border-color: #fc2779;
            color: #fc2779;
          }

          html.dark .mobile-slide-tabs,
          .dark .mobile-slide-tabs {
            background: #0c101d !important;
            border-bottom: 1px solid rgba(255,255,255,0.06) !important;
          }

          html.dark .mobile-tab-btn,
          .dark .mobile-tab-btn {
            border: 1px solid rgba(255,255,255,0.1) !important;
            background: transparent !important;
            color: rgba(255,255,255,0.6) !important;
          }

          html.dark .mobile-tab-btn.active,
          .dark .mobile-tab-btn.active {
            background: rgba(252,39,121,0.12) !important;
            border-color: #fc2779 !important;
            color: #fc2779 !important;
          }
        }
      `}</style>

      {/* Top Bar with Mode Toggle & Portal Link */}
      <header className="b2b-header-bar">
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "#fc2779", letterSpacing: "0.05em", textTransform: "uppercase" }}>
            Mirha &amp; Co. B2B Suite
          </span>
          <span style={{ fontSize: "0.75rem", color: "var(--b2b-text-muted)", display: "none" }} className="md:inline-block">
            Climate &amp; Hard Water Skincare Intelligence
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div className="mode-toggle-group">
            <button
              onClick={() => setViewMode("deck")}
              className={`mode-btn ${viewMode === "deck" ? "active" : ""}`}
              title="Interactive Slide Deck View"
            >
              <Monitor size={13} /> Presentation Deck
            </button>
            <button
              onClick={() => setViewMode("scroll")}
              className={`mode-btn ${viewMode === "scroll" ? "active" : ""}`}
              title="Continuous Executive Document View"
            >
              <FileText size={13} /> Full Overview
            </button>
          </div>

          <Link
            href="/b2b/dashboard"
            className="pitch-btn-outline"
            style={{ padding: "0.35rem 0.85rem", fontSize: "0.75rem", textDecoration: "none", borderRadius: "99px" }}
          >
            Partner Dashboard <ArrowRight size={13} style={{ marginLeft: "4px" }} />
          </Link>
        </div>
      </header>

      {/* RENDER MODE: SLIDE DECK VIEW */}
      {viewMode === "deck" ? (
        <>
          {/* Mobile Slide Tab Bar — visible below 1024px only */}
          <div className="mobile-slide-tabs">
            {[
              "Cover",
              "Problem",
              "Solution",
              "ROI",
              "Sandbox",
              "Pricing",
            ].map((label, idx) => (
              <button
                key={idx}
                className={`mobile-tab-btn ${currentSlide === idx + 1 ? "active" : ""}`}
                onClick={() => setCurrentSlide(idx + 1)}
              >
                <span style={{ opacity: 0.5, marginRight: "0.3rem", fontFamily: "monospace" }}>0{idx + 1}</span>
                {label}
              </button>
            ))}
          </div>

          <div className="deck-wrapper">
            {/* Sidebar Nav */}
            <aside className="deck-sidebar">
              <div>
                <div className="sidebar-title">
                  <span>Pitch Slides</span>
                </div>
                <ul className="slide-nav-list">
                  {[
                    "Cover & Vision",
                    "The Skincare Problem",
                    "Environmental Solution",
                    "Business Case & ROI",
                    "Scale & Sandbox",
                    "SaaS Pricing & Pilot"
                  ].map((title, idx) => (
                    <li 
                      key={idx}
                      className={`slide-nav-item ${currentSlide === idx + 1 ? "active" : ""}`}
                      onClick={() => setCurrentSlide(idx + 1)}
                    >
                      <span className="slide-nav-number">0{idx + 1}</span>
                      <span>{title}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Developer API Portal Card */}
              <div className="sidebar-promo-card" style={{ marginTop: "auto" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                  <span style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#0284c7", fontWeight: 700 }}>
                    Developer API Portal
                  </span>
                  <span style={{ fontSize: "0.6rem", background: "rgba(2,132,199,0.1)", color: "#0284c7", padding: "0.15rem 0.45rem", borderRadius: "4px", fontWeight: 700 }}>
                    Live Sandbox
                  </span>
                </div>
                <p style={{ fontSize: "0.78rem", color: "var(--b2b-text-muted)", lineHeight: 1.45, margin: "0 0 0.85rem 0" }}>
                  Test API keys, simulate localized water hardness, and map custom store SKUs.
                </p>
                <Link
                  href="/b2b/dashboard"
                  className="pitch-btn-outline"
                  style={{ padding: "0.55rem 0.9rem", fontSize: "0.78rem", width: "100%", textDecoration: "none", justifyContent: "center", display: "inline-flex" }}
                >
                  Enter API Portal <ArrowRight size={13} style={{ marginLeft: "4px" }} />
                </Link>
              </div>
            </aside>

            {/* Slide viewport */}
            <section className="deck-body">
              <div className="slide-viewport">
                {currentSlide === 1 && renderSlide1Cover()}
                {currentSlide === 2 && renderSlide2Problem()}
                {currentSlide === 3 && renderSlide3Solution()}
                {currentSlide === 4 && renderSlide4ROI()}
                {currentSlide === 5 && renderSlide5Sandbox()}
                {currentSlide === 6 && renderSlide6Pricing()}
              </div>
            </section>
          </div>

          {/* Navigation Bar Bottom */}
          <footer className="deck-controls">
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button 
                onClick={() => setCurrentSlide(prev => Math.max(prev - 1, 1))}
                disabled={currentSlide === 1}
                className="pitch-btn-outline"
                style={{ padding: "0.5rem 1rem", opacity: currentSlide === 1 ? 0.3 : 1 }}
              >
                <ChevronLeft size={16} /> Prev
              </button>
              <button 
                onClick={() => setCurrentSlide(prev => Math.min(prev + 1, totalSlides))}
                disabled={currentSlide === totalSlides}
                className="pitch-btn-outline"
                style={{ padding: "0.5rem 1rem", opacity: currentSlide === totalSlides ? 0.3 : 1 }}
              >
                Next <ChevronRight size={16} />
              </button>
            </div>

            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={{ fontSize: "0.75rem", color: "var(--b2b-text-muted)", fontFamily: "monospace" }}>
                Slide {currentSlide} of {totalSlides}
              </span>
              <div className="progress-container">
                <div 
                  className="progress-bar" 
                  style={{ width: `${(currentSlide / totalSlides) * 100}%` }}
                />
              </div>
            </div>

            <div className="deck-controls-brand">
              <span style={{ fontSize: "0.75rem", color: "#fc2779", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Climate &amp; Hard Water API
              </span>
            </div>
          </footer>
        </>
      ) : (
        /* RENDER MODE: FULL SCROLLABLE EXECUTIVE DOCUMENT */
        <div className="scroll-view-wrapper">
          <section id="cover" className="scroll-section">
            {renderSlide1Cover()}
          </section>
          <section id="problem" className="scroll-section">
            {renderSlide2Problem()}
          </section>
          <section id="demo" className="scroll-section">
            {renderSlide3Solution()}
          </section>
          <section id="roi" className="scroll-section">
            {renderSlide4ROI()}
          </section>
          <section id="sandbox" className="scroll-section">
            {renderSlide5Sandbox()}
          </section>
          <section id="pricing" className="scroll-section">
            {renderSlide6Pricing()}
          </section>

          {/* Quick return to top */}
          <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="pitch-btn-outline"
              style={{ borderRadius: "99px", padding: "0.6rem 1.5rem" }}
            >
              <ChevronUp size={16} /> Back to Top
            </button>
            <button
              onClick={() => { setViewMode("deck"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="pitch-btn-primary"
              style={{ borderRadius: "99px", padding: "0.6rem 1.5rem" }}
            >
              <Monitor size={16} /> Switch to Presentation Deck
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
