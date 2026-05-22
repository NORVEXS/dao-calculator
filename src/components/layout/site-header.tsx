"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import { Button } from "@/components/ui/button";
import { useT } from "@/i18n/provider";

export function SiteHeader() {
  const t = useT();
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 glass">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="DAo calc home">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <NavLink href="/#how">{t("nav.how")}</NavLink>
          <NavLink href="/#science">{t("nav.science")}</NavLink>
          <NavLink href="/#metrics">{t("nav.metrics")}</NavLink>
        </nav>

        <div className="flex items-center gap-1.5">
          <LanguageToggle />
          <ThemeToggle />
          <Button asChild size="sm" className="gap-1.5">
            <Link href="/calculator">
              {t("nav.openCalculator")}
              <ArrowUpRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
    >
      {children}
    </Link>
  );
}
