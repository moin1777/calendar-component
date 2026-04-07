// ============================================================
// DayCell — Individual day in the calendar grid
// Handles all visual states: today, selected, in-range, holiday, hover
// Uses Framer Motion for smooth selection transitions
// Shows a tooltip on hover with holiday / note info
// ============================================================

"use client";

import React, { memo, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { CalendarDate, Holiday } from "@/lib/types";
import { isSameDay, compareDates, normalizeRange, toDateKey } from "@/lib/date-utils";
import { getHolidayEmoji } from "@/lib/holidays";

interface DayCellProps {
  date: CalendarDate | null;
  today: CalendarDate;
  rangeStart: CalendarDate | null;
  rangeEnd: CalendarDate | null;
  hoverDate: CalendarDate | null;
  hasNote: boolean;
  noteText?: string;
  holiday: Holiday | undefined;
  columnIndex?: number; // 0-6, used for smart tooltip positioning
  onSelect: (date: CalendarDate) => void;
  onHover: (date: CalendarDate | null) => void;
}

/** Compute tooltip alignment based on column position */
function getTooltipAlign(col: number): "left" | "center" | "right" {
  if (col <= 1) return "left";
  if (col >= 5) return "right";
  return "center";
}

/**
 * Determine the visual state of a day cell based on selection
 */
function getCellState(
  date: CalendarDate,
  today: CalendarDate,
  rangeStart: CalendarDate | null,
  rangeEnd: CalendarDate | null,
  hoverDate: CalendarDate | null
) {
  const isToday = isSameDay(date, today);
  const isStart = rangeStart ? isSameDay(date, rangeStart) : false;
  const isEnd = rangeEnd ? isSameDay(date, rangeEnd) : false;

  let isInRange = false;
  if (rangeStart && rangeEnd) {
    const [s, e] = normalizeRange(rangeStart, rangeEnd);
    isInRange =
      compareDates(date, s) > 0 && compareDates(date, e) < 0;
  }

  let isHoverPreview = false;
  if (rangeStart && !rangeEnd && hoverDate && !isSameDay(date, rangeStart)) {
    const [s, e] = normalizeRange(rangeStart, hoverDate);
    isHoverPreview =
      compareDates(date, s) >= 0 && compareDates(date, e) <= 0;
  }

  return { isToday, isStart, isEnd, isInRange, isHoverPreview };
}

/** Map holiday category to a user-friendly badge */
function getHolidayCategoryBadge(category: Holiday["category"]): { label: string; color: string; icon: string } {
  switch (category) {
    case "national":
      return { label: "National Holiday", color: "#22c55e", icon: "🇮🇳" };
    case "religious":
      return { label: "Festival", color: "#f59e0b", icon: "🪔" };
    case "cultural":
      return { label: "Cultural Event", color: "#8b5cf6", icon: "🎊" };
  }
}

const DayCell = memo(function DayCell({
  date,
  today,
  rangeStart,
  rangeEnd,
  hoverDate,
  hasNote,
  noteText,
  holiday,
  columnIndex = 3,
  onSelect,
  onHover,
}: DayCellProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  // All hooks must be called before any early return (React rules of hooks)
  const handleClick = useCallback(() => {
    if (date) onSelect(date);
  }, [date, onSelect]);
  const handleMouseEnter = useCallback(() => {
    if (date) onHover(date);
    setShowTooltip(true);
  }, [date, onHover]);
  const handleMouseLeave = useCallback(() => {
    onHover(null);
    setShowTooltip(false);
  }, [onHover]);

  // Empty cell (grid padding)
  if (!date) {
    return <div className="aspect-square" />;
  }

  const { isToday, isStart, isEnd, isInRange, isHoverPreview } = getCellState(
    date,
    today,
    rangeStart,
    rangeEnd,
    hoverDate
  );

  const isSelected = isStart || isEnd;

  // Determine if tooltip should be shown (only if there's something to display)
  const hasTooltipContent = !!(holiday || noteText);
  const badge = holiday ? getHolidayCategoryBadge(holiday.category) : null;
  const tooltipAlign = getTooltipAlign(columnIndex);

  return (
    <motion.button
      id={`day-${toDateKey(date)}`}
      layout
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`
        relative aspect-square flex items-center justify-center
        rounded-xl text-sm font-medium cursor-pointer
        transition-colors duration-150
        focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1
        group
        ${
          isSelected
            ? "text-white shadow-lg z-10"
            : isInRange
            ? "text-[var(--cal-range-middle-text)] z-5"
            : isHoverPreview
            ? "z-5"
            : isToday
            ? "font-bold"
            : "hover:scale-105"
        }
      `}
      style={{
        backgroundColor: isStart
          ? "var(--cal-range-start)"
          : isEnd
          ? "var(--cal-range-end)"
          : isInRange
          ? "var(--cal-range-middle)"
          : isHoverPreview
          ? "var(--cal-range-middle)"
          : "transparent",
        color: isSelected
          ? "#fff"
          : isInRange
          ? "var(--cal-range-middle-text)"
          : isHoverPreview
          ? "var(--cal-range-middle-text)"
          : isToday
          ? "var(--cal-primary)"
          : "var(--cal-text)",
        opacity: isHoverPreview && !isInRange ? 0.6 : 1,
      }}
      whileHover={!isSelected && !isInRange ? { scale: 1.1 } : {}}
      whileTap={{ scale: 0.92 }}
      aria-label={`${date.day}, ${holiday ? holiday.name : ""}${noteText ? `, Note: ${noteText}` : ""}`}
      aria-pressed={isSelected}
    >
      {/* Hover Tooltip */}
      <AnimatePresence>
        {showTooltip && hasTooltipContent && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className={`absolute bottom-full mb-2 pointer-events-none z-50 ${
              tooltipAlign === "left"
                ? "left-0"
                : tooltipAlign === "right"
                ? "right-0"
                : "left-1/2 -translate-x-1/2"
            }`}
            style={{ minWidth: "150px", maxWidth: "210px" }}
          >
            <div
              className="rounded-lg px-3 py-2.5 shadow-xl border text-left"
              style={{
                backgroundColor: "var(--cal-surface)",
                borderColor: "var(--cal-tertiary)",
                backdropFilter: "blur(12px)",
              }}
            >
              {/* Holiday info */}
              {holiday && (
                <div className="mb-1 last:mb-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-xs">{getHolidayEmoji(holiday)}</span>
                    <span
                      className="text-[10px] font-bold tracking-wide uppercase px-1.5 py-0.5 rounded-full whitespace-nowrap"
                      style={{
                        backgroundColor: `${badge!.color}22`,
                        color: badge!.color,
                      }}
                    >
                      {badge!.label}
                    </span>
                  </div>
                  <p
                    className="text-xs font-semibold leading-tight mt-1"
                    style={{ color: "var(--cal-text)" }}
                  >
                    {holiday.name}
                  </p>
                </div>
              )}

              {/* Divider if both holiday and note */}
              {holiday && noteText && (
                <div
                  className="my-1.5 border-t"
                  style={{ borderColor: "var(--cal-tertiary)" }}
                />
              )}

              {/* Note info */}
              {noteText && (
                <div className="flex items-start gap-1.5">
                  <span className="text-[10px] mt-0.5">📝</span>
                  <p
                    className="text-[11px] leading-snug line-clamp-2"
                    style={{ color: "var(--cal-text-muted)" }}
                  >
                    {noteText}
                  </p>
                </div>
              )}

              {/* Tooltip arrow — repositioned based on alignment */}
              <div
                className={`absolute top-full w-2 h-2 rotate-45 border-r border-b ${
                  tooltipAlign === "left"
                    ? "left-4"
                    : tooltipAlign === "right"
                    ? "right-4"
                    : "left-1/2 -translate-x-1/2"
                }`}
                style={{
                  backgroundColor: "var(--cal-surface)",
                  borderColor: "var(--cal-tertiary)",
                  marginTop: "-4px",
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Today indicator ring */}
      {isToday && !isSelected && (
        <motion.span
          layoutId="today-ring"
          className="absolute inset-1 rounded-lg border-2"
          style={{ borderColor: "var(--cal-primary)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Selection pill animation */}
      {isSelected && (
        <motion.div
          layoutId={isStart ? "range-start" : "range-end"}
          className="absolute inset-1 rounded-lg"
          style={{
            backgroundColor: isStart
              ? "var(--cal-range-start)"
              : "var(--cal-range-end)",
          }}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        />
      )}

      {/* Day number */}
      <span className="relative z-10">{date.day}</span>

      {/* Bottom indicators row */}
      <div className="absolute bottom-0.5 left-0 right-0 flex items-center justify-center gap-0.5">
        {/* Holiday emoji */}
        {holiday && (
          <span className="text-[8px] leading-none">
            {getHolidayEmoji(holiday)}
          </span>
        )}

        {/* Note indicator dot */}
        {hasNote && (
          <motion.span
            className="w-1 h-1 rounded-full"
            style={{ backgroundColor: "var(--cal-primary)" }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500 }}
          />
        )}
      </div>
    </motion.button>
  );
});

export default DayCell;
