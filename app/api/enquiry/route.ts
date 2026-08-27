import { NextResponse } from "next/server";

/**
 * Consultation enquiry endpoint.
 *
 * For now it validates and logs the submission and returns { ok: true }.
 * Wire it to an email service / CRM (Resend, SendGrid, a Google Sheet, the
 * Noriek ERP, …) where the TODO is marked.
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
  if (!contact) errors.contact = "Contact details are required";
  if (!propertyType || !validTypes.includes(propertyType)) errors.propertyType = "Select a property type";
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Enter a valid email";

  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const enquiry = { name, contact, email: email || null, propertyType, receivedAt: new Date().toISOString() };

  // TODO: forward `enquiry` to email / CRM.
  console.log("[noriek] consultation enquiry", enquiry);

  return NextResponse.json({ ok: true });
}
