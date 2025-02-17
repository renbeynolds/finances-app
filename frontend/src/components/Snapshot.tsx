import { SimpleGrid, Stack } from '@mantine/core';
import DateRangePicker from './DateRangePicker';
import TopSpendingCategoriesChart from './TopSpendingCategoriesChart';
import TransactionTable from './TransactionTable';

export default function Snapshot() {
  return (
    <Stack>
      <DateRangePicker />
      <SimpleGrid cols={2}>
        <TopSpendingCategoriesChart />
        <div>foo</div>
      </SimpleGrid>
      <TransactionTable />
    </Stack>
  );
}
