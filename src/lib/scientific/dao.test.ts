import { describe, expect, it } from "vitest";
import { buildExteriorProfile, computeDao, DEFAULT_PARAMETERS } from "./dao";

/**
 * Ground-truth values cached in the reference workbook
 * "2025_DAo 4.0.2 plus_DF to DAo & Daocon.xlsx" for its default configuration
 * (latitude 37°, 08:00–17:00, 11:00–12:00 break, weekends excluded, 300 lx).
 * [DF %, DAo %, DAo.con %]
 */
const REFERENCE: Array<[number, number, number]> = [
  [5.0, 64.60336538461539, 79.65506022452301],
  [4.75, 62.980769230769226, 78.86464745808762],
  [4.5, 60.82932692307692, 77.97470765887165],
  [4.25, 58.34134615384615, 76.95109370518202],
  [4.0, 53.97836538461539, 75.73323358227374],
  [3.75, 50.75721153846153, 74.27042154510417],
  [3.5, 47.24759615384615, 72.58264823948704],
  [3.25, 43.78605769230769, 70.6539049680121],
  [3.0, 40.46875, 68.4587502768086],
  [2.75, 37.06730769230769, 65.976736904974],
  [2.5, 33.24519230769231, 63.17436255006796],
  [2.25, 28.028846153846153, 59.92455736004379],
  [2.0, 19.471153846153847, 55.92378692947519],
  [1.75, 6.310096153846153, 50.547975656795906],
  [1.5, 0, 43.47583165169793],
  [1.25, 0, 36.22985970974828],
  [1.0, 0, 28.98388776779862],
  [0.75, 0, 21.737915825848965],
  [0.5, 0, 14.49194388389931],
  [0.25, 0, 7.245971941949655],
];

describe("DF → DAo model (workbook parity)", () => {
  const profile = buildExteriorProfile(DEFAULT_PARAMETERS);

  it("samples 8320 occupied steps (32 daily × 260 weekdays)", () => {
    expect(profile.count).toBe(8320);
  });

  it.each(REFERENCE)(
    "DF %s%% → DAo and DAo.con match the workbook",
    (df, expectedDao, expectedCon) => {
      const { dao, daoCon } = computeDao(
        profile,
        df,
        DEFAULT_PARAMETERS.thresholdLux,
      );
      expect(dao).toBeCloseTo(expectedDao, 6);
      expect(daoCon).toBeCloseTo(expectedCon, 6);
    },
  );
});
