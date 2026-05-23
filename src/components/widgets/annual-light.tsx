"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import {
  declination,
  exteriorOvercastIlluminance,
  hourAngle,
  solarElevation,
  solarTimeOffset,
} from "@/lib/scientific/solar";
import { MODEL_YEAR_DAY1_SERIAL } from "@/lib/scientific/constants";
import { daylightScale } from "@/lib/colormap";
import { firstSliderValue, minutesToHHMM } from "@/lib/format";
import { useLanguage } from "@/i18n/provider";

const LON = 6;
const TZ = 1;
const DST = true;
const DAY_STEP = 5; // sample every 5 days → 73 columns
const HOUR_START = 4 * 60;
const HOUR_END = 20 * 60;
const HOUR_STEP = 30; // 33 rows

const MONTHS_ES = ["E", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

export function AnnualLightWidget() {
  const { t, lang } = useLanguage();
  const [latitude, setLatitude] = useState(37);
  const [hover, setHover] = useState<{ d: number; m: number; v: number } | null>(null);

  const { rows, cols, grid, maxE } = useMemo(() => {
    const days: number[] = [];
    for (let d = 0; d < 365; d += DAY_STEP) days.push(d);
    const mins: number[] = [];
    for (let m = HOUR_START; m <= HOUR_END; m += HOUR_STEP) mins.push(m);

    let max = 0;
    const g: number[][] = mins.map((min) =>
      days.map((dayIdx) => {
        const serial = MODEL_YEAR_DAY1_SERIAL + dayIdx;
        const offset = solarTimeOffset(serial, LON, TZ, DST);
        const elev = solarElevation(
          declination(serial),
          latitude,
          hourAngle(min / 1440, offset),
        );
        const e = exteriorOvercastIlluminance(elev);
        if (e > max) max = e;
        return e;
      }),
    );
    return { rows: mins, cols: days, grid: g, maxE: max || 1 };
  }, [latitude]);

  return (
    <Card className="p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="font-heading text-lg font-semibold">
            {t("widgets.annual.title")}
          </h3>
          <p className="mt-1 max-w-md text-sm text-muted-foreground">
            {t("widgets.annual.subtitle")}
          </p>
        </div>
        <div className="w-full max-w-[220px] space-y-1.5">
          <div className="flex items-baseline justify-between">
            <span className="text-xs font-medium text-muted-foreground">
              {t("widgets.solar.latitude")}
            </span>
            <span className="font-mono text-sm tabular-nums">{latitude.toFixed(0)}°</span>
          </div>
          <Slider
            value={[latitude]}
            min={-66}
            max={66}
            step={1}
            onValueChange={(v) => setLatitude(firstSliderValue(v))}
          />
        </div>
      </div>

      <div className="mt-5 flex gap-2">
        {/* hour axis */}
        <div className="flex flex-col justify-between py-[1px] text-[0.6rem] text-muted-foreground">
          {rows.map((m, i) =>
            i % 4 === 0 ? <span key={m}>{minutesToHHMM(m)}</span> : null,
          )}
        </div>

        <div className="flex-1">
          <div
            className="grid gap-[1px]"
            style={{ gridTemplateColumns: `repeat(${cols.length}, minmax(0, 1fr))` }}
          >
            {grid.map((row, ri) =>
              row.map((v, ci) => {
                const norm = v / maxE;
                return (
                  <div
                    key={`${ri}-${ci}`}
                    onMouseEnter={() => setHover({ d: cols[ci], m: rows[ri], v })}
                    onMouseLeave={() => setHover(null)}
                    className="aspect-square rounded-[1px]"
                    style={{ background: daylightScale(norm) }}
                  />
                );
              }),
            )}
          </div>
          {/* month axis */}
          <div className="mt-1 flex justify-between px-[1px] text-[0.6rem] text-muted-foreground">
            {MONTHS_ES.map((m, i) => (
              <span key={i}>{m}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-[0.65rem] text-muted-foreground">
          <span>0</span>
          <div
            className="h-2 w-24 rounded-full"
            style={{
              background: `linear-gradient(90deg, ${daylightScale(0)}, ${daylightScale(0.5)}, ${daylightScale(1)})`,
            }}
          />
          <span>{Math.round(maxE).toLocaleString()} lx</span>
        </div>
        <p className="text-xs text-muted-foreground">
          {hover
            ? t("widgets.annual.hover", {
                date: new Date(2007, 0, 1 + hover.d).toLocaleDateString(
                  lang === "es" ? "es-ES" : "en-US",
                  { day: "numeric", month: "short" },
                ),
                time: minutesToHHMM(hover.m),
                value: Math.round(hover.v).toLocaleString(),
              })
            : t("widgets.annual.hint")}
        </p>
      </div>
    </Card>
  );
}
