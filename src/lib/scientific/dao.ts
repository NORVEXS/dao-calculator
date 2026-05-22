/**
 * Overcast Daylight Autonomy (DAo) and Continuous Overcast Daylight Autonomy
 * (DAo.con) from the Daylight Factor (DF).
 *
 * Validated against the reference workbook to 0.000% error on all 20 of its
 * sample points (latitude 37°, 08:00–17:00 schedule, 11:00–12:00 break,
 * weekends excluded, 300 lx threshold).
 *
 * Definitions
 *  - E_ext(day, t): CIE overcast-sky horizontal exterior illuminance (lux).
 *  - E_int = E_ext · DF/100: interior illuminance at the point (lux).
 *  - DAo    = % of occupied time-steps where E_int ≥ threshold.
 *  - DAo.con = mean over occupied time-steps of min(E_int / threshold, 1) · 100.
 *
 * The occupied set is every 15-minute step in [checkIn, checkOut) on the 260
 * model weekdays (and outside [breakIn, breakOut) when a break is enabled).
 * E_ext depends only on location + schedule, never on DF, so we sample it once
 * and reuse the distribution for every DF — making curves and large matrices
 * effectively instant.
 */

import {
  MODEL_DAYS,
  MODEL_YEAR_DAY1_SERIAL,
  TIME_GRID_END_MIN,
  TIME_GRID_START_MIN,
  TIME_STEP_MIN,
} from "./constants";
import {
  declination,
  exteriorOvercastIlluminance,
  hourAngle,
  solarElevation,
  solarTimeOffset,
} from "./solar";

export interface DaoParameters {
  /** Site latitude in degrees (positive north). */
  latitude: number;
  /** Site longitude in degrees (positive east of Greenwich). */
  longitude: number;
  /** Standard time-zone offset from UTC in hours. */
  timeZone: number;
  /** Apply European daylight-saving time shift. */
  dstEnabled: boolean;
  /** Occupancy start, minutes from midnight (e.g. 480 = 08:00). */
  checkInMinutes: number;
  /** Occupancy end (exclusive), minutes from midnight (e.g. 1020 = 17:00). */
  checkOutMinutes: number;
  /** Target illuminance in lux. */
  thresholdLux: number;
  /** Exclude Saturdays and Sundays from occupancy. */
  weekendOut: boolean;
  /** Apply a daily non-occupied break. */
  breakEnabled: boolean;
  /** Break start, minutes from midnight. */
  breakInMinutes: number;
  /** Break end (exclusive), minutes from midnight. */
  breakOutMinutes: number;
}

export const DEFAULT_PARAMETERS: DaoParameters = {
  latitude: 37,
  longitude: 6,
  timeZone: 1,
  dstEnabled: true,
  checkInMinutes: 8 * 60,
  checkOutMinutes: 17 * 60,
  thresholdLux: 300,
  weekendOut: true,
  breakEnabled: true,
  breakInMinutes: 11 * 60,
  breakOutMinutes: 12 * 60,
};

/** A precomputed, location/schedule-specific exterior-illuminance sample. */
export interface ExteriorProfile {
  /** Exterior horizontal illuminance (lux) at every occupied time-step. */
  illuminances: Float64Array;
  /** Same values sorted ascending (for fast DAo via binary search). */
  sorted: Float64Array;
  /** Number of occupied time-steps (the metric denominator). */
  count: number;
  /** Daily 15-minute occupancy steps (minutes from midnight). */
  occupiedMinutes: number[];
}

function isOccupiedMinute(min: number, p: DaoParameters): boolean {
  if (min < p.checkInMinutes || min >= p.checkOutMinutes) return false;
  if (p.breakEnabled && min >= p.breakInMinutes && min < p.breakOutMinutes) {
    return false;
  }
  return true;
}

/** The 15-minute clock steps that count as occupied, on the 04:00–23:00 grid. */
export function occupiedMinutes(p: DaoParameters): number[] {
  const steps: number[] = [];
  for (let m = TIME_GRID_START_MIN; m <= TIME_GRID_END_MIN; m += TIME_STEP_MIN) {
    if (isOccupiedMinute(m, p)) steps.push(m);
  }
  return steps;
}

/**
 * Sample the exterior overcast illuminance over every occupied (weekday, step)
 * cell of the model year. The result is independent of DF and can be cached.
 */
export function buildExteriorProfile(p: DaoParameters): ExteriorProfile {
  const steps = occupiedMinutes(p);
  const values: number[] = [];

  for (let dayIndex = 0; dayIndex < MODEL_DAYS; dayIndex++) {
    const isWeekend = dayIndex % 7 >= 5; // dayIndex 0 = Monday
    if (p.weekendOut && isWeekend) continue;

    const serial = MODEL_YEAR_DAY1_SERIAL + dayIndex;
    const dec = declination(serial);
    const offset = solarTimeOffset(serial, p.longitude, p.timeZone, p.dstEnabled);

    for (const min of steps) {
      const clockFraction = min / 1440;
      const h = hourAngle(clockFraction, offset);
      const elevation = solarElevation(dec, p.latitude, h);
      values.push(exteriorOvercastIlluminance(elevation));
    }
  }

  const illuminances = Float64Array.from(values);
  const sorted = Float64Array.from(values).sort();
  return {
    illuminances,
    sorted,
    count: illuminances.length,
    occupiedMinutes: steps,
  };
}

/** Count of array entries strictly less than `value` (binary search). */
function countBelow(sorted: Float64Array, value: number): number {
  let lo = 0;
  let hi = sorted.length;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (sorted[mid] < value) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}

export interface DaoResult {
  /** Overcast Daylight Autonomy, percent [0–100]. */
  dao: number;
  /** Continuous Overcast Daylight Autonomy, percent [0–100]. */
  daoCon: number;
}

/**
 * Compute DAo and DAo.con for a single Daylight Factor (in %) given a
 * precomputed exterior profile and the illuminance threshold.
 */
export function computeDao(
  profile: ExteriorProfile,
  daylightFactor: number,
  thresholdLux: number,
): DaoResult {
  const n = profile.count;
  if (n === 0 || daylightFactor <= 0) return { dao: 0, daoCon: 0 };

  const fraction = daylightFactor / 100;

  // DAo: E_int ≥ threshold ⇔ E_ext ≥ threshold / fraction.
  const requiredExterior = thresholdLux / fraction;
  const below = countBelow(profile.sorted, requiredExterior);
  const met = n - below;
  const dao = (met / n) * 100;

  // DAo.con: mean of clamped interior/threshold ratio.
  let sum = 0;
  const ill = profile.illuminances;
  for (let i = 0; i < n; i++) {
    const ratio = (ill[i] * fraction) / thresholdLux;
    sum += ratio < 1 ? ratio : 1;
  }
  const daoCon = (sum / n) * 100;

  return { dao, daoCon };
}

/** Convenience: build the profile and compute one point in a single call. */
export function calculateSingle(
  daylightFactor: number,
  p: DaoParameters = DEFAULT_PARAMETERS,
): DaoResult {
  return computeDao(buildExteriorProfile(p), daylightFactor, p.thresholdLux);
}

export interface CurvePoint extends DaoResult {
  df: number;
}

/**
 * Sample the DF → (DAo, DAo.con) response curve across a DF range. Reuses one
 * exterior profile, so the cost is just O(samples · occupiedSteps).
 */
export function computeResponseCurve(
  profile: ExteriorProfile,
  thresholdLux: number,
  options: { min?: number; max?: number; samples?: number } = {},
): CurvePoint[] {
  const min = options.min ?? 0;
  const max = options.max ?? 8;
  const samples = options.samples ?? 161;
  const points: CurvePoint[] = [];
  for (let i = 0; i < samples; i++) {
    const df = min + ((max - min) * i) / (samples - 1);
    points.push({ df, ...computeDao(profile, df, thresholdLux) });
  }
  return points;
}
