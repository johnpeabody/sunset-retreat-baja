// Single source of truth for all property content.
// Change the name, copy, pricing, photos, etc. here.

export const site = {
  name: "Sunset Retreat",
  tagline: "Oceanfront living, 45 minutes south of San Diego",
  lede: "A modern coastal retreat perched above the Pacific, where the living room opens completely onto an expansive deck and the surf breaks on the rocks just below.",

  // Full description, paragraph by paragraph.
  story: [
    "Set along a pristine stretch of Baja coastline, just 45 minutes south of San Diego, Sunset Retreat frames the Pacific through floor-to-ceiling windows and a living room that opens entirely onto a sprawling deck. Sea breezes move through the open-plan living spaces, and the sound of waves on the rocks below carries through the day.",
    "Come ashore after a morning of surfing to a private jacuzzi and a built-in fire pit — the perfect place to watch the sun drop into the water and the stars come out. Inside, modern comfort meets coastal craftsmanship: a chef's kitchen with travertine countertops and custom cabinetry, and real stone and brick archways throughout.",
    "Three bedrooms include a luxurious master suite, and a private detached casita opens onto its own landscaped courtyard with ocean views of its own. Minutes from local shops and fine dining, this is less a house than a sanctuary — where the surf is always calling and every day feels like a vacation.",
  ],

  location: {
    label: "El Descanso, Baja California, Mexico",
    blurb:
      "A 45-minute drive south of the San Diego border along the coast, near El Descanso — between Rosarito and Ensenada.",
    // Approximate coordinates for El Descanso. Set the exact spot here.
    lat: 32.205,
    lng: -116.915,
    // Public rental page shows a privacy circle of this radius (meters)
    // instead of an exact pin. Set exact=true to drop a precise marker.
    approxRadiusMeters: 900,
    exact: false,
  },

  // Rental specifics used by the booking widget.
  rental: {
    nightlyRate: 295, // USD
    cleaningFee: 120, // USD
    taxRate: 0.16, // illustrative; configured for real in Lodgify
    minNights: 2,
    maxGuests: 8,
    currency: "USD",
  },

  // For-sale brochure facts.
  sale: {
    price: "Price upon request",
    beds: "3 + casita",
    baths: "3 + casita",
    lotSize: "600 m² lot",
    interior: "2,400 sq ft",
    highlights: [
      "Direct oceanfront with unobstructed Pacific views",
      "Living room opens fully onto an expansive deck",
      "Chef's kitchen — travertine counters, custom cabinetry",
      "Real stone and brick archways throughout",
      "Full detached casita with its own bed and bath",
      "Private jacuzzi and built-in fire pit",
    ],
    // Honest, trust-building line for foreign buyers.
    ownershipNote:
      "Held in fideicomiso (Mexican bank trust), as is standard for coastal property in the restricted zone. Sale is completed through a licensed notario público. Inquiries are welcome from serious, qualified buyers.",
  },

  contact: {
    // Where booking questions go (display only).
    email: "hello@casasosiego.example",
  },
} as const;
