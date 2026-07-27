# calc

Pure calculation functions live here. Rules:
- No imports from React, Next.js, or any UI layer
- Every function must have a corresponding `.test.ts` file in the same directory
- No hardcoded fallback values — callers must provide all inputs
- Functions return `null` when inputs are insufficient to produce a result

See /src/lib/supabase/ for data-layer helpers.
