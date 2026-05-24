import {
  Group,
  NumberInput,
  Paper,
  SimpleGrid,
  Stack,
  Title,
} from "@mantine/core";
import { DataTable } from "mantine-datatable";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { AmountOverTime } from "../data/AmountOverTime";
import {
  InvestmentAccountsEndpoint,
  InvestmentAccountsFetcher,
} from "../data/InvestmentAccounts/fetchers";
import { requestUpdateInvestmentAccount } from "../data/InvestmentAccounts/requests";
import { InvestmentAccount } from "../data/InvestmentAccounts/types";
import { Response } from "../data/Response";
import { FormatMoneyDollars } from "../utils";
import AmountOverTimeChart from "./AmountOverTimeChart";

function ContributionCell({
  account,
  mutate,
}: {
  account: InvestmentAccount;
  mutate: () => void;
}) {
  const [contribution, setContribution] = useState<number | string>(
    account.annualContribution / 100,
  );

  useEffect(() => {
    setContribution(account.annualContribution / 100);
  }, [account.annualContribution]);

  const handleUpdate = async () => {
    const parsedContrib =
      typeof contribution === "number"
        ? contribution
        : parseFloat(contribution || "0");

    if (Math.round(parsedContrib * 100) !== account.annualContribution) {
      await requestUpdateInvestmentAccount(account.id, {
        name: account.name,
        includeInRetirement: account.includeInRetirement,
        annualContribution: parsedContrib,
        expectedAnnualReturn: account.expectedAnnualReturn,
        annualVolatility: account.annualVolatility,
        accountType: account.accountType,
      });
      mutate();
    }
  };

  return (
    <NumberInput
      value={contribution}
      onChange={setContribution}
      onBlur={handleUpdate}
      prefix="$"
      decimalScale={2}
      fixedDecimalScale
      hideControls
      size="sm"
    />
  );
}

function ReturnRateCell({
  account,
  mutate,
}: {
  account: InvestmentAccount;
  mutate: () => void;
}) {
  const [returnRate, setReturnRate] = useState<number | string>(
    account.expectedAnnualReturn * 100,
  );

  useEffect(() => {
    setReturnRate(account.expectedAnnualReturn * 100);
  }, [account.expectedAnnualReturn]);

  const handleUpdate = async () => {
    const parsedRate =
      typeof returnRate === "number"
        ? returnRate
        : parseFloat(returnRate || "0");

    if (parsedRate / 100 !== account.expectedAnnualReturn) {
      await requestUpdateInvestmentAccount(account.id, {
        name: account.name,
        includeInRetirement: account.includeInRetirement,
        annualContribution: account.annualContribution / 100,
        expectedAnnualReturn: parsedRate,
        annualVolatility: account.annualVolatility,
        accountType: account.accountType,
      });
      mutate();
    }
  };

  return (
    <NumberInput
      value={returnRate}
      onChange={setReturnRate}
      onBlur={handleUpdate}
      suffix="%"
      decimalScale={2}
      fixedDecimalScale
      hideControls
      size="sm"
    />
  );
}

function VolatilityCell({
  account,
  mutate,
}: {
  account: InvestmentAccount;
  mutate: () => void;
}) {
  const [volatility, setVolatility] = useState<number | string>(
    account.annualVolatility * 100,
  );

  useEffect(() => {
    setVolatility(account.annualVolatility * 100);
  }, [account.annualVolatility]);

  const handleUpdate = async () => {
    const parsedVol =
      typeof volatility === "number"
        ? volatility
        : parseFloat(volatility || "0");

    if (parsedVol / 100 !== account.annualVolatility) {
      await requestUpdateInvestmentAccount(account.id, {
        name: account.name,
        includeInRetirement: account.includeInRetirement,
        annualContribution: account.annualContribution / 100,
        expectedAnnualReturn: account.expectedAnnualReturn,
        annualVolatility: parsedVol,
        accountType: account.accountType,
      });
      mutate();
    }
  };

  return (
    <NumberInput
      value={volatility}
      onChange={setVolatility}
      onBlur={handleUpdate}
      suffix="%"
      decimalScale={2}
      fixedDecimalScale
      hideControls
      size="sm"
    />
  );
}

export default function Retirement() {
  const [currentAge, setCurrentAge] = useState<number | string>(30);
  const [retirementAge, setRetirementAge] = useState<number | string>(60);
  const [monthlyWithdrawal, setMonthlyWithdrawal] = useState<number | string>(
    25000,
  );

  const { data, error, isLoading, mutate } = useSWR(
    InvestmentAccountsEndpoint,
    InvestmentAccountsFetcher,
  );

  const points: AmountOverTime[] = [];
  let includedAccounts: InvestmentAccount[] = [];

  const parsedCurrentAge =
    typeof currentAge === "number"
      ? currentAge
      : parseInt(currentAge || "0", 10);
  const parsedRetirementAge =
    typeof retirementAge === "number"
      ? retirementAge
      : parseInt(retirementAge || "0", 10);

  if (data?.data && parsedCurrentAge >= 0 && parsedRetirementAge >= 0) {
    includedAccounts = data.data.filter((a) => a.includeInRetirement);
    const accountsState = includedAccounts.map((a) => ({
      balance: a.balance,
      annualContribution: a.annualContribution,
      expectedAnnualReturn: a.expectedAnnualReturn,
      annualVolatility: a.annualVolatility,
    }));

    const withdrawalCents =
      typeof monthlyWithdrawal === "number"
        ? Math.round(monthlyWithdrawal * 100)
        : Math.round(parseFloat(monthlyWithdrawal || "0") * 100);
    const annualWithdrawalCents = withdrawalCents * 12;

    for (let age = parsedCurrentAge; age <= 100; age++) {
      let yearTotal = 0;

      for (const a of accountsState) {
        a.balance = a.balance * (1 + a.expectedAnnualReturn);
        if (age < parsedRetirementAge) {
          a.balance += a.annualContribution;
        }
        yearTotal += a.balance;
      }

      if (age >= parsedRetirementAge) {
        if (yearTotal > 0) {
          for (const a of accountsState) {
            a.balance -= annualWithdrawalCents * (a.balance / yearTotal);
          }
        }
        yearTotal -= annualWithdrawalCents;
      }

      points.push({
        date: String(age),
        amount: Math.max(0, Math.round(yearTotal)),
      });
    }
  }

  const staticResponse: {
    data: Response<AmountOverTime[]>;
    error: any;
    isLoading: boolean;
  } = {
    data: {
      success: true,
      message: "",
      data: points,
    } as any,
    error,
    isLoading,
  };

  return (
    <Stack>
      <Title order={2}>Retirement</Title>
      <Paper shadow="sm" p="lg">
        <Group align="flex-end">
          <NumberInput
            label="Current Age"
            value={currentAge}
            onChange={setCurrentAge}
            min={0}
            max={120}
            allowNegative={false}
          />
          <NumberInput
            label="Retirement Age"
            value={retirementAge}
            onChange={setRetirementAge}
            min={0}
            max={120}
            allowNegative={false}
          />
          <NumberInput
            label="Monthly Withdrawal"
            value={monthlyWithdrawal}
            onChange={setMonthlyWithdrawal}
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
        <AmountOverTimeChart
          title="Asset Projection"
          response={staticResponse as any}
          xAxisTickFormatter={(age) => age}
        />
      </SimpleGrid>

      {includedAccounts.length > 0 && (
        <DataTable
          withTableBorder
          borderRadius="sm"
          withColumnBorders
          records={includedAccounts}
          columns={[
            {
              accessor: "name",
              title: "Account",
            },
            {
              accessor: "accountType",
              title: "Type",
              render: (account) => (
                account.accountType === "PRE_TAX" ? "Pre-Tax" : account.accountType === "ROTH" ? "Roth" : "Taxable"
              ),
            },
            {
              accessor: "annualContribution",
              title: "Annual Contribution",
              render: (account) => (
                <ContributionCell account={account} mutate={mutate} />
              ),
            },
            {
              accessor: "expectedAnnualReturn",
              title: "Expected Return",
              render: (account) => (
                <ReturnRateCell account={account} mutate={mutate} />
              ),
            },
            {
              accessor: "annualVolatility",
              title: "Volatility",
              render: (account) => (
                <VolatilityCell account={account} mutate={mutate} />
              ),
            },
            {
              accessor: "balance",
              title: "Current Value",
              render: (account) => FormatMoneyDollars(account.balance),
            },
            {
              accessor: "expectedValue",
              title: "Value at Retirement",
              render: (account) => {
                let expectedVal = account.balance;
                const years = Math.max(
                  0,
                  parsedRetirementAge - parsedCurrentAge,
                );
                for (let i = 0; i < years; i++) {
                  expectedVal =
                    expectedVal * (1 + account.expectedAnnualReturn) +
                    account.annualContribution;
                }
                return FormatMoneyDollars(expectedVal);
              },
            },
          ]}
        />
      )}
    </Stack>
  );
}
