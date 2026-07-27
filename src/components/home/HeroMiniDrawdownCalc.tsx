"use client";

import React, { useState } from "react";
import { calculateDrawdown, type DrawdownType } from "@/lib/calc/drawdown";

export function HeroMiniDrawdownCalc() {
  const [initialBalance] = useState(100000);
  const [currentBalance, setCurrentBalance] = useState(94000);
  const [highWaterMark, setHighWaterMark] = useState(108000);
  const [maxDrawdownPct, setMaxDrawdownPct] = useState(10);
  const [drawdownType, setDrawdownType] = useState<DrawdownType>("static");

  const result = calculateDrawdown({
    initialBalance,
    currentBalance,
    highWaterMark,
    maxDrawdownPct,
    drawdownType,
  });

  if (!result) return null;

  const { breachFloor, remainingBuffer, zone } = result;

  const zoneBadgeColor = {
    safe: "bg-positive/20 text-positive border-positive/30",
    warning: "bg-warning/20 text-warning border-warning/30",
    danger: "bg-danger/30 text-danger border-danger/40",
    breached: "bg-danger text-white font-bold",
  }[zone];

  return (
    <div className="w-full rounded-xl bg-surface-elevated/90 border border-border p-5 shadow-2xl backdrop-blur-md text-left font-sans">
      {/* Header / Mode Indicator */}
      <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-accent-blue block">
            Interactive Product Demo
          </span>
          <h3 className="font-display font-bold text-sm text-text-primary">
            Live Miniature Drawdown Engine
          </h3>
        </div>
        <span className={`px-2 py-0.5 rounded text-[10px] font-mono border uppercase ${zoneBadgeColor}`}>
          {zone}
        </span>
      </div>

      {/* Sliders */}
      <div className="space-y-3 font-mono text-xs mb-5">
        <div>
          <div className="flex justify-between text-text-muted mb-1">
            <span>Account Equity:</span>
            <strong className="text-text-primary">${currentBalance.toLocaleString()}</strong>
          </div>
          <input
            type="range"
            min={85000}
            max={115000}
            step={500}
            value={currentBalance}
            onChange={(e) => setCurrentBalance(Number(e.target.value))}
            className="w-full accent-accent-blue cursor-pointer h-1.5 bg-surface-inset rounded-lg appearance-none"
          />
        </div>

        <div>
          <div className="flex justify-between text-text-muted mb-1">
            <span>Max Drawdown:</span>
            <strong className="text-text-primary">{maxDrawdownPct}%</strong>
          </div>
          <input
            type="range"
            min={5}
            max={15}
            step={1}
            value={maxDrawdownPct}
            onChange={(e) => setMaxDrawdownPct(Number(e.target.value))}
            className="w-full accent-accent-blue cursor-pointer h-1.5 bg-surface-inset rounded-lg appearance-none"
          />
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="text-text-muted text-[11px]">Rule Mode:</span>
          <div className="flex gap-1">
            <button
              onClick={() => setDrawdownType("static")}
              className={`px-2 py-0.5 rounded text-[10px] ${
                drawdownType === "static"
                  ? "bg-accent-blue text-white font-bold"
                  : "bg-surface-inset text-text-muted hover:text-text-primary"
              }`}
            >
              Static
            </button>
            <button
              onClick={() => setDrawdownType("trailing_intraday")}
              className={`px-2 py-0.5 rounded text-[10px] ${
                drawdownType === "trailing_intraday"
                  ? "bg-accent-blue text-white font-bold"
                  : "bg-surface-inset text-text-muted hover:text-text-primary"
              }`}
            >
              Trailing
            </button>
          </div>
        </div>
      </div>

      {/* Output Stats Display */}
      <div className="grid grid-cols-2 gap-2 pt-3 border-t border-border font-mono">
        <div className="p-2 rounded bg-surface-inset border border-border">
          <span className="text-[9px] uppercase text-text-muted block">Breach Floor</span>
          <span className="text-sm font-bold text-danger">${breachFloor.toLocaleString()}</span>
        </div>
        <div className="p-2 rounded bg-surface-inset border border-border">
          <span className="text-[9px] uppercase text-text-muted block">Remaining Buffer</span>
          <span className="text-sm font-bold text-positive">${remainingBuffer.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
