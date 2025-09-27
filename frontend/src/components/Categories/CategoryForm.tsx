import { Button, Select, Stack, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { UseLazyCategories } from '../../context/CategoriesContext';
import { requestCreateCategory } from '../../data/Categories/requests';

export interface CategoryFormValues {
  name: string;
  color: string | null;
  parentId: number | null;
  iconURL: string | null;
  type: 'expense' | 'income';
}

type CategoryFormProps = {
  category?: CategoryFormValues & { id: number };
  close: () => void;
};

export default function CategoryForm({ category, close }: CategoryFormProps) {
  const categories = UseLazyCategories();

  const form = useForm<CategoryFormValues>({
    initialValues: category,
    validate: {},
  });

  const handleSubmit = async (values: CategoryFormValues) => {
    // if (!category) {
    const response = await requestCreateCategory(values);
    if (response.code === 200) {
      close();
    }
    // } else {
    //   const response = await requestUpdateCategory(category.id, values);
    //   if (response.code === 200) {
    //     close();
    //   }
    // }
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <Stack>
        <TextInput
          {...form.getInputProps('name')}
          placeholder='Name'
          label='Name'
        />
        <TextInput
          {...form.getInputProps('color')}
          placeholder='Color'
          label='Color'
        />
        <TextInput
          {...form.getInputProps('iconURL')}
          placeholder='Icon URL'
          label='Icon URL'
        />
        <Select
          {...form.getInputProps('type')}
          placeholder='Type'
          label='Type'
          data={[
            { value: 'expense', label: 'Expense' },
            { value: 'income', label: 'Income' },
          ]}
        />
        <Select
          {...form.getInputProps('parentId')}
          placeholder='Parent Category'
          label='Parent Category'
          data={categories.map((category) => ({
            value: category.id.toString(),
            label: category.name,
          }))}
        />
        <Button type='submit' loading={form.submitting}>
          Submit
        </Button>
      </Stack>
    </form>
  );
}
