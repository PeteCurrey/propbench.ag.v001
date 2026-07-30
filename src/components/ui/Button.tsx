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
    "bg-accent text-bg-base font-sans font-medium tracking-wider hover:bg-accent-hover active:bg-slate-950 " +
    "border border-accent transition-colors",
  secondary:
    "bg-transparent text-text-secondary font-sans font-normal border border-border-strong hover:border-text-secondary " +
    "active:bg-bg-raised transition-colors",
  ghost:
    "bg-transparent text-text-muted font-sans font-normal border border-transparent hover:text-text-primary " +
    "hover:bg-bg-raised active:bg-bg-inset transition-colors",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "text-[0.8125rem] px-4 py-2",
  md: "text-[0.875rem] px-6 py-2.5",
  lg: "text-[0.875rem] px-7 py-3",
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
