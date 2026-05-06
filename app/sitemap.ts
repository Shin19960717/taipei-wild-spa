import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.taipeiwildspa.com";

  const langs = ["zh", "en", "ja", "ko"];

  const routes = ["", "/team", "/service"];

  const sitemapEntries = [];

  for (const lang of langs) {
    for (const route of routes) {
      sitemapEntries.push({
        url: `${baseUrl}/${lang}${route}`,
        lastModified: new Date(),
      });
    }
  }

  return sitemapEntries;
}