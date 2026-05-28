"use client";

import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { useT } from "@/i18n/provider";

const REFERENCES = [
  "Acosta, I.; Campano, M. A.; Domínguez-Amarillo, S.; Fernández-Agüera, J. (2019). Overcast Daylight Autonomy: A new concept to link daylight dynamic metrics with daylight factors. LEUKOS 15 (4), 254–269.",
  "Campano, M. A.; Acosta, I.; Domínguez, S.; López-Lovillo, R. (2022). Dynamic analysis of office lighting smart controls management based on user requirements. Automation in Construction 133, 104021.",
  "Acosta, I.; Campano, M. A.; Domínguez-Amarillo, S.; Navarro, J. (2023). Continuous Overcast Daylight Autonomy (DAo.con): A New Dynamic Metric for Sensor-Less Lighting Smart Controls. LEUKOS 19 (3), 343–367.",
  "Karayel, M.; Navvab, M.; Ne'eman, E.; Selkowitz, S. (1984). Zenith luminance and sky luminance distributions for daylighting calculations. Energy and Buildings 6 (3), 283–291.",
];

export function SiteFooter() {
  const t = useT();
  return (
    <footer className="border-t border-border/60 bg-card/40">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.2fr_2fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              {t("footer.tagline")}
            </p>
            <div className="mt-4 flex gap-4 text-sm">
              <Link
                href="/calculator"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {t("footer.calculator")}
              </Link>
              <Link
                href="/#science"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {t("footer.method")}
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.22em] text-muted-foreground">
              {t("footer.referencesTitle")}
            </h3>
            <ol className="mt-4 space-y-3">
              {REFERENCES.map((r, i) => (
                <li
                  key={r}
                  className="grid grid-cols-[auto_1fr] gap-3 text-xs leading-relaxed text-muted-foreground"
                >
                  <span className="font-mono text-[var(--daylight)] tabular-nums">
                    [{i + 1}]
                  </span>
                  <span>{r}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-2 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>{t("footer.copyright")}</p>
          <p>{t("footer.validated")}</p>
        </div>
      </div>
    </footer>
  );
}
