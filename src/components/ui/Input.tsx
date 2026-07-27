import React, { useId } from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  id?: string;
}

/**
 * Input — text input styled to design tokens.
 * Renders an accessible label when provided.
 * Error state replaces border with danger colour and shows message below.
 */
export function Input({
  label,
  error,
  id: customId,
  className = "",
  ...props
}: InputProps) {
  const generatedId = useId();
  const id = customId || generatedId;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label
          htmlFor={id}
          className="text-xs font-medium text-text-muted uppercase tracking-wide"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        className={[
          "w-full bg-bg-inset text-text-primary font-body text-sm",
          "border rounded-md px-3 py-2",
          "placeholder:text-text-muted/50",
          "transition-colors duration-150",
          "focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-1 focus:ring-offset-bg-base focus:border-accent",
          error
            ? "border-danger focus:ring-danger"
            : "border-border hover:border-accent-dim",
          className,
        ].join(" ")}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="text-xs text-danger" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
