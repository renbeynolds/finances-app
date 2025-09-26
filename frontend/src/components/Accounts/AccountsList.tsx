import { Button, Modal, Stack } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import React from 'react';
import BankAccountsList from './BankAccountsList';
import CreateAccountForm from './CreateAccountForm';
import InvestmentAccountsList from './InvestmentAccountsList';

export default function AccountsList() {
  const [accountModalOpened, setAccountModalOpened] = React.useState(false);

  return (
    <>
      <Stack align='stretch' justify='space-between' gap='md' h='100%'>
        <Stack
          align='stretch'
          justify='flex-start'
          gap='md'
          style={{ overflowY: 'auto', flexGrow: 1 }}
        >
          <BankAccountsList />
          <InvestmentAccountsList />
        </Stack>
        <Button
          variant='filled'
          mih={36}
          leftSection={<IconPlus size={14} />}
          onClick={() => setAccountModalOpened(true)}
        >
          New Account
        </Button>
      </Stack>
      <Modal
        opened={accountModalOpened}
        onClose={() => setAccountModalOpened(false)}
        title='New Account'
      >
        <CreateAccountForm close={() => setAccountModalOpened(false)} />
      </Modal>
    </>
  );
}
