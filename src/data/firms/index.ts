import type { Firm } from "./schema";
import { ftmo } from "./ftmo";

/**
 * Master list of all registered firms.
 * Add new firm files here — the validate:firms script checks every entry.
 */
export const firms: Firm[] = [ftmo];

/**
 * Look up a firm by its slug.
 * Returns undefined when no firm matches — callers must handle this case
 * explicitly (e.g. with notFound() in Next.js route handlers).
 */
export function getFirm(slug: string): Firm | undefined {
  return firms.find((f) => f.slug === slug);
}
