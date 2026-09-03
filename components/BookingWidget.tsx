"use client";

import { useMemo, useState } from "react";
import { site } from "@/lib/site";

const MODE = process.env.NEXT_PUBLIC_BOOKING_MODE ?? "mock";

// Simulated unavailable ranges — stands in for Airbnb/VRBO-synced dates.
// In live mode, Lodgify owns real availability.
const BLOCKED: Array<{ from: string; to: string }> = [
  { from: "2026-06-12", to: "2026-06-16" },
  { from: "2026-07-03", to: "2026-07-07" },
  { from: "2026-08-20", to: "2026-08-25" },
];

function parseDate(s: string): Date | null {
  if (!s) return null;
  const [y, m, d] = s.split("-").map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
}

function nightsBetween(a: Date, b: Date): number {
  return Math.round((b.getTime() - a.getTime()) / 86_400_000);
}

function overlapsBlocked(checkIn: Date, checkOut: Date): boolean {
  return BLOCKED.some((r) => {
    const from = parseDate(r.from)!;
    const to = parseDate(r.to)!;
    return checkIn < to && checkOut > from;
  });
}

function money(n: number): string {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: site.rental.currency,
    maximumFractionDigits: 0,
  });
}

export default function BookingWidget() {
  if (MODE === "live") {
    return <LodgifyEmbed />;
  }
  return <MockBooking />;
}

function LodgifyEmbed() {
  // When the owner activates Lodgify, paste the booking-box embed here
  // (Settings → Website → Booking widget). Set NEXT_PUBLIC_BOOKING_MODE=live.
  return (
    <div className="rounded-2xl border border-sand-deep bg-white p-8 text-center">
      <p className="text-muted">
        Live booking is enabled. Drop the Lodgify booking-box embed into{" "}
        <code className="font-mono text-sm">components/BookingWidget.tsx</code>.
      </p>
    </div>
  );
}

function MockBooking() {
  const { nightlyRate, cleaningFee, taxRate, minNights, maxGuests } =
    site.rental;
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [submitted, setSubmitted] = useState(false);

  const today = new Date().toISOString().slice(0, 10);

  const result = useMemo(() => {
    const ci = parseDate(checkIn);
    const co = parseDate(checkOut);
    if (!ci || !co) return { state: "incomplete" as const };
    const nights = nightsBetween(ci, co);
    if (nights <= 0)
      return { state: "error" as const, msg: "Check-out must be after check-in." };
    if (nights < minNights)
      return {
        state: "error" as const,
        msg: `Minimum stay is ${minNights} nights.`,
      };
    if (overlapsBlocked(ci, co))
      return {
        state: "error" as const,
        msg: "Those dates aren't available — try different nights.",
      };
    const lodging = nights * nightlyRate;
    const taxes = Math.round((lodging + cleaningFee) * taxRate);
    const total = lodging + cleaningFee + taxes;
    return {
      state: "ok" as const,
      nights,
      lodging,
      taxes,
      total,
    };
  }, [checkIn, checkOut, nightlyRate, cleaningFee, taxRate, minNights]);

  if (submitted && result.state === "ok") {
    return (
      <div className="rounded-2xl border border-sand-deep bg-white p-8">
        <h3 className="text-2xl text-ocean">Request received</h3>
        <p className="mt-3 text-muted">
          Thanks! This is a preview booking — no payment was taken. Once Lodgify
          is connected, guests will confirm and pay right here.
        </p>
        <dl className="mt-5 space-y-1 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted">Dates</dt>
            <dd>
              {checkIn} → {checkOut} ({result.nights} nights)
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted">Guests</dt>
            <dd>{guests}</dd>
          </div>
          <div className="flex justify-between font-medium">
            <dt>Total</dt>
            <dd>{money(result.total)}</dd>
          </div>
        </dl>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-6 text-sm text-terracotta underline underline-offset-4"
        >
          Start over
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-sand-deep bg-white p-6 shadow-sm sm:p-8">
      <div className="flex items-baseline justify-between">
        <p className="text-2xl text-ocean">
          {money(nightlyRate)}
          <span className="text-base text-muted"> / night</span>
        </p>
        <span className="rounded-full bg-sand px-3 py-1 text-xs uppercase tracking-wide text-muted">
          Preview
        </span>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="text-muted">Check in</span>
          <input
            type="date"
            min={today}
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="mt-1 w-full rounded-lg border border-sand-deep bg-background px-3 py-2"
          />
        </label>
        <label className="block text-sm">
          <span className="text-muted">Check out</span>
          <input
            type="date"
            min={checkIn || today}
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="mt-1 w-full rounded-lg border border-sand-deep bg-background px-3 py-2"
          />
        </label>
      </div>

      <label className="mt-4 block text-sm">
        <span className="text-muted">Guests</span>
        <select
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          className="mt-1 w-full rounded-lg border border-sand-deep bg-background px-3 py-2"
        >
          {Array.from({ length: maxGuests }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>
              {n} {n === 1 ? "guest" : "guests"}
            </option>
          ))}
        </select>
      </label>

      {result.state === "error" && (
        <p className="mt-4 text-sm text-terracotta">{result.msg}</p>
      )}

      {result.state === "ok" && (
        <dl className="mt-5 space-y-2 border-t border-sand pt-4 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted">
              {money(nightlyRate)} × {result.nights} nights
            </dt>
            <dd>{money(result.lodging)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted">Cleaning fee</dt>
            <dd>{money(cleaningFee)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted">Taxes</dt>
            <dd>{money(result.taxes)}</dd>
          </div>
          <div className="flex justify-between border-t border-sand pt-2 text-base font-medium">
            <dt>Total</dt>
            <dd>{money(result.total)}</dd>
          </div>
        </dl>
      )}

      <button
        disabled={result.state !== "ok"}
        onClick={() => setSubmitted(true)}
        className="mt-6 w-full rounded-lg bg-ocean py-3 font-medium text-white transition hover:bg-ocean-soft disabled:cursor-not-allowed disabled:opacity-40"
      >
        Request to book
      </button>
      <p className="mt-3 text-center text-xs text-muted">
        Preview only — no payment is taken. Real bookings run through Lodgify.
      </p>
    </div>
  );
}
