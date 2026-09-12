import type { Express } from "express";

const STATIC_ROUTES = [
  "/",
  "/discover",
  "/brief",
  "/board",
  "/shop",
  "/ai-studio",
  "/membership",
  "/join",
  "/terms",
  "/privacy",
];

export function registerSeoRoutes(app: Express) {
  app.get("/robots.txt", (_req, res) => {
    const host = _req.get("host") ?? "sura.local";
    const origin = `${_req.protocol}://${host}`;
    res
      .type("text/plain")
      .send(
        [
          "User-agent: *",
          "Allow: /",
          "Disallow: /api/",
          "Disallow: /admin",
          "Disallow: /account",
          "Disallow: /checkout",
          "Disallow: /orders",
          "Disallow: /company",
          "Disallow: /edit-studio",
          "Disallow: /aesthetics",
          "Disallow: /offers",
          `Sitemap: ${origin}/sitemap.xml`,
          "",
        ].join("\n")
      );
  });

  app.get("/sitemap.xml", (_req, res) => {
    const host = _req.get("host") ?? "sura.local";
    const origin = `${_req.protocol}://${host}`;
    const today = new Date().toISOString().slice(0, 10);
    const urls = STATIC_ROUTES.map(
      (route) =>
        `  <url><loc>${origin}${route}</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq></url>`
    ).join("\n");
    res
      .type("application/xml")
      .send(
        [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
          urls,
          "</urlset>",
          "",
        ].join("\n")
      );
  });
}