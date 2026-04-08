// ============================================================
// Calendar — Main orchestrator component
// Composes all sub-components and connects hooks
// This is the primary "use client" boundary
// ============================================================

"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { useCalendar } from "@/hooks/useCalendar";
import { useNotes } from "@/hooks/useNotes";
import { useTheme } from "@/hooks/useTheme";
import ThemeEngine from "./ThemeEngine";
import MonthNavigator from "./MonthNavigator";
import CalendarGrid from "./CalendarGrid";
import RangeSelector from "./RangeSelector";
import NotesPanel from "./NotesPanel";

export default function Calendar() {
  // Core hooks
  const {
    today,
    currentMonth,
    currentYear,
    grid,
    range,
    hoverDate,
    direction,
    selectedDays,
    setHoverDate,
    goToPrevMonth,
    goToNextMonth,
    goToToday,
    selectDate,
    clearRange,
  } = useCalendar();

  const {
    notes,
    addNote,
    deleteNote,
    togglePin,
    getNoteDatesForMonth,
  } = useNotes();

  const { mode, toggleMode } = useTheme();

  // Memoize note dates for the current month (used for dot indicators)
  const noteDates = useMemo(
    () => getNoteDatesForMonth(currentYear, currentMonth),
    [currentYear, currentMonth, getNoteDatesForMonth]
  );

  return (
    <ThemeEngine month={currentMonth} mode={mode}>
      {/* Main layout: responsive grid — side-by-side on desktop, stacked on mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">
        {/* LEFT: Calendar Card */}
        <motion.div
          className="rounded-2xl p-5 sm:p-6 border shadow-sm"
          style={{
            backgroundColor: "var(--cal-surface)",
            borderColor: "var(--cal-tertiary)",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {/* Month navigator */}
          <MonthNavigator
            month={currentMonth}
            year={currentYear}
            direction={direction}
            isDark={mode === "dark"}
            onPrev={goToPrevMonth}
            onNext={goToNextMonth}
            onToday={goToToday}
            onToggleTheme={toggleMode}
          />

          {/* Calendar grid */}
          <CalendarGrid
            year={currentYear}
            month={currentMonth}
            grid={grid}
            today={today}
            range={range}
            hoverDate={hoverDate}
            direction={direction}
            noteDates={noteDates}
            notes={notes}
            onSelectDate={selectDate}
            onHoverDate={setHoverDate}
          />

          {/* Range selector bar */}
          <RangeSelector
            range={range}
            selectedDays={selectedDays}
            onClear={clearRange}
          />
        </motion.div>

        {/* RIGHT: Notes Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="lg:min-h-[500px]"
        >
          <NotesPanel
            range={range}
            notes={notes}
            onAddNote={addNote}
            onDeleteNote={deleteNote}
            onTogglePin={togglePin}
          />
        </motion.div>
      </div>

      {/* Footer branding */}
      <motion.p
        className="text-center text-xs mt-8 pb-4"
        style={{ color: "var(--cal-text-muted)", opacity: 0.4 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 0.5 }}
      >
        Interactive Calendar • Built with Next.js, Tailwind CSS & Framer Motion
      </motion.p>
    </ThemeEngine>
  );
}
