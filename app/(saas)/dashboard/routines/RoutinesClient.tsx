"use client";

import { useState, useTransition } from "react";

import { motion } from "framer-motion";
import { Plus, GripVertical, Trash2, Check, X } from "lucide-react";
import { saveRoutine, updateRoutine, deleteRoutine } from "../../actions";

export function RoutinesClient({ initialRoutines }: { initialRoutines: any[] }) {

  // We'll manage optimistic state
  const [routines, setRoutines] = useState(initialRoutines);
  const [isPending, startTransition] = useTransition();

  // Add a new empty routine
  const handleAddRoutine = () => {
    const newRoutine = {
      id: `temp-${Date.now()}`,
      name: "New Routine",
      steps: ["New Step"],
      isNew: true
    };
    setRoutines([...routines, newRoutine]);
  };

  const handleDeleteRoutine = async (id: string, isNew?: boolean) => {
    setRoutines(routines.filter(r => r.id !== id));
    if (!isNew) {
      startTransition(async () => {
        await deleteRoutine(id);
      });
    }
  };

  const handleUpdateRoutine = async (id: string, newName: string, newSteps: string[], isNew?: boolean) => {
    const updated = routines.map(r => r.id === id ? { ...r, name: newName, steps: newSteps, isNew: false } : r);
    setRoutines(updated);

    startTransition(async () => {
      if (isNew) {
        await saveRoutine(newName, newSteps);
      } else {
        await updateRoutine(id, newName, newSteps);
      }
      // Note: For a true production app, we would re-fetch the routine IDs after saving 
      // but revalidatePath will handle refreshing the page data on next load.
    });
  };

  const handleAddStep = (routineId: string) => {
    setRoutines(routines.map(r => {
      if (r.id === routineId) {
        return { ...r, steps: [...r.steps, "New Step"] };
      }
      return r;
    }));
  };

  const handleRemoveStep = (routineId: string, stepIdx: number) => {
    setRoutines(routines.map(r => {
      if (r.id === routineId) {
        return { ...r, steps: r.steps.filter((_: any, idx: number) => idx !== stepIdx) };
      }
      return r;
    }));
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
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div initial="hidden" animate="show" variants={containerVariants}>
      <motion.header variants={itemVariants} style={{ marginBottom: "3rem", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h1 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "2.8rem",
            fontWeight: 400,
            margin: "0 0 0.5rem",
            color: "var(--ink)",
            lineHeight: 1.1
          }}>
            My Routines
          </h1>
          <p style={{ color: "var(--muted)", margin: 0, fontSize: "1.05rem" }}>Design and manage your skincare regimens.</p>
        </div>
        <motion.button
          onClick={handleAddRoutine}
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
          <Plus size={18} /> New Routine
        </motion.button>
      </motion.header>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "2rem" }}>
        {routines.map(routine => (
          <motion.div
            key={routine.id}
            variants={itemVariants}
            style={{
              background: 'var(--white)',
              border: "1px solid var(--rule)",
              borderRadius: "16px",
              padding: "2rem",
              boxShadow: '0 12px 40px rgba(40, 28, 20, 0.04)',
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <input
                value={routine.name}
                onChange={(e) => updateName(routine.id, e.target.value)}
                style={{ fontSize: "1.3rem", margin: 0, color: "var(--ink)", fontWeight: 500, background: "transparent", border: "none", outline: "none", width: "100%" }}
              />
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button onClick={() => handleUpdateRoutine(routine.id, routine.name, routine.steps, routine.isNew)} title="Save changes" style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--ink)", padding: "0.5rem" }}><Check size={18} /></button>
                <button onClick={() => handleDeleteRoutine(routine.id, routine.isNew)} title="Delete routine" style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--rose)", padding: "0.5rem" }}><Trash2 size={18} /></button>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
              {routine.steps.map((step: string, idx: number) => (
                <div key={idx} style={{
                  background: '#fff',
                  border: "1px solid var(--rule)",
                  color: "var(--ink)",
                  padding: "0.8rem 1rem",
                  borderRadius: "8px",
                  fontSize: "0.95rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem"
                }}>
                  <GripVertical size={16} color="var(--muted)" style={{ cursor: "grab" }} />
                  <span style={{ fontWeight: 500, fontSize: "0.8rem", color: "var(--muted)", width: "20px" }}>{idx + 1}</span>
                  <input
                    value={step}
                    onChange={(e) => updateStep(routine.id, idx, e.target.value)}
                    style={{ background: "transparent", border: "none", outline: "none", width: "100%", color: "var(--ink)" }}
                  />
                  <button onClick={() => handleRemoveStep(routine.id, idx)} style={{ background: "transparent", border: "none", color: "var(--muted)", cursor: "pointer" }}><X size={14} /></button>
                </div>
              ))}
            </div>

            <motion.button
              onClick={() => handleAddStep(routine.id)}
              whileHover={{ background: 'rgba(0,0,0,0.03)' }}
              style={{
                width: "100%",
                background: "transparent",
                border: "1px dashed var(--rule)",
                borderRadius: "8px",
                padding: "0.8rem",
                marginTop: "1rem",
                color: "var(--muted)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                fontSize: "0.9rem"
              }}
            >
              <Plus size={16} /> Add Step
            </motion.button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
