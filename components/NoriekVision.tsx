import Image from "next/image";
import { vision } from "@/lib/content";

/**
 * The Noriek Vision.
 *
 * All motion is CSS scroll-driven (`animation-timeline: view()` — see
 * globals.css), so it re-plays every time the section scrolls into view.
 * Browsers without scroll-driven animations simply render it static and
 * fully visible.
 */
export function NoriekVision() {
  return (
    <section id="vision" className="relative overflow-hidden bg-white py-24 md:py-36">
      {/* warm wash behind the watermark, fading into the white the pavilion sits on */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[55%] bg-gradient-to-b from-cream to-white"
      />

      <div className="relative mx-auto max-w-shell px-[var(--shell-pad)] text-center">
        {/* heading — rises + fades every time the section scrolls in */}
        <div className="vision-watermark pointer-events-none relative z-0 select-none">
          <p className="text-[0.7rem] font-semibold tracking-[0.32em] text-ink/60 md:text-sm">
            {vision.script}
          </p>
          <p className="mt-1 text-[clamp(2.25rem,8vw,6.5rem)] font-bold leading-[0.9] tracking-[-0.04em] text-ink">
            {vision.heading}
          </p>
        </div>

        {/* pavilion render — sits just below the words so they stay readable;
            wipes open on entry, then a slow Ken-Burns drift */}
        <div className="relative z-10 mx-auto mt-3 w-full max-w-[1080px] overflow-hidden md:mt-1">
          <div className="vision-img">
            <Image
              src={vision.image.src}
              alt={vision.image.alt}
              width={1600}
              height={329}
              sizes="(max-width: 1080px) 100vw, 1080px"
              className="block h-auto w-full"
            />
          </div>
        </div>

        <div className="vision-copy mx-auto mt-10 max-w-[68ch] space-y-4 text-[clamp(1rem,1.4vw,1.25rem)] font-medium leading-relaxed text-ink md:mt-14">
          {vision.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
