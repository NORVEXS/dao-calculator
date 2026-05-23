import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** A highlighted equation card: label chip + monospaced formula. */
export function Formula({
  label,
  children,
  className,
}: {
  label?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border/70 bg-muted/40 px-4 py-3",
        className,
      )}
    >
      {label && (
        <div className="mb-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[var(--brand)]">
          {label}
        </div>
      )}
      <code className="font-mono text-[0.92rem] leading-relaxed text-foreground/90">
        {children}
      </code>
    </div>
  );
}

/** A coloured variable inside a formula. */
export function Var({ children }: { children: ReactNode }) {
  return <span className="font-semibold text-[var(--brand)]">{children}</span>;
}

/** Warm-accent variable (for outputs / illuminance). */
export function Out({ children }: { children: ReactNode }) {
  return (
    <span className="font-semibold text-[var(--daylight)]">{children}</span>
  );
}

/**
 * Inline highlight for an important value or term within running text
 * (e.g. "300 lx", "0.000%"). Renders as a subtle mono chip.
 */
export function Mark({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-md bg-secondary px-1.5 py-0.5 font-mono text-[0.85em] font-medium text-foreground">
      {children}
    </span>
  );
}
