"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import { site } from "@/lib/site";

export default function LocationMap({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let map: import("leaflet").Map | undefined;
    let cancelled = false;

    (async () => {
      const L = (await import("leaflet")).default;
      const el = ref.current;
      if (!el || cancelled) return;

      const { lat, lng, approxRadiusMeters, exact } = site.location;

      map = L.map(el, {
        center: [lat, lng],
        zoom: 13,
        scrollWheelZoom: false, // don't hijack page scrolling
        zoomControl: true,
        attributionControl: true,
      });

      // CARTO Voyager — clean, warm basemap (no API key required).
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
        {
          maxZoom: 19,
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        },
      ).addTo(map);

      if (exact) {
        L.circleMarker([lat, lng], {
          radius: 9,
          color: "#1f4e4f",
          fillColor: "#b8714a",
          fillOpacity: 1,
          weight: 3,
        }).addTo(map);
      } else {
        // Privacy: show an approximate area, not the exact address.
        L.circle([lat, lng], {
          radius: approxRadiusMeters,
          color: "#1f4e4f",
          fillColor: "#2c6e6f",
          fillOpacity: 0.18,
          weight: 2,
        }).addTo(map);
      }

      // Re-measure in case the container sized after init.
      setTimeout(() => map?.invalidateSize(), 0);
    })();

    return () => {
      cancelled = true;
      map?.remove();
    };
  }, []);

  return <div ref={ref} className={className} aria-label="Map of the area" />;
}
