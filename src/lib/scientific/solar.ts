/**
 * Solar geometry and CIE overcast-sky exterior illuminance.
 *
 * Every function mirrors the corresponding column in the reference workbook's
 * "Datos P*" sheets. The combination reproduces the spreadsheet's per-cell
 * exterior horizontal illuminance to floating-point precision.
 */

import {
  DECLINATION_REF,
  DST_SUMMER_END_SERIAL,
  DST_SUMMER_START_SERIAL,
  OBLIQUITY_SIN,
  OVERCAST_BASE,
  OVERCAST_EXP,
  OVERCAST_GAIN,
  TROPICAL_YEAR,
} from "./constants";

const DEG = Math.PI / 180;

/** Angular position of the day in its orbit (radians), per the workbook term. */
function dayAngle(serial: number): number {
  return ((serial - DECLINATION_REF) * 360) / TROPICAL_YEAR * DEG;
}

/** Solar declination in degrees (simplified model: asin(0.4·sin(dayAngle))). */
export function declination(serial: number): number {
  return Math.asin(Math.sin(dayAngle(serial)) * OBLIQUITY_SIN) / DEG;
}

/** Equation of time in minutes. */
export function equationOfTime(serial: number): number {
  const b = dayAngle(serial);
  return -(9.87 * Math.sin(2 * b) - 7.53 * Math.cos(b) - 1.5 * Math.sin(b));
}

/** Whether the reference day falls inside the EU daylight-saving window. */
export function isSummerTime(serial: number): boolean {
  return serial >= DST_SUMMER_START_SERIAL && serial <= DST_SUMMER_END_SERIAL;
}

/**
 * Offset (in fractions of a day) between local clock time and solar time.
 * Mirrors `=ABS((-IF(W,1,2) - timeZone + longitude/15 - EoT/60)/24)`.
 */
export function solarTimeOffset(
  serial: number,
  longitude: number,
  timeZone: number,
  dstEnabled: boolean,
): number {
  const dstShift = dstEnabled && isSummerTime(serial) ? 2 : 1;
  const eot = equationOfTime(serial);
  return Math.abs((-dstShift - timeZone + longitude / 15 - eot / 60) / 24);
}

/**
 * Hour angle in degrees for a given clock time (expressed as a fraction of a
 * day) and the precomputed solar-time offset. 0° at solar noon, ±15°/hour.
 */
export function hourAngle(clockFraction: number, offset: number): number {
  return (clockFraction - offset - 0.5) * 24 * 15;
}

/** Solar elevation (altitude) in degrees. */
export function solarElevation(
  declinationDeg: number,
  latitudeDeg: number,
  hourAngleDeg: number,
): number {
  const d = declinationDeg * DEG;
  const lat = latitudeDeg * DEG;
  const h = hourAngleDeg * DEG;
  return (
    Math.asin(
      Math.sin(d) * Math.sin(lat) + Math.cos(d) * Math.cos(lat) * Math.cos(h),
    ) / DEG
  );
}

/**
 * CIE standard overcast-sky horizontal illuminance (lux) as a function of
 * solar elevation. Returns 0 when the sun is below the horizon.
 * `(7/9)·π·(100 + 7580·sin(γ)^1.36)`.
 */
export function exteriorOvercastIlluminance(elevationDeg: number): number {
  if (elevationDeg < 0) return 0;
  const s = Math.sin(elevationDeg * DEG);
  return (7 / 9) * Math.PI * (OVERCAST_BASE + OVERCAST_GAIN * Math.pow(s, OVERCAST_EXP));
}
