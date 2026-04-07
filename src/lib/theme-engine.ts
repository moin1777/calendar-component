// ============================================================
// Theme Engine — Dynamic color system with hero image palettes
// Each month gets a unique visual identity derived from nature imagery
// ============================================================

import type { ThemeColors, HeroImage } from "./types";

/**
 * Curated color palettes per month — simulating "dominant color extraction"
 * from hero images. Each palette is carefully designed for visual harmony
 * in both light and dark modes.
 */
const MONTH_THEMES: Record<number, { light: ThemeColors; dark: ThemeColors }> = {
  // January — Icy Blue / Snow
  0: {
    light: {
      primary: "#4A90D9",
      secondary: "#7BB3E0",
      tertiary: "#D6E8F7",
      surface: "#FFFFFF",
      surfaceHover: "#F0F6FC",
      text: "#1A2332",
      textMuted: "#6B7D93",
      rangeStart: "#4A90D9",
      rangeEnd: "#3672B5",
      rangeMiddle: "#E3F0FB",
      rangeMiddleText: "#2A5F9E",
    },
    dark: {
      primary: "#6AADEA",
      secondary: "#4A90D9",
      tertiary: "#1A2D42",
      surface: "#0F1923",
      surfaceHover: "#162536",
      text: "#E8F1FA",
      textMuted: "#8BABC7",
      rangeStart: "#6AADEA",
      rangeEnd: "#4A90D9",
      rangeMiddle: "#162D48",
      rangeMiddleText: "#A3CEF1",
    },
  },
  // February — Romantic Rose
  1: {
    light: {
      primary: "#E8577D",
      secondary: "#F090A8",
      tertiary: "#FDE2E9",
      surface: "#FFFFFF",
      surfaceHover: "#FFF5F7",
      text: "#2D1520",
      textMuted: "#946B78",
      rangeStart: "#E8577D",
      rangeEnd: "#D43D66",
      rangeMiddle: "#FDE8EE",
      rangeMiddleText: "#C73058",
    },
    dark: {
      primary: "#F47A9B",
      secondary: "#E8577D",
      tertiary: "#3D1525",
      surface: "#1A0A12",
      surfaceHover: "#2D1520",
      text: "#FAE2EA",
      textMuted: "#C7899A",
      rangeStart: "#F47A9B",
      rangeEnd: "#E8577D",
      rangeMiddle: "#3D1A2D",
      rangeMiddleText: "#F4A0B8",
    },
  },
  // March — Fresh Green / Spring
  2: {
    light: {
      primary: "#4CAF6E",
      secondary: "#7BC89A",
      tertiary: "#E4F5EA",
      surface: "#FFFFFF",
      surfaceHover: "#F0FAF4",
      text: "#1A2B20",
      textMuted: "#6B8E78",
      rangeStart: "#4CAF6E",
      rangeEnd: "#3A965A",
      rangeMiddle: "#E4F5EA",
      rangeMiddleText: "#2D7A48",
    },
    dark: {
      primary: "#6BCF8E",
      secondary: "#4CAF6E",
      tertiary: "#1A2E22",
      surface: "#0A1810",
      surfaceHover: "#142820",
      text: "#E4F5EA",
      textMuted: "#8EC4A0",
      rangeStart: "#6BCF8E",
      rangeEnd: "#4CAF6E",
      rangeMiddle: "#1A3628",
      rangeMiddleText: "#A0DFB4",
    },
  },
  // April — Cherry Blossom Pink + Warm Gold (matches our hero image)
  3: {
    light: {
      primary: "#E87B9C",
      secondary: "#D4A76A",
      tertiary: "#FEE8EF",
      surface: "#FFFFFF",
      surfaceHover: "#FFF3F6",
      text: "#2B1A22",
      textMuted: "#9E7A86",
      rangeStart: "#E87B9C",
      rangeEnd: "#D45F82",
      rangeMiddle: "#FDEAF0",
      rangeMiddleText: "#C74870",
    },
    dark: {
      primary: "#F497B4",
      secondary: "#E0B87F",
      tertiary: "#321A25",
      surface: "#160D12",
      surfaceHover: "#261520",
      text: "#FAE8EF",
      textMuted: "#C79AAA",
      rangeStart: "#F497B4",
      rangeEnd: "#E87B9C",
      rangeMiddle: "#3A1E30",
      rangeMiddleText: "#F4B8CB",
    },
  },
  // May — Lavender / Wisteria
  4: {
    light: {
      primary: "#8B6CC1",
      secondary: "#A98BD8",
      tertiary: "#EDE4F7",
      surface: "#FFFFFF",
      surfaceHover: "#F5F0FA",
      text: "#1F1830",
      textMuted: "#7E6E96",
      rangeStart: "#8B6CC1",
      rangeEnd: "#7354AB",
      rangeMiddle: "#ECE2F8",
      rangeMiddleText: "#6842A0",
    },
    dark: {
      primary: "#A88BDB",
      secondary: "#8B6CC1",
      tertiary: "#221840",
      surface: "#110C22",
      surfaceHover: "#1C1536",
      text: "#EDE4F7",
      textMuted: "#A494BF",
      rangeStart: "#A88BDB",
      rangeEnd: "#8B6CC1",
      rangeMiddle: "#2A1C48",
      rangeMiddleText: "#C4AAE8",
    },
  },
  // June — Golden Sun / Summer
  5: {
    light: {
      primary: "#E6A31E",
      secondary: "#F0C460",
      tertiary: "#FDF3DC",
      surface: "#FFFFFF",
      surfaceHover: "#FFFBF0",
      text: "#2D2410",
      textMuted: "#9E8A5C",
      rangeStart: "#E6A31E",
      rangeEnd: "#CC8E12",
      rangeMiddle: "#FDF5E0",
      rangeMiddleText: "#B07A08",
    },
    dark: {
      primary: "#F0C040",
      secondary: "#E6A31E",
      tertiary: "#2D2410",
      surface: "#181208",
      surfaceHover: "#261E0E",
      text: "#FDF3DC",
      textMuted: "#C4AB78",
      rangeStart: "#F0C040",
      rangeEnd: "#E6A31E",
      rangeMiddle: "#362C14",
      rangeMiddleText: "#F0D468",
    },
  },
  // July — Ocean Blue / Coral
  6: {
    light: {
      primary: "#2196B4",
      secondary: "#4DB8CC",
      tertiary: "#DFF1F6",
      surface: "#FFFFFF",
      surfaceHover: "#F0FAFB",
      text: "#122830",
      textMuted: "#5E8E9E",
      rangeStart: "#2196B4",
      rangeEnd: "#1A7E98",
      rangeMiddle: "#E0F4F8",
      rangeMiddleText: "#136B82",
    },
    dark: {
      primary: "#48B8D0",
      secondary: "#2196B4",
      tertiary: "#0E2228",
      surface: "#081418",
      surfaceHover: "#0E2028",
      text: "#DFF1F6",
      textMuted: "#78AFBF",
      rangeStart: "#48B8D0",
      rangeEnd: "#2196B4",
      rangeMiddle: "#12303E",
      rangeMiddleText: "#80D0E0",
    },
  },
  // August — Sunset Orange
  7: {
    light: {
      primary: "#E8733C",
      secondary: "#F09860",
      tertiary: "#FDE8DA",
      surface: "#FFFFFF",
      surfaceHover: "#FFF6F0",
      text: "#2D1A10",
      textMuted: "#9E7A5E",
      rangeStart: "#E8733C",
      rangeEnd: "#D05C28",
      rangeMiddle: "#FCECDF",
      rangeMiddleText: "#B84A18",
    },
    dark: {
      primary: "#F08E58",
      secondary: "#E8733C",
      tertiary: "#2D1A10",
      surface: "#180E08",
      surfaceHover: "#261810",
      text: "#FDE8DA",
      textMuted: "#C49878",
      rangeStart: "#F08E58",
      rangeEnd: "#E8733C",
      rangeMiddle: "#3A2218",
      rangeMiddleText: "#F0AA78",
    },
  },
  // September — Warm Amber / Early Autumn
  8: {
    light: {
      primary: "#C88432",
      secondary: "#DCA852",
      tertiary: "#F8EFDC",
      surface: "#FFFFFF",
      surfaceHover: "#FDF8F0",
      text: "#2B2010",
      textMuted: "#8E7B5A",
      rangeStart: "#C88432",
      rangeEnd: "#B07028",
      rangeMiddle: "#FAF2E2",
      rangeMiddleText: "#986020",
    },
    dark: {
      primary: "#DCA852",
      secondary: "#C88432",
      tertiary: "#2B2010",
      surface: "#161008",
      surfaceHover: "#24190E",
      text: "#F8EFDC",
      textMuted: "#B09870",
      rangeStart: "#DCA852",
      rangeEnd: "#C88432",
      rangeMiddle: "#332814",
      rangeMiddleText: "#E8C07A",
    },
  },
  // October — Crimson / Maple
  9: {
    light: {
      primary: "#C84040",
      secondary: "#E06858",
      tertiary: "#F8E0DC",
      surface: "#FFFFFF",
      surfaceHover: "#FFF4F2",
      text: "#2B1414",
      textMuted: "#9E6060",
      rangeStart: "#C84040",
      rangeEnd: "#B03030",
      rangeMiddle: "#FAE4E0",
      rangeMiddleText: "#981E1E",
    },
    dark: {
      primary: "#E86060",
      secondary: "#C84040",
      tertiary: "#2B1414",
      surface: "#180A0A",
      surfaceHover: "#261414",
      text: "#F8E0DC",
      textMuted: "#C08888",
      rangeStart: "#E86060",
      rangeEnd: "#C84040",
      rangeMiddle: "#3A1C1C",
      rangeMiddleText: "#F08888",
    },
  },
  // November — Earthy Brown / Fog
  10: {
    light: {
      primary: "#8E7052",
      secondary: "#AA8E6E",
      tertiary: "#F0E8DC",
      surface: "#FFFFFF",
      surfaceHover: "#FAF6F0",
      text: "#2B2218",
      textMuted: "#887058",
      rangeStart: "#8E7052",
      rangeEnd: "#7A5E42",
      rangeMiddle: "#F2ECDF",
      rangeMiddleText: "#685038",
    },
    dark: {
      primary: "#AA8E6E",
      secondary: "#8E7052",
      tertiary: "#2B2218",
      surface: "#14100C",
      surfaceHover: "#221C14",
      text: "#F0E8DC",
      textMuted: "#A89480",
      rangeStart: "#AA8E6E",
      rangeEnd: "#8E7052",
      rangeMiddle: "#322A1E",
      rangeMiddleText: "#C4A888",
    },
  },
  // December — Midnight Sapphire / Frost
  11: {
    light: {
      primary: "#3D5A99",
      secondary: "#6080BB",
      tertiary: "#DDE6F4",
      surface: "#FFFFFF",
      surfaceHover: "#F0F4FA",
      text: "#141E30",
      textMuted: "#6070A0",
      rangeStart: "#3D5A99",
      rangeEnd: "#2D4880",
      rangeMiddle: "#E0EAF6",
      rangeMiddleText: "#2240700",
    },
    dark: {
      primary: "#6888CC",
      secondary: "#3D5A99",
      tertiary: "#141E30",
      surface: "#0A0E1A",
      surfaceHover: "#141C2E",
      text: "#DDE6F4",
      textMuted: "#8898C0",
      rangeStart: "#6888CC",
      rangeEnd: "#3D5A99",
      rangeMiddle: "#1A2644",
      rangeMiddleText: "#90A8DD",
    },
  },
};

/**
 * Get theme colors for a given month and mode
 * Falls back to April (month 3) theme if month is out of range
 */
export function getThemeColors(month: number, mode: "light" | "dark"): ThemeColors {
  const theme = MONTH_THEMES[month] ?? MONTH_THEMES[3];
  return mode === "dark" ? theme.dark : theme.light;
}

/**
 * Hero images mapped to months with extracted color associations
 * In production, we'd use a canvas-based color extractor
 */
export const HERO_IMAGES: HeroImage[] = [
  { id: "jan", src: "/hero-jan.png", alt: "Icy winter landscape", colors: MONTH_THEMES[0].light, month: 0 },
  { id: "feb", src: "/hero-feb.png", alt: "Valentine roses", colors: MONTH_THEMES[1].light, month: 1 },
  { id: "mar", src: "/hero-mar.png", alt: "Early spring meadow", colors: MONTH_THEMES[2].light, month: 2 },
  { id: "apr", src: "/hero-apr.png", alt: "Cherry blossoms along a canal", colors: MONTH_THEMES[3].light, month: 3 },
  { id: "may", src: "/hero-may.png", alt: "Wisteria in full bloom", colors: MONTH_THEMES[4].light, month: 4 },
  { id: "jun", src: "/image.png", alt: "Sunlit golden fields", colors: MONTH_THEMES[5].light, month: 5 },
  { id: "jul", src: "/hero-jul.png", alt: "Tropical ocean shore", colors: MONTH_THEMES[6].light, month: 6 },
  { id: "aug", src: "/hero-aug.png", alt: "Sunset over mountains", colors: MONTH_THEMES[7].light, month: 7 },
  { id: "sep", src: "/hero-sep.png", alt: "Amber harvest fields", colors: MONTH_THEMES[8].light, month: 8 },
  { id: "oct", src: "/hero-oct.png", alt: "Crimson maple leaves", colors: MONTH_THEMES[9].light, month: 9 },
  { id: "nov", src: "/hero-nov.png", alt: "Misty autumn forest", colors: MONTH_THEMES[10].light, month: 10 },
  { id: "dec", src: "/hero-dec.png", alt: "Frosty winter night", colors: MONTH_THEMES[11].light, month: 11 },
];

/**
 * Generate CSS custom properties object from theme colors
 * Applied as inline styles to dynamically theme components
 */
export function themeToCSS(colors: ThemeColors): Record<string, string> {
  return {
    "--cal-primary": colors.primary,
    "--cal-secondary": colors.secondary,
    "--cal-tertiary": colors.tertiary,
    "--cal-surface": colors.surface,
    "--cal-surface-hover": colors.surfaceHover,
    "--cal-text": colors.text,
    "--cal-text-muted": colors.textMuted,
    "--cal-range-start": colors.rangeStart,
    "--cal-range-end": colors.rangeEnd,
    "--cal-range-middle": colors.rangeMiddle,
    "--cal-range-middle-text": colors.rangeMiddleText,
  };
}
