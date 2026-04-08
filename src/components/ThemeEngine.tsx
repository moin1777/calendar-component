// ============================================================
// ThemeEngine — Visual component that wraps children with
// dynamic CSS custom properties based on the current month/mode
// Also renders the animated hero image section
// ============================================================

"use client";

import React, { memo, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { getThemeColors, themeToCSS, HERO_IMAGES } from "@/lib/theme-engine";
import type { ThemeMode } from "@/lib/types";

interface ThemeEngineProps {
  month: number;
  mode: ThemeMode;
  children: React.ReactNode;
}

const ThemeEngine = memo(function ThemeEngine({
  month,
  mode,
  children,
}: ThemeEngineProps) {
  // Get colors for current month + mode
  const colors = useMemo(() => getThemeColors(month, mode), [month, mode]);
  const cssVars = useMemo(() => themeToCSS(colors), [colors]);
  const heroImage = HERO_IMAGES[month % 12];

  return (
    <motion.div
      className="min-h-screen transition-colors duration-500"
      style={{
        ...cssVars,
        backgroundColor: mode === "dark" ? "#0A0A0F" : "#F5F5F7",
      } as React.CSSProperties}
      animate={{
        backgroundColor: mode === "dark" ? "#0A0A0F" : "#F5F5F7",
      }}
      transition={{ duration: 0.6 }}
    >
      {/* Full-width wrapper */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Hero Image Section — Wall Calendar Top */}
        <motion.div
          className="relative overflow-hidden rounded-3xl mb-6 shadow-2xl"
          style={{ height: "clamp(180px, 30vw, 320px)" }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`hero-${month}`}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.6 }}
            >
              <Image
                src={heroImage.src}
                alt={heroImage.alt}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 1200px"
              />
              {/* Gradient overlay for text contrast */}
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(
                    to bottom, 
                    transparent 30%, 
                    ${mode === "dark" ? "rgba(10,10,15,0.8)" : "rgba(0,0,0,0.3)"} 100%
                  )`,
                }}
              />
            </motion.div>
          </AnimatePresence>

          {/* Floating month badge on hero */}
          <div className="absolute bottom-4 left-5 z-10">
            <motion.div
              key={`badge-${month}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="backdrop-blur-xl rounded-2xl px-5 py-2.5 border border-white/20"
              style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
            >
              <p className="text-white text-lg sm:text-xl font-bold tracking-tight drop-shadow-lg">
                {heroImage.alt}
              </p>
            </motion.div>
          </div>

          {/* Decorative floating dots */}
          {/* <div className="absolute top-4 right-5 flex gap-1.5">
            {[colors.primary, colors.secondary, colors.tertiary].map(
              (color, i) => (
                <motion.div
                  key={`dot-${i}`}
                  className="w-3 h-3 rounded-full border border-white/30"
                  style={{ backgroundColor: color }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                />
              )
            )}
          </div> */}
        </motion.div>

        {/* Calendar content below hero */}
        {children}
      </div>
    </motion.div>
  );
});

export default ThemeEngine;
