"use client";

import { CheckCircle2, CalendarPlus, ChevronRight } from "lucide-react";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { toggleRoutineStep } from "../actions";

const MONTHS_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatJournalDateSafe(d: Date | string | null | undefined): string {
  if (!d) return "";
  try {
    const date = typeof d === "string" ? new Date(d) : d;
    if (isNaN(date.getTime())) return "";
    return `${MONTHS_SHORT[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
  } catch {
    return "";
  }
}

export function DashboardClient({ user, routines, recentJournal }: any) {
  const [, startTransition] = React.useTransition();

  const firstRoutine = routines && routines.length > 0 ? routines[0] : null;
  const today = new Date().toISOString().split("T")[0];

  const [checkedSteps, setCheckedSteps] = useState<number[]>(() => {
    if (!firstRoutine || !firstRoutine.metadata?.logs?.[today]) return [];
    return firstRoutine.metadata.logs[today];
  });

  // Mount animation via CSS — no framer-motion re-renders on state change
  const mounted = useRef(false);
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      requestAnimationFrame(() => setShow(true));
    }
  }, []);

  const toggleStep = (index: number) => {
    if (!firstRoutine) return;
    const isChecked = checkedSteps.includes(index);

    // Instant optimistic update — UI responds immediately
    setCheckedSteps(prev =>
      isChecked ? prev.filter(i => i !== index) : [...prev, index]
    );

    startTransition(async () => {
      try {
        await toggleRoutineStep(firstRoutine.id, index, !isChecked);
      } catch {
        // Rollback on error
        setCheckedSteps(prev =>
          !isChecked ? prev.filter(i => i !== index) : [...prev, index]
        );
      }
    });
  };

  const steps = firstRoutine ? firstRoutine.steps : [
    "Cleanser: CeraVe Hydrating",
    "Serum: Vitamin C",
    "Moisturizer: SoonJung 2x",
    "SPF: Beauty of Joseon",
  ];
  const routineName = firstRoutine ? firstRoutine.name : "Morning Routine";

  return (
    <>
      <style>{`
        .dash-client-wrap {
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .dash-client-wrap.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .step-row {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          font-size: 0.95rem;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 8px;
          transition: background 0.15s, border-color 0.15s, color 0.15s;
          border: 1px solid var(--rule);
          background: var(--white);
          color: var(--ink);
          user-select: none;
        }
        .step-row:hover {
          background: var(--sand);
        }
        .step-row.checked {
          background: transparent;
          border-color: transparent;
          color: var(--muted);
        }
        .step-row:active {
          transform: scale(0.99);
        }
        .dash-card {
          background: var(--white);
          border: 1px solid var(--rule);
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03), 0 1px 2px rgba(0, 0, 0, 0.02);
        }
        .journal-btn {
          background: var(--rose);
          color: var(--white);
          border: none;
          border-radius: 8px;
          padding: 0.75rem 1rem;
          font-size: 0.88rem;
          cursor: pointer;
          font-weight: 600;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin-top: 1.25rem;
          transition: background 0.15s ease;
        }
        .journal-btn:hover {
          background: #e01f69;
        }
      `}</style>

      <div className={`dash-client-wrap${show ? " visible" : ""}`}>
        <header style={{ marginBottom: "2rem" }}>
          <h1 style={{
            fontFamily: "var(--font-dm-serif), serif",
            fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
            fontWeight: 400,
            margin: "0 0 0.25rem",
            color: "var(--ink)",
            lineHeight: 1.15,
          }}>
            Good Morning, {user?.name ? user.name.split(" ")[0] : "Beautiful"}
          </h1>
          <p style={{ color: "var(--muted)", margin: 0, fontSize: "0.92rem" }}>
            Here is your skin overview for today.
          </p>
        </header>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "1.5rem",
        }}>
          {/* Card 1: Routine */}
          <div className="dash-card" style={{ position: "relative", overflow: "hidden" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <h3 style={{ fontSize: "1.2rem", margin: 0, color: "var(--ink)", fontWeight: 500 }}>
                {routineName}
              </h3>
              <span style={{ fontSize: "0.85rem", color: "var(--muted)" }}>
                {checkedSteps.length}/{steps.length} completed
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {steps.map((step: string, idx: number) => {
                const isChecked = checkedSteps.includes(idx);
                return (
                  <div
                    key={idx}
                    className={`step-row${isChecked ? " checked" : ""}`}
                    onClick={() => toggleStep(idx)}
                  >
                    <CheckCircle2 size={20} color={isChecked ? "var(--rose)" : "var(--rule)"} />
                    <span style={{ textDecoration: isChecked ? "line-through" : "none" }}>
                      {step}
                    </span>
                  </div>
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
              fontWeight: 500,
            }}>
              Manage routines <ChevronRight size={14} />
            </Link>
          </div>

          {/* Card 2: Journal */}
          <div className="dash-card" style={{ display: "flex", flexDirection: "column" }}>
            <h3 style={{ fontSize: "1.2rem", margin: "0 0 1.5rem", color: "var(--ink)", fontWeight: 500 }}>
              Recent Journal
            </h3>

            {recentJournal ? (
              <div style={{
                background: "var(--sand)",
                borderRadius: "12px",
                padding: "1.2rem",
                color: "var(--ink)",
                fontSize: "0.95rem",
                marginBottom: "auto",
                border: "1px solid rgba(0,0,0,0.05)",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <span suppressHydrationWarning style={{ fontWeight: 500 }}>
                    {formatJournalDateSafe(recentJournal.date)}
                  </span>
                  <span style={{ fontSize: "0.8rem", color: "var(--muted)" }}>
                    ★ {recentJournal.rating}/5
                  </span>
                </div>
                <p style={{ margin: 0, color: "var(--muted)", lineHeight: 1.6 }}>
                  &ldquo;{recentJournal.entry}&rdquo;
                </p>
              </div>
            ) : (
              <div style={{
                background: "var(--sand)",
                borderRadius: "12px",
                padding: "1.2rem",
                color: "var(--muted)",
                fontSize: "0.95rem",
                marginBottom: "auto",
                border: "1px solid rgba(0,0,0,0.05)",
                textAlign: "center",
              }}>
                <p>No recent journal entries.</p>
              </div>
            )}

            <Link href="/dashboard/journal" style={{ textDecoration: "none", width: "100%" }}>
              <button className="journal-btn">
                <CalendarPlus size={18} /> Add Today&apos;s Entry
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
