import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import InquiryForm from "@/components/InquiryForm";
import PhotoGallery from "@/components/PhotoGallery";
import { site } from "@/lib/site";
import { SALE_HERO_PHOTO, FEATURED, allPhotos } from "@/lib/photos";

// Unlisted: reachable only at /sale/<token>. The secret token lives ONLY in
// the SALE_PAGE_TOKEN environment variable (.env.local locally, Vercel in
// production) so it never appears in source. If unset, the page 404s.
const TOKEN = process.env.SALE_PAGE_TOKEN;

// Never indexed by search engines.
export const metadata: Metadata = {
  title: `${site.name} — For Sale`,
  robots: { index: false, follow: false },
};

export default async function SalePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  if (!TOKEN || token !== TOKEN) notFound();

  const { sale } = site;
  const photos = allPhotos();
  const facts = [
    { label: "Price", value: sale.price },
    { label: "Bedrooms", value: `${sale.beds}` },
    { label: "Bathrooms", value: `${sale.baths}` },
    { label: "Lot", value: sale.lotSize },
    { label: "Interior", value: sale.interior },
    { label: "Setting", value: "Direct oceanfront" },
  ];

  return (
    <>
      {/* Minimal header — no links back to the rental site */}
      <header className="absolute inset-x-0 top-0 z-20">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6 text-white">
          <span className="font-serif text-2xl">{site.name}</span>
          <a
            href={`/sale/${token}/gallery`}
            className="text-sm hover:text-sand"
          >
            Gallery
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative flex min-h-[70vh] items-center justify-center">
        <Image
          src={SALE_HERO_PHOTO}
          alt="Sunset Retreat — oceanfront deck and pergola at sunset"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative mx-auto max-w-3xl px-6 text-center text-white">
          <span className="rounded-full bg-terracotta px-4 py-1 text-xs uppercase tracking-widest">
            For Sale — Private Listing
          </span>
          <h1 className="mt-6 text-5xl leading-tight sm:text-6xl">{site.name}</h1>
          <p className="mt-4 text-lg text-white/90">{site.location.label}</p>
        </div>
      </section>

      {/* Facts */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <dl className="grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-3">
          {facts.map((f) => (
            <div key={f.label}>
              <dt className="text-xs uppercase tracking-widest text-muted">
                {f.label}
              </dt>
              <dd className="mt-1 text-xl text-ocean">{f.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Narrative */}
      <section className="mx-auto max-w-3xl px-6 pb-16">
        <div className="space-y-6 text-lg leading-relaxed text-foreground/90">
          {site.story.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>

      {/* Gallery — featured, with a link to the full set */}
      <section className="bg-sand/40 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-3xl text-ocean">Gallery</h2>
            <a
              href={`/sale/${token}/gallery`}
              className="text-sm font-medium text-terracotta underline underline-offset-4 hover:opacity-80"
            >
              View all {photos.length} photos →
            </a>
          </div>
          <div className="mt-8">
            <PhotoGallery photos={FEATURED} variant="featured" />
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="text-3xl text-ocean">Highlights</h2>
        <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
          {sale.highlights.map((h) => (
            <li key={h} className="flex items-start gap-3 text-lg">
              <span className="mt-1 text-terracotta">—</span>
              {h}
            </li>
          ))}
        </ul>
      </section>

      {/* Ownership / trust */}
      <section className="mx-auto max-w-3xl px-6 pb-16">
        <div className="rounded-2xl border border-sand-deep bg-white p-6 text-sm leading-relaxed text-muted">
          {sale.ownershipNote}
        </div>
      </section>

      {/* Inquiry */}
      <section className="mx-auto max-w-2xl px-6 pb-24">
        <h2 className="text-center text-3xl text-ocean">Request information</h2>
        <p className="mx-auto mt-3 max-w-md text-center text-muted">
          Serious inquiries welcome. We&apos;ll respond within 24 hours.
        </p>
        <div className="mt-10">
          <InquiryForm />
        </div>
      </section>

      <footer className="bg-ocean py-10 text-center text-sm text-white/70">
        {site.name} · {site.location.label}
      </footer>
    </>
  );
}
