import { ActionIcon, NumberInput, Stack, Text, TextInput } from '@mantine/core';
import { IconSearch, IconX } from '@tabler/icons-react';
import { DataTable } from 'mantine-datatable';
import * as React from 'react';
import useSWR from 'swr';
import { DateFilterContext } from '../context/DateFilterContext';
import { Response } from '../data/Response';
import { Transaction } from '../data/Transaction';
import { TransactionsEndpoint, TransactionsFetcher } from '../Fetchers';
import { requestUpdateTransaction } from '../Requests';
import { FormatMoney } from '../utils';
import CategoryCombobox from './CategoryComboBox';

const pageSize = 10;

export default function TransactionTable() {
  const [page, setPage] = React.useState(1);
  const [descriptionSearch, setDescriptionSearch] = React.useState('');
  const [descriptionFilter, setDescriptionFilter] = React.useState('');
  const [amountFilter, setAmountFilter] = React.useState<
    [number | undefined, number | undefined]
  >([undefined, undefined]);
  const dateFilter = React.useContext(DateFilterContext);
  const [response, setResponse] = React.useState<Response<Transaction[]>>();

  React.useEffect(() => {
    setPage(1);
  }, [setPage, descriptionFilter, dateFilter]);

  const { data, error, isLoading, mutate } = useSWR(
    `${TransactionsEndpoint}?page=${page}&limit=${pageSize}&from=${dateFilter[0]}&to=${dateFilter[1]}&description=${descriptionFilter}`,
    TransactionsFetcher
  );

  const updateTransaction = React.useCallback(
    async (transaction: Transaction) => {
      const updatedTransaction = await requestUpdateTransaction(transaction);
      mutate({
        ...data!,
        data: data!.data.map((t) =>
          t.id === updatedTransaction.id ? updatedTransaction : t
        ),
      });
    },
    [mutate, data]
  );

  React.useEffect(() => {
    if (!error && !isLoading && data) {
      setResponse(data);
    }
  }, [data, error, isLoading, setResponse]);

  if (!response) return <div>loading...</div>;
  if (error) return <div>failed to load</div>;

  console.log(amountFilter);

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
        { accessor: 'date', width: '125px' },
        {
          accessor: 'description',
          ellipsis: true,
          cellsStyle: () => ({ maxWidth: '400px' }),
          filter: ({ close }) => (
            <DescriptionFilterPopup
              setDescriptionFilter={setDescriptionFilter}
              descriptionSearch={descriptionSearch}
              setDescriptionSearch={setDescriptionSearch}
              close={close}
            />
          ),
          filtering: descriptionSearch !== '',
        },
        { accessor: 'comment' },
        {
          accessor: 'amount',
          render: (record) => (
            <Text size='sm' c={record.amount > 0 ? 'green' : 'red'}>
              {FormatMoney(record.amount)}
            </Text>
          ),
          filter: () => (
            <AmountFilterPopup
              amountFilter={amountFilter}
              setAmountFilter={setAmountFilter}
            />
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
        {
          accessor: 'categoryId',
          title: 'Category',
          width: '350px',
          render: (record) => (
            <CategoryCombobox
              transaction={record}
              updateTransaction={updateTransaction}
            />
          ),
        },
      ]}
    />
  );
}

type DescriptionFilterPopupProps = {
  setDescriptionFilter: (value: string) => void;
  descriptionSearch: string;
  setDescriptionSearch: (value: string) => void;
  close: () => void;
};

const DescriptionFilterPopup = ({
  setDescriptionFilter,
  descriptionSearch,
  setDescriptionSearch,
  close,
}: DescriptionFilterPopupProps) => {
  const enterFunction = React.useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        setDescriptionFilter(descriptionSearch);
        close();
      }
    },
    [close, setDescriptionFilter, descriptionSearch]
  );

  React.useEffect(() => {
    document.addEventListener('keypress', enterFunction);
    return () => {
      document.removeEventListener('keypress', enterFunction);
    };
  }, [enterFunction]);

  return (
    <TextInput
      label='Description'
      description='Fuzzy search'
      placeholder='Enter search string...'
      leftSection={<IconSearch size={16} />}
      rightSection={
        <ActionIcon
          size='sm'
          variant='transparent'
          c='dimmed'
          onClick={() => {
            setDescriptionSearch('');
            setDescriptionFilter('');
            close();
          }}
        >
          <IconX size={14} />
        </ActionIcon>
      }
      value={descriptionSearch}
      onBlur={(e) => setDescriptionFilter(e.currentTarget.value)}
      onChange={(e) => setDescriptionSearch(e.currentTarget.value)}
    />
  );
};

type AmountFilterPopupProps = {
  amountFilter: [number | undefined, number | undefined];
  setAmountFilter: (value: [number | undefined, number | undefined]) => void;
};

const AmountFilterPopup = ({
  amountFilter,
  setAmountFilter,
}: AmountFilterPopupProps) => {
  return (
    <Stack>
      <NumberInput
        label='Min'
        prefix='$'
        allowDecimal={false}
        placeholder='$0'
        value={amountFilter[0]}
        onChange={(value) => {
          const newFilterValue = value === '' ? undefined : Number(value);
          setAmountFilter([newFilterValue, amountFilter[1]]);
        }}
      />
      <NumberInput
        label='Max'
        prefix='$'
        allowDecimal={false}
        placeholder='$0'
        value={amountFilter[1]}
        onChange={(value) => {
          const newFilterValue = value === '' ? undefined : Number(value);
          setAmountFilter([amountFilter[0], newFilterValue]);
        }}
      />
    </Stack>
  );
};
