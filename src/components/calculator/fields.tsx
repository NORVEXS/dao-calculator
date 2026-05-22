"use client";

import { Info } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export function InfoLabel({
  children,
  hint,
  htmlFor,
  className,
}: {
  children: React.ReactNode;
  hint?: string;
  htmlFor?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <Label htmlFor={htmlFor} className="text-xs font-medium text-muted-foreground">
        {children}
      </Label>
      {hint && (
        <Tooltip>
          <TooltipTrigger
            type="button"
            className="text-muted-foreground/70 transition-colors hover:text-foreground"
            aria-label="More info"
          >
            <Info className="size-3.5" />
          </TooltipTrigger>
          <TooltipContent className="max-w-[15rem] text-xs leading-relaxed">
            {hint}
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
}

export function FieldRow({
  label,
  hint,
  htmlFor,
  children,
}: {
  label: string;
  hint?: string;
  htmlFor?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[1fr_auto] items-center gap-3">
      <InfoLabel hint={hint} htmlFor={htmlFor}>
        {label}
      </InfoLabel>
      <div className="flex justify-end">{children}</div>
    </div>
  );
}
