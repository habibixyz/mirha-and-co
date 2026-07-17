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
    right: isRtl ? "auto" : "0",
    left: isRtl ? "0" : "auto",
   }}
  >
   <style>{`
   @keyframes slideDown {
    from { opacity: 0; transform: translateY(-8px); }
    to { opacity: 1; transform: translateY(0); }
   }
   .switcher-dropdown {
    position: absolute;
    top: calc(100% + 8px);
    background: rgba(255, 255, 255, 0.96);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 14px;
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.02);
    padding: 16px;
    width: 280px;
    z-index: 1000;
    animation: slideDown 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
   }
   .switcher-option {
    background: transparent;
    color: var(--ink);
    transition: all 0.15s ease;
   }
   .switcher-option.selected {
    background: #fff5f3;
    color: var(--rose);
   }
   .switcher-option:hover {
    background: #fff5f3 !important;
    color: var(--rose) !important;
   }
   .switcher-separator {
    border-top: 1px solid rgba(0, 0, 0, 0.06);
    padding-top: 12px;
   }

   html.dark .switcher-dropdown,
   .dark .switcher-dropdown {
    background: rgba(24, 23, 22, 0.96) !important;
    border-color: rgba(255, 255, 255, 0.12) !important;
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5), 0 2px 6px rgba(0, 0, 0, 0.2) !important;
   }
   html.dark .switcher-option,
   .dark .switcher-option {
    color: #aba49d !important;
   }
   html.dark .switcher-option.selected,
   .dark .switcher-option.selected {
    background: rgba(252, 39, 121, 0.12) !important;
    color: #ff4d94 !important;
   }
   html.dark .switcher-option:hover,
   .dark .switcher-option:hover {
    background: rgba(252, 39, 121, 0.18) !important;
    color: #ff4d94 !important;
   }
   html.dark .switcher-separator,
   .dark .switcher-separator {
    border-top-color: rgba(255, 255, 255, 0.08) !important;
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
 className={`switcher-option ${locale === langKey ? "selected" : ""}`}
        style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        padding: "8px 10px",
        border: 0,
        borderRadius: "8px",
        fontSize: "12px",
        fontWeight: locale === langKey ? 600 : 400,
        cursor: "pointer",
        textAlign: isRtl ? "right" : "left",
        flexDirection: isRtl ? "row-reverse" : "row",
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
 className="switcher-separator"
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
 className={`switcher-option ${currency === currKey ? "selected" : ""}`}
        style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        padding: "8px 10px",
        border: 0,
        borderRadius: "8px",
        fontSize: "11px",
        fontWeight: currency === currKey ? 600 : 400,
        cursor: "pointer",
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
