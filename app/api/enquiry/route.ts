import { NextResponse } from "next/server";

/**
 * Consultation enquiry endpoint.
 *
 * Validates the submission, then appends it to the Noriek Google Sheet via a
 * Google Apps Script web-app webhook. Set the webhook URL in the environment:
 *
 *   SHEETS_WEBHOOK_URL = https://script.google.com/macros/s/XXXX/exec
 *
 * (Add it in Vercel → Project → Settings → Environment Variables, then redeploy.)
 * If the variable is not set the enquiry is still validated and logged, so the
 * form keeps working while the sheet is being wired up.
 */
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
