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
  const isLg = size === "lg";
  const textClass = isLg ? "text-[1.5rem]" : "text-[0.9375rem]";
  const lineHeightClass = isLg ? "h-[20px] mx-[12px]" : "h-[14px] mx-[8px]";

  return (
    <span
      className={`inline-flex items-baseline gap-0 select-none font-sans uppercase leading-none ${className}`}
      aria-label="PropBench"
    >
      <span className="font-semibold text-accent" style={{ fontSize: textClass, letterSpacing: "0.05em" }}>PROP</span>
      <span className="bg-[#d9d9d6] inline-block align-middle" style={{ width: "1px", height: isLg ? "20px" : "14px", margin: isLg ? "0 12px" : "0 8px" }}></span>
      <span className="font-light text-accent" style={{ fontSize: textClass, letterSpacing: "0.12em" }}>BENCH</span>
    </span>
  );
}
