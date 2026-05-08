"use client";

import { useState, useTransition, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { saveJournalEntry, analyzeSkinPhoto, getJournalAnalysis } from "../../actions";
import { Calendar, Plus, Star, MoreVertical, Upload, Sparkles, X, Brain, TrendingUp, Info, Lightbulb } from "lucide-react";


export function SkinJournalClient({ initialEntries, isPro }: { initialEntries: any[], isPro: boolean }) {
  const [entries, setEntries] = useState(initialEntries);
  const [showNewEntry, setShowNewEntry] = useState(false);
  const [note, setNote] = useState("");
  const [rating, setRating] = useState(5);
  const [photoBase64, setPhotoBase64] = useState<string | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [historyAnalysis, setHistoryAnalysis] = useState<any>(null);
  const [isAnalyzingHistory, setIsAnalyzingHistory] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;
          const MAX_DIMENSION = 800;

          if (width > height) {
            if (width > MAX_DIMENSION) {
              height *= MAX_DIMENSION / width;
              width = MAX_DIMENSION;
            }
          } else {
            if (height > MAX_DIMENSION) {
              width *= MAX_DIMENSION / height;
              height = MAX_DIMENSION;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            // Compress to JPEG with 70% quality
            const compressedBase64 = canvas.toDataURL("image/jpeg", 0.7);
            setPhotoBase64(compressedBase64);
          } else {
            // Fallback if canvas fails
            setPhotoBase64(reader.result as string);
          }
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!note && !photoBase64) return;
    setIsAnalyzing(true);
    try {
      const result = await analyzeSkinPhoto(note, photoBase64 || undefined);
      if (result && typeof result === 'object' && 'error' in result) {
        setError(result.error);
      } else {
        setAiAnalysis(result as string ?? null);
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleAnalyzeHistory = async () => {
    if (!isPro) {
      setError("UPGRADE_PRO");
      return;
    }
    setIsAnalyzingHistory(true);
    try {
      const result = await getJournalAnalysis();
      if (result?.error) {
        if (result.error === "NOT_ENOUGH_DATA") setError("Please add at least 3 entries to unlock AI Trends.");
        else setError("Upgrade to Pro to unlock Mirha Brain analysis.");
      } else {
        setHistoryAnalysis(result);
      }
    } finally {
      setIsAnalyzingHistory(false);
    }
  };

  const handleSave = () => {
    setError(null);

    startTransition(async () => {
      try {
        await saveJournalEntry(note, rating, photoBase64 || "[]", aiAnalysis);
        // Optimistic update
        setEntries([{
          id: `temp-${Date.now()}`,
          date: new Date().toISOString(),
          entry: note,
          rating,
          photos: photoBase64 || "[]",
          aiAnalysis
        }, ...entries]);
        setShowNewEntry(false);
        setNote("");
        setRating(5);
        setPhotoBase64(null);
        setAiAnalysis(null);
      } catch (err: any) {
        const errorMsg = err?.message || "Failed to save entry. Please try again.";
        setError(errorMsg);
        console.error("Journal save error:", err);
      }
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div initial="hidden" animate="show" variants={containerVariants}>
      <motion.header variants={itemVariants} style={{ marginBottom: "2.5rem", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h1 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "2.8rem",
            fontWeight: 400,
            margin: "0 0 0.5rem",
            color: "var(--ink)",
            lineHeight: 1.1
          }}>
            Skin Journal
          </h1>
          <p style={{ color: "var(--muted)", margin: 0, fontSize: "1.05rem" }}>Track your skin's daily progress and reactions.</p>
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <motion.button
            onClick={handleAnalyzeHistory}
            disabled={isAnalyzingHistory}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: "var(--ink)",
              color: "var(--white)",
              border: "none",
              borderRadius: "10px",
              padding: "0.8rem 1.2rem",
              fontSize: "0.95rem",
              cursor: "pointer",
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              boxShadow: "0 4px 14px rgba(0, 0, 0, 0.1)"
            }}
          >
            <Brain size={18} color="#c8473a" /> {isAnalyzingHistory ? "Thinking..." : "Skin Trends"}
          </motion.button>
          {!showNewEntry && (
            <motion.button
              onClick={() => setShowNewEntry(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: "var(--rose)",
                color: "var(--white)",
                border: "none",
                borderRadius: "10px",
                padding: "0.8rem 1.2rem",
                fontSize: "0.95rem",
                cursor: "pointer",
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                boxShadow: "0 4px 14px rgba(200, 71, 58, 0.2)"
              }}
            >
              <Plus size={18} /> New Entry
            </motion.button>
          )}
        </div>
      </motion.header>

      {/* ✅ SHOW ERROR MESSAGE */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: "#FEF2F2",
            border: "1px solid #FEE2E2",
            borderRadius: "20px",
            padding: "1.25rem 1.5rem",
            marginBottom: "2rem",
            color: "#991B1B",
            fontSize: "0.95rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
            boxShadow: "0 4px 12px rgba(153, 27, 27, 0.05)",
            maxWidth: "800px"
          }}
        >
          <div style={{ flex: 1 }}>
            {error === "UPGRADE_JOURNAL" ? (
              <div>
                <p style={{ margin: "0 0 0.4rem", fontWeight: 700 }}>Daily limit reached</p>
                <p style={{ margin: "0 0 0.8rem", fontSize: "0.9rem", opacity: 0.8 }}>Free users can add 2 entries per day. Upgrade to Pro for 10 daily entries and AI skin analysis.</p>
                <a href="/dashboard/subscription" style={{ color: "#B91C1C", fontWeight: 700, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.2rem" }}>Upgrade to Pro →</a>
              </div>
            ) : (
              <span>{error}</span>
            )}
          </div>
          <button onClick={() => setError(null)} style={{ background: "transparent", border: "none", color: "inherit", cursor: "pointer", opacity: 0.5 }}><X size={20} /></button>
        </motion.div>
      )}

      {/* ✅ AI BRAIN ANALYSIS RESULTS */}
      {historyAnalysis && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          style={{
            background: "#1c1917",
            borderRadius: "24px",
            padding: "2rem",
            marginBottom: "2.5rem",
            color: "white",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 20px 50px rgba(0,0,0,0.12)",
            maxWidth: "800px"
          }}
        >
          <div style={{ position: "absolute", top: "-30px", right: "-30px", opacity: 0.1 }}>
            <Brain size={160} color="white" />
          </div>
          
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Brain size={20} color="#c8473a" />
              <span style={{ fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 700, color: "#c8473a" }}>Mirha Brain Analysis</span>
            </div>
            <button onClick={() => setHistoryAnalysis(null)} style={{ background: "transparent", border: "none", color: "white", opacity: 0.5, cursor: "pointer" }}><X size={18} /></button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "0.5rem", color: "rgba(255,255,255,0.6)", fontSize: "0.85rem" }}>
                <TrendingUp size={14} /> Skin Trend
              </div>
              <p style={{ margin: 0, fontSize: "1.2rem", fontWeight: 500, fontFamily: "var(--dash-font-serif)" }}>{historyAnalysis.trend}</p>
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "0.5rem", color: "rgba(255,255,255,0.6)", fontSize: "0.85rem" }}>
                <Info size={14} /> Observation
              </div>
              <p style={{ margin: 0, fontSize: "1rem", lineHeight: 1.5, opacity: 0.9 }}>{historyAnalysis.observation}</p>
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "0.5rem", color: "rgba(255,255,255,0.6)", fontSize: "0.85rem" }}>
                <Lightbulb size={14} /> Expert Tip
              </div>
              <p style={{ margin: 0, fontSize: "1rem", lineHeight: 1.5, opacity: 0.9, color: "#fbd3d0" }}>{historyAnalysis.tip}</p>
            </div>
          </div>
        </motion.div>
      )}

      {showNewEntry && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: 'var(--white)',
            border: "1px solid var(--rule)",
            borderRadius: "16px",
            padding: "2rem",
            marginBottom: "2rem",
            boxShadow: '0 12px 40px rgba(40, 28, 20, 0.04)',
            maxWidth: "800px"
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h3 style={{ margin: 0, color: "var(--ink)" }}>How is your skin today?</h3>
            <button onClick={() => setShowNewEntry(false)} style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--muted)" }}><X size={20} /></button>
          </div>

          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Skin felt a bit dry..."
            style={{
              width: "100%",
              minHeight: "100px",
              padding: "1rem",
              borderRadius: "8px",
              border: "1px solid var(--rule)",
              background: '#fff',
              color: "var(--ink)",
              outline: "none",
              marginBottom: "1rem"
            }}
          />

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <span style={{ fontSize: "0.9rem", color: "var(--muted)" }}>Rating:</span>
              <div style={{ display: "flex", gap: "5px" }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} onClick={() => setRating(star)} style={{ background: "transparent", border: "none", cursor: "pointer", padding: 0 }}>
                    <Star size={20} fill={star <= rating ? "var(--rose)" : "transparent"} color={star <= rating ? "var(--rose)" : "var(--rule)"} />
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", gap: "0.5rem" }}>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                style={{
                  background: "transparent",
                  border: "1px solid var(--rule)",
                  color: "var(--ink)",
                  padding: "0.6rem 1rem",
                  borderRadius: "8px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontSize: "0.9rem"
                }}
              >
                <Upload size={16} /> Add Photo
              </button>

              {isPro && photoBase64 && !aiAnalysis && (
                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  style={{
                    background: "var(--ink)",
                    color: "var(--white)",
                    border: "none",
                    padding: "0.6rem 1rem",
                    borderRadius: "8px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    fontSize: "0.9rem"
                  }}
                >
                  <Sparkles size={16} /> {isAnalyzing ? "Analyzing..." : "AI Analysis"}
                </button>
              )}

              <button
                onClick={handleSave}
                disabled={!note}
                style={{
                  background: "var(--rose)",
                  color: "var(--white)",
                  border: "none",
                  padding: "0.6rem 1.5rem",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: 500
                }}
              >
                Save Entry
              </button>
            </div>
          </div>

          {photoBase64 && (
            <div style={{ marginTop: "1rem" }}>
              <img src={photoBase64} alt="Skin" style={{ maxHeight: "150px", borderRadius: "8px" }} />
            </div>
          )}

          {aiAnalysis && (
            <div style={{
              marginTop: "1rem",
              padding: "1rem",
              background: '#f9f5ff',
              borderRadius: "8px",
              border: "1px solid #e9d5ff",
              color: "var(--ink)",
              fontSize: "0.95rem",
              display: "flex",
              gap: "0.8rem",
              alignItems: "flex-start"
            }}>
              <Sparkles size={20} color="#9333ea" style={{ flexShrink: 0 }} />
              <p style={{ margin: 0, lineHeight: 1.6 }}>{aiAnalysis}</p>
            </div>
          )}
        </motion.div>
      )}

      <motion.div variants={itemVariants} style={{ display: "flex", flexDirection: "column", gap: "1.2rem", maxWidth: "800px" }}>
        <AnimatePresence>
          {entries.length === 0 && !showNewEntry && (
            <div style={{ padding: "2rem", textAlign: "center", color: "var(--muted)" }}>No journal entries yet. Add one!</div>
          )}
          {entries.map(entry => {
            const dateObj = new Date(entry.date);
            const month = dateObj.toLocaleString('en-US', { month: 'short' });
            const day = dateObj.getDate();

            return (
              <motion.div
                key={entry.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.01 }}
                style={{
                  background: 'var(--white)',
                  border: "1px solid var(--rule)",
                  borderRadius: "16px",
                  padding: "1.5rem",
                  display: "grid",
                  gridTemplateColumns: "100px 1fr auto",
                  gap: "1.5rem",
                  alignItems: "center",
                  boxShadow: '0 4px 20px rgba(40, 28, 20, 0.02)'
                }}
              >
                <div style={{ textAlign: "center", borderRight: "1px solid var(--rule)", paddingRight: "1.5rem" }}>
                  <span style={{ display: "block", color: "var(--rose)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700 }}>
                    {month}
                  </span>
                  <span style={{ display: "block", fontFamily: "'Bebas Neue', sans-serif", fontSize: "2rem", color: "var(--ink)", lineHeight: 1.2 }}>
                    {day}
                  </span>
                </div>

                <div>
                  <p style={{ margin: "0 0 0.8rem", color: "var(--ink)", fontSize: "1rem", lineHeight: 1.6 }}>"{entry.entry}"</p>

                  {entry.photos && entry.photos !== "[]" && (
                    <img src={entry.photos} alt="Photo" style={{ maxHeight: "80px", borderRadius: "8px", marginBottom: "0.8rem" }} />
                  )}

                  {entry.aiAnalysis && (
                    <div style={{ 
                      fontSize: "0.85rem", 
                      color: "#9333ea", 
                      display: "flex", 
                      gap: "0.5rem", 
                      alignItems: "flex-start", 
                      marginBottom: "0.8rem",
                      background: "#f9f5ff",
                      padding: "0.6rem",
                      borderRadius: "8px"
                    }}>
                      <Sparkles size={14} style={{ marginTop: "2px" }} /> 
                      <span>{entry.aiAnalysis}</span>
                    </div>
                  )}

                  <div style={{ display: "flex", gap: "2px" }}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill={i < entry.rating ? "var(--rose)" : "transparent"} color={i < entry.rating ? "var(--rose)" : "var(--rule)"} />
                    ))}
                  </div>
                </div>

                <button style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--muted)",
                  padding: "0.5rem"
                }}>
                  <MoreVertical size={20} />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
