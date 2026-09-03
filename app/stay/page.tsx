import type { Metadata } from "next";
import Image from "next/image";
import BookingWidget from "@/components/BookingWidget";
import LocationMap from "@/components/LocationMap";
import PhotoGallery from "@/components/PhotoGallery";
import { site } from "@/lib/site";
import { HERO_PHOTO, FEATURED, allPhotos } from "@/lib/photos";

// Rental landing — built but not exposed for now. Unlinked + not indexed.
export const metadata: Metadata = {
  title: `${site.name} — Vacation Rental`,
  robots: { index: false, follow: false },
};

const amenities = [
  "Direct oceanfront",
  "Living room opens to a full-width deck",
  "Private jacuzzi",
  "Built-in fire pit",
  "Chef's kitchen, travertine counters",
  "Stone & brick archways",
  "3 bedrooms incl. master suite",
  "Detached casita with courtyard",
];

export default function StayPage() {
  const totalPhotos = allPhotos().length;
  return (
    <>
      {/* Header */}
      <header className="absolute inset-x-0 top-0 z-20">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 text-white">
          <span className="font-serif text-2xl">{site.name}</span>
          <div className="hidden items-center gap-8 text-sm sm:flex">
            <a href="#story" className="hover:text-sand">
              The Home
            </a>
            <a href="/gallery" className="hover:text-sand">
              Gallery
            </a>
            <a href="#location" className="hover:text-sand">
              Location
            </a>
            <a
              href="#book"
              className="rounded-full bg-white/15 px-4 py-2 ring-1 ring-white/30 backdrop-blur hover:bg-white/25"
            >
              Book now
            </a>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative flex min-h-screen items-center justify-center">
        <Image
          src={HERO_PHOTO}
          alt="Sunset Retreat — living room opening through a stone arch onto the ocean-view deck at dusk"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative mx-auto max-w-3xl px-6 text-center text-white">
          <p className="text-sm uppercase tracking-[0.3em] text-white/80">
            {site.location.label}
          </p>
          <h1 className="mt-4 text-5xl leading-tight sm:text-7xl">
            {site.name}
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/90">
            {site.lede}
          </p>
          <a
            href="#book"
            className="mt-10 inline-block rounded-full bg-terracotta px-8 py-3 font-medium text-white transition hover:opacity-90"
          >
            Check availability
          </a>
        </div>
      </section>

      {/* Story */}
      <section id="story" className="mx-auto max-w-3xl px-6 py-24">
        <h2 className="text-center text-4xl text-ocean">{site.tagline}</h2>
        <div className="mt-8 space-y-6 text-lg leading-relaxed text-foreground/90">
          {site.story.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="bg-sand/40 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-4xl text-ocean">Gallery</h2>
            <a
              href="/gallery"
              className="text-sm font-medium text-terracotta underline underline-offset-4 hover:opacity-80"
            >
              View all {totalPhotos} photos →
            </a>
          </div>
          <div className="mt-10">
            <PhotoGallery photos={FEATURED} variant="featured" />
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="text-4xl text-ocean">The details</h2>
        <ul className="mt-10 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
          {amenities.map((a) => (
            <li
              key={a}
              className="flex items-center gap-3 border-b border-sand py-3 text-lg"
            >
              <span className="text-terracotta">—</span>
              {a}
            </li>
          ))}
        </ul>
      </section>

      {/* Location */}
      <section id="location" className="bg-sand/40 py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2">
          <div>
            <h2 className="text-4xl text-ocean">Where you&apos;ll be</h2>
            <p className="mt-6 text-lg leading-relaxed text-foreground/90">
              {site.location.blurb}
            </p>
          </div>
          <LocationMap className="aspect-[4/3] w-full overflow-hidden rounded-xl" />
        </div>
      </section>

      {/* Booking */}
      <section id="book" className="mx-auto max-w-2xl px-6 py-24">
        <h2 className="text-center text-4xl text-ocean">Book your stay</h2>
        <p className="mx-auto mt-4 max-w-md text-center text-muted">
          Choose your dates to see live availability and pricing.
        </p>
        <div className="mt-10">
          <BookingWidget />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-ocean py-12 text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
          <span className="font-serif text-2xl">{site.name}</span>
          <p className="text-sm text-white/70">{site.location.label}</p>
          <a
            href={`mailto:${site.contact.email}`}
            className="text-sm text-white/70 hover:text-white"
          >
            {site.contact.email}
          </a>
        </div>
      </footer>
    </>
  );
}
