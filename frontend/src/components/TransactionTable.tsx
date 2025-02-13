import { ActionIcon, Text, TextInput } from '@mantine/core';
import { IconSearch, IconX } from '@tabler/icons-react';
import { DataTable } from 'mantine-datatable';
import * as React from 'react';
import useSWR from 'swr';
import { DateFilterContext } from '../context/DateFilterContext';
import { TransactionsEndpoint, TransactionsFetcher } from '../Fetchers';
import { FormatMoney } from '../utils';

const pageSize = 10;

export default function TransactionTable() {
  const [page, setPage] = React.useState(1);
  const [descriptionSearch, setDescriptionSearch] = React.useState('');
  const [descriptionFilter, setDescriptionFilter] = React.useState('');
  const dateFilter = React.useContext(DateFilterContext);

  React.useEffect(() => {
    setPage(1);
  }, [setPage, descriptionFilter, dateFilter]);

  const { data, error, isLoading } = useSWR(
    `${TransactionsEndpoint}?page=${page}&limit=${pageSize}&from=${dateFilter[0]}&to=${dateFilter[1]}&description=${descriptionFilter}`,
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
