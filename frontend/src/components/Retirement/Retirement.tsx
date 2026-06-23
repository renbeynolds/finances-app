import {
  Group,
  NumberInput,
  Paper,
  SimpleGrid,
  Stack,
  Title,
} from "@mantine/core";
import { useState } from "react";
import useSWR from "swr";
import {
  InvestmentAccountsEndpoint,
  InvestmentAccountsFetcher,
} from "../../data/InvestmentAccounts/fetchers";
import { InvestmentAccount } from "../../data/InvestmentAccounts/types";
import AccountsTable from "./AccountsTable";
import AssetProjectionChart from "./AssetProjectionChart";

export default function Retirement() {
  const [currentAge, setCurrentAge] = useState<number>(30);
  const [retirementAge, setRetirementAge] = useState<number>(60);
  const [deathAge, setDeathAge] = useState<number>(100);
  const [monthlyWithdrawal, setMonthlyWithdrawal] = useState<number>(2500000);
  const [performancePercentile, setPerformancePercentile] = useState<number>(50);

  const { data, mutate } = useSWR(
    InvestmentAccountsEndpoint,
    InvestmentAccountsFetcher,
  );

  let includedAccounts: InvestmentAccount[] = [];

  if (data?.data) {
    includedAccounts = data.data.filter((a) => a.includeInRetirement);
  }

  return (
    <Stack>
      <Title order={2}>Retirement</Title>
      <Paper shadow="sm" p="lg">
        <Group align="flex-end">
          <NumberInput
            label="Current Age"
            value={currentAge}
            onChange={(value) => setCurrentAge(Number(value))}
            min={0}
            max={120}
            allowNegative={false}
          />
          <NumberInput
            label="Retirement Age"
            value={retirementAge}
            onChange={(value) => setRetirementAge(Number(value))}
            min={0}
            max={120}
            allowNegative={false}
          />
          <NumberInput
            label="Death Age"
            value={deathAge}
            onChange={(value) => setDeathAge(Number(value))}
            min={0}
            max={120}
            allowNegative={false}
          />
          <NumberInput
            label="Performance Percentile"
            value={performancePercentile}
            onChange={(value) => setPerformancePercentile(Number(value))}
            min={0}
            max={100}
            allowNegative={false}
          />
          <NumberInput
            label="Monthly Withdrawal"
            value={monthlyWithdrawal / 100}
            onChange={(value) => setMonthlyWithdrawal(Number(value) * 100)}
            min={0}
            allowNegative={false}
            prefix="$"
            decimalScale={2}
            fixedDecimalScale
            hideControls
          />
        </Group>
      </Paper>
      <SimpleGrid cols={1}>
        <AssetProjectionChart
          accounts={includedAccounts}
          currentAge={currentAge}
          retirementAge={retirementAge}
          deathAge={deathAge}
          monthlyWithdrawlCents={monthlyWithdrawal}
          performancePercentile={performancePercentile}
        />
      </SimpleGrid>
      <AccountsTable accounts={includedAccounts} mutate={mutate} />
    </Stack>
  );
}
