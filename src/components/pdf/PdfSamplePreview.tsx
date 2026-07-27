"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/Card";

export function PdfSamplePreview() {
  const [activePage, setActivePage] = useState(1);

  const samplePages = [
    {
      pageNumber: 1,
      title: "Chapter 1: The Mathematics of Prop Firm Drawdown",
      content: (
        <div className="space-y-4 text-xs font-serif text-text-primary leading-relaxed">
          <h4 className="font-display font-bold text-sm text-text-primary border-b border-border pb-2">
            1.1 Static vs Trailing Breach Thresholds
          </h4>
          <p>
            The fundamental distinction between passing an evaluation account and suffering a permanent breach lies in the mathematical formulation of your drawdown floor.
          </p>
          <p>
            When a proprietary trading firm enforces a static drawdown rule, your termination floor remains anchored at a fixed distance from your initial deposit. For example, a 10% static limit on a $100,000 account fixes your floor at $90,000 indefinitely.
          </p>
          <div className="p-3 bg-surface-inset border border-border rounded font-mono text-[11px] my-3">
            Breach Floor (Static) = Initial Balance × (1 - Max Drawdown %)
          </div>
          <p>
            Conversely, trailing drawdown models adjust the breach floor upwards as your equity reaches new high water marks. Once equity increases, your floor follows the peak, reducing your effective room for error during subsequent drawdowns.
          </p>
        </div>
      ),
    },
    {
      pageNumber: 2,
      title: "Chapter 1 (Cont.): Daily Loss Reset Mechanics",
      content: (
        <div className="space-y-4 text-xs font-serif text-text-primary leading-relaxed">
          <h4 className="font-display font-bold text-sm text-text-primary border-b border-border pb-2">
            1.2 The Server Reset Time Trap
          </h4>
          <p>
            Daily loss limits are calculated relative to your account balance or equity at the exact moment of the firm&apos;s daily reset (most commonly 17:00 New York Time / Eastern Time).
          </p>
          <p>
            Entering or holding open trades across the reset hour causes floating profits or losses to be incorporated into your baseline for the next 24-hour cycle.
          </p>
          <div className="p-3 bg-surface-inset border border-border rounded font-mono text-[11px] my-3">
            Daily Breach Threshold = Start-of-Day Equity × (1 - Daily Loss %)
          </div>
          <p>
            Traders who hold floating drawdown through the reset time start the next session with a significantly reduced daily loss buffer.
          </p>
        </div>
      ),
    },
  ];

  return (
    <Card className="p-6 bg-surface-inset border border-border rounded-xl">
      {/* Sample Header Controls */}
      <div className="flex items-center justify-between border-b border-border pb-3 mb-4 text-xs font-mono">
        <span className="text-text-muted uppercase tracking-wider">
          PDF Preview — Sample Chapter 1
        </span>
        <div className="flex items-center gap-2">
          <button
            disabled={activePage === 1}
            onClick={() => setActivePage((p) => Math.max(1, p - 1))}
            className="px-2.5 py-1 rounded bg-surface-base border border-border text-text-primary disabled:opacity-40 hover:bg-surface-elevated transition-colors"
          >
            &larr; Prev Page
          </button>
          <span className="text-text-muted">
            Page {activePage} of {samplePages.length}
          </span>
          <button
            disabled={activePage === samplePages.length}
            onClick={() => setActivePage((p) => Math.min(samplePages.length, p + 1))}
            className="px-2.5 py-1 rounded bg-surface-base border border-border text-text-primary disabled:opacity-40 hover:bg-surface-elevated transition-colors"
          >
            Next Page &rarr;
          </button>
        </div>
      </div>

      {/* Embedded Document Viewer Page */}
      <div className="bg-surface-base border border-border p-6 rounded-lg min-h-[280px] shadow-inner">
        <span className="text-[10px] font-mono text-text-muted/60 uppercase block mb-3">
          {samplePages[activePage - 1].title}
        </span>
        {samplePages[activePage - 1].content}
      </div>
    </Card>
  );
}
