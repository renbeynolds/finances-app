import { Grid, Stack } from "@mantine/core";
import { ExpenseVsAverageEndpoint, IncomeVsAverageEndpoint } from "../Fetchers";
import AmountVsAverage from "./AmountVsAverage";
import MonthPicker from "./MonthPicker";
import TopSpendingCategoriesChart from "./TopSpendingCategoriesChart";
import TransactionTable from "./TransactionTable";

export default function Snapshot() {
  return (
    <Stack>
      <MonthPicker />
      <Grid>
        <Grid.Col span={6}>
          <TopSpendingCategoriesChart />
        </Grid.Col>
        <Grid.Col span={3}>
          <AmountVsAverage
            title="Income"
            endpoint={IncomeVsAverageEndpoint}
            color="green"
          />
        </Grid.Col>
        <Grid.Col span={3}>
          <AmountVsAverage
            title="Expense"
            endpoint={ExpenseVsAverageEndpoint}
            color="red"
          />
        </Grid.Col>
      </Grid>
      <TransactionTable hideDateFilter />
    </Stack>
  );
}
