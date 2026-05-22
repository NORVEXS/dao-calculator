"use client";

import { RotateCcw, Clock, Globe2, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { FieldRow, InfoLabel } from "./fields";
import { useCalculatorStore } from "@/store/calculator-store";
import { minutesToHHMM, hhmmToMinutes, firstSliderValue } from "@/lib/format";

export function ParametersPanel() {
  const params = useCalculatorStore((s) => s.params);
  const setParams = useCalculatorStore((s) => s.setParams);
  const resetParams = useCalculatorStore((s) => s.resetParams);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Parameters
        </h2>
        <Button
          variant="ghost"
          size="xs"
          onClick={resetParams}
          className="gap-1.5 text-muted-foreground"
        >
          <RotateCcw className="size-3" />
          Reset
        </Button>
      </div>

      {/* Location */}
      <Group icon={Globe2} title="Location">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <InfoLabel hint="Site latitude in degrees. Drives the annual solar-elevation profile that feeds the overcast-sky illuminance.">
              Latitude
            </InfoLabel>
            <span className="font-mono text-sm tabular-nums">
              {params.latitude.toFixed(1)}°
            </span>
          </div>
          <Slider
            value={[params.latitude]}
            min={-66}
            max={66}
            step={0.5}
            onValueChange={(v) => setParams({ latitude: firstSliderValue(v) })}
          />
        </div>

        <FieldRow
          label="Longitude"
          hint="Degrees east of Greenwich. Affects only the small solar-time correction."
        >
          <NumberInput
            value={params.longitude}
            step={0.5}
            onChange={(v) => setParams({ longitude: v })}
            suffix="°"
          />
        </FieldRow>

        <FieldRow
          label="Time zone"
          hint="Standard UTC offset in hours (e.g. +1 for Central European Time)."
        >
          <NumberInput
            value={params.timeZone}
            step={1}
            min={-12}
            max={14}
            onChange={(v) => setParams({ timeZone: v })}
          />
        </FieldRow>

        <FieldRow
          label="Daylight saving"
          hint="Apply the European summer-time shift when converting clock time to solar time."
        >
          <Switch
            checked={params.dstEnabled}
            onCheckedChange={(c) => setParams({ dstEnabled: c })}
          />
        </FieldRow>
      </Group>

      <Separator />

      {/* Schedule */}
      <Group icon={Clock} title="Occupancy schedule">
        <FieldRow label="Check-in" hint="Start of the occupied period (local clock time).">
          <TimeInput
            value={params.checkInMinutes}
            onChange={(v) => setParams({ checkInMinutes: v })}
          />
        </FieldRow>
        <FieldRow label="Check-out" hint="End of the occupied period (exclusive).">
          <TimeInput
            value={params.checkOutMinutes}
            onChange={(v) => setParams({ checkOutMinutes: v })}
          />
        </FieldRow>
        <FieldRow
          label="Exclude weekends"
          hint="Count only the 260 model weekdays, matching the reference workbook."
        >
          <Switch
            checked={params.weekendOut}
            onCheckedChange={(c) => setParams({ weekendOut: c })}
          />
        </FieldRow>
        <FieldRow
          label="Lunch break"
          hint="Remove a daily non-occupied window (e.g. 11:00–12:00) from the metrics."
        >
          <Switch
            checked={params.breakEnabled}
            onCheckedChange={(c) => setParams({ breakEnabled: c })}
          />
        </FieldRow>
        {params.breakEnabled && (
          <div className="grid grid-cols-2 gap-3 rounded-lg bg-muted/40 p-3">
            <div className="space-y-1.5">
              <InfoLabel>Break start</InfoLabel>
              <TimeInput
                value={params.breakInMinutes}
                onChange={(v) => setParams({ breakInMinutes: v })}
              />
            </div>
            <div className="space-y-1.5">
              <InfoLabel>Break end</InfoLabel>
              <TimeInput
                value={params.breakOutMinutes}
                onChange={(v) => setParams({ breakOutMinutes: v })}
              />
            </div>
          </div>
        )}
      </Group>

      <Separator />

      {/* Threshold */}
      <Group icon={Target} title="Illuminance target">
        <FieldRow
          label="Threshold"
          hint="Minimum illuminance considered 'enough daylight' (typically 300 lx)."
        >
          <NumberInput
            value={params.thresholdLux}
            step={50}
            min={50}
            max={2000}
            onChange={(v) => setParams({ thresholdLux: v })}
            suffix="lx"
            width="w-24"
          />
        </FieldRow>
      </Group>
    </div>
  );
}

function Group({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-xs font-semibold text-foreground/80">
        <Icon className="size-3.5 text-[var(--brand)]" />
        {title}
      </div>
      {children}
    </div>
  );
}

function NumberInput({
  value,
  onChange,
  step = 1,
  min,
  max,
  suffix,
  width = "w-20",
}: {
  value: number;
  onChange: (v: number) => void;
  step?: number;
  min?: number;
  max?: number;
  suffix?: string;
  width?: string;
}) {
  return (
    <div className="relative">
      <Input
        type="number"
        value={Number.isFinite(value) ? value : ""}
        step={step}
        min={min}
        max={max}
        onChange={(e) => {
          const v = Number(e.target.value);
          if (!Number.isNaN(v)) onChange(v);
        }}
        className={`${width} ${suffix ? "pr-7" : ""} h-8 text-right font-mono tabular-nums`}
      />
      {suffix && (
        <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
          {suffix}
        </span>
      )}
    </div>
  );
}

function TimeInput({
  value,
  onChange,
}: {
  value: number;
  onChange: (minutes: number) => void;
}) {
  return (
    <Input
      type="time"
      step={900}
      value={minutesToHHMM(value)}
      onChange={(e) => {
        const m = hhmmToMinutes(e.target.value);
        if (m !== null) onChange(m);
      }}
      className="h-8 w-28 font-mono tabular-nums"
    />
  );
}
