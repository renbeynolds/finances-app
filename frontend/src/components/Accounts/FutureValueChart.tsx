import { LineChart } from "@mantine/charts";
import { Paper, Title, useMantineTheme } from "@mantine/core";
import dayjs from "dayjs";
import { useMemo } from "react";
import { FormatMoney, FormatMoneyDynamic } from "../../utils";
import { runMonteCarloSimulation } from "../../utils/monteCarlo";

type FutureValueChartProps = {
  currentBalance: number; // in cents
  annualContribution: number; // in cents
  expectedAnnualReturn: number; // as a decimal fraction, e.g. 0.07
  annualVolatility?: number;
  years?: number;
};

export default function FutureValueChart({
  currentBalance,
  annualContribution,
  expectedAnnualReturn,
  annualVolatility = 0.15,
  years = 60,
}: FutureValueChartProps) {
  const theme = useMantineTheme();

  const chartData = useMemo(() => {
    // Current age 0 means it runs for 100 years. We will slice it.
    const results = runMonteCarloSimulation(
      [
        {
          balance: currentBalance,
          annualContribution,
          expectedAnnualReturn,
          annualVolatility,
          accountType: "TAXABLE",
        },
      ],
      0, // currentAge
      999, // retirementAge (never withdraw)
      999, // deathAge
      0, // withdrawal amount
      0, // social security amount
      0, // inflationRatePercent
    );

    const startYear = dayjs().year();

    // Take only the requested number of years
    const slicedResults = results.slice(0, years + 1);

    return slicedResults.map((result, index) => {
      // Sort ascending to find percentiles
      const sortedBalances = [...result.accountBalances[0]].sort(
        (a, b) => a - b,
      );

      const p10 = sortedBalances[Math.floor(sortedBalances.length * 0.1)];
      const p50 = sortedBalances[Math.floor(sortedBalances.length * 0.5)];
      const p90 = sortedBalances[Math.floor(sortedBalances.length * 0.9)];

      return {
        date: String(startYear + index),
        p10,
        p50,
        p90,
      };
    });
  }, [
    currentBalance,
    annualContribution,
    expectedAnnualReturn,
    annualVolatility,
    years,
  ]);

  return (
    <Paper
      shadow="sm"
      p="lg"
      style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
    >
      <Title order={3}>Future Value Projection</Title>
      <LineChart
        h={300}
        data={chartData}
        dataKey="date"
        series={[
          {
            name: "p90",
            label: "Optimistic (90th)",
            color: theme.colors.green[6],
          },
          { name: "p50", label: "Median (50th)", color: theme.colors.blue[6] },
          {
            name: "p10",
            label: "Pessimistic (10th)",
            color: theme.colors.red[6],
          },
        ]}
        curveType="monotone"
        tickLine="xy"
        gridAxis="x"
        withXAxis
        withYAxis
        withTooltip
        withDots={false}
        yAxisProps={{
          tickFormatter: (value: number) => FormatMoneyDynamic(value),
        }}
        valueFormatter={(value: number) => FormatMoney(value)}
      />
    </Paper>
  );
}
