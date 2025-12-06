import { Accordion, Paper } from "@mantine/core";
import { IconCurrencyDollarOff, IconMoneybag } from "@tabler/icons-react";
import { useBudgetsWithCategories } from "../../data/Budgets/hooks";
import { BudgetWithCategory } from "../../data/Budgets/types";

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
          <Accordion.Control icon={<IconMoneybag />}>{"Income"}</Accordion.Control>
          <IncomeAccordionPanel
            budgets={incomeBudgets}
          />
        </Accordion.Item>
        <Accordion.Item key={"Expenses"} value={"Expenses"}>
          <Accordion.Control icon={<IconCurrencyDollarOff />}>{"Expenses"}</Accordion.Control>
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
      {
        budgets.map((budget) => (
          <div key={budget.id}>{budget.category.name}: {budget.amount}</div>
        ))
      }
    </Accordion.Panel>
  )
}