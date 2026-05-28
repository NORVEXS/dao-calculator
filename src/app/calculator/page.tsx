import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { Dashboard } from "@/components/calculator/dashboard";

export const metadata: Metadata = {
  title: "Calculator",
  description:
    "Convert Daylight Factor into DAo and DAo.con for single points, vertical sections and plan matrices, with interactive heatmaps and response curves.",
};

export default function CalculatorPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Dashboard />
      </main>
    </div>
  );
}
