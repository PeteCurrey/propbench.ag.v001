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
  positive: "text-emerald-600",
  warning: "text-amber-600",
  danger: "text-rose-600",
  neutral: "text-slate-900",
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
    <div className={`flex flex-col justify-between p-2 ${className}`}>
      <span
        className={[
          "font-mono text-3xl sm:text-4xl font-normal leading-tight tabular-nums tracking-tight mb-2",
          isNull ? "text-slate-400 italic text-lg" : colour,
        ].join(" ")}
        data-numeric
        aria-label={isNull ? "Not available" : value}
      >
        {isNull ? "—" : value}
      </span>
      <div>
        <span className="text-[11px] font-mono font-medium text-slate-500 uppercase tracking-wider block">
          {label}
        </span>
        {sub && (
          <span className="text-[10px] font-mono text-slate-400 block mt-0.5">{sub}</span>
        )}
      </div>
    </div>
  );
}
