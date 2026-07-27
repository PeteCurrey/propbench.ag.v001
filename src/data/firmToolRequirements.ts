import type { Firm, FirmProgram } from "./firms/schema";

export type RequiredProgramField = keyof FirmProgram;

/**
 * Mapping of calculator tool slugs to their required non-null FirmProgram fields.
 * A firm-preset page (/tools/[tool]/[firm]) will ONLY be generated if every
 * field in this required list is non-null on at least one program of the firm.
 */
export const TOOL_REQUIREMENTS: Record<string, RequiredProgramField[]> = {
  "drawdown-calculator": ["maxDrawdownPct", "maxDrawdownType", "maxDrawdownBasis"],
  "daily-loss-limit-calculator": ["dailyLossPct", "dailyLossBasis", "dailyResetTime", "dailyResetTimezone"],
  "consistency-rule-checker": ["consistencyRulePct"],
  "payout-projector": ["profitSplitPct", "payoutFrequencyDays"],
  "reset-time-converter": ["dailyResetTime", "dailyResetTimezone"],
};

export interface ValidationResult {
  isValid: boolean;
  missingField?: string;
  program?: FirmProgram;
}

/**
 * Validates whether a firm has complete non-null data for a given calculator tool.
 * Returns the matching valid program or the missing field name.
 */
export function validateFirmForTool(firm: Firm, toolSlug: string): ValidationResult {
  const requiredFields = TOOL_REQUIREMENTS[toolSlug];

  // If a tool doesn't require specific firm rule fields, check if firm has at least one valid program
  if (!requiredFields || requiredFields.length === 0) {
    const program = firm.programs[0];
    if (!program) {
      return { isValid: false, missingField: "programs" };
    }
    return { isValid: true, program };
  }

  // Find a program that has ALL required fields non-null
  for (const program of firm.programs) {
    let allValid = true;
    let firstMissing: string | undefined = undefined;

    for (const field of requiredFields) {
      const val = program[field];
      if (val === null || val === undefined) {
        allValid = false;
        firstMissing = field;
        break;
      }
    }

    if (allValid) {
      return { isValid: true, program };
    } else {
      return { isValid: false, missingField: firstMissing };
    }
  }

  return { isValid: false, missingField: "all_programs_incomplete" };
}
