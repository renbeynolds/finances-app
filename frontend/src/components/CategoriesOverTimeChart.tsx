import { Loader, Paper, Title } from '@mantine/core';
import dayjs from 'dayjs';
import React from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import useSWR from 'swr';
import { UseLazyCategories } from '../context/CategoriesContext';
import {
  CategoriesOverTimeEndpoint,
  CategoriesOverTimeFetcher,
} from '../data/Categories/fetchers';

export default function CategoriesOverTimeChart() {
  const [chartData, setChartData] = React.useState<any[]>([]);
  const categories = UseLazyCategories();

  const startDate = dayjs()
    .startOf('month')
    .subtract(13, 'month')
    .format('YYYY-MM-DD');
  const endDate = dayjs()
    .startOf('month')
    .subtract(1, 'day')
    .format('YYYY-MM-DD');

  const { data, error, isLoading } = useSWR(
    CategoriesOverTimeEndpoint(startDate, endDate),
    CategoriesOverTimeFetcher,
  );

  React.useEffect(() => {
    if (!error && !isLoading && data && categories) {
      // Transform data to group by date with categoryId as properties
      const transformed = data.data.reduce((acc: any[], item) => {
        const existingDate = acc.find((entry) => entry.date === item.date);

        if (existingDate) {
          existingDate[item.categoryId] = item.amount;
        } else {
          acc.push({
            date: item.date,
            [item.categoryId]: item.amount,
          });
        }

        return acc;
      }, []);
      setChartData(transformed);
    }
  }, [data, error, isLoading, setChartData, categories]);

  if (error) return <div>failed to load</div>;

  return (
    <Paper shadow='sm' p='lg'>
      <Title order={3}>Income vs. Expense</Title>
      {isLoading || chartData.length === 0 ? (
        <Loader color='blue' />
      ) : (
        <ResponsiveContainer height={300}>
          <LineChart
            width={500}
            height={300}
            data={chartData}
            margin={{
              top: 20,
              right: 50,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='date' />
            <YAxis />
            <Tooltip />
            <Legend />
            {categories.map((category) => (
              <Line
                key={category.id}
                type='monotone'
                dataKey={category.id}
                stroke={category.color}
                dot={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      )}
    </Paper>
  );
}
