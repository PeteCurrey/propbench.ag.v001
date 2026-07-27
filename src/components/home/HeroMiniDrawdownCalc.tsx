"use client";

import React, { useState } from "react";
import { calculateDrawdown, type DrawdownType } from "@/lib/calc/drawdown";

export function HeroMiniDrawdownCalc() {
  const [initialBalance] = useState(100000);
  const [currentBalance, setCurrentBalance] = useState(94000);
  const [highWaterMark] = useState(108000);
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
    safe: "bg-emerald-50 text-emerald-700 border-emerald-200",
    warning: "bg-amber-50 text-amber-700 border-amber-200",
    danger: "bg-rose-50 text-rose-700 border-rose-200",
    breached: "bg-rose-600 text-white font-bold",
  }[zone];

  return (
    <div className="w-full rounded-xl bg-white border border-slate-200 p-6 shadow-md text-left font-sans">
      {/* Header / Mode Indicator */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-5">
        <div>
          <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-slate-500 block mb-0.5">
            Interactive Product Demo
          </span>
          <h3 className="font-display font-bold text-base text-slate-900">
            Live Miniature Drawdown Engine
          </h3>
        </div>
        <span className={`px-2.5 py-1 rounded text-[10px] font-mono border uppercase tracking-wider font-semibold ${zoneBadgeColor}`}>
          {zone}
        </span>
      </div>

      {/* Sliders */}
      <div className="space-y-4 font-mono text-xs mb-6">
        <div>
          <div className="flex justify-between text-slate-600 mb-1.5 font-medium">
            <span>Account Equity:</span>
            <strong className="text-slate-900 font-bold">${currentBalance.toLocaleString()}</strong>
          </div>
          <input
            type="range"
            min={85000}
            max={115000}
            step={500}
            value={currentBalance}
            onChange={(e) => setCurrentBalance(Number(e.target.value))}
            className="w-full accent-[#1B2A4A] cursor-pointer h-2 bg-slate-100 rounded-lg appearance-none border border-slate-200"
          />
        </div>

        <div>
          <div className="flex justify-between text-slate-600 mb-1.5 font-medium">
            <span>Max Drawdown:</span>
            <strong className="text-slate-900 font-bold">{maxDrawdownPct}%</strong>
          </div>
          <input
            type="range"
            min={5}
            max={15}
            step={1}
            value={maxDrawdownPct}
            onChange={(e) => setMaxDrawdownPct(Number(e.target.value))}
            className="w-full accent-[#1B2A4A] cursor-pointer h-2 bg-slate-100 rounded-lg appearance-none border border-slate-200"
          />
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="text-slate-500 font-mono text-[11px] font-medium uppercase">Rule Mode:</span>
          <div className="flex gap-1.5">
            <button
              onClick={() => setDrawdownType("static")}
              className={`px-3 py-1 rounded text-[10px] font-mono uppercase tracking-wider ${
                drawdownType === "static"
                  ? "bg-[#1B2A4A] text-white font-bold shadow-sm"
                  : "bg-slate-100 text-slate-600 border border-slate-200 hover:text-slate-900"
              }`}
            >
              Static
            </button>
            <button
              onClick={() => setDrawdownType("trailing_intraday")}
              className={`px-3 py-1 rounded text-[10px] font-mono uppercase tracking-wider ${
                drawdownType === "trailing_intraday"
                  ? "bg-[#1B2A4A] text-white font-bold shadow-sm"
                  : "bg-slate-100 text-slate-600 border border-slate-200 hover:text-slate-900"
              }`}
            >
              Trailing
            </button>
          </div>
        </div>
      </div>

      {/* Output Stats Display */}
      <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-200 font-mono">
        <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
          <span className="text-[10px] font-medium uppercase tracking-wider text-slate-500 block mb-1">Breach Floor</span>
          <span className="text-base font-bold text-rose-600">${breachFloor.toLocaleString()}</span>
        </div>
        <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
          <span className="text-[10px] font-medium uppercase tracking-wider text-slate-500 block mb-1">Remaining Buffer</span>
          <span className="text-base font-bold text-emerald-600">${remainingBuffer.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
