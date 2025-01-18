import { Button, Stack, Text } from '@mantine/core';
import useSWR from 'swr';
import { CategoriesEndpoint, CategoriesFetcher } from '../Fetchers';

export default function CategoriesList() {
  const { data, error, isLoading } = useSWR(
    CategoriesEndpoint,
    CategoriesFetcher
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <Stack align='stretch' justify='flex-start' gap='md'>
      {data!.data.map((category, index) => (
        <Button key={index} variant='outline' h='3rem' justify='space-between'>
          <Stack gap='0'>
            <Text size='l' c='white'>
              {category.name}
            </Text>
          </Stack>
        </Button>
      ))}
    </Stack>
  );
}
