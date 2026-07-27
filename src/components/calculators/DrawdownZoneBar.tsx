import React from "react";
import type { DrawdownResult, DrawdownType } from "@/lib/calc/drawdown";

interface DrawdownZoneBarProps {
  result: DrawdownResult;
  drawdownType: DrawdownType;
  initialBalance: number;
  highWaterMark: number;
  currentBalance: number;
}

export function DrawdownZoneBar({
  result,
  drawdownType,
  initialBalance,
  highWaterMark,
  currentBalance,
}: DrawdownZoneBarProps) {
  const { breachFloor, zone } = result;

  // Maximum scale extends to high water mark or initial balance + 10%
  const maxScale = Math.max(initialBalance * 1.15, highWaterMark * 1.05);
  const minScale = breachFloor * 0.95;
  const range = maxScale - minScale;

  const floorPct = Math.max(0, Math.min(100, ((breachFloor - minScale) / range) * 100));
  const currentPct = Math.max(0, Math.min(100, ((currentBalance - minScale) / range) * 100));
  const initialPct = Math.max(0, Math.min(100, ((initialBalance - minScale) / range) * 100));

  const zoneColors = {
    safe: "bg-positive/20 border-positive text-positive",
    warning: "bg-warning/20 border-warning text-warning",
    danger: "bg-danger/30 border-danger text-danger",
    breached: "bg-danger border-danger text-white font-bold",
  };

  return (
    <div className="space-y-6 pt-2">
      {/* Zone status banner */}
      <div className="flex items-center justify-between text-xs font-mono">
        <span className="text-text-muted">Account Risk Zone:</span>
        <span className={`px-2.5 py-0.5 rounded-full border uppercase tracking-wider ${zoneColors[zone]}`}>
          {zone}
        </span>
      </div>

      {/* Main horizontal zone track */}
      <div className="relative h-12 w-full rounded-lg bg-surface-inset border border-border p-1 overflow-hidden">
        {/* Background danger/warning/safe zones */}
        <div
          className="absolute top-1 bottom-1 left-1 bg-danger/20 rounded-l"
          style={{ width: `${floorPct}%` }}
        />
        <div
          className="absolute top-1 bottom-1 bg-warning/15"
          style={{ left: `${floorPct}%`, width: `${Math.max(0, currentPct - floorPct)}%` }}
        />
        <div
          className="absolute top-1 bottom-1 right-1 bg-positive/15 rounded-r"
          style={{ left: `${Math.max(floorPct, currentPct)}%` }}
        />

        {/* Breach Floor Marker (Termination Line) */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-danger z-20 transition-all duration-300 shadow-[0_0_8px_rgba(239,68,68,0.8)]"
          style={{ left: `${floorPct}%` }}
        >
          <div className="absolute -top-7 -translate-x-1/2 whitespace-nowrap bg-danger text-white text-[10px] font-mono px-1.5 py-0.5 rounded shadow">
            Floor: ${breachFloor.toLocaleString()}
          </div>
        </div>

        {/* Current Position Marker */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-8 bg-accent-blue rounded border-2 border-white z-30 transition-all duration-300 shadow-md flex items-center justify-center -translate-x-1/2"
          style={{ left: `${currentPct}%` }}
        >
          <div className="w-0.5 h-4 bg-white/80" />
          <div className="absolute -bottom-7 -translate-x-1/2 whitespace-nowrap bg-surface-elevated text-text-primary text-[10px] font-mono px-1.5 py-0.5 rounded border border-border">
            Current: ${currentBalance.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Mode callout info */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-text-muted border-t border-border pt-4">
        <span>
          Mode: <strong className="text-text-primary uppercase">{drawdownType.replace("_", " ")}</strong>
        </span>
        <span>
          Initial: ${initialBalance.toLocaleString()} | Peak: ${highWaterMark.toLocaleString()}
        </span>
      </div>
    </div>
  );
}
