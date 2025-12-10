import {
  Accordion,
  Box,
  Grid,
  Group,
  Paper,
  Stack,
  Table,
  Text,
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
        !category.budget && category.actual > 0 && category.type === "expense"
    )
    .sort((a, b) => b.actual - a.actual);

  return (
    <Stack>
      <MonthPicker />
      <Grid>
        <Grid.Col span={7}>
          <Paper>
            <Accordion defaultValue={["Expenses"]} multiple>
              <Accordion.Item key={"Income"} value={"Income"}>
                <Accordion.Control icon={<IconMoneybag />}>
                  <Stack>
                    <Group ml="2rem">
                      <Text style={{ fontWeight: "bold" }} w="20%">
                        Income
                      </Text>
                      <Text style={{ fontWeight: "bold" }} w="20%">
                        Budget
                      </Text>
                      <Text style={{ fontWeight: "bold" }} w="20%">
                        Actual
                      </Text>
                      <Text style={{ fontWeight: "bold" }} w="20%">
                        %
                      </Text>
                    </Group>
                    <Group ml="2rem">
                      <Box w="20%"></Box>
                      <Text w="20%">
                        {FormatMoney(
                          incomeCategories.reduce(
                            (total, category) => total + category.budget!,
                            0
                          )
                        )}
                      </Text>
                      <Text w="20%" c="green">
                        {FormatMoney(
                          incomeCategories.reduce(
                            (total, category) => total + category.actual,
                            0
                          )
                        )}
                      </Text>
                      <Text w="20%">
                        {(() => {
                          const totalBudget = incomeCategories.reduce(
                            (total, category) => total + category.budget!,
                            0
                          );
                          const totalActual = incomeCategories.reduce(
                            (total, category) => total + category.actual,
                            0
                          );
                          const percentage = totalBudget
                            ? ((totalActual / totalBudget) * 100).toFixed(2)
                            : "0.00";
                          return `${percentage}%`;
                        })()}
                      </Text>
                    </Group>
                  </Stack>
                </Accordion.Control>
                <IncomeAccordionPanel categories={incomeCategories} />
              </Accordion.Item>
              <Accordion.Item key={"Expenses"} value={"Expenses"}>
                <Accordion.Control icon={<IconCurrencyDollarOff />}>
                  <Stack>
                    <Group ml="2rem">
                      <Text style={{ fontWeight: "bold" }} w="20%">
                        Expenses
                      </Text>
                      <Text style={{ fontWeight: "bold" }} w="20%">
                        Budget
                      </Text>
                      <Text style={{ fontWeight: "bold" }} w="20%">
                        Actual
                      </Text>
                      <Text style={{ fontWeight: "bold" }} w="20%">
                        %
                      </Text>
                    </Group>
                    <Group ml="2rem">
                      <Box w="20%"></Box>
                      <Text w="20%">
                        {FormatMoney(
                          expenseCategories.reduce(
                            (total, category) => total + category.budget!,
                            0
                          )
                        )}
                      </Text>
                      <Text w="20%" c="red">
                        {FormatMoney(
                          expenseCategories.reduce(
                            (total, category) => total + category.actual,
                            0
                          )
                        )}
                      </Text>
                      <Text w="20%">
                        {(() => {
                          const totalBudget = expenseCategories.reduce(
                            (total, category) => total + category.budget!,
                            0
                          );
                          const totalActual = expenseCategories.reduce(
                            (total, category) => total + category.actual,
                            0
                          );
                          const percentage = totalBudget
                            ? ((totalActual / totalBudget) * 100).toFixed(2)
                            : "0.00";
                          return `${percentage}%`;
                        })()}
                      </Text>
                    </Group>
                  </Stack>
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
                      0
                    )
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
      <Table ml="58px" w="calc(100% - 80px)" layout="fixed">
        <Table.Tbody>
          {categories.map((category) => {
            const percentage = category.budget
              ? ((category.actual / category.budget) * 100).toFixed(2)
              : "0.00";
            return (
              <Table.Tr key={category.id}>
                <Table.Td style={{ fontWeight: "bold" }}>
                  {category.name}
                </Table.Td>
                <Table.Td>{FormatMoney(category.budget!)}</Table.Td>
                <Table.Td>{FormatMoney(category.actual)}</Table.Td>
                <Table.Td>{percentage}%</Table.Td>
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
      <Table ml="58px" w="calc(100% - 80px)" layout="fixed">
        <Table.Tbody>
          {categories.map((category) => {
            const percentage = category.budget
              ? ((category.actual / category.budget) * 100).toFixed(2)
              : "0.00";
            return (
              <Table.Tr key={category.id}>
                <Table.Td style={{ fontWeight: "bold" }}>
                  {category.name}
                </Table.Td>
                <Table.Td>{FormatMoney(category.budget!)}</Table.Td>
                <Table.Td>{FormatMoney(category.actual)}</Table.Td>
                <Table.Td>{percentage}%</Table.Td>
              </Table.Tr>
            );
          })}
        </Table.Tbody>
      </Table>
    </Accordion.Panel>
  );
}
