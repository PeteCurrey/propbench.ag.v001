import React from "react";

interface Column<T> {
  key: keyof T;
  header: string;
  numeric?: boolean;
  align?: "left" | "right" | "center";
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

interface TableProps<T extends Record<string, unknown>> {
  columns: Column<T>[];
  rows: T[];
  caption?: string;
  className?: string;
}

/**
 * Table — dense, horizontally scrollable on mobile, DM Mono for numeric cells.
 * Scrollable wrapper prevents layout breakage at 375px per mobile-first rule.
 */
export function Table<T extends Record<string, any>>({
  columns,
  rows,
  caption,
  className = "",
}: TableProps<T>) {
  return (
    <div className={`w-full overflow-x-auto rounded-lg border border-border ${className}`}>
      <table className="w-full min-w-max border-collapse text-sm">
        {caption && (
          <caption className="sr-only">{caption}</caption>
        )}
        <thead>
          <tr className="border-b border-border bg-bg-inset">
            {columns.map((col) => (
              <th
                key={String(col.key)}
                scope="col"
                className={[
                  "px-4 py-2.5 text-[10px] font-mono uppercase tracking-widest text-text-muted font-normal",
                  col.align === "right"
                    ? "text-right"
                    : col.align === "center"
                    ? "text-center"
                    : "text-left",
                ].join(" ")}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-6 text-center text-text-muted text-sm"
              >
                No data available
              </td>
            </tr>
          ) : (
            rows.map((row, i) => (
              <tr
                key={i}
                className="border-b border-border last:border-0 hover:bg-bg-raised/60 transition-colors"
              >
                {columns.map((col) => {
                  const value = row[col.key];
                  const displayValue = col.render
                    ? col.render(value, row)
                    : value === null || value === undefined
                    ? <span className="text-text-muted/50">—</span>
                    : String(value);

                  return (
                    <td
                      key={String(col.key)}
                      className={[
                        "px-4 py-2.5",
                        col.numeric
                          ? "font-mono tabular-nums text-right"
                          : "font-body",
                        "text-text-primary",
                        col.align === "right"
                          ? "text-right"
                          : col.align === "center"
                          ? "text-center"
                          : "text-left",
                      ].join(" ")}
                      data-numeric={col.numeric || undefined}
                    >
                      {displayValue}
                    </td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
