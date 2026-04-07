// ============================================================
// Calendar Types — Core data models for the entire application
// ============================================================

/** Represents a single calendar date as year/month/day */
export interface CalendarDate {
  year: number;
  month: number; // 0-indexed (0 = January)
  day: number;
}

/** A selected date range with start and optional end */
export interface DateRange {
  start: CalendarDate | null;
  end: CalendarDate | null;
}

/** A user-created note attached to a specific date or range */
export interface Note {
  id: string;
  date: string; // ISO date key "YYYY-MM-DD"
  endDate?: string; // Optional end date for range notes
  text: string;
  color: string; // Accent color for the note chip
  pinned: boolean;
  createdAt: number;
}

/** Color palette extracted from the hero image theme */
export interface ThemeColors {
  primary: string; // Dominant accent
  secondary: string; // Supporting accent
  tertiary: string; // Soft background accent
  surface: string; // Card/panel background
  surfaceHover: string; // Hover state bg
  text: string; // Primary text
  textMuted: string; // Secondary text
  rangeStart: string; // Start of date range
  rangeEnd: string; // End of date range
  rangeMiddle: string; // In-between range cells
  rangeMiddleText: string; // Text in range middle
}

/** Hero image data with associated theme colors */
export interface HeroImage {
  id: string;
  src: string;
  alt: string;
  colors: ThemeColors;
  month?: number; // Optional month association
}

/** Holiday entry for the calendar */
export interface Holiday {
  date: string; // ISO format (YYYY-MM-DD)
  name: string;
  type: "public" | "restricted" | "observance";
  category: "national" | "religious" | "cultural";
}

/** Available visual modes */
export type ThemeMode = "light" | "dark";

/** State of a single day cell in the grid */
export type DayCellState =
  | "default"
  | "today"
  | "selected-start"
  | "selected-end"
  | "in-range"
  | "hover-preview"
  | "disabled"
  | "holiday";
