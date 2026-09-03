import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PhotoGallery from "@/components/PhotoGallery";
import { site } from "@/lib/site";
import { allPhotos } from "@/lib/photos";

// Same secret token as the sale page — from SALE_PAGE_TOKEN env only.
const TOKEN = process.env.SALE_PAGE_TOKEN;

export const metadata: Metadata = {
  title: `${site.name} — Gallery`,
  robots: { index: false, follow: false },
};

export default async function SaleGalleryPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  if (!TOKEN || token !== TOKEN) notFound();

  const photos = allPhotos();
  return (
    <>
      <header className="border-b border-sand">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <span className="font-serif text-2xl text-ocean">{site.name}</span>
          <a
            href={`/sale/${token}`}
            className="text-sm text-terracotta underline underline-offset-4 hover:opacity-80"
          >
            ← Back to listing
          </a>
        </nav>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h1 className="text-4xl text-ocean">Full gallery</h1>
        <p className="mt-2 text-sm text-muted">
          {photos.length} photos · click any image to expand
        </p>
        <div className="mt-8">
          <PhotoGallery photos={photos} variant="grid" />
        </div>
      </section>

      <footer className="bg-ocean py-10 text-center text-sm text-white/70">
        {site.name} · {site.location.label}
      </footer>
    </>
  );
}
