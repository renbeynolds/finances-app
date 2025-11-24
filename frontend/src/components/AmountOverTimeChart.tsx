import { AreaChart } from "@mantine/charts";
import { Loader, Paper, Title, useMantineTheme } from "@mantine/core";
import { linearRegression, linearRegressionLine } from "simple-statistics";
import { SWRResponse } from "swr";
import { AmountOverTime } from "../data/AmountOverTime";
import { Response } from "../data/Response";
import {
  FormatMoney,
  FormatMoneyDollars,
  FormatMoneyThousands,
  FormatMonthString,
  MonthStringToTimestamp,
} from "../utils";

type AmountOverTimeChartProps = {
  title: string;
  response: SWRResponse<Response<AmountOverTime[]>, any, any>;
  displayTrendline?: boolean;
};

export default function AmountOverTimeChart({
  title,
  response,
  displayTrendline = false,
}: AmountOverTimeChartProps) {
  const theme = useMantineTheme();
  if (response.error) return <div>failed to load</div>;

  // Calculate trendline and merge with chart data
  const getChartDataWithTrendline = (data: AmountOverTime[]) => {
    if (!data || data.length < 2) return data;

    // Convert data to format expected by simple-statistics: [[x, y], [x, y], ...]
    const points = data.map((point) => [
      MonthStringToTimestamp(point.date),
      point.amount,
    ]);

    // Calculate linear regression
    const regression = linearRegression(points);
    const regressionLine = linearRegressionLine(regression);

    // Add trendline values to each data point
    return data.map((point) => ({
      ...point,
      trendline: regressionLine(MonthStringToTimestamp(point.date)),
    }));
  };

  const maxValue = Math.max(
    ...(response.data?.data.map((point) => point.amount) || [0])
  );

  return (
    <Paper shadow="sm" p="lg">
      <Title order={3}>{title}</Title>
      {response.isLoading ? (
        <Loader color="blue" />
      ) : (
        <AreaChart
          h={300}
          data={getChartDataWithTrendline(response.data!.data)}
          dataKey="date"
          series={[
            {
              name: "amount",
              color: theme.colors.blue[6],
            },
            ...(displayTrendline
              ? [
                  {
                    name: "trendline",
                    color: theme.colors.red[6],
                  },
                ]
              : []),
          ]}
          curveType="monotone"
          tickLine="xy"
          gridAxis="x"
          withXAxis
          withYAxis
          withTooltip
          withDots={false}
          xAxisProps={{
            tickFormatter: FormatMonthString,
          }}
          yAxisProps={{
            tickFormatter: (value: number) =>
              maxValue > 1000000
                ? FormatMoneyThousands(value)
                : FormatMoneyDollars(value),
          }}
          valueFormatter={(value: number) => FormatMoney(value)}
        />
      )}
    </Paper>
  );
}
