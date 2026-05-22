"use client";

import {
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { daylightScale } from "@/lib/colormap";

export interface SectionDatum {
  distance: number;
  df: number;
  dao: number;
  daoCon: number;
}

export function SectionProfile({
  data,
  height = 300,
}: {
  data: SectionDatum[];
  height?: number;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <ComposedChart data={data} margin={{ top: 8, right: 16, bottom: 16, left: -16 }}>
        <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="distance"
          type="number"
          domain={["dataMin", "dataMax"]}
          tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
          tickLine={false}
          axisLine={{ stroke: "var(--border)" }}
          tickFormatter={(v) => `${v}`}
          label={{
            value: "Distance from façade (m)",
            position: "insideBottom",
            offset: -6,
            fontSize: 11,
            fill: "var(--muted-foreground)",
          }}
        />
        <YAxis
          domain={[0, 100]}
          tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
          tickLine={false}
          axisLine={false}
          width={44}
        />
        <Tooltip content={<SectionTooltip />} />
        <Line
          type="monotone"
          dataKey="daoCon"
          name="DAo.con"
          stroke="var(--chart-4)"
          strokeWidth={2}
          dot={{ r: 3, fill: "var(--chart-4)" }}
          isAnimationActive={false}
        />
        <Line
          type="monotone"
          dataKey="dao"
          name="DAo"
          stroke="var(--chart-1)"
          strokeWidth={2.5}
          dot={{ r: 3.5, fill: "var(--chart-1)" }}
          isAnimationActive={false}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}

/** A horizontal section strip colored by DAo with depth from the window. */
export function SectionStrip({ data }: { data: SectionDatum[] }) {
  if (!data.length) return null;
  return (
    <div>
      <div className="flex h-12 w-full overflow-hidden rounded-lg border border-border/70">
        {data.map((d, i) => (
          <div
            key={i}
            className="flex-1"
            style={{ background: daylightScale(d.dao / 100) }}
            title={`${d.distance} m · DAo ${d.dao.toFixed(1)}%`}
          />
        ))}
      </div>
      <div className="mt-1 flex justify-between text-[0.65rem] text-muted-foreground">
        <span>Window ({data[0].distance} m)</span>
        <span>Deep ({data[data.length - 1].distance} m)</span>
      </div>
    </div>
  );
}

interface TooltipPayload {
  payload: SectionDatum;
}

function SectionTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: TooltipPayload[];
}) {
  if (!active || !payload?.length) return null;
  const p = payload[0].payload;
  return (
    <div className="rounded-lg border border-border bg-popover/95 px-3 py-2 text-xs shadow-lg backdrop-blur">
      <p className="font-mono text-muted-foreground">
        {p.distance} m · DF {p.df.toFixed(2)}%
      </p>
      <p className="mt-1 flex items-center gap-2">
        <span className="size-2 rounded-full bg-[var(--chart-1)]" />
        DAo <span className="ml-auto font-mono font-medium">{p.dao.toFixed(1)}%</span>
      </p>
      <p className="mt-0.5 flex items-center gap-2">
        <span className="size-2 rounded-full bg-[var(--chart-4)]" />
        DAo.con
        <span className="ml-auto font-mono font-medium">{p.daoCon.toFixed(1)}%</span>
      </p>
    </div>
  );
}
