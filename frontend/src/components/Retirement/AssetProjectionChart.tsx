import { AreaChart } from "@mantine/charts";
import { Paper, Title, useMantineTheme } from "@mantine/core";
import { useMemo } from "react";
import { InvestmentAccount } from "../../data/InvestmentAccounts/types";
import { FormatMoney, FormatMoneyDynamic } from "../../utils";
import { getChartColors } from "../../utils/chartcolors";
import { SimulationResult } from "../../utils/monteCarlo";

type AssetProjectionChartProps = {
  retirementAge: number;
  performancePercentile: number;
  accounts: InvestmentAccount[];
  simulationResults: SimulationResult[];
};

export default function AssetProjectionChart({
  performancePercentile,
  retirementAge,
  accounts,
  simulationResults,
}: AssetProjectionChartProps) {
  const theme = useMantineTheme();
  const chartColors = getChartColors(theme);

  const chartData = useMemo(() => {
    return simulationResults.map((simulationYear) => {
      const point: any = {
        date: String(simulationYear.year),
      };

      for (let i = 0; i < simulationYear.accountBalances.length; i++) {
        const sortedBalances = [...simulationYear.accountBalances[i]].sort(
          (a, b) => a - b,
        );

        const balance =
          sortedBalances[
            Math.floor(sortedBalances.length * (performancePercentile / 100))
          ];
        point[accounts[i].id] = balance;
      }
      return point;
    });
  }, [simulationResults, accounts, performancePercentile]);

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
        data={chartData}
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
        referenceLines={[{ x: String(retirementAge), color: "red.6" }]}
      />
    </Paper>
  );
}
