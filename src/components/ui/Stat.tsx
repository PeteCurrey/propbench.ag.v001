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
  neutral: "text-text-primary",
};

/**
 * Stat — large DM Mono figure with label and optional state colour.
 * Renders "Not available" when value is null (Rule 1: no hardcoded fallbacks).
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
    <div className={`flex flex-col gap-1 ${className}`}>
      <span
        className={[
          "font-mono text-3xl font-normal leading-none tabular-nums",
          isNull ? "text-text-muted italic text-lg" : colour,
        ].join(" ")}
        data-numeric
        aria-label={isNull ? "Not available" : value}
      >
        {isNull ? "—" : value}
      </span>
      <span className="text-xs font-medium text-text-muted uppercase tracking-wide">
        {label}
      </span>
      {sub && (
        <span className="text-xs text-text-muted/60">{sub}</span>
      )}
    </div>
  );
}
