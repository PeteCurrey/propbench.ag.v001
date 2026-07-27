import React from "react";
import type { LosingStreakRow } from "@/lib/calc/risk-of-ruin";
import { Table } from "@/components/ui/Table";

interface LosingStreakTableProps {
  rows: LosingStreakRow[];
}

export function LosingStreakTable({ rows }: LosingStreakTableProps) {
  if (!rows || rows.length === 0) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs font-mono text-text-muted">
        <span>Consecutive Loss Scenarios (1 to {rows.length} trades)</span>
        <span className="text-danger flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-danger inline-block" /> Breach Threshold
        </span>
      </div>

      <Table<LosingStreakRow>
        columns={[
          {
            key: "consecutiveLosses",
            header: "Loss Streak",
            numeric: true,
            render: (val) => `${val} ${val === 1 ? "loss" : "losses"}`,
          },
          {
            key: "cumulativeLossPct",
            header: "Cumulative Loss",
            numeric: true,
            render: (val) => `-${val}%`,
          },
          {
            key: "remainingBalance",
            header: "Remaining Balance",
            numeric: true,
            render: (val) => `$${Number(val).toLocaleString()}`,
          },
          {
            key: "isBreached",
            header: "Status",
            render: (val) =>
              val ? (
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-danger text-white">
                  BREACH
                </span>
              ) : (
                <span className="text-text-muted text-xs font-mono">OK</span>
              ),
          },
        ]}
        rows={rows}
      />
    </div>
  );
}
