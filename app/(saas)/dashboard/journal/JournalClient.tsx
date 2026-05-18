"use client";

import { useState, useTransition, useRef, useMemo } from "react";
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

  // Calculate Streaks and Compliance
  const streakInfo = useMemo(() => {
    if (entries.length === 0) return { streak: 0, compliance: 0, calendarGrid: [] };

    // Calculate streak
    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const entryDates = entries.map(e => {
      const d = new Date(e.date);
      d.setHours(0, 0, 0, 0);
      return d.getTime();
    });

    const uniqueEntryDates = Array.from(new Set(entryDates));

    const hasToday = uniqueEntryDates.includes(today.getTime());
    
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const hasYesterday = uniqueEntryDates.includes(yesterday.getTime());

    if (hasToday || hasYesterday) {
      let currentCheck = new Date(hasToday ? today : yesterday);
      while (uniqueEntryDates.includes(currentCheck.getTime())) {
        streak++;
        currentCheck.setDate(currentCheck.getDate() - 1);
      }
    }

    // Build past 30 days contribution calendar grid
    const calendarGrid = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);

      const dayEntry = entries.find(e => {
        const d = new Date(e.date);
        d.setHours(0, 0, 0, 0);
        return d.getTime() === date.getTime();
      });

      calendarGrid.push({
        date: new Date(date),
        rating: dayEntry ? dayEntry.rating : 0,
        hasPhoto: dayEntry && dayEntry.photos && dayEntry.photos !== "[]" && dayEntry.photos.length > 5
      });
    }

    // Compliance = percentage of days tracked out of last 30
    const activeDays = calendarGrid.filter(d => d.rating > 0).length;
    const compliance = Math.round((activeDays / 30) * 100);

    return { streak, compliance, calendarGrid };
  }, [entries]);

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
        setError((result as any).error);
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
      const result: any = await getJournalAnalysis();
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
      <style>{`
        .journal-card {
          background: var(--white);
          border: 1px solid var(--rule);
          border-radius: 16px;
          padding: 1.5rem;
          display: grid;
          grid-template-columns: 100px 1fr auto;
          gap: 1.5rem;
          align-items: center;
          box-shadow: 0 4px 20px rgba(40, 28, 20, 0.02);
          transition: all 0.2s ease;
        }

        .journal-date-col {
          text-align: center;
          border-right: 1px solid var(--rule);
          padding-right: 1.5rem;
        }

        @media (max-width: 600px) {
          .journal-card {
            grid-template-columns: 1fr;
            gap: 1rem;
            padding: 1.2rem;
          }

          .journal-date-col {
            display: flex;
            align-items: center;
            gap: 0.8rem;
            border-right: none !important;
            padding-right: 0 !important;
            border-bottom: 1px solid var(--rule);
            padding-bottom: 0.8rem;
            text-align: left !important;
          }

          .journal-date-month {
            margin: 0 !important;
          }

          .journal-date-day {
            font-size: 1.5rem !important;
          }
        }
      `}</style>
      <motion.header variants={itemVariants} style={{ 
        marginBottom: "2.5rem", 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "flex-start",
        flexWrap: "wrap",
        gap: "1.2rem"
      }}>
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
        <div style={{ display: "flex", gap: "0.8rem", flexWrap: "wrap" }}>
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

      {/* Dynamic Consistency & Streak Card */}
      <motion.div
        variants={itemVariants}
        style={{
          background: 'var(--white)',
          border: '1px solid var(--rule)',
          borderRadius: '24px',
          padding: '24px',
          marginBottom: '2.5rem',
          boxShadow: '0 8px 30px rgba(40, 28, 20, 0.03)',
          maxWidth: '800px',
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px', marginBottom: '24px' }}>
          {/* Streak Counter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '14px',
              background: '#fff3f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem',
              color: 'var(--rose)',
            }}>
              🔥
            </div>
            <div style={{ textAlign: 'left' }}>
              <span style={{ display: 'block', fontSize: '11px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
                Current Streak
              </span>
              <span style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--ink)' }}>
                {streakInfo.streak} {streakInfo.streak === 1 ? 'Day' : 'Days'}
              </span>
            </div>
          </div>

          {/* Compliance */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '14px',
              background: '#edf7f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem',
              color: '#2d7a4f',
            }}>
              🎯
            </div>
            <div style={{ textAlign: 'left' }}>
              <span style={{ display: 'block', fontSize: '11px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
                30-Day Compliance
              </span>
              <span style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--ink)' }}>
                {streakInfo.compliance}%
              </span>
            </div>
          </div>

          {/* Photo Entries */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '14px',
              background: '#f5f0ff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem',
              color: '#7c3aed',
            }}>
              📷
            </div>
            <div style={{ textAlign: 'left' }}>
              <span style={{ display: 'block', fontSize: '11px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
                Logged Progress
              </span>
              <span style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--ink)' }}>
                {entries.filter(e => e.photos && e.photos !== "[]" && e.photos.length > 5).length} Photos
              </span>
            </div>
          </div>
        </div>

        {/* Consistency Grid */}
        <div style={{ borderTop: '1px solid var(--rule)', paddingTop: '20px' }}>
          <p style={{ margin: '0 0 14px', fontSize: '12px', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '6px', textAlign: 'left' }}>
            <Calendar size={14} /> Skin Consistency Heatmap (Last 30 Days)
          </p>
          <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '8px' }}>
            {streakInfo.calendarGrid.map((day, idx) => {
              // Color based on rating
              let bg = '#f4f0ec'; // Empty
              let title = `No entry on ${day.date.toLocaleDateString()}`;
              if (day.rating > 0) {
                const ratingColors = [
                  '#fbe9e7', // 1 star
                  '#ffccbc', // 2 star
                  '#ffab91', // 3 star
                  '#ff8a65', // 4 star
                  '#c8473a', // 5 star (glowing brand red!)
                ];
                bg = ratingColors[day.rating - 1];
                title = `Rating: ${day.rating} Stars on ${day.date.toLocaleDateString()}${day.hasPhoto ? ' (Photo logged)' : ''}`;
              }

              return (
                <div
                  key={idx}
                  title={title}
                  style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '4px',
                    background: bg,
                    flexShrink: 0,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '9px',
                    position: 'relative',
                    transition: 'transform 0.2s',
                    border: day.hasPhoto ? '1px solid #7c3aed' : 'none',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  {day.hasPhoto && (
                    <span style={{ fontSize: '7px', position: 'absolute', bottom: '-2px', right: '-2px' }}>📷</span>
                  )}
                </div>
              );
            })}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
            <span style={{ fontSize: '10px', color: 'var(--muted)' }}>30 Days Ago</span>
            <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
              <span style={{ fontSize: '9px', color: 'var(--muted)' }}>Dull</span>
              <div style={{ width: '10px', height: '10px', background: '#fbe9e7', borderRadius: '2px' }} />
              <div style={{ width: '10px', height: '10px', background: '#ffccbc', borderRadius: '2px' }} />
              <div style={{ width: '10px', height: '10px', background: '#ffab91', borderRadius: '2px' }} />
              <div style={{ width: '10px', height: '10px', background: '#ff8a65', borderRadius: '2px' }} />
              <div style={{ width: '10px', height: '10px', background: '#c8473a', borderRadius: '2px' }} />
              <span style={{ fontSize: '9px', color: 'var(--muted)' }}>Glowing</span>
            </div>
            <span style={{ fontSize: '10px', color: 'var(--muted)' }}>Today</span>
          </div>
        </div>
      </motion.div>

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
                className="journal-card"
              >
                <div className="journal-date-col">
                  <span className="journal-date-month" style={{ display: "block", color: "var(--rose)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700 }}>
                    {month}
                  </span>
                  <span className="journal-date-day" style={{ display: "block", fontFamily: "'Bebas Neue', sans-serif", fontSize: "2rem", color: "var(--ink)", lineHeight: 1.2 }}>
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
                    {[...Array(5)].map((_: any, i: number) => (
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
