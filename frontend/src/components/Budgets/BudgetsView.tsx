import { Accordion, Group, Paper, Stack, Table, Text, Title } from "@mantine/core";
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
              <Group w="100%">
                <Text w="20%">Income</Text>
                <Group>
                    <Title order={4}>Total</Title>
                    <Text c="green">{FormatMoney(incomeBudgets.reduce((total, budget) => total + budget.amount, 0))}</Text>
                </Group>
              </Group>
            </Accordion.Control>
            <IncomeAccordionPanel
              budgets={incomeBudgets}
            />
          </Accordion.Item>
          <Accordion.Item key={"Expenses"} value={"Expenses"}>
            <Accordion.Control icon={<IconCurrencyDollarOff />}>
              <Group w="100%">
                <Text w="20%">Expenses</Text>
                <Group>
                    <Title order={4}>Total</Title>
                    <Text c="red">{FormatMoney(expenseBudgets.reduce((total, budget) => total + budget.amount, 0))}</Text>
                </Group>
              </Group>
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
      {
        budgets.map((budget) => (
          <div key={budget.id}>{budget.category.name}: {budget.amount}</div>
        ))
      }
    </Accordion.Panel>
  )
}

function ExpensesAccordionPanel({ budgets }: { budgets: BudgetWithCategoryAndActual[] }) {
  return (
    <Accordion.Panel>
    <Table ml="28px">
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Category</Table.Th>
          <Table.Th>Budget</Table.Th>
          <Table.Th>Actual</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {
          budgets.map((budget) => (
            <Table.Tr key={budget.id}>
              <Table.Td w="20.3%">{budget.category.name}</Table.Td>
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