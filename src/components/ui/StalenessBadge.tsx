import { isStale } from "@/data/firms/utils";

interface StalenessBadgeProps {
  verifiedDate: string;
}

/**
 * StalenessBadge — renders a visible warning when firm data is older than 90 days.
 * Renders nothing when data is fresh.
 *
 * This component is the UI enforcement of the 90-day staleness rule.
 * Any page displaying firm-specific data must include this badge.
 */
export function StalenessBadge({ verifiedDate }: StalenessBadgeProps) {
  if (!isStale(verifiedDate)) {
    return null;
  }

  return (
    <span
      role="alert"
      aria-label="Data may be out of date — verify with firm before use"
      className="inline-flex items-center gap-1.5 rounded-full border border-warning/40 bg-warning/10 px-2.5 py-1 text-[11px] font-mono font-medium text-warning"
    >
      <span aria-hidden="true">⚠</span>
      Data not verified in 90+ days — check firm T&amp;Cs
    </span>
  );
}
