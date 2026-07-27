import React from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[#1B2A4A] text-white font-mono uppercase tracking-wider font-semibold hover:bg-[#0F172A] active:bg-[#0A1224] " +
    "border border-[#1B2A4A] shadow-sm",
  secondary:
    "bg-white text-slate-800 font-mono uppercase tracking-wider font-medium border border-slate-300 hover:bg-slate-50 " +
    "hover:border-slate-400 active:bg-slate-100 shadow-sm",
  ghost:
    "bg-transparent text-slate-600 font-mono uppercase tracking-wider border border-transparent hover:text-slate-900 " +
    "hover:bg-slate-100 active:bg-slate-200",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "text-xs px-3.5 py-1.5 rounded",
  md: "text-xs px-5 py-2.5 rounded-md",
  lg: "text-xs px-7 py-3.5 rounded-md font-bold",
};

/**
 * Button — Signal Centre style corporate navy primary & crisp outline secondary.
 */
export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={[
        "inline-flex items-center justify-center gap-2",
        "transition-all duration-150 select-none",
        "disabled:opacity-40 disabled:cursor-not-allowed",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2",
        variantClasses[variant],
        sizeClasses[size],
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}
