"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import {
  buildExteriorProfile,
  computeDao,
  DEFAULT_PARAMETERS,
} from "@/lib/scientific/dao";
import { daylightScale, prefersLightText } from "@/lib/colormap";
import { firstSliderValue } from "@/lib/format";
import { useT } from "@/i18n/provider";

const POINTS = 7;

export function RoomDepthWidget() {
  const t = useT();
  const [windowDf, setWindowDf] = useState(5);
  const [depth, setDepth] = useState(6);

  const profile = useMemo(() => buildExteriorProfile(DEFAULT_PARAMETERS), []);

  const points = useMemo(() => {
    return Array.from({ length: POINTS }, (_, i) => {
      const d = ((i + 0.5) / POINTS) * depth;
      // Daylight Factor decays with depth from the window.
      const df = windowDf * Math.exp((-2.1 * d) / depth);
      const { dao, daoCon } = computeDao(profile, df, DEFAULT_PARAMETERS.thresholdLux);
      return { d, df, dao, daoCon };
    });
  }, [windowDf, depth, profile]);

  return (
    <Card className="p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="font-heading text-lg font-semibold">
            {t("widgets.depth.title")}
          </h3>
          <p className="mt-1 max-w-md text-sm text-muted-foreground">
            {t("widgets.depth.subtitle")}
          </p>
        </div>
      </div>

      {/* Room section */}
      <div className="mt-5 overflow-hidden rounded-xl border border-border/70">
        <div className="relative flex h-44">
          {/* window glow on the left */}
          <div
            className="absolute inset-y-0 left-0 w-full"
            style={{
              background:
                "linear-gradient(90deg, color-mix(in oklab, var(--daylight) 30%, transparent), transparent 65%)",
            }}
          />
          <div className="absolute inset-y-0 left-0 w-1.5 bg-[var(--daylight)]/70" />
          <div className="relative flex w-full items-center justify-around px-4">
            {points.map((p, i) => {
              const norm = p.dao / 100;
              const light = prefersLightText(norm);
              return (
                <div key={i} className="flex flex-col items-center gap-1.5">
                  <div
                    className="flex size-11 items-center justify-center rounded-full text-[0.7rem] font-semibold tabular-nums shadow-sm ring-1 ring-black/10"
                    style={{
                      background: daylightScale(norm),
                      color: light ? "rgba(255,255,255,0.95)" : "rgba(8,12,24,0.9)",
                    }}
                    title={`${p.d.toFixed(1)} m · DF ${p.df.toFixed(2)}% · DAo ${p.dao.toFixed(0)}%`}
                  >
                    {p.dao.toFixed(0)}
                  </div>
                  <span className="text-[0.6rem] text-muted-foreground">
                    {p.d.toFixed(1)} m
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex items-center justify-between border-t border-border/60 bg-muted/30 px-4 py-1.5 text-[0.65rem] uppercase tracking-wide text-muted-foreground">
          <span>{t("widgets.depth.window")}</span>
          <span>{t("widgets.depth.back")}</span>
        </div>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <SliderRow
          label={t("widgets.depth.windowDf")}
          value={`${windowDf.toFixed(1)}%`}
          min={1}
          max={10}
          step={0.1}
          current={windowDf}
          onChange={setWindowDf}
        />
        <SliderRow
          label={t("widgets.depth.roomDepth")}
          value={`${depth.toFixed(1)} m`}
          min={3}
          max={10}
          step={0.5}
          current={depth}
          onChange={setDepth}
        />
      </div>
      <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
        {t("widgets.depth.note")}
      </p>
    </Card>
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
