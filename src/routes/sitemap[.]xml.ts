import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { SERVICE_SLUGS } from "./services.$slug";
import { TRIP_ROUTE_SLUGS } from "@/lib/trip-routes";

const BASE_URL = "https://www.gmcabsservices.com";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: { path: string; priority: string }[] = [
          { path: "/", priority: "1.0" },
          { path: "/routes", priority: "0.8" },
          ...SERVICE_SLUGS.map((s) => ({ path: `/services/${s}`, priority: "0.7" })),
          ...TRIP_ROUTE_SLUGS.map((s) => ({ path: `/routes/${s}`, priority: "0.7" })),
        ];
        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...entries.map(
            (e) =>
              `  <url><loc>${BASE_URL}${e.path}</loc><changefreq>weekly</changefreq><priority>${e.priority}</priority></url>`,
          ),
          `</urlset>`,
        ].join("\n");
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
