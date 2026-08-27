"use client";

import { useEffect, useState } from "react";
import { nav } from "@/lib/content";

const allLinks = [...nav.left, ...nav.right];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const linkColor = scrolled ? "text-ink" : "text-cream-nav";

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* dark scrim over the hero, fades out once scrolled */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 top-0 h-[160px] bg-gradient-to-b from-black/70 to-transparent transition-opacity duration-500 ${
          scrolled ? "opacity-0" : "opacity-100"
        }`}
      />
      <div
        className={`absolute inset-0 border-b transition-all duration-500 ${
          scrolled ? "bg-cream/95 border-ink/10 backdrop-blur-md" : "bg-transparent border-transparent"
        }`}
      />

      <nav className="shell relative flex h-[92px] items-center justify-between">
        {/* desktop: left links */}
        <ul className={`hidden flex-1 items-center gap-8 text-[0.78rem] font-semibold uppercase tracking-nav lg:flex ${linkColor}`}>
          {nav.left.map((l) => (
            <li key={l.label}>
              <a href={l.href} className="transition-opacity hover:opacity-60">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* wordmark */}
        <a
          href="#top"
          aria-label="Noriek — home"
          className={`relative z-10 shrink-0 text-[1.3rem] font-bold uppercase tracking-[0.34em] transition-colors md:text-[1.55rem] ${
            scrolled ? "text-black" : "text-white"
          }`}
        >
          Noriek
        </a>

        {/* desktop: right links */}
        <ul className={`hidden flex-1 items-center justify-end gap-8 text-[0.78rem] font-semibold uppercase tracking-nav lg:flex ${linkColor}`}>
          {nav.right.map((l) => (
            <li key={l.label}>
              <a href={l.href} className="transition-opacity hover:opacity-60">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* mobile: menu toggle */}
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className={`relative z-10 flex h-10 w-10 flex-col items-center justify-center gap-[5px] lg:hidden ${linkColor}`}
        >
          <span className={`h-px w-6 bg-current transition-transform ${menuOpen ? "translate-y-[6px] rotate-45" : ""}`} />
          <span className={`h-px w-6 bg-current transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`h-px w-6 bg-current transition-transform ${menuOpen ? "-translate-y-[6px] -rotate-45" : ""}`} />
        </button>
      </nav>

      {/* mobile menu — CSS slide/fade */}
      <div
        className={`absolute inset-x-0 top-0 origin-top bg-cream px-[var(--shell-pad)] pb-10 pt-28 transition-[opacity,transform] duration-300 ease-out lg:hidden ${
          menuOpen ? "pointer-events-auto opacity-100 translate-y-0" : "pointer-events-none -translate-y-3 opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-6 text-lg font-semibold uppercase tracking-nav text-ink">
          {allLinks.map((l) => (
            <li key={l.label}>
              <a href={l.href} onClick={() => setMenuOpen(false)}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
