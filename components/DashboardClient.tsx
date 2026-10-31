"use client";

import { motion } from "framer-motion";
import { CheckCircle2, CalendarPlus, ChevronRight, LogOut, BrainCircuit, Lock, Sun, Moon, Layers, RefreshCw, SlidersHorizontal, ArrowRight, ShieldAlert, ScanFace, Check } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { logoutAction, toggleRoutineStep, getJournalAnalysis, saveJournalEntry, loadDefaultRoutines, updateRoutine } from "@/app/(saas)/actions";
import { DashboardStats } from "./DashboardStats";

const MONTHS_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatJournalDateSafe(d: Date | string | null | undefined): string {
  if (!d) return "";
  try {
    const date = typeof d === "string" ? new Date(d) : d;
    if (isNaN(date.getTime())) return "";
    return `${MONTHS_SHORT[date.getUTCMonth()]} ${date.getUTCDate()}`;
  } catch {
    return "";
  }
}

export function DashboardClient({ user, routines, recentJournal, stats }: any) {
 const today = new Date().toISOString().split("T")[0];
 
 // Dynamic greeting based on hour
 const [greeting, setGreeting] = useState("Good Morning");
 const [coachInsight, setCoachInsight] = useState<{ trend: string; observation: string; tip: string } | null>(null);
 const [coachStatus, setCoachStatus] = useState<"loading" | "unlocked" | "need_pro" | "need_data">("loading");
 
 useEffect(() => {
 const hour = new Date().getHours();
 if (hour >= 17) setGreeting("Good Evening");
 else if (hour >= 12) setGreeting("Good Afternoon");
 else setGreeting("Good Morning");
 }, []);

 useEffect(() => {
 async function loadCoach() {
 try {
 const res = await getJournalAnalysis();
 if (!res) {
 setCoachStatus("need_pro");
 } else if ("error" in res) {
 if (res.error === "UPGRADE_PRO") {
 setCoachStatus("need_pro");
 } else if (res.error === "NOT_ENOUGH_DATA") {
 setCoachStatus("need_data");
 } else {
 setCoachStatus("need_pro");
 }
 } else {
 setCoachInsight(res as { trend: string; observation: string; tip: string });
 setCoachStatus("unlocked");
 }
 } catch (e) {
 console.error("Failed to load coach insights", e);
 setCoachStatus("need_pro");
 }
 }
 loadCoach();
 }, []);
 
  const [localRoutines, setLocalRoutines] = useState<any[]>(Array.isArray(routines) ? routines : []);
  const [activeRoutineIdx, setActiveRoutineIdx] = useState<number>(() => {
    const list = Array.isArray(routines) ? routines : [];
    if (list.length === 0) return 0;
    const hour = new Date().getHours();
    if (hour >= 17) {
      const pm = list.findIndex((r: any) => /evening|pm|night/i.test(r.name));
      if (pm !== -1) return pm;
    } else {
      const am = list.findIndex((r: any) => /morning|am/i.test(r.name));
      if (am !== -1) return am;
    }
    return 0;
  });
  const [isLoadingDefaults, setIsLoadingDefaults] = useState(false);

  useEffect(() => {
    if (Array.isArray(routines)) {
      setLocalRoutines(routines);
    }
  }, [routines]);

  const handleLoadDefaults = async () => {
    setIsLoadingDefaults(true);
    try {
      const res = await loadDefaultRoutines();
      if (res?.success && res.routines) {
        setLocalRoutines(res.routines);
        setActiveRoutineIdx(0);
      }
    } catch (e) {
      console.error("Failed to load defaults", e);
    } finally {
      setIsLoadingDefaults(false);
    }
  };

  const handleLoadRecommendedForCurrent = async (routine: any) => {
    if (!routine?.id) return;
    const isPM = /evening|pm|night/i.test(routine.name);
    const steps = isPM ? [
      "Double Cleanse: Bioderma Sensibio H2O Micellar Water",
      "Gentle Wash: CeraVe Hydrating Facial Cleanser",
      "Night Nourish: Formularx Barrier Relief Peptide Cream"
    ] : [
      "Cleanser: COSRX Low pH Good Morning Gel Cleanser",
      "Moisturizer: Sebamed Clear Face Care Gel",
      "Sunscreen: SKIN1004 Madagascar Centella Hyalu-Cica Water-Fit Sun Serum SPF50+"
    ];

    setLocalRoutines((prev: any[]) =>
      prev.map((r: any) => r.id === routine.id ? { ...r, steps } : r)
    );

    try {
      await updateRoutine(routine.id, routine.name, steps);
    } catch (e) {
      console.error("Failed to load recommended steps for routine:", e);
    }
  };

  const [checkedStepsMap, setCheckedStepsMap] = useState<Record<string, number[]>>({});
  const [quickRating, setQuickRating] = useState<number>(0);
  const [quickHover, setQuickHover] = useState<number>(0);
  const [quickSubmitting, setQuickSubmitting] = useState(false);
  const [quickDone, setQuickDone] = useState(false);

  useEffect(() => {
    if (localRoutines && localRoutines.length > 0) {
      const newMap: Record<string, number[]> = {};
      localRoutines.forEach((r: any) => {
        newMap[r.id] = r.metadata?.logs?.[today] || [];
      });
      setCheckedStepsMap(newMap);
    } else {
      setCheckedStepsMap({});
    }
  }, [localRoutines, today]);

  const toggleStep = async (routineId: string, index: number) => {
    if (!routineId) return;

    const currentChecked = checkedStepsMap[routineId] || [];
    const isChecked = currentChecked.includes(index);
    const newCheckedSteps = isChecked 
      ? currentChecked.filter(i => i !== index)
      : [...currentChecked, index];

    // Optimistic update
    setCheckedStepsMap(prev => ({
      ...prev,
      [routineId]: newCheckedSteps
    }));

    if (routineId === "demo") {
      return;
    }

    try {
      await toggleRoutineStep(routineId, index, !isChecked);
    } catch (error) {
      console.error("Failed to toggle step:", error);
      setCheckedStepsMap(prev => ({
        ...prev,
        [routineId]: currentChecked
      }));
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
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  };

  const realRoutines = Array.isArray(localRoutines) ? localRoutines : (Array.isArray(routines) ? routines : []);
  const hasRoutine = realRoutines.length > 0;
  const totalRoutineSteps = realRoutines.reduce((total: number, routine: any) => {
    return total + (Array.isArray(routine.steps) ? routine.steps.length : 0);
  }, 0);
  const completedRoutineSteps = realRoutines.reduce((total: number, routine: any) => {
    return total + (checkedStepsMap[routine.id]?.length || 0);
  }, 0);
  const hasCompletedRoutineToday = totalRoutineSteps > 0 && completedRoutineSteps >= totalRoutineSteps;
  const hasJournalToday = recentJournal
    ? new Date(recentJournal.date).toISOString().split("T")[0] === today
    : false;
  const primaryAction = !hasRoutine
    ? { href: "/dashboard/routines", label: "Build routine", helper: "Create your first saved AM/PM plan." }
    : !hasCompletedRoutineToday
      ? { href: "#today-routine", label: "Complete routine", helper: `${completedRoutineSteps}/${totalRoutineSteps} steps done today.` }
      : !hasJournalToday
        ? { href: "/dashboard/journal", label: "Log skin", helper: "Capture how your skin reacted today." }
        : coachStatus === "need_pro"
          ? { href: "/dashboard/subscription", label: "Unlock trends", helper: "Turn your logs into weekly AI insight." }
          : { href: "/dashboard/analysis", label: "Refresh scan", helper: "Check barrier, acne, redness, and oiliness." };
  const planSteps = [
    {
      title: "Complete routine",
      detail: hasRoutine ? `${completedRoutineSteps}/${totalRoutineSteps} steps checked` : "Build a routine first",
      done: hasCompletedRoutineToday,
      href: hasRoutine ? "#today-routine" : "/dashboard/routines",
    },
    {
      title: "Log skin condition",
      detail: hasJournalToday ? "Journal updated today" : "Add rating, notes, and photos",
      done: hasJournalToday,
      href: "/dashboard/journal",
    },
    {
      title: "Check product conflict",
      detail: "Catch active clashes before layering",
      done: false,
      href: "/dashboard/conflicts",
    },
    {
      title: "Review AI insight",
      detail: coachStatus === "unlocked" ? "Trend insight ready" : "Needs Pro or more journal data",
      done: coachStatus === "unlocked",
      href: coachStatus === "need_pro" ? "/dashboard/subscription" : "/dashboard/analysis",
    },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={containerVariants}
    >
      {/* MOBILE HEADER WITH LOGO AND SIGN OUT */}
      <div className="mobile-only" style={{ 
        display: "none", 
        padding: "1rem 0",
        marginBottom: "0.5rem"
      }}>
        <div style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          marginBottom: "1rem"
        }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <span style={{ 
              fontFamily: "var(--dash-font-serif)", 
              fontSize: "1.2rem", 
              fontWeight: 700, 
              color: "var(--dash-ink)",
              letterSpacing: "-0.02em"
            }}>
              Mirha <span style={{ color: "var(--dash-accent)" }}>& Co.</span>
            </span>
          </Link>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => logoutAction()}
            className="dash-signout-btn"
            style={{
              borderRadius: "12px",
              padding: "0.5rem 0.8rem",
              fontSize: "0.75rem",
              cursor: "pointer",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: "0.35rem",
              transition: "all 0.2s",
              boxShadow: "0 2px 6px rgba(0,0,0,0.02)"
            }}
          >
            <LogOut size={13} /> Sign Out
          </motion.button>
        </div>
      </div>

      <style>{`
        .dash-signout-btn {
          background: var(--dash-surface);
          border: 1px solid var(--dash-border);
          color: var(--dash-ink);
        }
        .dash-signout-btn:hover {
          background: var(--dash-bg);
          border-color: var(--dash-muted);
        }
        @media (max-width: 768px) {
          .mobile-only { display: block !important; }
          .desktop-only { display: none !important; }
          .dash-header-card {
            padding: 1.5rem !important;
            margin-bottom: 2rem !important;
            border-radius: 28px !important;
          }
          .dash-plan-section,
          .dash-routine-hero {
            padding: 1.25rem !important;
            margin-bottom: 2rem !important;
            border-radius: 24px !important;
            width: 100% !important;
            max-width: 100% !important;
            box-sizing: border-box !important;
          }
          .dash-coach-card {
            padding: 1.5rem !important;
            margin-bottom: 2rem !important;
            border-radius: 24px !important;
          }
          .dash-bottom-card {
            padding: 1.5rem !important;
            border-radius: 24px !important;
          }
        }
        @media (max-width: 480px) {
          .dash-header-card {
            padding: 1.2rem !important;
            margin-bottom: 1.5rem !important;
            border-radius: 20px !important;
          }
          .dash-plan-section,
          .dash-routine-hero {
            padding: 1rem !important;
            margin-bottom: 1.5rem !important;
            border-radius: 18px !important;
          }
          .dash-coach-card {
            padding: 1.2rem !important;
            margin-bottom: 1.5rem !important;
            border-radius: 18px !important;
          }
          .dash-bottom-card {
            padding: 1.2rem !important;
            border-radius: 18px !important;
          }
          /* Quick-journal 1-5 buttons on small phones */
          .dash-quick-rate-row {
            gap: 5px !important;
          }
          .dash-quick-rate-row button {
            height: 40px !important;
            font-size: 0.8rem !important;
          }
        }
      `}</style>

      {/* Real stats wired and compact */}
      <DashboardStats stats={stats} />

      <motion.header className="dash-header-card" variants={itemVariants} style={{ 
        marginBottom: "2.5rem", 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        flexWrap: "wrap",
        gap: "1.2rem",
        position: "relative",
        padding: "2rem",
        background: "url('/indian_skincare_aesthetic.png') center right / cover no-repeat",
        borderRadius: "32px",
        overflow: "hidden",
        border: "1px solid var(--dash-border)"
      }}>
        <div style={{ 
          position: "absolute", 
          inset: 0, 
          background: "linear-gradient(90deg, rgba(255,255,255,1) 30%, rgba(255,255,255,0.7) 60%, rgba(255,255,255,0) 100%)",
          zIndex: 1
        }}></div>

        <div style={{ flex: 1, minWidth: "0", position: "relative", zIndex: 2 }}>
          <h1 style={{
            fontFamily: "var(--dash-font-serif)",
            fontSize: "var(--font-h1)",
            fontWeight: 400,
            margin: "0 0 0.4rem",
            color: "var(--dash-ink)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em"
          }}>
            {greeting}, {user?.name ? user.name.split(' ')[0] : "Beautiful"}
          </h1>
          <p style={{ color: "var(--dash-muted)", margin: 0, fontSize: "clamp(0.85rem, 2vw, 1rem)", opacity: 0.8 }}>Here is your skin overview for today.</p>
        </div>

        <div className="desktop-only" style={{ position: "relative", zIndex: 2 }}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => logoutAction()}
            className="dash-signout-btn"
            style={{
              borderRadius: "14px",
              padding: "0.6rem 1rem",
              fontSize: "0.8rem",
              cursor: "pointer",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              transition: "all 0.2s",
              boxShadow: "0 2px 6px rgba(0,0,0,0.02)"
            }}
          >
            <LogOut size={14} /> Sign Out
          </motion.button>
        </div>
      </motion.header>

      {/* TODAY'S SKINCARE ROUTINE (PRIMARY INTERACTIVE HERO) */}
      <motion.section
        className="dash-routine-hero"
        variants={itemVariants}
        id="today-routine"
        style={{
          background: "var(--dash-surface)",
          border: "1px solid var(--dash-border)",
          borderRadius: "28px",
          padding: "1.75rem",
          marginBottom: "2.5rem",
          boxShadow: "0 18px 42px rgba(40, 28, 20, 0.05)",
          position: "relative",
          overflow: "hidden"
        }}
      >
        {/* Header row with Title and Customize Button */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "0.75rem",
          marginBottom: "1.25rem"
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", marginBottom: "0.25rem" }}>
              <span style={{
                color: "var(--dash-accent)",
                fontSize: "0.68rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                fontWeight: 700
              }}>DAILY CHECKLIST</span>
              <span style={{
                background: "var(--dash-accent-soft)",
                color: "var(--dash-accent)",
                fontSize: "0.7rem",
                fontWeight: 700,
                padding: "2px 7px",
                borderRadius: "8px"
              }}>
                Interactive
              </span>
            </div>
            <h2 style={{
              fontFamily: "var(--dash-font-serif)",
              fontSize: "clamp(1.35rem, 3.5vw, 1.9rem)",
              fontWeight: 400,
              margin: 0,
              color: "var(--dash-ink)",
              lineHeight: 1.2
            }}>
              Today&apos;s Skincare Routine
            </h2>
          </div>

          <Link href="/dashboard/routines" style={{ textDecoration: "none", flexShrink: 0 }}>
            <button
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.5rem 0.85rem",
                borderRadius: "12px",
                border: "1px solid var(--dash-border)",
                background: "var(--dash-surface)",
                color: "var(--dash-ink)",
                fontSize: "0.8rem",
                fontWeight: 600,
                cursor: "pointer",
                whiteSpace: "nowrap",
                boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
                transition: "all 0.15s ease"
              }}
            >
              <SlidersHorizontal size={13} />
              <span>Customize</span>
            </button>
          </Link>
        </div>

        {/* Full-width AM / PM switcher tabs (No line breaks, smooth horizontal scroll) */}
        {realRoutines.length > 0 && (
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "0.45rem",
            background: "var(--dash-bg)",
            padding: "4px",
            borderRadius: "16px",
            border: "1px solid var(--dash-border)",
            marginBottom: "1.35rem",
            overflowX: "auto",
            scrollbarWidth: "none",
            WebkitOverflowScrolling: "touch",
            width: "100%",
            boxSizing: "border-box"
          }}>
            {realRoutines.map((routine: any, idx: number) => {
              const isActive = idx === activeRoutineIdx;
              const isPM = /evening|pm|night/i.test(routine.name);
              const isAM = /morning|am/i.test(routine.name);
              const checkedCount = (checkedStepsMap[routine.id] || []).length;
              const totalCount = Array.isArray(routine.steps) ? routine.steps.length : 0;
              const shortLabel = isAM ? "Morning (AM)" : isPM ? "Evening (PM)" : routine.name.replace(/\s+regimen/i, "").trim();
              
              return (
                <button
                  key={routine.id || idx}
                  onClick={() => setActiveRoutineIdx(idx)}
                  style={{
                    flex: realRoutines.length <= 2 ? 1 : "0 0 auto",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.45rem",
                    padding: "0.55rem 0.95rem",
                    borderRadius: "12px",
                    border: "none",
                    background: isActive ? "var(--dash-surface)" : "transparent",
                    color: isActive ? "var(--dash-ink)" : "var(--dash-muted)",
                    fontWeight: isActive ? 700 : 500,
                    fontSize: "0.82rem",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    boxShadow: isActive ? "0 2px 8px rgba(0,0,0,0.06)" : "none",
                    transition: "all 0.15s ease",
                    touchAction: "manipulation"
                  }}
                >
                  {isAM ? <Sun size={14} color={isActive ? "#f59e0b" : "currentColor"} /> : isPM ? <Moon size={14} color={isActive ? "#8b5cf6" : "currentColor"} /> : <Layers size={14} />}
                  <span>{shortLabel}</span>
                  {totalCount > 0 && (
                    <span style={{
                      fontSize: "0.72rem",
                      padding: "1px 6px",
                      borderRadius: "10px",
                      background: checkedCount === totalCount && totalCount > 0 ? "rgba(16, 185, 129, 0.15)" : "var(--dash-border)",
                      color: checkedCount === totalCount && totalCount > 0 ? "#10b981" : "inherit",
                      fontWeight: 600
                    }}>
                      {checkedCount}/{totalCount}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Content Area: Empty State vs Active Checklist */}
        {realRoutines.length === 0 ? (
          <div style={{
            background: "var(--dash-bg)",
            border: "1px dashed var(--dash-border)",
            borderRadius: "22px",
            padding: "2.5rem 1.5rem",
            textAlign: "center",
            maxWidth: "600px",
            margin: "0 auto"
          }}>
            <div style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              background: "var(--dash-accent-soft)",
              color: "var(--dash-accent)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1rem"
            }}>
              <Layers size={24} />
            </div>
            <h3 style={{ fontSize: "1.2rem", color: "var(--dash-ink)", margin: "0 0 0.5rem", fontWeight: 600 }}>
              No Routines Saved Yet
            </h3>
            <p style={{ color: "var(--dash-muted)", fontSize: "0.9rem", lineHeight: 1.6, margin: "0 0 1.5rem" }}>
              Start with our science-backed Morning &amp; Evening templates, or customize your own product formulations.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "0.8rem", flexWrap: "wrap" }}>
              <button
                onClick={handleLoadDefaults}
                disabled={isLoadingDefaults}
                style={{
                  background: "var(--dash-accent)",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "14px",
                  padding: "0.75rem 1.4rem",
                  fontSize: "0.88rem",
                  fontWeight: 600,
                  cursor: isLoadingDefaults ? "not-allowed" : "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  boxShadow: "0 8px 20px rgba(252, 39, 121, 0.25)"
                }}
              >
                <RefreshCw size={15} className={isLoadingDefaults ? "animate-spin" : ""} />
                {isLoadingDefaults ? "Loading Templates..." : "Load Recommended AM & PM"}
              </button>
              <Link href="/dashboard/routines" style={{ textDecoration: "none" }}>
                <button
                  style={{
                    background: "var(--dash-surface)",
                    color: "var(--dash-ink)",
                    border: "1px solid var(--dash-border)",
                    borderRadius: "14px",
                    padding: "0.75rem 1.25rem",
                    fontSize: "0.88rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem"
                  }}
                >
                  Build Custom Routine <ArrowRight size={15} />
                </button>
              </Link>
            </div>
          </div>
        ) : (() => {
          const currentRoutine = realRoutines[activeRoutineIdx] || realRoutines[0];
          const steps: string[] = currentRoutine?.steps || [];
          const routineId = currentRoutine?.id;
          const checkedSteps = routineId ? (checkedStepsMap[routineId] || []) : [];
          const progressPercent = steps.length > 0 ? Math.round((checkedSteps.length / steps.length) * 100) : 0;
          const isComplete = steps.length > 0 && checkedSteps.length === steps.length;

          if (steps.length === 0) {
            const isPM = /evening|pm|night/i.test(currentRoutine?.name || "");
            return (
              <div style={{
                background: "var(--dash-bg)",
                border: "1px dashed var(--dash-border)",
                borderRadius: "20px",
                padding: "2.2rem 1.5rem",
                textAlign: "center"
              }}>
                <h4 style={{ margin: "0 0 0.35rem", fontSize: "1.05rem", color: "var(--dash-ink)", fontWeight: 600 }}>
                  No Products in this {isPM ? "Evening" : "Morning"} Routine
                </h4>
                <p style={{ color: "var(--dash-muted)", fontSize: "0.88rem", maxWidth: "420px", margin: "0 auto 1.35rem", lineHeight: 1.5 }}>
                  {isPM 
                    ? "Add your nighttime double cleanse, serums, and barrier night cream."
                    : "Add your morning gentle cleanser, hydration, and SPF50+."
                  }
                </p>
                <div style={{ display: "flex", gap: "0.6rem", justifyContent: "center", flexWrap: "wrap" }}>
                  <button
                    onClick={() => handleLoadRecommendedForCurrent(currentRoutine)}
                    style={{
                      background: "var(--dash-accent)",
                      color: "#fff",
                      border: "none",
                      padding: "0.65rem 1.25rem",
                      borderRadius: "14px",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.45rem",
                      boxShadow: "0 4px 14px rgba(252, 39, 121, 0.25)"
                    }}
                  >
                    <RefreshCw size={14} /> Load Recommended Steps
                  </button>
                  <Link href="/dashboard/routines" style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    background: "var(--dash-surface)",
                    border: "1px solid var(--dash-border)",
                    color: "var(--dash-ink)",
                    padding: "0.65rem 1.15rem",
                    borderRadius: "14px",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    textDecoration: "none"
                  }}>
                    Open Routine Builder <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            );
          }

          return (
            <div>
              {/* Progress Bar */}
              <div style={{ marginBottom: "1.25rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                  <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--dash-ink)" }}>
                    {isComplete ? "All steps finished for today! 🎉" : `${checkedSteps.length} of ${steps.length} steps completed`}
                  </span>
                  <span style={{ fontSize: "0.82rem", fontWeight: 700, color: isComplete ? "#10b981" : "var(--dash-accent)" }}>
                    {progressPercent}%
                  </span>
                </div>
                <div style={{
                  height: "8px",
                  width: "100%",
                  background: "var(--dash-bg)",
                  borderRadius: "999px",
                  overflow: "hidden",
                  border: "1px solid var(--dash-border)"
                }}>
                  <div style={{
                    height: "100%",
                    width: `${progressPercent}%`,
                    background: isComplete ? "#10b981" : "linear-gradient(90deg, var(--dash-accent) 0%, #f43f5e 100%)",
                    borderRadius: "999px",
                    transition: "width 0.3s ease"
                  }} />
                </div>
              </div>

              {/* Steps List */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "0.85rem",
                marginBottom: "1.25rem"
              }}>
                {steps.map((step: string, idx: number) => {
                  const isChecked = checkedSteps.includes(idx);
                  const [category, ...rest] = step.includes(":") ? step.split(":") : ["Step", step];
                  const productName = rest.join(":").trim() || step;

                  return (
                    <div
                      key={idx}
                      onClick={() => routineId && toggleStep(routineId, idx)}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "0.85rem",
                        padding: "0.9rem 1rem",
                        borderRadius: "18px",
                        background: isChecked ? "var(--dash-bg)" : "var(--dash-surface)",
                        border: isChecked ? "1px solid transparent" : "1px solid var(--dash-border)",
                        cursor: "pointer",
                        transition: "all 0.15s ease",
                        boxShadow: isChecked ? "none" : "0 2px 8px rgba(0,0,0,0.02)",
                        opacity: isChecked ? 0.75 : 1
                      }}
                    >
                      <div style={{
                        width: "22px",
                        height: "22px",
                        borderRadius: "7px",
                        border: isChecked ? "none" : "2px solid var(--dash-border)",
                        background: isChecked ? "#10b981" : "transparent",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                        flexShrink: 0,
                        marginTop: "2px",
                        transition: "all 0.15s ease"
                      }}>
                        {isChecked && <Check size={14} strokeWidth={3} />}
                      </div>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.15rem" }}>
                          <span style={{
                            fontSize: "0.68rem",
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                            fontWeight: 700,
                            color: "var(--dash-muted)"
                          }}>
                            {step.includes(":") ? category.trim() : `Step ${idx + 1}`}
                          </span>
                        </div>
                        <div style={{
                          fontSize: "0.92rem",
                          fontWeight: isChecked ? 400 : 600,
                          color: isChecked ? "var(--dash-muted)" : "var(--dash-ink)",
                          textDecoration: isChecked ? "line-through" : "none",
                          lineHeight: 1.4,
                          wordBreak: "break-word"
                        }}>
                          {productName}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Sub-footer quick helpers */}
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "0.8rem",
                paddingTop: "0.85rem",
                borderTop: "1px solid var(--dash-border)",
                fontSize: "0.82rem",
                color: "var(--dash-muted)"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span>Tip: Click any step to check off as you apply products.</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <Link href="/dashboard/conflicts" style={{ color: "var(--dash-accent)", textDecoration: "none", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "0.3rem" }}>
                    Scan for ingredient clashes <ArrowRight size={12} />
                  </Link>
                  <Link href="/dashboard/routines" style={{ color: "var(--dash-ink)", textDecoration: "none", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "0.3rem" }}>
                    Edit steps <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </div>
          );
        })()}
      </motion.section>

      {/* AI Skincare Coach Card */}
      <motion.div className="dash-coach-card" variants={itemVariants} style={{
        background: "linear-gradient(135deg, #1c1917 0%, #292524 100%)",
        color: "white",
        borderRadius: "28px",
        padding: "2rem",
        marginBottom: "2.5rem",
        position: "relative",
        overflow: "hidden",
        border: "1px solid rgba(255, 255, 255, 0.05)",
        boxShadow: "0 20px 40px rgba(0,0,0,0.12)"
      }}>
        <div style={{ position: "absolute", top: "-10px", right: "-10px", opacity: 0.08 }}>
          <BrainCircuit size={120} color="white" />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem" }}>
          <BrainCircuit size={18} color="#fc2779" />
          <span style={{ fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 700, color: "#fc2779" }}>AI Skincare Coach</span>
        </div>

        {coachStatus === "loading" && (
          <div>
            <p style={{ margin: 0, fontStyle: "italic", opacity: 0.7, fontSize: "0.95rem" }}>Generating weekly routine observations...</p>
            <div style={{ height: "3px", width: "100%", background: "rgba(255,255,255,0.1)", borderRadius: "2px", marginTop: "1rem", overflow: "hidden" }}>
              <div style={{ height: "100%", width: "40%", background: "#fc2779", borderRadius: "2px", animation: "loadingMove 1.5s infinite linear" }}></div>
            </div>
          </div>
        )}

        {coachStatus === "need_pro" && (
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1.2rem" }}>
            <div style={{ flex: 1, minWidth: "240px" }}>
              <h4 style={{ margin: 0, fontSize: "1.2rem", fontFamily: "var(--dash-font-serif)", fontWeight: 400 }}>Unlock Weekly AI Skincare Coaching</h4>
              <p style={{ margin: "0.4rem 0 0", color: "#a89f97", fontSize: "0.85rem", lineHeight: 1.5 }}>
                Get automated routines optimizations, checklist compliance insights, and personalized advice powered by Gemini.
              </p>
            </div>
            <Link href="/dashboard/subscription" style={{ textDecoration: "none" }}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: "#fc2779",
                  color: "white",
                  border: "none",
                  borderRadius: "14px",
                  padding: "0.75rem 1.25rem",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  boxShadow: "0 4px 12px rgba(252, 39, 121, 0.3)"
                }}
              >
                <Lock size={14} /> Upgrade to Pro
              </motion.button>
            </Link>
          </div>
        )}

        {coachStatus === "need_data" && (
          <div>
            <h4 style={{ margin: 0, fontSize: "1.2rem", fontFamily: "var(--dash-font-serif)", fontWeight: 400 }}>Awaiting Skin Entries</h4>
            <p style={{ margin: "0.4rem 0 0", color: "#a89f97", fontSize: "0.85rem", lineHeight: 1.5 }}>
              Please add at least <strong>3 daily entries</strong> in your Skin Journal so the coach can analyze your skin trends and checklist compliance.
            </p>
            <Link href="/dashboard/journal" style={{ textDecoration: "none", display: "inline-block", marginTop: "1rem" }}>
              <span style={{ color: "#fc2779", fontSize: "0.85rem", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.2rem" }}>
                Go to Journal &rarr;
              </span>
            </Link>
          </div>
        )}

        {coachStatus === "unlocked" && coachInsight && (
          <div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {coachInsight.trend && (
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                  <span style={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    color: "#a89f97"
                  }}>
                    Recent Trend:
                  </span>
                  <span style={{
                    background: coachInsight.trend.toLowerCase().includes("improv")
                      ? "rgba(16, 185, 129, 0.2)"
                      : coachInsight.trend.toLowerCase().includes("irritat")
                        ? "rgba(239, 68, 68, 0.2)"
                        : "rgba(245, 158, 11, 0.2)",
                    color: coachInsight.trend.toLowerCase().includes("improv")
                      ? "#34d399"
                      : coachInsight.trend.toLowerCase().includes("irritat")
                        ? "#f87171"
                        : "#fbbf24",
                    border: coachInsight.trend.toLowerCase().includes("improv")
                      ? "1px solid rgba(16, 185, 129, 0.3)"
                      : coachInsight.trend.toLowerCase().includes("irritat")
                        ? "1px solid rgba(239, 68, 68, 0.3)"
                        : "1px solid rgba(245, 158, 11, 0.3)",
                    padding: "4px 12px",
                    borderRadius: "20px",
                    fontSize: "0.8rem",
                    fontWeight: 600
                  }}>
                    {coachInsight.trend}
                  </span>
                </div>
              )}
              {coachInsight.observation && (
                <div>
                  <h4 style={{ margin: "0 0 0.35rem 0", fontSize: "0.85rem", color: "#e4e4e7", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>Observation</h4>
                  <p style={{ margin: 0, fontSize: "0.95rem", lineHeight: 1.6, color: "#d4cfc9" }}>
                    {coachInsight.observation}
                  </p>
                </div>
              )}
              {coachInsight.tip && (
                <div style={{
                  background: "rgba(252, 39, 121, 0.07)",
                  border: "1px solid rgba(252, 39, 121, 0.18)",
                  borderRadius: "16px",
                  padding: "1rem 1.1rem",
                  marginTop: "0.2rem"
                }}>
                  <h4 style={{ margin: "0 0 0.25rem 0", fontSize: "0.85rem", color: "#fc2779", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>Actionable Tip</h4>
                  <p style={{ margin: 0, fontSize: "0.92rem", lineHeight: 1.6, color: "#f4f0ec" }}>
                    {coachInsight.tip}
                  </p>
                </div>
              )}
            </div>
            <p style={{ margin: "1.5rem 0 0", fontSize: "0.75rem", color: "#a89f97", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "0.8rem" }}>
              Routine recommendations are updated dynamically based on your last 7 days of logs.
            </p>
          </div>
        )}
      </motion.div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "1.5rem"
      }}>
        {/* Diagnostics & Skin Toolkit */}
        <motion.div key="quick-tools-card" className="dash-bottom-card" variants={itemVariants} style={{
          background: 'var(--dash-surface)',
          border: "1px solid var(--dash-border)",
          borderRadius: "28px",
          padding: "2rem",
          boxShadow: '0 8px 30px rgba(40, 28, 20, 0.04)',
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between"
        }}>
          <div>
            <div style={{ marginBottom: "1.2rem" }}>
              <span style={{ fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700, color: "var(--dash-accent)" }}>Skin Toolkit</span>
              <h3 style={{ fontSize: "1.25rem", margin: "0.2rem 0 0", color: "var(--dash-ink)", fontWeight: 600, fontFamily: "var(--dash-font-serif)" }}>Diagnostics &amp; Tools</h3>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <Link href="/dashboard/conflicts" style={{ textDecoration: "none" }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.9rem 1rem",
                  background: "var(--dash-bg)",
                  borderRadius: "16px",
                  border: "1px solid var(--dash-border)",
                  transition: "all 0.15s ease"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "10px",
                      background: "rgba(239, 68, 68, 0.1)",
                      color: "#ef4444",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}>
                      <ShieldAlert size={18} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--dash-ink)" }}>Ingredient Conflict Scanner</div>
                      <div style={{ fontSize: "0.78rem", color: "var(--dash-muted)" }}>Prevent acne &amp; barrier irritation</div>
                    </div>
                  </div>
                  <ChevronRight size={16} color="var(--dash-muted)" />
                </div>
              </Link>

              <Link href="/dashboard/analysis" style={{ textDecoration: "none" }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.9rem 1rem",
                  background: "var(--dash-bg)",
                  borderRadius: "16px",
                  border: "1px solid var(--dash-border)",
                  transition: "all 0.15s ease"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "10px",
                      background: "rgba(139, 92, 246, 0.1)",
                      color: "#8b5cf6",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}>
                      <ScanFace size={18} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--dash-ink)" }}>AI Skin Analysis</div>
                      <div style={{ fontSize: "0.78rem", color: "var(--dash-muted)" }}>Pore, barrier &amp; oiliness breakdown</div>
                    </div>
                  </div>
                  <ChevronRight size={16} color="var(--dash-muted)" />
                </div>
              </Link>

              <Link href="/dashboard/routines" style={{ textDecoration: "none" }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.9rem 1rem",
                  background: "var(--dash-bg)",
                  borderRadius: "16px",
                  border: "1px solid var(--dash-border)",
                  transition: "all 0.15s ease"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "10px",
                      background: "var(--dash-accent-soft)",
                      color: "var(--dash-accent)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}>
                      <SlidersHorizontal size={18} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--dash-ink)" }}>My Skincare Routines</div>
                      <div style={{ fontSize: "0.78rem", color: "var(--dash-muted)" }}>Manage active products &amp; steps</div>
                    </div>
                  </div>
                  <ChevronRight size={16} color="var(--dash-muted)" />
                </div>
              </Link>
            </div>
          </div>
        </motion.div>

 {/* Card 2: Journal */}
 <motion.div className="dash-bottom-card" variants={itemVariants} style={{
 background: 'var(--dash-surface)',
 border: "1px solid var(--dash-border)",
 borderRadius: "28px",
 padding: "2rem",
 boxShadow: '0 20px 50px rgba(40, 28, 20, 0.05)',
 display: "flex",
 flexDirection: "column"
 }}>
 <h3 style={{ fontSize: "1.2rem", margin: "0 0 1.5rem", color: "var(--dash-ink)", fontWeight: 600, fontFamily: "var(--dash-font-serif)" }}>Recent Journal</h3>

 {hasJournalToday && recentJournal ? (
 <div style={{
 background: 'var(--dash-bg)',
 borderRadius: "22px",
 padding: "1.2rem",
 color: "var(--dash-ink)",
 fontSize: "0.95rem",
 marginBottom: "auto",
 border: "1px solid var(--dash-border)"
 }}>
 <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.6rem", alignItems: "center" }}>
 <span suppressHydrationWarning style={{ fontWeight: 600, fontSize: "0.85rem", opacity: 0.7 }}>{formatJournalDateSafe(recentJournal.date)}</span>
 <span style={{ fontSize: "0.8rem", color: "white", background: "var(--dash-ink)", padding: "2px 8px", borderRadius: "8px" }}>★ {recentJournal.rating}/5</span>
 </div>
 <p style={{ margin: 0, color: "var(--dash-muted)", lineHeight: 1.5, fontSize: "0.9rem" }}>"{recentJournal.entry}"</p>
 </div>
 ) : !quickDone ? (
 <div style={{
  background: 'var(--dash-bg)',
  borderRadius: '22px',
  padding: '1.5rem',
  marginBottom: 'auto',
  border: '1px solid var(--dash-border)',
 }}
 >
  <p style={{ margin: '0 0 1rem', fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, color: 'var(--dash-muted)' }}>How is your skin today?</p>
  <div className="dash-quick-rate-row" style={{ display: 'flex', gap: '8px', marginBottom: '1rem' }}>
   {[1, 2, 3, 4, 5].map((n) => (
    <button
     key={n}
     onClick={() => setQuickRating(n)}
     onMouseEnter={() => setQuickHover(n)}
     onMouseLeave={() => setQuickHover(0)}
     style={{
      flex: 1,
      height: '44px',
      borderRadius: '12px',
      border: quickRating === n ? '1px solid var(--dash-accent)' : '1px solid var(--dash-border)',
      background: quickRating === n ? 'var(--dash-accent)' : (quickHover >= n ? 'var(--dash-accent-soft)' : 'var(--dash-surface)'),
      color: quickRating === n ? '#fff' : 'var(--dash-ink)',
      fontSize: '0.85rem',
      fontWeight: 700,
      cursor: 'pointer',
      transition: 'all 0.15s ease',
     }}
    >{n}</button>
   ))}
  </div>
  <button
   disabled={!quickRating || quickSubmitting}
   onClick={async () => {
    if (!quickRating) return;
    setQuickSubmitting(true);
    try {
     await saveJournalEntry('', quickRating);
     setQuickDone(true);
    } catch (e) {
     console.error(e);
    } finally {
     setQuickSubmitting(false);
    }
   }}
   style={{
    width: '100%',
    padding: '0.65rem',
    borderRadius: '12px',
    border: 'none',
    background: quickRating ? 'var(--dash-ink)' : 'var(--dash-border)',
    color: quickRating ? 'var(--dash-surface)' : 'var(--dash-muted)',
    fontSize: '0.82rem',
    fontWeight: 600,
    cursor: quickRating ? 'pointer' : 'not-allowed',
    letterSpacing: '0.06em',
    transition: 'all 0.15s ease',
   }}
  >{quickSubmitting ? 'Saving...' : 'Log skin rating'}</button>
 </div>
 ) : quickDone ? (
 <div style={{
  background: 'var(--dash-bg)',
  borderRadius: '22px',
  padding: '1.5rem',
  marginBottom: 'auto',
  border: '1px solid var(--dash-border)',
  textAlign: 'center',
 }}
 >
  <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--dash-muted)', lineHeight: 1.5 }}>Skin rated {quickRating}/5 for today. Logged.</p>
 </div>
 ) : (
 <div style={{
  background: 'var(--dash-bg)',
  borderRadius: '22px',
  padding: '2rem',
  color: 'var(--dash-muted)',
  fontSize: '0.9rem',
  marginBottom: 'auto',
  border: '1px dashed var(--dash-border)',
  textAlign: 'center',
 }}
 >
  <p>No recent journal entries.</p>
 </div>
 )}

 <Link href="/dashboard/journal" style={{ textDecoration: "none", width: "100%" }}>
 <motion.button
 whileHover={{ scale: 1.02, background: "var(--dash-accent)", filter: "brightness(1.1)" }}
 whileTap={{ scale: 0.98 }}
 style={{
 background: "var(--dash-accent)",
 color: "#ffffff",
 border: "none",
 borderRadius: "18px",
 padding: "1rem",
 fontSize: "0.95rem",
 cursor: "pointer",
 fontWeight: 600,
 width: "100%",
 display: "flex",
 alignItems: "center",
 justifyContent: "center",
 gap: "0.5rem",
 marginTop: "1.5rem",
 boxShadow: "0 10px 25px rgba(252, 39, 121, 0.25)",
 transition: "all 0.2s"
 }}
 >
 <CalendarPlus size={18} /> Add Today's Entry
 </motion.button>
 </Link>
 </motion.div>
 </div>
 </motion.div>
 );
}
