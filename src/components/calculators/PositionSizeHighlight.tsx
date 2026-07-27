import React from "react";
import type { PositionSizeResult } from "@/lib/calc/position-size";

interface PositionSizeHighlightProps {
  result: PositionSizeResult;
  currency?: string;
}

export function PositionSizeHighlight({ result, currency = "$" }: PositionSizeHighlightProps) {
  return (
    <div className="py-6 px-4 rounded-lg bg-surface-base border border-border flex flex-col sm:flex-row items-center justify-between gap-6">
      {/* Large scale lot size */}
      <div className="flex flex-col text-left">
        <span className="text-xs font-mono uppercase tracking-widest text-text-muted">
          Recommended Position Size
        </span>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="font-mono text-5xl sm:text-6xl font-extrabold text-accent-blue tracking-tight">
            {result.positionSizeLots}
          </span>
          <span className="font-mono text-lg text-text-muted font-medium">Standard Lots</span>
        </div>
        <span className="text-[11px] font-mono text-text-muted/80 mt-1">
          ({result.totalUnits.toLocaleString()} units)
        </span>
      </div>

      {/* Cash at risk beside it */}
      <div className="sm:border-l sm:border-border sm:pl-6 flex flex-col text-left sm:text-right">
        <span className="text-xs font-mono uppercase tracking-widest text-text-muted">
          Capital at Risk
        </span>
        <span className="font-mono text-3xl font-bold text-text-primary mt-1">
          {currency}
          {result.cashAtRisk.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </span>
        <span className="text-[11px] font-mono text-text-muted mt-1">
          Risk per pip: {currency}
          {result.riskPerPip.toFixed(2)}
        </span>
      </div>
    </div>
  );
}
