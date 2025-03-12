import { Paper, Title, useMantineTheme } from '@mantine/core';
import React from 'react';
import {
  Bar,
  CartesianGrid,
  Cell,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import useSWR from 'swr';
import { IncomeVsExpense } from '../data/IncomeVsExpense';
import { IncomeVsExpenseEndpoint, IncomeVsExpenseFetcher } from '../Fetchers';
import { FormatMoney, FormatMoneyThousands, FormatMonthString } from '../utils';

export default function IncomeVsExpenseChart() {
  const theme = useMantineTheme();
  const [chartData, setChartData] = React.useState<IncomeVsExpense[]>([]);

  const { data, error, isLoading } = useSWR(
    `${IncomeVsExpenseEndpoint}?from=2024-01-01&to=2024-12-31`,
    IncomeVsExpenseFetcher,
  );

  React.useEffect(() => {
    if (!error && !isLoading && data) {
      setChartData(data.data);
    }
  }, [data, error, isLoading, setChartData]);

  const handleClick = () => {};

  if (error) return <div>failed to load</div>;

  return (
    <Paper shadow='sm' p='lg'>
      <Title order={3}>Income vs. Expense</Title>
      <ResponsiveContainer height={300}>
        <ComposedChart
          data={chartData}
          stackOffset='sign'
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='month' tickFormatter={FormatMonthString} />
          <YAxis
            tickFormatter={(value: number) => FormatMoneyThousands(value)}
          />
          <Tooltip
            formatter={(value: number) => FormatMoney(value)}
            labelFormatter={FormatMonthString}
            contentStyle={{
              backgroundColor: '#1d1d1d',
              border: 'none',
            }}
          />
          <Bar
            dataKey='income'
            fill={theme.colors.green[6]}
            stackId='stack'
            onClick={handleClick}
          >
            {chartData.map((entry, index) => (
              <Cell cursor='pointer' />
            ))}
          </Bar>
          <Bar
            dataKey='expense'
            fill={theme.colors.red[6]}
            stackId='stack'
            onClick={handleClick}
          >
            {chartData.map((entry, index) => (
              <Cell cursor='pointer' />
            ))}
          </Bar>
          <Line
            dataKey='net'
            stroke='#fff'
            dot={false}
            legendType='plainline'
          />
        </ComposedChart>
      </ResponsiveContainer>
    </Paper>
  );
}
