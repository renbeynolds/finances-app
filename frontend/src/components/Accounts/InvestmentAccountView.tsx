import { Button, Group, Modal, Title } from '@mantine/core';
import { IconNote } from '@tabler/icons-react';
import React from 'react';
import { useParams } from 'react-router';
import useSWR from 'swr';
import {
  InvestmentAccountEndpoint,
  InvestmentAccountFetcher,
} from '../../data/InvestmentAccounts/fetchers';
import InvestmentAccountBalanceForm from './InvestmentAccountBalanceForm';

export default function InvestmentAccountView() {
  const { accountId } = useParams();
  const [recordBalanceModalOpened, setRecordBalanceModalOpened] =
    React.useState(false);

  const {
    data: accountData,
    error: accountError,
    isLoading: accountIsLoading,
  } = useSWR(InvestmentAccountEndpoint(accountId!), InvestmentAccountFetcher);

  if (accountError) return <div>failed to load</div>;
  if (accountIsLoading) return <div>loading...</div>;

  return (
    <>
      <Group justify='space-between'>
        <Title order={2}>{accountData?.data.name}</Title>
        <Button
          rightSection={<IconNote />}
          onClick={() => setRecordBalanceModalOpened(true)}
        >
          Record Balance
        </Button>
      </Group>
      <Modal
        opened={recordBalanceModalOpened}
        onClose={() => setRecordBalanceModalOpened(false)}
        title='Record Balance'
      >
        <InvestmentAccountBalanceForm
          investmentAccountId={Number(accountId)}
          close={() => setRecordBalanceModalOpened(false)}
        />
      </Modal>
    </>
  );
}
