"use client";

import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ReferenceDot,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { CurvePoint } from "@/lib/scientific/dao";

export function ResponseCurve({
  data,
  markerDf,
  daoAtMarker,
  daoConAtMarker,
  height = 300,
}: {
  data: CurvePoint[];
  markerDf?: number;
  daoAtMarker?: number;
  daoConAtMarker?: number;
  height?: number;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <ComposedChart data={data} margin={{ top: 8, right: 12, bottom: 4, left: -16 }}>
        <defs>
          <linearGradient id="daoFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.35} />
            <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0.02} />
          </linearGradient>
          <linearGradient id="conFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--chart-4)" stopOpacity={0.25} />
            <stop offset="100%" stopColor="var(--chart-4)" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="df"
          type="number"
          domain={[0, "dataMax"]}
          tickFormatter={(v) => `${v}`}
          tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
          tickLine={false}
          axisLine={{ stroke: "var(--border)" }}
          label={{
            value: "Daylight Factor (%)",
            position: "insideBottom",
            offset: -2,
            fontSize: 11,
            fill: "var(--muted-foreground)",
          }}
        />
        <YAxis
          domain={[0, 100]}
          tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
          tickLine={false}
          axisLine={false}
          tickFormatter={(v) => `${v}`}
          width={44}
        />
        <Tooltip content={<CurveTooltip />} />
        <Area
          type="monotone"
          dataKey="daoCon"
          name="DAo.con"
          stroke="var(--chart-4)"
          strokeWidth={2}
          fill="url(#conFill)"
          dot={false}
          isAnimationActive={false}
        />
        <Area
          type="monotone"
          dataKey="dao"
          name="DAo"
          stroke="var(--chart-1)"
          strokeWidth={2.5}
          fill="url(#daoFill)"
          dot={false}
          isAnimationActive={false}
        />
        {typeof markerDf === "number" && (
          <ReferenceLine
            x={markerDf}
            stroke="var(--foreground)"
            strokeDasharray="4 4"
            strokeOpacity={0.4}
          />
        )}
        {typeof markerDf === "number" && typeof daoConAtMarker === "number" && (
          <ReferenceDot
            x={markerDf}
            y={daoConAtMarker}
            r={4}
            fill="var(--chart-4)"
            stroke="var(--background)"
            strokeWidth={2}
          />
        )}
        {typeof markerDf === "number" && typeof daoAtMarker === "number" && (
          <ReferenceDot
            x={markerDf}
            y={daoAtMarker}
            r={5}
            fill="var(--chart-1)"
            stroke="var(--background)"
            strokeWidth={2}
          />
        )}
        <Line dataKey="__none" stroke="none" dot={false} legendType="none" />
      </ComposedChart>
    </ResponsiveContainer>
  );
}

interface TooltipPayload {
  payload: CurvePoint;
}

function CurveTooltip({
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
      <p className="font-mono text-muted-foreground">DF = {p.df.toFixed(2)}%</p>
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
