import { Button, Group, Modal, SimpleGrid, Stack, Title } from '@mantine/core';
import { IconUpload } from '@tabler/icons-react';
import dayjs from 'dayjs';
import React from 'react';
import { useParams } from 'react-router';
import useSWR from 'swr';
import {
  AccountBalanceOverTimeEndpoint,
  AccountFetcher,
  AccountsEndpoint,
  AmountOverTimeFetcher,
} from '../Fetchers';
import AmountOverTimeChart from './AmountOverTimeChart';
import DateRangePicker from './DateRangePicker';
import TransactionTable from './TransactionTable';
import UploadForm from './UploadForm';

export default function AccountView() {
  const { accountId } = useParams();
  const [uploadModalOpened, setUploadModalOpened] = React.useState(false);

  const {
    data: accountData,
    error: accountError,
    isLoading: accountIsLoading,
  } = useSWR(`${AccountsEndpoint}/${accountId}`, AccountFetcher);

  const balanceOverTimeResponse = useSWR(
    AccountBalanceOverTimeEndpoint(
      accountId!,
      dayjs().subtract(365, 'day').format('YYYY-MM-DD'),
      dayjs().format('YYYY-MM-DD'),
    ),
    AmountOverTimeFetcher,
  );

  if (accountError) return <div>failed to load</div>;
  if (accountIsLoading) return <div>loading...</div>;

  return (
    <>
      <Stack>
        <Group justify='space-between'>
          <Group>
            <Title order={2}>{accountData?.data.name}</Title>
            <DateRangePicker />
          </Group>
          <Button
            onClick={() => setUploadModalOpened(true)}
            rightSection={<IconUpload />}
          >
            Upload Transactions
          </Button>
        </Group>
        <SimpleGrid cols={2}>
          <AmountOverTimeChart response={balanceOverTimeResponse} />
        </SimpleGrid>
        <TransactionTable accountId={accountId} />
      </Stack>
      <Modal
        opened={uploadModalOpened}
        onClose={() => setUploadModalOpened(false)}
        title='New Upload'
      >
        <UploadForm accountId={String(accountId)} />
      </Modal>
    </>
  );
}
