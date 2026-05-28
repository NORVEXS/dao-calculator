/** Number / time formatting helpers shared across the UI. */

/** Base UI sliders emit `number | readonly number[]`; take the first value. */
export function firstSliderValue(v: number | readonly number[]): number {
  return Array.isArray(v) ? v[0] : (v as number);
}

export function formatPercent(value: number, digits = 1): string {
  if (!Number.isFinite(value)) return "·";
  return `${value.toFixed(digits)}%`;
}

export function formatNumber(value: number, digits = 2): string {
  if (!Number.isFinite(value)) return "·";
  return value.toFixed(digits);
}

/** Minutes-from-midnight → "HH:MM". */
export function minutesToHHMM(min: number): string {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

/** "HH:MM" → minutes from midnight. Returns null when malformed. */
export function hhmmToMinutes(value: string): number | null {
  const match = /^(\d{1,2}):(\d{2})$/.exec(value.trim());
  if (!match) return null;
  const h = Number(match[1]);
  const m = Number(match[2]);
  if (h > 23 || m > 59) return null;
  return h * 60 + m;
}
