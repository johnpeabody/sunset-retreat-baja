"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

type Shot = { src: string; alt: string };

export default function PhotoGallery({
  photos,
  variant = "grid",
}: {
  photos: Shot[];
  variant?: "featured" | "grid";
}) {
  const [index, setIndex] = useState<number | null>(null);
  const open = index !== null;

  const close = useCallback(() => setIndex(null), []);
  const prev = useCallback(
    () =>
      setIndex((i) => (i === null ? i : (i - 1 + photos.length) % photos.length)),
    [photos.length],
  );
  const next = useCallback(
    () => setIndex((i) => (i === null ? i : (i + 1) % photos.length)),
    [photos.length],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, prev, next]);

  const gridClass =
    variant === "featured"
      ? "grid grid-cols-2 gap-4 sm:grid-cols-3"
      : "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4";

  // Featured tiles stay high quality; full-gallery thumbnails are lighter.
  const thumbQuality = variant === "featured" ? 90 : 68;
  const thumbSizes =
    variant === "featured"
      ? "(min-width: 640px) 33vw, 50vw"
      : "(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw";

  return (
    <>
      <div className={gridClass}>
        {photos.map((p, i) => (
          <button
            key={p.src}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Expand photo ${i + 1} of ${photos.length}`}
            className="group relative aspect-[3/2] cursor-zoom-in overflow-hidden rounded-xl"
          >
            <Image
              src={p.src}
              alt={p.alt}
              fill
              quality={thumbQuality}
              sizes={thumbSizes}
              className="object-cover transition duration-500 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {open && index !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 select-none"
          onClick={close}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full text-2xl text-white/80 hover:bg-white/10 hover:text-white"
          >
            ✕
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous photo"
            className="absolute left-2 flex h-12 w-12 items-center justify-center rounded-full text-4xl text-white/80 hover:bg-white/10 hover:text-white sm:left-6"
          >
            ‹
          </button>

          {/* Full-resolution original for the expanded view. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photos[index].src}
            alt={photos[index].alt}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] max-w-[92vw] object-contain shadow-2xl"
          />

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next photo"
            className="absolute right-2 flex h-12 w-12 items-center justify-center rounded-full text-4xl text-white/80 hover:bg-white/10 hover:text-white sm:right-6"
          >
            ›
          </button>

          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-sm text-white/70">
            {index + 1} / {photos.length}
          </div>
        </div>
      )}
    </>
  );
}
