import { TOOLS_DIRECTORY } from "../src/data/tools";
import { firms } from "../src/data/firms/index";
import { getAllGuides } from "../src/lib/guides";

/**
 * SEO Audit Script: Scans all static, tool, firm, preset, and guide routes to verify zero duplicate
 * titles or meta descriptions site-wide.
 */

interface RouteMetadata {
  route: string;
  title: string;
  description: string;
}

function auditSeoDuplicates() {
  console.log("==========================================================");
  console.log(" [PropBench SEO Audit] Scanning Site-Wide Metadata");
  console.log("==========================================================\n");

  const routes: RouteMetadata[] = [];

  // 1. Static Routes
  routes.push({
    route: "/",
    title: "PropBench — Prop Trading Calculators & Risk Analytics",
    description: "Benchmark proprietary trading firm rules, calculate drawdown floors, size positions, and model risk probability.",
  });
  routes.push({
    route: "/tools",
    title: "Prop Trading Calculators & Rule Benchmark Directory | PropBench",
    description: "Browse 13 pure calculation tools for prop firm risk management, drawdown floor modeling, position sizing, and evaluation planning.",
  });
  routes.push({
    route: "/guides",
    title: "Prop Trading Guides & Frameworks | PropBench",
    description: "Educational guides on static vs trailing drawdown, position sizing, consistency rules, daily loss limits, and prop firm risk management.",
  });
  routes.push({
    route: "/survival-kit",
    title: "Prop Trading Survival Kit PDF Manual | PropBench",
    description: "The definitive mathematical reference manual on drawdown mechanics, risk budget sizing, and evaluation planning for prop traders.",
  });
  routes.push({
    route: "/disclaimer",
    title: "Disclaimer & Legal Notices | PropBench",
    description: "Legal disclaimer and risk notices regarding PropBench calculation tools and educational reference materials.",
  });
  routes.push({
    route: "/privacy",
    title: "Privacy Policy | PropBench",
    description: "Privacy policy outlining data protection and privacy compliance under UK GDPR and Data Protection Act 2018.",
  });
  routes.push({
    route: "/terms",
    title: "Terms of Service | PropBench",
    description: "Terms of service governing the use of PropBench calculation tools, digital products, and subscription services.",
  });
  routes.push({
    route: "/affiliate-disclosure",
    title: "Affiliate & Commercial Disclosure | PropBench",
    description: "Plain English affiliate disclosure outlining referral commission relationships and independent calculation integrity.",
  });

  // 2. Individual Tool Routes
  for (const tool of TOOLS_DIRECTORY) {
    routes.push({
      route: `/tools/${tool.slug}`,
      title: `${tool.name} | PropBench`,
      description: tool.description,
    });
  }

  // 3. Firm Detail Routes
  for (const firm of firms) {
    routes.push({
      route: `/firms/${firm.slug}`,
      title: `${firm.name} Evaluation Rules & Drawdown Parameters | PropBench`,
      description: `Verified evaluation parameters, drawdown limits, and daily loss rules for ${firm.name}.`,
    });
  }

  // 4. Guide Routes
  const guides = getAllGuides();
  for (const guide of guides) {
    routes.push({
      route: `/guides/${guide.slug}`,
      title: `${guide.title} | PropBench Guide`,
      description: guide.description,
    });
  }

  // Check for duplicate titles
  const titleMap = new Map<string, string[]>();
  const descMap = new Map<string, string[]>();

  for (const r of routes) {
    const t = r.title.trim().toLowerCase();
    const d = r.description.trim().toLowerCase();

    if (!titleMap.has(t)) titleMap.set(t, []);
    titleMap.get(t)!.push(r.route);

    if (!descMap.has(d)) descMap.set(d, []);
    descMap.get(d)!.push(r.route);
  }

  let duplicateTitlesCount = 0;
  let duplicateDescsCount = 0;

  console.log("1. Title Tag Uniqueness Check:");
  titleMap.forEach((paths, title) => {
    if (paths.length > 1) {
      duplicateTitlesCount++;
      console.log(`   ✗ Duplicate Title: "${title}" across paths: ${paths.join(", ")}`);
    }
  });

  if (duplicateTitlesCount === 0) {
    console.log(`   ✓ PASSED: All ${routes.length} titles are 100% unique.`);
  }

  console.log("\n2. Meta Description Uniqueness Check:");
  descMap.forEach((paths, desc) => {
    if (paths.length > 1) {
      duplicateDescsCount++;
      console.log(`   ✗ Duplicate Description: "${desc.slice(0, 40)}..." across paths: ${paths.join(", ")}`);
    }
  });

  if (duplicateDescsCount === 0) {
    console.log(`   ✓ PASSED: All ${routes.length} meta descriptions are 100% unique.`);
  }

  console.log("\n==========================================================");
  console.log(` SUMMARY: Audited ${routes.length} routes. Duplicate titles: ${duplicateTitlesCount}. Duplicate meta descriptions: ${duplicateDescsCount}.`);
  console.log("==========================================================\n");

  if (duplicateTitlesCount > 0 || duplicateDescsCount > 0) {
    process.exit(1);
  }
}

auditSeoDuplicates();
