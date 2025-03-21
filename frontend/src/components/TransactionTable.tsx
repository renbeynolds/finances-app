import { Text } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import * as React from 'react';
import useSWR from 'swr';
import {
  TransactionFiltersContext,
  TransactionFiltersDispatchContext,
} from '../context/TransactionFiltersContext';
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
  const transactionFilters = React.useContext(TransactionFiltersContext);
  const dispatchTransactionFilters = React.useContext(
    TransactionFiltersDispatchContext,
  );
  const [page, setPage] = React.useState(1);
  const [response, setResponse] = React.useState<Response<Transaction[]>>();

  React.useEffect(() => {
    setPage(1);
  }, [setPage, accountId, transactionFilters]);

  const { data, error, isLoading, mutate } = useSWR(
    `${TransactionsEndpoint}?page=${page}&limit=${pageSize}` +
      `&from=${transactionFilters.Date[0]}&to=${transactionFilters.Date[1]}` +
      `&description=${transactionFilters.Description}` +
      `&min=${transactionFilters.Amount[0] !== undefined ? transactionFilters.Amount[0] : ''}&max=${transactionFilters.Amount[1] !== undefined ? transactionFilters.Amount[1] : ''}` +
      `&comment=${transactionFilters.Comment}` +
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
              descriptionFilter={transactionFilters.Description}
              dispatchTransactionFilters={dispatchTransactionFilters}
              close={close}
            />
          ),
          filtering: transactionFilters.Description !== '',
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
              commentFilter={transactionFilters.Comment}
              dispatchTransactionFilters={dispatchTransactionFilters}
              close={close}
            />
          ),
          filtering: transactionFilters.Comment !== '',
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
              amountFilter={transactionFilters.Amount}
              dispatchTransactionFilters={dispatchTransactionFilters}
              close={close}
            />
          ),
          filtering:
            transactionFilters.Amount[0] !== undefined ||
            transactionFilters.Amount[1] !== undefined,
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
