"use client";


import { motion } from "framer-motion";
import { Check, Sparkles, Loader2 } from "lucide-react";
import { useState } from "react";
import Script from "next/script";

export function SubscriptionClient({ isPro }: { isPro: boolean }) {

  const [isPending, setIsPending] = useState(false);

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

  const handleUpgrade = async () => {
    setIsPending(true);
    try {
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) throw new Error("Failed to load Razorpay SDK");

      const res = await fetch("/api/razorpay/checkout", { method: "POST" });
      const data = await res.json();

      if (data.error) throw new Error(data.error);

      const options = {
        key: data.keyId,
        subscription_id: data.subscriptionId,
        name: "Mirha & Co.",
        description: "Pro Subscription",
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
      setIsPending(false);
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
            fontFamily: "'DM Serif Display', serif",
            fontSize: "2.8rem",
            fontWeight: 400,
            margin: "0 0 0.5rem",
            color: "var(--ink)",
            lineHeight: 1.1
          }}>
            Subscription
          </h1>
          <p style={{ color: "var(--muted)", margin: 0, fontSize: "1.05rem", lineHeight: 1.6 }}>
            Manage your Mirha & Co. plan. Upgrade to unlock premium features and AI insights.
          </p>
        </motion.header>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2rem", maxWidth: "900px" }}>

          {/* Free Plan */}
          <motion.div variants={itemVariants} style={{
            background: 'var(--white)',
            border: "1px solid var(--rule)",
            borderRadius: "16px",
            padding: "2.5rem 2rem",
            display: "flex",
            flexDirection: "column",
            position: "relative"
          }}>
            {!isPro && (
              <div style={{ position: "absolute", top: "1rem", right: "1rem" }}>
                <span style={{
                  background: "var(--sand)",
                  color: "var(--ink)",
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

            <h3 style={{ fontSize: "1.5rem", margin: "0 0 0.5rem", color: "var(--ink)", fontWeight: 500 }}>Free Tier</h3>
            <div style={{ display: "flex", alignItems: "baseline", gap: "0.2rem", marginBottom: "2rem" }}>
              <span style={{ fontSize: "2.5rem", fontWeight: 700, fontFamily: "'Bebas Neue', sans-serif" }}>$0</span>
              <span style={{ color: "var(--muted)", fontSize: "0.9rem" }}>/month</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2.5rem", flex: 1 }}>
              <div style={{ display: "flex", gap: "0.8rem", color: "var(--muted)", fontSize: "0.95rem" }}>
                <Check size={18} color="var(--ink)" /> Up to 2 Routines
              </div>
              <div style={{ display: "flex", gap: "0.8rem", color: "var(--muted)", fontSize: "0.95rem" }}>
                <Check size={18} color="var(--ink)" /> Basic Skin Journal
              </div>
              <div style={{ display: "flex", gap: "0.8rem", color: "var(--muted)", fontSize: "0.95rem" }}>
                <Check size={18} color="var(--ink)" /> Product Database Access
              </div>
            </div>

            <button style={{
              background: 'rgba(0,0,0,0.05)',
              color: "var(--ink)",
              border: "none",
              borderRadius: "10px",
              padding: "1rem",
              fontSize: "0.95rem",
              cursor: "not-allowed",
              fontWeight: 500,
              width: "100%"
            }} disabled>
              {!isPro ? "Active Plan" : "Downgrade"}
            </button>
          </motion.div>

          {/* Pro Plan */}
          <motion.div variants={itemVariants} style={{
            background: 'var(--ink)',
            color: "var(--white)",
            border: "none",
            borderRadius: "16px",
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

            {isPro && (
              <div style={{ position: "absolute", top: "1rem", right: "1rem" }}>
                <span style={{
                  background: "var(--rose)",
                  color: "var(--white)",
                  padding: "0.4rem 0.8rem",
                  borderRadius: "8px",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  zIndex: 10
                }}>
                  Current
                </span>
              </div>
            )}

            <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "0.5rem", position: "relative" }}>
              <h3 style={{ fontSize: "1.5rem", margin: 0, fontWeight: 500 }}>Pro Tier</h3>
              <Sparkles size={18} color="var(--rose)" />
            </div>

            <div style={{ display: "flex", alignItems: "baseline", gap: "0.2rem", marginBottom: "2rem", position: "relative" }}>
              <span style={{ fontSize: "2.5rem", fontWeight: 700, fontFamily: "'Bebas Neue', sans-serif" }}>₹199</span>
              <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem" }}>/month</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2.5rem", flex: 1, position: "relative" }}>
              <div style={{ display: "flex", gap: "0.8rem", color: "rgba(255,255,255,0.8)", fontSize: "0.95rem" }}>
                <Check size={18} color="var(--rose)" /> Unlimited Routines
              </div>
              <div style={{ display: "flex", gap: "0.8rem", color: "rgba(255,255,255,0.8)", fontSize: "0.95rem" }}>
                <Check size={18} color="var(--rose)" /> Full Access to Expert Search
              </div>
              <div style={{ display: "flex", gap: "0.8rem", color: "rgba(255,255,255,0.8)", fontSize: "0.95rem" }}>
                <Check size={18} color="var(--rose)" /> Journal Photo Uploads
              </div>
              <div style={{ display: "flex", gap: "0.8rem", color: "rgba(255,255,255,0.8)", fontSize: "0.95rem" }}>
                <Check size={18} color="var(--rose)" /> Early Access to Drops
              </div>
            </div>

            <motion.button
              onClick={handleUpgrade}
              disabled={isPro || isPending}
              whileHover={!isPro ? { scale: 1.02 } : {}}
              whileTap={!isPro ? { scale: 0.98 } : {}}
              style={{
                background: isPro ? "rgba(255,255,255,0.1)" : "var(--rose)",
                color: isPro ? "rgba(255,255,255,0.5)" : "var(--white)",
                border: "none",
                borderRadius: "10px",
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
              {isPending ? <Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} /> : (isPro ? "Active Plan" : "Upgrade to Pro")}
              <style>{`
              @keyframes spin { 100% { transform: rotate(360deg); } }
            `}</style>
            </motion.button>
          </motion.div>

        </div>
      </motion.div>
    </>
  );
}
