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
    "bg-accent text-bg-base font-semibold hover:bg-accent/90 active:bg-accent/80 " +
    "border border-accent shadow-sm",
  secondary:
    "bg-transparent text-text-primary border border-border hover:border-accent-dim " +
    "hover:text-accent active:bg-bg-raised",
  ghost:
    "bg-transparent text-text-muted border border-transparent hover:text-text-primary " +
    "hover:bg-bg-raised active:bg-bg-inset",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "text-xs px-3 py-1.5 rounded",
  md: "text-sm px-4 py-2 rounded-md",
  lg: "text-base px-6 py-3 rounded-md",
};

/**
 * Button — three variants: primary (gold), secondary (outline), ghost.
 * All sizing uses rem-based values for accessibility.
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
        "font-body transition-colors duration-150",
        "disabled:opacity-40 disabled:cursor-not-allowed",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base",
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
