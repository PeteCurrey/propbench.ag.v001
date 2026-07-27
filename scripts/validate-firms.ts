#!/usr/bin/env tsx
/**
 * validate-firms.ts — validates every firm file against the Zod schema.
 *
 * Run via: npm run validate:firms
 * Wired into: npm run build (runs before next build)
 *
 * Exit codes:
 *   0 — all firms valid
 *   1 — one or more validation errors (build must be aborted)
 */

import { firms } from "../src/data/firms/index";
import { firmSchema } from "../src/data/firms/schema";

let errorCount = 0;

console.log(`\nValidating ${firms.length} firm file(s)...\n`);

for (const firm of firms) {
  const result = firmSchema.safeParse(firm);

  if (result.success) {
    console.log(`  ✓  ${firm.slug}`);
  } else {
    errorCount++;
    console.error(`  ✗  ${firm.slug} — ${result.error.issues.length} error(s):`);
    for (const issue of result.error.issues) {
      const path = issue.path.join(" → ") || "(root)";
      console.error(`       [${path}] ${issue.message}`);
    }
  }
}

console.log();

if (errorCount > 0) {
  console.error(
    `validate:firms FAILED — ${errorCount} firm(s) did not pass validation.\n` +
      `Fix the errors above before building.\n`
  );
  process.exit(1);
} else {
  console.log(`validate:firms PASSED — all firms valid.\n`);
  process.exit(0);
}
