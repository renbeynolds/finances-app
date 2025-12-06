import { BarChart } from "@mantine/charts";
import {
  Button,
  Center,
  Paper,
  Stack,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useCallback, useEffect, useState } from "react";
import { KeyedMutator, SWRResponse } from "swr";
import { AmountOverTime } from "../../data/AmountOverTime";
import { useBudget } from "../../data/Budgets/hooks";
import {
  requestCreateBudget,
  requestUpdateBudget,
} from "../../data/Budgets/requests";
import { Budget } from "../../data/Budgets/types";
import { Category } from "../../data/Categories/types";
import { Response } from "../../data/Response";
import { FormatMoney, FormatMonthString, MoneyInputToCents } from "../../utils";
import MoneyInput from "../MoneyInput";

const NUM_MONTHS_TO_DISPLAY = 4;

type BudgetCardProps = {
  budgetId?: number;
  category?: Category;
  categoryOverTimeResponse: SWRResponse<Response<AmountOverTime[]>, any, any>;
};

export default function BudgetCard({
  budgetId,
  category,
  categoryOverTimeResponse,
}: BudgetCardProps) {
  const { budget, budgetLoading, budgetError, budgetMutate } =
    useBudget(budgetId);
  const {
    data: categoryData,
    error: categoryError,
    isLoading: categoryLoading,
  } = categoryOverTimeResponse;

  return (
    <Wrapper>
      {budgetLoading || categoryLoading ? (
        <LoadingContent />
      ) : budgetError || categoryError ? (
        <ErrorContent />
      ) : !budget ? (
        <NoBudgetContent category={category} />
      ) : (
        <BudgetContent
          budget={budget}
          category={category}
          categoryOverTimeData={categoryData!.data}
          budgetMutate={budgetMutate}
        />
      )}
    </Wrapper>
  );
}

function BudgetContent({
  budget,
  category,
  categoryOverTimeData,
  budgetMutate,
}: {
  budget: Budget;
  category?: Category;
  categoryOverTimeData: AmountOverTime[];
  budgetMutate: KeyedMutator<Response<Budget>>;
}) {
  const theme = useMantineTheme();

  const [budgetAmount, setBudgetAmount] = useState<string>(
    (budget.amount / 100).toString()
  );

  useEffect(() => {
    setBudgetAmount((budget.amount / 100).toString());
  }, [budget.amount]);

  const handleBudgetChange = useCallback(async () => {
    const newAmount = MoneyInputToCents(budgetAmount);
    const response = await requestUpdateBudget(budget.id, newAmount);
    if (response.success) {
      budgetMutate(
        (curData) => ({
          ...curData!,
          data: { ...curData!.data, amount: newAmount },
        }),
        false
      );
    }
  }, [budget.id, budgetAmount, budgetMutate]);

  const isIncome = category?.type === "income";

  const getBarChartData = () => {
    if (!categoryOverTimeData) return [];

    const budgetAmountCents = MoneyInputToCents(
      (budget.amount / 100).toString()
    );

    return categoryOverTimeData
      .slice(-1 * NUM_MONTHS_TO_DISPLAY)
      .reverse() // Reverse to show most recent month on top
      .map((item) => {
        const actual = Math.abs(item.amount);
        const withinBudget = Math.min(actual, budgetAmountCents);

        let  aboveBudget = Math.max(0, actual - budgetAmountCents);
        let  belowBudget = Math.max(0, budgetAmountCents - actual);

        return {
          month: FormatMonthString(item.date),
          withinBudget,
          aboveBudget,
          belowBudget,
        };
      });
  };

  const goodLabel = isIncome ? "Extra Income" : "Savings";
  const badLabel = isIncome ? "Under Budget" : "Overspend";

  return (
    <Stack>
      <MoneyInput
        onChange={(value) => setBudgetAmount(value.toString())}
        onBlur={handleBudgetChange}
        value={budgetAmount}
        pos="relative"
        top="12px"
      />

      <Title order={4} size="sm" mt="sm">
        Last {NUM_MONTHS_TO_DISPLAY} Months {isIncome ? "Income" : "Spending"}
      </Title>
      <BarChart
        h={200}
        data={getBarChartData()}
        dataKey="month"
        series={[
          {
            name: "withinBudget",
            color: theme.colors.blue[6],
            label: "Within Budget",
          },
          {
            name: "aboveBudget",
            color: isIncome ? theme.colors.green[6] : theme.colors.red[6],
            label: isIncome ? goodLabel : badLabel,
          },
          {
            name: "belowBudget",
            color: isIncome ? theme.colors.red[6] : theme.colors.green[6],
            label: isIncome ? badLabel : goodLabel,
          },
        ]}
        barProps={{ barSize: 20 }}
        withTooltip
        orientation="vertical"
        type="stacked"
        xAxisProps={{
          tickFormatter: (value: number) => FormatMoney(value),
        }}
        tooltipProps={{
          content: ({ payload }) => {
            if (payload && payload.length > 0) {
              const data = payload[0].payload;

              let actualAmount = data.withinBudget + data.aboveBudget;

              return (
                <Paper p="xs" shadow="sm">
                  <div style={{ fontSize: "14px" }}>
                    <div>
                      <strong>{data.month}</strong>
                    </div>
                    <div>
                      {isIncome ? "Earned" : "Spent"}:{" "}
                      {FormatMoney(actualAmount)}
                    </div>
                    {data.aboveBudget > 0 && (
                      <div style={{ color: isIncome ? theme.colors.green[6] : theme.colors.red[6] }}>
                        {isIncome ? goodLabel : badLabel}: {FormatMoney(data.aboveBudget)}
                      </div>
                    )}
                    {data.belowBudget > 0 && (
                      <div style={{ color: isIncome ? theme.colors.red[6] : theme.colors.green[6] }}>
                        {isIncome ? badLabel : goodLabel}: {FormatMoney(data.belowBudget)}
                      </div>
                    )}
                  </div>
                </Paper>
              );
            }
            return null;
          },
        }}
      />
    </Stack>
  );
}

function NoBudgetContent({ category }: { category?: Category }) {
  const [creating, setCreating] = useState(false);

  const handleCreateBudget = async () => {
    if (!category) return;

    setCreating(true);
    const response = await requestCreateBudget(category.id);
    setCreating(false);

    if (response.success) {
      // todo
    }
  };

  return (
    <Center h="calc(100% - 60px)">
      <Button
        loading={creating}
        onClick={handleCreateBudget}
        disabled={!category}
      >
        Create Budget
      </Button>
    </Center>
  );
}

function LoadingContent() {
  return "Loading...";
}

function ErrorContent() {
  return "Error.";
}

function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <Paper p={"sm"} h={"100%"}>
      <Title order={3}>Budget</Title>
      {children}
    </Paper>
  );
}
