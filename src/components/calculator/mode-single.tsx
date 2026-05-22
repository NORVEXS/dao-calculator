"use client";

import { useMemo } from "react";
import { Download, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MetricGauge } from "@/components/scientific/metric-gauge";
import { ResponseCurve } from "@/charts/response-curve";
import { useCalculatorStore } from "@/store/calculator-store";
import { useDaoCompute, useResponseCurve } from "@/hooks/use-dao";
import { classifyDao } from "@/lib/colormap";
import { downloadCSV } from "@/lib/export";
import { firstSliderValue } from "@/lib/format";
import { InfoLabel } from "./fields";

export function ModeSingle() {
  const df = useCalculatorStore((s) => s.singleDf);
  const setDf = useCalculatorStore((s) => s.setSingleDf);
  const { compute, threshold } = useDaoCompute();
  const curve = useResponseCurve();

  const result = useMemo(() => compute(df), [compute, df]);
  const band = classifyDao(result.dao);

  function exportCsv() {
    downloadCSV("dao-single-point.csv", [
      ["Daylight Factor (%)", "DAo (%)", "DAo.con (%)", "Threshold (lx)"],
      [df.toFixed(2), result.dao.toFixed(3), result.daoCon.toFixed(3), threshold],
    ]);
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[360px_1fr]">
      <Card className="p-6">
        <div className="flex items-center gap-2">
          <Sparkles className="size-4 text-[var(--daylight)]" />
          <h3 className="font-heading text-base font-semibold">Single point</h3>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          Convert one Daylight Factor reading into DAo and DAo.con.
        </p>

        <div className="mt-6 space-y-2">
          <div className="flex items-end justify-between">
            <InfoLabel hint="The point's Daylight Factor: interior/exterior horizontal illuminance under an overcast sky, as a percentage.">
              Daylight Factor
            </InfoLabel>
            <div className="relative">
              <Input
                type="number"
                value={df}
                min={0}
                max={20}
                step={0.05}
                onChange={(e) => setDf(Math.max(0, Number(e.target.value) || 0))}
                className="h-9 w-24 pr-7 text-right font-mono text-base tabular-nums"
              />
              <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                %
              </span>
            </div>
          </div>
          <Slider
            value={[df]}
            min={0}
            max={10}
            step={0.05}
            onValueChange={(v) => setDf(firstSliderValue(v))}
          />
        </div>

        <div className="mt-6 grid grid-cols-2 gap-2">
          <MetricGauge value={result.dao} label="DAo" sublabel="autonomy" size={150} />
          <MetricGauge
            value={result.daoCon}
            label="DAo.con"
            sublabel="continuous"
            size={150}
          />
        </div>

        <div className="mt-4 rounded-lg border border-border/70 bg-muted/30 p-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Performance</span>
            <Badge variant="secondary">{band.label}</Badge>
          </div>
          <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
            {band.description}
          </p>
        </div>

        <Button variant="outline" className="mt-4 w-full gap-2" onClick={exportCsv}>
          <Download className="size-4" />
          Export CSV
        </Button>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-heading text-base font-semibold">Response curve</h3>
            <p className="text-sm text-muted-foreground">
              How DAo and DAo.con grow with the Daylight Factor.
            </p>
          </div>
          <div className="flex gap-4 text-xs">
            <Legend color="var(--chart-1)" label="DAo" />
            <Legend color="var(--chart-4)" label="DAo.con" />
          </div>
        </div>
        <div className="mt-4">
          <ResponseCurve
            data={curve}
            markerDf={df}
            daoAtMarker={result.dao}
            daoConAtMarker={result.daoCon}
            height={360}
          />
        </div>
      </Card>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5 text-muted-foreground">
      <span className="size-2.5 rounded-full" style={{ background: color }} />
      {label}
    </span>
  );
}
