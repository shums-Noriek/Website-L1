"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ElementType, type ReactNode } from "react";

/** useLayoutEffect on the client, useEffect on the server (avoids the SSR warning). */
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /** Stagger direct children instead of revealing the block as one. */
  group?: boolean;
  /** Extra delay in ms before this block reveals. */
  delay?: number;
};

/**
 * Scroll-triggered fade-up.
 *
 * The element renders visible until this component has mounted and confirmed
 * it can animate. Then it hides and waits for the element to actually reach
 * the viewport (IntersectionObserver, backed by a scroll/resize check) before
 * revealing — so the animation plays *while the visitor is looking at it*,
 * not silently off-screen. A long timeout is the last-resort safety net.
 */
export function Reveal({ children, className, as, group, delay = 0 }: RevealProps) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement>(null);
  const [armed, setArmed] = useState(false);
  const [shown, setShown] = useState(false);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      typeof IntersectionObserver === "undefined"
    ) {
      setShown(true);
      return;
    }
    setArmed(true);
    // Already on screen at mount → reveal on the next frame.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9 && rect.bottom > 0) {
      const raf = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(raf);
    }
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !armed || shown) return;

    let done = false;
    const reveal = () => {
      if (done) return;
      done = true;
      setShown(true);
      cleanup();
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) reveal();
      },
      { threshold: 0, rootMargin: "0px 0px -12% 0px" },
    );
    io.observe(el);

    // Backup: some environments throttle IO — check the rect on scroll/resize too.
    const check = () => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.88 && r.bottom > 0) reveal();
    };
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check, { passive: true });

    // Absolute last resort so content is never permanently hidden.
    const t = window.setTimeout(reveal, 6000 + delay);

    function cleanup() {
      io.disconnect();
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
      window.clearTimeout(t);
    }
    return cleanup;
  }, [armed, shown, delay]);

  return (
    <Tag
      ref={ref}
      data-reveal={armed ? (group ? "group" : "on") : "off"}
      data-shown={shown ? "true" : "false"}
      className={className}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
