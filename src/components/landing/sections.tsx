"use client";

import Link from "next/link";
import { Grid3x3, MoveVertical, Target } from "lucide-react";
import { Reveal } from "./reveal";
import { Button } from "@/components/ui/button";
import { SolarArcWidget } from "@/components/widgets/solar-arc";
import { AnnualLightWidget } from "@/components/widgets/annual-light";
import { RoomDepthWidget } from "@/components/widgets/room-depth";
import { ScenarioCompareWidget } from "@/components/widgets/scenario-compare";
import { Formula, Out, Var } from "@/components/scientific/formula";
import { renderEmphasis, useT } from "@/i18n/provider";

export function HowItWorks() {
  const t = useT();
  const steps = [
    { title: t("how.step1Title"), body: t("how.step1Body") },
    { title: t("how.step2Title"), body: t("how.step2Body") },
    { title: t("how.step3Title"), body: t("how.step3Body") },
  ];

  return (
    <section id="how" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-20 sm:px-6 lg:px-8">
      <SectionMark index="01" label={t("how.eyebrow")} />

      <div className="mt-10 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <Reveal>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            {t("how.title")}
          </h2>
          <p className="mt-4 max-w-md text-muted-foreground text-pretty">
            {t("how.subtitle")}
          </p>
        </Reveal>

        <ol className="lg:border-l lg:border-border/60 lg:pl-12">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <li className="group grid grid-cols-[auto_1fr] gap-x-5 gap-y-1 border-b border-border/45 py-6 first:pt-0 last:border-b-0 last:pb-0">
                <span className="font-mono text-2xl font-medium tabular-nums text-muted-foreground/45 transition-all duration-300 group-hover:text-glow group-hover:text-[var(--daylight)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-heading pt-1 text-lg font-semibold">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">
                    {s.body}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function ScienceSection() {
  const t = useT();
  return (
    <section
      id="science"
      className="relative scroll-mt-20 overflow-hidden border-y border-border/60 bg-muted/30"
    >
      <div className="absolute inset-0 -z-10 bg-grid opacity-[0.18]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-48 aurora opacity-60" />
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionMark index="02" label={t("science.eyebrow")} />

        <Reveal className="mt-10 max-w-2xl">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            {t("science.title")}
          </h2>
          <p className="mt-4 text-muted-foreground text-pretty">
            {renderEmphasis(t("science.subtitle"))}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button asChild>
              <Link href="/calculator">{t("science.tryNow")}</Link>
            </Button>
            <span className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground">
              <span className="size-1.5 rounded-full bg-[var(--daylight)]" />
              {t("science.skyNote")}
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.06} className="mt-8">
          <div className="grid gap-3 md:grid-cols-2">
            <Formula label={t("science.chain1")} className="md:col-span-2">
              <Var>δ</Var> = asin(0.4 · sin[(d − d₀) · 360 / 365.2422])
            </Formula>
            <Formula label={t("science.chain2")} className="md:col-span-2">
              <Var>γ</Var> = asin(sin <Var>δ</Var> · sin <Var>φ</Var> + cos{" "}
              <Var>δ</Var> · cos <Var>φ</Var> · cos <Var>H</Var>)
            </Formula>
            <Formula label={t("science.chain3")}>
              <Out>
                E<sub>ext</sub>
              </Out>{" "}
              = (7/9) · π · (100 + 7580 · sin<sup>1.36</sup> <Var>γ</Var>)
            </Formula>
            <Formula label={t("science.chain4")}>
              <Out>
                E<sub>int</sub>
              </Out>{" "}
              ={" "}
              <Out>
                E<sub>ext</sub>
              </Out>{" "}
              · DF / 100
            </Formula>
            <Formula label={t("science.chain5")} className="md:col-span-2">
              <Out>DAo</Out> = Σ[ E<sub>int</sub> ≥ E
              <sub>t</sub> ] / N &nbsp;·&nbsp; <Out>DAo.con</Out> = ⟨ min(E
              <sub>int</sub> / E<sub>t</sub>, 1) ⟩
            </Formula>
          </div>
          <p className="mt-2.5 px-1 text-xs leading-relaxed text-muted-foreground">
            {t("science.legend")}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-8">
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
      <SectionMark index="04" label={t("explore.eyebrow")} />
      <Reveal className="mt-10 max-w-2xl">
        <h2 className="font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">
          {t("explore.title")}
        </h2>
        <p className="mt-4 text-muted-foreground text-pretty">{t("explore.subtitle")}</p>
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
      tag: "DAo",
      unit: t("metrics.daoUnit"),
      title: t("metrics.daoTitle"),
      body: t("metrics.daoBody"),
      example: t("metrics.daoExample"),
    },
    {
      tag: "DAo.con",
      unit: t("metrics.conUnit"),
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
      <SectionMark index="03" label={t("metrics.eyebrow")} />
      <Reveal className="mt-10 max-w-2xl">
        <h2 className="font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">
          {t("metrics.title")}
        </h2>
      </Reveal>

      {/* Spec-sheet: two definitions split by a single hairline, no floating cards. */}
      <Reveal delay={0.06}>
        <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-border/70 bg-border/70 sm:grid-cols-2">
          {cards.map((c) => (
            <article key={c.tag} className="flex flex-col bg-card p-7">
              <header className="flex items-baseline justify-between border-b border-dashed border-border pb-3">
                <span className="font-mono text-base font-semibold tracking-tight text-foreground">
                  {c.tag}
                </span>
                <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
                  {c.unit}
                </span>
              </header>
              <h3 className="font-heading mt-4 text-xl font-semibold text-pretty">
                {c.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground text-pretty">
                {c.body}
              </p>
              <p className="mt-5 rounded-md bg-[var(--daylight)]/[0.08] px-3 py-2.5 font-mono text-xs leading-relaxed text-foreground/85 ring-1 ring-inset ring-[var(--daylight)]/15">
                {c.example}
              </p>
            </article>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-8 flex flex-col items-start justify-between gap-5 border-t border-border/70 pt-7 sm:flex-row sm:items-center">
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
                  <m.icon className="size-4 text-[var(--daylight)]" />
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
        <div className="panel relative overflow-hidden rounded-3xl px-6 py-20 text-center sm:px-12">
          <div className="aurora absolute inset-0 -z-10 opacity-70" />
          <div className="bg-grid bg-grid-fade absolute inset-0 -z-10 opacity-20" />
          <span
            aria-hidden
            className="mx-auto mb-7 block size-3 rounded-full bg-[var(--daylight)] shadow-[0_0_28px_8px_color-mix(in_oklab,var(--daylight)_60%,transparent)]"
          />
          <h2 className="font-heading mx-auto max-w-2xl text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            {t("cta.title")}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground text-pretty">
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

/** Technical register line: amber mono index + label + trailing hairline. */
function SectionMark({ index, label }: { index: string; label: string }) {
  return (
    <Reveal>
      <div className="flex items-center gap-4">
        <span className="text-glow font-mono text-sm font-medium tabular-nums text-[var(--daylight)]">
          {index}
        </span>
        <span className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.22em] text-muted-foreground">
          {label}
        </span>
        <span className="h-px flex-1 bg-gradient-to-r from-[var(--daylight)]/40 via-border to-transparent" />
      </div>
    </Reveal>
  );
}
