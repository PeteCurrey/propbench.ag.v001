import React from "react";
import { Callout } from "@/components/ui/Callout";
import DrawdownCalculatorPage from "@/app/tools/drawdown-calculator/page";
import PositionSizeCalculatorPage from "@/app/tools/position-size-calculator/page";
import ChallengePlannerPage from "@/app/tools/challenge-planner/page";
import RiskOfRuinCalculatorPage from "@/app/tools/risk-of-ruin-calculator/page";
import PipValueCalculatorPage from "@/app/tools/pip-value-calculator/page";
import LotSizeCalculatorPage from "@/app/tools/lot-size-calculator/page";
import ExpectancyCalculatorPage from "@/app/tools/expectancy-calculator/page";
import CompoundingCalculatorPage from "@/app/tools/compounding-calculator/page";
import ConsistencyRuleCheckerPage from "@/app/tools/consistency-rule-checker/page";
import DailyLossLimitCalculatorPage from "@/app/tools/daily-loss-limit-calculator/page";
import PayoutProjectorPage from "@/app/tools/payout-projector/page";
import ChallengeSimulatorPage from "@/app/tools/challenge-simulator/page";
import ResetTimeConverterPage from "@/app/tools/reset-time-converter/page";

function createHeading(level: 2 | 3) {
  const Component = ({ children }: { children?: React.ReactNode }) => {
    const text = typeof children === "string" ? children : String(children || "");
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

    if (level === 2) {
      return (
        <h2 id={id} className="font-display font-bold text-2xl text-text-primary mt-10 mb-4 scroll-mt-20">
          {children}
        </h2>
      );
    }
    return (
      <h3 id={id} className="font-display font-semibold text-xl text-text-primary mt-8 mb-3 scroll-mt-20">
        {children}
      </h3>
    );
  };
  Component.displayName = `Heading${level}`;
  return Component;
}

export const mdxComponents = {
  // Primitives
  Callout,
  h2: createHeading(2),
  h3: createHeading(3),

  // Live Embedded Calculators for MDX inline rendering
  DrawdownCalculator: DrawdownCalculatorPage,
  PositionSizeCalculator: PositionSizeCalculatorPage,
  ChallengePlanner: ChallengePlannerPage,
  RiskOfRuinCalculator: RiskOfRuinCalculatorPage,
  PipValueCalculator: PipValueCalculatorPage,
  LotSizeCalculator: LotSizeCalculatorPage,
  ExpectancyCalculator: ExpectancyCalculatorPage,
  CompoundingCalculator: CompoundingCalculatorPage,
  ConsistencyRuleChecker: ConsistencyRuleCheckerPage,
  DailyLossLimitCalculator: DailyLossLimitCalculatorPage,
  PayoutProjector: PayoutProjectorPage,
  ChallengeSimulator: ChallengeSimulatorPage,
  ResetTimeConverter: ResetTimeConverterPage,
};
