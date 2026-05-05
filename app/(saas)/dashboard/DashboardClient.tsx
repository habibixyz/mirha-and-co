"use client";


import { motion } from "framer-motion";
import { CheckCircle2, CalendarPlus, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function DashboardClient({ user, routines, recentJournal }: any) {


  // Dummy state for interactivity - for today's routine tracking
  const [checkedSteps, setCheckedSteps] = useState<number[]>([]);

  const toggleStep = (index: number) => {
    if (checkedSteps.includes(index)) {
      setCheckedSteps(checkedSteps.filter(i => i !== index));
    } else {
      setCheckedSteps([...checkedSteps, index]);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  };

  // Get first routine for morning checklist, or default if none
  const firstRoutine = routines && routines.length > 0 ? routines[0] : null;
  const steps = firstRoutine ? firstRoutine.steps : [
    "Cleanser: CeraVe Hydrating",
    "Serum: Vitamin C",
    "Moisturizer: SoonJung 2x",
    "SPF: Beauty of Joseon"
  ];
  const routineName = firstRoutine ? firstRoutine.name : "Morning Routine";

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={containerVariants}
    >
      <motion.header variants={itemVariants} style={{ marginBottom: "3rem" }}>
        <h1 style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: "2.8rem",
          fontWeight: 400,
          margin: "0 0 0.5rem",
          color: "var(--ink)",
          lineHeight: 1.1
        }}>
          Good Morning, {user?.name ? user.name.split(' ')[0] : "Beautiful"}
        </h1>
        <p style={{ color: "var(--muted)", margin: 0, fontSize: "1.05rem" }}>Here is your skin overview for today.</p>
      </motion.header>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: "2rem"
      }}>
        {/* Card 1: Routine */}
        <motion.div variants={itemVariants} style={{
          background: 'var(--white)',
          border: "1px solid var(--rule)",
          borderRadius: "16px",
          padding: "2rem",
          boxShadow: '0 12px 40px rgba(40, 28, 20, 0.04)',
          position: "relative",
          overflow: "hidden"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
            <h3 style={{ fontSize: "1.2rem", margin: 0, color: "var(--ink)", fontWeight: 500 }}>{routineName}</h3>
            <span style={{ fontSize: "0.85rem", color: "var(--muted)" }}>{checkedSteps.length}/{steps.length} completed</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {steps.map((step: string, idx: number) => {
              const isChecked = checkedSteps.includes(idx);
              return (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toggleStep(idx)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.8rem",
                    color: isChecked ? "var(--muted)" : "var(--ink)",
                    fontSize: "0.95rem",
                    cursor: "pointer",
                    padding: "0.5rem",
                    borderRadius: "8px",
                    background: isChecked ? "transparent" : '#fff',
                    border: isChecked ? "1px solid transparent" : "1px solid var(--rule)",
                    transition: "all 0.2s"
                  }}
                >
                  <CheckCircle2 size={20} color={isChecked ? "var(--rose)" : "var(--rule)"} />
                  <span style={{ textDecoration: isChecked ? "line-through" : "none" }}>{step}</span>
                </motion.div>
              );
            })}
          </div>

          <Link href="/dashboard/routines" style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            marginTop: "1.5rem",
            fontSize: "0.85rem",
            color: "var(--rose)",
            textDecoration: "none",
            fontWeight: 500
          }}>
            Manage routines <ChevronRight size={14} />
          </Link>
        </motion.div>

        {/* Card 2: Journal */}
        <motion.div variants={itemVariants} style={{
          background: 'var(--white)',
          border: "1px solid var(--rule)",
          borderRadius: "16px",
          padding: "2rem",
          boxShadow: '0 12px 40px rgba(40, 28, 20, 0.04)',
          display: "flex",
          flexDirection: "column"
        }}>
          <h3 style={{ fontSize: "1.2rem", margin: "0 0 1.5rem", color: "var(--ink)", fontWeight: 500 }}>Recent Journal</h3>

          {recentJournal ? (
            <div style={{
              background: 'var(--sand)',
              borderRadius: "12px",
              padding: "1.2rem",
              color: "var(--ink)",
              fontSize: "0.95rem",
              marginBottom: "auto",
              border: "1px solid rgba(0,0,0,0.05)"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                <span style={{ fontWeight: 500 }}>{new Date(recentJournal.date).toLocaleDateString()}</span>
                <span style={{ fontSize: "0.8rem", color: "var(--muted)" }}>★ {recentJournal.rating}/5</span>
              </div>
              <p style={{ margin: 0, color: "var(--muted)", lineHeight: 1.6 }}>"{recentJournal.entry}"</p>
            </div>
          ) : (
            <div style={{
              background: 'var(--sand)',
              borderRadius: "12px",
              padding: "1.2rem",
              color: "var(--muted)",
              fontSize: "0.95rem",
              marginBottom: "auto",
              border: "1px solid rgba(0,0,0,0.05)",
              textAlign: "center"
            }}>
              <p>No recent journal entries.</p>
            </div>
          )}

          <Link href="/dashboard/journal" style={{ textDecoration: "none", width: "100%" }}>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: "var(--rose)",
                color: "var(--white)",
                border: "none",
                borderRadius: "10px",
                padding: "1rem",
                fontSize: "0.95rem",
                cursor: "pointer",
                fontWeight: 500,
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                marginTop: "1.5rem",
                boxShadow: "0 4px 14px rgba(200, 71, 58, 0.2)"
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
