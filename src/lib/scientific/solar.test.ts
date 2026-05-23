import { describe, expect, it } from "vitest";
import {
  declination,
  exteriorOvercastIlluminance,
  solarElevation,
} from "./solar";
import { MODEL_YEAR_DAY1_SERIAL } from "./constants";

/**
 * Theory-level checks for the solar functions that power the landing widgets
 * (solar arc, annual light calendar). These verify the geometry and the CIE
 * overcast model against known identities, independent of the spreadsheet.
 */
describe("solar geometry", () => {
  it("at solar noon (H=0) elevation equals 90 − |latitude − declination|", () => {
    const cases = [
      { decl: 0, lat: 0 }, // sun at zenith
      { decl: 0, lat: 37 },
      { decl: 23.45, lat: 37 },
      { decl: -23.45, lat: 52 },
      { decl: 10, lat: -30 },
    ];
    for (const { decl, lat } of cases) {
      const expected = 90 - Math.abs(lat - decl);
      expect(solarElevation(decl, lat, 0)).toBeCloseTo(expected, 6);
    }
  });

  it("the sun is below the horizon at midnight (H=180°)", () => {
    expect(solarElevation(0, 37, 180)).toBeLessThan(0);
    expect(solarElevation(23.45, 60, 180)).toBeLessThan(0);
  });

  it("declination stays within the obliquity bounds (≈ ±23.6°)", () => {
    let min = Infinity;
    let max = -Infinity;
    for (let d = 0; d < 365; d++) {
      const v = declination(MODEL_YEAR_DAY1_SERIAL + d);
      min = Math.min(min, v);
      max = Math.max(max, v);
    }
    // asin(0.4) ≈ 23.578°
    expect(max).toBeLessThanOrEqual(23.6);
    expect(min).toBeGreaterThanOrEqual(-23.6);
    expect(max).toBeGreaterThan(23.4);
    expect(min).toBeLessThan(-23.4);
  });
});

describe("CIE overcast-sky exterior illuminance", () => {
  it("is zero when the sun is below the horizon", () => {
    expect(exteriorOvercastIlluminance(-0.1)).toBe(0);
    expect(exteriorOvercastIlluminance(-30)).toBe(0);
  });

  it("matches (7/9)·π·(100 + 7580·sinγ^1.36)", () => {
    for (const g of [5, 20, 45, 53.7, 90]) {
      const s = Math.sin((g * Math.PI) / 180);
      const expected = (7 / 9) * Math.PI * (100 + 7580 * Math.pow(s, 1.36));
      expect(exteriorOvercastIlluminance(g)).toBeCloseTo(expected, 6);
    }
  });

  it("increases monotonically with solar elevation", () => {
    let prev = -1;
    for (let g = 0; g <= 90; g += 1) {
      const v = exteriorOvercastIlluminance(g);
      expect(v).toBeGreaterThanOrEqual(prev);
      prev = v;
    }
  });

  it("peaks at ~18.8 klx at the zenith", () => {
    // (7/9)·π·(100 + 7580) ≈ 18,765.8 lx
    expect(exteriorOvercastIlluminance(90)).toBeCloseTo(18765.8, 1);
  });
});
