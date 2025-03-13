import { Text } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import * as React from 'react';
import useSWR from 'swr';
import { DateFilterContext } from '../context/DateFilterContext';
import { Response } from '../data/Response';
import { Transaction } from '../data/Transaction';
import { TransactionsEndpoint, TransactionsFetcher } from '../Fetchers';
import { requestUpdateTransaction } from '../Requests';
import { FormatMoney } from '../utils';
import DateRangePicker from './DateRangePicker';
import TransactionTableAmountFilter from './TransactionTableAmountFilter';
import TransactionTableCategoryCombobox from './TransactionTableCategoryCombobox';
import TransactionTableCommentBox from './TransactionTableCommentBox';
import TransactionTableCommentFilter from './TransactionTableCommentFilter';
import TransactionTableDescriptionFilter from './TransactionTableDescriptionFilter';

const pageSize = 10;

type TransactionTableProps = {
  accountId?: string;
  hideDateFilter?: boolean;
};

export default function TransactionTable({
  accountId,
  hideDateFilter,
}: TransactionTableProps) {
  const [page, setPage] = React.useState(1);
  const [descriptionFilter, setDescriptionFilter] = React.useState('');
  const [commentFilter, setCommentFilter] = React.useState('');
  const [amountFilter, setAmountFilter] = React.useState<
    [number | undefined, number | undefined]
  >([undefined, undefined]);
  const dateFilter = React.useContext(DateFilterContext);
  const [response, setResponse] = React.useState<Response<Transaction[]>>();

  React.useEffect(() => {
    setPage(1);
  }, [
    setPage,
    accountId,
    descriptionFilter,
    dateFilter,
    amountFilter,
    commentFilter,
  ]);

  const { data, error, isLoading, mutate } = useSWR(
    `${TransactionsEndpoint}?page=${page}&limit=${pageSize}` +
      `&from=${dateFilter[0]}&to=${dateFilter[1]}` +
      `&description=${descriptionFilter}` +
      `&min=${amountFilter[0] !== undefined ? amountFilter[0] : ''}&max=${amountFilter[1] !== undefined ? amountFilter[1] : ''}` +
      `&comment=${commentFilter}` +
      `&account_id=${accountId !== undefined ? accountId : ''}`,
    TransactionsFetcher,
  );

  const updateTransaction = React.useCallback(
    async (transaction: Transaction) => {
      const updatedTransaction = await requestUpdateTransaction(transaction);
      mutate({
        ...data!,
        data: data!.data.map((t) =>
          t.id === updatedTransaction.id ? updatedTransaction : t,
        ),
      });
    },
    [mutate, data],
  );

  React.useEffect(() => {
    if (!error && !isLoading && data) {
      setResponse(data);
    }
  }, [data, error, isLoading, setResponse]);

  if (!response) return <div>loading...</div>;
  if (error) return <div>failed to load</div>;

  return (
    <DataTable
      withTableBorder
      borderRadius='sm'
      withColumnBorders
      page={page}
      totalRecords={response!.totalRecords}
      recordsPerPage={pageSize}
      onPageChange={(p) => setPage(p)}
      records={response!.data}
      columns={[
        {
          accessor: 'date',
          width: '125px',
          filter: hideDateFilter ? undefined : () => <DateRangePicker />,
          filtering: !hideDateFilter,
        },
        {
          accessor: 'description',
          ellipsis: true,
          cellsStyle: () => ({ maxWidth: '400px' }),
          filter: ({ close }) => (
            <TransactionTableDescriptionFilter
              descriptionFilter={descriptionFilter}
              setDescriptionFilter={setDescriptionFilter}
              close={close}
            />
          ),
          filtering: descriptionFilter !== '',
        },
        {
          accessor: 'comment',
          render: (record) => (
            <TransactionTableCommentBox
              transaction={record}
              updateTransaction={updateTransaction}
            />
          ),
          filter: ({ close }) => (
            <TransactionTableCommentFilter
              commentFilter={commentFilter}
              setCommentFilter={setCommentFilter}
              close={close}
            />
          ),
          filtering: commentFilter !== '',
        },
        {
          accessor: 'amount',
          render: (record) => (
            <Text size='sm' c={record.amount > 0 ? 'green' : 'red'}>
              {FormatMoney(record.amount)}
            </Text>
          ),
          filter: ({ close }) => (
            <TransactionTableAmountFilter
              amountFilter={amountFilter}
              setAmountFilter={setAmountFilter}
              close={close}
            />
          ),
          filtering:
            amountFilter[0] !== undefined || amountFilter[1] !== undefined,
        },
        {
          accessor: 'categoryId',
          title: 'Category',
          width: '350px',
          render: (record) => (
            <TransactionTableCategoryCombobox
              transaction={record}
              updateTransaction={updateTransaction}
            />
          ),
        },
      ]}
    />
  );
}
