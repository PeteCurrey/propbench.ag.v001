import { z } from "zod";

/* ─── Literal union types ─────────────────────────────────────────────────── */

export type DrawdownType =
  | "static"
  | "trailing_intraday"
  | "trailing_eod";

export type LimitBasis = "balance" | "equity";

/* ─── FirmProgram ─────────────────────────────────────────────────────────── */

/**
 * All rule fields are `T | null` (not `T | undefined` / optional).
 * null means "the firm does not publish this rule". It never means zero,
 * never means unlimited, never means "same as another firm".
 *
 * sourceUrl and verifiedDate are required strings — omission is a type error.
 */
export interface FirmProgram {
  slug: string;
  name: string;
  accountSizes: number[]; // USD unless currency is otherwise
  currency: "USD" | "GBP" | "EUR";
  phases: Array<{
    name: string;
    profitTargetPct: number | null;
    minTradingDays: number | null;
    maxDays: number | null; // null = unlimited
  }>;
  maxDrawdownPct: number | null;
  maxDrawdownType: DrawdownType | null;
  maxDrawdownBasis: LimitBasis | null;
  dailyLossPct: number | null;
  dailyLossBasis: LimitBasis | null;
  dailyResetTime: string | null; // "17:00"
  dailyResetTimezone: string | null; // IANA, e.g. "America/New_York"
  consistencyRulePct: number | null;
  profitSplitPct: number | null;
  payoutFrequencyDays: number | null;
  newsTradingAllowed: boolean | null;
  weekendHoldingAllowed: boolean | null;
  // Required — no omission permitted
  sourceUrl: string;
  verifiedDate: string; // ISO date, e.g. "2025-01-15"
}

/* ─── Firm ────────────────────────────────────────────────────────────────── */

export interface Firm {
  slug: string;
  name: string;
  logoPath: string | null;
  programs: FirmProgram[];
  affiliateUrl: string | null;
  discountCode: string | null;
  websiteUrl: string;
}

/* ─── Zod schemas ─────────────────────────────────────────────────────────── */

const drawdownTypeSchema = z.enum([
  "static",
  "trailing_intraday",
  "trailing_eod",
]);

const limitBasisSchema = z.enum(["balance", "equity"]);

export const firmProgramSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  accountSizes: z.array(z.number().positive()).min(1),
  currency: z.enum(["USD", "GBP", "EUR"]),
  phases: z
    .array(
      z.object({
        name: z.string().min(1),
        profitTargetPct: z.number().positive().nullable(),
        minTradingDays: z.number().int().positive().nullable(),
        maxDays: z.number().int().positive().nullable(),
      })
    )
    .min(1),
  maxDrawdownPct: z.number().positive().nullable(),
  maxDrawdownType: drawdownTypeSchema.nullable(),
  maxDrawdownBasis: limitBasisSchema.nullable(),
  dailyLossPct: z.number().positive().nullable(),
  dailyLossBasis: limitBasisSchema.nullable(),
  dailyResetTime: z
    .string()
    .regex(/^\d{2}:\d{2}$/, "Must be HH:MM format")
    .nullable(),
  dailyResetTimezone: z.string().nullable(),
  consistencyRulePct: z.number().positive().max(100).nullable(),
  profitSplitPct: z.number().positive().max(100).nullable(),
  payoutFrequencyDays: z.number().int().positive().nullable(),
  newsTradingAllowed: z.boolean().nullable(),
  weekendHoldingAllowed: z.boolean().nullable(),
  // Required — Zod enforces non-optional string, no default, no nullable
  sourceUrl: z.string().url("sourceUrl must be a valid URL"),
  verifiedDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "verifiedDate must be ISO date YYYY-MM-DD"),
});

export const firmSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  logoPath: z.string().nullable(),
  programs: z.array(firmProgramSchema).min(1),
  affiliateUrl: z.string().url().nullable(),
  discountCode: z.string().nullable(),
  websiteUrl: z.string().url("websiteUrl must be a valid URL"),
});

/* ─── Type inference from Zod (for runtime-validated objects) ─────────────── */
export type FirmProgramSchema = z.infer<typeof firmProgramSchema>;
export type FirmSchema = z.infer<typeof firmSchema>;
