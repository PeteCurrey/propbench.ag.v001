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
 * Table — Signal Centre style clean white tabular data component with light slate borders.
 */
export function Table<T extends Record<string, any>>({
  columns,
  rows,
  caption,
  className = "",
}: TableProps<T>) {
  return (
    <div className={`w-full overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm ${className}`}>
      <table className="w-full min-w-max border-collapse text-sm">
        {caption && (
          <caption className="sr-only">{caption}</caption>
        )}
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50">
            {columns.map((col) => (
              <th
                key={String(col.key)}
                scope="col"
                className={[
                  "px-4 py-3 text-[10px] font-mono uppercase tracking-widest text-slate-500 font-semibold",
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
                className="px-4 py-6 text-center text-slate-400 text-sm"
              >
                No data available
              </td>
            </tr>
          ) : (
            rows.map((row, i) => (
              <tr
                key={i}
                className="border-b border-slate-100 last:border-0 hover:bg-slate-50/70 transition-colors"
              >
                {columns.map((col) => {
                  const value = row[col.key];
                  const displayValue = col.render
                    ? col.render(value, row)
                    : value === null || value === undefined
                    ? <span className="text-slate-400">—</span>
                    : String(value);

                  return (
                    <td
                      key={String(col.key)}
                      className={[
                        "px-4 py-3 text-xs sm:text-sm",
                        col.numeric
                          ? "font-mono tabular-nums text-right text-slate-900 font-medium"
                          : "font-body text-slate-800",
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
