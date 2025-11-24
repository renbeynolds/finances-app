import {
  ActionIcon,
  Grid,
  Group,
  Modal,
  Paper,
  Stack,
  Title,
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
import { requestUpdateCategory } from "../../data/Categories/requests";
import {
  AmountOverTimeFetcher,
  CategoryOverTimeEndpoint,
} from "../../Fetchers";
import { MoneyInputToCents } from "../../utils";
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
  const [budget, setBudget] = React.useState<string>(
    category?.budget ? (category.budget / 100).toString() : "0"
  );

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
    setBudget(category?.budget ? (category.budget / 100).toString() : "0");
  }, [category, setBudget]);

  const handleBudgetChange = async () => {
    const response = await requestUpdateCategory(Number(categoryId!), {
      budget: MoneyInputToCents(budget),
    });
    if (response.success) {
      dispatch({ type: "UPDATE", payload: response.data });
      close();
    }
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
            <Paper p={"md"} h={"100%"}>
              <Stack>
                <Title order={3}>Budget</Title>
                <MoneyInput
                  onChange={(value) => setBudget(value.toString())}
                  onBlur={handleBudgetChange}
                  value={budget}
                />
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
