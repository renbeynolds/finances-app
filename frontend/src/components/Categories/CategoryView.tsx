import { Stack, Title } from '@mantine/core';
import { useParams } from 'react-router';
import { UseLazyCategories } from '../../context/CategoriesContext';
import TransactionTable from '../TransactionTable';

export default function CategoryView() {
  const { categoryId } = useParams();
  const categories = UseLazyCategories();
  const category = categories.find((c) => c.id === parseInt(categoryId || ''));

  return (
    <Stack>
      <Title order={2}>{category?.name}</Title>
      <TransactionTable categoryId={categoryId} />
    </Stack>
  );
}
