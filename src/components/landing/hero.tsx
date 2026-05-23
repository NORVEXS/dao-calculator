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

// Sampled points of the dashed solar arc (M0,400 Q600,-120 1200,400) so the
// sun follows the exact curve smoothly at a constant pace, with a soft fade at
// the entry/exit that also hides the loop seam.
const SUN_TRAJECTORY = (() => {
  const steps = 60;
  const cx: number[] = [];
  const cy: number[] = [];
  const opacity: number[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const mt = 1 - t;
    cx.push(Math.round((2 * mt * t * 600 + t * t * 1200) * 10) / 10);
    cy.push(Math.round((mt * mt * 400 + 2 * mt * t * -120 + t * t * 400) * 10) / 10);
    const fade = t < 0.1 ? t / 0.1 : t > 0.9 ? (1 - t) / 0.1 : 1;
    opacity.push(Math.round(fade * 100) / 100);
  }
  return { cx, cy, opacity };
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
    <div className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute inset-0 aurora" />
      <div className="absolute inset-0 bg-grid bg-grid-fade opacity-35" />
      {/* Arcing sun path */}
      <svg
        className="absolute inset-x-0 top-0 h-[420px] w-full opacity-50"
        preserveAspectRatio="none"
        viewBox="0 0 1200 420"
      >
        <defs>
          <linearGradient id="arc" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--brand)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--daylight)" stopOpacity="0.7" />
            <stop offset="100%" stopColor="var(--violet)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0,400 Q600,-120 1200,400"
          fill="none"
          stroke="url(#arc)"
          strokeWidth="1.5"
          strokeDasharray="3 7"
        />
        <motion.circle
          r="5.5"
          fill="var(--daylight)"
          style={{ filter: "drop-shadow(0 0 14px var(--daylight))" }}
          initial={{ opacity: 0 }}
          animate={{
            cx: SUN_TRAJECTORY.cx,
            cy: SUN_TRAJECTORY.cy,
            opacity: SUN_TRAJECTORY.opacity,
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </svg>
    </div>
  );
}
