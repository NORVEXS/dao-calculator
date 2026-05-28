"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { MetricGauge } from "@/components/scientific/metric-gauge";
import { SkyDome } from "./sky-dome";
import { buildExteriorProfile, computeDao, DEFAULT_PARAMETERS } from "@/lib/scientific/dao";
import { classifyDao } from "@/lib/colormap";
import { firstSliderValue } from "@/lib/format";
import { renderEmphasis, useLanguage } from "@/i18n/provider";

export function Hero() {
  const { t, lang } = useLanguage();
  const [df, setDf] = useState(3);
  const profile = useMemo(() => buildExteriorProfile(DEFAULT_PARAMETERS), []);
  const result = useMemo(
    () => computeDao(profile, df, DEFAULT_PARAMETERS.thresholdLux),
    [profile, df],
  );
  const band = classifyDao(result.dao);

  return (
    <section className="relative isolate overflow-hidden">
      {/* Cinematic sky backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-20 sky-dome" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[78%]">
        <SkyDome latitude={37} dayIndex={171} />
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid bg-grid-fade opacity-[0.1]" />
      <div className="pointer-events-none absolute inset-0 -z-10 vignette" />

      <div className="mx-auto grid min-h-[90dvh] max-w-7xl items-center gap-12 px-4 pb-20 pt-14 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10 lg:px-8 lg:pt-20">
        <div className="flex flex-col justify-center">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border/70 bg-background/40 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
            <span className="size-1.5 shrink-0 rounded-full bg-[var(--daylight)] bloom" />
            {t("hero.badge")}
          </div>

          <h1 className="font-heading mt-6 text-balance text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
            {t("hero.titlePre")}
            <span className="mark-underline text-glow">{t("hero.titleHighlight")}</span>
            {t("hero.titlePost")}
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
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

          <dl className="mt-12 grid max-w-md grid-cols-3 gap-6">
            <Stat value="3" label={t("hero.statModes")} />
            <Stat value={profile.count.toLocaleString(lang)} label={t("hero.statSamples")} />
            <Stat
              value={`${(0).toLocaleString(lang, { minimumFractionDigits: 3 })}%`}
              label={t("hero.statError")}
            />
          </dl>
        </div>

        {/* Instrument panel — interactive live conversion */}
        <div className="relative flex items-center">
          <div className="panel w-full rounded-2xl p-6 backdrop-blur-md sm:p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                <span className="size-1.5 rounded-full bg-[var(--daylight)] bloom" />
                {t("hero.liveConversion")}
              </div>
              <span className="rounded-full border border-border/60 bg-background/40 px-2.5 py-1 text-xs text-foreground/80">
                {t(`bands.${band.tone}`)}
              </span>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <MetricGauge value={result.dao} label="DAo" sublabel={t("common.autonomy")} size={156} />
              <MetricGauge value={result.daoCon} label="DAo.con" sublabel={t("common.continuous")} size={156} />
            </div>

            <div className="mt-7 border-t border-border/50 pt-5">
              <div className="flex items-baseline justify-between">
                <label className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  {t("hero.daylightFactor")}
                </label>
                <span className="font-mono text-xl font-semibold tabular-nums text-[var(--daylight)]">
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
      <dt className="font-heading text-2xl font-semibold tabular-nums sm:text-3xl">
        {value}
      </dt>
      <dd className="mt-1 text-xs leading-tight text-muted-foreground">{label}</dd>
    </div>
  );
}
