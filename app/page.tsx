import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/Hero";
import { IntroSection } from "@/components/IntroSection";
import { MarqueeStrip } from "@/components/MarqueeStrip";
import { WhoWeAre } from "@/components/WhoWeAre";
import { NoriekVision } from "@/components/NoriekVision";
import { NoriekEdge } from "@/components/NoriekEdge";
import { Offerings } from "@/components/Offerings";
import { Projects } from "@/components/Projects";
import { CtaBand } from "@/components/CtaBand";
import { SiteFooter } from "@/components/SiteFooter";

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <IntroSection />
        <MarqueeStrip />
        <WhoWeAre />
        <NoriekVision />
        <NoriekEdge />
        <Offerings />
        <Projects />
        <CtaBand />
      </main>
      <SiteFooter />
    </>
  );
}
