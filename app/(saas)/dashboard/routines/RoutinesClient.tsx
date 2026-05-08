"use client";

import { useState, useTransition } from "react";
import { motion, Reorder } from "framer-motion";
import { Plus, GripVertical, Trash2, Check, X, Save } from "lucide-react";
import { saveRoutine, updateRoutine, getDashboardData, deleteRoutine } from "../../actions";

export function RoutinesClient({ initialRoutines }: { initialRoutines: any[] }) {
  const [routines, setRoutines] = useState(initialRoutines);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleAddRoutine = () => {
    const newRoutine = {
      id: `temp-${Date.now()}`,
      name: "New Routine",
      steps: ["New Step"],
      isNew: true
    };
    setRoutines([...routines, newRoutine]);
  };

  const handleDeleteRoutine = (id: string, isNew?: boolean) => {
    setRoutines(routines.filter(r => r.id !== id));
    if (!isNew) {
      startTransition(async () => {
        await deleteRoutine(id);
      });
    }
  };

  const handleUpdateRoutine = (id: string, newName: string, newSteps: string[], isNew?: boolean) => {
    setError(null);
    startTransition(async () => {
      try {
        if (isNew) {
          await saveRoutine(newName, newSteps);
        } else {
          await updateRoutine(id, newName, newSteps);
        }
        const refreshed = await getDashboardData();
        if (refreshed.routines) {
          setRoutines(refreshed.routines);
        }
      } catch (err: any) {
        setError(err?.message || "Failed to save routine.");
      }
    });
  };

  const handleAddStep = (routineId: string) => {
    setRoutines(routines.map(r => r.id === routineId ? { ...r, steps: [...r.steps, "New Step"] } : r));
  };

  const handleRemoveStep = (routineId: string, stepIdx: number) => {
    setRoutines(routines.map(r => r.id === routineId ? { ...r, steps: r.steps.filter((_: any, idx: number) => idx !== stepIdx) } : r));
  };

  const updateStep = (routineId: string, stepIdx: number, val: string) => {
    setRoutines(routines.map(r => {
      if (r.id === routineId) {
        const newSteps = [...r.steps];
        newSteps[stepIdx] = val;
        return { ...r, steps: newSteps };
      }
      return r;
    }));
  };

  const updateName = (routineId: string, val: string) => {
    setRoutines(routines.map(r => r.id === routineId ? { ...r, name: val } : r));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div initial="hidden" animate="show" variants={containerVariants}>
      <motion.header variants={itemVariants} style={{ 
        marginBottom: "3rem", 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        flexWrap: "wrap",
        gap: "1.5rem"
      }}>
        <div>
          <h1 style={{
            fontFamily: "var(--dash-font-serif)",
            fontSize: "var(--font-h1)",
            fontWeight: 400,
            margin: "0 0 0.5rem",
            color: "var(--dash-ink)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em"
          }}>
            My Routines
          </h1>
          <p style={{ color: "var(--dash-muted)", margin: 0, fontSize: "clamp(0.9rem, 2vw, 1.05rem)" }}>Design and manage your skincare regimens.</p>
        </div>
        <motion.button
          onClick={handleAddRoutine}
          whileHover={{ scale: 1.05, background: "var(--dash-ink)", filter: "brightness(1.2)" }}
          whileTap={{ scale: 0.95 }}
          style={{
            background: "var(--dash-ink)",
            color: "var(--white)",
            border: "none",
            borderRadius: "18px",
            padding: "0.9rem 1.6rem",
            fontSize: "0.95rem",
            cursor: "pointer",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
            transition: "all 0.2s"
          }}
        >
          <Plus size={20} /> New Routine
        </motion.button>
      </motion.header>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: "#FEF2F2",
            border: "1px solid #FEE2E2",
            borderRadius: "20px",
            padding: "1.25rem 1.5rem",
            marginBottom: "2.5rem",
            color: "#991B1B",
            fontSize: "0.95rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
            boxShadow: "0 4px 12px rgba(153, 27, 27, 0.05)"
          }}
        >
          <div style={{ flex: 1 }}>
            {error === "UPGRADE_ROUTINE" ? (
              <div>
                <p style={{ margin: "0 0 0.4rem", fontWeight: 700 }}>Daily limit reached</p>
                <p style={{ margin: "0 0 0.8rem", fontSize: "0.9rem", opacity: 0.8 }}>Upgrade to Pro for 10 daily routines and premium insights.</p>
                <a href="/dashboard/subscription" style={{ color: "#B91C1C", fontWeight: 700, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.2rem" }}>Upgrade to Pro →</a>
              </div>
            ) : (
              <span>{error}</span>
            )}
          </div>
          <button onClick={() => setError(null)} style={{ background: "transparent", border: "none", color: "inherit", cursor: "pointer", opacity: 0.5 }}><X size={20} /></button>
        </motion.div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2rem" }}>
        {routines.map(routine => (
          <motion.div
            key={routine.id}
            variants={itemVariants}
            style={{
              background: 'var(--white)',
              border: "1px solid var(--dash-border)",
              borderRadius: "32px",
              padding: "2.5rem",
              boxShadow: '0 20px 50px rgba(40, 28, 20, 0.05)',
              display: "flex",
              flexDirection: "column"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", gap: "1rem" }}>
              <input
                value={routine.name}
                onChange={(e) => updateName(routine.id, e.target.value)}
                style={{ 
                  fontSize: "1.4rem", 
                  margin: 0, 
                  color: "var(--dash-ink)", 
                  fontWeight: 600, 
                  background: "transparent", 
                  border: "none", 
                  outline: "none", 
                  width: "100%",
                  fontFamily: "var(--dash-font-serif)"
                }}
              />
              <div style={{ display: "flex", gap: "0.4rem" }}>
                <motion.button
                  whileHover={{ scale: 1.1, background: "rgba(5, 150, 105, 0.1)", color: "#059669" }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleUpdateRoutine(routine.id, routine.name, routine.steps, routine.isNew)}
                  disabled={isPending}
                  style={{ 
                    background: "rgba(0,0,0,0.03)", 
                    border: "none", 
                    cursor: "pointer", 
                    color: "var(--dash-ink)", 
                    padding: "10px", 
                    borderRadius: "14px",
                    display: "flex",
                    transition: "all 0.2s"
                  }}
                >
                  <Save size={18} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1, background: "rgba(200, 71, 58, 0.1)", color: "var(--dash-accent)" }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleDeleteRoutine(routine.id, routine.isNew)}
                  disabled={isPending}
                  style={{ 
                    background: "rgba(0,0,0,0.03)", 
                    border: "none", 
                    cursor: "pointer", 
                    color: "var(--dash-muted)", 
                    padding: "10px", 
                    borderRadius: "14px",
                    display: "flex",
                    transition: "all 0.2s"
                  }}
                >
                  <Trash2 size={18} />
                </motion.button>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
              {routine.steps.map((step: string, idx: number) => (
                <div key={idx} style={{
                  background: '#fff',
                  border: "1px solid var(--dash-border)",
                  color: "var(--dash-ink)",
                  padding: "1rem 1.25rem",
                  borderRadius: "18px",
                  fontSize: "1rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  transition: "all 0.2s"
                }}>
                  <GripVertical size={16} style={{ color: "var(--dash-muted)", opacity: 0.4, cursor: "grab" }} />
                  <span style={{ fontWeight: 700, fontSize: "0.85rem", color: "var(--dash-accent)", width: "20px", opacity: 0.6 }}>{idx + 1}</span>
                  <input
                    value={step}
                    onChange={(e) => updateStep(routine.id, idx, e.target.value)}
                    style={{ background: "transparent", border: "none", outline: "none", width: "100%", color: "var(--dash-ink)", fontWeight: 500 }}
                  />
                  <button 
                    onClick={() => handleRemoveStep(routine.id, idx)} 
                    style={{ background: "transparent", border: "none", color: "var(--dash-muted)", cursor: "pointer", opacity: 0.5 }}
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>

            <motion.button
              onClick={() => handleAddStep(routine.id)}
              whileHover={{ background: 'rgba(0,0,0,0.03)', scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              style={{
                width: "100%",
                background: "transparent",
                border: "2px dashed var(--dash-border)",
                borderRadius: "18px",
                padding: "1rem",
                marginTop: "1.5rem",
                color: "var(--dash-muted)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                fontSize: "0.95rem",
                fontWeight: 600,
                transition: "all 0.2s"
              }}
            >
              <Plus size={18} /> Add Step
            </motion.button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
