import { BarChart } from "@mantine/charts";
import {
  ActionIcon,
  Grid,
  Group,
  Modal,
  Paper,
  Stack,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import dayjs from "dayjs";
import React from "react";
import { useParams } from "react-router";
import useSWR from "swr";
import {
  UseCategoriesDispatch,
  UseLazyCategories,
} from "../../context/CategoriesContext";
import { useBudget } from "../../data/Budgets/hooks";
import { requestUpdateBudget } from "../../data/Budgets/requests";
import {
  AmountOverTimeFetcher,
  CategoryOverTimeEndpoint,
} from "../../Fetchers";
import { FormatMoney, FormatMonthString, MoneyInputToCents } from "../../utils";
import AmountOverTimeChart from "../AmountOverTimeChart";
import MoneyInput from "../MoneyInput";
import TransactionTable from "../TransactionTable";
import CategoryForm from "./CategoryForm";

export default function CategoryView() {
  const { categoryId } = useParams();
  const categories = UseLazyCategories();
  const category = categories.find((c) => c.id === parseInt(categoryId || ""));
  const [editModalOpened, setEditModalOpened] = React.useState(false);
  const dispatch = UseCategoriesDispatch();
  const [budgetAmount, setBudgetAmount] = React.useState<string>("0");
  const theme = useMantineTheme();

  const { budget } = useBudget(category?.budgetId);

  const startDate = dayjs()
    .startOf("month")
    .subtract(37, "month")
    .format("YYYY-MM-DD");
  const endDate = dayjs()
    .startOf("month")
    .subtract(1, "day")
    .format("YYYY-MM-DD");

  const categoryOverTimeResponse = useSWR(
    CategoryOverTimeEndpoint(startDate, endDate, categoryId || ""),
    AmountOverTimeFetcher
  );

  React.useEffect(() => {
    setBudgetAmount(
      budget && budget.amount ? (budget.amount / 100).toString() : "0"
    );
  }, [budget]);

  const handleBudgetChange = async () => {
    const response = await requestUpdateBudget(
      budget?.id || 0,
      MoneyInputToCents(budgetAmount)
    );
    if (response.success) {
      close();
    }
  };

  // Prepare data for the last 3 months stacked bar chart
  const getBarChartData = () => {
    if (!categoryOverTimeResponse.data?.data) return [];

    const budgetAmountCents = MoneyInputToCents(
      budget && budget.amount ? (budget.amount / 100).toString() : "0"
    );

    return categoryOverTimeResponse.data.data
      .slice(-4)
      .reverse() // Reverse to show most recent month on top
      .map((item) => {
        const spentAmount = Math.abs(item.amount);
        const withinBudget = Math.min(spentAmount, budgetAmountCents);
        const savings = Math.max(0, budgetAmountCents - spentAmount);
        const overspend = Math.max(0, spentAmount - budgetAmountCents);

        return {
          month: FormatMonthString(item.date),
          withinBudget,
          savings,
          overspend,
        };
      });
  };

  return (
    <>
      <Stack>
        <Group justify="space-between">
          <Group>
            <Title order={2}>{category?.name}</Title>
            <ActionIcon
              size="m"
              variant="outline"
              onClick={() => setEditModalOpened(true)}
            >
              <IconEdit style={{ width: "70%" }} />
            </ActionIcon>
          </Group>
        </Group>
        <Grid>
          <Grid.Col span={8}>
            <AmountOverTimeChart
              response={categoryOverTimeResponse}
              title="Amount Over Time"
              displayTrendline
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <Paper p={"sm"} h={"100%"}>
              <Stack>
                <Title order={3}>Budget</Title>
                <MoneyInput
                  onChange={(value) => setBudgetAmount(value.toString())}
                  onBlur={handleBudgetChange}
                  value={budgetAmount}
                />
                {budget && parseFloat(budgetAmount) > 0 && (
                  <>
                    <Title order={4} size="sm" mt="sm">
                      Last 4 Months Spending
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
                          name: "savings",
                          color: theme.colors.green[6],
                          label: "Savings",
                        },
                        {
                          name: "overspend",
                          color: theme.colors.red[6],
                          label: "Overspend",
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
                            const total = data.withinBudget + data.overspend;
                            return (
                              <Paper p="xs" shadow="sm">
                                <div style={{ fontSize: "14px" }}>
                                  <div>
                                    <strong>{data.month}</strong>
                                  </div>
                                  <div>Spent: {FormatMoney(total)}</div>
                                  {data.savings > 0 && (
                                    <div
                                      style={{ color: theme.colors.green[6] }}
                                    >
                                      Savings: {FormatMoney(data.savings)}
                                    </div>
                                  )}
                                  {data.overspend > 0 && (
                                    <div style={{ color: theme.colors.red[6] }}>
                                      Overspend: {FormatMoney(data.overspend)}
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
                  </>
                )}
              </Stack>
            </Paper>
          </Grid.Col>
        </Grid>
        <TransactionTable categoryId={categoryId} />
      </Stack>
      <Modal
        opened={editModalOpened}
        onClose={() => setEditModalOpened(false)}
        title="Edit Category"
      >
        <CategoryForm
          category={
            category
              ? {
                  id: category.id,
                  name: category.name,
                  color: category.color || null,
                  parentId: category.parentCategoryId || null,
                  emoji: category.emoji || null,
                  type: category.type as "expense" | "income" | "transfer",
                }
              : undefined
          }
          close={() => setEditModalOpened(false)}
        />
      </Modal>
    </>
  );
}
