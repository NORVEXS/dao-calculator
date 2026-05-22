import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { Dashboard } from "@/components/calculator/dashboard";

export const metadata: Metadata = {
  title: "Calculadora",
  description:
    "Convierte el Factor de Luz Diurna en DAo y DAo.con para puntos individuales, secciones verticales y matrices de planta, con mapas de calor y curvas de respuesta.",
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
