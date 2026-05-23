"use client";

import { useMemo, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import {
  declination,
  exteriorOvercastIlluminance,
  hourAngle,
  solarElevation,
  solarTimeOffset,
} from "@/lib/scientific/solar";
import { MODEL_YEAR_DAY1_SERIAL } from "@/lib/scientific/constants";
import { daylightScale } from "@/lib/colormap";
import { minutesToHHMM, firstSliderValue } from "@/lib/format";
import { useLanguage } from "@/i18n/provider";

const LON = 6;
const TZ = 1;
const DST = true;

// SVG canvas (viewBox units)
const W = 360;
const H = 150;
const PAD_L = 4;
const PAD_R = 4;
const TOP = 8;
const BASE = 122; // y of horizon (elevation 0)
const MAX_ELEV = 90;

function elevationAt(serial: number, minutes: number, lat: number): number {
  const offset = solarTimeOffset(serial, LON, TZ, DST);
  const h = hourAngle(minutes / 1440, offset);
  return solarElevation(declination(serial), lat, h);
}

function xForMinutes(min: number): number {
  return PAD_L + (min / 1440) * (W - PAD_L - PAD_R);
}
function yForElevation(elev: number): number {
  const clamped = Math.max(-12, Math.min(MAX_ELEV, elev));
  return BASE - (clamped / MAX_ELEV) * (BASE - TOP);
}

export function SolarArcWidget() {
  const { t, lang } = useLanguage();
  const [minutes, setMinutes] = useState(12 * 60);
  const [dayIndex, setDayIndex] = useState(171); // ~21 Jun
  const [latitude, setLatitude] = useState(37);

  const serial = MODEL_YEAR_DAY1_SERIAL + dayIndex;

  const { path, area, sun, peak } = useMemo(() => {
    const pts: { x: number; y: number; e: number }[] = [];
    for (let m = 0; m <= 1440; m += 10) {
      const e = elevationAt(serial, m, latitude);
      pts.push({ x: xForMinutes(m), y: yForElevation(e), e });
    }
    const line = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
    // Area only where the sun is up.
    const baseY = yForElevation(0);
    const areaPath = `M${xForMinutes(0)},${baseY} ${pts
      .map((p) => `L${p.x.toFixed(1)},${Math.min(p.y, baseY).toFixed(1)}`)
      .join(" ")} L${xForMinutes(1440)},${baseY} Z`;
    const e = elevationAt(serial, minutes, latitude);
    const peakE = pts.reduce((mx, p) => Math.max(mx, p.e), -90);
    return {
      path: line,
      area: areaPath,
      sun: { x: xForMinutes(minutes), y: yForElevation(e), e },
      peak: peakE,
    };
  }, [serial, latitude, minutes]);

  const eExt = sun.e < 0 ? 0 : exteriorOvercastIlluminance(sun.e);
  const dateLabel = useMemo(() => {
    const d = new Date(2007, 0, 1 + dayIndex);
    return d.toLocaleDateString(lang === "es" ? "es-ES" : "en-US", {
      day: "numeric",
      month: "short",
    });
  }, [dayIndex, lang]);

  const sunColor = daylightScale(Math.max(0, sun.e) / MAX_ELEV);

  return (
    <Card className="p-6">
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-center">
        <div>
          <div className="mb-3 flex flex-wrap items-end gap-x-6 gap-y-2">
            <Reading label={t("widgets.solar.time")} value={minutesToHHMM(minutes)} />
            <Reading
              label={t("widgets.solar.elevation")}
              value={`${sun.e.toFixed(1)}°`}
              accent={sun.e >= 0}
            />
            <Reading
              label={t("widgets.solar.extIll")}
              value={sun.e < 0 ? "0 lx" : `${Math.round(eExt).toLocaleString()} lx`}
            />
          </div>

          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="w-full"
            role="img"
            aria-label={t("widgets.solar.title")}
          >
            <defs>
              <linearGradient id="solArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--daylight)" stopOpacity="0.4" />
                <stop offset="55%" stopColor="var(--brand)" stopOpacity="0.14" />
                <stop offset="100%" stopColor="var(--brand)" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* daytime hour ticks */}
            {[0, 6, 12, 18, 24].map((hh) => (
              <g key={hh}>
                <line
                  x1={xForMinutes(hh * 60)}
                  y1={TOP}
                  x2={xForMinutes(hh * 60)}
                  y2={BASE}
                  stroke="var(--border)"
                  strokeOpacity="0.5"
                  strokeDasharray="2 4"
                />
                <text
                  x={xForMinutes(hh * 60)}
                  y={H - 4}
                  textAnchor="middle"
                  className="fill-muted-foreground"
                  fontSize="9"
                >
                  {hh}h
                </text>
              </g>
            ))}

            {/* horizon */}
            <line
              x1={PAD_L}
              y1={BASE}
              x2={W - PAD_R}
              y2={BASE}
              stroke="var(--muted-foreground)"
              strokeWidth="1"
            />
            <path d={area} fill="url(#solArea)" />
            <path d={path} fill="none" stroke="var(--brand)" strokeWidth="1.6" />

            {/* sun marker */}
            <line
              x1={sun.x}
              y1={BASE}
              x2={sun.x}
              y2={sun.y}
              stroke="var(--foreground)"
              strokeOpacity="0.25"
              strokeDasharray="2 3"
            />
            <circle
              cx={sun.x}
              cy={sun.y}
              r={sun.e < 0 ? 3 : 5}
              fill={sun.e < 0 ? "var(--muted-foreground)" : sunColor}
              stroke="var(--background)"
              strokeWidth="1.5"
            />
          </svg>
        </div>

        <div className="space-y-4">
          <SliderRow
            label={t("widgets.solar.time")}
            value={minutesToHHMM(minutes)}
            min={0}
            max={1425}
            step={15}
            current={minutes}
            onChange={setMinutes}
          />
          <SliderRow
            label={t("widgets.solar.day")}
            value={dateLabel}
            min={0}
            max={364}
            step={1}
            current={dayIndex}
            onChange={setDayIndex}
          />
          <SliderRow
            label={t("widgets.solar.latitude")}
            value={`${latitude.toFixed(0)}°`}
            min={-66}
            max={66}
            step={1}
            current={latitude}
            onChange={setLatitude}
          />
          <p className="rounded-lg bg-muted/40 px-3 py-2 text-xs leading-relaxed text-muted-foreground">
            {t("widgets.solar.note", { peak: peak.toFixed(0) })}
          </p>
        </div>
      </div>
    </Card>
  );
}

function Reading({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div>
      <div className="text-[0.65rem] uppercase tracking-wide text-muted-foreground">
        {label}
      </div>
      <div
        className={`font-heading text-xl font-semibold tabular-nums ${accent ? "text-[var(--brand)]" : ""}`}
      >
        {value}
      </div>
    </div>
  );
}

function SliderRow({
  label,
  value,
  min,
  max,
  step,
  current,
  onChange,
}: {
  label: string;
  value: string;
  min: number;
  max: number;
  step: number;
  current: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-baseline justify-between">
        <span className="text-xs font-medium text-muted-foreground">{label}</span>
        <span className="font-mono text-sm tabular-nums">{value}</span>
      </div>
      <Slider
        value={[current]}
        min={min}
        max={max}
        step={step}
        onValueChange={(v) => onChange(firstSliderValue(v))}
      />
    </div>
  );
}
