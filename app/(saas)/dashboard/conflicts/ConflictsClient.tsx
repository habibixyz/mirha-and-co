"use client";

import { useState, useEffect, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, CheckCircle, ShieldAlert, Lock, ArrowRight, Star, Plus, X, Tag } from "lucide-react";
import Link from "next/link";
import { updateUserBlacklist } from "../../actions";

interface ConflictRule {
 a: string;
 b: string;
 severity: "avoid" | "caution" | "ok";
 reason: string;
}

const RULES: ConflictRule[] = [
 {
 a: "retinol",
 b: "aha",
 severity: "avoid",
 reason: "Using AHA and retinol together can cause significant irritation and barrier damage. Use AHA in the morning and retinol at night, or alternate nights.",
 },
 {
 a: "retinol",
 b: "glycolic acid",
 severity: "avoid",
 reason: "Glycolic acid and retinol together are too aggressive for most skin types. Alternate nights.",
 },
 {
 a: "retinol",
 b: "salicylic acid",
 severity: "caution",
 reason: "Can be used together if skin is not sensitive, but introduce gradually. If irritation occurs, use on separate nights.",
 },
 {
 a: "niacinamide",
 b: "vitamin c",
 severity: "caution",
 reason: "High concentrations of niacinamide and vitamin C together may reduce efficacy. Use them at different times of day (vitamin C AM, niacinamide PM).",
 },
 {
 a: "benzoyl peroxide",
 b: "retinol",
 severity: "avoid",
 reason: "Benzoyl peroxide can oxidise and deactivate retinol. Do not use at the same time.",
 },
 {
 a: "aha",
 b: "bha",
 severity: "caution",
 reason: "Combining AHA and BHA can over-exfoliate. Use one at a time, or alternate days.",
 },
 {
 a: "vitamin c",
 b: "retinol",
 severity: "caution",
 reason: "Both are active and can destabilise each other. Vitamin C is ideal for AM, retinol for PM.",
 },
 {
 a: "niacinamide",
 b: "aha",
 severity: "ok",
 reason: "Generally fine to use together. Niacinamide can help buffer sensitivity from AHA exfoliants.",
 },
 {
 a: "copper peptides",
 b: "vitamin c",
 severity: "avoid",
 reason: "Copper peptides can oxidize vitamin C (ascorbic acid), deactivating it and making it less effective. Apply them in separate routines.",
 },
];

const SEVERITY_STYLE = {
 avoid: {
 bg: "rgba(239, 68, 68, 0.08)",
 border: "rgba(239, 68, 68, 0.2)",
 color: "#b91c1c",
 badgeBg: "#fef2f2",
 label: "Avoid Layering",
 icon: <ShieldAlert size={18} className="text-red-600" />
 },
 caution: {
 bg: "rgba(245, 158, 11, 0.08)",
 border: "rgba(245, 158, 11, 0.2)",
 color: "#b45309",
 badgeBg: "#fffbeb",
 label: "Layer with Caution",
 icon: <AlertTriangle size={18} className="text-amber-600" />
 },
 ok: {
 bg: "rgba(16, 185, 129, 0.08)",
 border: "rgba(16, 185, 129, 0.2)",
 color: "#047857",
 badgeBg: "#ecfdf5",
 label: "Safe to Pair",
 icon: <CheckCircle size={18} className="text-emerald-600" />
 },
};

function normalize(s: string) {
 return s.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function findConflicts(a: string, b: string): ConflictRule[] {
 const found: ConflictRule[] = [];
 const termsA = a.toLowerCase().split(/[\s,;]+/).filter(Boolean);
 const termsB = b.toLowerCase().split(/[\s,;]+/).filter(Boolean);

 for (const rule of RULES) {
 const ruleA = normalize(rule.a);
 const ruleB = normalize(rule.b);
 const matchA = termsA.some((t) => normalize(t).includes(ruleA) || ruleA.includes(normalize(t)));
 const matchB = termsB.some((t) => normalize(t).includes(ruleB) || ruleB.includes(normalize(t)));
 const matchAB = termsA.some((t) => normalize(t).includes(ruleB) || ruleB.includes(normalize(t)));
 const matchBA = termsB.some((t) => normalize(t).includes(ruleA) || ruleA.includes(normalize(t)));

 if ((matchA && matchB) || (matchAB && matchBA)) {
 if (!found.find((f) => f.a === rule.a && f.b === rule.b)) {
 found.push(rule);
 }
 }
 }
 return found;
}

export function ConflictsClient({ isPro, initialBlacklist = [] }: { isPro: boolean; initialBlacklist?: string[] }) {
 const [productA, setProductA] = useState("");
 const [productB, setProductB] = useState("");
 const [results, setResults] = useState<ConflictRule[] | null>(null);
 
 const [blacklist, setBlacklist] = useState<string[]>(initialBlacklist);
 const [newIngredient, setNewIngredient] = useState("");
 const [isSaving, startTransition] = useTransition();

 useEffect(() => {
 if (!productA.trim() || !productB.trim()) {
 setResults(null);
 }
 }, [productA, productB]);

 const handleAddIngredient = (e: React.FormEvent) => {
 e.preventDefault();
 if (!newIngredient.trim()) return;
 const added = newIngredient.trim();
 if (blacklist.includes(added)) return;

 const updated = [...blacklist, added];
 setBlacklist(updated);
 setNewIngredient("");

 startTransition(async () => {
 try {
 await updateUserBlacklist(updated);
 } catch (err) {
 console.error("Failed to save blacklist:", err);
 }
 });
 };

 const handleRemoveIngredient = (item: string) => {
 const updated = blacklist.filter(i => i !== item);
 setBlacklist(updated);

 startTransition(async () => {
 try {
 await updateUserBlacklist(updated);
 } catch (err) {
 console.error("Failed to save blacklist:", err);
 }
 });
 };

 function check() {
 if (!productA.trim() || !productB.trim()) return;

 const chemicalConflicts = findConflicts(productA, productB);
 const blacklistConflicts: ConflictRule[] = [];

 const termsA = productA.toLowerCase().split(/[\s,;]+/).filter(Boolean).map(t => t.trim().replace(/[^a-z0-9]/g, ""));
 const termsB = productB.toLowerCase().split(/[\s,;]+/).filter(Boolean).map(t => t.trim().replace(/[^a-z0-9]/g, ""));

 blacklist.forEach(item => {
 const normalizedItem = item.trim().toLowerCase().replace(/[^a-z0-9]/g, "");
 if (!normalizedItem) return;

 const inA = termsA.some(t => t.includes(normalizedItem) || normalizedItem.includes(t));
 const inB = termsB.some(t => t.includes(normalizedItem) || normalizedItem.includes(t));

 if (inA || inB) {
 const foundIn = [];
 if (inA) foundIn.push("Product A");
 if (inB) foundIn.push("Product B");
 
 blacklistConflicts.push({
 a: item,
 b: foundIn.join(" & "),
 severity: "avoid",
 reason: `Critical safety warning: This ingredient matches your personal sensitivity blacklist. Found in ${foundIn.join(" and ")}.`
 });
 }
 });

 setResults([...blacklistConflicts, ...chemicalConflicts]);
 }

 const containerVariants = {
 hidden: { opacity: 0 },
 show: { opacity: 1, transition: { staggerChildren: 0.1 } }
 };

 const itemVariants = {
 hidden: { opacity: 0, y: 15 },
 show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
 };

 return (
 <motion.div initial="hidden" animate="show" variants={containerVariants}>
 <motion.header variants={itemVariants} style={{ marginBottom: "3rem" }}>
 <h1 style={{
 fontFamily: "var(--dash-font-serif)",
 fontSize: "var(--font-h1)",
 fontWeight: 400,
 margin: "0 0 0.5rem",
 color: "var(--dash-ink)",
 lineHeight: 1.1,
 letterSpacing: "-0.02em"
 }}>
 Cross-Product Conflict Checker
 </h1>
 <p style={{ color: "var(--dash-muted)", margin: 0, fontSize: "clamp(0.9rem, 2vw, 1.05rem)" }}>
 Paste ingredients of two separate products to check for dangerous chemical layerings.
 </p>
 </motion.header>

 <div style={{ position: "relative" }}>
 {/* Paywall Overlay */}
 {!isPro && (
 <div style={{
 position: "absolute",
 inset: "-16px",
 background: "rgba(248, 246, 243, 0.4)",
 backdropFilter: "blur(8px)",
 WebkitBackdropFilter: "blur(8px)",
 borderRadius: "32px",
 zIndex: 30,
 display: "flex",
 flexDirection: "column",
 alignItems: "center",
 justifyContent: "center",
 padding: "2rem",
 textAlign: "center",
 border: "1px solid rgba(255,255,255,0.4)"
 }}>
 <div style={{
 background: "white",
 padding: "2.5rem 3rem",
 borderRadius: "28px",
 boxShadow: "0 25px 50px -12px rgba(40, 28, 20, 0.12)",
 maxWidth: "480px",
 border: "1px solid var(--dash-border)"
 }}>
 <div style={{
 background: "var(--dash-accent-soft)",
 color: "var(--dash-accent)",
 width: "56px",
 height: "56px",
 borderRadius: "16px",
 display: "flex",
 alignItems: "center",
 justifyContent: "center",
 margin: "0 auto 1.5rem"
 }}>
 <Lock size={24} />
 </div>
 <h3 style={{
 fontFamily: "var(--dash-font-serif)",
 fontSize: "1.4rem",
 color: "var(--dash-ink)",
 marginBottom: "0.75rem",
 fontWeight: 600
 }}>
 Unlock Cross-Product Checker
 </h3>
 <p style={{
 fontSize: "0.95rem",
 color: "var(--dash-muted)",
 lineHeight: 1.6,
 marginBottom: "2rem"
 }}>
 Pro tier unlocks label analysis between products. Copy-paste raw ingredient lists of any creams, toners, or serums to ensure they are safe to use together.
 </p>
 <Link href="/dashboard/subscription" style={{
 display: "inline-flex",
 alignItems: "center",
 gap: "0.5rem",
 background: "var(--dash-ink)",
 color: "white",
 padding: "1rem 2rem",
 borderRadius: "16px",
 textDecoration: "none",
 fontSize: "0.95rem",
 fontWeight: 600,
 boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
 transition: "all 0.2s"
 }}>
 Upgrade to Pro <ArrowRight size={16} />
 </Link>
 </div>
 </div>
 )}

 {/* Checker UI */}
 <motion.div variants={itemVariants} style={{
 background: "var(--white)",
 border: "1px solid var(--dash-border)",
 borderRadius: "28px",
 padding: "2.5rem",
 boxShadow: "0 20px 50px rgba(40, 28, 20, 0.05)",
 opacity: isPro ? 1 : 0.45,
 pointerEvents: isPro ? "auto" : "none"
 }}>
 <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem", marginBottom: "2rem" }}>
 <div>
 <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--dash-ink)", display: "block", marginBottom: "0.75rem" }}>
 Product A (Actives / Ingredients list)
 </label>
 <textarea
 value={productA}
 onChange={(e) => setProductA(e.target.value)}
 placeholder="e.g. Retinol, Squalane, Tocopherol"
 rows={4}
 style={{
 width: "100%",
 fontSize: "0.95rem",
 padding: "1rem 1.25rem",
 border: "1px solid var(--dash-border)",
 borderRadius: "18px",
 background: "var(--dash-bg)",
 color: "var(--dash-ink)",
 outline: "none",
 resize: "none",
 fontFamily: "var(--dash-font-sans)",
 transition: "all 0.2s"
 }}
 />
 </div>
 <div>
 <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--dash-ink)", display: "block", marginBottom: "0.75rem" }}>
 Product B (Actives / Ingredients list)
 </label>
 <textarea
 value={productB}
 onChange={(e) => setProductB(e.target.value)}
 placeholder="e.g. Glycolic acid, Salicylic acid, Niacinamide"
 rows={4}
 style={{
 width: "100%",
 fontSize: "0.95rem",
 padding: "1rem 1.25rem",
 border: "1px solid var(--dash-border)",
 borderRadius: "18px",
 background: "var(--dash-bg)",
 color: "var(--dash-ink)",
 outline: "none",
 resize: "none",
 fontFamily: "var(--dash-font-sans)",
 transition: "all 0.2s"
 }}
 />
 </div>
 </div>

 <motion.button
 onClick={check}
 disabled={!productA.trim() || !productB.trim()}
 whileHover={{ scale: 1.02, background: "var(--dash-accent)", filter: "brightness(1.1)" }}
 whileTap={{ scale: 0.98 }}
 style={{
 background: "var(--dash-accent)",
 color: "white",
 border: "none",
 borderRadius: "18px",
 padding: "1rem 2rem",
 fontSize: "0.95rem",
 fontWeight: 600,
 cursor: "pointer",
 display: "flex",
 alignItems: "center",
 justifyContent: "center",
 gap: "0.5rem",
 width: "100%",
 maxWidth: "240px",
 boxShadow: "0 10px 25px rgba(252, 39, 121, 0.25)",
 transition: "all 0.2s",
 opacity: (!productA.trim() || !productB.trim()) ? 0.6 : 1
 }}
 >
 <Star size={18} /> Check Compatibility
 </motion.button>

 {/* Results display */}
 <AnimatePresence mode="wait">
 {results !== null && (
 <motion.div
 initial={{ opacity: 0, y: 15 }}
 animate={{ opacity: 1, y: 0 }}
 exit={{ opacity: 0, y: -15 }}
 style={{ marginTop: "2.5rem" }}
 >
 <h3 style={{
 fontFamily: "var(--dash-font-serif)",
 fontSize: "1.25rem",
 color: "var(--dash-ink)",
 marginBottom: "1.25rem",
 fontWeight: 600
 }}>
 Compatibility Report
 </h3>

 {results.length === 0 ? (
 <div style={{
 background: "rgba(16, 185, 129, 0.06)",
 border: "1px solid rgba(16, 185, 129, 0.2)",
 borderRadius: "20px",
 padding: "1.5rem 1.75rem",
 fontSize: "0.95rem",
 color: "#047857",
 display: "flex",
 alignItems: "flex-start",
 gap: "0.75rem"
 }}>
 <CheckCircle size={20} style={{ flexShrink: 0, marginTop: "2px" }} />
 <div>
 <span style={{ fontWeight: 700, display: "block", marginBottom: "0.2rem" }}>Generally Compatible</span>
 No known active ingredient conflicts found. You should be safe to layer these, but always patch-test new products first.
 </div>
 </div>
 ) : (
 <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
 {results.map((r) => {
 const style = SEVERITY_STYLE[r.severity];
 return (
 <div
 key={`${r.a}-${r.b}`}
 style={{
 background: style.bg,
 border: `1px solid ${style.border}`,
 borderRadius: "20px",
 padding: "1.5rem 1.75rem",
 color: style.color
 }}
 >
 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem", flexWrap: "wrap", gap: "0.75rem" }}>
 <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
 {style.icon}
 <span style={{ fontSize: "1.1rem", fontWeight: 700, textTransform: "capitalize" }}>
 {r.a} + {r.b}
 </span>
 </div>
 <span style={{
 fontSize: "0.75rem",
 fontWeight: 700,
 background: style.badgeBg,
 padding: "0.35rem 0.8rem",
 borderRadius: "99px",
 letterSpacing: "0.05em",
 textTransform: "uppercase"
 }}>
 {style.label}
 </span>
 </div>
 <p style={{ fontSize: "0.95rem", margin: 0, lineHeight: 1.5, opacity: 0.9 }}>
 {r.reason}
 </p>
 </div>
 );
 })}
 </div>
 )}
 </motion.div>
 )}
 </AnimatePresence>

 {/* Sensitivity Profile Manager */}
 <motion.div variants={itemVariants} style={{
 marginTop: "4rem",
 background: "var(--white)",
 border: "1px solid var(--dash-border)",
 borderRadius: "28px",
 padding: "2.5rem",
 boxShadow: "0 20px 50px rgba(40, 28, 20, 0.03)",
 }}>
 <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
 <Tag size={20} color="var(--dash-accent)" />
 <h3 style={{ fontSize: "1.3rem", margin: 0, color: "var(--dash-ink)", fontWeight: 600, fontFamily: "var(--dash-font-serif)" }}>My Sensitivity Profile</h3>
 </div>
 <p style={{ color: "var(--dash-muted)", fontSize: "0.9rem", margin: "0 0 1.5rem 0", lineHeight: 1.5 }}>
 Add ingredients you are sensitive or allergic to. We will automatically flag matches inside the Conflict Checker and AI product searches.
 </p>

 <form onSubmit={handleAddIngredient} style={{ display: "flex", gap: "0.75rem", marginBottom: "1.5rem" }}>
 <input
 type="text"
 placeholder="e.g. Niacinamide, Salicylic Acid, Fragrance..."
 value={newIngredient}
 onChange={(e) => setNewIngredient(e.target.value)}
 disabled={isSaving}
 style={{
 flex: 1,
 padding: "0.8rem 1.2rem",
 borderRadius: "14px",
 border: "1px solid var(--dash-border)",
 fontSize: "0.95rem",
 outline: "none",
 transition: "border-color 0.2s"
 }}
 />
 <button
 type="submit"
 disabled={isSaving || !newIngredient.trim()}
 style={{
 background: "var(--dash-ink)",
 color: "white",
 border: "none",
 borderRadius: "14px",
 padding: "0.8rem 1.5rem",
 fontSize: "0.9rem",
 fontWeight: 600,
 cursor: "pointer",
 display: "flex",
 alignItems: "center",
 gap: "0.4rem",
 transition: "opacity 0.2s",
 opacity: (isSaving || !newIngredient.trim()) ? 0.6 : 1
 }}
 >
 <Plus size={16} /> Add
 </button>
 </form>

 {blacklist.length === 0 ? (
 <div style={{
 background: "#faf9f7",
 border: "1px dashed var(--dash-border)",
 borderRadius: "18px",
 padding: "1.5rem",
 textAlign: "center",
 color: "var(--dash-muted)",
 fontSize: "0.9rem"
 }}>
 No sensitivities added yet. Add items above to safeguard your routine.
 </div>
 ) : (
 <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
 {blacklist.map((item) => (
 <span
 key={item}
 style={{
 display: "inline-flex",
 alignItems: "center",
 gap: "0.4rem",
 background: "#fff1f0",
 color: "#fc2779",
 border: "1px solid rgba(252, 39, 121, 0.15)",
 padding: "0.4rem 0.8rem",
 borderRadius: "99px",
 fontSize: "0.85rem",
 fontWeight: 600
 }}
 >
 {item}
 <button
 type="button"
 onClick={() => handleRemoveIngredient(item)}
 disabled={isSaving}
 style={{
 background: "transparent",
 border: "none",
 color: "#fc2779",
 cursor: "pointer",
 padding: "2px",
 display: "flex",
 alignItems: "center",
 justifyContent: "center",
 opacity: 0.7
 }}
 >
 <X size={14} />
 </button>
 </span>
 ))}
 </div>
 )}
 </motion.div>

 </motion.div>
 </div>
 </motion.div>
 );
}
