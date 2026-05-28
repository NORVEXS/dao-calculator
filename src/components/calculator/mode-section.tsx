"use client";

import { useMemo } from "react";
import { Download, MoveVertical, Plus, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SectionProfile, SectionStrip, type SectionDatum } from "@/charts/section-profile";
import { useCalculatorStore } from "@/store/calculator-store";
import { useDaoCompute } from "@/hooks/use-dao";
import { downloadCSV } from "@/lib/export";
import { useT } from "@/i18n/provider";

export function ModeSection() {
  const t = useT();
  const section = useCalculatorStore((s) => s.section);
  const setPoint = useCalculatorStore((s) => s.setSectionPoint);
  const addPoint = useCalculatorStore((s) => s.addSectionPoint);
  const removePoint = useCalculatorStore((s) => s.removeSectionPoint);
  const { compute } = useDaoCompute();

  const data: SectionDatum[] = useMemo(
    () =>
      section.map((p) => {
        const r = compute(p.df);
        return { distance: p.distance, df: p.df, dao: r.dao, daoCon: r.daoCon };
      }),
    [section, compute],
  );

  function exportCsv() {
    downloadCSV("dao-vertical-section.csv", [
      ["Distance (m)", "DF (%)", "DAo (%)", "DAo.con (%)"],
      ...data.map((d) => [
        d.distance,
        d.df.toFixed(2),
        d.dao.toFixed(3),
        d.daoCon.toFixed(3),
      ]),
    ]);
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[380px_1fr]">
      <Card className="flex flex-col p-6">
        <div className="flex items-center gap-2">
          <MoveVertical className="size-4 text-[var(--daylight)]" />
          <h3 className="font-heading text-base font-semibold">{t("section.title")}</h3>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{t("section.subtitle")}</p>

        <div className="mt-5 grid grid-cols-[1fr_1fr_auto_auto] items-center gap-x-2 px-1 text-[0.7rem] font-medium uppercase tracking-wide text-muted-foreground">
          <span>{t("section.colDist")}</span>
          <span>{t("section.colDf")}</span>
          <span className="w-14 text-right">{t("section.colDao")}</span>
          <span className="w-6" />
        </div>

        <div className="mt-1.5 max-h-[360px] space-y-1.5 overflow-y-auto pr-1">
          {section.map((p, i) => (
            <div
              key={p.id}
              className="grid grid-cols-[1fr_1fr_auto_auto] items-center gap-x-2"
            >
              <Input
                type="number"
                step={0.1}
                value={p.distance}
                onChange={(e) =>
                  setPoint(p.id, { distance: Number(e.target.value) || 0 })
                }
                className="h-8 font-mono text-sm tabular-nums"
              />
              <Input
                type="number"
                step={0.05}
                value={p.df}
                onChange={(e) =>
                  setPoint(p.id, { df: Math.max(0, Number(e.target.value) || 0) })
                }
                className="h-8 font-mono text-sm tabular-nums"
              />
              <span className="w-14 text-right font-mono text-sm tabular-nums">
                {data[i] ? `${data[i].dao.toFixed(0)}%` : "·"}
              </span>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => removePoint(p.id)}
                disabled={section.length <= 1}
                aria-label="Remove point"
                className="text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="size-3.5" />
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-4 flex gap-2">
          <Button variant="outline" size="sm" className="flex-1 gap-1.5" onClick={addPoint}>
            <Plus className="size-4" />
            {t("section.addPoint")}
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5" onClick={exportCsv}>
            <Download className="size-4" />
            CSV
          </Button>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="font-heading text-base font-semibold">{t("section.profileTitle")}</h3>
        <p className="text-sm text-muted-foreground">{t("section.profileSubtitle")}</p>
        {section.length >= 2 ? (
          <>
            <div className="mt-4">
              <SectionProfile data={data} height={300} />
            </div>
            <div className="mt-6">
              <p className="mb-2 text-xs font-medium text-muted-foreground">
                {t("section.byDepth")}
              </p>
              <SectionStrip data={data} />
            </div>
          </>
        ) : (
          <EmptyHint />
        )}
      </Card>
    </div>
  );
}

function EmptyHint() {
  const t = useT();
  return (
    <div className="mt-6 flex h-64 flex-col items-center justify-center rounded-xl border border-dashed border-border text-center">
      <MoveVertical className="size-8 text-muted-foreground/50" />
      <p className="mt-3 text-sm font-medium">{t("section.emptyTitle")}</p>
      <p className="mt-1 max-w-xs text-xs text-muted-foreground">
        {t("section.emptyBody")}
      </p>
    </div>
  );
}
