import { Stack } from '@mantine/core';
import DateRangePicker from './DateRangePicker';
import TransactionTable from './TransactionTable';

export default function Snapshot() {
  return (
    <Stack>
      <DateRangePicker />
      <TransactionTable />
    </Stack>
  );
}
