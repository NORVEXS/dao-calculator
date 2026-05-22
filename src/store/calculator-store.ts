"use client";

import { create } from "zustand";
import { DaoParameters, DEFAULT_PARAMETERS } from "@/lib/scientific/dao";

export type CalculatorMode = "single" | "section" | "matrix";

export interface SectionPoint {
  id: string;
  /** Distance to the façade / window (m) — descriptive only. */
  distance: number;
  /** Daylight Factor (%). */
  df: number;
}

interface CalculatorState {
  mode: CalculatorMode;
  params: DaoParameters;

  /** Single-point mode. */
  singleDf: number;

  /** Vertical-section mode. */
  section: SectionPoint[];

  /** Matrix mode. */
  matrixRows: number;
  matrixCols: number;
  /** Row-major DF grid; length === rows × cols. */
  matrix: number[];
  /** Grid spacing in metres (for axis labels). */
  matrixSpacing: number;

  setMode: (mode: CalculatorMode) => void;
  setParams: (patch: Partial<DaoParameters>) => void;
  resetParams: () => void;

  setSingleDf: (df: number) => void;

  setSectionPoint: (id: string, patch: Partial<SectionPoint>) => void;
  addSectionPoint: () => void;
  removeSectionPoint: (id: string) => void;
  setSection: (points: SectionPoint[]) => void;

  setMatrixSize: (rows: number, cols: number) => void;
  setMatrixCell: (index: number, value: number) => void;
  setMatrixSpacing: (spacing: number) => void;
  fillMatrixGradient: () => void;
}

function uid(): string {
  return Math.random().toString(36).slice(2, 9);
}

function defaultSection(): SectionPoint[] {
  // Mirrors the reference workbook's default vertical profile:
  // DF descending from 5% in 0.25 steps, 0.3 m spacing.
  return Array.from({ length: 8 }, (_, i) => ({
    id: uid(),
    distance: Number((0.3 * (i + 1)).toFixed(2)),
    df: Number((5 - i * 0.25).toFixed(2)),
  }));
}

function defaultMatrix(rows: number, cols: number): number[] {
  const grid: number[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      // Light decays with distance from the window edge (top row brightest).
      const decay = 1 - r / Math.max(1, rows - 1);
      const lateral = 1 - 0.25 * Math.abs(c - (cols - 1) / 2) / Math.max(1, cols / 2);
      grid.push(Number((0.6 + 5.4 * decay * lateral).toFixed(2)));
    }
  }
  return grid;
}

const DEFAULT_ROWS = 6;
const DEFAULT_COLS = 8;

export const useCalculatorStore = create<CalculatorState>((set, get) => ({
  mode: "single",
  params: { ...DEFAULT_PARAMETERS },

  singleDf: 3,

  section: defaultSection(),

  matrixRows: DEFAULT_ROWS,
  matrixCols: DEFAULT_COLS,
  matrix: defaultMatrix(DEFAULT_ROWS, DEFAULT_COLS),
  matrixSpacing: 0.5,

  setMode: (mode) => set({ mode }),
  setParams: (patch) => set((s) => ({ params: { ...s.params, ...patch } })),
  resetParams: () => set({ params: { ...DEFAULT_PARAMETERS } }),

  setSingleDf: (singleDf) => set({ singleDf }),

  setSectionPoint: (id, patch) =>
    set((s) => ({
      section: s.section.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    })),
  addSectionPoint: () =>
    set((s) => {
      const last = s.section[s.section.length - 1];
      const distance = last ? Number((last.distance + 0.3).toFixed(2)) : 0.3;
      const df = last ? Number(Math.max(0, last.df - 0.25).toFixed(2)) : 5;
      return { section: [...s.section, { id: uid(), distance, df }] };
    }),
  removeSectionPoint: (id) =>
    set((s) => ({ section: s.section.filter((p) => p.id !== id) })),
  setSection: (section) => set({ section }),

  setMatrixSize: (rows, cols) => {
    const r = Math.max(1, Math.min(40, Math.round(rows)));
    const c = Math.max(1, Math.min(40, Math.round(cols)));
    const prev = get().matrix;
    const prevCols = get().matrixCols;
    const next: number[] = [];
    for (let i = 0; i < r; i++) {
      for (let j = 0; j < c; j++) {
        const old = prev[i * prevCols + j];
        next.push(old ?? 0);
      }
    }
    set({ matrixRows: r, matrixCols: c, matrix: next });
  },
  setMatrixCell: (index, value) =>
    set((s) => {
      const next = s.matrix.slice();
      next[index] = value;
      return { matrix: next };
    }),
  setMatrixSpacing: (matrixSpacing) => set({ matrixSpacing }),
  fillMatrixGradient: () =>
    set((s) => ({ matrix: defaultMatrix(s.matrixRows, s.matrixCols) })),
}));
