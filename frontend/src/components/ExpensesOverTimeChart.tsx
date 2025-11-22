import { AreaChart } from "@mantine/charts";
import { Loader, Paper, Title, useMantineTheme } from "@mantine/core";
import dayjs from "dayjs";
import useSWR from "swr";
import { ExpensesOverTimeEndpoint, ExpensesOverTimeFetcher } from "../Fetchers";
import { FormatMoney, FormatMoneyThousands } from "../utils";

export default function ExpensesOverTimeChart() {
  const theme = useMantineTheme();

  const expensesOverTimeResponse = useSWR(
    ExpensesOverTimeEndpoint(
      dayjs().subtract(30, "day").format("YYYY-MM-DD"),
      dayjs().format("YYYY-MM-DD")
    ),
    ExpensesOverTimeFetcher
  );

  if (!expensesOverTimeResponse) return <div>loading...</div>;
  if (expensesOverTimeResponse.error) return <div>failed to load</div>;

  return (
    <Paper shadow="sm" p="lg">
      <Title order={3}>Expenses Over Time</Title>
      {expensesOverTimeResponse.isLoading ? (
        <Loader color="blue" />
      ) : (
        <AreaChart
          h={300}
          data={expensesOverTimeResponse.data!.data}
          dataKey="day"
          series={[
            {
              name: "amount",
              color: theme.colors.blue[6],
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
            tickFormatter: (value: number) => FormatMoneyThousands(value),
          }}
          valueFormatter={(value: number) => FormatMoney(value)}
        />
      )}
    </Paper>
  );
}
