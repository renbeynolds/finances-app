import { SimpleGrid, Stack } from '@mantine/core';
import AmountVsAverage from './AmountVsAverage';
import MonthPicker from './MonthPicker';
import TopSpendingCategoriesChart from './TopSpendingCategoriesChart';
import TransactionTable from './TransactionTable';

export default function Snapshot() {
  return (
    <Stack>
      <MonthPicker />
      <SimpleGrid cols={2}>
        <TopSpendingCategoriesChart />
        <AmountVsAverage />
      </SimpleGrid>
      <TransactionTable />
    </Stack>
  );
}
