import fs from "node:fs";
import path from "node:path";

// THE highlight photo (MAIN prefix in Primary/).
export const HERO_PHOTO = "/photos/Primary/MAINP8190012-2-10.jpg";

// A strong secondary hero used on the for-sale page for variety.
export const SALE_HERO_PHOTO = "/photos/Primary/P8190135-HDR-33.jpg";

export type Shot = { src: string; alt: string };

// Curated primary photos featured full-resolution on the main pages
// (excludes the two hero images so nothing is shown twice).
export const FEATURED: Shot[] = [
  {
    src: "/photos/Primary/P8190001-2-5.jpg",
    alt: "Oceanfront deck at dusk with string lights, dining, jacuzzi and fire pit",
  },
  {
    src: "/photos/Primary/P8190055-HDR-16.jpg",
    alt: "Chef's kitchen with brick archways opening toward the ocean",
  },
  {
    src: "/photos/Primary/P8190008-2-60.jpg",
    alt: "Open living and dining room with travertine floors",
  },
  {
    src: "/photos/Primary/P8190011-2-23.jpg",
    alt: "Guest bedroom with coastal decor",
  },
  {
    src: "/photos/Primary/P8190010-2-17.jpg",
    alt: "Bathroom with copper vessel sink and stone tile",
  },
  {
    src: "/photos/Primary/P8190003-2-13.jpg",
    alt: "Casita entry courtyard at sunset",
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
