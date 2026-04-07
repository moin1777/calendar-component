// ============================================================
// MonthNavigator — Month/year header with animated transitions
// Includes prev/next arrows, today button, and theme toggle
// ============================================================

"use client";

import React, { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MONTH_NAMES } from "@/lib/date-utils";

interface MonthNavigatorProps {
  month: number;
  year: number;
  direction: number;
  isDark: boolean;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
  onToggleTheme: () => void;
}

const MonthNavigator = memo(function MonthNavigator({
  month,
  year,
  direction,
  isDark,
  onPrev,
  onNext,
  onToday,
  onToggleTheme,
}: MonthNavigatorProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      {/* Navigation arrows + month/year */}
      <div className="flex items-center gap-2">
        {/* Previous month button */}
        <motion.button
          id="btn-prev-month"
          onClick={onPrev}
          className="p-2 rounded-xl transition-colors cursor-pointer"
          style={{
            backgroundColor: "var(--cal-surface-hover)",
            color: "var(--cal-text)",
          }}
          whileHover={{ scale: 1.1, backgroundColor: "var(--cal-tertiary)" }}
          whileTap={{ scale: 0.9 }}
          aria-label="Previous month"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </motion.button>

        {/* Animated month/year text */}
        <div className="relative h-8 overflow-hidden min-w-[200px] flex items-center">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.h2
              key={`${year}-${month}`}
              className="text-xl font-bold tracking-tight whitespace-nowrap"
              style={{ color: "var(--cal-text)" }}
              initial={{ y: direction >= 0 ? 30 : -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: direction >= 0 ? -30 : 30, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30, duration: 0.3 }}
            >
              {MONTH_NAMES[month]} {year}
            </motion.h2>
          </AnimatePresence>
        </div>

        {/* Next month button */}
        <motion.button
          id="btn-next-month"
          onClick={onNext}
          className="p-2 rounded-xl transition-colors cursor-pointer"
          style={{
            backgroundColor: "var(--cal-surface-hover)",
            color: "var(--cal-text)",
          }}
          whileHover={{ scale: 1.1, backgroundColor: "var(--cal-tertiary)" }}
          whileTap={{ scale: 0.9 }}
          aria-label="Next month"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </motion.button>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-2">
        {/* Today button */}
        <motion.button
          id="btn-today"
          onClick={onToday}
          className="px-3 py-1.5 text-xs font-semibold rounded-lg cursor-pointer"
          style={{
            backgroundColor: "var(--cal-tertiary)",
            color: "var(--cal-primary)",
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Today
        </motion.button>

        {/* Theme toggle */}
        <motion.button
          id="btn-toggle-theme"
          onClick={onToggleTheme}
          className="p-2 rounded-xl cursor-pointer"
          style={{
            backgroundColor: "var(--cal-surface-hover)",
            color: "var(--cal-text)",
          }}
          whileHover={{ scale: 1.1, rotate: 15 }}
          whileTap={{ scale: 0.9 }}
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={isDark ? "moon" : "sun"}
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
              className="block text-base"
            >
              {isDark ? "🌙" : "☀️"}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
});

export default MonthNavigator;
