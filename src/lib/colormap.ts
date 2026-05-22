/**
 * Perceptual color scales for daylight metrics.
 *
 * `daylightScale` maps a normalized value [0,1] (low → high daylight) onto a
 * sequential ramp that reads as "darker/cooler = less light, brighter/warmer =
 * more light": deep indigo → blue → teal → green → amber.
 */

type RGB = [number, number, number];

const DAYLIGHT_STOPS: { t: number; rgb: RGB }[] = [
  { t: 0.0, rgb: [12, 18, 38] }, // near-black indigo
  { t: 0.2, rgb: [34, 51, 122] }, // deep blue
  { t: 0.4, rgb: [30, 110, 168] }, // ocean blue
  { t: 0.58, rgb: [22, 158, 158] }, // teal
  { t: 0.74, rgb: [86, 188, 110] }, // green
  { t: 0.88, rgb: [212, 196, 80] }, // chartreuse-gold
  { t: 1.0, rgb: [248, 214, 110] }, // daylight amber
];

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function clamp01(v: number): number {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}

/** Interpolate the daylight ramp at `value` ∈ [0,1]; returns "rgb(r, g, b)". */
export function daylightScale(value: number): string {
  const v = clamp01(value);
  let lo = DAYLIGHT_STOPS[0];
  let hi = DAYLIGHT_STOPS[DAYLIGHT_STOPS.length - 1];
  for (let i = 0; i < DAYLIGHT_STOPS.length - 1; i++) {
    if (v >= DAYLIGHT_STOPS[i].t && v <= DAYLIGHT_STOPS[i + 1].t) {
      lo = DAYLIGHT_STOPS[i];
      hi = DAYLIGHT_STOPS[i + 1];
      break;
    }
  }
  const span = hi.t - lo.t || 1;
  const f = (v - lo.t) / span;
  const r = Math.round(lerp(lo.rgb[0], hi.rgb[0], f));
  const g = Math.round(lerp(lo.rgb[1], hi.rgb[1], f));
  const b = Math.round(lerp(lo.rgb[2], hi.rgb[2], f));
  return `rgb(${r}, ${g}, ${b})`;
}

/** CSS linear-gradient string spanning the full daylight ramp. */
export function daylightGradient(angle = "90deg"): string {
  const stops = DAYLIGHT_STOPS.map(
    (s) => `${daylightScale(s.t)} ${Math.round(s.t * 100)}%`,
  ).join(", ");
  return `linear-gradient(${angle}, ${stops})`;
}

/** Whether text on top of a given normalized value should be light. */
export function prefersLightText(value: number): boolean {
  return clamp01(value) < 0.62;
}

/** Qualitative status for a DAo percentage, for badges and summaries. */
export type DaoBand = {
  label: string;
  description: string;
  tone: "low" | "fair" | "good" | "excellent";
};

export function classifyDao(daoPercent: number): DaoBand {
  if (daoPercent >= 75)
    return {
      label: "Excellent",
      description: "Strong daylighting even under overcast skies.",
      tone: "excellent",
    };
  if (daoPercent >= 50)
    return {
      label: "Good",
      description: "Reliable daylight for most occupied hours.",
      tone: "good",
    };
  if (daoPercent >= 25)
    return {
      label: "Fair",
      description: "Daylight supports part of the occupied time.",
      tone: "fair",
    };
  return {
    label: "Low",
    description: "Electric lighting needed most of the time.",
    tone: "low",
  };
}
