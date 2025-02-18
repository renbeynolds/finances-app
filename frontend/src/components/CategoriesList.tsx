import { Button, Stack, Text } from '@mantine/core';
import { UseLazyCategories } from '../context/CategoriesContext';

export default function CategoriesList() {
  const categories = UseLazyCategories();

  return (
    <Stack align='stretch' justify='flex-start' gap='md'>
      {categories.map((category, index) => (
        <Button key={index} variant='outline' h='3rem' justify='space-between'>
          <Stack gap='0'>
            <Text size='l'>{category.name}</Text>
          </Stack>
        </Button>
      ))}
    </Stack>
  );
}
