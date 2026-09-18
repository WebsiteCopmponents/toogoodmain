import { NextRequest, NextResponse } from "next/server";

type BookingPayload = {
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  phone: string;
  pages: string;
  uiStyle: string;
  logo: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  notes: string;
  pickPlan: string;
  billing: string;
  planName: string;
  planPrice: string;
};

const HOSTINGER_API_BASE = "https://api.mail.hostinger.com/api/v1";

async function getHostingerMailboxResourceId(token: string, fromEmail: string) {
  const response = await fetch(`${HOSTINGER_API_BASE}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error(`Hostinger /me failed (${response.status}): ${await response.text()}`);
  }

  const body = await response.json();
  const mailbox = body.data.mailboxes.find(
    (m: { resourceId: string; address: string }) => m.address.toLowerCase() === fromEmail.toLowerCase()
  );

  if (!mailbox) {
    throw new Error(`Hostinger token has no access to mailbox ${fromEmail}`);
  }

  return mailbox.resourceId as string;
}

async function sendHostingerEmail(booking: BookingPayload) {
  const token = process.env.HOSTINGER_API_TOKEN;
  const fromEmail = process.env.HOSTINGER_FROM_EMAIL;
  const toEmail = process.env.BOOKINGS_NOTIFY_EMAIL;

  if (!token || !fromEmail || !toEmail) {
    throw new Error("Hostinger email skipped: missing HOSTINGER_API_TOKEN / HOSTINGER_FROM_EMAIL / BOOKINGS_NOTIFY_EMAIL");
  }

  const mailboxResourceId =
    process.env.HOSTINGER_MAIL_MAILBOX_ID || (await getHostingerMailboxResourceId(token, fromEmail));

  const response = await fetch(`${HOSTINGER_API_BASE}/mailboxes/${mailboxResourceId}/send`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to: [toEmail],
      subject: `New booking: ${booking.name || `${booking.firstName} ${booking.lastName}`.trim()}`,
      text: [
        `Name: ${booking.name || `${booking.firstName} ${booking.lastName}`.trim()}`,
        `Email: ${booking.email}`,
        `Phone: ${booking.phone}`,
        `Pages: ${booking.pages}`,
        `UI: ${booking.uiStyle}`,
        `Logo: ${booking.logo}`,
        `Service: ${booking.service}`,
        `Preferred: ${booking.preferredDate} ${booking.preferredTime}`,
        `Message: ${booking.notes}`,
        `Pick a plan: ${booking.pickPlan}`,
        `Billing: ${booking.billing}`,
        `Plan: ${booking.planName} ${booking.planPrice}`.trim(),
      ].join("\n"),
    }),
  });

  // Hostinger's send endpoint returns 204 No Content on success.
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Hostinger email failed (${response.status}): ${body}`);
  }
}

async function appendToSheet(booking: BookingPayload) {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!webhookUrl) {
    throw new Error("Sheets sync skipped: missing GOOGLE_SHEETS_WEBHOOK_URL");
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(booking),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Sheets sync failed (${response.status}): ${body}`);
  }
}

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({ status: "ok" });
}

export async function POST(request: NextRequest) {
  const data = await request.json();

  const name = String(data.name ?? data.firstName ?? "").trim();
  const booking: BookingPayload = {
    firstName: name,
    lastName: String(data.lastName ?? ""),
    name,
    email: String(data.email ?? ""),
    phone: String(data.phone ?? ""),
    pages: String(data.pages ?? "1"),
    uiStyle: String(data.uiStyle ?? data.ui ?? ""),
    logo: String(data.logo ?? "Will discuss on the call"),
    service: String(data.service ?? ""),
    preferredDate: String(data.preferredDate ?? data.date ?? ""),
    preferredTime: String(data.preferredTime ?? data.time ?? ""),
    notes: String(data.notes ?? data.message ?? ""),
    pickPlan: String(data.pickPlan ?? data.wantPlan ?? ""),
    billing: String(data.billing ?? ""),
    planName: String(data.planName ?? ""),
    planPrice: String(data.planPrice ?? ""),
  };

  if (!booking.name || !booking.email) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const results = await Promise.allSettled([sendHostingerEmail(booking), appendToSheet(booking)]);

  const failures = results.filter((r) => r.status === "rejected") as PromiseRejectedResult[];
  failures.forEach((f) => console.error(f.reason));

  if (failures.length === results.length) {
    return NextResponse.json({ error: "Booking could not be delivered" }, { status: 502 });
  }

  return NextResponse.json({ status: "ok" });
}
