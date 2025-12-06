import { Accordion, Box, Group, Paper, Stack, Table, Text } from "@mantine/core";
import { IconCurrencyDollarOff, IconMoneybag } from "@tabler/icons-react";
import { useBudgetsViewData } from "../../data/Budgets/hooks";
import { BudgetWithCategoryAndActual } from "../../data/Budgets/types";
import { FormatMoney } from "../../utils";
import MonthPicker from "../MonthPicker";

export default function BudgetsView() {

  const { budgets, budgetsLoading, budgetsError } = useBudgetsViewData();

  if (budgetsLoading) {
    return <div>Loading budgets...</div>;
  }

  if (budgetsError) {
    return <div>Error loading budgets</div>;
  }

  const expenseBudgets = budgets!.filter((budget) => budget.category.type === "expense").sort((a, b) => a.category.name.localeCompare(b.category.name));
  const incomeBudgets = budgets!.filter((budget) => budget.category.type === "income").sort((a, b) => a.category.name.localeCompare(b.category.name));
  
  return (
    <Stack>
      <MonthPicker />
      <Paper>
        <Accordion defaultValue="Expenses">
          <Accordion.Item key={"Income"} value={"Income"}>
            <Accordion.Control icon={<IconMoneybag />}>
              <Stack>
                <Group ml="2rem">
                  <Text style={{ fontWeight: "bold" }} w="20%">Income</Text>
                  <Text style={{ fontWeight: "bold" }} w="20%">Budget</Text>
                  <Text style={{ fontWeight: "bold" }} w="20%">Actual</Text>
                </Group>
                <Group ml="2rem">
                  <Box w="20%"></Box>
                  <Text w="20%">{FormatMoney(incomeBudgets.reduce((total, budget) => total + budget.amount, 0))}</Text>
                  <Text w="20%" c="green">{FormatMoney(incomeBudgets.reduce((total, budget) => total + budget.actual, 0))}</Text>
                </Group>
              </Stack>
            </Accordion.Control>
            <IncomeAccordionPanel
              budgets={incomeBudgets}
            />
          </Accordion.Item>
          <Accordion.Item key={"Expenses"} value={"Expenses"}>
            <Accordion.Control icon={<IconCurrencyDollarOff />}>
              <Stack>
                <Group ml="2rem">
                  <Text style={{ fontWeight: "bold" }} w="20%">Expenses</Text>
                  <Text style={{ fontWeight: "bold" }} w="20%">Budget</Text>
                  <Text style={{ fontWeight: "bold" }} w="20%">Actual</Text>
                </Group>
                <Group ml="2rem">
                  <Box w="20%"></Box>
                  <Text w="20%">{FormatMoney(expenseBudgets.reduce((total, budget) => total + budget.amount, 0))}</Text>
                  <Text w="20%" c="red">{FormatMoney(expenseBudgets.reduce((total, budget) => total + budget.actual, 0))}</Text>
                </Group>
              </Stack>
            </Accordion.Control>
            <ExpensesAccordionPanel
              budgets={expenseBudgets}
            />
          </Accordion.Item>
        </Accordion>
      </Paper>
    </Stack>
  );
}

function IncomeAccordionPanel({ budgets }: { budgets: BudgetWithCategoryAndActual[] }) {
  return (
    <Accordion.Panel>
      <Table ml="58px">
        <Table.Tbody>
          {
            budgets.map((budget) => (
              <Table.Tr key={budget.id}>
                <Table.Td w="20%" style={{ fontWeight: "bold" }}>{budget.category.name}</Table.Td>
                <Table.Td w="20%">{FormatMoney(budget.amount)}</Table.Td>
                <Table.Td>{FormatMoney(budget.actual)}</Table.Td>
              </Table.Tr>
            ))
          }
        </Table.Tbody>
      </Table>
    </Accordion.Panel>
  )
}

function ExpensesAccordionPanel({ budgets }: { budgets: BudgetWithCategoryAndActual[] }) {
  return (
    <Accordion.Panel>
      <Table ml="58px">
        <Table.Tbody>
          {
            budgets.map((budget) => (
              <Table.Tr key={budget.id}>
                <Table.Td w="20%" style={{ fontWeight: "bold" }}>{budget.category.name}</Table.Td>
                <Table.Td w="20%">{FormatMoney(budget.amount)}</Table.Td>
                <Table.Td>{FormatMoney(budget.actual)}</Table.Td>
              </Table.Tr>
            ))
          }
        </Table.Tbody>
      </Table>
    </Accordion.Panel>
  )
}