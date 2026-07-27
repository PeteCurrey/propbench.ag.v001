import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";

export interface RelatedToolItem {
  slug: string;
  name: string;
  description: string;
}

interface RelatedToolsProps {
  tools: RelatedToolItem[];
}

export function RelatedTools({ tools }: RelatedToolsProps) {
  if (!tools || tools.length === 0) return null;

  return (
    <section className="mt-16 pt-10 border-t border-border" aria-label="Related Calculators">
      <h3 className="font-display font-semibold text-lg text-text-primary mb-6">
        Related Tools &amp; Calculators
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {tools.slice(0, 3).map((tool) => (
          <Link key={tool.slug} href={`/tools/${tool.slug}`} className="group block">
            <Card
              variant="default"
              className="h-full transition-colors group-hover:border-accent-blue/50 group-hover:bg-surface-elevated/70"
            >
              <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted mb-1 block">
                Tool
              </span>
              <h4 className="font-display font-bold text-sm text-text-primary group-hover:text-accent-blue transition-colors mb-1">
                {tool.name}
              </h4>
              <p className="text-xs text-text-muted line-clamp-2">{tool.description}</p>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
