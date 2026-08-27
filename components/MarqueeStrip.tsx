import Image from "next/image";
import { marquee } from "@/lib/content";

/** Repeating 3D tilt pattern — matches the perspective "scattered tiles" look in the Figma. */
const tilt = [26, 11, 0, -11, -26];

export function MarqueeStrip() {
  const loop = [...marquee, ...marquee];

  return (
    <section
      aria-label="A selection of Noriek interiors"
      className="overflow-hidden bg-white py-10 md:py-16 [perspective:1400px]"
    >
      <div
        className="group flex w-max gap-8 pl-8 animate-marquee [transform-style:preserve-3d] hover:[animation-play-state:paused] md:gap-12 md:pl-12"
        style={{ ["--marquee-duration" as string]: "55s" }}
      >
        {loop.map((item, i) => (
          <figure
            key={i}
            style={{ transform: `rotateY(${tilt[i % tilt.length]}deg)` }}
            className="relative aspect-[3/4] w-[52vw] shrink-0 overflow-hidden rounded-card shadow-[0_30px_60px_-30px_rgba(58,51,46,0.35)] sm:w-[260px] md:w-[300px]"
          >
            <Image
              src={item.src}
              alt={i < marquee.length ? item.alt : ""}
              aria-hidden={i >= marquee.length}
              fill
              sizes="(max-width: 640px) 52vw, 300px"
              className="object-cover"
            />
          </figure>
        ))}
      </div>
    </section>
  );
}
