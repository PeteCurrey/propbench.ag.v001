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
 * NumberInput — numeric input with an optional right-aligned unit suffix.
 * Always renders in DM Mono (font-mono) per the design rule that numbers
 * never render in a proportional font.
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
          className="text-xs font-medium text-text-muted uppercase tracking-wide"
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
            "w-full bg-bg-inset text-text-primary font-mono text-sm",
            "border rounded-md px-3 py-2",
            unit ? "pr-12" : "",
            "placeholder:text-text-muted/50 placeholder:font-body",
            "transition-colors duration-150",
            "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
            "focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-1 focus:ring-offset-bg-base focus:border-accent",
            error
              ? "border-danger focus:ring-danger"
              : "border-border hover:border-accent-dim",
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
            className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-text-muted font-mono text-sm"
          >
            {unit}
          </span>
        )}
      </div>
      {helperText && !error && (
        <p className="text-[11px] text-text-muted/80 font-sans">{helperText}</p>
      )}
      {error && (
        <p id={`${id}-error`} className="text-xs text-danger" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
