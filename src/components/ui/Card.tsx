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
  const bg = variant === "inset" ? "bg-bg-raised" : "bg-bg-base";

  return (
    <div
      className={[
        bg,
        "border border-border rounded-none p-5 transition-colors",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
