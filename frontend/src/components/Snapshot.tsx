import { Pagination, Stack, Table, Title } from '@mantine/core';
import currency from 'currency.js';
import useSWR from 'swr';
import { TransactionsEndpoint, TransactionsFetcher } from '../Fetchers';
import DateRangePicker from './DateRangePicker';

export default function Snapshot() {
  const { data, error, isLoading } = useSWR(
    TransactionsEndpoint,
    TransactionsFetcher
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  const rows = data!.data.map((transaction) => (
    <Table.Tr key={transaction.id}>
      <Table.Td>{transaction.date}</Table.Td>
      <Table.Td>{transaction.description}</Table.Td>
      <Table.Td>{transaction.comment}</Table.Td>
      <Table.Td style={{ textAlign: 'right' }}>
        {currency(transaction.amount, { fromCents: true }).format()}
      </Table.Td>
      <Table.Td style={{ textAlign: 'right' }}>
        {currency(transaction.balance, { fromCents: true }).format()}
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Stack>
      <Title order={2}>Transactions</Title>
      <DateRangePicker />
      <Table striped highlightOnHover withTableBorder withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Date</Table.Th>
            <Table.Th>Description</Table.Th>
            <Table.Th>Comment</Table.Th>
            <Table.Th style={{ textAlign: 'right' }}>Amount</Table.Th>
            <Table.Th style={{ textAlign: 'right' }}>Balance</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
      {data!.totalPages && <Pagination total={data!.totalPages as number} />}
    </Stack>
  );
}
