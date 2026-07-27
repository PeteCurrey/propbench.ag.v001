"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { TOOLS_DIRECTORY } from "@/data/tools";

const CATEGORIES = ["All", "Risk & Sizing", "Challenge Planning", "Funded Account", "Reference"] as const;

export default function ToolsHubPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredTools = useMemo(() => {
    return TOOLS_DIRECTORY.filter((tool) => {
      const matchesCategory = selectedCategory === "All" || tool.category === selectedCategory;
      const matchesSearch =
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.primaryInput.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Header section */}
      <div className="mb-10 text-left">
        <p className="font-mono text-[10px] uppercase tracking-widest text-text-muted mb-2">
          PropBench / Tools Hub
        </p>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-text-primary tracking-tight mb-3">
          Prop Trading Calculators &amp; Utilities
        </h1>
        <p className="text-sm sm:text-base text-text-muted max-w-2xl">
          100% client-side risk management, challenge planning, and evaluation utilities. Zero database requirements, zero saved tracking.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between mb-10 pb-6 border-b border-border">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-mono transition-colors ${
                selectedCategory === cat
                  ? "bg-accent-blue text-white font-semibold"
                  : "bg-surface-elevated text-text-muted hover:text-text-primary border border-border"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="w-full sm:w-72">
          <Input
            placeholder="Search calculators..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Tools Grid */}
      {filteredTools.length === 0 ? (
        <div className="py-16 text-center text-text-muted font-mono text-sm">
          No calculators matched your search query or filter.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <Link key={tool.slug} href={`/tools/${tool.slug}`} className="group block">
              <Card
                variant="default"
                className="h-full flex flex-col justify-between transition-colors group-hover:border-accent-blue/60 group-hover:bg-surface-elevated/80"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-surface-inset text-text-muted border border-border">
                      {tool.category}
                    </span>
                  </div>

                  <h2 className="font-display font-bold text-lg text-text-primary group-hover:text-accent-blue transition-colors mb-2">
                    {tool.name}
                  </h2>

                  <p className="text-xs text-text-muted leading-relaxed mb-4">{tool.description}</p>
                </div>

                <div className="pt-3 border-t border-border/60 text-[11px] font-mono text-text-muted flex items-center justify-between">
                  <span>
                    Input: <strong className="text-text-primary font-normal">{tool.primaryInput}</strong>
                  </span>
                  <span className="text-accent-blue font-bold group-hover:translate-x-0.5 transition-transform">
                    Open &rarr;
                  </span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
