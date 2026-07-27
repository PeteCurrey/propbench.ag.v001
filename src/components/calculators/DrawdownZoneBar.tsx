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

  const zoneColors = {
    safe: "bg-emerald-50 text-emerald-700 border-emerald-200",
    warning: "bg-amber-50 text-amber-700 border-amber-200",
    danger: "bg-rose-50 text-rose-700 border-rose-200",
    breached: "bg-rose-600 text-white font-bold",
  };

  return (
    <div className="space-y-6 pt-2 text-left">
      {/* Zone status banner */}
      <div className="flex items-center justify-between text-xs font-mono">
        <span className="text-slate-500 font-medium">Account Risk Zone:</span>
        <span className={`px-2.5 py-0.5 rounded-full border uppercase tracking-wider ${zoneColors[zone]}`}>
          {zone}
        </span>
      </div>

      {/* Main horizontal zone track */}
      <div className="relative h-12 w-full rounded-lg bg-slate-100 border border-slate-200 p-1 overflow-hidden">
        {/* Background danger/warning/safe zones */}
        <div
          className="absolute top-1 bottom-1 left-1 bg-rose-100 rounded-l"
          style={{ width: `${floorPct}%` }}
        />
        <div
          className="absolute top-1 bottom-1 bg-amber-100/70"
          style={{ left: `${floorPct}%`, width: `${Math.max(0, currentPct - floorPct)}%` }}
        />
        <div
          className="absolute top-1 bottom-1 right-1 bg-emerald-100/70 rounded-r"
          style={{ left: `${Math.max(floorPct, currentPct)}%` }}
        />

        {/* Breach Floor Marker (Termination Line) */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-rose-600 z-20 transition-all duration-300 shadow-sm"
          style={{ left: `${floorPct}%` }}
        >
          <div className="absolute -top-7 -translate-x-1/2 whitespace-nowrap bg-rose-600 text-white text-[10px] font-mono px-2 py-0.5 rounded font-bold shadow">
            Floor: ${breachFloor.toLocaleString()}
          </div>
        </div>

        {/* Current Position Marker */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-8 bg-[#1B2A4A] rounded border-2 border-white z-30 transition-all duration-300 shadow-md flex items-center justify-center -translate-x-1/2"
          style={{ left: `${currentPct}%` }}
        >
          <div className="w-0.5 h-4 bg-white/80" />
          <div className="absolute -bottom-7 -translate-x-1/2 whitespace-nowrap bg-white text-slate-900 text-[10px] font-mono px-2 py-0.5 rounded border border-slate-200 shadow-sm font-bold">
            Current: ${currentBalance.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Mode callout info */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-slate-500 border-t border-slate-200 pt-4">
        <span>
          Mode: <strong className="text-slate-900 uppercase font-semibold">{drawdownType.replace("_", " ")}</strong>
        </span>
        <span>
          Initial: ${initialBalance.toLocaleString()} | Peak: ${highWaterMark.toLocaleString()}
        </span>
      </div>
    </div>
  );
}
