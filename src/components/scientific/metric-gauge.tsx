"use client";

import { motion } from "framer-motion";
import { daylightScale } from "@/lib/colormap";
import { cn } from "@/lib/utils";
import { AnimatedNumber } from "./animated-number";

/**
 * Radial arc gauge for a 0–100% daylight metric. The arc sweeps 270° and is
 * tinted with the daylight color scale at the current value.
 */
export function MetricGauge({
  value,
  label,
  sublabel,
  size = 180,
  className,
}: {
  value: number;
  label: string;
  sublabel?: string;
  size?: number;
  className?: string;
}) {
  const clamped = Math.max(0, Math.min(100, value));
  const stroke = 12;
  const r = (size - stroke) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const sweep = 270;
  const circumference = Number((2 * Math.PI * r).toFixed(3));
  const arcLength = Number(((sweep / 360) * circumference).toFixed(3));
  const dash = Number(((clamped / 100) * arcLength).toFixed(3));
  const color = daylightScale(clamped / 100);

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-[225deg]">
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="var(--muted)"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${arcLength} ${circumference}`}
          />
          <motion.circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            initial={{ strokeDasharray: `0 ${circumference}` }}
            animate={{ strokeDasharray: `${dash} ${circumference}` }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ filter: `drop-shadow(0 0 8px ${color})` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <AnimatedNumber
            value={clamped}
            digits={1}
            suffix="%"
            className="font-heading text-3xl font-semibold tabular-nums"
          />
          {sublabel && (
            <span className="mt-0.5 text-[0.7rem] uppercase tracking-wider text-muted-foreground">
              {sublabel}
            </span>
          )}
        </div>
      </div>
      <span className="mt-2 text-sm font-medium text-muted-foreground">
        {label}
      </span>
    </div>
  );
}
