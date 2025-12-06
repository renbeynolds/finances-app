import { Accordion, Group, Paper, Table, Text, Title } from "@mantine/core";
import { IconCurrencyDollarOff, IconMoneybag } from "@tabler/icons-react";
import { useBudgetsWithCategories } from "../../data/Budgets/hooks";
import { BudgetWithCategory } from "../../data/Budgets/types";
import { FormatMoney } from "../../utils";

export default function BudgetsView() {

  const { budgets, budgetsLoading, budgetsError } = useBudgetsWithCategories();

  if (budgetsLoading) {
    return <div>Loading budgets...</div>;
  }

  if (budgetsError) {
    return <div>Error loading budgets</div>;
  }

  const expenseBudgets = budgets!.filter((budget) => budget.category.type === "expense");
  const incomeBudgets = budgets!.filter((budget) => budget.category.type === "income");
  
  return (
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
  );
}

function IncomeAccordionPanel({ budgets }: { budgets: BudgetWithCategory[] }) {
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

function ExpensesAccordionPanel({ budgets }: { budgets: BudgetWithCategory[] }) {
  return (
    <Accordion.Panel>
    <Table ml="28px">
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Category</Table.Th>
          <Table.Th>Amount</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {
          budgets.map((budget) => (
            <Table.Tr key={budget.id}>
              <Table.Td w="20.3%">{budget.category.name}</Table.Td>
              <Table.Td>{FormatMoney(budget.amount)}</Table.Td>
            </Table.Tr>
          ))
        }
      </Table.Tbody>
    </Table>
    </Accordion.Panel>
  )
}