"use client";

import { Languages } from "lucide-react";
import { LANGUAGES } from "@/i18n/translations";
import { useLanguage } from "@/i18n/provider";
import { cn } from "@/lib/utils";

export function LanguageToggle() {
  const { lang, setLang, t } = useLanguage();

  return (
    <div
      role="group"
      aria-label={t("common.language")}
      className="flex items-center gap-0.5 rounded-lg border border-border/70 bg-card/50 p-0.5"
    >
      <Languages className="ml-1 size-3.5 text-muted-foreground" aria-hidden />
      {LANGUAGES.map((l) => (
        <button
          key={l.code}
          type="button"
          onClick={() => setLang(l.code)}
          aria-pressed={lang === l.code}
          className={cn(
            "rounded-md px-1.5 py-0.5 text-xs font-semibold transition-colors",
            lang === l.code
              ? "bg-secondary text-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
