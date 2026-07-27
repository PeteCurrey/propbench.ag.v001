import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getAllGuides, getGuideBySlug } from "@/lib/guides";
import { TOOLS_DIRECTORY } from "@/data/tools";
import { mdxComponents } from "@/components/mdx/MDXComponents";
import { RelatedTools } from "@/components/calculators/RelatedTools";
import { Disclosure } from "@/components/ui/Disclosure";
import { MDXRemote } from "next-mdx-remote/rsc";

export async function generateStaticParams() {
  const guides = getAllGuides();
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) return {};

  return {
    title: `${guide.meta.title} | PropBench Guide`,
    description: guide.meta.description,
    alternates: {
      canonical: `https://propbench.com/guides/${slug}`,
    },
    robots: "index, follow",
  };
}

export default async function GuideDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) {
    notFound();
  }

  const { meta, content, toc } = guide;

  // Map related tool objects for footers
  const relatedToolObjects = meta.relatedTools
    .map((toolSlug) => TOOLS_DIRECTORY.find((t) => t.slug === toolSlug))
    .filter((t): t is typeof TOOLS_DIRECTORY[0] => t !== undefined);

  // Article JSON-LD Structured Data
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: meta.title,
    description: meta.description,
    datePublished: meta.publishedDate,
    dateModified: meta.updatedDate,
    author: {
      "@type": "Organization",
      name: "PropBench",
      url: "https://propbench.com",
    },
    publisher: {
      "@type": "Organization",
      name: "PropBench",
      url: "https://propbench.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://propbench.com/guides/${slug}`,
    },
  };

  return (
    <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Article JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      {/* Article Header */}
      <header className="mb-10 max-w-[70ch]">
        <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-text-muted mb-3">
          <Link href="/guides" className="hover:text-accent-blue transition-colors">
            Guides
          </Link>
          <span>/</span>
          <span>Article</span>
        </div>

        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-text-primary tracking-tight mb-4 leading-tight">
          {meta.title}
        </h1>

        <p className="text-sm sm:text-base text-text-muted leading-relaxed mb-6">
          {meta.description}
        </p>

        <div className="flex items-center gap-4 text-xs font-mono text-text-muted border-t border-b border-border py-3">
          <span>Published: {meta.publishedDate}</span>
          <span>•</span>
          <span>Updated: {meta.updatedDate}</span>
        </div>
      </header>

      {/* Layout: TOC + MDX Article Body */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Table of Contents Sidebar / Disclosure */}
        <aside className="lg:col-span-4">
          <div className="sticky top-20">
            {toc.length > 0 && (
              <Disclosure title="Table of Contents">
                <nav aria-label="Table of Contents">
                  <ul className="space-y-2 text-xs font-mono">
                    {toc.map((item) => (
                      <li key={item.id} className={item.level === 3 ? "pl-3 text-text-muted" : ""}>
                        <a
                          href={`#${item.id}`}
                          className="hover:text-accent-blue transition-colors block py-0.5"
                        >
                          {item.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </Disclosure>
            )}
          </div>
        </aside>

        {/* MDX Article Body constrained to 65-75ch measure */}
        <main className="lg:col-span-8">
          <article className="max-w-[70ch] text-text-muted text-sm sm:text-base leading-relaxed space-y-6">
            <MDXRemote source={content} components={mdxComponents} />
          </article>
        </main>
      </div>

      {/* Contextual Related Tools Footer */}
      {relatedToolObjects.length > 0 && <RelatedTools tools={relatedToolObjects} />}
    </div>
  );
}
