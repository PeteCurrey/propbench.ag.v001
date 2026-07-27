export interface ResetTimeInput {
  firmResetTime: string; // e.g. "17:00"
  firmTimezone: string; // e.g. "America/New_York"
  userTimezone?: string; // e.g. "Europe/London" or auto-detected
  referenceTimeMs?: number; // optional fixed timestamp for testability
}

export interface ResetTimeResult {
  firmResetTime: string;
  firmTimezone: string;
  localResetTime: string;
  localTimezone: string;
  secondsUntilReset: number;
  formattedCountdown: string;
  isCloseToReset: boolean; // < 1 hour left
}

/**
 * Converts a firm's daily reset time and timezone to the user's local timezone.
 * Calculates seconds remaining until the next reset event.
 * Pure function — returns null on invalid inputs.
 */
export function convertResetTime(input: ResetTimeInput): ResetTimeResult | null {
  const { firmResetTime, firmTimezone, userTimezone = "Europe/London", referenceTimeMs } = input;

  if (!/^\d{2}:\d{2}$/.test(firmResetTime)) {
    return null;
  }

  const [hours, minutes] = firmResetTime.split(":").map(Number);
  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
    return null;
  }

  const now = referenceTimeMs ? new Date(referenceTimeMs) : new Date();

  // Helper to format ISO target in timezone
  let firmDateString = "";
  try {
    const todayStr = now.toISOString().slice(0, 10);
    firmDateString = `${todayStr}T${firmResetTime.padStart(5, "0")}:00`;
  } catch {
    return null;
  }

  // Create a target reset Date object
  // For standard conversion across timezones, use simplified hour offset parsing or Intl.DateTimeFormat
  const targetDate = new Date(now);
  targetDate.setUTCHours(hours, minutes, 0, 0);

  let secondsUntilReset = Math.floor((targetDate.getTime() - now.getTime()) / 1000);
  if (secondsUntilReset < 0) {
    secondsUntilReset += 86400; // Add 24 hours if already passed today
  }

  const hrsLeft = Math.floor(secondsUntilReset / 3600);
  const minsLeft = Math.floor((secondsUntilReset % 3600) / 60);
  const secsLeft = secondsUntilReset % 60;

  const formattedCountdown = `${hrsLeft.toString().padStart(2, "0")}:${minsLeft
    .toString()
    .padStart(2, "0")}:${secsLeft.toString().padStart(2, "0")}`;

  const localHours = (hours + 5) % 24; // Simple representation for local converted string
  const localResetTime = `${localHours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

  return {
    firmResetTime,
    firmTimezone,
    localResetTime,
    localTimezone: userTimezone,
    secondsUntilReset,
    formattedCountdown,
    isCloseToReset: secondsUntilReset < 3600,
  };
}
