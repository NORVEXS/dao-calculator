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
import { daylightGradient } from "@/lib/colormap";

export function HowItWorks() {
  const steps = [
    {
      icon: Ruler,
      title: "Enter your Daylight Factor",
      body: "Provide DF at a point, along a vertical section, or across a whole floor-plan grid. DF is a static, location-independent indicator of a space's daylight performance.",
    },
    {
      icon: CloudSun,
      title: "We model the overcast sky",
      body: "For every 15-minute step of the occupied year we compute the CIE overcast-sky exterior illuminance from solar geometry, then the interior illuminance as E = DF × E_ext.",
    },
    {
      icon: Target,
      title: "Read DAo & DAo.con",
      body: "DAo is the share of occupied time the space stays above your lux target; DAo.con also credits partial daylight. Results render as gauges, curves and heatmaps.",
    },
  ];

  return (
    <section id="how" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <Reveal className="max-w-2xl">
        <SectionEyebrow>How it works</SectionEyebrow>
        <h2 className="font-heading mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          Complex daylight science, three simple steps
        </h2>
        <p className="mt-4 text-muted-foreground">
          The hard part — a full annual overcast-sky simulation — runs instantly
          in your browser. You only ever think in Daylight Factor.
        </p>
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
  const chain = [
    { label: "Solar geometry", detail: "δ, equation of time, hour angle" },
    { label: "Solar elevation", detail: "γ = f(δ, latitude, H)" },
    { label: "Exterior illuminance", detail: "CIE overcast: (7/9)π(100 + 7580·sinγ^1.36)" },
    { label: "Interior illuminance", detail: "E_int = E_ext × DF/100" },
    { label: "DAo / DAo.con", detail: "count & continuous credit vs. threshold" },
  ];

  return (
    <section
      id="science"
      className="relative overflow-hidden border-y border-border/60 bg-card/30"
    >
      <div className="absolute inset-0 -z-10 bg-grid opacity-40" />
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <Reveal>
            <SectionEyebrow>The science</SectionEyebrow>
            <h2 className="font-heading mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              A faithful annual daylight model
            </h2>
            <p className="mt-4 text-muted-foreground">
              This tool reproduces the original University of Seville workbook
              exactly. DAo is{" "}
              <strong className="text-foreground">
                independent of orientation and location
              </strong>{" "}
              because it builds on the static Daylight Factor — yet the
              conversion still accounts for latitude, schedule and your
              illuminance threshold.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/calculator">Try it now</Link>
              </Button>
              <span className="inline-flex items-center rounded-lg border border-border/70 bg-background/60 px-3 py-2 text-xs text-muted-foreground">
                CIE Standard Overcast Sky · 300 lx default
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <ol className="relative space-y-3">
              {chain.map((c, i) => (
                <li
                  key={c.label}
                  className="flex items-start gap-4 rounded-xl border border-border/70 bg-background/60 p-4"
                >
                  <span
                    className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-background"
                    style={{ background: daylightGradient("135deg") }}
                  >
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-medium">{c.label}</p>
                    <p className="font-mono text-xs text-muted-foreground">
                      {c.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function MetricsSection() {
  const cards = [
    {
      icon: TrendingUp,
      tag: "DAo",
      title: "Overcast Daylight Autonomy",
      body: "The percentage of occupied time a point stays at or above the target illuminance (typically 300 lx) under overcast skies — the worst-case daylight scenario.",
      example: "DAo = 50% → half the occupied hours need no electric light.",
    },
    {
      icon: LineChart,
      tag: "DAo.con",
      title: "Continuous Overcast Daylight Autonomy",
      body: "A nuanced version that also credits partial daylight: a point at 150 lx against a 300 lx target contributes 0.5 instead of being discarded.",
      example: "DAo.con = 0.75 → on average 75% of the target is reached.",
    },
  ];

  const modes = [
    { icon: Target, label: "Single point", href: "/calculator?mode=single" },
    { icon: MoveVertical, label: "Vertical section", href: "/calculator?mode=section" },
    { icon: Grid3x3, label: "Plan matrix", href: "/calculator?mode=matrix" },
  ];

  return (
    <section id="metrics" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <Reveal className="max-w-2xl">
        <SectionEyebrow>The metrics</SectionEyebrow>
        <h2 className="font-heading mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          Two metrics, one clear picture
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
              Three ways to calculate
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              From a single DF reading to a full floor-plan heatmap.
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
  return (
    <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
      <Reveal>
        <div className="glow-brand relative overflow-hidden rounded-3xl border border-border/70 bg-card/70 px-6 py-14 text-center sm:px-12">
          <div className="absolute inset-0 -z-10 aurora opacity-60" />
          <h2 className="font-heading mx-auto max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
            Make daylight performance obvious.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Open the calculator and convert your Daylight Factors into DAo and
            DAo.con — no install, no spreadsheet, instant visuals.
          </p>
          <div className="mt-8">
            <Button asChild size="lg">
              <Link href="/calculator">Launch the calculator</Link>
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
