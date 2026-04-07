// ============================================================
// Date Utilities — Pure functions for all date calculations
// No side effects, fully testable, memoization-friendly
// ============================================================

import type { CalendarDate } from "./types";

/** Days of the week starting from Sunday */
export const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/** Full month names */
export const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** Short month names for compact displays */
export const MONTH_NAMES_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/**
 * Get the number of days in a given month/year
 * Uses the Date overflow trick: day 0 of next month = last day of current month
 */
export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

/**
 * Get the day of the week (0-6, Sun-Sat) for the 1st of a month
 */
export function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

/**
 * Convert a CalendarDate to a comparable ISO string key "YYYY-MM-DD"
 * Used for localStorage keys and Set lookups
 */
export function toDateKey(date: CalendarDate): string {
  const y = date.year;
  const m = String(date.month + 1).padStart(2, "0");
  const d = String(date.day).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/**
 * Parse an ISO date key back into a CalendarDate
 */
export function fromDateKey(key: string): CalendarDate {
  const [y, m, d] = key.split("-").map(Number);
  return { year: y, month: m - 1, day: d };
}

/**
 * Convert CalendarDate to native Date object
 */
export function toNativeDate(date: CalendarDate): Date {
  return new Date(date.year, date.month, date.day);
}

/**
 * Create CalendarDate from native Date
 */
export function fromNativeDate(date: Date): CalendarDate {
  return {
    year: date.getFullYear(),
    month: date.getMonth(),
    day: date.getDate(),
  };
}

/**
 * Get today's date as a CalendarDate
 */
export function getToday(): CalendarDate {
  return fromNativeDate(new Date());
}

/**
 * Compare two CalendarDates: -1 (a < b), 0 (equal), 1 (a > b)
 */
export function compareDates(a: CalendarDate, b: CalendarDate): number {
  if (a.year !== b.year) return a.year < b.year ? -1 : 1;
  if (a.month !== b.month) return a.month < b.month ? -1 : 1;
  if (a.day !== b.day) return a.day < b.day ? -1 : 1;
  return 0;
}

/**
 * Check if two CalendarDates represent the same day
 */
export function isSameDay(a: CalendarDate, b: CalendarDate): boolean {
  return a.year === b.year && a.month === b.month && a.day === b.day;
}

/**
 * Check if a date falls within a range (inclusive)
 */
export function isInRange(
  date: CalendarDate,
  start: CalendarDate,
  end: CalendarDate
): boolean {
  return compareDates(date, start) >= 0 && compareDates(date, end) <= 0;
}

/**
 * Normalize a range so start <= end
 * Handles the case where the user selects end before start
 */
export function normalizeRange(
  a: CalendarDate,
  b: CalendarDate
): [CalendarDate, CalendarDate] {
  return compareDates(a, b) <= 0 ? [a, b] : [b, a];
}

/**
 * Get the previous month and year (handles year rollover)
 */
export function getPrevMonth(year: number, month: number): { year: number; month: number } {
  return month === 0
    ? { year: year - 1, month: 11 }
    : { year, month: month - 1 };
}

/**
 * Get the next month and year (handles year rollover)
 */
export function getNextMonth(year: number, month: number): { year: number; month: number } {
  return month === 11
    ? { year: year + 1, month: 0 }
    : { year, month: month + 1 };
}

/**
 * Build the full calendar grid for a month.
 * Returns an array of (CalendarDate | null) where null represents empty cells
 * for padding at the start/end of the grid.
 */
export function buildCalendarGrid(year: number, month: number): (CalendarDate | null)[] {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const grid: (CalendarDate | null)[] = [];

  // Padding for days before the 1st
  for (let i = 0; i < firstDay; i++) {
    grid.push(null);
  }

  // Actual days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    grid.push({ year, month, day });
  }

  // Pad to complete the last week (fill to multiple of 7)
  while (grid.length % 7 !== 0) {
    grid.push(null);
  }

  return grid;
}

/**
 * Count days between two dates (inclusive)
 */
export function daysBetween(a: CalendarDate, b: CalendarDate): number {
  const msPerDay = 86400000;
  const dateA = toNativeDate(a);
  const dateB = toNativeDate(b);
  return Math.abs(Math.round((dateB.getTime() - dateA.getTime()) / msPerDay)) + 1;
}
