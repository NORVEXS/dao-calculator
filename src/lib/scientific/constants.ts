/**
 * Physical and model constants for the DF → DAo conversion.
 *
 * These values are taken verbatim from the reference workbook
 * "2025_DAo 4.0.2 plus_DF to DAo & Daocon.xlsx" (I. Acosta & M. A. Campano,
 * University of Seville, 2025) so that this implementation reproduces the
 * spreadsheet results exactly (validated to 0.000% error across its 20
 * reference points).
 *
 * Methodology references:
 *  - Acosta, I.; Campano, M. A.; Domínguez-Amarillo, S.; Fernández-Agüera, J.
 *    (2019). Overcast Daylight Autonomy: A new concept to link daylight dynamic
 *    metrics with daylight factors. LEUKOS 15 (4), 254-269.
 *  - Acosta, I.; Campano, M. A.; Domínguez-Amarillo, S.; Navarro, J. (2023).
 *    Continuous Overcast Daylight Autonomy (DAo.con). LEUKOS 19 (3), 343-367.
 */

/** Excel serial date for 2007-01-01 (a Monday) — the model's reference year. */
export const MODEL_YEAR_DAY1_SERIAL = 39083;

/**
 * The model evaluates 52 full weeks (364 days) starting on Monday 2007-01-01,
 * which yields exactly 260 weekdays. The spreadsheet drops the trailing
 * 365th day (Dec 31) for the weekday count, and we match that.
 */
export const MODEL_DAYS = 364;

/** Reference offset used in the simplified declination / equation-of-time terms. */
export const DECLINATION_REF = 36605.3159;

/** sin(obliquity) approximation used by the workbook (sin 23.45° ≈ 0.4). */
export const OBLIQUITY_SIN = 0.4;

/** Tropical year length (days) used in the angular day term. */
export const TROPICAL_YEAR = 365.2422;

/** EU daylight-saving window for the reference year, as Excel serial dates. */
export const DST_SUMMER_START_SERIAL = 39166; // 2007-03-25
export const DST_SUMMER_END_SERIAL = 39383; // 2007-10-28

/** The workbook samples the day on a fixed 15-minute grid from 04:00 to 23:00. */
export const TIME_GRID_START_MIN = 4 * 60;
export const TIME_GRID_END_MIN = 23 * 60;
export const TIME_STEP_MIN = 15;

/** Coefficients of the CIE overcast-sky horizontal illuminance model (lux). */
export const OVERCAST_BASE = 100;
export const OVERCAST_GAIN = 7580;
export const OVERCAST_EXP = 1.36;

/** Default illuminance threshold (lux) — the typical 300 lx office target. */
export const DEFAULT_THRESHOLD_LUX = 300;
