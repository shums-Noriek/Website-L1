import { NextResponse } from "next/server";

/**
 * Consultation enquiry endpoint.
 *
 * Validates the submission, then appends it to the Noriek Google Sheet via a
 * Google Apps Script web-app webhook (unchanged — this stays the record of
 * truth for the sheet), and separately drops the same enquiry into the ERP's
 * pipeline as a new lead, so it shows up in the New Lead lane without anyone
 * re-typing it from the sheet.
 *
 *   SHEETS_WEBHOOK_URL = https://script.google.com/macros/s/XXXX/exec
 *   ERP_WEBHOOK_URL    = https://api-production-4866.up.railway.app/api/webhooks/landing-page
 *
 * (Add both in Vercel → Project → Settings → Environment Variables, then
 * redeploy.) Either can be left unset and the form keeps working — the
 * enquiry is still validated and logged either way. The two writes are
 * independent: a failure on one never blocks or is masked by the other, and
 * neither blocks the visitor's success response — this endpoint's job is to
 * accept the enquiry, not to wait on either downstream system.
 */
const PROPERTY_TYPE_TO_ERP: Record<string, string> = {
  Villa: "Villa",
  Apartment: "Apartment",
  "Independent House": "Independent House",
  // The ERP's option list spells this with a space; the site's doesn't.
  Penthouse: "Pent House",
};
export async function POST(request: Request) {
  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body" }, { status: 400 });
  }

  const name = String(data.name ?? "").trim();
  const contact = String(data.contact ?? "").trim();
  const email = String(data.email ?? "").trim();
  const propertyType = String(data.propertyType ?? "").trim();

  const validTypes = ["Villa", "Apartment", "Independent House", "Penthouse"];
  const errors: Record<string, string> = {};
  if (!name) errors.name = "Name is required";
  if (!contact) errors.contact = "Contact number is required";
  else if (!/^\d{10}$/.test(contact)) errors.contact = "Enter a valid 10-digit number";
  if (!propertyType || !validTypes.includes(propertyType)) errors.propertyType = "Select a property type";
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Enter a valid email";

  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const enquiry = {
    name,
    contact,
    email: email || "",
    propertyType,
    receivedAt: new Date().toISOString(),
  };

  // ERP dump — independent of the sheet write below: it never blocks the
  // visitor's response, and a failure here is only ever logged, never
  // surfaced as an error to whoever's filling in the form.
  const erpWebhook = process.env.ERP_WEBHOOK_URL;
  if (erpWebhook) {
    try {
      const res = await fetch(erpWebhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone: contact,
          email: email || undefined,
          projectType: PROPERTY_TYPE_TO_ERP[propertyType] ?? propertyType,
        }),
      });
      if (!res.ok) {
        console.error("[noriek] ERP webhook returned", res.status, await res.text().catch(() => ""));
      }
    } catch (err) {
      console.error("[noriek] ERP webhook failed", err);
    }
  } else {
    console.log("[noriek] consultation enquiry (no ERP_WEBHOOK_URL set)", enquiry);
  }

  const webhook = process.env.SHEETS_WEBHOOK_URL;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(enquiry),
      });
      if (!res.ok) {
        console.error("[noriek] sheet webhook returned", res.status);
        return NextResponse.json({ ok: false, error: "Could not record enquiry" }, { status: 502 });
      }
    } catch (err) {
      console.error("[noriek] sheet webhook failed", err);
      return NextResponse.json({ ok: false, error: "Could not record enquiry" }, { status: 502 });
    }
  } else {
    console.log("[noriek] consultation enquiry (no SHEETS_WEBHOOK_URL set)", enquiry);
  }

  return NextResponse.json({ ok: true });
}
