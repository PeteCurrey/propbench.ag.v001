import React, { useId } from "react";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "onChange"> {
  label?: string;
  options: SelectOption[];
  error?: string;
  id?: string;
  onChange?: (val: string) => void;
}

/**
 * Select — native <select> styled to design tokens.
 * Native select is preferred for mobile usability (one-handed, mid-session).
 */
export function Select({
  label,
  options,
  error,
  id: customId,
  onChange,
  className = "",
  value,
  ...props
}: SelectProps) {
  const generatedId = useId();
  const id = customId || generatedId;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

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
      <div className="relative w-full">
        <select
          id={id}
          value={value ?? ""}
          onChange={handleChange}
          className={[
            "w-full appearance-none bg-bg-inset text-text-primary font-body text-sm",
            "border rounded-md px-3 py-2 pr-8",
            "transition-colors duration-150 cursor-pointer",
            "focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-1 focus:ring-offset-bg-base focus:border-accent",
            error
              ? "border-danger focus:ring-danger"
              : "border-border hover:border-accent-dim",
            className,
          ].join(" ")}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {/* Chevron icon */}
        <span
          className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-text-muted"
          aria-hidden="true"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
            <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
      {error && (
        <p id={`${id}-error`} className="text-xs text-danger" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
