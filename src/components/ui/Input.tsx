import React, { useId } from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  id?: string;
}

/**
 * Input — Signal Centre style light background text input with crisp slate borders.
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
          className="text-[11px] font-mono font-medium text-slate-500 uppercase tracking-wider"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        className={[
          "w-full bg-white text-slate-900 font-body text-sm",
          "border rounded-md px-3.5 py-2 shadow-sm",
          "placeholder:text-slate-400",
          "transition-colors duration-150",
          "focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900",
          error
            ? "border-rose-500 focus:ring-rose-500"
            : "border-slate-300 hover:border-slate-400",
          className,
        ].join(" ")}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="text-xs text-rose-600 font-medium" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
