import { Button, Stack, Text } from '@mantine/core';
import { IconUpload } from '@tabler/icons-react';
import currency from 'currency.js';
import useSWR from 'swr';
import { AccountsEndpoint, AccountsFetcher } from '../Fetchers';

export default function AccountsList() {
  const { data, error, isLoading } = useSWR(AccountsEndpoint, AccountsFetcher);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <Stack align='stretch' justify='flex-start' gap='md' mt='md'>
      {data!.data.map((account, index) => (
        <Button
          key={index}
          variant='outline'
          h='3rem'
          justify='space-between'
          rightSection={<IconUpload size={14} />}
        >
          <Stack gap='0'>
            <Text size='l' c='white'>
              {account.name}
            </Text>
            <Text
              size='xs'
              style={{ textAlign: 'left' }}
              c={account.balance > 0 ? 'green' : 'red'}
            >
              {currency(account.balance, {
                fromCents: true,
              }).format()}
            </Text>
          </Stack>
        </Button>
      ))}
    </Stack>
  );
}
