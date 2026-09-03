"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export default function InquiryForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    try {
      const res = await fetch("/api/sale-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Something went wrong.");
      }
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-sand-deep bg-white p-8 text-center">
        <h3 className="text-2xl text-ocean">Thank you</h3>
        <p className="mt-3 text-muted">
          Your inquiry has been received. We&apos;ll be in touch within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-sand-deep bg-white p-6 shadow-sm sm:p-8"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="text-muted">Name</span>
          <input
            name="name"
            required
            className="mt-1 w-full rounded-lg border border-sand-deep bg-background px-3 py-2"
          />
        </label>
        <label className="block text-sm">
          <span className="text-muted">Email</span>
          <input
            name="email"
            type="email"
            required
            className="mt-1 w-full rounded-lg border border-sand-deep bg-background px-3 py-2"
          />
        </label>
      </div>
      <label className="mt-4 block text-sm">
        <span className="text-muted">Phone (optional)</span>
        <input
          name="phone"
          type="tel"
          className="mt-1 w-full rounded-lg border border-sand-deep bg-background px-3 py-2"
        />
      </label>
      <label className="mt-4 block text-sm">
        <span className="text-muted">Message</span>
        <textarea
          name="message"
          rows={4}
          placeholder="Tell us a little about what you're looking for."
          className="mt-1 w-full rounded-lg border border-sand-deep bg-background px-3 py-2"
        />
      </label>

      {status === "error" && (
        <p className="mt-4 text-sm text-terracotta">{error}</p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 w-full rounded-lg bg-ocean py-3 font-medium text-white transition hover:bg-ocean-soft disabled:opacity-50"
      >
        {status === "sending" ? "Sending…" : "Request information"}
      </button>
    </form>
  );
}
