import {
  ActionIcon,
  Anchor,
  Button,
  Group,
  Modal,
  SimpleGrid,
  Stack,
  Title,
} from '@mantine/core';
import { IconEdit, IconUpload } from '@tabler/icons-react';
import dayjs from 'dayjs';
import React from 'react';
import { useParams } from 'react-router';
import useSWR from 'swr';
import {
  AccountBalanceOverTimeEndpoint,
  AccountFetcher,
  AccountsEndpoint,
  AmountOverTimeFetcher,
} from '../../Fetchers';
import AmountOverTimeChart from '../AmountOverTimeChart';
import ConditionalWrap from '../ConditionalWrap';
import TransactionTable from '../TransactionTable';
import UploadForm from '../UploadForm';
import BankAccountForm from './BankAccountForm';

export default function BankAccountView() {
  const { accountId } = useParams();
  const [uploadModalOpened, setUploadModalOpened] = React.useState(false);
  const [editModalOpened, setEditModalOpened] = React.useState(false);

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
            <ConditionalWrap
              condition={accountData?.data.loginUrl !== ''}
              wrap={(wrappedChildren) => (
                <Anchor href={accountData?.data.loginUrl} target='_blank'>
                  {wrappedChildren}
                </Anchor>
              )}
            >
              <Title order={2}>{accountData?.data.name}</Title>
            </ConditionalWrap>
            <ActionIcon
              size='m'
              variant='outline'
              onClick={() => setEditModalOpened(true)}
            >
              <IconEdit style={{ width: '70%' }} />
            </ActionIcon>
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
      <Modal
        opened={editModalOpened}
        onClose={() => setEditModalOpened(false)}
        title='Edit Account'
      >
        <BankAccountForm
          bankAccount={accountData!.data}
          close={() => setEditModalOpened(false)}
        />
      </Modal>
    </>
  );
}
