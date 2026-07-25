"use client";

import { useState, useRef, useEffect } from "react";
import { useGlobalization } from "./GlobalizationContext";
import { Locale, Currency, LANGUAGE_NAMES, CURRENCIES } from "@/lib/globalization";
import { Globe, ChevronDown, Check } from "lucide-react";

interface GlobalizationSwitcherProps {
  align?: "left" | "right";
  direction?: "up" | "down";
}

export default function GlobalizationSwitcher({
  align = "right",
  direction = "down",
}: GlobalizationSwitcherProps = {}) {
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

  return (
    <div className="global-switcher-container" ref={dropdownRef} style={{ position: "relative", display: "inline-block" }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="switcher-trigger notranslate"
        aria-expanded={isOpen}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          background: "rgba(255, 255, 255, 0.4)",
          border: "1px solid var(--rule, rgba(0, 0, 0, 0.08))",
          borderRadius: "999px",
          padding: "6px 14px",
          fontSize: "11px",
          fontWeight: 600,
          color: "var(--ink)",
          letterSpacing: "0.03em",
          cursor: "pointer",
          whiteSpace: "nowrap",
          transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
          fontFamily: "var(--font-dm-sans), sans-serif",
        }}
      >
        <Globe size={13} style={{ opacity: 0.7, flexShrink: 0 }} />
        <span className="notranslate" style={{ whiteSpace: "nowrap" }}>
          {currentLangName.split(" ")[0]} ({currency})
        </span>
        <ChevronDown
          size={12}
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0)",
            transition: "transform 0.2s ease",
            opacity: 0.7,
            flexShrink: 0,
          }}
        />
      </button>

      {isOpen && (
        <div
          className="switcher-dropdown"
          style={{
            position: "absolute",
            top: direction === "down" ? "calc(100% + 8px)" : "auto",
            bottom: direction === "up" ? "calc(100% + 8px)" : "auto",
            left: align === "left" ? 0 : "auto",
            right: align === "right" ? 0 : "auto",
          }}
        >
          <style>{`
            @keyframes slideDown {
              from { opacity: 0; transform: translateY(-8px); }
              to { opacity: 1; transform: translateY(0); }
            }
            .switcher-dropdown {
              background: rgba(255, 255, 255, 0.98);
              backdrop-filter: blur(16px);
              -webkit-backdrop-filter: blur(16px);
              border: 1px solid rgba(0, 0, 0, 0.1);
              border-radius: 14px;
              box-shadow: 0 16px 40px rgba(0, 0, 0, 0.18), 0 2px 6px rgba(0, 0, 0, 0.05);
              padding: 14px;
              width: 280px;
              max-width: 90vw;
              z-index: 10000;
              animation: slideDown 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            }

            @media (max-width: 768px) {
              .switcher-dropdown {
                position: absolute !important;
                bottom: calc(100% + 8px) !important;
                top: auto !important;
                left: 0 !important;
                right: auto !important;
                width: 280px !important;
                max-width: 82vw !important;
                box-shadow: 0 20px 50px rgba(0, 0, 0, 0.35) !important;
              }
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
              border-top: 1px solid rgba(0, 0, 0, 0.08);
              padding-top: 12px;
            }

            html.dark .switcher-dropdown,
            .dark .switcher-dropdown {
              background: rgba(24, 23, 22, 0.98) !important;
              border-color: rgba(255, 255, 255, 0.15) !important;
              box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6) !important;
            }
            html.dark .switcher-option,
            .dark .switcher-option {
              color: #aba49d !important;
            }
            html.dark .switcher-option.selected,
            .dark .switcher-option.selected {
              background: rgba(252, 39, 121, 0.15) !important;
              color: #ff4d94 !important;
            }
            html.dark .switcher-option:hover,
            .dark .switcher-option:hover {
              background: rgba(252, 39, 121, 0.2) !important;
              color: #ff4d94 !important;
            }
            html.dark .switcher-separator,
            .dark .switcher-separator {
              border-top-color: rgba(255, 255, 255, 0.1) !important;
            }
          `}</style>

          {/* Section 1: Language */}
          <div style={{ marginBottom: "12px" }}>
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
                    setIsOpen(false);
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

          <div className="switcher-separator" style={{ marginBottom: "12px" }} />

          {/* Section 2: Currency */}
          <div>
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
              Currency / मुद्रा
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px" }}>
              {(Object.keys(CURRENCIES) as Currency[]).map((currKey) => (
                <button
                  key={currKey}
                  onClick={() => {
                    setCurrency(currKey);
                    setIsOpen(false);
                  }}
                  className={`switcher-option ${currency === currKey ? "selected" : ""}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "8px 10px",
                    border: 0,
                    borderRadius: "8px",
                    fontSize: "12px",
                    fontWeight: currency === currKey ? 600 : 400,
                    cursor: "pointer",
                    textAlign: isRtl ? "right" : "left",
                    flexDirection: isRtl ? "row-reverse" : "row",
                    fontFamily: "var(--font-dm-sans), sans-serif",
                  }}
                >
                  <span>
                    {currKey} ({CURRENCIES[currKey].symbol})
                  </span>
                  {currency === currKey && <Check size={14} style={{ color: "var(--rose)" }} />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
