// Email via Resend's REST API (no SDK dependency).
import type { Lead } from "./leads";
import { site } from "./site";

const RESEND_URL = "https://api.resend.com/emails";

async function send(payload: {
  from: string;
  to: string;
  subject: string;
  html: string;
  reply_to?: string;
}): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return; // not configured yet — skip silently
  await fetch(RESEND_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}

const FROM = process.env.MAIL_FROM ?? "Sunset Retreat <onboarding@resend.dev>";

export async function notifyOwner(lead: Lead): Promise<void> {
  const to = process.env.OWNER_EMAIL;
  if (!to) return;
  await send({
    from: FROM,
    to,
    reply_to: lead.email,
    subject: `New sale inquiry — ${lead.name}`,
    html: `
      <h2>New inquiry for ${site.name}</h2>
      <p><strong>Name:</strong> ${lead.name}</p>
      <p><strong>Email:</strong> ${lead.email}</p>
      <p><strong>Phone:</strong> ${lead.phone || "—"}</p>
      <p><strong>Message:</strong><br/>${lead.message || "—"}</p>
    `,
  });
}

export async function autoReplyToBuyer(lead: Lead): Promise<void> {
  await send({
    from: FROM,
    to: lead.email,
    subject: `Thanks for your interest in ${site.name}`,
    html: `
      <p>Hi ${lead.name},</p>
      <p>Thank you for your interest in ${site.name}. We've received your
      inquiry and will be in touch within 24 hours.</p>
      <p>Warm regards,<br/>${site.name}</p>
    `,
  });
}
