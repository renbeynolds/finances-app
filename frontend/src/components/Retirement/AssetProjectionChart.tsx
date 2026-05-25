import { AreaChart } from "@mantine/charts";
import { Paper, Title, useMantineTheme } from "@mantine/core";
import { InvestmentAccount } from "../../data/InvestmentAccounts/types";
import { FormatMoney, FormatMoneyDynamic } from "../../utils";
import { getChartColors } from "../../utils/chartcolors";

type AssetProjectionChartProps = {
  currentAge: number;
  retirementAge: number;
  monthlyWithdrawlCents: number;
  accounts: InvestmentAccount[];
};

export default function AssetProjectionChart({
  currentAge,
  retirementAge,
  monthlyWithdrawlCents,
  accounts,
}: AssetProjectionChartProps) {
  const theme = useMantineTheme();
  const chartColors = getChartColors(theme);

  const points: any[] = [];

  const accountsState = accounts.map((a) => ({
    id: String(a.id),
    name: a.name,
    balance: a.balance,
    annualContribution: a.annualContribution,
    expectedAnnualReturn: a.expectedAnnualReturn,
    annualVolatility: a.annualVolatility,
  }));

  const annualWithdrawalCents = monthlyWithdrawlCents * 12;

  for (let age = currentAge; age <= 100; age++) {
    let yearTotal = 0;

    for (const a of accountsState) {
      a.balance = a.balance * (1 + a.expectedAnnualReturn);
      if (age < retirementAge) {
        a.balance += a.annualContribution;
      }
      yearTotal += a.balance;
    }

    if (age >= retirementAge) {
      if (yearTotal > 0) {
        for (const a of accountsState) {
          a.balance -= annualWithdrawalCents * (a.balance / yearTotal);
        }
      }
      yearTotal -= annualWithdrawalCents;
    }

    const point: any = {
      date: String(age),
    };
    for (const a of accountsState) {
      point[a.id] = Math.max(0, Math.round(a.balance));
    }
    points.push(point);
  }

  const chartSeries = accounts.map((account, index) => ({
    name: String(account.id),
    label: account.name,
    color: chartColors[index % chartColors.length],
  }));

  return (
    <Paper shadow="sm" p="lg">
      <Title order={3}>Asset Projection</Title>
      <AreaChart
        h={500}
        data={points}
        dataKey="date"
        series={chartSeries}
        type="stacked"
        curveType="monotone"
        tickLine="xy"
        gridAxis="x"
        withXAxis
        withYAxis
        withTooltip
        withDots={false}
        withLegend
        xAxisProps={{
          tickFormatter: (age) => age,
        }}
        yAxisProps={{
          tickFormatter: (value: number) => FormatMoneyDynamic(value),
        }}
        valueFormatter={(value: number) => FormatMoney(value)}
      />
    </Paper>
  );
}
