"use client";

import { useEffect } from "react";
import { Grid3x3, MoveVertical, Target } from "lucide-react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ParametersPanel } from "./parameters-panel";
import { ModeSingle } from "./mode-single";
import { ModeSection } from "./mode-section";
import { ModeMatrix } from "./mode-matrix";
import { CalculatorMode, useCalculatorStore } from "@/store/calculator-store";

const TABS: { value: CalculatorMode; label: string; icon: React.ElementType }[] = [
  { value: "single", label: "Single point", icon: Target },
  { value: "section", label: "Vertical section", icon: MoveVertical },
  { value: "matrix", label: "Plan matrix", icon: Grid3x3 },
];

export function Dashboard({ initialMode }: { initialMode?: CalculatorMode }) {
  const mode = useCalculatorStore((s) => s.mode);
  const setMode = useCalculatorStore((s) => s.setMode);

  useEffect(() => {
    if (initialMode) setMode(initialMode);
  }, [initialMode, setMode]);

  return (
    <TooltipProvider delay={150}>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-1">
          <h1 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
            DAo Calculator
          </h1>
          <p className="text-sm text-muted-foreground">
            Convert Daylight Factor into Overcast Daylight Autonomy — adjust the
            parameters and pick a calculation mode.
          </p>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[300px_1fr]">
          <aside className="lg:sticky lg:top-20 lg:self-start">
            <Card className="p-5">
              <ParametersPanel />
            </Card>
          </aside>

          <div>
            <Tabs
              value={mode}
              onValueChange={(v) => setMode(v as CalculatorMode)}
            >
              <TabsList className="mb-5 grid w-full grid-cols-3 sm:max-w-md">
                {TABS.map((t) => (
                  <TabsTrigger key={t.value} value={t.value} className="gap-1.5">
                    <t.icon className="size-4" />
                    <span className="hidden sm:inline">{t.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="single">
                <ModeSingle />
              </TabsContent>
              <TabsContent value="section">
                <ModeSection />
              </TabsContent>
              <TabsContent value="matrix">
                <ModeMatrix />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
