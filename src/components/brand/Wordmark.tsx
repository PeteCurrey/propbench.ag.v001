import React from "react";

type WordmarkSize = "sm" | "md" | "lg";

const sizeMap: Record<
  WordmarkSize,
  { text: string; rule: string; gap: string }
> = {
  sm: { text: "text-base", rule: "h-px w-full", gap: "gap-0.5" },
  md: { text: "text-xl", rule: "h-px w-full", gap: "gap-1" },
  lg: { text: "text-3xl", rule: "h-[2px] w-full", gap: "gap-1.5" },
};

interface WordmarkProps {
  size?: WordmarkSize;
  className?: string;
}

/**
 * PropBench wordmark — Syne 800, uppercase, with an accent-gold bench line.
 * Single source of truth for all sizes (header, footer, OG images).
 */
export function Wordmark({ size = "md", className = "" }: WordmarkProps) {
  const { text, rule, gap } = sizeMap[size];

  return (
    <span
      className={`inline-flex flex-col items-start ${gap} ${className}`}
      aria-label="PropBench"
    >
      <span
        className={`font-display font-extrabold tracking-tighter uppercase text-text-primary leading-none ${text}`}
        style={{ fontWeight: 800 }}
      >
        PROPBENCH
      </span>
      {/* The bench line — single accent-gold rule beneath the wordmark */}
      <span
        className={`${rule} bg-accent block`}
        aria-hidden="true"
      />
    </span>
  );
}
