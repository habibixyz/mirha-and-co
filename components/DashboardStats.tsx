"use client";

import { motion } from "framer-motion";
import { Flame, BookOpen, TrendingUp, Target } from "lucide-react";

export function DashboardStats({ stats }: any) {
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.04 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 400, damping: 30 } }
    };

    const statCards = [
        {
            icon: <Flame size={14} />,
            label: "Streak",
            value: stats?.routineStreak || 0,
            unit: "days",
            color: "#C8473A",
            bg: "rgba(200, 71, 58, 0.05)"
        },
        {
            icon: <BookOpen size={14} />,
            label: "Entries",
            value: stats?.journalCount || 0,
            unit: "total",
            color: "#9333EA",
            bg: "rgba(147, 51, 234, 0.05)"
        },
        {
            icon: <TrendingUp size={14} />,
            label: "Score",
            value: stats?.skinScore || 0,
            unit: "%",
            color: "#059669",
            bg: "rgba(5, 150, 105, 0.05)"
        },
        {
            icon: <Target size={14} />,
            label: "Goals",
            value: stats?.completedGoals || 0,
            unit: "today",
            color: "#D97706",
            bg: "rgba(217, 119, 6, 0.05)"
        }
    ];

    return (
        <motion.div
            initial="hidden"
            animate="show"
            variants={containerVariants}
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "0.6rem",
                marginBottom: "1.5rem"
            }}
        >
            {statCards.map((stat, idx) => (
                <motion.div
                    key={idx}
                    variants={itemVariants}
                    style={{
                        background: "var(--white)",
                        border: "1px solid var(--dash-border)",
                        borderRadius: "16px",
                        padding: "0.8rem 0.5rem",
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.02)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                        gap: "0.4rem",
                        transition: "all 0.3s ease"
                    }}
                >
                    <div style={{ 
                        color: stat.color, 
                        background: stat.bg, 
                        padding: "6px", 
                        borderRadius: "10px",
                        display: "flex" 
                    }}>
                        {stat.icon}
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <span style={{
                            fontSize: "1.1rem",
                            fontWeight: 700,
                            color: "var(--dash-ink)",
                            lineHeight: 1
                        }}>
                            {stat.value}
                        </span>
                        <span style={{ 
                            fontSize: "0.55rem", 
                            color: "var(--dash-muted)", 
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: "0.03em",
                            marginTop: "0.1rem"
                        }}>
                            {stat.label}
                        </span>
                    </div>
                </motion.div>
            ))}
        </motion.div>
    );
}