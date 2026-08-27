"use client";

import Image from "next/image";
import { useState } from "react";
import { offerings } from "@/lib/content";
import { Reveal } from "@/components/Reveal";

export function Offerings() {
  const [active, setActive] = useState(0);
  const current = offerings.items[active];

  return (
    <section id="offerings" className="bg-white py-20 md:py-32">
      <div className="shell">
        <Reveal as="h2" className="section-title mb-12 md:mb-16">
          <span className="script">{offerings.script}</span>
          <span className="heading">{offerings.heading}</span>
        </Reveal>

        <div className="grid gap-12 md:grid-cols-[1fr_460px] md:gap-16">
          {/* list */}
        <Reveal>
          <ul className="border-t border-ink/15" onMouseLeave={() => setActive(0)}>
            {offerings.items.map((item, i) => {
              const on = i === active;
              return (
                <li key={item.number} className="border-b border-ink/15">
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-expanded={on}
                    className={`flex w-full items-center gap-5 rounded-panel px-4 py-5 text-left transition-colors duration-300 md:px-6 md:py-7 ${
                      on ? "bg-ink text-white" : "bg-transparent text-ink-soft"
                    }`}
                  >
                    <span
                      className={`w-8 shrink-0 text-[clamp(1.1rem,1.8vw,1.8rem)] font-light ${
                        on ? "text-white/55" : "text-ink-soft/70"
                      }`}
                    >
                      {item.number}
                    </span>
                    <span className="flex-1 text-[clamp(1.1rem,1.9vw,1.9rem)] font-medium tracking-[-0.02em]">
                      {item.label}
                    </span>
                    <span
                      className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-colors duration-300 ${
                        on ? "border-white text-white" : "border-ink/40 text-ink/50"
                      }`}
                      aria-hidden
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path
                          d="M3 11 11 3M5 3h6v6"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </Reveal>

        {/* preview — plain swap on hover, no entrance animation so it can never be left hidden */}
        <Reveal>
          <div>
            <div className="relative aspect-[3/2] w-full overflow-hidden rounded-thumb bg-cream">
              <Image
                key={current.image.src}
                src={current.image.src}
                alt={current.image.alt}
                fill
                sizes="(max-width: 768px) 100vw, 460px"
                className="object-cover"
              />
            </div>
            <p className="mt-6 text-[0.95rem] font-medium leading-relaxed text-ink md:text-base">
              {current.body}
            </p>
          </div>
        </Reveal>
        </div>
      </div>
    </section>
  );
}
