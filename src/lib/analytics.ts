/**
 * Plausible cookieless analytics helper emitting custom events.
 * Zero personal data (PII) tracked.
 */

export type AnalyticsEvent =
  | { name: "calculator_used"; props: { tool: string } }
  | { name: "affiliate_click"; props: { firm: string; tool?: string } }
  | { name: "pdf_checkout_started"; props?: Record<string, string> }
  | { name: "pdf_purchase_completed"; props?: Record<string, string> }
  | { name: "subscription_started"; props?: Record<string, string> };

declare global {
  interface Window {
    plausible?: (eventName: string, options?: { props?: Record<string, string | number | boolean> }) => void;
  }
}

export function trackEvent(event: AnalyticsEvent) {
  if (typeof window !== "undefined" && window.plausible) {
    window.plausible(event.name, { props: event.props });
  } else {
    console.log(`[PLAUSIBLE MOCK EVENT] ${event.name}`, event.props || "");
  }
}
