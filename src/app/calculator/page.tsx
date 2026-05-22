import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { Dashboard } from "@/components/calculator/dashboard";
import type { CalculatorMode } from "@/store/calculator-store";

export const metadata: Metadata = {
  title: "Calculator",
  description:
    "Convert Daylight Factor into DAo and DAo.con for single points, vertical sections and full plan matrices, with live heatmaps and response curves.",
};

const VALID_MODES: CalculatorMode[] = ["single", "section", "matrix"];

export default async function CalculatorPage({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string }>;
}) {
  const { mode } = await searchParams;
  const initialMode = VALID_MODES.includes(mode as CalculatorMode)
    ? (mode as CalculatorMode)
    : undefined;

  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Dashboard initialMode={initialMode} />
      </main>
    </div>
  );
}
