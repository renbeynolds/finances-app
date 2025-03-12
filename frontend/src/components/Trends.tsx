import { SimpleGrid } from '@mantine/core';
import IncomeVsExpenseChart from './IncomeVsExpenseChart';

export default function Trends() {
  return (
    <SimpleGrid cols={2}>
      <IncomeVsExpenseChart />
    </SimpleGrid>
  );
}
