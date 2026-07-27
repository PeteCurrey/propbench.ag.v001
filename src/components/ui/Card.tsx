import React from "react";

interface CardProps {
  variant?: "default" | "inset";
  className?: string;
  children: React.ReactNode;
}

/**
 * Card — base panel using bg-raised, with an optional inset variant using bg-inset.
 * Border is a hairline at the design-token border colour.
 */
export function Card({
  variant = "default",
  className = "",
  children,
}: CardProps) {
  const bg = variant === "inset" ? "bg-bg-inset" : "bg-bg-raised";

  return (
    <div
      className={[
        bg,
        "border border-border rounded-lg p-4",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
