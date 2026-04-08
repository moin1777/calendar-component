// ============================================================
// CalendarGrid — The main grid of day cells with animated transitions
// Handles weekday headers and wraps DayCell components
// ============================================================

"use client";

import React, { memo, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DayCell from "./DayCell";
import { WEEKDAYS, toDateKey } from "@/lib/date-utils";
import { getHolidaysForMonth } from "@/lib/holidays";
import type { CalendarDate, DateRange, Holiday, Note } from "@/lib/types";

interface CalendarGridProps {
  year: number;
  month: number;
  grid: (CalendarDate | null)[];
  today: CalendarDate;
  range: DateRange;
  hoverDate: CalendarDate | null;
  direction: number;
  noteDates: Set<string>;
  notes: Note[];
  onSelectDate: (date: CalendarDate) => void;
  onHoverDate: (date: CalendarDate | null) => void;
}

/** Variants for the grid container animation on month change */
const gridVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -60 : 60,
    opacity: 0,
  }),
};

const CalendarGrid = memo(function CalendarGrid({
  year,
  month,
  grid,
  today,
  range,
  hoverDate,
  direction,
  noteDates,
  notes,
  onSelectDate,
  onHoverDate,
}: CalendarGridProps) {
  // Pre-compute holidays for this month
  const holidays = useMemo(() => getHolidaysForMonth(year, month), [year, month]);

  return (
    <div>
      {/* Weekday headers */}
      <div className="grid grid-cols-7 mb-2">
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-semibold py-2 select-none"
            style={{ color: "var(--cal-text-muted)" }}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Animated grid container — re-mounts on month change */}
      <div className="relative pt-10" style={{ overflowX: "clip", overflowY: "visible" }}>
        <AnimatePresence mode="popLayout" initial={false} custom={direction}>
          <motion.div
            key={`${year}-${month}`}
            custom={direction}
            variants={gridVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30, duration: 0.3 }}
            className="grid grid-cols-7 gap-1"
          >
            {grid.map((date, idx) => {
              const key = date ? toDateKey(date) : `empty-${idx}`;
              const dateKey = date ? toDateKey(date) : "";
              const holiday = date ? holidays.get(dateKey) : undefined;
              const hasNote = date ? noteDates.has(dateKey) : false;
              const noteForDate = hasNote
                ? notes.find((n) => n.date === dateKey)
                : undefined;

              return (
                <DayCell
                  key={key}
                  date={date}
                  today={today}
                  rangeStart={range.start}
                  rangeEnd={range.end}
                  hoverDate={hoverDate}
                  hasNote={hasNote}
                  noteText={noteForDate?.text}
                  holiday={holiday}
                  columnIndex={idx % 7}
                  onSelect={onSelectDate}
                  onHover={onHoverDate}
                />
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
});

export default CalendarGrid;
