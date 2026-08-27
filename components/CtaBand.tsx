"use client";

import Image from "next/image";
import { useState } from "react";
import { cta } from "@/lib/content";
import { Reveal } from "@/components/Reveal";

const PROPERTY_TYPES = ["Villa", "Apartment", "Independent House", "Penthouse"];

type Status = "idle" | "submitting" | "done" | "error";

export function CtaBand() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") ?? "").trim(),
      contact: String(fd.get("contact") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      propertyType: String(fd.get("propertyType") ?? "").trim(),
    };

    const localErrors: Record<string, string> = {};
    if (!payload.name) localErrors.name = "Please enter your name";
    if (!payload.contact) localErrors.contact = "Please enter your contact details";
    if (!payload.propertyType) localErrors.propertyType = "Please select a property type";
    if (payload.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email))
      localErrors.email = "Please enter a valid email";
    if (Object.keys(localErrors).length) {
      setErrors(localErrors);
      return;
    }
    setErrors({});
    setStatus("submitting");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErrors(json.errors ?? {});
        setStatus("error");
        return;
      }
      form.reset();
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  const fieldClass =
    "w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-[0.95rem] text-black placeholder-black/40 outline-none transition-colors focus:border-black/60";

  return (
    <section id="contact" className="bg-white py-16 md:py-24">
      <div className="relative mx-auto max-w-content overflow-hidden rounded-band px-6 py-16 md:px-16 md:py-20">
        <Image src={cta.image.src} alt={cta.image.alt} fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-black/35" />

        <Reveal group className="relative mx-auto flex max-w-xl flex-col items-center text-center">
          <h2 className="text-[clamp(1.6rem,3.4vw,2.75rem)] font-bold tracking-[-0.03em] text-white">
            {cta.heading}
          </h2>

          {status === "done" ? (
            <p className="mt-8 rounded-2xl bg-white px-8 py-6 text-[0.95rem] font-medium text-black">
              Thank you. Our team will be in touch shortly to arrange your private consultation.
            </p>
          ) : (
            <form onSubmit={onSubmit} noValidate className="mt-8 w-full space-y-4 text-left">
              <div>
                <input name="name" type="text" placeholder="Name" aria-label="Name" className={fieldClass} />
                {errors.name && <p className="mt-1 text-xs font-medium text-white">{errors.name}</p>}
              </div>
              <div>
                <input
                  name="contact"
                  type="text"
                  inputMode="tel"
                  placeholder="Contact details"
                  aria-label="Contact details"
                  className={fieldClass}
                />
                {errors.contact && <p className="mt-1 text-xs font-medium text-white">{errors.contact}</p>}
              </div>
              <div>
                <input
                  name="email"
                  type="email"
                  placeholder="Email (optional)"
                  aria-label="Email (optional)"
                  className={fieldClass}
                />
                {errors.email && <p className="mt-1 text-xs font-medium text-white">{errors.email}</p>}
              </div>
              <div>
                <select name="propertyType" aria-label="Property type" defaultValue="" className={fieldClass}>
                  <option value="" disabled>
                    Property type
                  </option>
                  {PROPERTY_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                {errors.propertyType && (
                  <p className="mt-1 text-xs font-medium text-white">{errors.propertyType}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-white px-8 py-4 text-[0.72rem] font-semibold uppercase tracking-nav text-black transition-transform hover:scale-[1.02] disabled:opacity-60 sm:text-sm"
              >
                {status === "submitting" ? "Sending…" : cta.button}
              </button>
              {status === "error" && (
                <p className="text-center text-xs font-medium text-white">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
