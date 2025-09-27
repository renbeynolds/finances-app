import { Divider, Select, Stack } from '@mantine/core';
import React from 'react';
import BankAccountForm from './BankAccountForm';
import InvestmentAccountForm from './InvestmentAccountForm';

type CreateAccountFormProps = {
  close: () => void;
};

export default function CreateAccountForm({ close }: CreateAccountFormProps) {
  const [accountType, setAccountType] = React.useState<string>('bank');
  return (
    <Stack>
      <Select
        label='Choose Account Type'
        placeholder='Choose Account Type'
        value={accountType}
        onChange={(value) => setAccountType(value!)}
        allowDeselect={false}
        data={[
          { value: 'bank', label: 'Bank Account' },
          { value: 'investment', label: 'Investment Account' },
        ]}
      />
      <Divider my='md' />
      {accountType === 'bank' && <BankAccountForm close={close} />}
      {accountType === 'investment' && <InvestmentAccountForm close={close} />}
    </Stack>
  );
}
