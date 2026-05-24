import dayjs from "dayjs";
import { AmountOverTime } from "../../data/AmountOverTime";
import { Response } from "../../data/Response";
import AmountOverTimeChart from "../AmountOverTimeChart";

type FutureValueChartProps = {
  currentBalance: number; // in cents
  annualContribution: number; // in cents
  expectedAnnualReturn: number; // as a decimal fraction, e.g. 0.07
  years?: number;
};

function buildProjection(
  currentBalanceCents: number,
  annualContributionCents: number,
  annualReturnRate: number,
  years: number,
): AmountOverTime[] {
  const startYear = dayjs().year();
  const points: AmountOverTime[] = [];
  let balance = currentBalanceCents;

  for (let i = 0; i <= years; i++) {
    points.push({ date: String(startYear + i), amount: Math.round(balance) });
    balance = balance * (1 + annualReturnRate) + annualContributionCents;
  }

  return points;
}

export default function FutureValueChart({
  currentBalance,
  annualContribution,
  expectedAnnualReturn,
  years = 60,
}: FutureValueChartProps) {
  const data = buildProjection(
    currentBalance,
    annualContribution,
    expectedAnnualReturn,
    years,
  );

  const staticResponse: {
    data: Response<AmountOverTime[]>;
    error: undefined;
    isLoading: false;
  } = {
    data: { success: true, code: 200, pagination: { totalRecords: 0 }, data },
    error: undefined,
    isLoading: false,
  };

  return (
    <AmountOverTimeChart
      title="Future Value"
      response={staticResponse as any}
      xAxisTickFormatter={(year) => year}
    />
  );
}
