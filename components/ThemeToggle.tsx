"use client";

import { useTheme } from "./ThemeProvider";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      style={{
        background: "transparent",
        border: "1px solid var(--rule)",
        borderRadius: "8px",
        padding: "8px",
        cursor: "pointer",
        color: "var(--ink)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
    </button>
  );
}
