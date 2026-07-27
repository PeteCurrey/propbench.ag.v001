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
 * Select — Signal Centre style light background dropdown with crisp slate borders.
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
          className="text-[11px] font-mono font-medium text-slate-500 uppercase tracking-wider"
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
            "w-full appearance-none bg-white text-slate-900 font-body text-sm shadow-sm",
            "border rounded-md px-3.5 py-2 pr-8",
            "transition-colors duration-150 cursor-pointer",
            "focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900",
            error
              ? "border-rose-500 focus:ring-rose-500"
              : "border-slate-300 hover:border-slate-400",
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
          className="pointer-events-none absolute inset-y-0 right-3.5 flex items-center text-slate-500"
          aria-hidden="true"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
            <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
      {error && (
        <p id={`${id}-error`} className="text-xs text-rose-600 font-medium" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
