import fs from "fs";
import path from "path";

/**
 * Banned terms list governed by FCA financial promotion rules.
 */
const BANNED_TERMS = [
  "guaranteed",
  "guarantee",
  "risk-free",
  "riskless",
  "passive income",
  "average trader earns",
  "you will make",
  "proven returns",
  "get funded fast",
  "easy money",
  "no risk",
  "we predict",
  "will profit",
];

/**
 * Allowlist for explicit false positives.
 * Requires an explicit code change to add or modify entries.
 */
interface AllowlistEntry {
  filePathSubstring: string;
  term: string;
  reason: string;
}

const ALLOWLIST: AllowlistEntry[] = [
  {
    filePathSubstring: "scripts/check-forbidden-terms.ts",
    term: "*",
    reason: "The scanner script itself references banned terms for detection.",
  },
  {
    filePathSubstring: "src/app/survival-kit/page.tsx",
    term: "guarantee",
    reason: "Verbatim disclaimer text explicitly stating 'No material herein constitutes guarantee of evaluation passage'.",
  },
  {
    filePathSubstring: "src/app/page.tsx",
    term: "guarantee",
    reason: "FCA risk warning explicitly stating 'PropBench does not offer investment advice, financial promotion, or performance guarantees'.",
  },
  {
    filePathSubstring: "src/components/layout/Footer.tsx",
    term: "guarantee",
    reason: "Footer risk warning explicitly stating 'no performance guarantees'.",
  },
];

function isAllowlisted(filePath: string, term: string): boolean {
  const relativePath = path.relative(process.cwd(), filePath).replace(/\\/g, "/");
  return ALLOWLIST.some(
    (entry) =>
      relativePath.includes(entry.filePathSubstring) &&
      (entry.term === "*" || entry.term.toLowerCase() === term.toLowerCase())
  );
}

function scanDirectory(dir: string, extensions: string[]): string[] {
  let results: string[] = [];
  if (!fs.existsSync(dir)) return results;

  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat && stat.isDirectory()) {
      if (!file.startsWith(".") && file !== "node_modules" && file !== ".next") {
        results = results.concat(scanDirectory(filePath, extensions));
      }
    } else {
      if (extensions.some((ext) => file.endsWith(ext))) {
        results.push(filePath);
      }
    }
  }
  return results;
}

function runForbiddenTermsCheck() {
  console.log("==========================================================");
  console.log(" [PropBench CI] Scanning Codebase for Banned Terms");
  console.log("==========================================================\n");

  const scanDirs = [
    path.join(process.cwd(), "src"),
    path.join(process.cwd(), "content"),
    path.join(process.cwd(), "scripts"),
  ];

  const extensions = [".ts", ".tsx", ".md", ".mdx", ".json"];
  let filesToScan: string[] = [];

  for (const dir of scanDirs) {
    filesToScan = filesToScan.concat(scanDirectory(dir, extensions));
  }

  let totalViolations = 0;
  const violationDetails: string[] = [];

  for (const filePath of filesToScan) {
    const content = fs.readFileSync(filePath, "utf-8");
    const lines = content.split("\n");

    lines.forEach((line, index) => {
      const lowerLine = line.toLowerCase();
      for (const term of BANNED_TERMS) {
        if (lowerLine.includes(term.toLowerCase())) {
          if (isAllowlisted(filePath, term)) {
            // Allowlisted false positive
            continue;
          }

          totalViolations++;
          const relativePath = path.relative(process.cwd(), filePath);
          violationDetails.push(
            `  ✗ Violation [${term}]: ${relativePath}:${index + 1}\n    Line: "${line.trim()}"`
          );
        }
      }
    });
  }

  if (totalViolations > 0) {
    console.error(`FAILED — Found ${totalViolations} forbidden string violation(s):\n`);
    violationDetails.forEach((detail) => console.error(detail));
    console.error("\nAction required: Remove promotional language or add explicit code allowlist entry.");
    process.exit(1);
  } else {
    console.log("✓ PASSED — Zero forbidden promotional terms found across all scanned files.");
    console.log(`Scanned ${filesToScan.length} files. Allowlisted false positives: ${ALLOWLIST.length}.\n`);
  }
}

runForbiddenTermsCheck();
