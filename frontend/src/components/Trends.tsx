import { SimpleGrid } from '@mantine/core';
import dayjs from 'dayjs';
import useSWR from 'swr';
import { AmountOverTimeFetcher, NetWorthOverTimeEndpoint } from '../Fetchers';
import AmountOverTimeChart from './AmountOverTimeChart';
import IncomeVsExpenseChart from './IncomeVsExpenseChart';

export default function Trends() {
  const netWorthOverTimeResponse = useSWR(
    NetWorthOverTimeEndpoint(
      dayjs().subtract(365, 'day').format('YYYY-MM-DD'),
      dayjs().format('YYYY-MM-DD'),
    ),
    AmountOverTimeFetcher,
  );

  return (
    <SimpleGrid cols={2}>
      <IncomeVsExpenseChart />
      <AmountOverTimeChart
        response={netWorthOverTimeResponse}
        title='Net Worth'
      />
    </SimpleGrid>
  );
}
