import { NextResponse } from "next/server";
import { appendLeadToSheet, type Lead } from "@/lib/leads";
import { notifyOwner, autoReplyToBuyer } from "@/lib/email";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (!name || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Please provide your name and a valid email." },
      { status: 400 },
    );
  }

  const lead: Lead = { name, email, phone, message };

  // Fallback so the flow works end-to-end before keys are configured.
  console.log("[sale-inquiry] lead received:", lead);

  // Fire the integrations; don't fail the request if one is misconfigured.
  const results = await Promise.allSettled([
    appendLeadToSheet(lead),
    notifyOwner(lead),
    autoReplyToBuyer(lead),
  ]);
  results.forEach((r, i) => {
    if (r.status === "rejected") {
      console.error(`[sale-inquiry] step ${i} failed:`, r.reason);
    }
  });

  return NextResponse.json({ ok: true });
}
