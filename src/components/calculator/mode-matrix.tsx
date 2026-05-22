"use client";

import { useMemo, useState } from "react";
import { Download, Grid3x3, Sparkles, Wand2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Heatmap } from "@/charts/heatmap";
import { useCalculatorStore } from "@/store/calculator-store";
import { useDaoCompute } from "@/hooks/use-dao";
import { daylightScale, prefersLightText } from "@/lib/colormap";
import { downloadCSV, downloadJSON } from "@/lib/export";
import { useT } from "@/i18n/provider";
import { FieldRow } from "./fields";

type Metric = "dao" | "daoCon" | "df";

export function ModeMatrix() {
  const t = useT();
  const {
    matrix,
    matrixRows,
    matrixCols,
    matrixSpacing,
    setMatrixSize,
    setMatrixCell,
    setMatrixSpacing,
    fillMatrixGradient,
  } = useCalculatorStore();
  const { compute } = useDaoCompute();
  const [metric, setMetric] = useState<Metric>("dao");

  const { daoGrid, daoConGrid, dfGrid, stats } = useMemo(() => {
    const dao: number[][] = [];
    const con: number[][] = [];
    const df: number[][] = [];
    let sum = 0;
    let min = Infinity;
    let max = -Infinity;
    let aboveHalf = 0;
    let n = 0;
    for (let r = 0; r < matrixRows; r++) {
      const daoRow: number[] = [];
      const conRow: number[] = [];
      const dfRow: number[] = [];
      for (let c = 0; c < matrixCols; c++) {
        const value = matrix[r * matrixCols + c] ?? 0;
        const res = compute(value);
        daoRow.push(res.dao);
        conRow.push(res.daoCon);
        dfRow.push(value);
        sum += res.dao;
        min = Math.min(min, res.dao);
        max = Math.max(max, res.dao);
        if (res.dao >= 50) aboveHalf++;
        n++;
      }
      dao.push(daoRow);
      con.push(conRow);
      df.push(dfRow);
    }
    return {
      daoGrid: dao,
      daoConGrid: con,
      dfGrid: df,
      stats: {
        mean: n ? sum / n : 0,
        min: n ? min : 0,
        max: n ? max : 0,
        coverage: n ? (aboveHalf / n) * 100 : 0,
      },
    };
  }, [matrix, matrixRows, matrixCols, compute]);

  const displayGrid = metric === "dao" ? daoGrid : metric === "daoCon" ? daoConGrid : dfGrid;
  const displayMax = metric === "df" ? Math.max(8, ...dfGrid.flat()) : 100;
  const displayUnit = metric === "df" ? "%" : "%";

  function exportCsv() {
    const rows: (string | number)[][] = [];
    rows.push([`DAo matrix (${matrixRows}×${matrixCols}), spacing ${matrixSpacing} m`]);
    rows.push(["row\\col", ...Array.from({ length: matrixCols }, (_, c) => c + 1)]);
    daoGrid.forEach((row, r) => rows.push([r + 1, ...row.map((v) => v.toFixed(2))]));
    rows.push([]);
    rows.push(["DF input grid"]);
    dfGrid.forEach((row, r) => rows.push([r + 1, ...row.map((v) => v.toFixed(2))]));
    downloadCSV("dao-matrix.csv", rows);
  }

  function exportJson() {
    downloadJSON("dao-matrix.json", {
      rows: matrixRows,
      cols: matrixCols,
      spacing: matrixSpacing,
      df: dfGrid,
      dao: daoGrid,
      daoCon: daoConGrid,
      stats,
    });
  }

  return (
    <div className="grid gap-5 xl:grid-cols-[1fr_1fr]">
      <Card className="flex flex-col p-6">
        <div className="flex items-center gap-2">
          <Grid3x3 className="size-4 text-[var(--daylight)]" />
          <h3 className="font-heading text-base font-semibold">{t("matrix.title")}</h3>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{t("matrix.subtitle")}</p>

        <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5">
          <FieldRow label={t("matrix.rows")} hint={t("matrix.rowsHint")}>
            <Input
              type="number"
              min={1}
              max={40}
              value={matrixRows}
              onChange={(e) => setMatrixSize(Number(e.target.value) || 1, matrixCols)}
              className="h-8 w-16 text-right font-mono tabular-nums"
            />
          </FieldRow>
          <FieldRow label={t("matrix.cols")} hint={t("matrix.colsHint")}>
            <Input
              type="number"
              min={1}
              max={40}
              value={matrixCols}
              onChange={(e) => setMatrixSize(matrixRows, Number(e.target.value) || 1)}
              className="h-8 w-16 text-right font-mono tabular-nums"
            />
          </FieldRow>
          <FieldRow label={t("matrix.spacing")} hint={t("matrix.spacingHint")}>
            <div className="relative">
              <Input
                type="number"
                step={0.1}
                min={0.1}
                value={matrixSpacing}
                onChange={(e) => setMatrixSpacing(Number(e.target.value) || 0.5)}
                className="h-8 w-20 pr-6 text-right font-mono tabular-nums"
              />
              <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                m
              </span>
            </div>
          </FieldRow>
          <div className="flex items-end justify-end">
            <Button variant="outline" size="sm" className="gap-1.5" onClick={fillMatrixGradient}>
              <Wand2 className="size-3.5" />
              {t("matrix.sampleFill")}
            </Button>
          </div>
        </div>

        <div className="mt-4 overflow-auto rounded-lg border border-border/60 p-2">
          <div
            className="grid gap-1"
            style={{ gridTemplateColumns: `repeat(${matrixCols}, minmax(2.6rem, 1fr))` }}
          >
            {Array.from({ length: matrixRows }).map((_, r) =>
              Array.from({ length: matrixCols }).map((_, c) => {
                const idx = r * matrixCols + c;
                const dao = daoGrid[r]?.[c] ?? 0;
                const norm = dao / 100;
                const light = prefersLightText(norm);
                return (
                  <input
                    key={idx}
                    type="number"
                    step={0.05}
                    value={matrix[idx] ?? 0}
                    onChange={(e) =>
                      setMatrixCell(idx, Math.max(0, Number(e.target.value) || 0))
                    }
                    className="h-8 w-full rounded-[4px] border-0 text-center text-[0.7rem] font-medium tabular-nums outline-none focus:ring-2 focus:ring-ring"
                    style={{
                      background: daylightScale(norm),
                      color: light ? "rgba(255,255,255,0.95)" : "rgba(8,12,24,0.9)",
                    }}
                    title={`DF ${(matrix[idx] ?? 0).toFixed(2)}% → DAo ${dao.toFixed(1)}%`}
                  />
                );
              }),
            )}
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <Button variant="outline" size="sm" className="flex-1 gap-1.5" onClick={exportCsv}>
            <Download className="size-4" />
            CSV
          </Button>
          <Button variant="outline" size="sm" className="flex-1 gap-1.5" onClick={exportJson}>
            <Download className="size-4" />
            JSON
          </Button>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-heading text-base font-semibold">{t("matrix.heatmap")}</h3>
          <Select value={metric} onValueChange={(v) => setMetric(v as Metric)}>
            <SelectTrigger size="sm" className="w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dao">{t("matrix.metricDao")}</SelectItem>
              <SelectItem value="daoCon">{t("matrix.metricCon")}</SelectItem>
              <SelectItem value="df">{t("matrix.metricDf")}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mt-4 grid grid-cols-4 gap-2">
          <Stat label={t("matrix.meanDao")} value={stats.mean} />
          <Stat label={t("matrix.min")} value={stats.min} />
          <Stat label={t("matrix.max")} value={stats.max} />
          <Stat label={t("matrix.coverage")} value={stats.coverage} accent />
        </div>

        <div className="mt-5">
          <Heatmap
            values={displayGrid}
            max={displayMax}
            spacing={matrixSpacing}
            unit={displayUnit}
          />
        </div>

        <p className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Sparkles className="size-3.5 text-[var(--daylight)]" />
          {metric === "df" ? t("matrix.noteDf") : t("matrix.noteOther")}
        </p>
      </Card>
    </div>
  );
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent?: boolean;
}) {
  return (
    <div className="rounded-lg border border-border/60 bg-muted/30 p-2.5">
      <p className="text-[0.65rem] uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p
        className={`font-heading text-lg font-semibold tabular-nums ${accent ? "text-[var(--brand)]" : ""}`}
      >
        {value.toFixed(1)}%
      </p>
    </div>
  );
}
