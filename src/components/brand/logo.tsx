import { cn } from "@/lib/utils";

/**
 * Compact mark: a sun/aperture glyph. Duotone — an ink aperture ring (inherits
 * the text colour) around a glowing daylight core, no rainbow gradient.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("size-7", className)}
      aria-hidden="true"
    >
      <circle
        cx="16"
        cy="16"
        r="13"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.85"
        strokeWidth="1.6"
      />
      <circle cx="16" cy="16" r="5.25" fill="var(--daylight)" />
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i * Math.PI) / 4;
        const x1 = 16 + Math.cos(a) * 8.5;
        const y1 = 16 + Math.sin(a) * 8.5;
        const x2 = 16 + Math.cos(a) * 11.5;
        const y2 = 16 + Math.sin(a) * 11.5;
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="var(--daylight)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className="font-heading text-lg font-semibold tracking-tight">
        DAo<span className="text-muted-foreground">·</span>calc
      </span>
    </span>
  );
}
