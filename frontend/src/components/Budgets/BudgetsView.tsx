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

  return (
    <Stack>
      <MonthPicker />
      <Grid>
        <Grid.Col span={8}>
          <Paper>
            <Accordion defaultValue="Expenses">
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
                    </Group>
                  </Stack>
                </Accordion.Control>
                <ExpensesAccordionPanel categories={expenseCategories} />
              </Accordion.Item>
            </Accordion>
          </Paper>
        </Grid.Col>
        <Grid.Col span={4}>
          <Paper>
            <Stack>
              <Text style={{ fontWeight: "bold" }}>Summary</Text>
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
      <Table ml="58px" w="calc(100% - 58px)">
        <Table.Tbody>
          {categories.map((category) => (
            <Table.Tr key={category.id}>
              <Table.Td w="21%" style={{ fontWeight: "bold" }}>
                {category.name}
              </Table.Td>
              <Table.Td w="21%">{FormatMoney(category.budget!)}</Table.Td>
              <Table.Td>{FormatMoney(category.actual)}</Table.Td>
            </Table.Tr>
          ))}
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
      <Table ml="58px" w="calc(100% - 58px)">
        <Table.Tbody>
          {categories.map((category) => (
            <Table.Tr key={category.id}>
              <Table.Td w="21%" style={{ fontWeight: "bold" }}>
                {category.name}
              </Table.Td>
              <Table.Td w="21%">{FormatMoney(category.budget!)}</Table.Td>
              <Table.Td>{FormatMoney(category.actual)}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Accordion.Panel>
  );
}
