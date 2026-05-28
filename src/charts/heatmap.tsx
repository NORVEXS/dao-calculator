"use client";

import { useState } from "react";
import { daylightScale, daylightGradient, prefersLightText } from "@/lib/colormap";
import { useT } from "@/i18n/provider";

export interface HeatmapProps {
  /** Row-major values. */
  values: number[][];
  /** Maximum for normalization (default 100 for percentages). */
  max?: number;
  /** Grid spacing in metres, for axis labels. */
  spacing?: number;
  /** Unit suffix shown in cells/legend. */
  unit?: string;
  /** Show the numeric value inside each cell. */
  showValues?: boolean;
}

export function Heatmap({
  values,
  max = 100,
  spacing = 0.5,
  unit = "%",
  showValues = true,
}: HeatmapProps) {
  const t = useT();
  const [hover, setHover] = useState<{ r: number; c: number } | null>(null);
  const rows = values.length;
  const cols = values[0]?.length ?? 0;
  if (!rows || !cols) return null;

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        {/* Depth (Y) axis: window at the front (top), room back at the bottom. */}
        <div className="flex flex-col items-end justify-between py-[1px] text-[0.6rem] uppercase tracking-wide text-muted-foreground">
          <span>{t("heatmap.window")}</span>
          <span className="[writing-mode:vertical-rl] rotate-180 tracking-[0.15em]">
            {t("heatmap.depth")}
          </span>
          <span>{t("heatmap.back")}</span>
        </div>

        <div className="flex-1">
          <div
            className="grid gap-[3px]"
            style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
          >
            {values.flatMap((row, r) =>
              row.map((v, c) => {
                const norm = Math.max(0, Math.min(1, v / max));
                const bg = daylightScale(norm);
                const light = prefersLightText(norm);
                const isHover = hover?.r === r && hover?.c === c;
                return (
                  <div
                    key={`${r}-${c}`}
                    onMouseEnter={() => setHover({ r, c })}
                    onMouseLeave={() => setHover(null)}
                    className="relative flex aspect-square items-center justify-center rounded-[3px] text-[0.6rem] font-medium tabular-nums transition-transform"
                    style={{
                      background: bg,
                      color: light ? "rgba(255,255,255,0.92)" : "rgba(8,12,24,0.88)",
                      outline: isHover ? "2px solid var(--foreground)" : "none",
                      transform: isHover ? "scale(1.08)" : "none",
                      zIndex: isHover ? 5 : 1,
                    }}
                  >
                    {showValues && cols <= 16 ? Math.round(v) : ""}
                  </div>
                );
              }),
            )}
          </div>
          {/* Width (X) axis */}
          <div className="mt-1 text-center text-[0.6rem] uppercase tracking-[0.15em] text-muted-foreground">
            {t("heatmap.width")}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-3">
        <span className="text-[0.65rem] text-muted-foreground">0{unit}</span>
        <div
          className="h-2.5 flex-1 rounded-full"
          style={{ background: daylightGradient("90deg") }}
        />
        <span className="text-[0.65rem] text-muted-foreground">
          {max}
          {unit}
        </span>
      </div>

      {hover && (
        <p className="text-center text-xs text-muted-foreground">
          {t("heatmap.cell")} [{hover.r + 1}, {hover.c + 1}] ·{" "}
          {(hover.c * spacing).toFixed(1)}×{(hover.r * spacing).toFixed(1)} m ·{" "}
          <span className="font-mono font-medium text-foreground">
            {values[hover.r][hover.c].toFixed(1)}
            {unit}
          </span>
        </p>
      )}
    </div>
  );
}
