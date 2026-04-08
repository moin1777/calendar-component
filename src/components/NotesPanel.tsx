// ============================================================
// NotesPanel — Side panel for viewing and creating notes
// Clean, integrated design with Framer Motion transitions
// ============================================================

"use client";

import React, { memo, useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Note, DateRange } from "@/lib/types";
import { MONTH_NAMES_SHORT, toDateKey, fromDateKey } from "@/lib/date-utils";

interface NotesPanelProps {
  range: DateRange;
  notes: Note[];
  onAddNote: (dateKey: string, text: string, endDateKey?: string) => void;
  onDeleteNote: (id: string) => void;
  onTogglePin: (id: string) => void;
}

/** Format date key "2026-04-07" → "Apr 7, 2026" */
function formatDateKey(key: string): string {
  const d = fromDateKey(key);
  return `${MONTH_NAMES_SHORT[d.month]} ${d.day}, ${d.year}`;
}

const NotesPanel = memo(function NotesPanel({
  range,
  notes,
  onAddNote,
  onDeleteNote,
  onTogglePin,
}: NotesPanelProps) {
  const [newNote, setNewNote] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const dateKey = range.start ? toDateKey(range.start) : null;
  const endDateKey = range.end ? toDateKey(range.end) : undefined;

  // Filter notes relevant to the current selection
  const relevantNotes = dateKey
    ? notes
        .filter((n) => {
          // Show notes for any date in the selected range
          if (n.date === dateKey) return true;
          if (endDateKey && n.date === endDateKey) return true;
          if (n.endDate === dateKey) return true;
          return false;
        })
        .sort((a, b) => {
          if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
          return b.createdAt - a.createdAt;
        })
    : [];

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!newNote.trim() || !dateKey) return;
      onAddNote(dateKey, newNote.trim(), endDateKey);
      setNewNote("");
      inputRef.current?.focus();
    },
    [newNote, dateKey, endDateKey, onAddNote]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSubmit(e);
      }
    },
    [handleSubmit]
  );

  return (
    <div
      className="rounded-2xl p-5 h-full flex flex-col border"
      style={{
        backgroundColor: "var(--cal-surface)",
        borderColor: "var(--cal-tertiary)",
      }}
    >
      {/* Panel header */}
      <div className="flex items-center gap-2 mb-4">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
          style={{ backgroundColor: "var(--cal-tertiary)" }}
        >
          📝
        </div>
        <div>
          <h3
            className="text-sm font-bold"
            style={{ color: "var(--cal-text)" }}
          >
            Notes
          </h3>
          <p
            className="text-xs"
            style={{ color: "var(--cal-text-muted)" }}
          >
            {dateKey
              ? endDateKey
                ? `${formatDateKey(dateKey)} → ${formatDateKey(endDateKey)}`
                : formatDateKey(dateKey)
              : "Select a date to add notes"}
          </p>
        </div>
      </div>

      {/* No date selected state */}
      <AnimatePresence mode="wait">
        {!dateKey ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex items-center justify-center"
          >
            <div className="text-center">
              <div className="text-4xl mb-3">📅</div>
              <p
                className="text-sm font-medium"
                style={{ color: "var(--cal-text-muted)" }}
              >
                Click a date on the calendar
              </p>
              <p
                className="text-xs mt-1"
                style={{ color: "var(--cal-text-muted)", opacity: 0.6 }}
              >
                Or select a range to add notes
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={dateKey}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex-1 flex flex-col min-h-0"
          >
            {/* Input form */}
            <form onSubmit={handleSubmit} className="mb-4">
              <div className="relative">
                <textarea
                  ref={inputRef}
                  id="note-input"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Write a note..."
                  rows={2}
                  className="w-full px-3 py-2.5 rounded-xl text-sm resize-none border focus:outline-none focus:ring-2 transition-shadow"
                  style={{
                    backgroundColor: "var(--cal-surface-hover)",
                    borderColor: "var(--cal-tertiary)",
                    color: "var(--cal-text)",
                    // @ts-expect-error CSS custom property
                    "--tw-ring-color": "var(--cal-primary)",
                  }}
                />
                <motion.button
                  type="submit"
                  disabled={!newNote.trim()}
                  className="absolute bottom-2 right-2 p-1.5 rounded-lg text-white cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                  style={{ backgroundColor: "var(--cal-primary)" }}
                  whileHover={newNote.trim() ? { scale: 1.1 } : {}}
                  whileTap={newNote.trim() ? { scale: 0.9 } : {}}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </motion.button>
              </div>
              <p
                className="text-[10px] mt-1.5 ml-1"
                style={{ color: "var(--cal-text-muted)", opacity: 0.6 }}
              >
                Press Enter to save • Shift+Enter for new line
              </p>
            </form>

            {/* Notes list */}
            <div className="flex-1 overflow-y-auto space-y-2 min-h-0 pr-1 scrollbar-thin">
              <AnimatePresence initial={false}>
                {relevantNotes.length === 0 && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    className="text-xs text-center py-6"
                    style={{ color: "var(--cal-text-muted)" }}
                  >
                    No notes yet for this date
                  </motion.p>
                )}
                {relevantNotes.map((note) => (
                  <motion.div
                    key={note.id}
                    layout
                    initial={{ opacity: 0, x: -20, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 20, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="group relative rounded-xl p-3 border-l-3"
                    style={{
                      backgroundColor: "var(--cal-surface-hover)",
                      borderLeftColor: note.color,
                    }}
                  >
                    {/* Pinned indicator */}
                    {note.pinned && (
                      <span className="absolute top-1 right-1 text-[10px]">📌</span>
                    )}

                    {/* Note text */}
                    <p
                      className="text-sm leading-relaxed pr-8"
                      style={{ color: "var(--cal-text)" }}
                    >
                      {note.text}
                    </p>

                    {/* Date range tag */}
                    {note.endDate && (
                      <span
                        className="text-[10px] mt-1.5 inline-block px-1.5 py-0.5 rounded"
                        style={{
                          backgroundColor: "var(--cal-tertiary)",
                          color: "var(--cal-text-muted)",
                        }}
                      >
                        {formatDateKey(note.date)} → {formatDateKey(note.endDate)}
                      </span>
                    )}

                    {/* Action buttons (visible on hover) */}
                    <div className="absolute top-2 right-6 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => onTogglePin(note.id)}
                        className="p-1 rounded hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer"
                        title={note.pinned ? "Unpin" : "Pin"}
                        style={{ color: "var(--cal-text-muted)" }}
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill={note.pinned ? "currentColor" : "none"}
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M12 2L15 8.5L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L9 8.5L12 2Z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => onDeleteNote(note.id)}
                        className="p-1 rounded hover:bg-red-100 dark:hover:bg-red-900/30 cursor-pointer text-red-400 hover:text-red-600"
                        title="Delete note"
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6" />
                        </svg>
                      </button>
                    </div>

                    {/* Timestamp */}
                    <p
                      className="text-[10px] mt-1.5"
                      style={{ color: "var(--cal-text-muted)", opacity: 0.5 }}
                    >
                      {new Date(note.createdAt).toLocaleTimeString(undefined, {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

export default NotesPanel;
