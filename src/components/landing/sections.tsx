"use client";

import Link from "next/link";
import {
  CloudSun,
  Grid3x3,
  LineChart,
  MoveVertical,
  Ruler,
  Target,
  TrendingUp,
} from "lucide-react";
import { Reveal } from "./reveal";
import { Button } from "@/components/ui/button";
import { SolarArcWidget } from "@/components/widgets/solar-arc";
import { AnnualLightWidget } from "@/components/widgets/annual-light";
import { RoomDepthWidget } from "@/components/widgets/room-depth";
import { ScenarioCompareWidget } from "@/components/widgets/scenario-compare";
import { renderEmphasis, useT } from "@/i18n/provider";

export function HowItWorks() {
  const t = useT();
  const steps = [
    { icon: Ruler, title: t("how.step1Title"), body: t("how.step1Body") },
    { icon: CloudSun, title: t("how.step2Title"), body: t("how.step2Body") },
    { icon: Target, title: t("how.step3Title"), body: t("how.step3Body") },
  ];

  return (
    <section id="how" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-20 sm:px-6 lg:px-8">
      <Reveal className="max-w-2xl">
        <SectionEyebrow>{t("how.eyebrow")}</SectionEyebrow>
        <h2 className="font-heading mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          {t("how.title")}
        </h2>
        <p className="mt-4 text-muted-foreground">{t("how.subtitle")}</p>
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {steps.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.08}>
            <div className="group h-full rounded-2xl border border-border/70 bg-card/60 p-6 transition-colors hover:border-[var(--brand)]/50">
              <div className="flex size-11 items-center justify-center rounded-xl bg-secondary text-[var(--brand)]">
                <s.icon className="size-5" />
              </div>
              <div className="mt-4 flex items-center gap-2">
                <span className="font-mono text-xs text-muted-foreground">
                  0{i + 1}
                </span>
                <h3 className="font-heading text-lg font-semibold">{s.title}</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {s.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function ScienceSection() {
  const t = useT();
  return (
    <section
      id="science"
      className="relative scroll-mt-20 overflow-hidden border-y border-border/60 bg-card/30"
    >
      <div className="absolute inset-0 -z-10 bg-grid opacity-25" />
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <SectionEyebrow>{t("science.eyebrow")}</SectionEyebrow>
          <h2 className="font-heading mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            {t("science.title")}
          </h2>
          <p className="mt-4 text-muted-foreground">
            {renderEmphasis(t("science.subtitle"))}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/calculator">{t("science.tryNow")}</Link>
            </Button>
            <span className="inline-flex items-center rounded-lg border border-border/70 bg-background/60 px-3 py-2 text-xs text-muted-foreground">
              {t("science.skyNote")}
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <SolarArcWidget />
        </Reveal>
        <Reveal delay={0.05} className="mt-5">
          <AnnualLightWidget />
        </Reveal>
      </div>
    </section>
  );
}

export function ExploreSection() {
  const t = useT();
  return (
    <section className="mx-auto max-w-7xl scroll-mt-20 px-4 py-20 sm:px-6 lg:px-8">
      <Reveal className="max-w-2xl">
        <SectionEyebrow>{t("explore.eyebrow")}</SectionEyebrow>
        <h2 className="font-heading mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          {t("explore.title")}
        </h2>
        <p className="mt-4 text-muted-foreground">{t("explore.subtitle")}</p>
      </Reveal>
      <div className="mt-10 space-y-5">
        <Reveal>
          <RoomDepthWidget />
        </Reveal>
        <Reveal delay={0.05}>
          <ScenarioCompareWidget />
        </Reveal>
      </div>
    </section>
  );
}

export function MetricsSection() {
  const t = useT();
  const cards = [
    {
      icon: TrendingUp,
      tag: "DAo",
      title: t("metrics.daoTitle"),
      body: t("metrics.daoBody"),
      example: t("metrics.daoExample"),
    },
    {
      icon: LineChart,
      tag: "DAo.con",
      title: t("metrics.conTitle"),
      body: t("metrics.conBody"),
      example: t("metrics.conExample"),
    },
  ];

  const modes = [
    { icon: Target, label: t("metrics.modeSingle"), href: "/calculator?mode=single" },
    { icon: MoveVertical, label: t("metrics.modeSection"), href: "/calculator?mode=section" },
    { icon: Grid3x3, label: t("metrics.modeMatrix"), href: "/calculator?mode=matrix" },
  ];

  return (
    <section id="metrics" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-20 sm:px-6 lg:px-8">
      <Reveal className="max-w-2xl">
        <SectionEyebrow>{t("metrics.eyebrow")}</SectionEyebrow>
        <h2 className="font-heading mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          {t("metrics.title")}
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {cards.map((c, i) => (
          <Reveal key={c.tag} delay={i * 0.08}>
            <div className="h-full rounded-2xl border border-border/70 bg-card/60 p-7">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-secondary text-[var(--brand)]">
                  <c.icon className="size-5" />
                </div>
                <span className="font-mono text-sm font-semibold text-[var(--brand)]">
                  {c.tag}
                </span>
              </div>
              <h3 className="font-heading mt-4 text-xl font-semibold">
                {c.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {c.body}
              </p>
              <p className="mt-4 rounded-lg bg-secondary/60 px-3 py-2 text-xs text-secondary-foreground">
                {c.example}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <div className="mt-10 flex flex-col items-center justify-between gap-5 rounded-2xl border border-border/70 bg-card/60 p-7 sm:flex-row">
          <div>
            <h3 className="font-heading text-lg font-semibold">
              {t("metrics.modesTitle")}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {t("metrics.modesSubtitle")}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {modes.map((m) => (
              <Button key={m.label} asChild variant="outline" className="gap-2">
                <Link href={m.href}>
                  <m.icon className="size-4" />
                  {m.label}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function CtaSection() {
  const t = useT();
  return (
    <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
      <Reveal>
        <div className="glow-brand relative overflow-hidden rounded-3xl border border-border/70 bg-card/70 px-6 py-14 text-center sm:px-12">
          <div className="absolute inset-0 -z-10 aurora opacity-60" />
          <h2 className="font-heading mx-auto max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
            {t("cta.title")}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            {t("cta.subtitle")}
          </p>
          <div className="mt-8">
            <Button asChild size="lg">
              <Link href="/calculator">{t("cta.button")}</Link>
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">
      {children}
    </span>
  );
}
