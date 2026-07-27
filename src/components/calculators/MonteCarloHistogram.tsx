import React from "react";
import type { ChallengeSimulatorResult } from "@/lib/calc/challenge-simulator";

interface MonteCarloHistogramProps {
  result: ChallengeSimulatorResult;
}

export function MonteCarloHistogram({ result }: MonteCarloHistogramProps) {
  const { histogramBins, numSimulations, passRatePct, failRatePct, timeoutRatePct } = result;

  const maxCount = Math.max(...histogramBins.map((b) => b.count), 1);

  return (
    <div className="space-y-6 pt-2">
      {/* Simulation Notice */}
      <div className="p-3 rounded border border-border bg-surface-inset text-xs text-text-muted italic">
        Note: This is a mathematical simulation of {numSimulations.toLocaleString()} randomized challenge runs strictly based on your input assumptions. It does not predict future trading performance.
      </div>

      {/* Summary KPI Badges */}
      <div className="grid grid-cols-3 gap-3 text-center font-mono">
        <div className="p-3 rounded border border-positive/30 bg-positive/10">
          <span className="text-[10px] text-text-muted uppercase block">Pass Rate</span>
          <span className="text-xl font-bold text-positive">{passRatePct}%</span>
        </div>
        <div className="p-3 rounded border border-danger/30 bg-danger/10">
          <span className="text-[10px] text-text-muted uppercase block">Fail Rate</span>
          <span className="text-xl font-bold text-danger">{failRatePct}%</span>
        </div>
        <div className="p-3 rounded border border-border bg-surface-base">
          <span className="text-[10px] text-text-muted uppercase block">Timeout</span>
          <span className="text-xl font-bold text-text-muted">{timeoutRatePct}%</span>
        </div>
      </div>

      {/* Histogram SVG / CSS Bars */}
      <div className="space-y-2">
        <span className="text-xs font-mono uppercase tracking-widest text-text-muted block mb-3">
          Simulated Outcome Distribution (% Return Bins)
        </span>
        <div className="space-y-2">
          {histogramBins.map((bin, idx) => {
            const widthPct = Math.max(2, (bin.count / maxCount) * 100);
            let barColor = "bg-text-muted/40";
            if (bin.status === "pass") barColor = "bg-positive";
            if (bin.status === "fail") barColor = "bg-danger";

            return (
              <div key={idx} className="flex items-center text-xs font-mono gap-3">
                <span className="w-24 text-right shrink-0 text-text-muted text-[11px]">
                  {bin.label}
                </span>
                <div className="flex-1 bg-surface-inset rounded h-5 p-0.5 overflow-hidden flex items-center">
                  <div
                    className={`h-full rounded transition-all duration-300 ${barColor}`}
                    style={{ width: `${widthPct}%` }}
                  />
                </div>
                <span className="w-12 text-left shrink-0 text-text-primary text-[11px] font-bold">
                  {bin.percentage}%
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
