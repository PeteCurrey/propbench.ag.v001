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
    border: "border-l-blue-600",
    bg: "bg-blue-50/60 border-blue-200",
    label: "insight",
    labelColour: "text-blue-700",
  },
  warning: {
    border: "border-l-amber-500",
    bg: "bg-amber-50/60 border-amber-200",
    label: "warning",
    labelColour: "text-amber-700",
  },
  framework: {
    border: "border-l-slate-600",
    bg: "bg-slate-50 border-slate-200",
    label: "framework",
    labelColour: "text-slate-600",
  },
};

/**
 * Callout — Signal Centre style left-bordered panel for educational insight / warning notes.
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
        "border-l-4 border border-y border-r pl-4 py-3.5 pr-4 rounded-r-lg shadow-sm",
        border,
        bg,
        className,
      ].join(" ")}
    >
      <p className={`text-[10px] font-mono uppercase tracking-widest font-bold mb-1 ${labelColour}`}>
        {label}
      </p>
      {title && (
        <p className="text-sm font-semibold text-slate-900 mb-1">{title}</p>
      )}
      <div className="text-xs sm:text-sm text-slate-600 leading-relaxed">{children}</div>
    </div>
  );
}
