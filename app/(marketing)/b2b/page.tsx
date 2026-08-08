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
  Sparkles,
  RefreshCw,
  Sliders,
  DollarSign as DollarIcon
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

  // Slide 3: Hotspot Demo State
  const [selectedCity, setSelectedCity] = useState<keyof typeof CITY_DATABASE>("london");
  const activeCityData = CITY_DATABASE[selectedCity];

  // Slide 4: ROI Calculator State
  const [traffic, setTraffic] = useState(500000); // 500k monthly sessions
  const [aov, setAov] = useState(50); // $50 AOV
  const [cr, setCr] = useState(2.5); // 2.5% Conversion Rate
  const [returnsRate, setReturnsRate] = useState(22); // 22% average returns

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

  const handleSubscribe = async (tier: "growth" | "scale") => {
    setCheckoutError(null);
    if (!leadEmail || !leadBrand) {
      setCheckoutError("Please fill in your Work Email and Brand Name in the form below first.");
      
      // Scroll to the lead form box
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
          // Store email so /b2b/dashboard can auto-lookup the provisioned key
          sessionStorage.setItem("b2b_checkout_email", leadEmail);
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

        // Ensure Razorpay script is loaded dynamically if not present
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
            // Store email so /b2b/dashboard can auto-lookup the provisioned key
            sessionStorage.setItem("b2b_checkout_email", leadEmail);
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

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
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
  }, [currentSlide]);

  return (
    <main className="pitch-page">
      <style>{`
        .pitch-page {
          background: #070a12;
          color: #f1f5f9;
          font-family: var(--font-dm-sans), sans-serif;
          min-height: calc(100vh - 4rem);
          display: flex;
          flex-direction: column;
          position: relative;
          overflow-x: hidden;
        }

        /* ── Deck Framework Layout ── */
        .deck-wrapper {
          display: grid;
          grid-template-columns: 260px 1fr;
          flex: 1;
          max-width: 100%;
          min-height: calc(100vh - 8rem);
        }

        @media (max-width: 1024px) {
          .deck-wrapper {
            grid-template-columns: 1fr;
          }
        }

        /* Sidebar Navigation */
        .deck-sidebar {
          background: #0c101d;
          border-right: 1px solid rgba(255,255,255,0.06);
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
          color: rgba(255, 255, 255, 0.4);
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
          color: rgba(255,255,255,0.6);
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          border: 1px solid transparent;
        }

        .slide-nav-item:hover {
          background: rgba(255,255,255,0.03);
          color: #fff;
        }

        .slide-nav-item.active {
          background: rgba(252,39,121,0.08);
          color: #fc2779;
          border-color: rgba(252,39,121,0.2);
          font-weight: 600;
        }

        .slide-nav-number {
          font-family: monospace;
          opacity: 0.5;
        }

        /* Slide Container */
        .deck-body {
          padding: 3rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          background: radial-gradient(circle at 70% 30%, rgba(252,39,121,0.03) 0%, transparent 60%);
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
          min-height: 500px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        /* Navigation Bar Bottom */
        .deck-controls {
          background: #0c101d;
          border-top: 1px solid rgba(255,255,255,0.06);
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
          background: rgba(255,255,255,0.1);
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
          background: rgba(252,39,121,0.12);
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
          color: #ffffff;
        }

        .slide-subtitle {
          font-size: clamp(1rem, 2.5vw, 1.25rem);
          color: #94a3b8;
          line-height: 1.5;
          margin-bottom: 2.5rem;
          font-weight: 400;
        }

        /* Slide 1 Cover Styles */
        .cover-visuals {
          position: absolute;
          right: -10%;
          top: 10%;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(252,39,121,0.15) 0%, transparent 70%);
          z-index: 0;
          pointer-events: none;
        }

        /* Slide 2: Problem Grid */
        .problem-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 3rem;
          align-items: center;
        }

        @media (max-width: 768px) {
          .problem-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }

        .metric-banner {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px;
          padding: 2rem;
          position: relative;
          overflow: hidden;
        }

        .metric-large {
          font-size: 4rem;
          font-weight: 800;
          color: #fc2779;
          line-height: 1;
          margin-bottom: 0.5rem;
          font-family: monospace;
          text-shadow: 0 0 20px rgba(252,39,121,0.25);
        }

        .comparison-vs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .vs-card {
          padding: 1.25rem;
          border-radius: 12px;
          background: rgba(255,255,255,0.01);
          border: 1px solid rgba(255,255,255,0.04);
        }

        .vs-card.bad {
          border-left: 3px solid #ef4444;
        }

        .vs-card.good {
          border-left: 3px solid #10b981;
          background: rgba(16,185,129,0.02);
        }

        /* Slide 3: Interactive Hotspot Map */
        .hotspot-container {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 2rem;
        }

        @media (max-width: 900px) {
          .hotspot-container {
            grid-template-columns: 1fr;
          }
        }

        .map-selector-box {
          background: #0b0f19;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px;
          padding: 1.5rem;
        }

        .city-button {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          padding: 1rem;
          border-radius: 10px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.04);
          color: #94a3b8;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          margin-bottom: 0.5rem;
          text-align: left;
        }

        .city-button:hover {
          background: rgba(255,255,255,0.04);
          color: #fff;
        }

        .city-button.active {
          background: rgba(252,39,121,0.08);
          border-color: #fc2779;
          color: #fff;
        }

        .city-pill {
          font-size: 0.7rem;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-weight: 700;
          background: rgba(255,255,255,0.1);
        }

        .city-pill.hard {
          background: rgba(239,68,68,0.15);
          color: #ef4444;
        }

        .city-pill.soft {
          background: rgba(16,185,129,0.15);
          color: #10b981;
        }

        .hotspot-details {
          background: rgba(255,255,255,0.01);
          border: 1px solid rgba(255,255,255,0.04);
          border-radius: 16px;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .ppm-dial {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid rgba(255,255,255,0.06);
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
          background: #0b0f19;
          border: 1px solid rgba(255,255,255,0.06);
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
          color: #94a3b8;
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
          background: rgba(255,255,255,0.1);
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

        .roi-result-card::before {
          content: "";
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 60%);
          pointer-events: none;
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

        /* Slide 5: Integration & Latency Benchmarks */
        .latency-container {
          background: #0b0f19;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px;
          padding: 1.5rem 2rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .latency-meter {
          height: 10px;
          background: rgba(255,255,255,0.06);
          border-radius: 99px;
          overflow: hidden;
          position: relative;
        }

        .latency-pointer {
          height: 100%;
          background: linear-gradient(90deg, #10b981, #34d399);
          border-radius: 99px;
          transition: width 0.8s cubic-bezier(0.1, 0.8, 0.3, 1);
        }

        /* Slide 6: Pricing Tiers */
        .pricing-deck {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 1.5rem;
        }

        /* Slide 5: Performance grid */
        .perf-grid {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: 2rem;
        }

        @media (max-width: 768px) {
          .pricing-deck {
            grid-template-columns: 1fr;
          }
        }

        .tier-card {
          background: #0b0f19;
          border: 1px solid rgba(255,255,255,0.06);
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
          background: linear-gradient(180deg, #0e1424 0%, #0b0f19 100%);
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
          color: #fff;
          border: 1px solid rgba(255,255,255,0.2);
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

        .pitch-btn-outline:hover {
          background: rgba(255,255,255,0.03);
          border-color: rgba(255,255,255,0.4);
        }

        .code-snippet {
          background: #030712;
          padding: 1rem;
          border-radius: 10px;
          font-family: "Courier New", Courier, monospace;
          font-size: 0.75rem;
          color: #38bdf8;
          overflow-x: auto;
          border: 1px solid rgba(255,255,255,0.04);
          white-space: pre-wrap;
          word-break: break-all;
        }

        /* Lead modal */
        .lead-form-box {
          background: #0b0f19;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 12px;
          padding: 1.5rem;
        }

        .pitch-input {
          width: 100%;
          padding: 0.65rem 0.85rem;
          border-radius: 6px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.08);
          color: #fff;
          font-size: 0.85rem;
          margin-bottom: 0.75rem;
          outline: none;
          transition: border-color 0.2s;
        }

        .pitch-input:focus {
          border-color: #fc2779;
        }
        /* ── MOBILE OPTIMIZATIONS ── */
        @media (max-width: 640px) {

          /* Slide viewport — remove fixed min-height so content isn't clipped */
          .slide-viewport {
            min-height: unset;
            padding-bottom: 1rem;
          }

          /* Deck body tighter padding */
          .deck-body {
            padding: 1.25rem 1rem 1.5rem;
          }

          /* Slide title smaller on phones */
          .slide-title {
            font-size: clamp(1.6rem, 7vw, 2.2rem) !important;
            margin-bottom: 0.75rem;
          }

          /* Subtitle smaller */
          .slide-subtitle {
            font-size: 0.9rem !important;
            margin-bottom: 1.5rem;
          }

          /* Eyebrow badge smaller */
          .eyebrow-badge {
            font-size: 0.6rem;
            padding: 0.28rem 0.7rem;
            margin-bottom: 1rem;
          }

          /* ── Problem Grid: full stack ── */
          .problem-grid {
            grid-template-columns: 1fr !important;
            gap: 1rem;
          }

          /* Metric banners: smaller number */
          .metric-large {
            font-size: 2.5rem !important;
          }

          /* VS cards: smaller text */
          .vs-card {
            padding: 0.9rem;
          }

          /* ── Hotspot Demo: stack ── */
          .hotspot-container {
            grid-template-columns: 1fr !important;
            gap: 1rem;
          }

          /* City buttons: stack label & pill vertically */
          .city-button {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.35rem;
            padding: 0.8rem;
          }

          .city-pill {
            font-size: 0.65rem;
          }

          /* PPM dial: horizontal, smaller circle */
          .ppm-circle {
            width: 60px;
            height: 60px;
            min-width: 60px;
          }

          /* Hotspot details padding */
          .hotspot-details {
            padding: 1.25rem;
          }

          /* ── ROI Calculator: stack ── */
          .roi-grid {
            grid-template-columns: 1fr !important;
            gap: 1.25rem;
          }

          .roi-sliders {
            padding: 1.25rem;
            gap: 1rem;
          }

          .roi-result-card {
            padding: 1.25rem;
          }

          .annual-value {
            font-size: 2rem !important;
            margin: 1rem 0;
          }

          /* ── Pricing: stack ── */
          .pricing-deck {
            grid-template-columns: 1fr !important;
            gap: 1rem;
          }

          .tier-card {
            padding: 1.25rem;
          }

          /* Buttons: full width on mobile */
          .pitch-btn-primary,
          .pitch-btn-outline {
            width: 100%;
            justify-content: center;
            padding: 0.85rem 1rem;
          }

          /* Lead form: tighter */
          .lead-form-box {
            padding: 1rem;
          }

          /* Bottom controls: tighter */
          .deck-controls {
            padding: 0.75rem 1rem;
          }

          .progress-container {
            margin: 0 0.75rem;
            max-width: unset;
          }

          /* ── Performance Slide 5: stack code + edge panel ── */
          .perf-grid {
            grid-template-columns: 1fr !important;
          }
        }

        /* ── Mobile Slide Tab Bar (replaces hidden sidebar) ── */
        .mobile-slide-tabs {
          display: none;
        }

        @media (max-width: 1024px) {
          .mobile-slide-tabs {
            display: flex;
            overflow-x: auto;
            gap: 0.4rem;
            padding: 0.75rem 1rem;
            background: #0c101d;
            border-bottom: 1px solid rgba(255,255,255,0.06);
            scrollbar-width: none;
            -ms-overflow-style: none;
            -webkit-overflow-scrolling: touch;
          }

          .mobile-slide-tabs::-webkit-scrollbar {
            display: none;
          }

          .mobile-tab-btn {
            flex-shrink: 0;
            padding: 0.45rem 0.85rem;
            border-radius: 99px;
            border: 1px solid rgba(255,255,255,0.1);
            background: transparent;
            color: rgba(255,255,255,0.5);
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
        }
      `}</style>

      {/* Mobile Slide Tab Bar — visible below 1024px only */}
      <div className="mobile-slide-tabs">
        {[
          "Cover",
          "Problem",
          "Solution",
          "ROI",
          "Performance",
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
              <Sparkles size={12} color="#fc2779" />
              <span>Pitch Slides</span>
            </div>
            <ul className="slide-nav-list">
              {[
                "Cover & Vision",
                "The Skincare Problem",
                "Environmental Solution",
                "Business Case & ROI",
                "Scale & Edge Performance",
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

          <div style={{ padding: "1.25rem", background: "rgba(255,255,255,0.02)", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.04)" }}>
            <span style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "#38bdf8", display: "block", marginBottom: "0.5rem", fontWeight: 700 }}>
              Developer Portal
            </span>
            <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.4, margin: "0 0 0.75rem 0" }}>
              Zip Code Geocoding & Custom Store Catalog Sandbox
            </p>
            <Link
              href="/b2b/dashboard"
              className="pitch-btn-outline"
              style={{ padding: "0.45rem 0.85rem", fontSize: "0.75rem", width: "100%", textDecoration: "none" }}
            >
              Enter API Portal <ArrowRight size={12} />
            </Link>
          </div>

          <div style={{ padding: "1rem", background: "rgba(255,255,255,0.02)", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.04)", marginTop: "0.75rem" }}>
            <span style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "#f59f00", display: "block", marginBottom: "0.5rem", fontWeight: 700 }}>
              Pitch Deck
            </span>
            <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.4, margin: "0 0 0.75rem 0" }}>
              Shareable full-screen investor &amp; partner deck
            </p>
            <Link
              href="/b2b/pitch"
              className="pitch-btn-outline"
              style={{ padding: "0.45rem 0.85rem", fontSize: "0.75rem", width: "100%", textDecoration: "none" }}
            >
              View Pitch Deck <Play size={12} />
            </Link>
          </div>
        </aside>

        {/* Slide viewport */}
        <section className="deck-body">
          <div className="slide-viewport">
            
            {/* SLIDE 1: Cover & Vision */}
            {currentSlide === 1 && (
              <div style={{ position: "relative", zIndex: 1 }}>
                <div className="cover-visuals" />
                <div className="eyebrow-badge">
                  <Layers size={11} /> Enterprise sales deck
                </div>
                <h1 className="slide-title" style={{ fontSize: "clamp(2.5rem, 6vw, 3.75rem)", maxWidth: "850px" }}>
                  Hyper-Personalizing Global Beauty: The Climate & Hard Water API
                </h1>
                <p className="slide-subtitle" style={{ maxWidth: "700px" }}>
                  Transforming E-Commerce Intelligence, Slashing Returns, and Driving Conversions via Real-World Environmental Diagnostics & Custom Catalog Mapping.
                </p>
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  <button onClick={() => setCurrentSlide(2)} className="pitch-btn-primary">
                    Start Presentation <ArrowRight size={16} />
                  </button>
                  <Link href="/b2b/dashboard" className="pitch-btn-outline" style={{ textDecoration: "none" }}>
                    Developer API Portal <Code2 size={16} />
                  </Link>
                </div>
              </div>
            )}


            {/* SLIDE 2: The Problem */}
            {currentSlide === 2 && (
              <div>
                <div className="eyebrow-badge">
                  <ShieldAlert size={11} /> The Data-Driven Hook
                </div>
                <h2 className="slide-title">The Location-Blind Personalization Crisis</h2>
                <p className="slide-subtitle">
                  E-commerce personalization engines ask simple questions (e.g. "Oily vs Dry") but remain completely blind to where the skin actually lives.
                </p>

                <div className="problem-grid">
                  <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <div className="vs-card bad">
                      <h4 style={{ fontWeight: 700, fontSize: "0.95rem", color: "#f87171", marginBottom: "0.25rem" }}>
                        Static Quizzes Are Failing Customers
                      </h4>
                      <p style={{ fontSize: "0.85rem", color: "#94a3b8", lineHeight: 1.5 }}>
                        A shopper in London buys an oily-skin moisturizer. It breaks them out because London's hard tap water minerals react with their cleanser, leaving soap scum that clogs pores. The quiz never saw the water.
                      </p>
                    </div>

                    <div className="vs-card good">
                      <h4 style={{ fontWeight: 700, fontSize: "0.95rem", color: "#34d399", marginBottom: "0.25rem" }}>
                        The Environmental Telemetry Upgrade
                      </h4>
                      <p style={{ fontSize: "0.85rem", color: "#94a3b8", lineHeight: 1.5 }}>
                        By capturing delivery zip codes, the Climate & Hard Water API immediately adapts catalog logic to mineral density, humidity, and dew point variables.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <div className="metric-banner">
                      <div className="metric-large">70%</div>
                      <h5 style={{ fontWeight: 700, fontSize: "0.9rem", marginBottom: "0.25rem" }}>Skincare Routines Fail</h5>
                      <p style={{ fontSize: "0.75rem", color: "#94a3b8", margin: 0 }}>
                        Due to unaccounted external friction like calcium carbonates in tap water and sudden weather swings.
                      </p>
                    </div>

                    <div className="metric-banner">
                      <div className="metric-large">22%</div>
                      <h5 style={{ fontWeight: 700, fontSize: "0.9rem", marginBottom: "0.25rem" }}>Average E-Commerce Return Rate</h5>
                      <p style={{ fontSize: "0.75rem", color: "#94a3b8", margin: 0 }}>
                        Driven directly by "unexpected skin breakouts" and poor formulation texture fits.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SLIDE 3: The Solution / Hotspot Demo */}
            {currentSlide === 3 && (
              <div>
                <div className="eyebrow-badge">
                  <MapPin size={11} /> Interactive Hotspot Demo
                </div>
                <h2 className="slide-title">How the Engine Works</h2>
                <p className="slide-subtitle">
                  We match the shopper's location to environmental matrices. Test a city below to inspect real-time mineral analysis and catalog adaptation output.
                </p>

                <div className="hotspot-container">
                  <div className="map-selector-box">
                    <span style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#94a3b8", display: "block", marginBottom: "1rem" }}>
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
                      <div>
                        <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff" }}>
                          Water Profile: {activeCityData.type}
                        </h3>
                        <p style={{ fontSize: "0.8rem", color: "#94a3b8", margin: 0 }}>
                          Calcium: {activeCityData.minerals.calcium} mg/L | Magnesium: {activeCityData.minerals.magnesium} mg/L | Humidity: {activeCityData.humidity}%
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 style={{ fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#fc2779", marginBottom: "0.25rem" }}>
                        Skin Barrier Friction
                      </h4>
                      <p style={{ fontSize: "0.85rem", color: "#e2e8f0", lineHeight: 1.5 }}>
                        {activeCityData.friction}
                      </p>
                    </div>

                    <div>
                      <h4 style={{ fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#34d399", marginBottom: "0.25rem" }}>
                        API Recommendation Output
                      </h4>
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "0.5rem" }}>
                        {activeCityData.recommendedSku.map((sku, idx) => (
                          <div key={idx} style={{ background: "rgba(255,255,255,0.02)", padding: "0.75rem", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.04)" }}>
                            <span style={{ fontSize: "0.6rem", fontWeight: 700, color: "#fc2779", textTransform: "uppercase" }}>{sku.category}</span>
                            <div style={{ fontWeight: 600, fontSize: "0.85rem", color: "#fff", margin: "0.1rem 0" }}>{sku.name}</div>
                            <p style={{ fontSize: "0.75rem", color: "#94a3b8", margin: 0 }}>{sku.reason}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Agents Promotion */}
                <div style={{ marginTop: "2rem", padding: "1.5rem", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
                    <Sparkles size={16} color="#34d399" />
                    <span style={{ fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#34d399" }}>
                      🎁 Included FREE With All Tiers: Mirha AI Skincare Agents
                    </span>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
                    <div style={{ background: "rgba(255,255,255,0.01)", padding: "1rem", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.04)" }}>
                      <span style={{ fontWeight: 600, fontSize: "0.85rem", color: "#fff", display: "block", marginBottom: "0.25rem" }}>📋 Catalog Audit Agent</span>
                      <p style={{ margin: 0, fontSize: "0.75rem", color: "#94a3b8", lineHeight: 1.4 }}>
                        Automatically scans your product ingredients, scores your catalog health, and tags items for climate suitability.
                      </p>
                    </div>
                    <div style={{ background: "rgba(255,255,255,0.01)", padding: "1rem", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.04)" }}>
                      <span style={{ fontWeight: 600, fontSize: "0.85rem", color: "#fff", display: "block", marginBottom: "0.25rem" }}>🚨 Weather Guard Agent</span>
                      <p style={{ margin: 0, fontSize: "0.75rem", color: "#94a3b8", lineHeight: 1.4 }}>
                        Monitors weather shifts dynamically to output warnings and product recommendations based on real-time alerts.
                      </p>
                    </div>
                    <div style={{ background: "rgba(255,255,255,0.01)", padding: "1rem", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.04)" }}>
                      <span style={{ fontWeight: 600, fontSize: "0.85rem", color: "#fff", display: "block", marginBottom: "0.25rem" }}>💬 AI Concierge Agent</span>
                      <p style={{ margin: 0, fontSize: "0.75rem", color: "#94a3b8", lineHeight: 1.4 }}>
                        Audits customers' current routines, highlights active ingredient layering conflicts, and structures optimized AM/PM regimens.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SLIDE 4: ROI Calculator */}
            {currentSlide === 4 && (
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
                      <div style={{ background: "rgba(255,255,255,0.02)", padding: "0.75rem", borderRadius: "8px" }}>
                        <span style={{ fontSize: "0.7rem", color: "#94a3b8" }}>AOV Improvement</span>
                        <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#34d399" }}>+18%</div>
                      </div>
                      <div style={{ background: "rgba(255,255,255,0.02)", padding: "0.75rem", borderRadius: "8px" }}>
                        <span style={{ fontSize: "0.7rem", color: "#94a3b8" }}>Return Reduction</span>
                        <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#34d399" }}>-34%</div>
                      </div>
                    </div>
                  </div>

                  <div className="roi-result-card">
                    <div>
                      <span style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#94a3b8" }}>
                        Estimated Annual Value Created
                      </span>
                      <div className="annual-value">
                        ${Math.round(totalAnnualImpact).toLocaleString()}
                      </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", textAlign: "left" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "0.5rem" }}>
                        <span style={{ color: "#94a3b8" }}>Monthly AOV Lift (Bundles):</span>
                        <span style={{ fontWeight: 600, color: "#fff" }}>+${Math.round(aovLiftRevenue).toLocaleString()}/mo</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "0.5rem" }}>
                        <span style={{ color: "#94a3b8" }}>Reduced Return Logistics Savings:</span>
                        <span style={{ fontWeight: 600, color: "#fff" }}>+${Math.round(returnSavingsUSD).toLocaleString()}/mo</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem" }}>
                        <span style={{ color: "#94a3b8" }}>Customer Retention Multiplier:</span>
                        <span style={{ fontWeight: 600, color: "#fc2779" }}>2.4x</span>
                      </div>
                    </div>

                    <div style={{ marginTop: "1rem" }}>
                      <button onClick={() => setCurrentSlide(6)} className="pitch-btn-primary" style={{ width: "100%" }}>
                        Book Enterprise Pilot
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SLIDE 5: Technical Scale & Interactive API Sandbox */}
            {currentSlide === 5 && (
              <div>
                <div className="eyebrow-badge">
                  <Cpu size={11} /> Enterprise Developer Hub
                </div>
                <h2 className="slide-title">Interactive API Playground</h2>
                <p className="slide-subtitle">
                  Test live requests against our production edge recommendation engine with real parameters.
                </p>

                <B2BApiSandbox defaultApiKey="b2b_trial_key" />
              </div>
            )}

            {/* SLIDE 6: Pricing Tiers & CTA */}
            {currentSlide === 6 && (
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
                  <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", background: "rgba(255,255,255,0.05)", padding: "4px", borderRadius: "8px" }}>
                    <button 
                      onClick={() => setIsInternational(true)}
                      style={{ padding: "0.35rem 1rem", fontSize: "0.75rem", borderRadius: "6px", background: isInternational ? "rgba(252,39,121,0.2)" : "transparent", color: isInternational ? "#fff" : "#94a3b8", transition: "all 0.2s" }}
                    >
                      Global ($)
                    </button>
                    <button 
                      onClick={() => setIsInternational(false)}
                      style={{ padding: "0.35rem 1rem", fontSize: "0.75rem", borderRadius: "6px", background: !isInternational ? "rgba(252,39,121,0.2)" : "transparent", color: !isInternational ? "#fff" : "#94a3b8", transition: "all 0.2s" }}
                    >
                      India (₹)
                    </button>
                  </div>

                  <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem" }}>
                    <button 
                      onClick={() => setAnnualBilling(false)}
                      className="pitch-btn-outline" 
                      style={{ padding: "0.35rem 1rem", fontSize: "0.75rem", background: !annualBilling ? "rgba(252,39,121,0.08)" : "transparent", borderColor: !annualBilling ? "#fc2779" : "rgba(255,255,255,0.15)" }}
                    >
                      Monthly Billing
                    </button>
                    <button 
                      onClick={() => setAnnualBilling(true)}
                      className="pitch-btn-outline" 
                      style={{ padding: "0.35rem 1rem", fontSize: "0.75rem", background: annualBilling ? "rgba(252,39,121,0.08)" : "transparent", borderColor: annualBilling ? "#fc2779" : "rgba(255,255,255,0.15)" }}
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
                        <h4 style={{ fontWeight: 700, color: "#fff", marginBottom: "0.1rem", fontSize: "0.95rem" }}>Details saved — pick a plan below</h4>
                        <p style={{ fontSize: "0.78rem", color: "#94a3b8", margin: 0 }}>Your API key will be emailed to <strong style={{ color: "#fff" }}>{leadEmail}</strong> after checkout.</p>
                      </div>
                    </div>
                  ) : (
                    <div className="lead-form-box" style={{ border: "1px solid rgba(252,39,121,0.3)", background: "rgba(252,39,121,0.04)" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.6rem" }}>
                        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#fc2779", flexShrink: 0 }} />
                        <h4 style={{ fontWeight: 700, fontSize: "0.9rem", color: "#fff", margin: 0 }}>
                          Step 1 — Enter your details to unlock checkout
                        </h4>
                      </div>
                      <p style={{ fontSize: "0.75rem", color: "#94a3b8", margin: "0 0 0.85rem" }}>Your API key will be sent to this email instantly after payment.</p>
                      {checkoutError && (
                        <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", padding: "0.75rem", borderRadius: "6px", color: "#ef4444", fontSize: "0.8rem", marginBottom: "0.85rem" }}>
                          {checkoutError}
                        </div>
                      )}
                      <form onSubmit={handleLeadSubmit} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", gap: "0.75rem", alignItems: "center" }}>
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
                        <p style={{ fontSize: "0.75rem", color: "#94a3b8", marginTop: "0.25rem" }}>
                          For scaling niche retailers.
                        </p>
                        <div style={{ margin: "1.5rem 0" }}>
                          <span style={{ fontSize: "2.25rem", fontWeight: 800, color: "#fff" }}>
                            {isInternational ? "$" : "₹"}
                            {isInternational ? (annualBilling ? "399" : "499") : (annualBilling ? "33,200" : "41,500")}
                          </span>
                          <span style={{ fontSize: "0.85rem", color: "#94a3b8" }}>/mo</span>
                        </div>
                        <ul style={{ listStyle: "none", padding: 0, fontSize: "0.8rem", color: "#94a3b8", display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1.5rem" }}>
                          <li>✓ Up to 150k API calls/mo</li>
                          <li>✓ Hard Water Matrix (ppm)</li>
                          <li>✓ Climate + Humidity Swaps</li>
                          <li><strong style={{ color: "#34d399" }}>✓ FREE AI Skincare Agents (Catalog, Weather, Concierge)</strong></li>
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
                        <p style={{ fontSize: "0.75rem", color: "#94a3b8", marginTop: "0.25rem" }}>
                          For global beauty marketplaces.
                        </p>
                        <div style={{ margin: "1.5rem 0" }}>
                          <span style={{ fontSize: "2.25rem", fontWeight: 800, color: "#fff" }}>
                            {isInternational ? "$" : "₹"}
                            {isInternational ? (annualBilling ? "1,499" : "1,899") : (annualBilling ? "1,24,000" : "1,58,000")}
                          </span>
                          <span style={{ fontSize: "0.85rem", color: "#94a3b8" }}>/mo</span>
                        </div>
                        <ul style={{ listStyle: "none", padding: 0, fontSize: "0.8rem", color: "#94a3b8", display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1.5rem" }}>
                          <li>✓ Up to 1M API calls/mo</li>
                          <li>✓ Advanced Water Mineral Matrix</li>
                          <li>✓ Dynamic Dewpoint Adjusters</li>
                          <li><strong style={{ color: "#34d399" }}>✓ FREE AI Skincare Agents (Catalog, Weather, Concierge)</strong></li>
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

                  <div className="tier-card" style={{ background: "rgba(255,255,255,0.01)" }}>
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
                      <div>
                        <h3 style={{ fontSize: "1.1rem", fontWeight: 700, margin: 0 }}>Global Custom</h3>
                        <p style={{ fontSize: "0.75rem", color: "#94a3b8", marginTop: "0.25rem" }}>
                          High volume, tailored SLA integrations.
                        </p>
                        <div style={{ margin: "1.5rem 0" }}>
                          <span style={{ fontSize: "1.75rem", fontWeight: 800, color: "#fff" }}>Volume Pricing</span>
                        </div>
                        <ul style={{ listStyle: "none", padding: 0, fontSize: "0.8rem", color: "#94a3b8", display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1rem" }}>
                          <li>✓ 1M+ custom API calls/mo</li>
                          <li>✓ Tailored formulation parameters</li>
                          <li><strong style={{ color: "#34d399" }}>✓ FREE AI Skincare Agents (Catalog, Weather, Concierge)</strong></li>
                          <li>✓ Dedicated multi-region edge node</li>
                          <li>✓ 99.9% uptime SLA guarantee</li>
                        </ul>
                      </div>
                      <Link href="/contact" className="pitch-btn-outline" style={{ width: "100%", justifyContent: "center", textAlign: "center" }}>
                        Contact Sales
                      </Link>
                    </div>
                  </div>
                </div>

                <p style={{ textAlign: "center", fontSize: "0.8rem", color: "#94a3b8", marginTop: "1.5rem" }}>
                  * Overage volume billed dynamically at $0.008 per additional request on Growth, and $0.003 on Scale Enterprise.
                </p>

                {/* Provisioning Info Box */}
                <div style={{ marginTop: "2rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", padding: "1.5rem" }}>
                  <h4 style={{ fontWeight: 600, color: "#fff", fontSize: "0.95rem", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981" }} />
                    Instant API Provisioning
                  </h4>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1.5rem" }}>
                    <div>
                      <span style={{ display: "block", color: "#fc2779", fontWeight: 700, marginBottom: "0.25rem", fontSize: "0.85rem" }}>1. Checkout</span>
                      <p style={{ margin: 0, fontSize: "0.75rem", color: "#94a3b8", lineHeight: 1.5 }}>
                        Select your tier and complete the secure payment via our enterprise Merchant of Record.
                      </p>
                    </div>
                    <div>
                      <span style={{ display: "block", color: "#fc2779", fontWeight: 700, marginBottom: "0.25rem", fontSize: "0.85rem" }}>2. Key Generation</span>
                      <p style={{ margin: 0, fontSize: "0.75rem", color: "#94a3b8", lineHeight: 1.5 }}>
                        Our system automatically generates your unique <code style={{ color: "#38bdf8" }}>b2b_live_xxx</code> API key with your selected usage quota.
                      </p>
                    </div>
                    <div>
                      <span style={{ display: "block", color: "#fc2779", fontWeight: 700, marginBottom: "0.25rem", fontSize: "0.85rem" }}>3. Instant Delivery</span>
                      <p style={{ margin: 0, fontSize: "0.75rem", color: "#94a3b8", lineHeight: 1.5 }}>
                        Your API key and developer documentation are emailed to you instantly. Start integrating within 60 seconds.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            )}

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
          <span style={{ fontSize: "0.75rem", color: "#94a3b8", fontFamily: "monospace" }}>
            Slide {currentSlide} of {totalSlides}
          </span>
          <div className="progress-container">
            <div 
              className="progress-bar" 
              style={{ width: `${(currentSlide / totalSlides) * 100}%` }}
            />
          </div>
        </div>

        <div>
          <span style={{ fontSize: "0.75rem", color: "#fc2779", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Climate &amp; Hard Water API
          </span>
        </div>
      </footer>
    </main>
  );
}
