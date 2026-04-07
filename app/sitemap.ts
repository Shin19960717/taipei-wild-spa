import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.taipeiwildspa.com";

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/team`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/service`,
      lastModified: new Date(),
    },

    // 多語言版本（很重要）
    {
      url: `${baseUrl}/?lang=zh`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/?lang=en`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/?lang=ja`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/?lang=ko`,
      lastModified: new Date(),
    },
  ];
}