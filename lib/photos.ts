import fs from "node:fs";
import path from "node:path";

// THE highlight photo (MAIN prefix in Primary/).
export const HERO_PHOTO = "/photos/Primary/MAINP8190012-2-10.jpg";

// A strong secondary hero used on the for-sale page for variety.
export const SALE_HERO_PHOTO = "/photos/Primary/P8190135-HDR-33.jpg";

export type Shot = { src: string; alt: string };

// Curated highlights featured on the main pages (15 of the best, excluding
// the hero image so nothing is shown twice). Ordered for visual variety.
export const FEATURED: Shot[] = [
  {
    src: "/photos/Primary/P8190001-2-5.jpg",
    alt: "Oceanfront deck at dusk with string lights, dining, jacuzzi and fire pit",
  },
  {
    src: "/photos/Primary/MAINP8190012-2-10.jpg",
    alt: "Living room opening through a stone arch onto the ocean-view deck at dusk",
  },
  {
    src: "/photos/Primary/P8190055-HDR-16.jpg",
    alt: "Chef's kitchen with brick archways opening toward the ocean",
  },
  {
    src: "/photos/Primary/P8190008-2-60.jpg",
    alt: "Open living and dining room with travertine floors and ocean view",
  },
  {
    src: "/photos/Primary/P8190011-2-23.jpg",
    alt: "Bedroom with coastal decor and teal bedding",
  },
  {
    src: "/photos/Primary/P8190004-HDR-1.jpg",
    alt: "Living room with fireplace and stone arch opening to the deck",
  },
  {
    src: "/photos/Primary/P8190026-2-59.jpg",
    alt: "Chef's kitchen with brick arches and a center island",
  },
  {
    src: "/photos/Secondary/P8190090-HDR-29.jpg",
    alt: "Spa-style bathroom with travertine and a copper vessel sink",
  },
  {
    src: "/photos/Primary/P8190162-HDR-53.jpg",
    alt: "Living room opening onto the ocean-view deck",
  },
  {
    src: "/photos/Primary/P8190042-HDR-8.jpg",
    alt: "Dining area framed by a stone arch, kitchen beyond",
  },
  {
    src: "/photos/Secondary/P8190051-HDR-15.jpg",
    alt: "Guest bedroom with tropical artwork",
  },
  {
    src: "/photos/Primary/P8190010-2-17.jpg",
    alt: "Bathroom with copper vessel sink and stone tile",
  },
  {
    src: "/photos/Primary/P8190003-2-13.jpg",
    alt: "Casita entry courtyard at sunset",
  },
  {
    src: "/photos/Secondary/P8190048-HDR-14.jpg",
    alt: "Detached casita interior with brick arch and wet bar",
  },
  {
    src: "/photos/Secondary/P8190081-HDR-26.jpg",
    alt: "Pacific coastline and surf at sunset",
  },
  {
    src: "/photos/Primary/IMG_7536.jpg",
    alt: "Ocean-view deck with pergola and fire pit",
  },
  {
    src: "/photos/Primary/IMG_7537.jpg",
    alt: "Expansive wood deck overlooking the Pacific",
  },
  {
    src: "/photos/Primary/IMG_7535.jpg",
    alt: "Landscaped garden pathway leading to the ocean",
  },
  {
    src: "/photos/Primary/IMG_7534.jpg",
    alt: "Garden path with ocean views",
  },
];

const TIER_DIRS = ["Primary", "Secondary", "Terciary"] as const;

function listDir(tier: string): string[] {
  const dir = path.join(process.cwd(), "public", "photos", tier);
  try {
    return fs
      .readdirSync(dir)
      .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
      .sort()
      .map((f) => `/photos/${tier}/${f}`);
  } catch {
    return [];
  }
}

// Full ordered set for the for-sale page (hero first, then Primary →
// Secondary → Terciary), de-duplicated. Reads the folders at build time,
// so newly added photos appear automatically.
export function allPhotos(): Shot[] {
  const all = TIER_DIRS.flatMap(listDir);
  const ordered = [SALE_HERO_PHOTO, HERO_PHOTO, ...all];
  const seen = new Set<string>();
  return ordered
    .filter((s) => (seen.has(s) ? false : (seen.add(s), true)))
    .map((src) => ({ src, alt: "Sunset Retreat" }));
}
