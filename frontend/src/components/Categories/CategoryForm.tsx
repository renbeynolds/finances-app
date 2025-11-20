import { Button, Select, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  UseCategoriesDispatch,
  UseLazyCategories,
} from "../../context/CategoriesContext";
import {
  requestCreateCategory,
  requestUpdateCategory,
} from "../../data/Categories/requests";

export interface CategoryFormValues {
  name: string;
  color: string | null;
  parentId: number | null;
  emoji: string | null;
  type: "expense" | "income" | "transfer";
}

type CategoryFormProps = {
  category?: CategoryFormValues & { id: number };
  close: () => void;
};

export default function CategoryForm({ category, close }: CategoryFormProps) {
  const categories = UseLazyCategories();
  const dispatch = UseCategoriesDispatch();

  const form = useForm<CategoryFormValues>({
    initialValues: category,
    validate: {},
  });

  const handleSubmit = async (values: CategoryFormValues) => {
    if (!category) {
      const response = await requestCreateCategory(values);
      if (response.success) {
        dispatch({ type: "ADD", payload: response.data });
        close();
      }
    } else {
      const response = await requestUpdateCategory(category.id, values);
      if (response.success) {
        dispatch({ type: "UPDATE", payload: response.data });
        close();
      }
    }
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <Stack>
        <TextInput
          {...form.getInputProps("name")}
          placeholder="Name"
          label="Name"
        />
        <TextInput
          {...form.getInputProps("color")}
          placeholder="Color"
          label="Color"
        />
        <TextInput
          {...form.getInputProps("emoji")}
          placeholder="Emoji"
          label="Emoji"
        />
        <Select
          {...form.getInputProps("type")}
          placeholder="Type"
          label="Type"
          data={[
            { value: "expense", label: "Expense" },
            { value: "income", label: "Income" },
            { value: "transfer", label: "Transfer" },
          ]}
        />
        <Select
          {...form.getInputProps("parentId")}
          placeholder="Parent Category"
          label="Parent Category"
          data={categories.map((category) => ({
            value: category.id.toString(),
            label: category.name,
          }))}
        />
        <Button type="submit" loading={form.submitting}>
          {category ? "Update" : "Create"}
        </Button>
      </Stack>
    </form>
  );
}
