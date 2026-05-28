"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { MetricGauge } from "@/components/scientific/metric-gauge";
import { SkyDome } from "./sky-dome";
import { buildExteriorProfile, computeDao, DEFAULT_PARAMETERS } from "@/lib/scientific/dao";
import { classifyDao } from "@/lib/colormap";
import { firstSliderValue } from "@/lib/format";
import { renderEmphasis, useLanguage } from "@/i18n/provider";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const { t, lang } = useLanguage();
  const reduce = useReducedMotion();
  const [df, setDf] = useState(3);
  const profile = useMemo(() => buildExteriorProfile(DEFAULT_PARAMETERS), []);
  const result = useMemo(
    () => computeDao(profile, df, DEFAULT_PARAMETERS.thresholdLux),
    [profile, df],
  );
  const band = classifyDao(result.dao);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
  };
  const item = reduce
    ? { hidden: {}, show: {} }
    : {
        hidden: { opacity: 0, y: 18 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
      };
  const reveal = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 28 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-60px" },
        transition: { duration: 0.65, ease: EASE },
      };

  return (
    <section className="relative isolate overflow-hidden">
      {/* Cinematic sky backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-20 sky-dome" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[78%]">
        <SkyDome latitude={37} dayIndex={171} />
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid bg-grid-fade opacity-[0.1]" />
      <div className="pointer-events-none absolute inset-0 -z-10 vignette" />

      <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-20 pt-14 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-10 lg:px-8 lg:pt-20 lg:min-h-[90dvh]">
        <div className="flex flex-col">
          {/* First mobile screen: badge → headline → subtitle → two buttons */}
          <motion.div
            variants={container}
            initial={reduce ? false : "hidden"}
            animate={reduce ? false : "show"}
            className="relative flex min-h-[calc(100svh-8.5rem)] flex-col justify-center lg:block lg:min-h-0"
          >
            <motion.div
              variants={item}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-border/70 bg-background/40 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur"
            >
              <span className="size-1.5 shrink-0 rounded-full bg-[var(--daylight)] bloom" />
              {t("hero.badge")}
            </motion.div>

            <motion.h1
              variants={item}
              className="font-heading mt-6 text-balance text-[2.05rem] font-bold leading-[1.06] tracking-tight sm:text-5xl sm:leading-[1.04] lg:text-7xl lg:leading-[1.02]"
            >
              {t("hero.titlePre")}
              <span className="mark-underline text-glow">{t("hero.titleHighlight")}</span>
              {t("hero.titlePost")}
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-5 max-w-xl text-pretty text-[0.95rem] leading-relaxed text-muted-foreground sm:mt-6 sm:text-lg"
            >
              {renderEmphasis(t("hero.subtitle"))}
            </motion.p>

            <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="gap-2">
                <Link href="/calculator">
                  {t("hero.ctaOpen")}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/#science">{t("hero.ctaMethod")}</Link>
              </Button>
            </motion.div>

            <ScrollCue label={t("hero.scroll")} reduce={!!reduce} />
          </motion.div>

          {/* Below the fold on mobile — revealed on scroll */}
          <motion.dl {...reveal} className="mt-14 grid max-w-md grid-cols-3 gap-6 lg:mt-12">
            <Stat value="3" label={t("hero.statModes")} />
            <Stat value={profile.count.toLocaleString(lang)} label={t("hero.statSamples")} />
            <Stat
              value={`${(0).toLocaleString(lang, { minimumFractionDigits: 3 })}%`}
              label={t("hero.statError")}
            />
          </motion.dl>
        </div>

        {/* Instrument panel — revealed on scroll on mobile, immediate on desktop */}
        <motion.div {...reveal} className="relative flex items-center">
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
        </motion.div>
      </div>
    </section>
  );
}

/** Mobile-only descent cue: a hairline with an amber segment sliding down. */
function ScrollCue({ label, reduce }: { label: string; reduce: boolean }) {
  return (
    <div className="pointer-events-none absolute bottom-2 right-0 flex flex-col items-center gap-2.5 lg:hidden">
      <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground [writing-mode:vertical-rl]">
        {label}
      </span>
      <span className="relative block h-11 w-px overflow-hidden bg-border">
        {!reduce && (
          <motion.span
            className="absolute inset-x-0 top-0 mx-auto block h-3 w-px bg-[var(--daylight)]"
            animate={{ y: [-12, 44] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </span>
    </div>
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
