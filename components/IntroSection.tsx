import { intro } from "@/lib/content";
import { Reveal } from "@/components/Reveal";

export function IntroSection() {
  const bodyParts = intro.body.split(intro.emphasis);

  return (
    <section className="bg-white py-20 md:py-32">
      <Reveal group className="shell grid gap-10 md:grid-cols-2 md:gap-16">
        <h2 className="leading-[0.95] tracking-[-0.03em] text-ink">
          <span className="block text-[clamp(2.25rem,5.6vw,4.25rem)] font-light">{intro.script}</span>
          <span className="mt-1 block text-[clamp(2.25rem,5.6vw,4.25rem)] font-bold">
            {intro.heading.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </span>
        </h2>

        <p className="copy-caps dropcap max-w-[42ch] self-center md:text-[1.05rem]">
          {bodyParts[0]}
          <strong className="font-bold">{intro.emphasis}</strong>
          {bodyParts[1]}
        </p>
      </Reveal>
    </section>
  );
}
