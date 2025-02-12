import { PieChart } from '@mantine/charts';
import React from 'react';
import useSWR from 'swr';
import { DateFilterContext } from '../context/DateFilterContext';
import {
  TopSpendingCategoriesEndpoint,
  TopSpendingCategoriesFetcher,
} from '../Fetchers';

export default function TopSpendingCategoriesChart() {
  const dateFilter = React.useContext(DateFilterContext);

  const dateFilterFormatted: [string | null, string | null] = [
    dateFilter[0]?.toISOString().split('T')[0] || '',
    dateFilter[1]?.toISOString().split('T')[0] || '',
  ];

  const { data, error, isLoading } = useSWR(
    `${TopSpendingCategoriesEndpoint}?from=${dateFilterFormatted[0]}&to=${dateFilterFormatted[1]}`,
    TopSpendingCategoriesFetcher
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  const foo = data!.data.map((category) => ({
    ...category,
    color: 'blue',
  }));

  return <PieChart data={foo} />;
}
