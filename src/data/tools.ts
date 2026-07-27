export interface ToolDef {
  slug: string;
  name: string;
  category: "Risk & Sizing" | "Challenge Planning" | "Funded Account" | "Reference";
  description: string;
  primaryInput: string;
}

export const TOOLS_DIRECTORY: ToolDef[] = [
  {
    slug: "drawdown-calculator",
    name: "Drawdown & Floor Visualizer",
    category: "Risk & Sizing",
    description: "Calculates static and trailing drawdown breach limits, remaining equity buffer, and zone safety status.",
    primaryInput: "Initial balance & Max drawdown %",
  },
  {
    slug: "position-size-calculator",
    name: "Position Size Calculator",
    category: "Risk & Sizing",
    description: "Determines recommended lot sizes and cash-at-risk based on stop loss pips and risk percentage.",
    primaryInput: "Account balance & Stop loss pips",
  },
  {
    slug: "risk-of-ruin-calculator",
    name: "Risk of Ruin & Losing Streak Table",
    category: "Risk & Sizing",
    description: "Models probability of account breach and generates a 1–20 consecutive loss streak table.",
    primaryInput: "Win rate % & Reward-to-risk ratio",
  },
  {
    slug: "pip-value-calculator",
    name: "Pip Value Calculator",
    category: "Risk & Sizing",
    description: "Calculates exact cash value per pip for various forex instruments, metals, and lot sizes.",
    primaryInput: "Instrument & Trade size lots",
  },
  {
    slug: "lot-size-calculator",
    name: "Lot Size & Risk Calculator",
    category: "Risk & Sizing",
    description: "Computes exact position lot sizes given a fixed dollar risk or fixed percentage risk.",
    primaryInput: "Dollar risk amount & Stop loss pips",
  },
  {
    slug: "challenge-planner",
    name: "Challenge Target Planner",
    category: "Challenge Planning",
    description: "Calculates daily profit targets and plots a projected day-by-day equity progress line.",
    primaryInput: "Target profit % & Trading days",
  },
  {
    slug: "challenge-simulator",
    name: "Monte Carlo Challenge Simulator",
    category: "Challenge Planning",
    description: "Simulates 1,000 randomized challenge runs to plot outcome distribution histograms.",
    primaryInput: "Win rate %, R:R & Risk per trade",
  },
  {
    slug: "expectancy-calculator",
    name: "Trade Expectancy Calculator",
    category: "Challenge Planning",
    description: "Calculates mathematical edge per trade and projected return over 100 executed trades.",
    primaryInput: "Win rate % & Average win/loss",
  },
  {
    slug: "compounding-calculator",
    name: "Compounding Growth Simulator",
    category: "Challenge Planning",
    description: "Projects multi-period equity compounding with configurable reinvestment vs withdrawal splits.",
    primaryInput: "Return per period & Number of periods",
  },
  {
    slug: "consistency-rule-checker",
    name: "Consistency Rule Checker",
    category: "Funded Account",
    description: "Verifies if your best trading day exceeds prop firm single-day profit cap rules.",
    primaryInput: "Total profit & Best day profit",
  },
  {
    slug: "daily-loss-limit-calculator",
    name: "Daily Loss Limit Calculator",
    category: "Funded Account",
    description: "Calculates daily drawdown thresholds and remaining buffer relative to start-of-day equity.",
    primaryInput: "Start-of-day balance & Daily loss %",
  },
  {
    slug: "payout-projector",
    name: "Payout & Profit Split Calculator",
    category: "Funded Account",
    description: "Calculates net profit split allocations and fee adjustments in pure calculational framing.",
    primaryInput: "Gross profit & Profit split %",
  },
  {
    slug: "reset-time-converter",
    name: "Daily Reset Time Converter",
    category: "Reference",
    description: "Converts firm reset times to local timezone with a live countdown timer to the next reset.",
    primaryInput: "Firm reset time & Timezone",
  },
];
