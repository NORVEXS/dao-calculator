"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import {
  buildExteriorProfile,
  computeDao,
  DEFAULT_PARAMETERS,
} from "@/lib/scientific/dao";
import { daylightScale } from "@/lib/colormap";
import { firstSliderValue } from "@/lib/format";
import { useT } from "@/i18n/provider";

interface ScenarioState {
  df: number;
  latitude: number;
  threshold: number;
}

function useScenario(s: ScenarioState) {
  return useMemo(() => {
    const profile = buildExteriorProfile({
      ...DEFAULT_PARAMETERS,
      latitude: s.latitude,
      thresholdLux: s.threshold,
    });
    return computeDao(profile, s.df, s.threshold);
  }, [s.df, s.latitude, s.threshold]);
}

export function ScenarioCompareWidget() {
  const t = useT();
  const [a, setA] = useState<ScenarioState>({ df: 4, latitude: 40, threshold: 300 });
  const [b, setB] = useState<ScenarioState>({ df: 2.5, latitude: 52, threshold: 500 });

  const ra = useScenario(a);
  const rb = useScenario(b);
  const delta = ra.dao - rb.dao;

  return (
    <Card className="p-6">
      <div className="mb-5">
        <h3 className="font-heading text-lg font-semibold">
          {t("widgets.compare.title")}
        </h3>
        <p className="mt-1 max-w-md text-sm text-muted-foreground">
          {t("widgets.compare.subtitle")}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <ScenarioColumn
          tag="A"
          state={a}
          onChange={setA}
          dao={ra.dao}
          daoCon={ra.daoCon}
          t={t}
        />
        <ScenarioColumn
          tag="B"
          state={b}
          onChange={setB}
          dao={rb.dao}
          daoCon={rb.daoCon}
          t={t}
        />
      </div>

      <div className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-muted/40 px-4 py-2.5 text-sm">
        <span className="text-muted-foreground">{t("widgets.compare.delta")}</span>
        <span
          className="font-heading text-lg font-semibold tabular-nums"
          style={{ color: daylightScale(Math.min(1, Math.abs(delta) / 50)) }}
        >
          {delta >= 0 ? "A +" : "B +"}
          {Math.abs(delta).toFixed(1)} pts
        </span>
        <span className="text-muted-foreground">{t("widgets.compare.deltaTail")}</span>
      </div>
    </Card>
  );
}

function ScenarioColumn({
  tag,
  state,
  onChange,
  dao,
  daoCon,
  t,
}: {
  tag: string;
  state: ScenarioState;
  onChange: (s: ScenarioState) => void;
  dao: number;
  daoCon: number;
  t: (k: string, v?: Record<string, string | number>) => string;
}) {
  return (
    <div className="rounded-xl border border-border/70 bg-background/50 p-4">
      <div className="flex items-center gap-2">
        <span className="flex size-6 items-center justify-center rounded-md bg-secondary text-xs font-bold text-[var(--brand)]">
          {tag}
        </span>
        <span className="text-sm font-medium text-muted-foreground">
          {t("widgets.compare.scenario")} {tag}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <Metric label="DAo" value={dao} accent />
        <Metric label="DAo.con" value={daoCon} />
      </div>

      <div className="mt-4 space-y-3">
        <Row
          label={t("hero.daylightFactor")}
          value={`${state.df.toFixed(1)}%`}
          min={0}
          max={8}
          step={0.1}
          current={state.df}
          onChange={(df) => onChange({ ...state, df })}
        />
        <Row
          label={t("widgets.solar.latitude")}
          value={`${state.latitude.toFixed(0)}°`}
          min={-66}
          max={66}
          step={1}
          current={state.latitude}
          onChange={(latitude) => onChange({ ...state, latitude })}
        />
        <Row
          label={t("params.threshold")}
          value={`${state.threshold} lx`}
          min={100}
          max={1000}
          step={50}
          current={state.threshold}
          onChange={(threshold) => onChange({ ...state, threshold })}
        />
      </div>
    </div>
  );
}

function Metric({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent?: boolean;
}) {
  return (
    <div className="rounded-lg bg-muted/40 p-2.5">
      <div className="text-[0.65rem] uppercase tracking-wide text-muted-foreground">
        {label}
      </div>
      <div className="mt-0.5 flex items-baseline gap-1">
        <span
          className={`font-heading text-2xl font-semibold tabular-nums ${accent ? "text-[var(--brand)]" : ""}`}
        >
          {value.toFixed(1)}
        </span>
        <span className="text-xs text-muted-foreground">%</span>
      </div>
      <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-border">
        <div
          className="h-full rounded-full"
          style={{ width: `${value}%`, background: daylightScale(value / 100) }}
        />
      </div>
    </div>
  );
}

function Row({
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
    <div className="space-y-1">
      <div className="flex items-baseline justify-between">
        <span className="text-xs text-muted-foreground">{label}</span>
        <span className="font-mono text-xs tabular-nums">{value}</span>
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
