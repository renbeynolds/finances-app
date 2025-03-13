import { SimpleGrid, Stack } from '@mantine/core';
import { ExpenseVsAverageEndpoint, IncomeVsAverageEndpoint } from '../Fetchers';
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
        <SimpleGrid cols={2}>
          <AmountVsAverage
            title='Income'
            endpoint={IncomeVsAverageEndpoint}
            color='green'
          />
          <AmountVsAverage
            title='Expense'
            endpoint={ExpenseVsAverageEndpoint}
            color='red'
          />
        </SimpleGrid>
      </SimpleGrid>
      <TransactionTable hideDateFilter />
    </Stack>
  );
}
