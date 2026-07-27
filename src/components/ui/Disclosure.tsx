import React from "react";

export interface DisclosureProps {
  /** Short description of the data source */
  source?: string;
  /** URL linking to the authoritative source */
  sourceUrl?: string;
  /** ISO date string when this data point was last verified */
  verifiedDate?: string;
  title?: string;
  children?: React.ReactNode;
  className?: string;
}

/**
 * Disclosure — source attribution + verified date line OR expandable accordion panel.
 * Rule 2: every firm-specific data point must show both source and verified date.
 */
export function Disclosure({
  source,
  sourceUrl,
  verifiedDate,
  title,
  children,
  className = "",
}: DisclosureProps) {
  if (title || children) {
    return (
      <details className={`group rounded-lg border border-border bg-surface-base p-4 ${className}`}>
        <summary className="cursor-pointer font-display font-medium text-sm text-text-primary flex items-center justify-between list-none">
          <span>{title}</span>
          <span className="text-text-muted transition-transform group-open:rotate-180 text-xs">
            &#9660;
          </span>
        </summary>
        <div className="mt-3 pt-3 border-t border-border">{children}</div>
      </details>
    );
  }

  if (!verifiedDate || !sourceUrl || !source) {
    return null;
  }

  const formatted = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(verifiedDate));

  return (
    <p
      className={`text-[11px] text-text-muted/70 flex flex-wrap items-center gap-1 ${className}`}
    >
      <span>Source:</span>
      <a
        href={sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="underline underline-offset-2 hover:text-text-muted transition-colors"
      >
        {source}
      </a>
      <span aria-hidden="true">·</span>
      <span>
        Verified <time dateTime={verifiedDate}>{formatted}</time>
      </span>
    </p>
  );
}
