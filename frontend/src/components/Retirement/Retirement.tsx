import {
  Anchor,
  Group,
  NumberInput,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import { useMemo, useState } from "react";
import useSWR from "swr";
import {
  InvestmentAccountsEndpoint,
  InvestmentAccountsFetcher,
} from "../../data/InvestmentAccounts/fetchers";
import { GetAge } from "../../utils";
import { runMonteCarloSimulation, socialSecurityFullRetirementAge } from "../../utils/monteCarlo";
import AccountsTable from "./AccountsTable";
import AssetProjectionChart from "./AssetProjectionChart";

export default function Retirement() {
  const [currentAge, setCurrentAge] = useState<number>(GetAge("1995-06-18"));
  const [retirementAge, setRetirementAge] = useState<number>(60);
  const [deathAge, setDeathAge] = useState<number>(100);
  const [monthlyWithdrawalCents, setMonthlyWithdrawalCents] =
    useState<number>(2500000);
  const [monthlySocialSecurityCents, setMonthlySocialSecurityCents] = useState<number>(425000 + 375000)
  const [performancePercentile, setPerformancePercentile] =
    useState<number>(50);
  const [inflationRatePercent, setInflationRatePercent] = useState<number>(3);

  const { data, mutate } = useSWR(
    InvestmentAccountsEndpoint,
    InvestmentAccountsFetcher,
  );

  const includedAccounts = useMemo(() => {
    if (!data?.data) return [];
    return data.data.filter((a) => a.includeInRetirement);
  }, [data?.data]);

  const simulationResults = useMemo(
    () =>
      runMonteCarloSimulation(
        includedAccounts,
        currentAge,
        retirementAge,
        deathAge,
        monthlyWithdrawalCents * 12,
        monthlySocialSecurityCents * 12,
        inflationRatePercent,
      ),
    [
      includedAccounts,
      currentAge,
      retirementAge,
      deathAge,
      monthlyWithdrawalCents,
      monthlySocialSecurityCents,
      inflationRatePercent,
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
      <Paper shadow="sm" p="md">
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
              label="Inflation Rate"
              value={inflationRatePercent}
              onChange={(value) => setInflationRatePercent(Number(value))}
              min={0}
              max={20}
              allowNegative={false}
              suffix="%"
            />
            <NumberInput
              label={
                <Group gap={4} align="center" style={{ display: "inline-flex" }}>
                  <span>Social Security Income</span>
                  <Tooltip
                    label={`Estimate your benefits at ssa.gov. Enter the monthly benefit in today's dollars assuming withdrawls starting at age ${socialSecurityFullRetirementAge}`}
                    withArrow
                  >
                    <Anchor
                      href="https://www.ssa.gov/OACT/quickcalc/index.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      c="dimmed"
                      onClick={(e) => e.stopPropagation()}
                      style={{ display: "inline-flex", alignItems: "center" }}
                    >
                      <IconInfoCircle size={14} />
                    </Anchor>
                  </Tooltip>
                </Group>
              }
              value={monthlySocialSecurityCents / 100}
              onChange={(value) =>
                setMonthlySocialSecurityCents(Number(value) * 100)
              }
              min={0}
              allowNegative={false}
              prefix="$"
              decimalScale={2}
              fixedDecimalScale
              hideControls
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
      <Paper shadow="sm" p="md">
        <Group justify="space-between" align="center" wrap="wrap">
          <NumberInput
            label="Performance Percentile"
            value={performancePercentile}
            onChange={(value) => setPerformancePercentile(Number(value))}
            min={0}
            max={100}
            allowNegative={false}
          />
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
