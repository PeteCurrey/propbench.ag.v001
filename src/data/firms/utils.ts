/**
 * Utility helpers for firm data management.
 * Pure functions — no imports from React or Next.js.
 */

const STALE_THRESHOLD_DAYS = 90;

/**
 * Returns true if more than 90 calendar days have elapsed since verifiedDate.
 * Used to trigger the StalenessBadge on any displayed firm data.
 *
 * @param verifiedDate - ISO date string, e.g. "2025-01-15"
 */
export function isStale(verifiedDate: string): boolean {
  const verified = new Date(verifiedDate);
  const now = new Date();
  const diffMs = now.getTime() - verified.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  return diffDays > STALE_THRESHOLD_DAYS;
}

/**
 * Returns the number of days since verifiedDate (positive = in the past).
 */
export function daysSinceVerified(verifiedDate: string): number {
  const verified = new Date(verifiedDate);
  const now = new Date();
  return Math.floor((now.getTime() - verified.getTime()) / (1000 * 60 * 60 * 24));
}
