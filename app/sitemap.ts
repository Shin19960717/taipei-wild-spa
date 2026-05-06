import { MetadataRoute } from "next";
import TEAM_MEMBERS from "@/data/teamMembers";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://taipeiwildspa.com";

  const langs = ["zh", "en", "ja", "ko"];

  const staticRoutes = [
    "",
    "/team",
    "/reviews",
  ];

  const sitemap: MetadataRoute.Sitemap = [];

  for (const lang of langs) {
    /**
     * 靜態頁面
     */
    for (const route of staticRoutes) {
      sitemap.push({
        url: `${baseUrl}/${lang}${route}`,

        lastModified: new Date(),

        changeFrequency: "daily",

        priority: route === "" ? 1 : 0.8,
      });
    }

    /**
     * 師傅個人頁
     */
    for (const member of TEAM_MEMBERS) {
      sitemap.push({
        url: `${baseUrl}/${lang}/team/${member.id}`,

        lastModified: new Date(),

        changeFrequency: "daily",

        priority: 0.7,
      });
    }
  }

  return sitemap;
}