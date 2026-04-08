// ============================================================
// RangeSelector — Shows selected range info and clear action
// Appears below the calendar grid when dates are selected
// ============================================================

"use client";

import React, { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { DateRange } from "@/lib/types";
import { MONTH_NAMES_SHORT } from "@/lib/date-utils";

interface RangeSelectorProps {
  range: DateRange;
  selectedDays: number;
  onClear: () => void;
}

/** Format a CalendarDate nicely: "Apr 7" */
function formatDate(date: { year: number; month: number; day: number }): string {
  return `${MONTH_NAMES_SHORT[date.month]} ${date.day}`;
}

const RangeSelector = memo(function RangeSelector({
  range,
  selectedDays,
  onClear,
}: RangeSelectorProps) {
  const hasSelection = range.start !== null;

  return (
    <AnimatePresence>
      {hasSelection && (
        <motion.div
          initial={{ opacity: 0, height: 0, marginTop: 0 }}
          animate={{ opacity: 1, height: "auto", marginTop: 12 }}
          exit={{ opacity: 0, height: 0, marginTop: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          className="overflow-hidden"
        >
          <div
            className="flex items-center justify-between px-4 py-3 rounded-xl"
            style={{ backgroundColor: "var(--cal-tertiary)" }}
          >
            {/* Selection info */}
            <div className="flex items-center gap-3">
              {/* Start date chip */}
              <div
                className="px-3 py-1 rounded-lg text-sm font-semibold text-white"
                style={{ backgroundColor: "var(--cal-range-start)" }}
              >
                {range.start && formatDate(range.start)}
              </div>

              {/* Arrow → End date */}
              {range.end && (
                <>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ color: "var(--cal-text-muted)" }}
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                  <div
                    className="px-3 py-1 rounded-lg text-sm font-semibold text-white"
                    style={{ backgroundColor: "var(--cal-range-end)" }}
                  >
                    {formatDate(range.end)}
                  </div>
                </>
              )}

              {/* Days count badge */}
              <span
                className="text-xs font-medium px-2 py-0.5 rounded-full"
                style={{
                  backgroundColor: "var(--cal-surface)",
                  color: "var(--cal-primary)",
                }}
              >
                {selectedDays} {selectedDays === 1 ? "day" : "days"}
              </span>
            </div>

            {/* Clear button */}
            <motion.button
              id="btn-clear-range"
              onClick={onClear}
              className="p-1.5 rounded-lg cursor-pointer"
              style={{
                color: "var(--cal-text-muted)",
              }}
              whileHover={{ scale: 1.1, color: "var(--cal-primary)" }}
              whileTap={{ scale: 0.9 }}
              aria-label="Clear selection"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

export default RangeSelector;
