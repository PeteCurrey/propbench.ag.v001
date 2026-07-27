import React from "react";

type CalloutVariant = "insight" | "warning" | "framework";

interface CalloutProps {
  variant?: CalloutVariant;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const variantConfig: Record<
  CalloutVariant,
  { border: string; bg: string; label: string; labelColour: string }
> = {
  insight: {
    border: "border-l-accent",
    bg: "bg-accent/5",
    label: "insight",
    labelColour: "text-accent",
  },
  warning: {
    border: "border-l-warning",
    bg: "bg-warning/5",
    label: "warning",
    labelColour: "text-warning",
  },
  framework: {
    border: "border-l-text-muted",
    bg: "bg-bg-raised",
    label: "framework",
    labelColour: "text-text-muted",
  },
};

/**
 * Callout — left-bordered panel for insight / warning / framework notes.
 * Educational framing only — no performance claims (FCA Rule 4).
 */
export function Callout({
  variant = "insight",
  title,
  children,
  className = "",
}: CalloutProps) {
  const { border, bg, label, labelColour } = variantConfig[variant];

  return (
    <div
      role="note"
      className={[
        "border-l-2 pl-4 py-3 pr-4 rounded-r-lg",
        border,
        bg,
        className,
      ].join(" ")}
    >
      <p className={`text-[10px] font-mono uppercase tracking-widest mb-1 ${labelColour}`}>
        {label}
      </p>
      {title && (
        <p className="text-sm font-semibold text-text-primary mb-1">{title}</p>
      )}
      <div className="text-sm text-text-muted leading-relaxed">{children}</div>
    </div>
  );
}
