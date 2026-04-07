// ============================================================
// useNotes — Notes persistence with localStorage
// Handles CRUD operations and syncs state on mount
// ============================================================

"use client";

import { useState, useEffect, useCallback } from "react";
import type { Note } from "@/lib/types";

const STORAGE_KEY = "calendar-notes-v1";

/**
 * Generate a unique ID for notes (avoids UUID dependency)
 */
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * Safely parse notes from localStorage
 * Returns empty array on any parse error
 */
function loadNotes(): Note[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * Persist notes to localStorage
 */
function saveNotes(notes: Note[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch {
    // Silently fail if storage is full or unavailable
    console.warn("Failed to save notes to localStorage");
  }
}

/** Available note accent colors */
export const NOTE_COLORS = [
  "#E87B9C", // Rose
  "#6AADEA", // Sky
  "#6BCF8E", // Mint
  "#E6A31E", // Amber
  "#A88BDB", // Violet
  "#E8733C", // Tangerine
  "#48B8D0", // Teal
  "#C84040", // Ruby
];

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Sync from localStorage on mount
  useEffect(() => {
    const stored = loadNotes();
    setNotes(stored);
    setIsLoaded(true);
  }, []);

  // Persist whenever notes change (but only after initial load)
  useEffect(() => {
    if (isLoaded) {
      saveNotes(notes);
    }
  }, [notes, isLoaded]);

  // Add a new note
  const addNote = useCallback(
    (dateKey: string, text: string, endDateKey?: string) => {
      const note: Note = {
        id: generateId(),
        date: dateKey,
        endDate: endDateKey,
        text: text.trim(),
        color: NOTE_COLORS[Math.floor(Math.random() * NOTE_COLORS.length)],
        pinned: false,
        createdAt: Date.now(),
      };
      setNotes((prev) => [note, ...prev]);
      return note;
    },
    []
  );

  // Delete a note by ID
  const deleteNote = useCallback((id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  }, []);

  // Update a note's text
  const updateNote = useCallback((id: string, text: string) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, text: text.trim() } : n))
    );
  }, []);

  // Toggle pin status
  const togglePin = useCallback((id: string) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n))
    );
  }, []);

  // Get notes for a specific date (or date range)
  const getNotesForDate = useCallback(
    (dateKey: string): Note[] => {
      return notes
        .filter((n) => n.date === dateKey || n.endDate === dateKey)
        .sort((a, b) => {
          // Pinned first, then by creation date
          if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
          return b.createdAt - a.createdAt;
        });
    },
    [notes]
  );

  // Get all notes for a specific month (for showing dots on day cells)
  const getNoteDatesForMonth = useCallback(
    (year: number, month: number): Set<string> => {
      const prefix = `${year}-${String(month + 1).padStart(2, "0")}`;
      const dates = new Set<string>();
      for (const n of notes) {
        if (n.date.startsWith(prefix)) dates.add(n.date);
      }
      return dates;
    },
    [notes]
  );

  return {
    notes,
    isLoaded,
    addNote,
    deleteNote,
    updateNote,
    togglePin,
    getNotesForDate,
    getNoteDatesForMonth,
  };
}
