import { AreaChart } from "@mantine/charts";
import { Loader, Paper, Title, useMantineTheme } from "@mantine/core";
import dayjs from "dayjs";
import useSWR from "swr";
import { ExpensesOverTimeEndpoint, ExpensesOverTimeFetcher } from "../Fetchers";
import { FormatMoney, FormatMoneyThousands } from "../utils";
import { getChartColors } from "../utils/chartcolors";

export default function ExpensesOverTimeChart() {
  const theme = useMantineTheme();
  const chartColors = getChartColors(theme);

  // Get data for current month
  const currentMonthStart = dayjs().startOf("month");
  const currentMonthEnd = dayjs().endOf("month");

  // Get data for previous month
  const prevMonth1Start = dayjs().subtract(1, "month").startOf("month");
  const prevMonth1End = dayjs().subtract(1, "month").endOf("month");

  // Get data for 2 months ago
  const prevMonth2Start = dayjs().subtract(2, "month").startOf("month");
  const prevMonth2End = dayjs().subtract(2, "month").endOf("month");

  // Get data for 3 months ago
  const prevMonth3Start = dayjs().subtract(3, "month").startOf("month");
  const prevMonth3End = dayjs().subtract(3, "month").endOf("month");

  const currentMonthResponse = useSWR(
    ExpensesOverTimeEndpoint(
      currentMonthStart.format("YYYY-MM-DD"),
      currentMonthEnd.format("YYYY-MM-DD"),
    ),
    ExpensesOverTimeFetcher,
  );

  const prevMonth1Response = useSWR(
    ExpensesOverTimeEndpoint(
      prevMonth1Start.format("YYYY-MM-DD"),
      prevMonth1End.format("YYYY-MM-DD"),
    ),
    ExpensesOverTimeFetcher,
  );

  const prevMonth2Response = useSWR(
    ExpensesOverTimeEndpoint(
      prevMonth2Start.format("YYYY-MM-DD"),
      prevMonth2End.format("YYYY-MM-DD"),
    ),
    ExpensesOverTimeFetcher,
  );

  const prevMonth3Response = useSWR(
    ExpensesOverTimeEndpoint(
      prevMonth3Start.format("YYYY-MM-DD"),
      prevMonth3End.format("YYYY-MM-DD"),
    ),
    ExpensesOverTimeFetcher,
  );

  // Check loading states and errors
  if (
    !currentMonthResponse ||
    !prevMonth1Response ||
    !prevMonth2Response ||
    !prevMonth3Response
  ) {
    return <div>loading...</div>;
  }

  const hasError =
    currentMonthResponse.error ||
    prevMonth1Response.error ||
    prevMonth2Response.error ||
    prevMonth3Response.error;

  if (hasError) return <div>failed to load</div>;

  if (
    !currentMonthResponse.data ||
    !prevMonth1Response.data ||
    !prevMonth2Response.data ||
    !prevMonth3Response.data
  ) {
    return <div>loading...</div>;
  }

  // Get the maximum number of days in any of the months
  const maxDays = Math.max(
    currentMonthResponse.data.data.length,
    prevMonth1Response.data.data.length,
    prevMonth2Response.data.data.length,
    prevMonth3Response.data.data.length,
  );

  let chartData = [];
  for (let i = 0; i < maxDays; i++) {
    chartData.push({
      day: i + 1,
      currentMonthAmount:
        currentMonthResponse.data!.data[i]?.amount ||
        currentMonthResponse.data!.data[i - 1]?.amount,
      prevMonth1Amount:
        prevMonth1Response.data!.data[i]?.amount ||
        prevMonth1Response.data!.data[i - 1]?.amount ||
        0,
      prevMonth2Amount:
        prevMonth2Response.data!.data[i]?.amount ||
        prevMonth2Response.data!.data[i - 1]?.amount ||
        0,
      prevMonth3Amount:
        prevMonth3Response.data!.data[i]?.amount ||
        prevMonth3Response.data!.data[i - 1]?.amount ||
        0,
    });
  }

  return (
    <Paper shadow="sm" p="lg">
      <Title order={3}>Expenses Over Time - Monthly Comparison</Title>
      {currentMonthResponse.isLoading ||
      prevMonth1Response.isLoading ||
      prevMonth2Response.isLoading ||
      prevMonth3Response.isLoading ? (
        <Loader color="blue" />
      ) : (
        <AreaChart
          h={300}
          data={chartData}
          dataKey="day"
          series={[
            {
              name: "prevMonth3Amount",
              label: dayjs().subtract(3, "month").format("MMMM"),
              color: chartColors[3],
            },
            {
              name: "prevMonth2Amount",
              label: dayjs().subtract(2, "month").format("MMMM"),
              color: chartColors[2],
            },
            {
              name: "prevMonth1Amount",
              label: dayjs().subtract(1, "month").format("MMMM"),
              color: chartColors[1],
            },
            {
              name: "currentMonthAmount",
              label: dayjs().format("MMMM"),
              color: chartColors[0],
            },
          ]}
          curveType="monotone"
          tickLine="xy"
          gridAxis="x"
          withXAxis
          withYAxis
          withTooltip
          withDots={false}
          withLegend
          yAxisProps={{
            tickFormatter: (value: number) => FormatMoneyThousands(value),
          }}
          valueFormatter={(value: number) => FormatMoney(value)}
        />
      )}
    </Paper>
  );
}
