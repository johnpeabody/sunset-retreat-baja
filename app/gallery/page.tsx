import type { Metadata } from "next";
import PhotoGallery from "@/components/PhotoGallery";
import { site } from "@/lib/site";
import { allPhotos } from "@/lib/photos";

export const metadata: Metadata = {
  title: `${site.name} — Gallery`,
  description: `Photo gallery of ${site.name}, ${site.location.label}.`,
};

export default function GalleryPage() {
  const photos = allPhotos();
  return (
    <>
      <header className="border-b border-sand">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <a href="/" className="font-serif text-2xl text-ocean">
            {site.name}
          </a>
          <a
            href="/"
            className="text-sm text-terracotta underline underline-offset-4 hover:opacity-80"
          >
            ← Back to home
          </a>
        </nav>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h1 className="text-4xl text-ocean">Gallery</h1>
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
