"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  declination,
  hourAngle,
  solarElevation,
  solarTimeOffset,
} from "@/lib/scientific/solar";
import { MODEL_YEAR_DAY1_SERIAL } from "@/lib/scientific/constants";

/**
 * Cinematic observatory backdrop: an altitude dome with the *real* solar path
 * (computed from the engine) for a representative day, and a luminous sun that
 * travels the daytime arc. The geometry is genuine — same functions the
 * calculator uses — so the curve is the true elevation profile, not decoration.
 */

const W = 1000;
const H = 520;
const HORIZON = 432; // y at 0° elevation
const APEX = 64; // y at 90° elevation
const LON = 6;
const TZ = 1;
const DST = true;

const elevToY = (e: number) =>
  HORIZON - (Math.max(0, Math.min(90, e)) / 90) * (HORIZON - APEX);

export function SkyDome({
  latitude = 37,
  dayIndex = 171,
}: {
  latitude?: number;
  dayIndex?: number;
}) {
  const reduce = useReducedMotion();

  const { fullPath, dayPath, sun, peakX } = useMemo(() => {
    const serial = MODEL_YEAR_DAY1_SERIAL + dayIndex;
    const dec = declination(serial);
    const offset = solarTimeOffset(serial, LON, TZ, DST);

    const pts: { x: number; y: number; e: number }[] = [];
    for (let m = 0; m <= 1440; m += 6) {
      const e = solarElevation(dec, latitude, hourAngle(m / 1440, offset));
      pts.push({ x: (m / 1440) * W, y: elevToY(e), e });
    }

    const toPath = (arr: typeof pts) =>
      arr
        .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`)
        .join(" ");

    const day = pts.filter((p) => p.e >= 0);
    const cx: number[] = [];
    const cy: number[] = [];
    const op: number[] = [];
    day.forEach((p, i) => {
      const t = day.length > 1 ? i / (day.length - 1) : 0.5;
      cx.push(p.x);
      cy.push(p.y);
      op.push(t < 0.08 ? t / 0.08 : t > 0.92 ? (1 - t) / 0.08 : 1);
    });
    const peak = day.reduce((a, b) => (b.e > a.e ? b : a), day[0] ?? { x: W / 2, y: APEX, e: 0 });

    return { fullPath: toPath(pts), dayPath: toPath(day), sun: { cx, cy, op }, peakX: peak.x };
  }, [latitude, dayIndex]);

  const ringElevs = [30, 60];
  const midX = sun.cx.length ? sun.cx[Math.floor(sun.cx.length / 2)] : W / 2;
  const midY = sun.cy.length ? sun.cy[Math.floor(sun.cy.length / 2)] : APEX;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMax slice"
      className="h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--daylight)" stopOpacity="0.55" />
          <stop offset="45%" stopColor="var(--daylight)" stopOpacity="0.18" />
          <stop offset="100%" stopColor="var(--daylight)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="sunCore" cx="38%" cy="34%" r="70%">
          <stop offset="0%" stopColor="#fffaf0" />
          <stop offset="42%" stopColor="var(--daylight)" />
          <stop offset="100%" stopColor="color-mix(in oklab, var(--daylight) 70%, transparent)" />
        </radialGradient>
        <linearGradient id="arcStroke" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--daylight)" stopOpacity="0.85" />
          <stop offset="100%" stopColor="var(--daylight)" stopOpacity="0.15" />
        </linearGradient>
        <linearGradient id="domeFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="color-mix(in oklab, var(--daylight) 18%, transparent)" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>

      {/* altitude rings (instrument guides) */}
      {ringElevs.map((e) => (
        <g key={e}>
          <line
            x1="0"
            y1={elevToY(e)}
            x2={W}
            y2={elevToY(e)}
            stroke="color-mix(in oklab, var(--foreground) 14%, transparent)"
            strokeWidth="1"
            strokeDasharray="2 8"
          />
          <text
            x="14"
            y={elevToY(e) - 6}
            fontSize="11"
            className="fill-[var(--muted-foreground)]"
            opacity="0.65"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {e}°
          </text>
        </g>
      ))}

      {/* meridian ticks every 3h */}
      {[3, 6, 9, 12, 15, 18, 21].map((hh) => (
        <line
          key={hh}
          x1={(hh / 24) * W}
          y1={APEX - 8}
          x2={(hh / 24) * W}
          y2={HORIZON}
          stroke="color-mix(in oklab, var(--foreground) 8%, transparent)"
          strokeWidth="1"
          strokeDasharray="1 10"
        />
      ))}

      {/* area under the daytime arc */}
      <path d={`${dayPath} L${W},${HORIZON} L0,${HORIZON} Z`} fill="url(#domeFill)" opacity="0.5" />

      {/* full path (faint, incl. below horizon) */}
      <path d={fullPath} fill="none" stroke="color-mix(in oklab, var(--foreground) 10%, transparent)" strokeWidth="1" strokeDasharray="3 6" />
      {/* daytime arc, bright */}
      <path d={dayPath} fill="none" stroke="url(#arcStroke)" strokeWidth="2" strokeLinecap="round" />

      {/* horizon */}
      <line x1="0" y1={HORIZON} x2={W} y2={HORIZON} stroke="color-mix(in oklab, var(--foreground) 22%, transparent)" strokeWidth="1.25" />

      {/* the sun */}
      {reduce || sun.cx.length === 0 ? (
        <g>
          <circle cx={midX} cy={midY} r="120" fill="url(#sunGlow)" />
          <circle cx={midX} cy={midY} r="13" fill="url(#sunCore)" className="bloom" />
        </g>
      ) : (
        <>
          <motion.circle
            r="120"
            fill="url(#sunGlow)"
            initial={{ cx: peakX, cy: APEX, opacity: 0 }}
            animate={{ cx: sun.cx, cy: sun.cy, opacity: sun.op }}
            transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
          />
          <motion.circle
            r="13"
            fill="url(#sunCore)"
            className="bloom"
            initial={{ cx: peakX, cy: APEX, opacity: 0 }}
            animate={{ cx: sun.cx, cy: sun.cy, opacity: sun.op }}
            transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
          />
        </>
      )}
    </svg>
  );
}
