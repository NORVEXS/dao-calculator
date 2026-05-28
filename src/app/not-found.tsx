"use client";

import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { Button } from "@/components/ui/button";
import { useT } from "@/i18n/provider";

export default function NotFound() {
  const t = useT();
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="relative flex flex-1 items-center overflow-hidden">
        <div className="bg-grid bg-grid-fade absolute inset-0 -z-10 opacity-30" />
        <div className="mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <span className="font-mono text-sm font-medium tabular-nums text-[var(--daylight)]">
              {t("notFound.code")}
            </span>
            <span className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.22em] text-muted-foreground">
              error
            </span>
            <span className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
          </div>
          <h1 className="font-heading mt-8 max-w-2xl text-4xl font-bold tracking-tight text-balance sm:text-5xl">
            {t("notFound.title")}
          </h1>
          <p className="mt-4 max-w-md text-muted-foreground text-pretty">
            {t("notFound.body")}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/">{t("notFound.home")}</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/calculator">{t("notFound.calc")}</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
