import { Button, Group, Modal, Stack, Title } from '@mantine/core';
import { IconUpload } from '@tabler/icons-react';
import React from 'react';
import { useParams } from 'react-router';
import useSWR from 'swr';
import { AccountFetcher, AccountsEndpoint } from '../Fetchers';
import DateRangePicker from './DateRangePicker';
import TransactionTable from './TransactionTable';
import UploadForm from './UploadForm';

export default function AccountView() {
  const { accountId } = useParams();
  const [uploadModalOpened, setUploadModalOpened] = React.useState(false);

  const { data, error, isLoading } = useSWR(
    `${AccountsEndpoint}/${accountId}`,
    AccountFetcher,
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <>
      <Stack>
        <Group justify='space-between'>
          <Group>
            <Title order={2}>{data?.data.name}</Title>
            <DateRangePicker />
          </Group>
          <Button
            onClick={() => setUploadModalOpened(true)}
            rightSection={<IconUpload />}
          >
            Upload Transactions
          </Button>
        </Group>
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
