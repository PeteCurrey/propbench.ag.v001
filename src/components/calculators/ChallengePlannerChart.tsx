import React from "react";
import type { ChallengePlanResult } from "@/lib/calc/challenge-planner";

interface ChallengePlannerChartProps {
  result: ChallengePlanResult;
}

export function ChallengePlannerChart({ result }: ChallengePlannerChartProps) {
  const { targetDailyProfit, dailyTargetPct, projectedEquityCurve, targetProfitAmount } = result;

  if (!projectedEquityCurve || projectedEquityCurve.length < 2) return null;

  const minEquity = projectedEquityCurve[0].equity;
  const maxEquity = projectedEquityCurve[projectedEquityCurve.length - 1].equity;
  const range = maxEquity - minEquity || 1;

  // SVG Polyline points
  const points = projectedEquityCurve
    .map((pt, i) => {
      const x = (i / (projectedEquityCurve.length - 1)) * 300;
      const y = 100 - ((pt.equity - minEquity) / range) * 80 - 10;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <div className="space-y-6 pt-2">
      {/* Large Daily Target Figure */}
      <div className="p-4 rounded-lg bg-surface-base border border-border flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-text-muted">
            Required Daily Target
          </span>
          <div className="font-mono text-3xl font-extrabold text-positive mt-1">
            +${targetDailyProfit.toLocaleString()}
            <span className="text-sm font-normal text-text-muted ml-2">
              ({dailyTargetPct}% / day)
            </span>
          </div>
        </div>
        <div className="text-right font-mono text-xs text-text-muted">
          <span>Target Profit: </span>
          <strong className="text-text-primary">+${targetProfitAmount.toLocaleString()}</strong>
        </div>
      </div>

      {/* SVG Equity Line Chart */}
      <div className="rounded-lg bg-surface-inset border border-border p-4">
        <div className="flex justify-between text-[10px] font-mono text-text-muted mb-2">
          <span>Day 0 (${minEquity.toLocaleString()})</span>
          <span>Target Day {projectedEquityCurve.length - 1} (${maxEquity.toLocaleString()})</span>
        </div>
        <svg viewBox="0 0 300 100" className="w-full h-28 overflow-visible">
          {/* Grid lines */}
          <line x1="0" y1="90" x2="300" y2="90" stroke="currentColor" className="text-border" strokeDasharray="3 3" />
          <line x1="0" y1="10" x2="300" y2="10" stroke="currentColor" className="text-border" strokeDasharray="3 3" />

          {/* Projected line */}
          <polyline
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            points={points}
            className="text-positive"
          />
        </svg>
      </div>
    </div>
  );
}
