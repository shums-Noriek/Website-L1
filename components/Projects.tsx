"use client";

import Image from "next/image";
import { useState } from "react";
import { projects } from "@/lib/content";
import { Reveal } from "@/components/Reveal";

export function Projects() {
  // null = resting state: all four panels equal. A number = that panel is expanded.
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="projects" className="relative overflow-hidden bg-white py-20 md:py-32">
      <Reveal as="h2" className="section-title mb-12 justify-center md:mb-16">
        <span className="script">{projects.script}</span>
        <span className="heading">{projects.heading}</span>
      </Reveal>

      <div className="relative shell">
        {/* desktop: expanding panels — CSS-only flex-grow so it never depends on JS animation state.
            The row is held to ~74% width so the armchair cut-out has its own space on the right. */}
        <Reveal className="hidden md:block">
          <div
            className="flex h-[68vh] max-h-[660px] min-h-[460px] gap-3 md:w-[52%] lg:w-[54%]"
            onMouseLeave={() => setActive(null)}
          >
            {projects.items.map((item, i) => {
              const on = active === i;
              const dimmed = active !== null && !on;
              return (
                <button
                  type="button"
                  key={item.name}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  aria-label={item.name}
                  style={{
                    flexGrow: on ? 4 : 1,
                    flexBasis: 0,
                    transition: "flex-grow 0.7s cubic-bezier(0.22,1,0.36,1)",
                  }}
                  className="group relative h-full min-w-[86px] overflow-hidden rounded-panel"
                >
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    sizes="(max-width: 768px) 0px, 55vw"
                    className={`object-cover transition-[transform,object-position] duration-700 ${
                      on ? "scale-100 object-center" : "scale-105 object-[45%_center]"
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />

                  {/* collapsed: vertical name (writing-mode, never clipped) */}
                  <span
                    className={`absolute bottom-6 left-1/2 -translate-x-1/2 [writing-mode:vertical-rl] rotate-180 text-[clamp(0.9rem,1.05vw,1.25rem)] font-medium uppercase tracking-[0.18em] text-white transition-opacity duration-300 ${
                      on ? "opacity-0" : dimmed ? "opacity-70" : "opacity-100"
                    }`}
                  >
                    {item.name}
                  </span>

                  {/* expanded: caption + name, centre-aligned */}
                  <div
                    className={`absolute inset-x-4 bottom-8 flex flex-col items-center gap-3 text-center transition-[opacity,transform] duration-500 ${
                      on ? "opacity-100 delay-150" : "pointer-events-none translate-y-3 opacity-0"
                    }`}
                  >
                    <p className="max-w-[36ch] text-sm leading-snug text-white/85">{projects.caption}</p>
                    <p className="text-[clamp(1.05rem,1.4vw,1.6rem)] font-medium uppercase tracking-[0.2em] text-white">
                      {item.name}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* decorative cut-out — cognac armchair + brass lamp (Figma layer: 719 x 539) */}
        <Image
          src="/images/armchair-overlay.webp"
          alt=""
          aria-hidden
          width={719}
          height={539}
          className="pointer-events-none absolute bottom-0 right-0 hidden h-auto w-[min(719px,54vw)] translate-y-[5%] mix-blend-multiply md:block"
        />

        {/* mobile: scroll-snap rail */}
        <div className="-mx-[var(--shell-pad)] flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--shell-pad)] pb-4 md:hidden">
          {projects.items.map((item) => (
            <figure
              key={item.name}
              className="relative aspect-[3/4] w-[70vw] shrink-0 snap-center overflow-hidden rounded-panel"
            >
              <Image src={item.image.src} alt={item.image.alt} fill sizes="70vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <figcaption className="absolute bottom-4 left-4 font-medium uppercase tracking-[0.12em] text-white">
                {item.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
