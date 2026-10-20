"use client";

import { useState, useTransition, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sun, 
  Moon, 
  Droplets, 
  ShieldCheck, 
  Layers, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  X, 
  ExternalLink, 
  RefreshCw, 
  ArrowRight, 
  ChevronDown, 
  ChevronUp, 
  Share2, 
  Compass, 
  Coins,
  CheckCircle2
} from "lucide-react";
import Link from "next/link";
import { saveRoutine, updateRoutine, getDashboardData, deleteRoutine, toggleRoutineStep, syncQuizRoutineToVanity } from "../../actions";

interface RoutinesClientProps {
  initialRoutines: any[];
}

// Fallback high-performance default AM & PM regimens for users starting fresh
const DEFAULT_AM_STEPS = [
  "Cleanser: COSRX Low pH Good Morning Gel Cleanser",
  "Serum: COSRX Advanced Snail 96 Mucin Power Essence",
  "Moisturizer: Sebamed Clear Face Care Gel (Hydrating & Non-comedogenic)",
  "Sunscreen: SKIN1004 Madagascar Centella Hyalu-Cica Water-Fit Sun Serum SPF50+"
];

const DEFAULT_PM_STEPS = [
  "Double Cleanse: Bioderma Sensibio H2O Micellar Water + Gentle Cleanser",
  "Active Treatment: Minimalist 2% Salicylic Acid (BHA) Serum",
  "Nourish: Formularx Barrier Relief Peptide & Ceramide Lightweight Cream"
];

function parseStepInfo(rawStep: string, defaultStepIdx: number, timeOfDay: "am" | "pm") {
  let role = "";
  let name = rawStep;
  let actives = "";

  if (rawStep.includes(":")) {
    const parts = rawStep.split(":");
    role = parts[0].trim();
    name = parts.slice(1).join(":").trim();
  } else {
    if (defaultStepIdx === 0) role = timeOfDay === "am" ? "Gentle Cleanse" : "Double Cleanse";
    else if (defaultStepIdx === 1) role = timeOfDay === "am" ? "Hydrate & Target" : "Active Treatment";
    else if (defaultStepIdx === 2) role = "Barrier Restore";
    else role = timeOfDay === "am" ? "UV Defense" : "Night Nourish";
  }

  // Derive key actives heuristics for premium luxury presentation
  const lower = name.toLowerCase();
  if (lower.includes("snail") || lower.includes("mucin")) actives = "96% Snail Secretion · Sodium Hyaluronate";
  else if (lower.includes("centella") || lower.includes("cica")) actives = "Centella Asiatica · Hyaluronic Complex";
  else if (lower.includes("salicylic") || lower.includes("bha")) actives = "Salicylic Acid 2% · Betaine";
  else if (lower.includes("ceramide") || lower.includes("barrier")) actives = "Ceramides NP/AP/EOP · Peptides";
  else if (lower.includes("sebamed") || lower.includes("gel")) actives = "Allantoin · Panthenol · Aloe Barbadensis";
  else if (lower.includes("low ph") || lower.includes("morning")) actives = "Tea Tree Leaf Oil · Betaine Salicylate";
  else if (lower.includes("sun") || lower.includes("spf")) actives = "Broad Spectrum SPF 50+ PA++++";
  else if (lower.includes("niacinamide")) actives = "Niacinamide 10% · Zinc PCA 1%";
  else if (lower.includes("vitamin c")) actives = "L-Ascorbic Acid 15% · Ferulic Acid";
  else if (lower.includes("hyalur")) actives = "Multi-Molecular Hyaluronic Acid";
  else actives = "Dermatologically Tested Actives";

  return { role, name, actives };
}

function isLuxuryBrand(productName: string) {
  const luxuryKeywords = [
    "estee lauder", "estée lauder", "clinique", "skinceuticals", "skin ceuticals",
    "paula's choice", "paulas choice", "tatcha", "drunk elephant", "laneige",
    "sunday riley", "charlotte tilbury", "olaplex", "la mer", "sk-ii", "dior",
    "chanel", "glow recipe", "fresh", "biologique", "tata harper", "augustinus bader",
    "summer fridays", "shiseido", "clarins", "sisley", "kiehl", "lancome", "lancôme"
  ];
  const lower = productName.toLowerCase();
  return luxuryKeywords.some(brand => lower.includes(brand));
}

export function RoutinesClient({ initialRoutines }: RoutinesClientProps) {
  const [routines, setRoutines] = useState(initialRoutines || []);
  const [activeTab, setActiveTab] = useState<"am" | "pm">("am");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [sharedId, setSharedId] = useState<string | null>(null);
  const [showArchive, setShowArchive] = useState(false);
  const [syncToast, setSyncToast] = useState<string | null>(null);

  // Auto-sync routine from quiz in localStorage if present
  useEffect(() => {
    if (typeof window === "undefined") return;
    const pendingRaw = localStorage.getItem("mirha_pending_routine");
    if (!pendingRaw) return;

    try {
      const pending = JSON.parse(pendingRaw);
      startTransition(async () => {
        const res = await syncQuizRoutineToVanity(pending);
        if (res?.success) {
          localStorage.removeItem("mirha_pending_routine");
          setSyncToast("Your calibrated 4-step routine has been loaded into your vanity!");
          const refreshed = await getDashboardData();
          if (refreshed?.routines) {
            setRoutines(refreshed.routines);
          }
          setTimeout(() => setSyncToast(null), 5000);
        }
      });
    } catch (e) {
      console.error("Auto-sync pending routine failed:", e);
    }
  }, []);
  
  // Inline editing state for steps
  const [editingStepIdx, setEditingStepIdx] = useState<number | null>(null);
  const [editStepText, setEditStepText] = useState("");
  const [newStepInput, setNewStepInput] = useState("");
  const [showAddStep, setShowAddStep] = useState(false);

  // Checkbox tracking state
  const today = new Date().toISOString().split("T")[0];
  const [checkedMap, setCheckedMap] = useState<Record<string, number[]>>({});

  // Identify Active AM and PM routine
  // Look for routine containing 'morning' or 'am' or use the first routine
  const amRoutine = routines.find(r => r.name.toLowerCase().includes("morning") || r.name.toLowerCase().includes("am")) 
    || routines[0] 
    || null;

  // Look for routine containing 'evening', 'night', or 'pm' or second routine
  const pmRoutine = routines.find(r => r.name.toLowerCase().includes("evening") || r.name.toLowerCase().includes("night") || r.name.toLowerCase().includes("pm")) 
    || (routines.length > 1 ? routines[1] : null);

  const activeRoutine = activeTab === "am" ? amRoutine : (pmRoutine || amRoutine);
  const activeSteps: string[] = activeRoutine?.steps && activeRoutine.steps.length > 0 
    ? activeRoutine.steps 
    : (activeTab === "am" ? DEFAULT_AM_STEPS : DEFAULT_PM_STEPS);

  // Archive routines (all other routines except the two active ones)
  const archivedRoutines = routines.filter(r => r.id !== amRoutine?.id && r.id !== pmRoutine?.id);

  const handleToggleStepCheck = async (stepIdx: number) => {
    if (!activeRoutine?.id) return;
    const current = checkedMap[activeRoutine.id] || [];
    const isChecked = current.includes(stepIdx);
    const updated = isChecked ? current.filter(i => i !== stepIdx) : [...current, stepIdx];
    setCheckedMap(prev => ({ ...prev, [activeRoutine.id]: updated }));

    try {
      await toggleRoutineStep(activeRoutine.id, stepIdx, !isChecked);
    } catch (err) {
      console.error("Failed to toggle routine step:", err);
    }
  };

  const handleSaveStepEdit = async (stepIdx: number) => {
    if (!activeRoutine || !editStepText.trim()) {
      setEditingStepIdx(null);
      return;
    }
    const updatedSteps = [...activeSteps];
    updatedSteps[stepIdx] = editStepText.trim();

    startTransition(async () => {
      try {
        await updateRoutine(activeRoutine.id, activeRoutine.name, updatedSteps);
        const refreshed = await getDashboardData();
        if (refreshed.routines) setRoutines(refreshed.routines);
        setEditingStepIdx(null);
      } catch (e: any) {
        setError(e.message || "Failed to update step.");
      }
    });
  };

  const handleAddNewStep = async () => {
    if (!newStepInput.trim()) return;
    const updatedSteps = [...activeSteps, newStepInput.trim()];

    startTransition(async () => {
      try {
        if (activeRoutine?.id) {
          await updateRoutine(activeRoutine.id, activeRoutine.name, updatedSteps);
        } else {
          await saveRoutine(activeTab === "am" ? "Morning Regimen (AM)" : "Evening Regimen (PM)", updatedSteps);
        }
        const refreshed = await getDashboardData();
        if (refreshed.routines) setRoutines(refreshed.routines);
        setNewStepInput("");
        setShowAddStep(false);
      } catch (e: any) {
        setError(e.message || "Failed to add step.");
      }
    });
  };

  const handleDeleteStep = async (stepIdx: number) => {
    if (!activeRoutine?.id) return;
    const updatedSteps = activeSteps.filter((_, idx) => idx !== stepIdx);

    startTransition(async () => {
      try {
        await updateRoutine(activeRoutine.id, activeRoutine.name, updatedSteps);
        const refreshed = await getDashboardData();
        if (refreshed.routines) setRoutines(refreshed.routines);
      } catch (e: any) {
        setError(e.message || "Failed to remove step.");
      }
    });
  };

  const handleDeleteArchiveRoutine = async (id: string) => {
    startTransition(async () => {
      try {
        await deleteRoutine(id);
        const refreshed = await getDashboardData();
        if (refreshed.routines) setRoutines(refreshed.routines);
      } catch (e: any) {
        setError(e.message || "Failed to delete routine.");
      }
    });
  };

  const handleShareRoutine = async () => {
    if (!activeRoutine) return;
    const url = `${window.location.origin}/routine/share?name=${encodeURIComponent(activeRoutine.name)}&steps=${encodeURIComponent(JSON.stringify(activeSteps))}`;
    try {
      await navigator.clipboard.writeText(url);
      setSharedId(activeRoutine.id);
      setTimeout(() => setSharedId(null), 2500);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  return (
    <div className="vanity-container">
      <style>{`
        .vanity-container {
          max-width: 1040px;
          margin: 0 auto;
          padding: 0.5rem 0 3rem;
        }

        /* Top Bar */
        .vanity-header {
          display: flex;
          justifyContent: space-between;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: 1.5rem;
          margin-bottom: 2rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid var(--dash-border);
        }

        .vanity-title {
          font-family: var(--dash-font-serif);
          font-size: clamp(1.8rem, 4vw, 2.4rem);
          font-weight: 400;
          color: var(--dash-ink);
          margin: 0 0 0.4rem;
          letter-spacing: -0.02em;
          line-height: 1.1;
        }

        .vanity-subtitle {
          color: var(--dash-muted);
          font-size: 0.95rem;
          margin: 0;
          line-height: 1.5;
        }

        .climate-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(252, 39, 121, 0.08);
          border: 1px solid rgba(252, 39, 121, 0.2);
          color: var(--dash-ink);
          padding: 0.5rem 1rem;
          border-radius: 99px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .climate-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 8px #10b981;
        }

        /* AM / PM Tabs */
        .regimen-tabs {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 2rem;
          background: var(--dash-surface);
          padding: 0.4rem;
          border-radius: 20px;
          border: 1px solid var(--dash-border);
          width: fit-content;
        }

        .regimen-tab-btn {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.75rem 1.4rem;
          border-radius: 16px;
          border: none;
          background: transparent;
          color: var(--dash-muted);
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .regimen-tab-btn.active {
          background: #fc2779;
          color: #ffffff;
          box-shadow: 0 8px 24px rgba(252, 39, 121, 0.35);
        }

        /* Product Cards */
        .step-cards-stack {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          margin-bottom: 2.5rem;
        }

        .product-step-card {
          background: var(--dash-surface);
          border: 1px solid var(--dash-border);
          border-radius: 24px;
          padding: 1.6rem 1.8rem;
          display: flex;
          justifyContent: space-between;
          align-items: center;
          gap: 1.5rem;
          transition: all 0.25s ease;
          box-shadow: 0 4px 18px rgba(0,0,0,0.02);
        }

        .product-step-card:hover {
          border-color: rgba(252, 39, 121, 0.3);
          box-shadow: 0 12px 32px rgba(40, 28, 20, 0.05);
          transform: translateY(-2px);
        }

        .product-step-card.completed {
          background: rgba(16, 185, 129, 0.03);
          border-color: rgba(16, 185, 129, 0.2);
        }

        .step-badge {
          display: inline-block;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--dash-accent);
          margin-bottom: 0.35rem;
        }

        .step-product-name {
          font-family: var(--dash-font-serif);
          font-size: 1.25rem;
          color: var(--dash-ink);
          margin: 0 0 0.35rem;
          font-weight: 600;
          line-height: 1.3;
        }

        .step-actives-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.78rem;
          color: var(--dash-muted);
          background: var(--dash-bg);
          padding: 3px 10px;
          border-radius: 99px;
          border: 1px solid var(--dash-border);
          font-weight: 500;
        }

        .step-actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-shrink: 0;
        }

        .dupe-link-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.5rem 0.85rem;
          border-radius: 12px;
          background: var(--dash-bg);
          border: 1px solid var(--dash-border);
          color: var(--dash-ink);
          font-size: 0.8rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s;
        }

        .dupe-link-btn:hover {
          background: var(--dash-accent-soft);
          color: var(--dash-accent);
          border-color: rgba(252, 39, 121, 0.2);
        }

        .optimal-value-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.45rem 0.75rem;
          border-radius: 99px;
          background: rgba(16, 185, 129, 0.08);
          border: 1px solid rgba(16, 185, 129, 0.2);
          color: #10b981;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.02em;
        }

        .action-icon-btn {
          width: 38px;
          height: 38px;
          border-radius: 12px;
          border: 1px solid var(--dash-border);
          background: var(--dash-bg);
          color: var(--dash-muted);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .action-icon-btn:hover {
          color: var(--dash-ink);
          border-color: var(--dash-ink);
        }

        .action-icon-btn.danger:hover {
          color: #ef4444;
          border-color: #ef4444;
          background: rgba(239, 68, 68, 0.05);
        }

        /* Upsell / Protocol Pass Card */
        .protocol-banner {
          background: linear-gradient(135deg, #181514 0%, #26211f 100%);
          border-radius: 28px;
          padding: 2.2rem 2.4rem;
          color: #fff;
          display: flex;
          justifyContent: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1.5rem;
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 20px 50px rgba(0,0,0,0.2);
          margin-top: 2rem;
        }

        .protocol-banner h3 {
          font-family: var(--dash-font-serif);
          font-size: 1.5rem;
          margin: 0 0 0.5rem;
          font-weight: 400;
        }

        .protocol-banner p {
          color: #a89f97;
          font-size: 0.9rem;
          margin: 0;
          max-width: 540px;
          line-height: 1.55;
        }

        .protocol-btn {
          background: #fc2779;
          color: #fff;
          padding: 0.9rem 1.6rem;
          border-radius: 16px;
          font-size: 0.95rem;
          font-weight: 700;
          border: none;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
          box-shadow: 0 10px 25px rgba(252, 39, 121, 0.35);
          transition: all 0.2s;
        }

        .protocol-btn:hover {
          transform: translateY(-2px);
          filter: brightness(1.1);
        }

        /* History & Archive Section */
        .archive-toggle {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 1.5rem;
          background: var(--dash-surface);
          border: 1px solid var(--dash-border);
          border-radius: 20px;
          cursor: pointer;
          font-weight: 600;
          color: var(--dash-muted);
          font-size: 0.92rem;
          margin-top: 2rem;
          transition: all 0.2s;
        }

        .archive-toggle:hover {
          color: var(--dash-ink);
          border-color: var(--dash-muted);
        }

        @media (max-width: 640px) {
          .product-step-card {
            flex-direction: column;
            align-items: flex-start;
            padding: 1.25rem;
            gap: 1rem;
          }
          .step-actions {
            width: 100%;
            justify-content: flex-end;
          }
          .protocol-banner {
            padding: 1.5rem;
          }
        }
      `}</style>

      {/* Header */}
      <header className="vanity-header">
        <div>
          <h1 className="vanity-title">Digital Skincare Vanity</h1>
          <p className="vanity-subtitle">
            Curated active regimens synchronized to your climate and skin barrier profile.
          </p>
        </div>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
          <div className="climate-pill">
            <span className="climate-dot" />
            <span>Mumbai · 29°C · Calibrated</span>
          </div>
          <Link href="/tools/routine" className="dupe-link-btn" style={{ padding: "0.6rem 1rem", borderRadius: "99px" }}>
            <RefreshCw size={14} /> Recalibrate via Quiz
          </Link>
        </div>
      </header>

      {/* Auto-Sync Notification */}
      {syncToast && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: "rgba(16, 185, 129, 0.12)",
            border: "1px solid rgba(16, 185, 129, 0.3)",
            color: "#10b981",
            borderRadius: "14px",
            padding: "0.85rem 1.25rem",
            marginBottom: "1.5rem",
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            fontSize: "0.9rem",
            fontWeight: 600,
          }}
        >
          <CheckCircle2 size={18} />
          {syncToast}
        </motion.div>
      )}

      {/* AM / PM Tabs */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", marginBottom: "1.5rem" }}>
        <div className="regimen-tabs">
          <button 
            className={`regimen-tab-btn ${activeTab === "am" ? "active" : ""}`}
            onClick={() => setActiveTab("am")}
          >
            <Sun size={17} /> Morning Regimen (AM)
          </button>
          <button 
            className={`regimen-tab-btn ${activeTab === "pm" ? "active" : ""}`}
            onClick={() => setActiveTab("pm")}
          >
            <Moon size={17} /> Evening Regimen (PM)
          </button>
        </div>

        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button 
            onClick={() => setShowAddStep(true)}
            className="dupe-link-btn"
            style={{ borderRadius: "14px", padding: "0.65rem 1rem" }}
          >
            <Plus size={16} /> Add Step
          </button>
          <button 
            onClick={handleShareRoutine}
            className="action-icon-btn"
            title="Share Regimen"
          >
            {sharedId ? <Check size={16} style={{ color: "#10b981" }} /> : <Share2 size={16} />}
          </button>
        </div>
      </div>

      {error && (
        <div style={{
          background: "#FEF2F2",
          border: "1px solid #FEE2E2",
          borderRadius: "16px",
          padding: "1rem 1.25rem",
          marginBottom: "1.5rem",
          color: "#991B1B",
          fontSize: "0.9rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <span>{error}</span>
          <button onClick={() => setError(null)} style={{ background: "transparent", border: "none", cursor: "pointer", color: "inherit" }}>
            <X size={16} />
          </button>
        </div>
      )}

      {/* Add Step Inline Box */}
      <AnimatePresence>
        {showAddStep && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              background: "var(--dash-surface)",
              border: "1px solid var(--dash-border)",
              borderRadius: "20px",
              padding: "1.25rem",
              marginBottom: "1.5rem",
              display: "flex",
              gap: "0.75rem",
              alignItems: "center",
              overflow: "hidden"
            }}
          >
            <input 
              type="text"
              placeholder="e.g. Treatment: Minimalist 10% Niacinamide Serum"
              value={newStepInput}
              onChange={(e) => setNewStepInput(e.target.value)}
              style={{
                flex: 1,
                background: "var(--dash-bg)",
                border: "1px solid var(--dash-border)",
                borderRadius: "12px",
                padding: "0.75rem 1rem",
                color: "var(--dash-ink)",
                outline: "none",
                fontSize: "0.95rem"
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAddNewStep();
              }}
            />
            <button 
              onClick={handleAddNewStep}
              disabled={isPending}
              style={{
                background: "var(--dash-accent)",
                color: "#ffffff",
                border: "none",
                borderRadius: "12px",
                padding: "0.75rem 1.4rem",
                fontWeight: 700,
                cursor: "pointer",
                fontSize: "0.9rem",
                boxShadow: "0 4px 14px rgba(252, 39, 121, 0.3)"
              }}
            >
              Save
            </button>
            <button 
              onClick={() => setShowAddStep(false)}
              style={{
                background: "transparent",
                border: "none",
                color: "var(--dash-muted)",
                cursor: "pointer"
              }}
            >
              <X size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Product Cards Stack */}
      <div className="step-cards-stack">
        {activeSteps.map((rawStep, idx) => {
          const { role, name, actives } = parseStepInfo(rawStep, idx, activeTab);
          const isChecked = (checkedMap[activeRoutine?.id || "default"] || []).includes(idx);
          const isEditing = editingStepIdx === idx;

          return (
            <motion.div 
              key={idx} 
              className={`product-step-card ${isChecked ? "completed" : ""}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: "1.2rem", flex: 1 }}>
                {/* Step Circle Check */}
                <button
                  onClick={() => handleToggleStepCheck(idx)}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    border: isChecked ? "none" : "2px solid var(--dash-border)",
                    background: isChecked ? "#10b981" : "transparent",
                    color: isChecked ? "#fff" : "var(--dash-muted)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    flexShrink: 0,
                    marginTop: "2px",
                    transition: "all 0.2s"
                  }}
                  title={isChecked ? "Mark as uncompleted" : "Mark as completed"}
                >
                  {isChecked ? <CheckCircle2 size={20} /> : <span style={{ fontSize: "0.8rem", fontWeight: 700 }}>{idx + 1}</span>}
                </button>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span className="step-badge">
                    Step {idx + 1} · {role}
                  </span>

                  {isEditing ? (
                    <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.3rem" }}>
                      <input 
                        value={editStepText}
                        onChange={(e) => setEditStepText(e.target.value)}
                        style={{
                          flex: 1,
                          background: "var(--dash-bg)",
                          border: "1px solid var(--dash-accent)",
                          borderRadius: "10px",
                          padding: "0.4rem 0.8rem",
                          color: "var(--dash-ink)",
                          fontSize: "1rem"
                        }}
                        autoFocus
                      />
                      <button 
                        onClick={() => handleSaveStepEdit(idx)}
                        style={{
                          background: "var(--dash-accent)",
                          color: "#ffffff",
                          border: "none",
                          borderRadius: "10px",
                          padding: "0.4rem 1rem",
                          cursor: "pointer",
                          fontWeight: 700,
                          fontSize: "0.85rem",
                          boxShadow: "0 2px 8px rgba(252, 39, 121, 0.3)"
                        }}
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <h3 className="step-product-name" style={{ textDecoration: isChecked ? "line-through" : "none", opacity: isChecked ? 0.7 : 1 }}>
                      {name}
                    </h3>
                  )}

                  <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "0.4rem" }}>
                    <span className="step-actives-pill">
                      <Droplets size={12} color="var(--dash-accent)" /> {actives}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="step-actions">
                {isLuxuryBrand(name) ? (
                  <Link 
                    href={`/tools/dupes?query=${encodeURIComponent(name.split(" ")[0])}`}
                    className="dupe-link-btn"
                    title="Find affordable formulation dupes for this luxury product"
                  >
                    <Coins size={13} /> Find Dupe (Save ~70%)
                  </Link>
                ) : (
                  <span 
                    className="optimal-value-badge"
                    title="This formulation is already an accessible, science-backed product with optimal active concentrations."
                  >
                    <ShieldCheck size={13} /> Value Champion
                  </span>
                )}

                <button 
                  onClick={() => {
                    setEditingStepIdx(idx);
                    setEditStepText(rawStep);
                  }}
                  className="action-icon-btn"
                  title="Edit Product"
                >
                  <Edit3 size={15} />
                </button>

                <button 
                  onClick={() => handleDeleteStep(idx)}
                  className="action-icon-btn danger"
                  title="Remove Step"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* High-Converting Upsell Protocol Pass Banner */}
      <section className="protocol-banner">
        <div>
          <span style={{ fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 700, color: "#fc2779" }}>
            Mirha Skin Concierge
          </span>
          <h3>Unlock Complete Formulation Safety &amp; Conflict Audit</h3>
          <p>
            Avoid product clashing (Retinol + AHA, Niacinamide + Vitamin C). Get instant AI clinical verification, local tap water calibration, and direct guidance for ₹199 one-time.
          </p>
        </div>
        <Link href="/dashboard/subscription" className="protocol-btn">
          Get Protocol Pass · ₹199 <ArrowRight size={16} />
        </Link>
      </section>

      {/* Clean Collapsible Archive (Stops the Stacking Bug!) */}
      {archivedRoutines.length > 0 && (
        <div style={{ marginTop: "2.5rem" }}>
          <div 
            className="archive-toggle"
            onClick={() => setShowArchive(!showArchive)}
          >
            <span>Saved Regimens &amp; History ({archivedRoutines.length})</span>
            {showArchive ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </div>

          <AnimatePresence>
            {showArchive && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                style={{ overflow: "hidden", marginTop: "1rem" }}
              >
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1rem" }}>
                  {archivedRoutines.map((routine) => (
                    <div 
                      key={routine.id}
                      style={{
                        background: "var(--dash-surface)",
                        border: "1px solid var(--dash-border)",
                        borderRadius: "18px",
                        padding: "1.25rem",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                      }}
                    >
                      <div>
                        <h4 style={{ margin: "0 0 0.25rem", color: "var(--dash-ink)", fontSize: "1rem" }}>{routine.name}</h4>
                        <span style={{ fontSize: "0.8rem", color: "var(--dash-muted)" }}>
                          {Array.isArray(routine.steps) ? routine.steps.length : 0} steps
                        </span>
                      </div>
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <button 
                          onClick={() => handleDeleteArchiveRoutine(routine.id)}
                          className="action-icon-btn danger"
                          title="Delete Old Routine"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
