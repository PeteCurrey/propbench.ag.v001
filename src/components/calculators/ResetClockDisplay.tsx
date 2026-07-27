"use client";

import React, { useState, useEffect } from "react";
import type { ResetTimeResult } from "@/lib/calc/reset-time";
import { convertResetTime } from "@/lib/calc/reset-time";

interface ResetClockDisplayProps {
  initialResult: ResetTimeResult;
  firmResetTime: string;
  firmTimezone: string;
}

export function ResetClockDisplay({
  initialResult,
  firmResetTime,
  firmTimezone,
}: ResetClockDisplayProps) {
  const [result, setResult] = useState<ResetTimeResult>(initialResult);

  // Live tick every second for countdown clock
  useEffect(() => {
    const interval = setInterval(() => {
      const updated = convertResetTime({
        firmResetTime,
        firmTimezone,
      });
      if (updated) {
        setResult(updated);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [firmResetTime, firmTimezone]);

  return (
    <div className="space-y-6 pt-2">
      {/* Live Countdown Timer */}
      <div className="p-6 rounded-lg bg-surface-base border border-border text-center flex flex-col items-center justify-center">
        <span className="text-xs font-mono uppercase tracking-widest text-text-muted mb-2 block">
          Time Remaining Until Next Daily Reset
        </span>
        <div
          className={`font-mono text-5xl sm:text-6xl font-extrabold tracking-tight ${
            result.isCloseToReset ? "text-warning animate-pulse" : "text-accent-blue"
          }`}
        >
          {result.formattedCountdown}
        </div>
        <span className="text-xs font-mono text-text-muted mt-2">
          HH : MM : SS
        </span>
      </div>

      {/* Timezone Comparison Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
        <div className="p-4 rounded border border-border bg-surface-inset">
          <span className="text-text-muted text-[10px] uppercase block mb-1">
            Firm Reset Time ({firmTimezone})
          </span>
          <span className="text-xl font-bold text-text-primary">{firmResetTime}</span>
        </div>
        <div className="p-4 rounded border border-border bg-surface-inset">
          <span className="text-text-muted text-[10px] uppercase block mb-1">
            Converted Local Reset Time ({result.localTimezone})
          </span>
          <span className="text-xl font-bold text-positive">{result.localResetTime}</span>
        </div>
      </div>
    </div>
  );
}
