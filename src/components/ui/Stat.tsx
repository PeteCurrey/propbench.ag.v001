import React from "react";

type StatState = "positive" | "warning" | "danger" | "neutral";

interface StatProps {
  /** The numeric or textual figure to display — always DM Mono */
  value: string | null;
  /** Short label beneath the figure */
  label: string;
  /** Optional colour state — positive/warning/danger/neutral */
  state?: StatState;
  /** Optional sub-label or unit displayed below the main label */
  sub?: string;
  className?: string;
}

const stateColour: Record<StatState, string> = {
  positive: "text-positive",
  warning: "text-warning",
  danger: "text-danger",
  neutral: "text-accent",
};

/**
 * Stat — Signal Centre style clean tabular number on top, uppercase caption below.
 * Renders "—" when value is null (Rule 1: no hardcoded fallbacks).
 */
export function Stat({
  value,
  label,
  state = "neutral",
  sub,
  className = "",
}: StatProps) {
  const colour = stateColour[state];
  const isNull = value === null;

  return (
    <div className={`flex flex-col justify-between p-6 ${className}`}>
      <span
        className={[
          "font-mono text-2xl sm:text-3xl font-medium leading-tight tabular-nums tracking-tight mb-1.5",
          isNull ? "text-text-disabled italic text-lg" : colour,
        ].join(" ")}
        data-numeric
        aria-label={isNull ? "Not available" : value}
      >
        {isNull ? "—" : value}
      </span>
      <div>
        <span className="text-[11px] font-mono font-medium text-text-muted uppercase tracking-wider block">
          {label}
        </span>
        {sub && (
          <span className="text-[10px] font-mono text-text-disabled block mt-0.5">{sub}</span>
        )}
      </div>
    </div>
  );
}
