"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Upload, Check, MessageSquare, History, Mic, MicOff, Calendar, CreditCard, User, Shield, ShieldCheck, Heart, Loader2, Star } from "lucide-react";
import Script from "next/script";

interface UserProfile {
 id: string;
 email: string;
 name: string;
 credits: number;
 isPro: boolean;
}

interface AnalysisReport {
 barrierScore: number;
 acneScore: number;
 rednessScore: number;
 oilinessScore: number;
 summary: string;
 concerns: string[];
 routineAdjustments: string[];
 agentWelcomeMessage: string;
}

interface PastAnalysis {
 id: string;
 imageUrl: string;
 barrierScore: number;
 acneScore: number;
 rednessScore: number;
 oilinessScore: number;
 detailedJson: AnalysisReport;
 createdAt: string;
}

function MessageText({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
      {lines.map((line, idx) => {
        let trimmed = line.trim();
        if (!trimmed) return <div key={idx} style={{ height: "0.4rem" }} />;
        
        const isBullet = trimmed.startsWith("* ") || trimmed.startsWith("- ");
        if (isBullet) {
          trimmed = trimmed.substring(2);
        }
        
        const parts: React.ReactNode[] = [];
        const regex = /(\*\*.*?\*\*|\[.*?\]\(.*?\))/g;
        const segments = trimmed.split(regex);
        
        segments.forEach((part, pIdx) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            parts.push(
              <strong key={pIdx} style={{ fontWeight: 700 }}>
                {part.slice(2, -2)}
              </strong>
            );
          } else if (part.startsWith("[") && part.includes("](")) {
            const closingBrace = part.indexOf("]");
            const linkText = part.substring(1, closingBrace);
            const linkUrl = part.substring(closingBrace + 2, part.length - 1);
            const isExternal = linkUrl.startsWith("http");
            
            parts.push(
              <a 
                key={pIdx} 
                href={linkUrl} 
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                style={{ 
                  color: "var(--rose)", 
                  textDecoration: "underline", 
                  fontWeight: 600,
                  cursor: "pointer"
                }}
              >
                {linkText}
              </a>
            );
          } else {
            parts.push(part);
          }
        });
        
        if (isBullet) {
          return (
            <div key={idx} style={{ display: "flex", gap: "0.4rem", paddingLeft: "0.6rem", alignItems: "flex-start" }}>
              <span style={{ color: "var(--rose)", flexShrink: 0, marginTop: "0.15rem" }}>•</span>
              <span style={{ flex: 1 }}>{parts}</span>
            </div>
          );
        }
        
        return <p key={idx} style={{ margin: 0 }}>{parts}</p>;
      })}
    </div>
  );
}

export function AnalysisClient({
 user,
 pastAnalyses,
 nextAvailableAt,
}: {
 user: UserProfile;
 pastAnalyses: PastAnalysis[];
 nextAvailableAt: string | null;
}) {
 const [selectedFile, setSelectedFile] = useState<string | null>(null);
 const [scanning, setScanning] = useState(false);
 const [scanStep, setScanStep] = useState("");
 const [report, setReport] = useState<AnalysisReport | null>(null);
 const [isPending, setIsPending] = useState(false);
 const [errorMsg, setErrorMsg] = useState("");
 
 // Payment States
 const [paymentRegion, setPaymentRegion] = useState<"INR" | "USD">("INR");
 const [paymentPending, setPaymentPending] = useState(false);

 // Chat States
 const [chatOpen, setChatOpen] = useState(false);
 const [messages, setMessages] = useState<{ sender: "user" | "bot"; text: string }[]>([]);
 const [inputMessage, setInputMessage] = useState("");
 const [chatLoading, setChatLoading] = useState(false);
 const [selectedMetric, setSelectedMetric] = useState<"all" | "barrier" | "acne" | "redness" | "oiliness">("all");

  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  const toggleSpeechToText = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice-to-text is not supported in this browser. Please try Chrome, Edge, or Safari.");
      return;
    }

    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const resultText = event.results[0][0].transcript;
      setInputMessage(prev => prev ? `${prev} ${resultText}` : resultText);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const handleDodoCheckout = async () => {
    setPaymentPending(true);
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
      console.error("Dodo checkout error:", error);
      alert(`Checkout Error: ${error.message || "Failed to initialize"}`);
    } finally {
      setPaymentPending(false);
    }
  };

  const handleOneTimeUnavailable = () => {
    alert("One-time scans are currently only available in India (INR). For the USD region, please select the Pro Monthly subscription below.");
  };

 const handleRazorpayCheckout = async () => {
 setPaymentPending(true);
 try {
 // Load script if not available
 if (!(window as any).Razorpay) {
 const script = document.createElement("script");
 script.src = "https://checkout.razorpay.com/v1/checkout.js";
 const scriptLoaded = new Promise((res) => {
 script.onload = () => res(true);
 script.onerror = () => res(false);
 });
 document.body.appendChild(script);
 const ok = await scriptLoaded;
 if (!ok) throw new Error("Failed to load Razorpay checkout script");
 }

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
 theme: { color: "#fc2779" },
 };

 const rzp = new (window as any).Razorpay(options);
 rzp.open();
 } catch (error: any) {
 console.error("Razorpay error:", error);
 alert(`Checkout Error: ${error.message || "Failed to initialize"}`);
 } finally {
 setPaymentPending(false);
 }
 };

 const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
 const file = e.target.files?.[0];
 if (file) {
 const reader = new FileReader();
 reader.onloadend = () => {
 setSelectedFile(reader.result as string);
 setErrorMsg("");
 };
 reader.readAsDataURL(file);
 }
 };

 const runAnalysis = async () => {
 if (!selectedFile) return;
 setScanning(true);
 setErrorMsg("");

 // Simulate futuristic steps
 const steps = [
 "Initializing multispectral neural scanner...",
 "Running landmark face alignment...",
 "Mapping epidermal grid quadrants...",
 "Measuring barrier lipid density...",
 "Analyzing hyperpigmentation & redness...",
 "Finalizing dermatologist analysis...",
 ];

 let currentStep = 0;
 const interval = setInterval(() => {
 if (currentStep < steps.length) {
 setScanStep(steps[currentStep]);
 currentStep++;
 } else {
 clearInterval(interval);
 }
 }, 1200);

 try {
 const res = await fetch("/api/analysis", {
 method: "POST",
 headers: { "Content-Type": "application/json" },
 body: JSON.stringify({ image: selectedFile }),
 });

 const data = await res.json();
 clearInterval(interval);

 if (!res.ok) {
 throw new Error(data.message || data.error || "Analysis failed");
 }

 setReport(data.analysis.detailedJson);
 
 // Initialize Chat Welcome Message
 setMessages([
 {
 sender: "bot",
 text: data.analysis.detailedJson.agentWelcomeMessage || 
 `Hello ${user.name}! I have finished scanning your face. Let me know if you want to customize your routine!`,
 },
 ]);
 } catch (err: any) {
 setErrorMsg(err.message || "An unexpected error occurred.");
 } finally {
 setScanning(false);
 }
 };

 const handleSendMessage = async (e: React.FormEvent) => {
 e.preventDefault();
 if (!inputMessage.trim() || !report) return;

 const userText = inputMessage;
 setMessages((prev) => [...prev, { sender: "user", text: userText }]);
 setInputMessage("");
 setChatLoading(true);

 try {
 // Connect to the existing chat consultant / search actions if available, 
 // otherwise run a fallback API or generateWithRetry route.
 const res = await fetch("/api/chat", {
 method: "POST",
 headers: { "Content-Type": "application/json" },
 body: JSON.stringify({
 messages: [
 { role: "system", content: `You are Mirha, a warm skincare consultant at Mirha & Co. You are discussing the user's recent face scan report: ${JSON.stringify(report)}` },
 ...messages.map(m => ({ role: m.sender === "user" ? "user" : "assistant", content: m.text })),
 { role: "user", content: userText }
 ]
 })
 });

 const data = await res.json();
 // If the chat route uses standard Next.js AI SDK stream or json
 const botResponse = data.choices?.[0]?.message?.content || data.response || "I am analyzing your report. How can I help you adjust your routine?";
 setMessages((prev) => [...prev, { sender: "bot", text: botResponse }]);
 } catch (err) {
 setMessages((prev) => [
 ...prev,
 { sender: "bot", text: "I'm having trouble connecting to the network right now. Try rinsing your routine and asking again in a bit!" },
 ]);
 } finally {
 setChatLoading(false);
 }
 };

 // Helper score color
 const getScoreColor = (score: number) => {
 if (score >= 80) return "#22c55e"; // Green
 if (score >= 50) return "#eab308"; // Orange/Yellow
 return "#ef4444"; // Red
 };

 const canScan = user.isPro && !nextAvailableAt || user.credits > 0;

  const renderTrendChart = () => {
    if (pastAnalyses.length < 2) {
      return null;
    }

    const sorted = [...pastAnalyses].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    const paddingLeft = 40;
    const paddingRight = 20;
    const paddingTop = 20;
    const paddingBottom = 35;
    const chartWidth = 600 - paddingLeft - paddingRight;
    const chartHeight = 240 - paddingTop - paddingBottom;

    const getPath = (key: "barrierScore" | "acneScore" | "rednessScore" | "oilinessScore") => {
      return sorted.map((item, idx) => {
        const x = paddingLeft + (idx * chartWidth) / (sorted.length - 1);
        const y = paddingTop + chartHeight - (item[key] * chartHeight) / 100;
        return `${idx === 0 ? "M" : "L"} ${x} ${y}`;
      }).join(" ");
    };

    const metrics = [
      { key: "barrierScore", label: "Barrier", color: "#22c55e", id: "barrier" },
      { key: "acneScore", label: "Acne", color: "#eab308", id: "acne" },
      { key: "rednessScore", label: "Redness", color: "#ef4444", id: "redness" },
      { key: "oilinessScore", label: "Oiliness", color: "#3b82f6", id: "oiliness" }
    ] as const;

    return (
      <div style={{
        background: "rgba(255,255,255,0.75)",
        backdropFilter: "blur(12px)",
        border: "1px solid var(--rule)",
        borderRadius: "20px",
        padding: "1.5rem",
        marginBottom: "2.5rem",
        boxShadow: "0 10px 30px rgba(0,0,0,0.02)"
      }}>
        {/* Chart Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <h4 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.3rem", color: "var(--ink)", margin: 0 }}>Skin Progress Trends</h4>
            <p style={{ color: "var(--muted)", fontSize: "0.8rem", margin: "0.2rem 0 0" }}>Interactive tracking across skin scans</p>
          </div>
          
          {/* Legend Toggles */}
          <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
            <button
              onClick={() => setSelectedMetric("all")}
              style={{
                fontSize: "0.75rem",
                padding: "0.3rem 0.7rem",
                borderRadius: "20px",
                border: "1px solid " + (selectedMetric === "all" ? "var(--ink)" : "var(--rule)"),
                background: selectedMetric === "all" ? "var(--ink)" : "transparent",
                color: selectedMetric === "all" ? "var(--white)" : "var(--ink)",
                cursor: "pointer",
                fontWeight: 600,
                transition: "all 0.2s"
              }}
            >
              All Metrics
            </button>
            {metrics.map((m) => (
              <button
                key={m.id}
                onClick={() => setSelectedMetric(m.id)}
                style={{
                  fontSize: "0.75rem",
                  padding: "0.3rem 0.7rem",
                  borderRadius: "20px",
                  border: `1px solid ${selectedMetric === m.id ? m.color : "var(--rule)"}`,
                  background: selectedMetric === m.id ? m.color : "transparent",
                  color: selectedMetric === m.id ? "white" : "var(--ink)",
                  cursor: "pointer",
                  fontWeight: 600,
                  transition: "all 0.2s"
                }}
              >
                <span style={{ display: "inline-block", width: "8px", height: "8px", borderRadius: "50%", background: selectedMetric === m.id ? "white" : m.color, marginRight: "5px" }}></span>
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* SVG Wrapper */}
        <div style={{ position: "relative", width: "100%", overflowX: "auto" }}>
          <svg viewBox="0 0 600 240" style={{ width: "100%", minWidth: "500px", display: "block" }}>
            {/* Grid Lines */}
            {[0, 25, 50, 75, 100].map((val) => {
              const y = paddingTop + chartHeight - (val * chartHeight) / 100;
              return (
                <g key={val}>
                  <line x1={paddingLeft} y1={y} x2={600 - paddingRight} y2={y} stroke="var(--rule)" strokeWidth="1" strokeDasharray="4 4" />
                  <text x={paddingLeft - 8} y={y + 4} textAnchor="end" fontSize="10" fill="var(--muted)" fontWeight="500">{val}</text>
                </g>
              );
            })}

            {/* Date Ticks */}
            {sorted.map((item, idx) => {
              const x = paddingLeft + (idx * chartWidth) / (sorted.length - 1);
              const dateStr = new Date(item.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric" });
              return (
                <g key={item.id}>
                  <line x1={x} y1={paddingTop} x2={x} y2={paddingTop + chartHeight} stroke="var(--rule)" strokeWidth="0.5" />
                  <text x={x} y={240 - 10} textAnchor="middle" fontSize="10" fill="var(--muted)" fontWeight="500">{dateStr}</text>
                </g>
              );
            })}

            {/* Plot Lines */}
            {metrics.map((m) => {
              const isVisible = selectedMetric === "all" || selectedMetric === m.id;
              if (!isVisible) return null;
              return (
                <path
                  key={m.key}
                  d={getPath(m.key)}
                  fill="none"
                  stroke={m.color}
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ transition: "stroke-width 0.2s" }}
                />
              );
            })}

            {/* Data Points */}
            {metrics.map((m) => {
              const isVisible = selectedMetric === "all" || selectedMetric === m.id;
              if (!isVisible) return null;
              return sorted.map((item, idx) => {
                const x = paddingLeft + (idx * chartWidth) / (sorted.length - 1);
                const score = item[m.key];
                const y = paddingTop + chartHeight - (score * chartHeight) / 100;
                return (
                  <circle
                    key={`${item.id}-${m.key}`}
                    cx={x}
                    cy={y}
                    r="5"
                    fill="white"
                    stroke={m.color}
                    strokeWidth="3"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setReport(item.detailedJson);
                      setMessages([
                        { sender: "bot", text: item.detailedJson.agentWelcomeMessage || "Consultation for this past report is active." }
                      ]);
                    }}
                  >
                    <title>{`${m.label}: ${score} (${new Date(item.createdAt).toLocaleDateString()})`}</title>
                  </circle>
                );
              });
            })}
          </svg>
        </div>
      </div>
    );
  };

 return (
 <div className="analysis-container">
  <style>{`
    @media (max-width: 600px) {
      .scan-history-item {
        flex-direction: column !important;
        align-items: flex-start !important;
        gap: 0.6rem !important;
      }
      .scan-history-item-left {
        flex-direction: column !important;
        align-items: flex-start !important;
        gap: 0.4rem !important;
      }
    }
  `}</style>

 {/* Header */}
 <header style={{ marginBottom: "2rem" }}>
 <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
 <span style={{
 background: "rgba(252, 39, 121, 0.1)",
 color: "var(--rose)",
 padding: "0.2rem 0.6rem",
 borderRadius: "6px",
 fontSize: "0.75rem",
 fontWeight: 600,
 letterSpacing: "0.05em",
 textTransform: "uppercase"
 }}>
 Prime AI Product
 </span>
 {user.isPro ? (
 <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontSize: "0.75rem", color: "#16a34a" }}>
 <ShieldCheck size={14} /> Active Pro Member
 </span>
 ) : (
 <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontSize: "0.75rem", color: "var(--muted)" }}>
 <Shield size={14} /> Free Tier
 </span>
 )}
 </div>
 <h1 className="analysis-title">
 AI Face Detection & Skin Analyst
 </h1>
 <p style={{ color: "var(--muted)", margin: "0.5rem 0 0", fontSize: "1.05rem" }}>
 Upload a selfie for clinical-grade barrier monitoring, acne detection, redness mapping, and personalized routines.
 </p>
 </header>

 {/* Main Grid */}
 <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr)", gap: "2rem", width: "100%", maxWidth: "100%", overflow: "hidden" }}>
 
 {/* Paywall Container */}
 {!canScan && !report && (
 <motion.div 
 initial={{ opacity: 0, y: 15 }} 
 animate={{ opacity: 1, y: 0 }}
 className="paywall-card"
 >
 <div style={{ display: "inline-flex", padding: "1rem", background: "rgba(252, 39, 121,0.1)", borderRadius: "50%", marginBottom: "1.5rem" }}>
 <Star size={32} color="var(--rose)" />
 </div>
 
 <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "2rem", margin: "0 0 1rem", color: "var(--ink)" }}>
 Unlock Your AI Skin Report
 </h2>

 {nextAvailableAt && (
 <div style={{
 background: "rgba(239, 68, 68, 0.05)",
 border: "1px solid rgba(239, 68, 68, 0.1)",
 color: "#dc2626",
 padding: "1rem",
 borderRadius: "12px",
 fontSize: "0.95rem",
 marginBottom: "1.5rem",
 display: "flex",
 flexDirection: "column",
 alignItems: "center",
 gap: "0.25rem"
 }}>
 <strong>Daily Limit Reached</strong>
 <span>Your next free daily scan becomes available after:</span>
 <span className="font-mono font-semibold" suppressHydrationWarning>{new Date(nextAvailableAt).toLocaleString()}</span>
 </div>
 )}

 <p style={{ color: "var(--muted)", maxWidth: "500px", margin: "0 auto 2rem", lineHeight: 1.6 }}>
 Get detailed scores for moisture barriers, acne severity, irritation redness, and sebum metrics, plus an exclusive chat session with our AI specialist.
 </p>

 {/* Currency Region Selector */}
 <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginBottom: "2rem" }}>
 <button
 onClick={() => setPaymentRegion("USD")}
 style={{
 padding: "0.5rem 1rem",
 borderRadius: "8px",
 border: "1px solid " + (paymentRegion === "USD" ? "var(--ink)" : "var(--rule)"),
 background: paymentRegion === "USD" ? "var(--ink)" : "transparent",
 color: paymentRegion === "USD" ? "var(--white)" : "var(--ink)",
 cursor: "pointer",
 fontSize: "0.85rem",
 fontWeight: 600
 }}
 >
 Global (USD)
 </button>
 <button
 onClick={() => setPaymentRegion("INR")}
 style={{
 padding: "0.5rem 1rem",
 borderRadius: "8px",
 border: "1px solid " + (paymentRegion === "INR" ? "var(--ink)" : "var(--rule)"),
 background: paymentRegion === "INR" ? "var(--ink)" : "transparent",
 color: paymentRegion === "INR" ? "var(--white)" : "var(--ink)",
 cursor: "pointer",
 fontSize: "0.85rem",
 fontWeight: 600
 }}
 >
 India (INR)
 </button>
 </div>

 {/* Pricing Options */}
 <div className="pricing-grid">
 {/* Option A: One-Time Pass */}
 <div className="pricing-card" style={{ background: "var(--sand)", border: "1px solid var(--rule)" }}>
 <span style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "var(--muted)" }}>One-Time Scan</span>
 <span style={{ fontSize: "2rem", fontWeight: 700, margin: "0.5rem 0", fontFamily: "'Bebas Neue', sans-serif" }}>
 {paymentRegion === "USD" ? "$1.99" : "₹149"}
 </span>
 <p style={{ fontSize: "0.8rem", color: "var(--muted)", margin: "0 0 1.5rem", textAlign: "center" }}>
 {paymentRegion === "USD" ? "One-time scans are currently unavailable in USD. Please select the Pro Subscription." : "Unlock a single scan report and chat session instantly."}
 </p>
 <button
 disabled={paymentPending}
 onClick={paymentRegion === "USD" ? handleOneTimeUnavailable : handleRazorpayCheckout}
 style={{
 background: "var(--ink)",
 color: "var(--white)",
 border: "none",
 borderRadius: "8px",
 padding: "0.8rem",
 width: "100%",
 fontSize: "0.85rem",
 fontWeight: 600,
 cursor: "pointer"
 }}
 >
 {paymentRegion === "USD" ? "Unavailable" : "Buy Pass"}
 </button>
 </div>

 {/* Option B: Pro Subscription */}
 <div className="pricing-card" style={{ background: "var(--ink)", color: "var(--white)" }}>
 <span style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "var(--rose)" }}>Pro Monthly</span>
 <span style={{ fontSize: "2rem", fontWeight: 700, margin: "0.5rem 0", fontFamily: "'Bebas Neue', sans-serif" }}>
 {paymentRegion === "USD" ? "$10.99" : "₹199"}
 </span>
 <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.7)", margin: "0 0 1.5rem", textAlign: "center" }}>
 1 Scan / Day, unlimited routines, and full chat access.
 </p>
 <button
 disabled={paymentPending}
 onClick={paymentRegion === "USD" ? handleDodoCheckout : handleRazorpayCheckout}
 style={{
 background: "var(--rose)",
 color: "var(--white)",
 border: "none",
 borderRadius: "8px",
 padding: "0.8rem",
 width: "100%",
 fontSize: "0.85rem",
 fontWeight: 600,
 cursor: "pointer",
 boxShadow: "0 4px 12px rgba(252, 39, 121, 0.2)"
 }}
 >
 {paymentPending ? <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} /> : "Subscribe"}
 </button>
 </div>
 </div>
 </motion.div>
 )}

 {/* Scanner Panel */}
 {(canScan || report) && (
 <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr)", gap: "2rem", width: "100%", maxWidth: "100%", overflow: "hidden" }}>
 
 {/* Input Dropzone & Visual scanner */}
 {!report && (
 <div style={{
 background: "var(--dash-surface)",
 backdropFilter: "blur(8px)",
 border: "1px dashed var(--rule)",
 borderRadius: "16px",
 padding: "3rem 2rem",
 display: "flex",
 flexDirection: "column",
 alignItems: "center",
 justifyContent: "center",
 position: "relative",
 overflow: "hidden",
 minHeight: "350px"
 }}>
 {selectedFile ? (
 <div style={{ position: "relative", maxWidth: "320px", width: "100%", borderRadius: "12px", overflow: "hidden" }}>
 <img src={selectedFile} alt="Selfie preview" style={{ width: "100%", display: "block" }} />
 
 {/* Glowing Laser Scan Line Overlay */}
 {scanning && (
 <motion.div 
 initial={{ top: "0%" }}
 animate={{ top: ["0%", "100%", "0%"] }}
 transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
 style={{
 position: "absolute",
 left: 0,
 right: 0,
 height: "4px",
 background: "linear-gradient(90deg, transparent, var(--rose), transparent)",
 boxShadow: "0 0 15px var(--rose)",
 zIndex: 10
 }}
 />
 )}
 </div>
 ) : (
 <div style={{ textAlign: "center" }}>
 <div style={{ padding: "1.2rem", background: "var(--dash-bg)", borderRadius: "50%", display: "inline-flex", marginBottom: "1rem", color: "var(--muted)" }}>
 <Camera size={36} />
 </div>
 <h3 style={{ fontSize: "1.25rem", margin: "0 0 0.5rem", fontWeight: 500 }}>Upload a Clear Front-Facing Selfie</h3>
 <p style={{ color: "var(--muted)", fontSize: "0.9rem", maxWidth: "320px", margin: "0 auto 1.5rem" }}>
 Make sure your face is well-lit, free of heavy makeup, and facing the camera directly.
 </p>
 </div>
 )}

 {/* Upload Action */}
 {!scanning && (
 <div style={{ marginTop: "1.5rem", display: "flex", gap: "1rem" }}>
 <label style={{
 background: "var(--dash-accent)",
 color: "white",
 padding: "0.8rem 1.5rem",
 borderRadius: "10px",
 fontSize: "0.9rem",
 fontWeight: 600,
 cursor: "pointer",
 display: "flex",
 alignItems: "center",
 gap: "0.5rem"
 }}>
 <Upload size={16} />
 {selectedFile ? "Change Photo" : "Select Photo"}
 <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: "none" }} />
 </label>

 {selectedFile && (
 <button
 onClick={runAnalysis}
 style={{
 background: "var(--rose)",
 color: "var(--white)",
 border: "none",
 padding: "0.8rem 2rem",
 borderRadius: "10px",
 fontSize: "0.9rem",
 fontWeight: 600,
 cursor: "pointer",
 boxShadow: "0 8px 20px rgba(252, 39, 121, 0.2)",
 display: "flex",
 alignItems: "center",
 gap: "0.5rem"
 }}
 >
 <Star size={16} />
 Scan Face
 </button>
 )}
 </div>
 )}

 {/* Progress overlays */}
 {scanning && (
 <div style={{
 position: "absolute",
 inset: 0,
 background: "rgba(28, 25, 23, 0.95)",
 color: "var(--white)",
 display: "flex",
 flexDirection: "column",
 alignItems: "center",
 justifyContent: "center",
 padding: "2rem",
 zIndex: 20
 }}>
 <Loader2 size={48} style={{ animation: "spin 1.5s linear infinite", color: "var(--rose)", marginBottom: "1.5rem" }} />
 <h4 style={{ fontSize: "1.1rem", margin: "0 0 0.5rem", fontWeight: 500, color: "var(--white)" }}>Scanning Epidermis...</h4>
 <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem", fontFamily: "monospace" }}>{scanStep}</p>
 </div>
 )}

 {errorMsg && (
 <div style={{ color: "#dc2626", marginTop: "1rem", fontSize: "0.9rem" }}>
 {errorMsg}
 </div>
 )}
 </div>
 )}

 {/* Results Report Display */}
 {report && (
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2rem" }}
 >
 {/* Score Dial Grids */}
 <div className="score-dials-grid">
 {[
 { label: "Moisture Barrier", score: report.barrierScore, desc: "Hydration retention strength" },
 { label: "Acne/Congestion", score: report.acneScore, desc: "Pore clarity & breakout presence" },
 { label: "Redness/Sensitivity", score: report.rednessScore, desc: "Vascular irritation profile" },
 { label: "Oil/Sebum Control", score: report.oilinessScore, desc: "Glandular sebum balancing" }
 ].map((dial, idx) => (
 <div key={idx} className="score-dial-card">
 <span style={{ fontSize: "0.9rem", fontWeight: 500, color: "var(--ink)", marginBottom: "1rem" }}>{dial.label}</span>
 
 {/* Circular Gauge visual representation */}
 <div style={{ position: "relative", width: "100px", height: "100px", display: "flex", alignItems: "center", justifyContent: "center" }}>
 <svg width="100" height="100" style={{ transform: "rotate(-90deg)" }}>
 <circle cx="50" cy="50" r="40" fill="transparent" stroke="var(--rule)" strokeWidth="6" />
 <circle 
 cx="50" 
 cy="50" 
 r="40" 
 fill="transparent" 
 stroke={getScoreColor(dial.score)} 
 strokeWidth="6" 
 strokeDasharray={2 * Math.PI * 40}
 strokeDashoffset={2 * Math.PI * 40 * (1 - dial.score / 100)}
 strokeLinecap="round"
 />
 </svg>
 <span style={{ position: "absolute", fontSize: "1.6rem", fontWeight: 700, color: "var(--ink)" }}>{dial.score}</span>
 </div>

 <span style={{ fontSize: "0.75rem", color: "var(--muted)", marginTop: "1rem" }}>{dial.desc}</span>
 </div>
 ))}
 </div>

 {/* Detailed Report Text */}
 <div className="detailed-report-grid" style={{
 background: "var(--dash-surface)",
 border: "1px solid var(--rule)",
 borderRadius: "16px",
 padding: "clamp(1.1rem, 4vw, 2rem)",
 width: "100%",
 maxWidth: "100%",
 overflowWrap: "anywhere"
 }}>
 {/* Left Column: Summary */}
 <div>
 <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.5rem", color: "var(--ink)", margin: "0 0 1rem" }}>
 AI Clinical Synthesis
 </h3>
 <p style={{ color: "var(--muted)", fontSize: "0.95rem", lineHeight: 1.6, margin: 0 }}>
 {report.summary}
 </p>

 <h4 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--ink)", margin: "1.5rem 0 0.5rem" }}>Identified Concerns</h4>
 <ul style={{ paddingLeft: "1.2rem", margin: 0, color: "var(--muted)", fontSize: "0.9rem" }}>
 {report.concerns.map((c, i) => (
 <li key={i} style={{ marginBottom: "0.4rem" }}>{c}</li>
 ))}
 </ul>
 </div>

 {/* Right Column: Adjustments & Consultation Actions */}
 <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
 <div>
 <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.5rem", color: "var(--ink)", margin: "0 0 1rem" }}>
 Recommended Adjustments
 </h3>
 <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
 {report.routineAdjustments.map((a, i) => (
 <div key={i} style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
 <Check size={16} color="var(--rose)" style={{ marginTop: "0.15rem", flexShrink: 0 }} />
 <span style={{ fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.4 }}>{a}</span>
 </div>
 ))}
 </div>
 </div>

 <div style={{ marginTop: "2rem" }}>
 <button
 onClick={() => setChatOpen(true)}
 style={{
 background: "var(--rose)",
 color: "var(--white)",
 border: "none",
 borderRadius: "10px",
 padding: "1rem 2rem",
 fontSize: "0.95rem",
 fontWeight: 600,
 cursor: "pointer",
 display: "flex",
 alignItems: "center",
 gap: "0.5rem",
 width: "100%",
 justifyContent: "center",
 boxShadow: "0 6px 15px rgba(252, 39, 121, 0.2)"
 }}
 >
 <MessageSquare size={18} />
 Consult with AI Skin Specialist
 </button>

 <button
 onClick={() => {
 setReport(null);
 setSelectedFile(null);
 }}
 style={{
 background: "transparent",
 border: "1px solid var(--rule)",
 color: "var(--muted)",
 borderRadius: "10px",
 padding: "0.8rem",
 width: "100%",
 marginTop: "0.8rem",
 fontSize: "0.85rem",
 fontWeight: 500,
 cursor: "pointer"
 }}
 >
 Scan New Photo
 </button>
 </div>
 </div>
 </div>

 {/* Consultation Chat Widget Modal */}
 <AnimatePresence>
 {chatOpen && (
 <motion.div 
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 exit={{ opacity: 0 }}
 style={{
 position: "fixed",
 inset: 0,
 background: "rgba(0,0,0,0.5)",
 display: "flex",
 alignItems: "center",
 justifyContent: "center",
 zIndex: 100,
 padding: "1rem"
 }}
 >
 <motion.div 
 initial={{ scale: 0.95, y: 15 }}
 animate={{ scale: 1, y: 0 }}
 exit={{ scale: 0.95, y: 15 }}
 style={{
 background: "var(--dash-surface)",
 border: "1px solid var(--rule)",
 borderRadius: "16px",
 width: "100%",
 maxWidth: "540px",
 height: "550px",
 maxHeight: "85vh",
 display: "flex",
 flexDirection: "column",
 boxShadow: "0 25px 50px rgba(0,0,0,0.15)"
 }}
 >
 {/* Chat Header */}
 <div style={{
 padding: "1rem 1.5rem",
 borderBottom: "1px solid var(--rule)",
 display: "flex",
 alignItems: "center",
 justifyContent: "space-between"
 }}>
 <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
 <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#22c55e" }} />
 <div>
 <h4 style={{ margin: 0, fontSize: "1rem", fontWeight: 600 }}>Mirha</h4>
 <span style={{ fontSize: "0.75rem", color: "var(--muted)" }}>AI Specialist</span>
 </div>
 </div>
 <button 
 onClick={() => setChatOpen(false)}
 style={{ background: "transparent", border: "none", fontSize: "1.2rem", cursor: "pointer", color: "var(--muted)" }}
 >
 &times;
 </button>
 </div>

 {/* Chat Messages */}
 <div style={{
 flex: 1,
 overflowY: "auto",
 padding: "1.5rem",
 display: "flex",
 flexDirection: "column",
 gap: "1rem"
 }}>
 {messages.map((m, i) => (
 <div 
 key={i} 
 style={{
 display: "flex",
 justifyContent: m.sender === "user" ? "flex-end" : "flex-start"
 }}
 >
 <div style={{
 maxWidth: "80%",
 padding: "0.8rem 1rem",
 borderRadius: m.sender === "user" ? "12px 12px 0 12px" : "12px 12px 12px 0",
 background: m.sender === "user" ? "var(--ink)" : "var(--sand)",
 color: m.sender === "user" ? "var(--white)" : "var(--ink)",
 fontSize: "0.9rem",
 lineHeight: 1.45
 }}>
 <MessageText text={m.text} />
 </div>
 </div>
 ))}
 
 {chatLoading && (
 <div style={{ display: "flex", justifyContent: "flex-start" }}>
 <div style={{ background: "var(--sand)", padding: "0.8rem 1rem", borderRadius: "12px", display: "flex", alignItems: "center", gap: "0.5rem" }}>
 <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} />
 <span style={{ fontSize: "0.85rem", color: "var(--muted)" }}>typing...</span>
 </div>
 </div>
 )}
 </div>

 {/* Chat Input */}
 <form 
 onSubmit={handleSendMessage}
 style={{
 padding: "1rem",
 borderTop: "1px solid var(--rule)",
 display: "flex",
 gap: "0.5rem"
 }}
 >
 <input 
 type="text"
 placeholder="Ask about your routine recommendations..."
 value={inputMessage}
 onChange={(e) => setInputMessage(e.target.value)}
 style={{
 flex: 1,
 border: "1px solid var(--rule)",
 borderRadius: "8px",
 padding: "0.8rem",
 fontSize: "0.9rem",
 outline: "none"
 }}
 />
 <button
        type="button"
        onClick={toggleSpeechToText}
        style={{
          background: isListening ? "var(--rose)" : "var(--sand)",
          color: isListening ? "var(--white)" : "var(--ink)",
          border: "none",
          borderRadius: "8px",
          padding: "0.8rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "all 0.2s ease"
        }}
        title={isListening ? "Listening... click to stop" : "Use Voice-to-Text"}
      >
        {isListening ? <MicOff size={18} /> : <Mic size={18} />}
      </button>
      <button
      type="submit"
 style={{
 background: "var(--ink)",
 color: "var(--white)",
 border: "none",
 borderRadius: "8px",
 padding: "0.8rem 1.2rem",
 fontSize: "0.9rem",
 fontWeight: 600,
 cursor: "pointer"
 }}
 >
 Send
 </button>
 </form>
 </motion.div>
 </motion.div>
 )}
 </AnimatePresence>

 </motion.div>
 )}

 </div>
 )}

 {/* Scan History list */}
 {pastAnalyses.length > 0 && (
 <div style={{ marginTop: "3rem" }}>
 {renderTrendChart()}
 <h3 style={{
 fontFamily: "'DM Serif Display', serif",
 fontSize: "1.8rem",
 color: "var(--ink)",
 marginBottom: "1rem",
 display: "flex",
 alignItems: "center",
 gap: "0.5rem"
 }}>
 <History size={22} color="var(--rose)" />
 Scan History
 </h3>
 <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1rem" }}>
 {pastAnalyses.map((item) => (
 <div 
 key={item.id}
 className="scan-history-item"
 onClick={() => {
 setReport(item.detailedJson);
 // Pre-fill chat
 setMessages([
 {
 sender: "bot",
 text: item.detailedJson.agentWelcomeMessage || "Consultation for this past report is active."
 }
 ]);
 }}
 style={{
 background: "rgba(255,255,255,0.6)",
 border: "1px solid var(--rule)",
 borderRadius: "12px",
 padding: "1rem 1.5rem",
 display: "flex",
 alignItems: "center",
 justifyContent: "space-between",
 cursor: "pointer",
 transition: "all 0.2s ease"
 }}
 >
  <div className="scan-history-item-left" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
 <div style={{ display: "flex", gap: "0.5rem", fontSize: "0.85rem", fontWeight: 600 }}>
 <span style={{ color: getScoreColor(item.barrierScore) }}>Barrier: {item.barrierScore}</span>
 <span style={{ color: "var(--rule)" }}>|</span>
 <span style={{ color: getScoreColor(item.acneScore) }}>Acne: {item.acneScore}</span>
 </div>
 <span style={{ fontSize: "0.8rem", color: "var(--muted)", display: "flex", alignItems: "center", gap: "0.3rem" }} suppressHydrationWarning>
 <Calendar size={12} />
 {new Date(item.createdAt).toLocaleDateString()}
 </span>
 </div>
 
 <span style={{ fontSize: "0.8rem", color: "var(--rose)", fontWeight: 600 }}>
 View Report &rarr;
 </span>
 </div>
 ))}
 </div>
 </div>
 )}

 </div>
 </div>
 );
}


