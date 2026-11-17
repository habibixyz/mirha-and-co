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
 show: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 400, damping: 30 } }
 };

 const statCards = [
 {
 icon: <Flame size={14} />,
 label: "Streak",
 value: stats?.routineStreak || 0,
 unit: "days",
 color: "#fc2779",
 bg: "rgba(252, 39, 121, 0.05)"
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
 <>
 <style>{`
 .stats-grid-container {
 display: grid;
 grid-template-columns: repeat(4, minmax(0, 1fr));
 gap: 0.8rem;
 margin-bottom: 2rem;
 }

 .stat-card-item {
 background: var(--dash-surface);
 border: 1px solid var(--dash-border);
 border-radius: 12px;
 padding: 1rem 0.6rem;
 box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03), 0 1px 2px rgba(0, 0, 0, 0.02);
 display: flex;
 flex-direction: column;
 align-items: center;
 text-align: center;
 gap: 0.4rem;
 transition: border-color 0.15s ease;
 min-width: 0;
 }

 .stat-card-item:hover {
 border-color: rgba(252, 39, 121, 0.3);
 }

 @media (max-width: 768px) {
 .stats-grid-container {
 grid-template-columns: repeat(2, minmax(0, 1fr));
 gap: 0.6rem;
 margin-bottom: 1.5rem;
 }
 .stat-card-item {
 padding: 0.8rem 0.5rem;
 }
 }
 `}</style>

 <motion.div
 initial={false}
 animate="show"
 variants={containerVariants}
 className="stats-grid-container"
 >
 {statCards.map((stat, idx) => (
 <motion.div
 key={idx}
 variants={itemVariants}
 className="stat-card-item"
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

 <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 0, width: "100%" }}>
 <span style={{
 fontSize: "1.2rem",
 fontWeight: 700,
 color: "var(--dash-ink)",
 lineHeight: 1
 }}>
 {stat.value}
 </span>
 <span style={{ 
 fontSize: "0.58rem", 
 color: "var(--dash-muted)", 
 fontWeight: 700,
 textTransform: "uppercase",
 letterSpacing: "0.03em",
 marginTop: "0.2rem",
 overflow: "hidden",
 textOverflow: "ellipsis",
 whiteSpace: "nowrap",
 width: "100%"
 }}>
 {stat.label}
 </span>
 </div>
 </motion.div>
 ))}
 </motion.div>
 </>
 );
}