"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sun } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { MetricGauge } from "@/components/scientific/metric-gauge";
import { buildExteriorProfile, computeDao, DEFAULT_PARAMETERS } from "@/lib/scientific/dao";
import { classifyDao } from "@/lib/colormap";
import { firstSliderValue } from "@/lib/format";
import { renderEmphasis, useT } from "@/i18n/provider";

// The sun follows the same parabola as the dashed arc — but as a fixed-size DOM
// circle positioned in percent, so it stays perfectly round regardless of the
// container's aspect ratio (an SVG circle under preserveAspectRatio="none" gets
// squashed). x is linear in t; y = 92 − 280·t(1−t) matches the Bézier arc
// `M0,92 Q50,-48 100,92`. Constant pace + soft fade hides the loop seam.
const SUN_TRAJECTORY = (() => {
  const steps = 60;
  const left: string[] = [];
  const top: string[] = [];
  const opacity: number[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    left.push(`${(t * 100).toFixed(2)}%`);
    top.push(`${(92 - 280 * t * (1 - t)).toFixed(2)}%`);
    const fade = t < 0.12 ? t / 0.12 : t > 0.88 ? (1 - t) / 0.12 : 1;
    opacity.push(Math.round(fade * 100) / 100);
  }
  return { left, top, opacity };
})();

export function Hero() {
  const t = useT();
  const [df, setDf] = useState(3);
  const profile = useMemo(() => buildExteriorProfile(DEFAULT_PARAMETERS), []);
  const result = useMemo(
    () => computeDao(profile, df, DEFAULT_PARAMETERS.thresholdLux),
    [profile, df],
  );
  const band = classifyDao(result.dao);

  return (
    <section className="relative overflow-hidden">
      <HeroBackground />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 pb-20 pt-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:px-8 lg:pb-28 lg:pt-24">
        <div className="flex flex-col justify-center">
          <div className="flex min-h-[2.75rem] items-start sm:min-h-0">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border/70 bg-card/60 px-3 py-1 text-xs font-medium text-muted-foreground">
              <span className="size-1.5 shrink-0 rounded-full bg-[var(--daylight)]" />
              {t("hero.badge")}
            </div>
          </div>

          <h1 className="font-heading mt-5 min-h-[12rem] text-4xl font-bold leading-[1.05] tracking-tight sm:min-h-[13rem] sm:text-5xl lg:min-h-[20rem] lg:text-6xl">
            {t("hero.titlePre")}
            <span className="text-gradient">{t("hero.titleHighlight")}</span>
            {t("hero.titlePost")}
          </h1>

          <p className="mt-5 min-h-[8.5rem] max-w-xl text-base leading-relaxed text-muted-foreground sm:min-h-[5.5rem] sm:text-lg">
            {renderEmphasis(t("hero.subtitle"))}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="gap-2">
              <Link href="/calculator">
                {t("hero.ctaOpen")}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/#science">{t("hero.ctaMethod")}</Link>
            </Button>
          </div>

          <dl className="mt-10 grid max-w-md grid-cols-3 gap-6">
            <Stat value="3" label={t("hero.statModes")} />
            <Stat value="365×32" label={t("hero.statSamples")} />
            <Stat value="0.00%" label={t("hero.statError")} />
          </dl>
        </div>

        {/* Live mini-demo */}
        <div className="relative flex items-center">
          <div className="glass glow-brand w-full rounded-2xl border border-border/70 p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Sun className="size-4 text-[var(--daylight)]" />
                {t("hero.liveConversion")}
              </div>
              <span className="rounded-full bg-secondary px-2.5 py-1 text-xs text-secondary-foreground">
                {t(`bands.${band.tone}`)}
              </span>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-2">
              <MetricGauge
                value={result.dao}
                label="DAo"
                sublabel={t("common.autonomy")}
                size={150}
              />
              <MetricGauge
                value={result.daoCon}
                label="DAo.con"
                sublabel={t("common.continuous")}
                size={150}
              />
            </div>

            <div className="mt-6">
              <div className="flex items-baseline justify-between">
                <label className="text-sm text-muted-foreground">
                  {t("hero.daylightFactor")}
                </label>
                <span className="font-mono text-lg font-semibold tabular-nums">
                  {df.toFixed(2)}%
                </span>
              </div>
              <Slider
                value={[df]}
                min={0}
                max={8}
                step={0.05}
                onValueChange={(v) => setDf(firstSliderValue(v))}
                className="mt-3"
              />
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                {t(`bands.${band.tone}Desc`)} {t("hero.demoNote")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <dt className="font-heading text-2xl font-semibold tabular-nums">
        {value}
      </dt>
      <dd className="mt-1 text-xs leading-tight text-muted-foreground">
        {label}
      </dd>
    </div>
  );
}

function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 aurora" />
      <div className="absolute inset-0 bg-grid bg-grid-fade opacity-35" />

      {/* Solar path: dashed arc + a round sun that never gets squashed. */}
      <div className="absolute inset-x-0 top-0 h-[460px]">
        <svg
          className="absolute inset-0 h-full w-full opacity-60"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
        >
          <defs>
            <linearGradient id="arc" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--brand)" stopOpacity="0" />
              <stop offset="50%" stopColor="var(--daylight)" stopOpacity="0.6" />
              <stop offset="100%" stopColor="var(--violet)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0,92 Q50,-48 100,92"
            fill="none"
            stroke="url(#arc)"
            strokeWidth="1.4"
            strokeDasharray="4 9"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <motion.div
          className="absolute size-4 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 36% 30%, #ffffff, var(--daylight) 46%, color-mix(in oklab, var(--daylight) 60%, transparent) 100%)",
            boxShadow:
              "0 0 20px 5px color-mix(in oklab, var(--daylight) 50%, transparent), 0 0 6px 1px color-mix(in oklab, var(--daylight) 70%, transparent)",
          }}
          initial={{ opacity: 0 }}
          animate={{
            left: SUN_TRAJECTORY.left,
            top: SUN_TRAJECTORY.top,
            opacity: SUN_TRAJECTORY.opacity,
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </div>
  );
}
