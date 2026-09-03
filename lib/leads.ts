// Appends a lead to a Google Sheet via an Apps Script Web App URL.
// This avoids service-account/OAuth setup — see .env.example for the
// one-time Apps Script you paste into the sheet.

export type Lead = {
  name: string;
  email: string;
  phone?: string;
  message?: string;
};

export async function appendLeadToSheet(lead: Lead): Promise<void> {
  const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!url) return; // not configured yet — skip silently

  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...lead, receivedAt: new Date().toISOString() }),
  });
}
