"use client";

import { useState, useRef, useEffect } from "react";
import { useGlobalization } from "./GlobalizationContext";
import { Locale, Currency, LANGUAGE_NAMES, CURRENCIES } from "@/lib/globalization";
import { Globe, ChevronDown, Check } from "lucide-react";

export default function GlobalizationSwitcher() {
 const { locale, currency, setLocale, setCurrency, isRtl } = useGlobalization();
 const [isOpen, setIsOpen] = useState(false);
 const dropdownRef = useRef<HTMLDivElement>(null);

 // Close dropdown on click outside
 useEffect(() => {
 function handleClickOutside(event: MouseEvent) {
 if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
 setIsOpen(false);
 }
 }
 document.addEventListener("mousedown", handleClickOutside);
 return () => {
 document.removeEventListener("mousedown", handleClickOutside);
 };
 }, []);

 const currentLangName = LANGUAGE_NAMES[locale];
 const currentCurrencyConfig = CURRENCIES[currency];

 return (
 <div className="global-switcher-container" ref={dropdownRef} style={{ position: "relative" }}>
 <button
 onClick={() => setIsOpen(!isOpen)}
 className="switcher-trigger"
 aria-expanded={isOpen}
 style={{
 display: "flex",
 alignItems: "center",
 gap: "8px",
 background: "rgba(255, 255, 255, 0.4)",
 border: "1px solid var(--rule, rgba(0, 0, 0, 0.08))",
 borderRadius: "999px",
 padding: "6px 14px",
 fontSize: "11px",
 fontWeight: 600,
 color: "var(--ink)",
 letterSpacing: "0.05em",
 cursor: "pointer",
 transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
 boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
 fontFamily: "var(--font-dm-sans), sans-serif",
 }}
 >
 <Globe size={13} style={{ opacity: 0.7 }} />
 <span>
 {currentLangName.split(" ")[0]} ({currentCurrencyConfig.symbol} {currency})
 </span>
 <ChevronDown
 size={12}
 style={{
 transform: isOpen ? "rotate(180deg)" : "rotate(0)",
 transition: "transform 0.2s ease",
 opacity: 0.7,
 }}
 />
 </button>

 {isOpen && (
 <div
 className="switcher-dropdown"
 style={{
 position: "absolute",
 top: "calc(100% + 8px)",
 right: isRtl ? "auto" : "0",
 left: isRtl ? "0" : "auto",
 background: "rgba(255, 255, 255, 0.96)",
 backdropFilter: "blur(16px)",
 border: "1px solid rgba(0, 0, 0, 0.08)",
 borderRadius: "14px",
 boxShadow: "0 16px 40px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.02)",
 padding: "16px",
 width: "280px",
 zIndex: 1000,
 animation: "slideDown 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards",
 }}
 >
 <style>{`
 @keyframes slideDown {
 from { opacity: 0; transform: translateY(-8px); }
 to { opacity: 1; transform: translateY(0); }
 }
 .switcher-option:hover {
 background: #fff5f3 !important;
 color: var(--rose) !important;
 }
 `}</style>

 {/* Languages Section */}
 <div style={{ marginBottom: "16px" }}>
 <p
 style={{
 fontSize: "9px",
 fontWeight: 700,
 textTransform: "uppercase",
 letterSpacing: "0.1em",
 color: "var(--muted)",
 marginBottom: "8px",
 textAlign: isRtl ? "right" : "left",
 fontFamily: "var(--font-dm-sans), sans-serif",
 }}
 >
 Language / भाषा / اللغة
 </p>
 <div style={{ display: "grid", gap: "4px" }}>
 {(Object.keys(LANGUAGE_NAMES) as Locale[]).map((langKey) => (
 <button
 key={langKey}
 onClick={() => {
 setLocale(langKey);
 }}
 className="switcher-option"
 style={{
 display: "flex",
 alignItems: "center",
 justifyContent: "space-between",
 width: "100%",
 padding: "8px 10px",
 background: locale === langKey ? "#fff5f3" : "transparent",
 color: locale === langKey ? "var(--rose)" : "var(--ink)",
 border: 0,
 borderRadius: "8px",
 fontSize: "12px",
 fontWeight: locale === langKey ? 600 : 400,
 cursor: "pointer",
 textAlign: isRtl ? "right" : "left",
 flexDirection: isRtl ? "row-reverse" : "row",
 transition: "all 0.15s ease",
 fontFamily: "var(--font-dm-sans), sans-serif",
 }}
 >
 <span>{LANGUAGE_NAMES[langKey]}</span>
 {locale === langKey && <Check size={14} style={{ color: "var(--rose)" }} />}
 </button>
 ))}
 </div>
 </div>

 {/* Currencies Section */}
 <div
 style={{
 borderTop: "1px solid rgba(0, 0, 0, 0.06)",
 paddingTop: "12px",
 }}
 >
 <p
 style={{
 fontSize: "9px",
 fontWeight: 700,
 textTransform: "uppercase",
 letterSpacing: "0.1em",
 color: "var(--muted)",
 marginBottom: "8px",
 textAlign: isRtl ? "right" : "left",
 fontFamily: "var(--font-dm-sans), sans-serif",
 }}
 >
 Currency
 </p>
 <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
 {(Object.keys(CURRENCIES) as Currency[]).map((currKey) => (
 <button
 key={currKey}
 onClick={() => {
 setCurrency(currKey);
 }}
 className="switcher-option"
 style={{
 display: "flex",
 alignItems: "center",
 gap: "6px",
 padding: "8px 10px",
 background: currency === currKey ? "#fff5f3" : "transparent",
 color: currency === currKey ? "var(--rose)" : "var(--ink)",
 border: 0,
 borderRadius: "8px",
 fontSize: "11px",
 fontWeight: currency === currKey ? 600 : 400,
 cursor: "pointer",
 transition: "all 0.15s ease",
 justifyContent: "flex-start",
 fontFamily: "var(--font-dm-sans), sans-serif",
 }}
 >
 <span
 style={{
 fontSize: "10px",
 opacity: 0.6,
 fontWeight: 700,
 minWidth: "16px",
 }}
 >
 {CURRENCIES[currKey].symbol}
 </span>
 <span>{currKey}</span>
 {currency === currKey && (
 <span
 style={{
 marginLeft: "auto",
 width: "4px",
 height: "4px",
 borderRadius: "50%",
 background: "var(--rose)",
 }}
 />
 )}
 </button>
 ))}
 </div>
 </div>
 </div>
 )}
 </div>
 );
}
