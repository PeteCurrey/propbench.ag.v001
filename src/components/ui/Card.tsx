import React from "react";

interface CardProps {
  variant?: "default" | "inset";
  className?: string;
  children: React.ReactNode;
}

/**
 * Card — Signal Centre style clean white panel with crisp light slate border.
 */
export function Card({
  variant = "default",
  className = "",
  children,
}: CardProps) {
  const bg = variant === "inset" ? "bg-slate-50/80" : "bg-white";

  return (
    <div
      className={[
        bg,
        "border border-slate-200 shadow-sm rounded-lg p-5 transition-colors",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
