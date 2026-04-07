// ============================================================
// useTheme — Light/Dark mode management with system preference
// ============================================================

"use client";

import { useState, useEffect, useCallback } from "react";
import type { ThemeMode } from "@/lib/types";

const THEME_STORAGE_KEY = "calendar-theme-mode";

export function useTheme() {
  const [mode, setMode] = useState<ThemeMode>("light");
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null;
    if (stored === "light" || stored === "dark") {
      setMode(stored);
    } else {
      // Fall back to system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setMode(prefersDark ? "dark" : "light");
    }
    setIsLoaded(true);
  }, []);

  // Apply theme class to <html> element and persist
  useEffect(() => {
    if (!isLoaded) return;
    const html = document.documentElement;
    html.classList.remove("light", "dark");
    html.classList.add(mode);
    localStorage.setItem(THEME_STORAGE_KEY, mode);
  }, [mode, isLoaded]);

  // Toggle between light and dark
  const toggleMode = useCallback(() => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  return { mode, toggleMode, isLoaded };
}
