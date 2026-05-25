import { NumberInput } from "@mantine/core";
import { DataTable } from "mantine-datatable";
import { useEffect, useState } from "react";
import { requestUpdateInvestmentAccount } from "../../data/InvestmentAccounts/requests";
import { InvestmentAccount } from "../../data/InvestmentAccounts/types";
import { FormatMoneyDollars } from "../../utils";

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

type AccountsTableProps = {
  accounts: InvestmentAccount[];
  mutate: () => void;
};

export default function AccountsTable({
  accounts,
  mutate,
}: AccountsTableProps) {
  return (
    <DataTable
      withTableBorder
      borderRadius="sm"
      withColumnBorders
      records={accounts}
      columns={[
        {
          accessor: "name",
          title: "Account",
        },
        {
          accessor: "accountType",
          title: "Type",
          render: (account) =>
            account.accountType === "PRE_TAX"
              ? "Pre-Tax"
              : account.accountType === "ROTH"
                ? "Roth"
                : "Taxable",
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
        // {
        //   accessor: "expectedValue",
        //   title: "Value at Retirement",
        //   render: (account) => {
        //     let expectedVal = account.balance;
        //     const years = Math.max(
        //       0,
        //       parsedRetirementAge - parsedCurrentAge,
        //     );
        //     for (let i = 0; i < years; i++) {
        //       expectedVal =
        //         expectedVal * (1 + account.expectedAnnualReturn) +
        //         account.annualContribution;
        //     }
        //     return FormatMoneyDollars(expectedVal);
        //   },
        // },
      ]}
    />
  );
}
