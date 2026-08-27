"use client";

import Image from "next/image";
import { useState } from "react";
import { edge } from "@/lib/content";
import { Reveal } from "@/components/Reveal";

function EdgeCard({ card }: { card: (typeof edge.cards)[number] }) {
  // Tap toggle for touch devices (which have no :hover).
  const [open, setOpen] = useState(false);

  return (
    <article
      data-open={open ? "true" : "false"}
      onClick={() => setOpen((v) => !v)}
      className="group relative aspect-[4/3.4] cursor-pointer overflow-hidden rounded-card bg-ink sm:aspect-[4/3]"
    >
      <Image
        src={card.image.src}
        alt={card.image.alt}
        fill
        sizes="(max-width: 900px) 100vw, 560px"
        className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/5 transition-opacity duration-500 group-hover:opacity-90" />

      <span className="absolute left-6 top-2 text-[clamp(4rem,8vw,7rem)] font-light leading-none text-white/85">
        {card.number}
      </span>

      {/* Panel: only the title peeks; body slides up on hover / tap. */}
      <div className="absolute inset-x-0 bottom-0">
        <div
          className="translate-y-[calc(100%-4.75rem)] bg-cream px-6 pb-7 pt-5 shadow-[0_-24px_40px_-24px_rgba(0,0,0,0.45)] transition-transform duration-[560ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-focus-within:translate-y-0 group-data-[open=true]:translate-y-0 sm:translate-y-[calc(100%-4.5rem)]"
        >
          <h3 className="text-[clamp(1.4rem,2.1vw,2rem)] font-bold leading-tight tracking-[-0.02em] text-black">
            {card.title}
          </h3>
          <p className="mt-3 max-w-[48ch] text-[0.9rem] font-medium leading-relaxed text-black">{card.body}</p>
        </div>
      </div>
    </article>
  );
}

export function NoriekEdge() {
  return (
    <section className="bg-white py-20 md:py-32">
      <Reveal as="h2" className="section-title mb-14 justify-center md:mb-20">
        <span className="script">{edge.script}</span>
        <span className="heading">{edge.heading}</span>
      </Reveal>

      <Reveal group className="shell grid gap-6 md:grid-cols-2 md:gap-8">
        {edge.cards.map((card) => (
          <EdgeCard key={card.number} card={card} />
        ))}
      </Reveal>
    </section>
  );
}
