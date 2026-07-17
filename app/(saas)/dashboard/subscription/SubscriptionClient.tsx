"use client";

import { motion } from "framer-motion";
import { Check, Loader2, Star, ShieldCheck, Zap } from "lucide-react";
import { useState } from "react";
import Script from "next/script";

interface SubscriptionClientProps {
  isPro: boolean;
  subscriptionId?: string | null;
  provider?: "dodo" | "razorpay" | null;
  userId?: string;
}

export function SubscriptionClient({ 
  isPro, 
  subscriptionId, 
  provider, 
  userId 
}: SubscriptionClientProps) {
  const [activePendingType, setActivePendingType] = useState<"monthly" | "yearly" | null>(null);
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("yearly");
  const [paymentRegion, setPaymentRegion] = useState<"INR" | "USD">("INR");
  const [isPortalLoading, setIsPortalLoading] = useState(false);

  const handleManageBilling = async () => {
    if (provider !== "dodo") return;
    setIsPortalLoading(true);
    try {
      window.location.href = "https://customer.dodopayments.com/";
    } catch (error: any) {
      console.error("Portal redirect error:", error);
      alert(`Error loading billing portal: ${error.message || "Please contact support."}`);
    } finally {
      setIsPortalLoading(false);
    }
  };

  const handleDodoCheckout = async () => {
    setActivePendingType("monthly");
    try {
      const res = await fetch("/api/dodo/checkout", { method: "POST" });
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        throw new Error("No checkout URL returned from server");
      }
    } catch (error: any) {
      console.error("Dodo Payments checkout error:", error);
      alert(`Checkout Error: ${error.message || "Failed to initialize"}`);
    } finally {
      setActivePendingType(null);
    }
  };

 const loadRazorpayScript = () => {
 return new Promise((resolve) => {
 if ((window as any).Razorpay) return resolve(true);
 const script = document.createElement("script");
 script.src = "https://checkout.razorpay.com/v1/checkout.js";
 script.onload = () => resolve(true);
 script.onerror = () => resolve(false);
 document.body.appendChild(script);
 });
 };

 const handleUpgrade = async (planType: "monthly" | "yearly") => {
 setActivePendingType(planType);
 try {
 const isLoaded = await loadRazorpayScript();
 if (!isLoaded) throw new Error("Failed to load Razorpay SDK");

 const res = await fetch("/api/razorpay/checkout", {
 method: "POST",
 headers: { "Content-Type": "application/json" },
 body: JSON.stringify({ planType })
 });
 const data = await res.json();

 if (data.error) throw new Error(data.error);

 const options = {
 key: data.keyId,
 subscription_id: data.subscriptionId,
 name: "Mirha & Co.",
 description: planType === "yearly" ? "Pro Yearly Subscription" : "Pro Monthly Subscription",
 handler: function (response: any) {
 alert("Payment successful! Welcome to Pro.");
 window.location.reload();
 },
 theme: {
 color: "#fc2779",
 },
 };

 const rzp = new (window as any).Razorpay(options);
 rzp.on("payment.failed", function (response: any) {
 alert("Payment failed. Please try again.");
 });
 rzp.open();
 } catch (error: any) {
 console.error("Razorpay Error:", error);
 alert(`Checkout Error: ${error.message || "Failed to initialize"}`);
 } finally {
 setActivePendingType(null);
 }
 };

 const containerVariants = {
 hidden: { opacity: 0 },
 show: {
 opacity: 1,
 transition: { staggerChildren: 0.08 }
 }
 };

 const itemVariants = {
 hidden: { opacity: 0, y: 16 },
 show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 26 } }
 };

 return (
 <>
 <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
 <motion.div initial="hidden" animate="show" variants={containerVariants} className="subscription-container">
 <style>{`
 .subscription-container {
 max-width: 960px;
 margin: 0 auto;
 }
 
 .sub-header {
 text-align: center;
 margin-bottom: 2.25rem;
 }

 .premium-badge {
 display: inline-flex;
 align-items: center;
 justify-content: center;
 gap: 0.4rem;
 background: var(--dash-accent-soft);
 color: var(--dash-accent);
 padding: 0.45rem 0.9rem;
 border-radius: 99px;
 font-size: 0.72rem;
 font-weight: 700;
 text-transform: uppercase;
 letter-spacing: 0.15em;
 margin-bottom: 1rem;
 border: 1px solid rgba(252, 39, 121, 0.15);
 line-height: 1;
 }

 .premium-badge svg {
 display: block;
 flex-shrink: 0;
 transform: translateY(-0.5px);
 }

 .sub-title {
 font-family: var(--dash-font-serif);
 font-size: clamp(2.2rem, 4.5vw, 2.8rem);
 font-weight: 400;
 color: var(--dash-ink);
 line-height: 1.1;
 margin-bottom: 0.5rem;
 }

 .sub-subtitle {
 color: var(--dash-muted);
 font-size: 0.98rem;
 max-width: 520px;
 margin: 0 auto 1.5rem;
 line-height: 1.5;
 }

 /* --- BILLING TOGGLE --- */
 .toggle-wrapper {
 display: inline-flex;
 background: rgba(0, 0, 0, 0.04);
 padding: 4px;
 border-radius: 99px;
 margin-top: 0.5rem;
 margin-bottom: 1.5rem;
 position: relative;
 border: 1px solid rgba(0, 0, 0, 0.02);
 --btn-width: 88px;
 }

 .toggle-btn {
 background: transparent;
 border: none;
 color: var(--dash-muted);
 padding: 0.6rem 0;
 width: var(--btn-width);
 text-align: center;
 font-size: 0.85rem;
 font-weight: 600;
 border-radius: 99px;
 cursor: pointer;
 position: relative;
 z-index: 2;
 transition: color 0.2s ease;
 }

 .toggle-btn.active {
 color: var(--dash-ink);
 }

 .toggle-bg {
 position: absolute;
 top: 4px;
 bottom: 4px;
 left: 4px;
 width: var(--btn-width);
 background: var(--dash-surface);
 border-radius: 99px;
 box-shadow: 0 4px 10px rgba(0,0,0,0.06);
 transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
 z-index: 1;
 }

 .discount-pill {
 position: absolute;
 top: -14px;
 right: -10px;
 background: var(--dash-accent);
 color: white;
 font-size: 0.62rem;
 font-weight: 800;
 padding: 2px 8px;
 border-radius: 99px;
 letter-spacing: 0.05em;
 box-shadow: 0 4px 10px rgba(252, 39, 121, 0.25);
 white-space: nowrap;
 }

 /* --- CARDS GRID --- */
 .pricing-grid-container {
 display: grid;
 grid-template-columns: repeat(2, 1fr);
 gap: 1.75rem;
 margin-top: 0.5rem;
 }

 .plan-card {
 background: var(--dash-surface);
 border: 1px solid var(--dash-border);
 border-radius: 28px;
 padding: 2.25rem 2.25rem;
 display: flex;
 flex-direction: column;
 position: relative;
 transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
 box-shadow: 0 10px 30px -10px rgba(26,23,20,0.04);
 }

 .plan-card.highlighted {
 background: var(--dash-ink);
 color: var(--dash-surface);
 border: none;
 box-shadow: 0 25px 60px -15px rgba(26,23,20,0.22);
 }

 .card-header-label {
 font-size: 0.65rem;
 letter-spacing: 0.15em;
 text-transform: uppercase;
 font-weight: 700;
 color: var(--dash-muted);
 margin-bottom: 0.5rem;
 }

 .plan-card.highlighted .card-header-label {
 color: rgba(255,255,255,0.45);
 }

 .plan-name {
 font-size: 1.8rem;
 font-family: var(--dash-font-serif);
 font-weight: 400;
 margin: 0 0 1.5rem;
 display: flex;
 align-items: center;
 gap: 0.6rem;
 }

 .price-block {
 display: flex;
 align-items: baseline;
 gap: 0.3rem;
 margin-bottom: 1.5rem;
 border-bottom: 1px solid var(--dash-border);
 padding-bottom: 1.5rem;
 }

 .plan-card.highlighted .price-block {
 border-bottom: 1px solid rgba(255,255,255,0.08);
 }

 .price-number {
 font-size: 3.5rem;
 font-weight: 400;
 font-family: var(--font-bebas), sans-serif;
 line-height: 1;
 letter-spacing: -0.01em;
 }

 .price-period {
 color: var(--dash-muted);
 font-size: 0.95rem;
 }

 .plan-card.highlighted .price-period {
 color: rgba(255,255,255,0.55);
 }

 .feature-list {
 display: flex;
 flex-direction: column;
 gap: 0.9rem;
 margin-bottom: 2rem;
 flex-grow: 1;
 }

 .feature-item {
 display: flex;
 align-items: flex-start;
 gap: 0.8rem;
 font-size: 0.95rem;
 line-height: 1.4;
 color: #4A4540;
 }

 .plan-card.highlighted .feature-item {
 color: rgba(255,255,255,0.85);
 }

 .icon-wrap {
 display: inline-flex;
 align-items: center;
 justify-content: center;
 width: 20px;
 height: 20px;
 border-radius: 50%;
 background: var(--dash-accent-soft);
 color: var(--dash-accent);
 flex-shrink: 0;
 margin-top: 1px;
 }

 .plan-card.highlighted .icon-wrap {
 background: rgba(252, 39, 121, 0.18);
 color: var(--dash-accent);
 }

 /* --- BUTTONS --- */
 .action-btn {
 width: 100%;
 border: none;
 border-radius: 16px;
 padding: 1.1rem;
 font-size: 0.95rem;
 font-weight: 600;
 cursor: pointer;
 display: flex;
 align-items: center;
 justify-content: center;
 gap: 0.6rem;
 transition: all 0.2s ease;
 }

 .btn-secondary {
 background: rgba(0,0,0,0.04);
 color: var(--dash-ink);
 }

 .btn-secondary:hover {
 background: rgba(0,0,0,0.07);
 }

 .btn-primary {
 background: var(--dash-accent);
 color: white;
 box-shadow: 0 8px 25px rgba(252, 39, 121, 0.25);
 }

 .btn-primary:hover {
 background: #b5382b;
 box-shadow: 0 10px 30px rgba(252, 39, 121, 0.35);
 }

 .btn-active {
 background: transparent;
 color: var(--dash-muted);
 border: 1px dashed var(--dash-border);
 cursor: default;
 }

 .plan-card.highlighted .btn-active {
 border: 1px dashed rgba(255,255,255,0.15);
 color: rgba(255,255,255,0.45);
 }

 /* Glow effect on hover */
 .plan-card:hover {
 transform: translateY(-4px);
 box-shadow: 0 20px 45px -10px rgba(26,23,20,0.08);
 }

 .plan-card.highlighted:hover {
 box-shadow: 0 30px 70px -15px rgba(26,23,20,0.35);
 }

 @media (max-width: 768px) {
 .pricing-grid-container {
 grid-template-columns: 1fr;
 gap: 1.75rem;
 }
 .plan-card {
 padding: 2.25rem 1.75rem;
 }
 }

 @media (max-width: 480px) {
 .sub-header {
 margin-bottom: 2rem;
 }
 .sub-title {
 font-size: 1.85rem;
 }
 .sub-subtitle {
 font-size: 0.9rem;
 margin-bottom: 1.5rem;
 }
 .toggle-wrapper {
 --btn-width: 74px;
 margin-top: 0.5rem;
 margin-bottom: 1.5rem;
 }
 .toggle-btn {
 font-size: 0.8rem;
 }
 .discount-pill {
 font-size: 0.55rem;
 top: -12px;
 right: -8px;
 padding: 1px 6px;
 }
 .plan-card {
 padding: 1.75rem 1.25rem;
 border-radius: 20px;
 }
 .plan-name {
 font-size: 1.4rem;
 margin-bottom: 1rem;
 }
 .price-block {
 margin-bottom: 1.5rem;
 padding-bottom: 1.5rem;
 }
 .price-number {
 font-size: 2.8rem;
 }
 .feature-list {
 gap: 0.9rem;
 margin-bottom: 2rem;
 }
 .feature-item {
 font-size: 0.88rem;
 }
 .action-btn {
 padding: 0.9rem;
 font-size: 0.9rem;
 border-radius: 12px;
 }
 }

 @keyframes spin { 100% { transform: rotate(360deg); } }

 html.dark .plan-card.highlighted,
 .dark .plan-card.highlighted {
 background: #251b22 !important;
 border: 1px solid rgba(252, 39, 121, 0.3) !important;
 color: #ffffff !important;
 }

 html.dark .plan-card.highlighted .card-header-label,
 .dark .plan-card.highlighted .card-header-label {
 color: #ff4d94 !important;
 }

 html.dark .plan-card.highlighted .price-period,
 .dark .plan-card.highlighted .price-period {
 color: rgba(255, 255, 255, 0.7) !important;
 }

 html.dark .plan-card.highlighted .feature-item,
 .dark .plan-card.highlighted .feature-item {
 color: rgba(255, 255, 255, 0.9) !important;
 }

 html.dark .toggle-wrapper,
 .dark .toggle-wrapper {
 background: rgba(255, 255, 255, 0.08) !important;
 border-color: rgba(255, 255, 255, 0.12) !important;
 }

 html.dark .toggle-bg,
 .dark .toggle-bg {
 background: #22201e !important;
 }

 html.dark .toggle-btn.active,
 .dark .toggle-btn.active {
 color: #ffffff !important;
 }

 html.dark .btn-secondary,
 .dark .btn-secondary {
 background: rgba(255, 255, 255, 0.08) !important;
 color: #ffffff !important;
 }

 html.dark .btn-active,
 .dark .btn-active {
 background: transparent !important;
 color: rgba(255, 255, 255, 0.6) !important;
 border-color: rgba(255, 255, 255, 0.2) !important;
 }
`}</style>

 <div className="sub-header">
 <motion.div variants={itemVariants} className="premium-badge">
 <Star size={13} fill="currentColor" />
 Mirha Membership
 </motion.div>
 <motion.h1 variants={itemVariants} className="sub-title">
 Skincare Intelligence
 </motion.h1>
 <motion.p variants={itemVariants} className="sub-subtitle">
 Upgrade your routine from guessing to diagnostic precision. Unlock professional AI tools and formulation analysis.
 </motion.p>

  {/* Region Selector */}
  <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginBottom: "1.5rem" }}>
    <button
      onClick={() => {
        setPaymentRegion("USD");
        setBillingPeriod("monthly");
      }}
      style={{
        padding: "0.4rem 0.8rem",
        borderRadius: "8px",
        border: "1px solid " + (paymentRegion === "USD" ? "var(--dash-ink)" : "var(--dash-border)"),
        background: paymentRegion === "USD" ? "var(--dash-ink)" : "transparent",
        color: paymentRegion === "USD" ? "var(--dash-surface)" : "var(--dash-ink)",
        cursor: "pointer",
        fontSize: "0.85rem",
        fontWeight: 600
      }}
    >
      Global (USD)
    </button>
    <button
      onClick={() => {
        setPaymentRegion("INR");
      }}
      style={{
        padding: "0.4rem 0.8rem",
        borderRadius: "8px",
        border: "1px solid " + (paymentRegion === "INR" ? "var(--dash-ink)" : "var(--dash-border)"),
        background: paymentRegion === "INR" ? "var(--dash-ink)" : "transparent",
        color: paymentRegion === "INR" ? "var(--dash-surface)" : "var(--dash-ink)",
        cursor: "pointer",
        fontSize: "0.85rem",
        fontWeight: 600
      }}
    >
      India (INR)
    </button>
  </div>

 {paymentRegion === "INR" && (
 <motion.div variants={itemVariants} className="toggle-wrapper">
 <button 
 className={`toggle-btn ${billingPeriod === "monthly" ? "active" : ""}`}
 onClick={() => setBillingPeriod("monthly")}
 >
 Monthly
 </button>
 <button 
 className={`toggle-btn ${billingPeriod === "yearly" ? "active" : ""}`}
 onClick={() => setBillingPeriod("yearly")}
 >
 Annual
 <span className="discount-pill">Save 37%</span>
 </button>
 <div 
 className="toggle-bg" 
 style={{
 transform: billingPeriod === "monthly" ? "translateX(0)" : "translateX(var(--btn-width))"
 }}
 />
 </motion.div>
 )}
  </div>

  <div className="pricing-grid-container">
 {/* FREE PLAN CARD */}
 <motion.div variants={itemVariants} className="plan-card">
 <span className="card-header-label">Basic Access</span>
 <h3 className="plan-name">Free Tier</h3>
 
 <div className="price-block">
 <span className="price-number">₹0</span>
 <span className="price-period">/ forever</span>
 </div>

 <div className="feature-list">
 <div className="feature-item">
 <span className="icon-wrap"><Check size={12} /></span>
 <span>Track up to 2 active skincare routines</span>
 </div>
 <div className="feature-item">
 <span className="icon-wrap"><Check size={12} /></span>
 <span>Basic digital skin journal & history</span>
 </div>
 <div className="feature-item">
 <span className="icon-wrap"><Check size={12} /></span>
 <span>Read-only access to skincare product database</span>
 </div>
 </div>

 <button className="action-btn btn-active" disabled>
 {!isPro ? "Current Active Plan" : "Included in Membership"}
 </button>
 </motion.div>

 {/* PRO PLAN CARD (DYNAMICS BASED ON TOGGLE) */}
 <motion.div variants={itemVariants} className="plan-card highlighted">
 <div style={{
 position: "absolute",
 top: "-50%",
 right: "-20%",
 width: "300px",
 height: "300px",
 background: "radial-gradient(circle, rgba(252, 39, 121,0.18) 0%, rgba(0,0,0,0) 70%)",
 filter: "blur(45px)",
 pointerEvents: "none"
 }} />

 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "relative", zIndex: 2 }}>
 <div>
 <span className="card-header-label" style={{ color: "var(--dash-accent)" }}>Recommended</span>
 <h3 className="plan-name">
 Mirha Pro
 <Star size={16} fill="var(--dash-accent)" color="var(--dash-accent)" />
 </h3>
 </div>
 </div>

 <div className="price-block" style={{ position: "relative", zIndex: 2 }}>
  <span className="price-number">
  {paymentRegion === "USD" ? "$10.99" : (billingPeriod === "monthly" ? "₹199" : "₹1,499")}
  </span>
  <span className="price-period">
  {paymentRegion === "USD" ? "/ month" : (billingPeriod === "monthly" ? "/ month" : "/ year (save 37%)")}
  </span>
  </div>

 <div className="feature-list" style={{ position: "relative", zIndex: 2 }}>
 <div className="feature-item">
 <span className="icon-wrap"><Check size={12} /></span>
 <span><strong>Unlimited</strong> routines, log entries & progress journals</span>
 </div>
 <div className="feature-item">
 <span className="icon-wrap"><Check size={12} /></span>
 <span><strong>Routine Conflict Checker</strong> - auto-detect active compound clashes</span>
 </div>
 <div className="feature-item">
 <span className="icon-wrap"><Check size={12} /></span>
 <span><strong>AI Skin Analyst</strong> - instant face scan with hydration & barrier scores</span>
 </div>
 <div className="feature-item">
 <span className="icon-wrap"><Check size={12} /></span>
 <span><strong>Advanced Search</strong> - 20 daily ingredient & profile lookups</span>
 </div>
 {(billingPeriod === "yearly" || paymentRegion === "USD") && (
 <>
 <div className="feature-item">
 <span className="icon-wrap"><Check size={12} /></span>
 <span><strong>Shareable Routines</strong> - generate web-links for your doctor/friends</span>
 </div>
 <div className="feature-item">
 <span className="icon-wrap"><Check size={12} /></span>
 <span><strong>Priority consult support</strong> - email access to our formulation desk</span>
 </div>
 </>
 )}
 </div>

 {isPro ? (
    provider === "razorpay" ? (
      <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <button className="action-btn btn-active" disabled>
          Active Plan (via Razorpay)
        </button>
        <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.55)", textAlign: "center" }}>
          To manage your subscription, please contact support.
        </p>
      </div>
    ) : (
      <button 
        onClick={handleManageBilling}
        disabled={isPortalLoading}
        className="action-btn btn-primary" 
        style={{ position: "relative", zIndex: 2 }}
      >
        {isPortalLoading ? (
          <Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} />
        ) : (
          "Manage Subscription"
        )}
      </button>
    )
 ) : ( <motion.button
  onClick={() => paymentRegion === "USD" ? handleDodoCheckout() : handleUpgrade(billingPeriod)}
  disabled={activePendingType !== null}
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  className="action-btn btn-primary"
  style={{ position: "relative", zIndex: 2 }}
  >
  {activePendingType !== null ? (
  <Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} />
  ) : (
  <>
  <Zap size={14} fill="currentColor" />
  {paymentRegion === "USD" ? "Upgrade for $10.99" : (billingPeriod === "monthly" ? "Upgrade for ₹199" : "Upgrade for ₹1,499")}
  </>
  )}
  </motion.button>
 )}
 </motion.div>
 </div>
 </motion.div>
 </>
 );
}
