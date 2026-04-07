// ============================================================
// useCalendar — Central hook for all calendar state management
// Manages: current month, date range selection, hover preview
// ============================================================

"use client";

import { useState, useCallback, useMemo } from "react";
import type { CalendarDate, DateRange } from "@/lib/types";
import {
  getToday,
  isSameDay,
  compareDates,
  normalizeRange,
  buildCalendarGrid,
  getPrevMonth,
  getNextMonth,
  toDateKey,
  daysBetween,
} from "@/lib/date-utils";

export function useCalendar() {
  const today = useMemo(() => getToday(), []);

  // Current visible month
  const [currentMonth, setCurrentMonth] = useState(today.month);
  const [currentYear, setCurrentYear] = useState(today.year);

  // Selected date range
  const [range, setRange] = useState<DateRange>({ start: null, end: null });

  // Hover date for range preview
  const [hoverDate, setHoverDate] = useState<CalendarDate | null>(null);

  // Direction for animation (1 = forward, -1 = backward)
  const [direction, setDirection] = useState(0);

  // Build the calendar grid for current month
  const grid = useMemo(
    () => buildCalendarGrid(currentYear, currentMonth),
    [currentYear, currentMonth]
  );

  // Navigate to previous month
  const goToPrevMonth = useCallback(() => {
    setDirection(-1);
    const { year, month } = getPrevMonth(currentYear, currentMonth);
    setCurrentYear(year);
    setCurrentMonth(month);
  }, [currentYear, currentMonth]);

  // Navigate to next month
  const goToNextMonth = useCallback(() => {
    setDirection(1);
    const { year, month } = getNextMonth(currentYear, currentMonth);
    setCurrentYear(year);
    setCurrentMonth(month);
  }, [currentYear, currentMonth]);

  // Navigate to today
  const goToToday = useCallback(() => {
    const todayNow = getToday();
    if (todayNow.month !== currentMonth || todayNow.year !== currentYear) {
      setDirection(
        todayNow.year > currentYear ||
          (todayNow.year === currentYear && todayNow.month > currentMonth)
          ? 1
          : -1
      );
      setCurrentYear(todayNow.year);
      setCurrentMonth(todayNow.month);
    }
  }, [currentMonth, currentYear]);

  /**
   * Smart date selection logic:
   * 1. If no start selected: set start
   * 2. If start selected but no end: set end (auto-normalize order)
   * 3. If both selected: reset and start new selection
   * 4. If clicking same date as start: deselect
   */
  const selectDate = useCallback(
    (date: CalendarDate) => {
      setRange((prev) => {
        // Case 3: Both already selected → reset and start new
        if (prev.start && prev.end) {
          return { start: date, end: null };
        }

        // Case 1: Nothing selected → set start
        if (!prev.start) {
          return { start: date, end: null };
        }

        // Case 4: Clicking same date → deselect
        if (isSameDay(prev.start, date)) {
          return { start: null, end: null };
        }

        // Case 2: Start selected → set end with normalization
        const [start, end] = normalizeRange(prev.start, date);
        return { start, end };
      });
    },
    []
  );

  // Clear all selection
  const clearRange = useCallback(() => {
    setRange({ start: null, end: null });
    setHoverDate(null);
  }, []);

  // Computed: number of selected days
  const selectedDays = useMemo(() => {
    if (!range.start) return 0;
    if (!range.end) return 1;
    return daysBetween(range.start, range.end);
  }, [range]);

  // Computed: active date key for the notes panel
  const activeDateKey = useMemo(() => {
    if (range.start) return toDateKey(range.start);
    return null;
  }, [range]);

  return {
    today,
    currentMonth,
    currentYear,
    grid,
    range,
    hoverDate,
    direction,
    selectedDays,
    activeDateKey,
    setHoverDate,
    goToPrevMonth,
    goToNextMonth,
    goToToday,
    selectDate,
    clearRange,
  };
}
