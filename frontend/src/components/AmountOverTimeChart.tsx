import { Loader, Paper, useMantineTheme } from '@mantine/core';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { SWRResponse } from 'swr';
import { AmountOverTime } from '../data/AmountOverTime';
import { Response } from '../data/Response';
import { FormatDayString, FormatMoney, FormatMoneyThousands } from '../utils';

type AmountOverTimeChartProps = {
  response: SWRResponse<Response<AmountOverTime[]>, any, any>;
};

export default function AmountOverTimeChart({
  response,
}: AmountOverTimeChartProps) {
  const theme = useMantineTheme();
  if (response.error) return <div>failed to load</div>;

  return (
    <Paper shadow='sm' p='lg'>
      {response.isLoading ? (
        <Loader color='blue' />
      ) : (
        <ResponsiveContainer height={300}>
          <AreaChart data={response.data!.data}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='date' tickFormatter={FormatDayString} />
            <YAxis
              tickFormatter={(value: number) => FormatMoneyThousands(value)}
            />
            <Tooltip
              formatter={(value: number) => FormatMoney(value)}
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
          </AreaChart>
        </ResponsiveContainer>
      )}
    </Paper>
  );
}
