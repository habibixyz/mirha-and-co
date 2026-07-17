"use client";

import { useTheme } from "./ThemeProvider";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle({ iconOnly = false }: { iconOnly?: boolean }) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        type="button"
        className={`inline-flex items-center justify-center gap-1.5 cursor-pointer rounded-full transition-all border border-[#e5ded6] bg-white text-[#2b2826] dark:border-white/15 dark:bg-[#181716] dark:text-[#f7f5f2] ${
          iconOnly ? "p-2 w-9 h-9" : "px-3 py-1.5 text-xs font-semibold uppercase tracking-wider"
        }`}
        title="Toggle Theme Mode"
      >
        <Moon size={15} />
        {!iconOnly && <span>Dark</span>}
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className={`inline-flex items-center justify-center gap-1.5 cursor-pointer rounded-full transition-all border border-[#ded7cf] bg-white text-[#2b2826] hover:border-[#fc2779] hover:text-[#fc2779] dark:border-white/15 dark:bg-[#181716] dark:text-[#f7f5f2] dark:hover:border-[#ff4d94] dark:hover:text-[#ff4d94] ${
        iconOnly ? "p-2 w-9 h-9" : "px-3 py-1.5 text-xs font-semibold uppercase tracking-wider"
      }`}
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      aria-label="Toggle Theme Mode"
    >
      {theme === "light" ? (
        <>
          <Moon size={15} className="text-[#2b2826] dark:text-[#f7f5f2]" />
          {!iconOnly && <span>Dark</span>}
        </>
      ) : (
        <>
          <Sun size={15} className="text-amber-400" />
          {!iconOnly && <span className="text-amber-300">Light</span>}
        </>
      )}
    </button>
  );
}

