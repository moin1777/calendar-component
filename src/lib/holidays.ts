// ============================================================
// Holiday Data — Real 2026 Indian holidays
// Includes public, restricted, and observance holidays
// ============================================================

import type { Holiday } from "./types";

/**
 * Full 2026 Indian holiday dataset
 * Each entry has a type (public/restricted/observance) and
 * a category (national/religious/cultural)
 */
export const HOLIDAYS: Holiday[] = [
  // JANUARY
  { date: "2026-01-01", name: "New Year's Day", type: "observance", category: "cultural" },
  { date: "2026-01-14", name: "Makar Sankranti / Pongal", type: "restricted", category: "religious" },
  { date: "2026-01-26", name: "Republic Day", type: "public", category: "national" },

  // FEBRUARY
  { date: "2026-02-15", name: "Vasant Panchami", type: "restricted", category: "religious" },
  { date: "2026-02-19", name: "Shivaji Jayanti", type: "restricted", category: "cultural" },
  { date: "2026-02-26", name: "Maha Shivaratri", type: "public", category: "religious" },

  // MARCH
  { date: "2026-03-03", name: "Holi", type: "public", category: "religious" },
  { date: "2026-03-20", name: "Ugadi / Gudi Padwa", type: "public", category: "religious" },
  { date: "2026-03-21", name: "Eid al-Fitr (Ramzan Eid)", type: "public", category: "religious" },

  // APRIL
  { date: "2026-04-02", name: "Ram Navami", type: "public", category: "religious" },
  { date: "2026-04-10", name: "Mahavir Jayanti", type: "public", category: "religious" },
  { date: "2026-04-14", name: "Ambedkar Jayanti", type: "public", category: "national" },

  // MAY
  { date: "2026-05-01", name: "Labour Day", type: "public", category: "national" },
  { date: "2026-05-03", name: "Buddha Purnima", type: "public", category: "religious" },

  // JUNE
  { date: "2026-06-17", name: "Eid al-Adha (Bakrid)", type: "public", category: "religious" },

  // JULY
  { date: "2026-07-06", name: "Muharram", type: "public", category: "religious" },

  // AUGUST
  { date: "2026-08-15", name: "Independence Day", type: "public", category: "national" },
  { date: "2026-08-28", name: "Ganesh Chaturthi", type: "public", category: "religious" },

  // SEPTEMBER
  { date: "2026-09-16", name: "Eid-e-Milad", type: "public", category: "religious" },

  // OCTOBER
  { date: "2026-10-02", name: "Gandhi Jayanti", type: "public", category: "national" },
  { date: "2026-10-20", name: "Dussehra", type: "public", category: "religious" },

  // NOVEMBER
  { date: "2026-11-08", name: "Diwali", type: "public", category: "religious" },
  { date: "2026-11-09", name: "Govardhan Puja", type: "restricted", category: "religious" },
  { date: "2026-11-15", name: "Guru Nanak Jayanti", type: "public", category: "religious" },

  // DECEMBER
  { date: "2026-12-25", name: "Christmas", type: "public", category: "religious" },
];

/**
 * Emoji lookup based on holiday category
 */
export function getHolidayEmoji(holiday: Holiday): string {
  switch (holiday.category) {
    case "national":
      return "🇮🇳";
    case "religious":
      return "🪔";
    case "cultural":
      return "🎉";
    default:
      return "✨";
  }
}

/**
 * Check if a date key matches any holiday
 * Returns the holiday if found, or undefined
 */
export function getHolidayForDate(dateKey: string): Holiday | undefined {
  return HOLIDAYS.find((h) => h.date === dateKey);
}

/**
 * Get all holidays for a given month/year
 * Returns a Map of dateKey -> Holiday for efficient lookup
 */
export function getHolidaysForMonth(
  year: number,
  month: number
): Map<string, Holiday> {
  const map = new Map<string, Holiday>();
  const ym = `${year}-${String(month + 1).padStart(2, "0")}`;

  for (const h of HOLIDAYS) {
    if (h.date.startsWith(ym)) {
      map.set(h.date, h);
    }
  }

  return map;
}
