import type { MetadataRoute } from "next";
import { firms } from "@/data/firms/index";
import { TOOLS_DIRECTORY } from "@/data/tools";
import { validateFirmForTool } from "@/data/firmToolRequirements";
import { getAllGuides } from "@/lib/guides";

const BASE_URL = "https://propbench.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/tools`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/guides`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/survival-kit`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/refund-policy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/login`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/dashboard`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];

  // 1. Tool routes (/tools/[tool])
  for (const tool of TOOLS_DIRECTORY) {
    routes.push({
      url: `${BASE_URL}/tools/${tool.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  // 2. Firm detail routes (/firms/[slug])
  for (const firm of firms) {
    routes.push({
      url: `${BASE_URL}/firms/${firm.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  // 3. Valid Firm-Preset tool routes (/tools/[tool]/[firm])
  for (const tool of TOOLS_DIRECTORY) {
    for (const firm of firms) {
      const validation = validateFirmForTool(firm, tool.slug);
      if (validation.isValid) {
        routes.push({
          url: `${BASE_URL}/tools/${tool.slug}/${firm.slug}`,
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: 0.7,
        });
      }
    }
  }

  // 4. Guide routes (/guides/[slug])
  const guides = getAllGuides();
  for (const guide of guides) {
    routes.push({
      url: `${BASE_URL}/guides/${guide.slug}`,
      lastModified: new Date(guide.updatedDate || guide.publishedDate),
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  return routes;
}
