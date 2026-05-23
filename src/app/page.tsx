import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Hero } from "@/components/landing/hero";
import {
  CtaSection,
  ExploreSection,
  HowItWorks,
  MetricsSection,
  ScienceSection,
} from "@/components/landing/sections";

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <ScienceSection />
        <MetricsSection />
        <ExploreSection />
        <CtaSection />
      </main>
      <SiteFooter />
    </div>
  );
}
