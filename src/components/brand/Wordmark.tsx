import React from "react";

type WordmarkSize = "sm" | "md" | "lg";

const sizeMap: Record<WordmarkSize, string> = {
  sm: "text-base tracking-widest",
  md: "text-lg tracking-widest",
  lg: "text-2xl tracking-[0.2em]",
};

interface WordmarkProps {
  size?: WordmarkSize;
  className?: string;
}

/**
 * PropBench wordmark — Signal Centre style clean uppercase tracking.
 * "PROP" in bold dark navy (#0F172A), "BENCH" in light regular slate (#64748B).
 */
export function Wordmark({ size = "md", className = "" }: WordmarkProps) {
  const sizeClass = sizeMap[size];

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-display uppercase leading-none select-none ${sizeClass} ${className}`}
      aria-label="PropBench"
    >
      <span className="font-extrabold text-slate-900">PROP</span>
      <span className="font-medium text-slate-500">BENCH</span>
    </span>
  );
}
