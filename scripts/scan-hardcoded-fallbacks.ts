import fs from "fs";
import path from "path";

/**
 * Audit scanner that inspects src/ for hardcoded numeric fallbacks in calculation
 * or UI display paths (e.g. `|| 10`, `?? 100000`, `?? 8`, default state initializers).
 * Reports all findings itemized for review without modifying code silently.
 */

interface FallbackFinding {
  filePath: string;
  line: number;
  snippet: string;
  patternMatched: string;
}

function scanForFallbacks() {
  console.log("==========================================================");
  console.log(" [PropBench Audit] Scanning Codebase for Numeric Fallbacks");
  console.log("==========================================================\n");

  const srcDir = path.join(process.cwd(), "src");
  const files = getFilesRecursive(srcDir, [".ts", ".tsx"]);

  // Regex patterns matching fallback operators (|| number, ?? number) or hardcoded default numeric initializers
  const fallbackRegexes = [
    { pattern: /(\|\||\?\?)\s*(-?\d+(\.\d+)?)/, label: "Fallback Operator (|| number or ?? number)" },
    { pattern: /useState<number>\s*\(\s*(-?\d+(\.\d+)?)\s*\)/, label: "State Initializer Default (useState(number))" },
    { pattern: /calculate\w+\([^)]*(-?\d+(\.\d+)?)/, label: "Inline Hardcoded Calc Argument" },
  ];

  const findings: FallbackFinding[] = [];

  for (const filePath of files) {
    const content = fs.readFileSync(filePath, "utf-8");
    const lines = content.split("\n");

    lines.forEach((line, idx) => {
      // Ignore comment lines
      const trimmed = line.trim();
      if (trimmed.startsWith("//") || trimmed.startsWith("/*") || trimmed.startsWith("*")) return;

      for (const { pattern, label } of fallbackRegexes) {
        const match = line.match(pattern);
        if (match) {
          const relativePath = path.relative(process.cwd(), filePath);
          findings.push({
            filePath: relativePath,
            line: idx + 1,
            snippet: line.trim(),
            patternMatched: label,
          });
        }
      }
    });
  }

  console.log(`Scan Complete — Found ${findings.length} numeric fallback / default instances across ${files.length} files:\n`);

  findings.forEach((item, index) => {
    console.log(`${index + 1}. [${item.patternMatched}] ${item.filePath}:${item.line}`);
    console.log(`   Snippet: "${item.snippet}"\n`);
  });

  console.log("==========================================================");
  console.log(" Note: Listed for user review. Zero instances modified silently.");
  console.log("==========================================================\n");
}

function getFilesRecursive(dir: string, extensions: string[]): string[] {
  let results: string[] = [];
  if (!fs.existsSync(dir)) return results;

  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat && stat.isDirectory()) {
      if (!file.startsWith(".") && file !== "node_modules") {
        results = results.concat(getFilesRecursive(filePath, extensions));
      }
    } else {
      if (extensions.some((ext) => file.endsWith(ext))) {
        results.push(filePath);
      }
    }
  }
  return results;
}

scanForFallbacks();
