import {
  Accordion,
  Grid,
  Group,
  Paper,
  Stack,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { IconCurrencyDollarOff, IconMoneybag } from "@tabler/icons-react";
import { useBudgetsViewData } from "../../data/Budgets/hooks";
import { BudgetsViewData } from "../../data/Budgets/types";
import { FormatMoney } from "../../utils";
import MonthPicker from "../MonthPicker";

export default function BudgetsView() {
  const { data, isLoading, error } = useBudgetsViewData();

  if (isLoading) {
    return <div>Loading budgets...</div>;
  }

  if (error) {
    return <div>Error loading budgets</div>;
  }

  const expenseCategories = data!
    .filter((category) => category.budget && category.type === "expense")
    .sort((a, b) => a.name.localeCompare(b.name));
  const incomeCategories = data!
    .filter((category) => category.budget && category.type === "income")
    .sort((a, b) => a.name.localeCompare(b.name));
  const categoriesWithoutBudgets = data!
    .filter(
      (category) =>
        !category.budget && category.actual > 0 && category.type === "expense",
    )
    .sort((a, b) => b.actual - a.actual);
  const incomeBudgetTotal = incomeCategories.reduce(
    (total, category) => total + category.budget!,
    0,
  );
  const expenseBudgetTotal = expenseCategories.reduce(
    (total, category) => total + category.budget!,
    0,
  );
  const incomeActualTotal = incomeCategories.reduce(
    (total, category) => total + category.actual,
    0,
  );
  const expenseActualTotal = expenseCategories.reduce(
    (total, category) => total + category.actual,
    0,
  );

  return (
    <Stack>
      <MonthPicker />
      <Grid>
        <Grid.Col span={7}>
          <Paper>
            <Accordion defaultValue={["Expenses"]} multiple>
              <Accordion.Item key={"Income"} value={"Income"}>
                <Accordion.Control icon={<IconMoneybag />}>
                  <Table ml="2rem" w="calc(100% - 58px)" layout="fixed">
                    <Table.Thead>
                      <Table.Tr>
                        <Table.Th>
                          <Title order={4}>Income</Title>
                        </Table.Th>
                        <Table.Th>
                          <Title order={4}>Budget</Title>
                        </Table.Th>
                        <Table.Th>
                          <Title order={4}>Actual</Title>
                        </Table.Th>
                        <Table.Th>
                          <Title order={4}>%</Title>
                        </Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                      <Table.Tr>
                        <Table.Td></Table.Td>
                        <Table.Td>{FormatMoney(incomeBudgetTotal)}</Table.Td>
                        <Table.Td
                          c={
                            incomeActualTotal > incomeBudgetTotal
                              ? "green"
                              : "red"
                          }
                        >
                          {FormatMoney(incomeActualTotal)}
                        </Table.Td>
                        <Table.Td
                          c={
                            incomeActualTotal > incomeBudgetTotal
                              ? "green"
                              : "red"
                          }
                        >
                          {(() => {
                            const percentage = incomeBudgetTotal
                              ? (
                                  (incomeActualTotal / incomeBudgetTotal) *
                                  100
                                ).toFixed(2)
                              : "0.00";
                            return `${percentage}%`;
                          })()}
                        </Table.Td>
                      </Table.Tr>
                    </Table.Tbody>
                  </Table>
                </Accordion.Control>
                <IncomeAccordionPanel categories={incomeCategories} />
              </Accordion.Item>
              <Accordion.Item key={"Expenses"} value={"Expenses"}>
                <Accordion.Control icon={<IconCurrencyDollarOff />}>
                  <Table ml="2rem" w="calc(100% - 58px)" layout="fixed">
                    <Table.Thead>
                      <Table.Tr>
                        <Table.Th>
                          <Title order={4}>Expenses</Title>
                        </Table.Th>
                        <Table.Th>
                          <Title order={4}>Budget</Title>
                        </Table.Th>
                        <Table.Th>
                          <Title order={4}>Actual</Title>
                        </Table.Th>
                        <Table.Th>
                          <Title order={4}>%</Title>
                        </Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                      <Table.Tr>
                        <Table.Td></Table.Td>
                        <Table.Td>{FormatMoney(expenseBudgetTotal)}</Table.Td>
                        <Table.Td
                          c={
                            expenseActualTotal > expenseBudgetTotal
                              ? "red"
                              : "green"
                          }
                        >
                          {FormatMoney(expenseActualTotal)}
                        </Table.Td>
                        <Table.Td
                          c={
                            expenseActualTotal > expenseBudgetTotal
                              ? "red"
                              : "green"
                          }
                        >
                          {(() => {
                            const percentage = expenseBudgetTotal
                              ? (
                                  (expenseActualTotal / expenseBudgetTotal) *
                                  100
                                ).toFixed(2)
                              : "0.00";
                            return `${percentage}%`;
                          })()}
                        </Table.Td>
                      </Table.Tr>
                    </Table.Tbody>
                  </Table>
                </Accordion.Control>
                <ExpensesAccordionPanel categories={expenseCategories} />
              </Accordion.Item>
            </Accordion>
          </Paper>
        </Grid.Col>
        <Grid.Col span={5}>
          <Paper p="md">
            <Stack gap="md">
              <Group justify="space-between">
                <Text style={{ fontWeight: "bold" }}>Unbudgeted Expenses</Text>
                <Text c="red">
                  {FormatMoney(
                    categoriesWithoutBudgets.reduce(
                      (total, category) => total + category.actual,
                      0,
                    ),
                  )}
                </Text>
              </Group>
              {categoriesWithoutBudgets.length > 0 ? (
                <Table>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Category</Table.Th>
                      <Table.Th style={{ textAlign: "right" }}>
                        Spending
                      </Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {categoriesWithoutBudgets.map((category) => (
                      <Table.Tr key={category.id}>
                        <Table.Td>{category.name}</Table.Td>
                        <Table.Td style={{ textAlign: "right" }}>
                          {FormatMoney(category.actual)}
                        </Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              ) : (
                <Text size="sm" c="dimmed">
                  No categories without budgets with spending
                </Text>
              )}
            </Stack>
          </Paper>
        </Grid.Col>
      </Grid>
    </Stack>
  );
}

function IncomeAccordionPanel({
  categories,
}: {
  categories: BudgetsViewData[];
}) {
  return (
    <Accordion.Panel>
      <Table ml="68px" w="calc(100% - 112px)" layout="fixed">
        <Table.Tbody>
          {categories.map((category) => {
            const percentage = category.budget
              ? ((category.actual / category.budget) * 100).toFixed(2)
              : "0.00";
            return (
              <Table.Tr key={category.id}>
                <Table.Td style={{ fontWeight: "bold" }} c="dimmed">
                  {category.name}
                </Table.Td>
                <Table.Td>{FormatMoney(category.budget!)}</Table.Td>
                <Table.Td>{FormatMoney(category.actual)}</Table.Td>
                <Table.Td
                  c={category.actual > category.budget! ? "green" : "red"}
                >
                  {percentage}%
                </Table.Td>
              </Table.Tr>
            );
          })}
        </Table.Tbody>
      </Table>
    </Accordion.Panel>
  );
}

function ExpensesAccordionPanel({
  categories,
}: {
  categories: BudgetsViewData[];
}) {
  return (
    <Accordion.Panel>
      <Table ml="68px" w="calc(100% - 112px)" layout="fixed">
        <Table.Tbody>
          {categories.map((category) => {
            const percentage = category.budget
              ? ((category.actual / category.budget) * 100).toFixed(2)
              : "0.00";
            return (
              <Table.Tr key={category.id}>
                <Table.Td style={{ fontWeight: "bold" }} c="dimmed">
                  {category.name}
                </Table.Td>
                <Table.Td>{FormatMoney(category.budget!)}</Table.Td>
                <Table.Td>{FormatMoney(category.actual)}</Table.Td>
                <Table.Td
                  c={category.actual > category.budget! ? "red" : "green"}
                >
                  {percentage}%
                </Table.Td>
              </Table.Tr>
            );
          })}
        </Table.Tbody>
      </Table>
    </Accordion.Panel>
  );
}
