import { SimpleGrid, Stack } from '@mantine/core';
import React from 'react';
import useSWR from 'swr';
import { TransactionFiltersContext } from '../context/TransactionFiltersContext';
import { AmountFetcher, FilteredTransactionsTotalEndpoint } from '../Fetchers';
import AmountCard from './AmountCard';
import TransactionTable from './TransactionTable';

export default function Explore() {
  const transactionFilters = React.useContext(TransactionFiltersContext);

  const { data, error, isLoading } = useSWR(
    FilteredTransactionsTotalEndpoint(transactionFilters),
    AmountFetcher,
  );

  return (
    <Stack>
      <SimpleGrid cols={2}>
        <AmountCard title='Total' amount={data?.data} isLoading={isLoading} />
      </SimpleGrid>
      <TransactionTable />
    </Stack>
  );
}
