import {
  Group,
  NumberInput,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useMemo, useState } from "react";
import useSWR from "swr";
import {
  InvestmentAccountsEndpoint,
  InvestmentAccountsFetcher,
} from "../../data/InvestmentAccounts/fetchers";
import { InvestmentAccount } from "../../data/InvestmentAccounts/types";
import { runMonteCarloSimulation } from "../../utils/monteCarlo";
import AccountsTable from "./AccountsTable";
import AssetProjectionChart from "./AssetProjectionChart";

export default function Retirement() {
  const [currentAge, setCurrentAge] = useState<number>(30);
  const [retirementAge, setRetirementAge] = useState<number>(60);
  const [deathAge, setDeathAge] = useState<number>(100);
  const [monthlyWithdrawalCents, setMonthlyWithdrawalCents] =
    useState<number>(2500000);
  const [performancePercentile, setPerformancePercentile] =
    useState<number>(50);

  const { data, mutate } = useSWR(
    InvestmentAccountsEndpoint,
    InvestmentAccountsFetcher,
  );

  let includedAccounts: InvestmentAccount[] = [];

  if (data?.data) {
    includedAccounts = data.data.filter((a) => a.includeInRetirement);
  }

  const simulationResults = useMemo(
    () =>
      runMonteCarloSimulation(
        includedAccounts,
        currentAge,
        retirementAge,
        deathAge,
        monthlyWithdrawalCents * 12,
      ),
    [
      includedAccounts,
      currentAge,
      retirementAge,
      deathAge,
      monthlyWithdrawalCents,
    ],
  );

  const successProbability = useMemo(() => {
    if (!simulationResults || simulationResults.length === 0) return 0;
    const deathAgeResult = simulationResults.find((r) => r.year === deathAge);
    if (!deathAgeResult || deathAgeResult.accountBalances.length === 0)
      return 0;

    const numIterations = deathAgeResult.accountBalances[0]?.length || 0;
    let successCount = 0;
    for (let i = 0; i < numIterations; i++) {
      let total = 0;
      for (let a = 0; a < deathAgeResult.accountBalances.length; a++) {
        total += deathAgeResult.accountBalances[a][i] || 0;
      }
      if (total > 0) {
        successCount++;
      }
    }
    return (successCount / numIterations) * 100;
  }, [simulationResults, deathAge]);

  return (
    <Stack>
      <Title order={2}>Retirement</Title>
      <Paper shadow="sm" p="lg">
        <Group justify="space-between" align="center" wrap="wrap">
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
              value={monthlyWithdrawalCents / 100}
              onChange={(value) =>
                setMonthlyWithdrawalCents(Number(value) * 100)
              }
              min={0}
              allowNegative={false}
              prefix="$"
              decimalScale={2}
              fixedDecimalScale
              hideControls
            />
          </Group>
          <Stack gap={0} align="flex-end" style={{ minWidth: 150 }}>
            <Text size="xs" c="dimmed" fw={700} tt="uppercase" lts="0.5px">
              Success Probability
            </Text>
            <Text
              size="xl"
              fw={900}
              c={
                successProbability >= 80
                  ? "green.6"
                  : successProbability >= 50
                    ? "yellow.6"
                    : "red.6"
              }
            >
              {successProbability.toFixed(1)}%
            </Text>
          </Stack>
        </Group>
      </Paper>
      <SimpleGrid cols={1}>
        <AssetProjectionChart
          accounts={includedAccounts}
          retirementAge={retirementAge}
          performancePercentile={performancePercentile}
          simulationResults={simulationResults}
        />
      </SimpleGrid>
      <AccountsTable accounts={includedAccounts} mutate={mutate} />
    </Stack>
  );
}
