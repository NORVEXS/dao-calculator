"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import { Button } from "@/components/ui/button";
import { useT } from "@/i18n/provider";

const SECTIONS = ["how", "science", "metrics"] as const;

/** Highlights the nav link for whichever section is currently near the top. */
function useActiveSection() {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const targets = SECTIONS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (targets.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.5, 1] },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return active;
}

export function SiteHeader() {
  const t = useT();
  const active = useActiveSection();
  return (
    <header className="glass sticky top-0 z-50 border-b border-border/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="DAo calc home" className="transition-opacity hover:opacity-80">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <NavLink href="/#how" active={active === "how"}>
            {t("nav.how")}
          </NavLink>
          <NavLink href="/#science" active={active === "science"}>
            {t("nav.science")}
          </NavLink>
          <NavLink href="/#metrics" active={active === "metrics"}>
            {t("nav.metrics")}
          </NavLink>
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

function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "true" : undefined}
      className={`relative rounded-md px-3 py-2 text-sm transition-colors hover:text-foreground ${
        active ? "text-foreground" : "text-muted-foreground"
      }`}
    >
      {children}
      <span
        className={`pointer-events-none absolute inset-x-3 -bottom-px h-px origin-left bg-[var(--daylight)] transition-transform duration-300 ${
          active ? "scale-x-100" : "scale-x-0"
        }`}
      />
    </Link>
  );
}
