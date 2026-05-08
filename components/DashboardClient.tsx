"use client";

import { motion } from "framer-motion";
import { CheckCircle2, CalendarPlus, ChevronRight, LogOut } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { logoutAction, toggleRoutineStep } from "@/app/(saas)/actions";
import { DashboardStats } from "./DashboardStats";

export function DashboardClient({ user, routines, recentJournal, stats }: any) {
    const today = new Date().toISOString().split("T")[0];
    
    // Dynamic greeting based on hour
    const [greeting, setGreeting] = useState("Good Morning");
    
    useEffect(() => {
        const hour = new Date().getHours();
        if (hour >= 17) setGreeting("Good Evening");
        else if (hour >= 12) setGreeting("Good Afternoon");
        else setGreeting("Good Morning");
    }, []);
    
    // Get first routine
    const firstRoutine = routines && routines.length > 0 ? routines[0] : null;
    const routineId = firstRoutine?.id;
    
    const [checkedSteps, setCheckedSteps] = useState<number[]>([]);

    useEffect(() => {
        if (firstRoutine?.metadata?.logs?.[today]) {
            setCheckedSteps(firstRoutine.metadata.logs[today]);
        } else {
            setCheckedSteps([]);
        }
    }, [firstRoutine, today]);

    const toggleStep = async (index: number) => {
        if (!routineId) return;

        const isChecked = checkedSteps.includes(index);
        const newCheckedSteps = isChecked 
            ? checkedSteps.filter(i => i !== index)
            : [...checkedSteps, index];

        // Optimistic update
        setCheckedSteps(newCheckedSteps);

        try {
            await toggleRoutineStep(routineId, index, !isChecked);
        } catch (error) {
            console.error("Failed to toggle step:", error);
            setCheckedSteps(checkedSteps);
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
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
    };

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
            {/* MOBILE HEADER WITH LOGO ONLY (Sign out moved to sidebar) */}
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
                </div>
            </div>

            <style jsx>{`
                @media (max-width: 768px) {
                    .mobile-only { display: block !important; }
                    .desktop-only { display: none !important; }
                }
            `}</style>

            {/* Real stats wired and compact */}
            <DashboardStats stats={stats} />

            <motion.header variants={itemVariants} style={{ 
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
                        whileHover={{ scale: 1.05, background: "rgba(0,0,0,0.03)" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => logoutAction()}
                        style={{
                            background: "white",
                            border: "1px solid var(--dash-border)",
                            borderRadius: "14px",
                            padding: "0.6rem 1rem",
                            fontSize: "0.8rem",
                            cursor: "pointer",
                            color: "var(--dash-ink)",
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

            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "1.5rem"
            }}>
                {/* Card 1: Routine */}
                <motion.div variants={itemVariants} style={{
                    background: 'var(--white)',
                    border: "1px solid var(--dash-border)",
                    borderRadius: "28px",
                    padding: "2rem",
                    boxShadow: '0 20px 50px rgba(40, 28, 20, 0.05)',
                    position: "relative",
                    overflow: "hidden"
                }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                        <h3 style={{ fontSize: "1.2rem", margin: 0, color: "var(--dash-ink)", fontWeight: 600, fontFamily: "var(--dash-font-serif)" }}>{routineName}</h3>
                        <span style={{ fontSize: "0.8rem", color: "var(--dash-muted)", background: "var(--dash-bg)", padding: "4px 10px", borderRadius: "20px", fontWeight: 600 }}>{checkedSteps.length}/{steps.length} completed</span>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                        {steps.map((step: string, idx: number) => {
                            const isChecked = checkedSteps.includes(idx);
                            return (
                                <motion.div
                                    key={idx}
                                    whileHover={{ scale: 1.01, x: 4 }}
                                    whileTap={{ scale: 0.99 }}
                                    onClick={() => toggleStep(idx)}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "0.8rem",
                                        color: isChecked ? "var(--dash-muted)" : "var(--dash-ink)",
                                        fontSize: "0.95rem",
                                        cursor: "pointer",
                                        padding: "0.8rem 1rem",
                                        borderRadius: "18px",
                                        background: isChecked ? "rgba(0,0,0,0.02)" : '#fff',
                                        border: isChecked ? "1px solid transparent" : "1px solid var(--dash-border)",
                                        transition: "all 0.2s"
                                    }}
                                >
                                    <div style={{ 
                                        width: "20px", 
                                        height: "20px", 
                                        borderRadius: "50%", 
                                        border: isChecked ? "none" : "2px solid var(--dash-border)",
                                        background: isChecked ? "var(--dash-accent)" : "transparent",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: "white"
                                    }}>
                                        {isChecked && <CheckCircle2 size={14} />}
                                    </div>
                                    <span style={{ textDecoration: isChecked ? "line-through" : "none", fontWeight: isChecked ? 400 : 500 }}>{step}</span>
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
                        color: "var(--dash-accent)",
                        textDecoration: "none",
                        fontWeight: 600
                    }}>
                        Manage routines <ChevronRight size={14} />
                    </Link>
                </motion.div>

                {/* Card 2: Journal */}
                <motion.div variants={itemVariants} style={{
                    background: 'var(--white)',
                    border: "1px solid var(--dash-border)",
                    borderRadius: "28px",
                    padding: "2rem",
                    boxShadow: '0 20px 50px rgba(40, 28, 20, 0.05)',
                    display: "flex",
                    flexDirection: "column"
                }}>
                    <h3 style={{ fontSize: "1.2rem", margin: "0 0 1.5rem", color: "var(--dash-ink)", fontWeight: 600, fontFamily: "var(--dash-font-serif)" }}>Recent Journal</h3>

                    {recentJournal ? (
                        <div style={{
                            background: '#FAF9F7',
                            borderRadius: "22px",
                            padding: "1.2rem",
                            color: "var(--dash-ink)",
                            fontSize: "0.95rem",
                            marginBottom: "auto",
                            border: "1px solid var(--dash-border)"
                        }}>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.6rem", alignItems: "center" }}>
                                <span style={{ fontWeight: 600, fontSize: "0.85rem", opacity: 0.7 }}>{new Date(recentJournal.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                                <span style={{ fontSize: "0.8rem", color: "white", background: "var(--dash-ink)", padding: "2px 8px", borderRadius: "8px" }}>★ {recentJournal.rating}/5</span>
                            </div>
                            <p style={{ margin: 0, color: "var(--dash-muted)", lineHeight: 1.5, fontSize: "0.9rem" }}>"{recentJournal.entry}"</p>
                        </div>
                    ) : (
                        <div style={{
                            background: '#FAF9F7',
                            borderRadius: "22px",
                            padding: "2rem",
                            color: "var(--dash-muted)",
                            fontSize: "0.9rem",
                            marginBottom: "auto",
                            border: "1px dashed var(--dash-border)",
                            textAlign: "center"
                        }}>
                            <p>No recent journal entries.</p>
                        </div>
                    )}

                    <Link href="/dashboard/journal" style={{ textDecoration: "none", width: "100%" }}>
                        <motion.button
                            whileHover={{ scale: 1.02, background: "var(--dash-accent)", filter: "brightness(1.1)" }}
                            whileTap={{ scale: 0.98 }}
                            style={{
                                background: "var(--dash-accent)",
                                color: "var(--white)",
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
                                boxShadow: "0 10px 25px rgba(200, 71, 58, 0.25)",
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