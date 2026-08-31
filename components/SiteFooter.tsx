import { footer } from "@/lib/content";

const icons: Record<string, JSX.Element> = {
  phone: (
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
  ),
  mail: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 6-10 7L2 6" />
    </>
  ),
  instagram: (
    <>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </>
  ),
  facebook: (
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  ),
  linkedin: (
    <>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </>
  ),
};

export function SiteFooter() {
  return (
    <footer className="bg-black text-white">
      <div className="shell grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr] md:py-20">
        <div>
          <p className="text-xl font-bold uppercase tracking-[0.34em] text-white">Noriek</p>
          <address className="mt-6 not-italic text-sm leading-relaxed text-white/60">
            {footer.address.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
        </div>

        {footer.columns.map((col) => (
          <div key={col.title}>
            <p className="text-lg font-normal">{col.title}</p>
            <ul className="mt-3 space-y-2 text-white/60">
              {col.links.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-base transition-colors hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <p className="text-lg font-semibold">Follow Us</p>
          <ul className="mt-4 flex gap-3">
            {footer.social.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/25 text-white/80 transition-colors hover:border-white hover:text-white"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    {icons[s.icon]}
                  </svg>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-6 space-y-2.5 text-sm text-white/60">
            {[
              { ...footer.contact.phone, icon: "phone" },
              { ...footer.contact.email, icon: "mail" },
            ].map((c) => (
              <a
                key={c.href}
                href={c.href}
                className="flex items-center gap-2.5 transition-colors hover:text-white"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0"
                >
                  {icons[c.icon]}
                </svg>
                <span>{c.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="shell">
        <div className="border-t border-white/15 py-6 text-center text-xs text-white/50">{footer.legal}</div>
      </div>
    </footer>
  );
}
