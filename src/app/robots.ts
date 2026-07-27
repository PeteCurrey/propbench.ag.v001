import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/kitchen-sink", "/dashboard", "/api"],
      },
    ],
    sitemap: "https://propbench.com/sitemap.xml",
  };
}
