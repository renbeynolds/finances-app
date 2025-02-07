import { Text } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import * as React from 'react';
import useSWR from 'swr';
import { TransactionsEndpoint, TransactionsFetcher } from '../Fetchers';
import { FormatMoney } from '../utils';

const pageSize = 10;

export default function TransactionTable() {
  const [page, setPage] = React.useState(1);

  const { data, error, isLoading } = useSWR(
    `${TransactionsEndpoint}?page=${page}&limit=${pageSize}`,
    TransactionsFetcher
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <DataTable
      withTableBorder
      borderRadius='sm'
      withColumnBorders
      page={page}
      totalRecords={data!.totalRecords}
      recordsPerPage={pageSize}
      onPageChange={(p) => setPage(p)}
      records={data!.data}
      columns={[
        { accessor: 'date', width: '125px' },
        {
          accessor: 'description',
          ellipsis: true,
          cellsStyle: () => ({ maxWidth: '400px' }),
        },
        { accessor: 'comment' },
        {
          accessor: 'amount',
          render: (record) => (
            <Text size='sm' c={record.amount > 0 ? 'green' : 'red'}>
              {FormatMoney(record.amount)}
            </Text>
          ),
        },
        {
          accessor: 'balance',
          render: (record) => (
            <Text size='sm' c={record.balance > 0 ? 'green' : 'red'}>
              {FormatMoney(record.balance)}
            </Text>
          ),
        },
      ]}
    />
  );
}
