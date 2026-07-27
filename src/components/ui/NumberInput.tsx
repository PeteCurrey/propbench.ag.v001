import React, { useId } from "react";

export interface NumberInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  label?: string;
  unit?: string;
  error?: string;
  helperText?: string;
  id?: string;
  value?: number | string;
  onChange?: (val: number) => void;
}

/**
 * NumberInput — Signal Centre style light background numeric input with crisp slate borders.
 */
export function NumberInput({
  label,
  unit,
  error,
  helperText,
  id: customId,
  value,
  onChange,
  className = "",
  min,
  max,
  step,
  ...props
}: NumberInputProps) {
  const generatedId = useId();
  const id = customId || generatedId;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      const parsed = parseFloat(e.target.value);
      onChange(isNaN(parsed) ? 0 : parsed);
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
        <input
          id={id}
          type="number"
          inputMode="decimal"
          value={value ?? ""}
          onChange={handleChange}
          min={min}
          max={max}
          step={step}
          data-numeric
          className={[
            "w-full bg-white text-slate-900 font-mono text-sm shadow-sm",
            "border rounded-md px-3.5 py-2",
            unit ? "pr-12" : "",
            "placeholder:text-slate-400 placeholder:font-body",
            "transition-colors duration-150",
            "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
            "focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900",
            error
              ? "border-rose-500 focus:ring-rose-500"
              : "border-slate-300 hover:border-slate-400",
            className,
          ].join(" ")}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={
            [unit ? `${id}-unit` : "", error ? `${id}-error` : ""]
              .filter(Boolean)
              .join(" ") || undefined
          }
          {...props}
        />
        {unit && (
          <span
            id={`${id}-unit`}
            aria-label={unit}
            className="pointer-events-none absolute inset-y-0 right-3.5 flex items-center text-slate-500 font-mono text-xs font-medium uppercase"
          >
            {unit}
          </span>
        )}
      </div>
      {helperText && !error && (
        <p className="text-[11px] text-slate-500 font-mono">{helperText}</p>
      )}
      {error && (
        <p id={`${id}-error`} className="text-xs text-rose-600 font-medium" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
