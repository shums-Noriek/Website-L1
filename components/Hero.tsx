import Image from "next/image";
import { hero } from "@/lib/content";

export function Hero() {
  return (
    <section id="top" className="relative h-[100svh] min-h-[620px] w-full overflow-hidden">
      {/* background video (with the still as poster + no-JS fallback) — slow
          scroll-linked parallax via CSS scroll-driven animation */}
      <div className="hero-parallax absolute inset-0 z-0 scale-[1.12]">
        <Image
          src="/images/hero.webp"
          alt="Warm, moody living room with fluted walnut walls and a long linear fireplace"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <video
          aria-hidden
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/hero.webp"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/videos/hero.webm" type="video/webm" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-black/30" />
      </div>

      <div className="hero-parallax-content shell relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
        <p
          className="hero-rise text-[0.7rem] font-medium tracking-[0.16em] sm:text-sm md:text-base"
          style={{ ["--rise-delay" as string]: "150ms" }}
        >
          {hero.eyebrow}
        </p>

        <h1
          className="hero-rise mt-3 font-light leading-none text-[clamp(2.75rem,13vw,9rem)] tracking-[0.06em] sm:tracking-[0.1em]"
          style={{ ["--rise-delay" as string]: "280ms" }}
        >
          {hero.title}
        </h1>

        <p
          className="hero-rise mt-3 text-base font-normal sm:mt-4 sm:text-lg md:text-xl"
          style={{ ["--rise-delay" as string]: "480ms" }}
        >
          {hero.tagline}
        </p>

        <a
          href="#contact"
          className="hero-rise mt-8 inline-flex items-center rounded-full bg-white px-8 py-4 text-[0.82rem] font-semibold tracking-[0.02em] text-black transition-transform hover:scale-[1.03] sm:text-sm"
          style={{ ["--rise-delay" as string]: "640ms" }}
        >
          Book a private consultation
        </a>
      </div>

      <div
        className="hero-fade absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/70 md:flex"
        style={{ ["--rise-delay" as string]: "900ms" }}
      >
        <span className="text-[0.65rem] tracking-[0.16em]">Scroll</span>
        <span className="relative block h-10 w-px overflow-hidden bg-white/40">
          <span className="hero-scroll-dot absolute left-0 top-0 block h-3 w-px bg-white" />
        </span>
      </div>
    </section>
  );
}
