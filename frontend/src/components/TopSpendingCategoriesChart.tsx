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

  const { data, error, isLoading } = useSWR(
    `${TopSpendingCategoriesEndpoint}?from=${dateFilter[0]}&to=${dateFilter[1]}`,
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
