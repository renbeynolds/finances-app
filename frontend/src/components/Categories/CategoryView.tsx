import { Stack, Title } from '@mantine/core';
import dayjs from 'dayjs';
import { useParams } from 'react-router';
import useSWR from 'swr';
import { UseLazyCategories } from '../../context/CategoriesContext';
import {
  AmountOverTimeFetcher,
  CategoryOverTimeEndpoint,
} from '../../Fetchers';
import AmountOverTimeChart from '../AmountOverTimeChart';
import TransactionTable from '../TransactionTable';

export default function CategoryView() {
  const { categoryId } = useParams();
  const categories = UseLazyCategories();
  const category = categories.find((c) => c.id === parseInt(categoryId || ''));

  const startDate = dayjs()
    .startOf('month')
    .subtract(37, 'month')
    .format('YYYY-MM-DD');
  const endDate = dayjs()
    .startOf('month')
    .subtract(1, 'day')
    .format('YYYY-MM-DD');

  const categoryOverTimeResponse = useSWR(
    CategoryOverTimeEndpoint(startDate, endDate, categoryId || ''),
    AmountOverTimeFetcher,
  );

  return (
    <Stack>
      <Title order={2}>{category?.name}</Title>
      <AmountOverTimeChart
        response={categoryOverTimeResponse}
        title='Amount Over Time'
        displayTrendline
      />
      <TransactionTable categoryId={categoryId} />
    </Stack>
  );
}
