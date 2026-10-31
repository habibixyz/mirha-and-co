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
  RefreshCw, 
  ArrowRight, 
  Share2, 
  Coins,
  CheckCircle2,
  Calendar,
  Sparkles as _SparklesIconForbidden, // eslint-disable-line @typescript-eslint/no-unused-vars
  AlertCircle
} from "lucide-react";
import Link from "next/link";
import { 
  saveRoutine, 
  updateRoutine, 
  getRoutines,
  deleteRoutine, 
  toggleRoutineStep, 
  syncQuizRoutineToVanity,
  loadDefaultRoutines 
} from "../../actions";

interface Routine {
  id: string;
  name: string;
  steps: string[];
  metadata?: any;
}

interface RoutinesClientProps {
  initialRoutines: Routine[];
}

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

const QUICK_REGIMEN_PRESETS = [
  "Morning Regimen (AM)",
  "Evening Regimen (PM)",
  "Weekly Exfoliation",
  "Midday Refresh",
  "Post-Workout / Gym"
];

function parseStepInfo(rawStep: string, defaultStepIdx: number, routineName: string) {
  let role = "";
  let name = rawStep;
  let actives = "";

  const isPm = routineName.toLowerCase().includes("evening") || routineName.toLowerCase().includes("night") || routineName.toLowerCase().includes("pm");

  if (rawStep.includes(":")) {
    const parts = rawStep.split(":");
    role = parts[0].trim();
    name = parts.slice(1).join(":").trim();
  } else {
    if (defaultStepIdx === 0) role = isPm ? "Double Cleanse" : "Gentle Cleanse";
    else if (defaultStepIdx === 1) role = isPm ? "Active Treatment" : "Hydrate & Target";
    else if (defaultStepIdx === 2) role = "Barrier Restore";
    else role = isPm ? "Night Nourish" : "UV Defense";
  }

  // Derive key actives heuristics for presentation
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
  const [routines, setRoutines] = useState<Routine[]>(Array.isArray(initialRoutines) ? initialRoutines : []);
  
  // Track selected routine by ID
  const [selectedId, setSelectedId] = useState<string | null>(() => {
    if (initialRoutines && initialRoutines.length > 0) {
      const am = initialRoutines.find((r: any) => 
        r.name.toLowerCase().includes("morning") || r.name.toLowerCase().includes("am")
      );
      return am ? am.id : initialRoutines[0].id;
    }
    return null;
  });

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [sharedId, setSharedId] = useState<string | null>(null);
  const [syncToast, setSyncToast] = useState<string | null>(null);

  // New Regimen Dialog State
  const [showNewRegimenModal, setShowNewRegimenModal] = useState(false);
  const [newRegimenName, setNewRegimenName] = useState("");
  const [newRegimenFirstStep, setNewRegimenFirstStep] = useState("");

  // Step Add/Edit State
  const [showAddStep, setShowAddStep] = useState(false);
  const [newStepInput, setNewStepInput] = useState("");
  const [editingStepIdx, setEditingStepIdx] = useState<number | null>(null);
  const [editStepText, setEditStepText] = useState("");

  // Rename Regimen State
  const [isRenamingRegimen, setIsRenamingRegimen] = useState(false);
  const [renameValue, setRenameValue] = useState("");

  // Delete confirmation
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // Checkbox tracking state
  const today = new Date().toISOString().split("T")[0];
  const [checkedMap, setCheckedMap] = useState<Record<string, number[]>>({});

  // Auto-sync routine from quiz in localStorage if present, then clear localStorage immediately
  useEffect(() => {
    if (typeof window === "undefined") return;
    const pendingRaw = localStorage.getItem("mirha_pending_routine");
    if (!pendingRaw) return;

    // Immediately remove from localStorage so it never loops or resurrects deleted routines
    localStorage.removeItem("mirha_pending_routine");

    try {
      const pending = JSON.parse(pendingRaw);
      startTransition(async () => {
        const res = await syncQuizRoutineToVanity(pending);
        if (res?.success) {
          setSyncToast("Your calibrated routine has been loaded into your vanity!");
          const refreshed = await getRoutines();
          if (refreshed && refreshed.length > 0) {
            setRoutines(refreshed);
            setSelectedId(refreshed[0].id);
          }
          setTimeout(() => setSyncToast(null), 5000);
        }
      });
    } catch (e) {
      console.error("Auto-sync pending routine failed:", e);
    }
  }, []);

  // Determine active routine
  const activeRoutine = routines.find(r => r.id === selectedId) || routines[0] || null;
  const activeSteps: string[] = activeRoutine && Array.isArray(activeRoutine.steps) ? activeRoutine.steps : [];

  // Keep selectedId valid
  useEffect(() => {
    if (routines.length > 0) {
      if (!selectedId || !routines.some(r => r.id === selectedId)) {
        setSelectedId(routines[0].id);
      }
    } else {
      setSelectedId(null);
    }
  }, [routines, selectedId]);

  // Toggle step checkbox
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

  // Save edited step
  const handleSaveStepEdit = async (stepIdx: number) => {
    if (!activeRoutine || !editStepText.trim()) {
      setEditingStepIdx(null);
      return;
    }
    const updatedSteps = [...activeSteps];
    updatedSteps[stepIdx] = editStepText.trim();

    // Optimistic update
    setRoutines(prev =>
      prev.map(r => r.id === activeRoutine.id ? { ...r, steps: updatedSteps } : r)
    );
    setEditingStepIdx(null);

    startTransition(async () => {
      try {
        await updateRoutine(activeRoutine.id, activeRoutine.name, updatedSteps);
      } catch (e: any) {
        setRoutines(prev =>
          prev.map(r => r.id === activeRoutine.id ? { ...r, steps: activeSteps } : r)
        );
        setError(e.message || "Failed to update step.");
      }
    });
  };

  // Add new step to active routine
  const handleAddNewStep = async () => {
    if (!newStepInput.trim() || !activeRoutine) return;
    const newStep = newStepInput.trim();
    const updatedSteps = [...activeSteps, newStep];

    setNewStepInput("");
    setShowAddStep(false);

    // Optimistic update
    setRoutines(prev =>
      prev.map(r => r.id === activeRoutine.id ? { ...r, steps: updatedSteps } : r)
    );

    startTransition(async () => {
      try {
        await updateRoutine(activeRoutine.id, activeRoutine.name, updatedSteps);
      } catch (e: any) {
        setRoutines(prev =>
          prev.map(r => r.id === activeRoutine.id ? { ...r, steps: activeSteps } : r)
        );
        setError(e.message || "Failed to add step.");
      }
    });
  };

  // Delete single step - DOES NOT FALL BACK TO DEFAULTS WHEN EMPTY!
  const handleDeleteStep = async (stepIdx: number) => {
    if (!activeRoutine?.id) return;
    const updatedSteps = activeSteps.filter((_, idx) => idx !== stepIdx);

    // Optimistic update immediately
    setRoutines(prev =>
      prev.map(r => r.id === activeRoutine.id ? { ...r, steps: updatedSteps } : r)
    );

    startTransition(async () => {
      try {
        await updateRoutine(activeRoutine.id, activeRoutine.name, updatedSteps);
      } catch (e: any) {
        // Roll back on failure
        setRoutines(prev =>
          prev.map(r => r.id === activeRoutine.id ? { ...r, steps: activeSteps } : r)
        );
        setError(e.message || "Failed to remove step.");
      }
    });
  };

  // Create brand new routine
  const handleCreateNewRegimen = async () => {
    if (!newRegimenName.trim()) return;
    const name = newRegimenName.trim();
    const initialSteps = newRegimenFirstStep.trim() ? [newRegimenFirstStep.trim()] : [];

    setShowNewRegimenModal(false);
    setNewRegimenName("");
    setNewRegimenFirstStep("");

    startTransition(async () => {
      try {
        const res = await saveRoutine(name, initialSteps);
        if (res?.success && res.routine) {
          setRoutines(prev => [...prev, res.routine]);
          setSelectedId(res.routine.id);
        } else {
          const refreshed = await getRoutines();
          if (refreshed && refreshed.length > 0) {
            setRoutines(refreshed);
            setSelectedId(refreshed[refreshed.length - 1].id);
          }
        }
      } catch (e: any) {
        setError(e.message || "Failed to create new regimen.");
      }
    });
  };

  // Delete entire routine
  const handleDeleteRoutine = async (routineId: string) => {
    const routineToDelete = routines.find(r => r.id === routineId);
    if (!routineToDelete) return;

    // Optimistically remove from state
    const remaining = routines.filter(r => r.id !== routineId);
    setRoutines(remaining);
    setConfirmDeleteId(null);

    if (selectedId === routineId) {
      setSelectedId(remaining.length > 0 ? remaining[0].id : null);
    }

    startTransition(async () => {
      try {
        await deleteRoutine(routineId);
      } catch (e: any) {
        // Revert on error
        setRoutines(prev => [...prev, routineToDelete]);
        setError(e.message || "Failed to delete regimen.");
      }
    });
  };

  // Rename routine
  const handleRenameRoutine = async () => {
    if (!activeRoutine || !renameValue.trim()) {
      setIsRenamingRegimen(false);
      return;
    }
    const newName = renameValue.trim();
    setIsRenamingRegimen(false);

    setRoutines(prev =>
      prev.map(r => r.id === activeRoutine.id ? { ...r, name: newName } : r)
    );

    startTransition(async () => {
      try {
        await updateRoutine(activeRoutine.id, newName, activeRoutine.steps);
      } catch (e: any) {
        setRoutines(prev =>
          prev.map(r => r.id === activeRoutine.id ? { ...r, name: activeRoutine.name } : r)
        );
        setError(e.message || "Failed to rename regimen.");
      }
    });
  };

  // Load recommended template steps for empty routine or fresh account
  const handleLoadRecommendedSteps = async () => {
    if (!activeRoutine) return;
    const isPm = activeRoutine.name.toLowerCase().includes("evening") || 
                 activeRoutine.name.toLowerCase().includes("night") || 
                 activeRoutine.name.toLowerCase().includes("pm");
    const templateSteps = isPm ? DEFAULT_PM_STEPS : DEFAULT_AM_STEPS;

    setRoutines(prev =>
      prev.map(r => r.id === activeRoutine.id ? { ...r, steps: templateSteps } : r)
    );

    startTransition(async () => {
      try {
        await updateRoutine(activeRoutine.id, activeRoutine.name, templateSteps);
      } catch (e: any) {
        setRoutines(prev =>
          prev.map(r => r.id === activeRoutine.id ? { ...r, steps: activeSteps } : r)
        );
        setError(e.message || "Failed to load recommended steps.");
      }
    });
  };

  // Load custom preset starter pack
  const handleLoadPresetSteps = async (steps: string[]) => {
    if (!activeRoutine) return;
    setRoutines(prev =>
      prev.map(r => r.id === activeRoutine.id ? { ...r, steps } : r)
    );

    startTransition(async () => {
      try {
        await updateRoutine(activeRoutine.id, activeRoutine.name, steps);
      } catch (e: any) {
        setRoutines(prev =>
          prev.map(r => r.id === activeRoutine.id ? { ...r, steps: activeSteps } : r)
        );
        setError(e.message || "Failed to load starter preset.");
      }
    });
  };

  // Load standard AM & PM routines if account has 0 routines
  const handleLoadDefaultPair = async () => {
    startTransition(async () => {
      try {
        const res = await loadDefaultRoutines();
        if (res?.success && res.routines) {
          setRoutines(res.routines);
          if (res.routines.length > 0) {
            setSelectedId(res.routines[0].id);
          }
        }
      } catch (e: any) {
        setError(e.message || "Failed to load default routines.");
      }
    });
  };

  // Share routine
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

  // Tab icon helper
  const getTabIcon = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes("morning") || lower.includes("am") || lower.includes("day") || lower.includes("sun")) {
      return <Sun size={15} />;
    }
    if (lower.includes("evening") || lower.includes("night") || lower.includes("pm") || lower.includes("moon")) {
      return <Moon size={15} />;
    }
    return <Layers size={15} />;
  };

  const getShortTabLabel = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes("morning") || lower.includes("am")) return "Morning (AM)";
    if (lower.includes("evening") || lower.includes("night") || lower.includes("pm")) return "Evening (PM)";
    return name.replace(/\s+regimen/i, "").trim();
  };

  return (
    <div className="vanity-container">
      <style>{`
        .vanity-container {
          width: 100%;
          max-width: 1040px;
          margin: 0 auto;
          padding: 0.5rem 0 3rem;
          box-sizing: border-box;
          min-width: 0;
        }

        /* Top Bar */
        .vanity-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: 1.5rem;
          margin-bottom: 1.75rem;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid var(--dash-border);
          width: 100%;
          box-sizing: border-box;
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
          font-size: 0.92rem;
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
          padding: 0.45rem 0.9rem;
          border-radius: 99px;
          font-size: 0.78rem;
          font-weight: 600;
        }

        .climate-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 8px #10b981;
        }

        /* Tab Navigation Bar - horizontal scrolling on mobile */
        .regimen-nav-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
          width: 100%;
          min-width: 0;
          box-sizing: border-box;
        }

        .regimen-tabs-scroll {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.5rem;
          background: var(--dash-surface);
          padding: 0.35rem;
          border-radius: 18px;
          border: 1px solid var(--dash-border);
          max-width: 100%;
          min-width: 0;
          box-sizing: border-box;
        }

        .regimen-tabs-scroll::-webkit-scrollbar {
          display: none;
        }

        .tab-name-short {
          display: none;
        }

        .tab-name-full {
          display: inline;
        }

        .regimen-tab-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.65rem 1.15rem;
          border-radius: 14px;
          border: none;
          background: transparent;
          color: var(--dash-muted);
          font-size: 0.88rem;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.15s ease;
          touch-action: manipulation;
        }

        .regimen-tab-btn.active {
          background: #fc2779;
          color: #ffffff;
          box-shadow: 0 4px 14px rgba(252, 39, 121, 0.3);
        }

        .add-tab-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.65rem 1rem;
          border-radius: 14px;
          border: 1px dashed var(--dash-border);
          background: transparent;
          color: var(--dash-muted);
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.15s ease;
          touch-action: manipulation;
        }

        .add-tab-btn:hover {
          color: var(--dash-accent);
          border-color: var(--dash-accent);
          background: var(--dash-accent-soft);
        }

        /* Regimen Controls Toolbar */
        .regimen-toolbar {
          display: flex;
          justifyContent: space-between;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.25rem;
          flex-wrap: wrap;
        }

        .regimen-title-row {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .regimen-title-text {
          font-family: var(--dash-font-serif);
          font-size: 1.35rem;
          margin: 0;
          color: var(--dash-ink);
          font-weight: 600;
        }

        /* Product Cards */
        .step-cards-stack {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .product-step-card {
          background: var(--dash-surface);
          border: 1px solid var(--dash-border);
          border-radius: 20px;
          padding: 1.3rem 1.5rem;
          display: flex;
          justifyContent: space-between;
          align-items: center;
          gap: 1.25rem;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
          box-shadow: 0 2px 8px rgba(0,0,0,0.02);
          content-visibility: auto;
          contain-intrinsic-size: 0 90px;
        }

        .product-step-card:hover {
          border-color: rgba(252, 39, 121, 0.25);
          box-shadow: 0 6px 20px rgba(40, 28, 20, 0.04);
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
          margin-bottom: 0.25rem;
        }

        .step-product-name {
          font-family: var(--dash-font-serif);
          font-size: 1.15rem;
          color: var(--dash-ink);
          margin: 0 0 0.25rem;
          font-weight: 600;
          line-height: 1.3;
        }

        .step-actives-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.75rem;
          color: var(--dash-muted);
          background: var(--dash-bg);
          padding: 2px 9px;
          border-radius: 99px;
          border: 1px solid var(--dash-border);
          font-weight: 500;
        }

        .step-actions {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          flex-shrink: 0;
        }

        .dupe-link-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.45rem 0.8rem;
          border-radius: 12px;
          background: var(--dash-bg);
          border: 1px solid var(--dash-border);
          color: var(--dash-ink);
          font-size: 0.78rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.15s;
          touch-action: manipulation;
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
          padding: 0.4rem 0.7rem;
          border-radius: 99px;
          background: rgba(16, 185, 129, 0.08);
          border: 1px solid rgba(16, 185, 129, 0.2);
          color: #10b981;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.02em;
        }

        .action-icon-btn {
          width: 36px;
          height: 36px;
          border-radius: 11px;
          border: 1px solid var(--dash-border);
          background: var(--dash-bg);
          color: var(--dash-muted);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.15s;
          touch-action: manipulation;
        }

        .action-icon-btn:hover {
          color: var(--dash-ink);
          border-color: var(--dash-ink);
        }

        .action-icon-btn.danger:hover {
          color: #ef4444;
          border-color: #ef4444;
          background: rgba(239, 68, 68, 0.08);
        }

        /* Upsell / Protocol Pass Card */
        .protocol-banner {
          background: linear-gradient(135deg, #181514 0%, #26211f 100%);
          border-radius: 24px;
          padding: 2rem 2.2rem;
          color: #fff;
          display: flex;
          justifyContent: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1.5rem;
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 10px 30px rgba(0,0,0,0.15);
          margin-top: 2rem;
        }

        .protocol-banner h3 {
          font-family: var(--dash-font-serif);
          font-size: 1.4rem;
          margin: 0 0 0.4rem;
          font-weight: 400;
        }

        .protocol-banner p {
          color: #a89f97;
          font-size: 0.88rem;
          margin: 0;
          max-width: 520px;
          line-height: 1.55;
        }

        .protocol-btn {
          background: #fc2779;
          color: #fff;
          padding: 0.85rem 1.5rem;
          border-radius: 14px;
          font-size: 0.9rem;
          font-weight: 700;
          border: none;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
          box-shadow: 0 6px 18px rgba(252, 39, 121, 0.3);
          transition: all 0.15s;
          touch-action: manipulation;
        }

        .protocol-btn:hover {
          filter: brightness(1.1);
        }

        /* Preset Chips */
        .preset-chip {
          padding: 0.4rem 0.8rem;
          border-radius: 99px;
          border: 1px solid var(--dash-border);
          background: var(--dash-bg);
          color: var(--dash-ink);
          font-size: 0.78rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.15s ease;
          touch-action: manipulation;
        }

        .preset-chip:hover {
          border-color: var(--dash-accent);
          color: var(--dash-accent);
          background: var(--dash-accent-soft);
        }

        @media (max-width: 640px) {
          /* Container — prevent any horizontal overflow */
          .vanity-container {
            padding: 0 0 3rem;
            width: 100%;
            max-width: 100%;
            overflow-x: hidden;
            box-sizing: border-box;
          }

          /* Header stacks vertically */
          .vanity-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.85rem;
            padding-bottom: 1rem;
            width: 100%;
          }

          .vanity-header-actions {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
          }

          .vanity-title {
            font-size: 1.6rem;
            line-height: 1.2;
          }

          .vanity-subtitle {
            font-size: 0.82rem;
            line-height: 1.45;
          }

          .climate-pill {
            font-size: 0.72rem;
            padding: 0.35rem 0.7rem;
            white-space: nowrap;
          }

          .tab-name-short {
            display: inline;
          }

          .tab-name-full {
            display: none;
          }

          /* Tab nav bar: tabs wrap cleanly, zero cutting */
          .regimen-nav-bar {
            flex-direction: column;
            align-items: stretch;
            gap: 0.75rem;
            width: 100%;
            min-width: 0;
          }

          .regimen-tabs-scroll {
            width: 100%;
            max-width: 100%;
            min-width: 0;
            display: flex;
            flex-wrap: wrap;
            gap: 0.35rem;
            padding: 0.35rem;
            border-radius: 16px;
            overflow: visible;
          }

          .regimen-tab-btn {
            padding: 0.55rem 0.8rem;
            font-size: 0.82rem;
            flex: 1 1 125px;
            justify-content: center;
            border-radius: 12px;
            white-space: nowrap;
          }

          .add-tab-btn {
            padding: 0.55rem 0.8rem;
            font-size: 0.82rem;
            flex: 0 0 auto;
            border-radius: 12px;
            justify-content: center;
          }

          .regimen-quick-actions {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 0.5rem;
          }

          .regimen-quick-actions .dupe-link-btn {
            flex: 1;
            justify-content: center;
          }

          /* Toolbar */
          .regimen-toolbar {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.3rem;
            width: 100%;
          }

          .regimen-title-row {
            width: 100%;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 0.4rem;
          }

          .regimen-title-text {
            font-size: 1.2rem;
            word-break: break-word;
          }

          /* Step cards stack */
          .product-step-card {
            flex-direction: column;
            align-items: flex-start;
            padding: 1rem;
            gap: 0.75rem;
            border-radius: 16px;
            width: 100%;
            box-sizing: border-box;
          }

          .step-actions {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-top: 1px solid var(--dash-border);
            padding-top: 0.75rem;
            margin-top: 0.25rem;
          }

          .step-product-name {
            font-size: 1rem;
          }

          /* Protocol banner */
          .protocol-banner {
            flex-direction: column;
            align-items: stretch;
            padding: 1.25rem;
            gap: 1rem;
            border-radius: 18px;
            width: 100%;
            box-sizing: border-box;
          }

          .protocol-banner h3 {
            font-size: 1.15rem;
          }

          .protocol-banner p {
            font-size: 0.82rem;
          }

          .protocol-btn {
            width: 100%;
            justify-content: center;
            padding: 0.8rem 1rem;
            box-sizing: border-box;
          }

          /* Empty Regimen Box */
          .empty-regimen-box {
            padding: 1.75rem 1rem !important;
            width: 100% !important;
            box-sizing: border-box !important;
          }

          .empty-regimen-actions {
            flex-direction: column !important;
            width: 100% !important;
            gap: 0.5rem !important;
          }

          .empty-regimen-actions button {
            width: 100% !important;
            justify-content: center !important;
          }

          /* Empty Vanity Box */
          .empty-vanity-box {
            padding: 2rem 1rem !important;
            width: 100% !important;
            box-sizing: border-box !important;
          }

          .empty-vanity-actions {
            flex-direction: column !important;
            width: 100% !important;
            gap: 0.5rem !important;
          }

          .empty-vanity-actions button {
            width: 100% !important;
            justify-content: center !important;
          }
        }
      `}</style>


      {/* Return Breadcrumb */}
      <div style={{ marginBottom: "1rem" }}>
        <Link href="/dashboard" style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.4rem",
          fontSize: "0.82rem",
          color: "var(--dash-muted)",
          textDecoration: "none",
          fontWeight: 600,
          transition: "color 0.15s ease"
        }}>
          ← Back to Daily Checklist
        </Link>
      </div>

      {/* Header */}
      <header className="vanity-header">
        <div>
          <h1 className="vanity-title">My Skincare Routines</h1>
          <p className="vanity-subtitle">
            Build and customize your active AM &amp; PM steps, synchronized with your climate and daily checklist.
          </p>
        </div>
        <div className="vanity-header-actions" style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", alignItems: "center" }}>
          <div className="climate-pill">
            <span className="climate-dot" />
            <span>Mumbai · 29°C · Calibrated</span>
          </div>
          <Link href="/tools/routine" className="dupe-link-btn" style={{ padding: "0.5rem 0.9rem", borderRadius: "99px" }}>
            <RefreshCw size={13} /> Recalibrate via Quiz
          </Link>
        </div>
      </header>

      {/* Notification Toasts */}
      {syncToast && (
        <div style={{
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
        }}>
          <CheckCircle2 size={18} />
          {syncToast}
        </div>
      )}

      {error && (
        <div style={{
          background: "#FEF2F2",
          border: "1px solid #FEE2E2",
          borderRadius: "14px",
          padding: "0.9rem 1.2rem",
          marginBottom: "1.5rem",
          color: "#991B1B",
          fontSize: "0.9rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <AlertCircle size={17} />
            <span>{error}</span>
          </div>
          <button onClick={() => setError(null)} style={{ background: "transparent", border: "none", cursor: "pointer", color: "inherit" }}>
            <X size={16} />
          </button>
        </div>
      )}

      {/* ── CASE 1: ZERO ROUTINES SAVED (EMPTY VANITY) ── */}
      {routines.length === 0 ? (
        <div className="empty-vanity-box" style={{
          background: "var(--dash-surface)",
          border: "1px solid var(--dash-border)",
          borderRadius: "24px",
          padding: "3rem 2rem",
          textAlign: "center",
          boxShadow: "0 4px 20px rgba(0,0,0,0.02)",
          marginBottom: "2rem"
        }}>
          <div style={{
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            background: "var(--dash-accent-soft)",
            color: "var(--dash-accent)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.25rem"
          }}>
            <Calendar size={26} />
          </div>
          <h2 style={{ fontFamily: "var(--dash-font-serif)", fontSize: "1.7rem", margin: "0 0 0.5rem", color: "var(--dash-ink)", fontWeight: 500 }}>
            Your Digital Vanity is Clean &amp; Empty
          </h2>
          <p style={{ color: "var(--dash-muted)", maxWidth: "480px", margin: "0 auto 1.8rem", fontSize: "0.92rem", lineHeight: 1.6 }}>
            You don&apos;t have any active regimens saved. Build your personalized routine step-by-step, or load our climate-calibrated AM and PM formulations.
          </p>
          <div className="empty-vanity-actions" style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={() => setShowNewRegimenModal(true)}
              style={{
                background: "var(--dash-accent)",
                color: "#ffffff",
                border: "none",
                borderRadius: "14px",
                padding: "0.8rem 1.4rem",
                fontWeight: 700,
                fontSize: "0.9rem",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.45rem",
                boxShadow: "0 4px 14px rgba(252, 39, 121, 0.3)"
              }}
            >
              <Plus size={16} /> Create Custom Regimen
            </button>
            <button
              onClick={handleLoadDefaultPair}
              disabled={isPending}
              style={{
                background: "var(--dash-surface)",
                border: "1px solid var(--dash-border)",
                color: "var(--dash-ink)",
                borderRadius: "14px",
                padding: "0.8rem 1.4rem",
                fontWeight: 600,
                fontSize: "0.9rem",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.45rem"
              }}
            >
              <RefreshCw size={15} /> Load Recommended AM &amp; PM
            </button>
          </div>
        </div>
      ) : (
        /* ── CASE 2: USER HAS SAVED ROUTINES ── */
        <>
          {/* Regimen Tab Navigation Bar */}
          <div className="regimen-nav-bar">
            <div className="regimen-tabs-scroll">
              {routines.map(routine => {
                const isActive = activeRoutine?.id === routine.id;
                return (
                  <button
                    key={routine.id}
                    className={`regimen-tab-btn ${isActive ? "active" : ""}`}
                    onClick={() => {
                      setSelectedId(routine.id);
                      setIsRenamingRegimen(false);
                      setShowAddStep(false);
                      setEditingStepIdx(null);
                    }}
                  >
                    {getTabIcon(routine.name)}
                    <span className="tab-name-full">{routine.name}</span>
                    <span className="tab-name-short">{getShortTabLabel(routine.name)}</span>
                    <span style={{ 
                      fontSize: "0.72rem", 
                      opacity: isActive ? 0.9 : 0.6,
                      background: isActive ? "rgba(255,255,255,0.2)" : "var(--dash-bg)",
                      padding: "2px 7px",
                      borderRadius: "99px",
                      marginLeft: "2px"
                    }}>
                      {Array.isArray(routine.steps) ? routine.steps.length : 0}
                    </span>
                  </button>
                );
              })}
              <button
                className="add-tab-btn"
                onClick={() => setShowNewRegimenModal(true)}
                title="Create a new routine regimen"
              >
                <Plus size={15} /> Add Regimen
              </button>
            </div>

            {/* Quick Actions for active regimen */}
            {activeRoutine && (
              <div className="regimen-quick-actions" style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <button 
                  onClick={() => setShowAddStep(true)}
                  className="dupe-link-btn"
                  style={{ borderRadius: "12px", padding: "0.6rem 0.95rem" }}
                >
                  <Plus size={15} /> Add Step
                </button>
                <button 
                  onClick={handleShareRoutine}
                  className="action-icon-btn"
                  title="Share this regimen"
                >
                  {sharedId ? <Check size={16} style={{ color: "#10b981" }} /> : <Share2 size={15} />}
                </button>
                {confirmDeleteId === activeRoutine.id ? (
                  <div style={{ display: "flex", gap: "0.3rem", alignItems: "center" }}>
                    <button
                      onClick={() => handleDeleteRoutine(activeRoutine.id)}
                      style={{
                        background: "#ef4444",
                        color: "#fff",
                        border: "none",
                        borderRadius: "10px",
                        padding: "0.45rem 0.75rem",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        cursor: "pointer"
                      }}
                    >
                      Confirm Delete
                    </button>
                    <button
                      onClick={() => setConfirmDeleteId(null)}
                      style={{
                        background: "var(--dash-bg)",
                        border: "1px solid var(--dash-border)",
                        borderRadius: "10px",
                        padding: "0.45rem 0.6rem",
                        cursor: "pointer"
                      }}
                    >
                      <X size={13} />
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => setConfirmDeleteId(activeRoutine.id)}
                    className="action-icon-btn danger"
                    title="Delete this entire regimen"
                  >
                    <Trash2 size={15} />
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Active Regimen Title Bar with Rename Option */}
          {activeRoutine && (
            <div className="regimen-toolbar">
              <div className="regimen-title-row">
                {isRenamingRegimen ? (
                  <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                    <input
                      value={renameValue}
                      onChange={(e) => setRenameValue(e.target.value)}
                      style={{
                        background: "var(--dash-bg)",
                        border: "1px solid var(--dash-accent)",
                        borderRadius: "10px",
                        padding: "0.4rem 0.8rem",
                        color: "var(--dash-ink)",
                        fontSize: "1.1rem",
                        fontWeight: 600
                      }}
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleRenameRoutine();
                        if (e.key === "Escape") setIsRenamingRegimen(false);
                      }}
                    />
                    <button
                      onClick={handleRenameRoutine}
                      style={{
                        background: "var(--dash-accent)",
                        color: "#fff",
                        border: "none",
                        borderRadius: "10px",
                        padding: "0.45rem 0.85rem",
                        fontWeight: 700,
                        cursor: "pointer",
                        fontSize: "0.8rem"
                      }}
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setIsRenamingRegimen(false)}
                      style={{ background: "transparent", border: "none", color: "var(--dash-muted)", cursor: "pointer" }}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className="regimen-title-text">{activeRoutine.name}</h2>
                    <button
                      onClick={() => {
                        setRenameValue(activeRoutine.name);
                        setIsRenamingRegimen(true);
                      }}
                      style={{
                        background: "transparent",
                        border: "none",
                        color: "var(--dash-muted)",
                        cursor: "pointer",
                        padding: "4px"
                      }}
                      title="Rename this regimen"
                    >
                      <Edit3 size={14} />
                    </button>
                  </>
                )}
              </div>
              <span style={{ fontSize: "0.82rem", color: "var(--dash-muted)" }}>
                {activeSteps.length} {activeSteps.length === 1 ? "formulation step" : "formulation steps"}
              </span>
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
                  borderRadius: "18px",
                  padding: "1.25rem",
                  marginBottom: "1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.85rem",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.03)"
                }}
              >
                {/* Category quick selectors */}
                <div>
                  <div style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700, color: "var(--dash-muted)", marginBottom: "0.4rem" }}>
                    Select Step Category (Click to Auto-Prefix)
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                    {[
                      { label: "Cleanser", prefix: "Cleanser: " },
                      { label: "Toner / Essence", prefix: "Toner: " },
                      { label: "Treatment Serum", prefix: "Serum: " },
                      { label: "Moisturizer", prefix: "Moisturizer: " },
                      { label: "Sunscreen / SPF", prefix: "Sunscreen: " },
                    ].map(cat => (
                      <button
                        key={cat.label}
                        type="button"
                        onClick={() => {
                          const currentClean = newStepInput.replace(/^(cleanser|toner|serum|moisturizer|sunscreen|step \d+):\s*/i, "");
                          setNewStepInput(cat.prefix + currentClean);
                        }}
                        style={{
                          background: newStepInput.toLowerCase().startsWith(cat.label.toLowerCase().slice(0, 4)) ? "var(--dash-accent-soft)" : "var(--dash-bg)",
                          border: newStepInput.toLowerCase().startsWith(cat.label.toLowerCase().slice(0, 4)) ? "1px solid var(--dash-accent)" : "1px solid var(--dash-border)",
                          color: newStepInput.toLowerCase().startsWith(cat.label.toLowerCase().slice(0, 4)) ? "var(--dash-accent)" : "var(--dash-ink)",
                          borderRadius: "10px",
                          padding: "0.3rem 0.65rem",
                          fontSize: "0.78rem",
                          fontWeight: 600,
                          cursor: "pointer",
                          transition: "all 0.15s ease"
                        }}
                      >
                        + {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                  <input 
                    type="text"
                    placeholder="e.g. Serum: Minimalist 10% Niacinamide Serum"
                    value={newStepInput}
                    onChange={(e) => setNewStepInput(e.target.value)}
                    style={{
                      flex: 1,
                      background: "var(--dash-bg)",
                      border: "1px solid var(--dash-border)",
                      borderRadius: "12px",
                      padding: "0.7rem 0.95rem",
                      color: "var(--dash-ink)",
                      outline: "none",
                      fontSize: "0.92rem"
                    }}
                    autoFocus
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
                      padding: "0.7rem 1.25rem",
                      fontWeight: 700,
                      cursor: "pointer",
                      fontSize: "0.88rem",
                      boxShadow: "0 4px 12px rgba(252, 39, 121, 0.3)",
                      whiteSpace: "nowrap"
                    }}
                  >
                    Save Step
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
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── CASE 2A: EMPTY STEPS IN ACTIVE ROUTINE ── */}
          {activeSteps.length === 0 ? (() => {
            const isPm = activeRoutine?.name.toLowerCase().includes("evening") || 
                         activeRoutine?.name.toLowerCase().includes("night") || 
                         activeRoutine?.name.toLowerCase().includes("pm");

            const presets = isPm ? [
              {
                title: "PM Barrier Repair & Recovery",
                desc: "Double Cleanse + Peptide Night Relief",
                steps: [
                  "Double Cleanse: Bioderma Sensibio H2O Micellar Water",
                  "Gentle Wash: CeraVe Hydrating Facial Cleanser",
                  "Night Nourish: Formularx Barrier Relief Peptide Cream"
                ]
              },
              {
                title: "PM Acne & Pore Clarifying",
                desc: "BHA Salicylic Treatment + Barrier Gel",
                steps: [
                  "Cleanser: COSRX Salicylic Acid Daily Gentle Cleanser",
                  "Active Treatment: Minimalist 2% Salicylic Acid (BHA) Serum",
                  "Night Gel: Sebamed Clear Face Care Gel"
                ]
              },
              {
                title: "PM Snail Mucin & Deep Glow",
                desc: "Hydrating Cleanse + Snail Mucin 96 + Ceramide",
                steps: [
                  "Cleanser: Gentle Hydrating Milk Cleanser",
                  "Hydrator: COSRX Advanced Snail 96 Mucin Power Essence",
                  "Barrier Cream: Ceramide NP & Peptide Moisture Shield"
                ]
              }
            ] : [
              {
                title: "AM Core Daily Trio",
                desc: "Gentle Cleanse + Sebamed Gel + SPF50+",
                steps: [
                  "Cleanser: COSRX Low pH Good Morning Gel Cleanser",
                  "Moisturizer: Sebamed Clear Face Care Gel",
                  "Sunscreen: SKIN1004 Madagascar Centella Hyalu-Cica Water-Fit Sun Serum SPF50+"
                ]
              },
              {
                title: "AM Oil & Shine Control",
                desc: "Niacinamide Serum + Matte Sun Fluid",
                steps: [
                  "Cleanser: Low pH Gentle Foaming Cleanser",
                  "Treatment: Minimalist 10% Niacinamide + Zinc Serum",
                  "Sunscreen: Broad-Spectrum Matte Sunscreen SPF50+"
                ]
              },
              {
                title: "AM Dewy Hydration & Glow",
                desc: "Hydrating Cleanse + Snail Mucin + SPF50+",
                steps: [
                  "Cleanser: Hydrating Foam Cleanser",
                  "Hydrator: COSRX Advanced Snail 96 Mucin Power Essence",
                  "Sunscreen: SKIN1004 Centella Hyalu-Cica Water-Fit Sun Serum SPF50+"
                ]
              }
            ];

            return (
              <div className="empty-regimen-box" style={{
                background: "var(--dash-surface)",
                border: "1px dashed var(--dash-border)",
                borderRadius: "24px",
                padding: "2.5rem 1.75rem",
                textAlign: "center",
                marginBottom: "2rem"
              }}>
                <p style={{ color: "var(--dash-ink)", fontWeight: 600, fontSize: "1.15rem", margin: "0 0 0.4rem", fontFamily: "var(--dash-font-serif)" }}>
                  Start Building Your {isPm ? "Evening (PM)" : "Morning (AM)"} Regimen
                </p>
                <p style={{ color: "var(--dash-muted)", fontSize: "0.9rem", maxWidth: "540px", margin: "0 auto 1.5rem", lineHeight: 1.55 }}>
                  {isPm 
                    ? "Evening routines focus on melting daytime sunscreen/pollution and nourishing the skin barrier overnight."
                    : "Morning routines focus on gentle cleansing, light non-greasy hydration, and broad-spectrum UV protection."
                  }
                </p>

                {/* 3 Context-Aware Starter Presets */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "0.85rem",
                  maxWidth: "720px",
                  margin: "0 auto 1.75rem",
                  textAlign: "left"
                }}>
                  {presets.map((preset, pIdx) => (
                    <div 
                      key={pIdx}
                      onClick={() => handleLoadPresetSteps(preset.steps)}
                      style={{
                        background: "var(--dash-bg)",
                        border: "1px solid var(--dash-border)",
                        borderRadius: "16px",
                        padding: "1rem",
                        cursor: "pointer",
                        transition: "all 0.15s ease"
                      }}
                    >
                      <div style={{ fontWeight: 700, fontSize: "0.88rem", color: "var(--dash-ink)", marginBottom: "0.25rem" }}>
                        {preset.title}
                      </div>
                      <div style={{ fontSize: "0.78rem", color: "var(--dash-muted)", lineHeight: 1.4 }}>
                        {preset.desc}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="empty-regimen-actions" style={{ display: "flex", gap: "0.6rem", justifyContent: "center", flexWrap: "wrap" }}>
                  <button
                    onClick={() => setShowAddStep(true)}
                    style={{
                      background: "var(--dash-accent)",
                      color: "#ffffff",
                      border: "none",
                      borderRadius: "12px",
                      padding: "0.65rem 1.25rem",
                      fontWeight: 700,
                      fontSize: "0.85rem",
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      boxShadow: "0 4px 12px rgba(252, 39, 121, 0.25)"
                    }}
                  >
                    <Plus size={15} /> Add Custom Step
                  </button>
                  {activeRoutine && (
                    <button
                      onClick={() => handleDeleteRoutine(activeRoutine.id)}
                      style={{
                        background: "transparent",
                        border: "1px solid #FEE2E2",
                        color: "#ef4444",
                        borderRadius: "12px",
                        padding: "0.65rem 1.15rem",
                        fontWeight: 600,
                        fontSize: "0.85rem",
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.4rem"
                      }}
                    >
                      <Trash2 size={14} /> Delete Regimen
                    </button>
                  )}
                </div>
              </div>
            );
          })() : (
            /* ── CASE 2B: STEPS EXIST ── */
            <div className="step-cards-stack">
              {activeSteps.map((rawStep, idx) => {
                const { role, name, actives } = parseStepInfo(rawStep, idx, activeRoutine?.name || "am");
                const isChecked = (checkedMap[activeRoutine?.id || "default"] || []).includes(idx);
                const isEditing = editingStepIdx === idx;

                return (
                  <div 
                    key={idx} 
                    className={`product-step-card ${isChecked ? "completed" : ""}`}
                  >
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", flex: 1 }}>
                      {/* Step Circle Check */}
                      <button
                        onClick={() => handleToggleStepCheck(idx)}
                        style={{
                          width: "34px",
                          height: "34px",
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
                          transition: "all 0.15s ease",
                          touchAction: "manipulation"
                        }}
                        title={isChecked ? "Mark as incomplete" : "Mark as completed"}
                      >
                        {isChecked ? <CheckCircle2 size={18} /> : <span style={{ fontSize: "0.8rem", fontWeight: 700 }}>{idx + 1}</span>}
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
                                fontSize: "0.95rem"
                              }}
                              autoFocus
                              onKeyDown={(e) => {
                                if (e.key === "Enter") handleSaveStepEdit(idx);
                                if (e.key === "Escape") setEditingStepIdx(null);
                              }}
                            />
                            <button 
                              onClick={() => handleSaveStepEdit(idx)}
                              style={{
                                background: "var(--dash-accent)",
                                color: "#ffffff",
                                border: "none",
                                borderRadius: "10px",
                                padding: "0.4rem 0.9rem",
                                cursor: "pointer",
                                fontWeight: 700,
                                fontSize: "0.82rem"
                              }}
                            >
                              Save
                            </button>
                            <button 
                              onClick={() => setEditingStepIdx(null)}
                              style={{ background: "transparent", border: "none", color: "var(--dash-muted)", cursor: "pointer" }}
                            >
                              <X size={15} />
                            </button>
                          </div>
                        ) : (
                          <h3 className="step-product-name" style={{ textDecoration: isChecked ? "line-through" : "none", opacity: isChecked ? 0.7 : 1 }}>
                            {name}
                          </h3>
                        )}

                        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "0.3rem" }}>
                          <span className="step-actives-pill">
                            <Droplets size={11} color="var(--dash-accent)" /> {actives}
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
                          title="This formulation is already an accessible, science-backed product."
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
                        <Edit3 size={14} />
                      </button>

                      <button 
                        onClick={() => handleDeleteStep(idx)}
                        className="action-icon-btn danger"
                        title="Remove Step"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* Modal / Panel: Add New Regimen */}
      <AnimatePresence>
        {showNewRegimenModal && (
          <div style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(4px)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem"
          }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              style={{
                background: "var(--dash-surface)",
                border: "1px solid var(--dash-border)",
                borderRadius: "24px",
                padding: "2rem",
                width: "100%",
                maxWidth: "480px",
                boxShadow: "0 20px 60px rgba(0,0,0,0.2)"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
                <h3 style={{ margin: 0, fontFamily: "var(--dash-font-serif)", fontSize: "1.4rem", color: "var(--dash-ink)", fontWeight: 500 }}>
                  Create New Regimen
                </h3>
                <button
                  onClick={() => setShowNewRegimenModal(false)}
                  style={{ background: "transparent", border: "none", color: "var(--dash-muted)", cursor: "pointer" }}
                >
                  <X size={18} />
                </button>
              </div>

              <div style={{ marginBottom: "1.25rem" }}>
                <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--dash-muted)", marginBottom: "0.4rem" }}>
                  Regimen Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Weekly AHA/BHA Exfoliation"
                  value={newRegimenName}
                  onChange={(e) => setNewRegimenName(e.target.value)}
                  style={{
                    width: "100%",
                    background: "var(--dash-bg)",
                    border: "1px solid var(--dash-border)",
                    borderRadius: "12px",
                    padding: "0.75rem 1rem",
                    color: "var(--dash-ink)",
                    fontSize: "0.95rem",
                    outline: "none"
                  }}
                  autoFocus
                />
                <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginTop: "0.6rem" }}>
                  {QUICK_REGIMEN_PRESETS.map(preset => (
                    <button
                      key={preset}
                      type="button"
                      className="preset-chip"
                      onClick={() => setNewRegimenName(preset)}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--dash-muted)", marginBottom: "0.4rem" }}>
                  Optional First Step
                </label>
                <input
                  type="text"
                  placeholder="e.g. Cleanser: Gentle Hydrating Foam"
                  value={newRegimenFirstStep}
                  onChange={(e) => setNewRegimenFirstStep(e.target.value)}
                  style={{
                    width: "100%",
                    background: "var(--dash-bg)",
                    border: "1px solid var(--dash-border)",
                    borderRadius: "12px",
                    padding: "0.75rem 1rem",
                    color: "var(--dash-ink)",
                    fontSize: "0.95rem",
                    outline: "none"
                  }}
                />
              </div>

              <div style={{ display: "flex", gap: "0.6rem", justifyContent: "flex-end" }}>
                <button
                  type="button"
                  onClick={() => setShowNewRegimenModal(false)}
                  style={{
                    background: "transparent",
                    border: "1px solid var(--dash-border)",
                    color: "var(--dash-muted)",
                    borderRadius: "12px",
                    padding: "0.7rem 1.2rem",
                    fontSize: "0.88rem",
                    fontWeight: 600,
                    cursor: "pointer"
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleCreateNewRegimen}
                  disabled={!newRegimenName.trim() || isPending}
                  style={{
                    background: newRegimenName.trim() ? "var(--dash-accent)" : "var(--dash-border)",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "12px",
                    padding: "0.7rem 1.4rem",
                    fontSize: "0.88rem",
                    fontWeight: 700,
                    cursor: newRegimenName.trim() ? "pointer" : "not-allowed"
                  }}
                >
                  Create Regimen
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Concierge Formulation Safety Upsell */}
      <section className="protocol-banner">
        <div>
          <span style={{ fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 700, color: "#fc2779" }}>
            Mirha Skin Concierge
          </span>
          <h3>Unlock Complete Formulation Safety &amp; Conflict Audit</h3>
          <p>
            Avoid product clashing (Retinol + AHA, Niacinamide + Vitamin C). Get instant AI clinical verification, local tap water calibration, and direct guidance for ₹199 one-time.
          </p>
        </div>
        <Link href="/dashboard/subscription" className="protocol-btn">
          Get Protocol Pass · ₹199 <ArrowRight size={15} />
        </Link>
      </section>
    </div>
  );
}
