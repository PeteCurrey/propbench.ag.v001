import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { getAllGuides } from "@/lib/guides";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Prop Trading Guides & Frameworks | PropBench",
  description:
    "Educational guides on static vs trailing drawdown, position sizing, consistency rules, daily loss limits, and prop firm risk management.",
  alternates: {
    canonical: "https://propbench.com/guides",
  },
  robots: "index, follow",
};

export default function GuidesHubPage() {
  const guides = getAllGuides();

  return (
    <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Page Header */}
      <div className="mb-12 text-left">
        <p className="font-mono text-[10px] uppercase tracking-widest text-text-muted mb-2">
          PropBench / Educational Guides
        </p>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-text-primary tracking-tight mb-3">
          Prop Trading Rules &amp; Risk Guides
        </h1>
        <p className="text-sm sm:text-base text-text-muted max-w-2xl">
          Analytical frameworks explaining drawdown mechanics, risk budgets, consistency caps, and evaluation rules.
        </p>
      </div>

      {/* Guide Stubs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {guides.map((guide) => (
          <Link key={guide.slug} href={`/guides/${guide.slug}`} className="group block">
            <Card
              variant="default"
              className="h-full flex flex-col justify-between transition-colors group-hover:border-accent-blue/60 group-hover:bg-surface-elevated/80"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3 text-[10px] font-mono text-text-muted">
                  <span>Published {guide.publishedDate}</span>
                  <span className="uppercase text-accent-blue font-bold">Guide</span>
                </div>

                <h2 className="font-display font-bold text-xl text-text-primary group-hover:text-accent-blue transition-colors mb-3 leading-snug">
                  {guide.title}
                </h2>

                <p className="text-xs text-text-muted leading-relaxed mb-6">{guide.description}</p>
              </div>

              <div className="pt-4 border-t border-border/60 text-[11px] font-mono text-text-muted flex items-center justify-between">
                <span>
                  Tools: <strong className="text-text-primary font-normal">{guide.relatedTools.join(", ")}</strong>
                </span>
                <span className="text-accent-blue font-bold group-hover:translate-x-0.5 transition-transform">
                  Read Guide &rarr;
                </span>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
