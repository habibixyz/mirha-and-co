"use client";


import { motion } from "framer-motion";
import { Check, Loader2, Star } from "lucide-react";
import { useState } from "react";
import Script from "next/script";

export function SubscriptionClient({ isPro }: { isPro: boolean }) {

  const [activePendingType, setActivePendingType] = useState<"monthly" | "yearly" | null>(null);

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
          color: "#c8473a",
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
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      <motion.div initial="hidden" animate="show" variants={containerVariants}>
        <motion.header variants={itemVariants} style={{ marginBottom: "3rem", maxWidth: "600px" }}>
          <h1 style={{
            fontFamily: "var(--dash-font-serif)",
            fontSize: "2.8rem",
            fontWeight: 400,
            margin: "0 0 0.5rem",
            color: "var(--dash-ink)",
            lineHeight: 1.1
          }}>
            Subscription
          </h1>
          <p style={{ color: "var(--dash-muted)", margin: 0, fontSize: "1.05rem", lineHeight: 1.6 }}>
            Manage your Mirha & Co. plan. Upgrade to unlock premium features and AI insights.
          </p>
        </motion.header>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: "2rem", maxWidth: "1140px" }}>

          {/* Free Plan */}
          <motion.div variants={itemVariants} style={{
            background: 'var(--white)',
            border: "1px solid var(--dash-border)",
            borderRadius: "24px",
            padding: "2.5rem 2rem",
            display: "flex",
            flexDirection: "column",
            position: "relative"
          }}>
            {!isPro && (
              <div style={{ position: "absolute", top: "1rem", right: "1rem" }}>
                <span style={{
                  background: "var(--dash-bg)",
                  color: "var(--dash-ink)",
                  padding: "0.4rem 0.8rem",
                  borderRadius: "8px",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em"
                }}>
                  Current
                </span>
              </div>
            )}

            <h3 style={{ fontSize: "1.5rem", margin: "0 0 0.5rem", color: "var(--dash-ink)", fontWeight: 500 }}>Free Tier</h3>
            <div style={{ display: "flex", alignItems: "baseline", gap: "0.2rem", marginBottom: "2rem" }}>
              <span style={{ fontSize: "2.5rem", fontWeight: 700, fontFamily: "'Bebas Neue', sans-serif" }}>₹0</span>
              <span style={{ color: "var(--dash-muted)", fontSize: "0.9rem" }}>/month</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2.5rem", flex: 1 }}>
              <div style={{ display: "flex", gap: "0.8rem", color: "var(--dash-muted)", fontSize: "0.95rem" }}>
                <Check size={18} color="var(--dash-ink)" /> Up to 2 Routines
              </div>
              <div style={{ display: "flex", gap: "0.8rem", color: "var(--dash-muted)", fontSize: "0.95rem" }}>
                <Check size={18} color="var(--dash-ink)" /> Basic Skin Journal
              </div>
              <div style={{ display: "flex", gap: "0.8rem", color: "var(--dash-muted)", fontSize: "0.95rem" }}>
                <Check size={18} color="var(--dash-ink)" /> Product Database Access
              </div>
            </div>

            <button style={{
              background: 'rgba(0,0,0,0.05)',
              color: "var(--dash-ink)",
              border: "none",
              borderRadius: "12px",
              padding: "1rem",
              fontSize: "0.95rem",
              cursor: "not-allowed",
              fontWeight: 500,
              width: "100%"
            }} disabled>
              {!isPro ? "Active Plan" : "Free Tier"}
            </button>
          </motion.div>

          {/* Pro Monthly Plan */}
          <motion.div variants={itemVariants} style={{
            background: 'var(--white)',
            border: "1px solid var(--dash-border)",
            borderRadius: "24px",
            padding: "2.5rem 2rem",
            display: "flex",
            flexDirection: "column",
            position: "relative"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "0.5rem" }}>
              <h3 style={{ fontSize: "1.5rem", margin: 0, fontWeight: 500, color: "var(--dash-ink)" }}>Pro Monthly</h3>
              <Star size={18} color="var(--dash-accent)" />
            </div>

            <div style={{ display: "flex", alignItems: "baseline", gap: "0.2rem", marginBottom: "2rem" }}>
              <span style={{ fontSize: "2.5rem", fontWeight: 700, fontFamily: "'Bebas Neue', sans-serif", color: "var(--dash-ink)" }}>₹199</span>
              <span style={{ color: "var(--dash-muted)", fontSize: "0.9rem" }}>/month</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2.5rem", flex: 1 }}>
              <div style={{ display: "flex", gap: "0.8rem", color: "var(--dash-muted)", fontSize: "0.95rem" }}>
                <Check size={18} color="var(--dash-accent)" /> Unlimited Routines & Logs
              </div>
              <div style={{ display: "flex", gap: "0.8rem", color: "var(--dash-muted)", fontSize: "0.95rem" }}>
                <Check size={18} color="var(--dash-accent)" /> Cross-product Conflict Checker
              </div>
              <div style={{ display: "flex", gap: "0.8rem", color: "var(--dash-muted)", fontSize: "0.95rem" }}>
                <Check size={18} color="var(--dash-accent)" /> AI Face Scan — Barrier, Acne & Redness Scores
              </div>
              <div style={{ display: "flex", gap: "0.8rem", color: "var(--dash-muted)", fontSize: "0.95rem" }}>
                <Check size={18} color="var(--dash-accent)" /> Journal Photo Uploads & AI Photo Analysis
              </div>
              <div style={{ display: "flex", gap: "0.8rem", color: "var(--dash-muted)", fontSize: "0.95rem" }}>
                <Check size={18} color="var(--dash-accent)" /> Mirha Brain Mode — 20 AI Searches/Day
              </div>
            </div>

            <motion.button
              onClick={() => handleUpgrade("monthly")}
              disabled={isPro || activePendingType !== null}
              whileHover={!isPro ? { scale: 1.02 } : {}}
              whileTap={!isPro ? { scale: 0.98 } : {}}
              style={{
                background: isPro ? "rgba(0,0,0,0.05)" : "var(--dash-ink)",
                color: isPro ? "var(--dash-muted)" : "white",
                border: "none",
                borderRadius: "12px",
                padding: "1rem",
                fontSize: "0.95rem",
                cursor: isPro ? "not-allowed" : "pointer",
                fontWeight: 600,
                width: "100%",
                boxShadow: isPro ? "none" : "0 8px 20px rgba(0,0,0,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem"
              }}
            >
              {activePendingType === "monthly" ? (
                <Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} />
              ) : (
                isPro ? "Active Plan" : "Upgrade to Monthly"
              )}
            </motion.button>
          </motion.div>

          {/* Pro Annual Plan */}
          <motion.div variants={itemVariants} style={{
            background: 'var(--dash-ink)',
            color: "var(--white)",
            border: "none",
            borderRadius: "24px",
            padding: "2.5rem 2rem",
            display: "flex",
            flexDirection: "column",
            boxShadow: '0 20px 50px rgba(28, 25, 23, 0.25)',
            position: "relative",
            overflow: "hidden"
          }}>
            {/* Decorative blur */}
            <div style={{
              position: "absolute",
              top: "-50%",
              right: "-20%",
              width: "300px",
              height: "300px",
              background: "radial-gradient(circle, rgba(200,71,58,0.2) 0%, rgba(0,0,0,0) 70%)",
              filter: "blur(40px)",
              pointerEvents: "none"
            }} />

            <div style={{ position: "absolute", top: "1rem", right: "1rem", zIndex: 10 }}>
              <span style={{
                background: "var(--dash-accent)",
                color: "white",
                padding: "0.4rem 0.8rem",
                borderRadius: "8px",
                fontSize: "0.75rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em"
              }}>
                Save 37%
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "0.5rem", position: "relative" }}>
              <h3 style={{ fontSize: "1.5rem", margin: 0, fontWeight: 500 }}>Pro Annual</h3>
              <Star size={18} color="var(--dash-accent)" />
            </div>

            <div style={{ display: "flex", alignItems: "baseline", gap: "0.2rem", marginBottom: "2rem", position: "relative" }}>
              <span style={{ fontSize: "2.5rem", fontWeight: 700, fontFamily: "'Bebas Neue', sans-serif" }}>₹1,499</span>
              <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem" }}>/year</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2.5rem", flex: 1, position: "relative" }}>
              <div style={{ display: "flex", gap: "0.8rem", color: "rgba(255,255,255,0.8)", fontSize: "0.95rem" }}>
                <Check size={18} color="var(--dash-accent)" /> Everything in Pro Monthly
              </div>
              <div style={{ display: "flex", gap: "0.8rem", color: "rgba(255,255,255,0.8)", fontSize: "0.95rem" }}>
                <Check size={18} color="var(--dash-accent)" /> 2 Months Free Equivalent
              </div>
              <div style={{ display: "flex", gap: "0.8rem", color: "rgba(255,255,255,0.8)", fontSize: "0.95rem" }}>
                <Check size={18} color="var(--dash-accent)" /> Shareable Routine Card Links
              </div>
              <div style={{ display: "flex", gap: "0.8rem", color: "rgba(255,255,255,0.8)", fontSize: "0.95rem" }}>
                <Check size={18} color="var(--dash-accent)" /> Priority Support via Email
              </div>
            </div>

            <motion.button
              onClick={() => handleUpgrade("yearly")}
              disabled={isPro || activePendingType !== null}
              whileHover={!isPro ? { scale: 1.02 } : {}}
              whileTap={!isPro ? { scale: 0.98 } : {}}
              style={{
                background: isPro ? "rgba(255,255,255,0.1)" : "var(--dash-accent)",
                color: isPro ? "rgba(255,255,255,0.5)" : "var(--white)",
                border: "none",
                borderRadius: "12px",
                padding: "1rem",
                fontSize: "0.95rem",
                cursor: isPro ? "not-allowed" : "pointer",
                fontWeight: 600,
                width: "100%",
                boxShadow: isPro ? "none" : "0 8px 20px rgba(200, 71, 58, 0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                position: "relative"
              }}
            >
              {activePendingType === "yearly" ? (
                <Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} />
              ) : (
                isPro ? "Active Plan" : "Upgrade to Annual"
              )}
            </motion.button>
          </motion.div>

        </div>
      </motion.div>
      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </>
  );
}
