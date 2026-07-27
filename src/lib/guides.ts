import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface GuideFrontmatter {
  title: string;
  description: string;
  slug: string;
  publishedDate: string; // ISO date YYYY-MM-DD
  updatedDate: string;
  relatedTools: string[]; // array of tool slugs, e.g. ["drawdown-calculator"]
}

export interface TocItem {
  id: string;
  text: string;
  level: number; // 2 for h2, 3 for h3
}

export interface GuideData {
  meta: GuideFrontmatter;
  content: string;
  toc: TocItem[];
}

const GUIDES_DIR = path.join(process.cwd(), "content", "guides");

/**
 * Returns all guides with parsed frontmatter, sorted by publishedDate descending.
 */
export function getAllGuides(): GuideFrontmatter[] {
  if (!fs.existsSync(GUIDES_DIR)) {
    return [];
  }

  const files = fs.readdirSync(GUIDES_DIR).filter((f) => f.endsWith(".mdx"));

  const guides = files.map((file) => {
    const filePath = path.join(GUIDES_DIR, file);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContent);

    return {
      title: data.title || "",
      description: data.description || "",
      slug: data.slug || file.replace(/\.mdx$/, ""),
      publishedDate: data.publishedDate || "2025-01-15",
      updatedDate: data.updatedDate || data.publishedDate || "2025-01-15",
      relatedTools: data.relatedTools || [],
    } as GuideFrontmatter;
  });

  return guides.sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());
}

/**
 * Extract H2 and H3 headings from markdown raw string to construct Table of Contents.
 */
function extractToc(content: string): TocItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const toc: TocItem[] = [];

  let match: RegExpExecArray | null;
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim().replace(/[*_~`]/g, "");
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

    toc.push({ id, text, level });
  }

  return toc;
}

/**
 * Fetches a single guide by its slug, returning frontmatter, raw content, and extracted TOC.
 */
export function getGuideBySlug(slug: string): GuideData | null {
  if (!fs.existsSync(GUIDES_DIR)) {
    return null;
  }

  const filePath = path.join(GUIDES_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  const meta: GuideFrontmatter = {
    title: data.title || "",
    description: data.description || "",
    slug: data.slug || slug,
    publishedDate: data.publishedDate || "2025-01-15",
    updatedDate: data.updatedDate || data.publishedDate || "2025-01-15",
    relatedTools: data.relatedTools || [],
  };

  const toc = extractToc(content);

  return {
    meta,
    content,
    toc,
  };
}
