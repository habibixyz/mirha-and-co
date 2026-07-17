"use client";

import { useTheme } from "./ThemeProvider";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        type="button"
        style={{
          background: "transparent",
          border: "1px solid var(--rule)",
          borderRadius: "20px",
          padding: "5px 12px",
          cursor: "pointer",
          color: "var(--ink)",
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          fontSize: "0.72rem",
          fontWeight: 600,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          fontFamily: "var(--font-dm-sans), sans-serif",
          opacity: 0.7,
        }}
        title="Toggle Theme Mode"
      >
        <Moon size={13} />
        <span>Dark</span>
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      type="button"
      style={{
        background: "transparent",
        border: "1px solid var(--rule)",
        borderRadius: "20px",
        padding: "5px 12px",
        cursor: "pointer",
        color: "var(--ink)",
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        fontSize: "0.72rem",
        fontWeight: 600,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        fontFamily: "var(--font-dm-sans), sans-serif",
        transition: "all 0.2s ease",
      }}
      className="hover:border-[#fc2779] hover:text-[#fc2779]"
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      aria-label="Toggle Theme Mode"
    >
      {theme === "light" ? (
        <>
          <Moon size={13} className="text-slate-700 dark:text-slate-300" />
          <span>Dark</span>
        </>
      ) : (
        <>
          <Sun size={13} className="text-amber-400" />
          <span className="text-amber-300">Light</span>
        </>
      )}
    </button>
  );
}
