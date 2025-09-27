import { Loader, Paper, Title, useMantineTheme } from '@mantine/core';
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { linearRegression, linearRegressionLine } from 'simple-statistics';
import { SWRResponse } from 'swr';
import { AmountOverTime } from '../data/AmountOverTime';
import { Response } from '../data/Response';
import {
  FormatDayString,
  FormatMoney,
  FormatMoneyThousands,
  FormatMonthString,
  MonthStringToTimestamp,
} from '../utils';

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

  return (
    <Paper shadow='sm' p='lg'>
      <Title order={3}>{title}</Title>
      {response.isLoading ? (
        <Loader color='blue' />
      ) : (
        <ResponsiveContainer height={300}>
          <ComposedChart data={getChartDataWithTrendline(response.data!.data)}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='date' tickFormatter={FormatMonthString} />
            <YAxis
              tickFormatter={(value: number) => FormatMoneyThousands(value)}
            />
            <Tooltip
              formatter={(value: number, name: string) => [
                FormatMoney(value),
                name === 'amount' ? 'Actual' : 'Trend',
              ]}
              labelFormatter={FormatDayString}
              contentStyle={{
                backgroundColor: theme.colors.dark[8],
                border: 'none',
              }}
            />
            <Area
              type='monotone'
              dataKey='amount'
              stroke={theme.colors.blue[6]}
              fill={theme.colors.blue[6]}
            />
            {displayTrendline && (
              <Line
                type='monotone'
                dataKey='trendline'
                stroke={theme.colors.red[6]}
                strokeWidth={2}
                strokeDasharray='5 5'
                dot={false}
                activeDot={false}
              />
            )}
          </ComposedChart>
        </ResponsiveContainer>
      )}
    </Paper>
  );
}
