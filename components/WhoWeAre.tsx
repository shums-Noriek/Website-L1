import Image from "next/image";
import { whoWeAre } from "@/lib/content";
import { Reveal } from "@/components/Reveal";

export function WhoWeAre() {
  return (
    <section id="who-we-are" className="overflow-hidden bg-white py-20 md:py-32">
      <Reveal as="h2" className="section-title mb-14 justify-center md:mb-24">
        <span className="heading">{whoWeAre.headingBefore}</span>
        <span className="script">{whoWeAre.script}</span>
        <span className="heading">{whoWeAre.headingAfter}</span>
      </Reveal>

      {/* Row 1 — copy left, image right */}
      <Reveal
        group
        className="mx-auto grid max-w-shell items-center gap-10 px-[var(--shell-pad)] md:grid-cols-[1fr_1.15fr] md:gap-12"
      >
        <p className="copy-caps dropcap max-w-[46ch] md:text-[1.05rem]">{whoWeAre.bodyLead}</p>
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-panel">
          <Image
            src={whoWeAre.images.topRight.src}
            alt={whoWeAre.images.topRight.alt}
            fill
            sizes="(max-width: 768px) 100vw, 55vw"
            className="object-cover"
          />
        </div>
      </Reveal>

      {/* Row 2 — image left, copy right */}
      <Reveal
        group
        className="mx-auto mt-12 grid max-w-shell items-center gap-10 px-[var(--shell-pad)] md:mt-20 md:grid-cols-[1.15fr_1fr] md:gap-12"
      >
        <div className="relative order-2 aspect-[16/10] w-full overflow-hidden rounded-panel md:order-1">
          <Image
            src={whoWeAre.images.bottomLeft.src}
            alt={whoWeAre.images.bottomLeft.alt}
            fill
            sizes="(max-width: 768px) 100vw, 55vw"
            className="object-cover"
          />
        </div>
        <p className="copy-caps order-1 max-w-[46ch] md:order-2 md:text-[1.05rem]">{whoWeAre.bodyTrail}</p>
      </Reveal>
    </section>
  );
}
