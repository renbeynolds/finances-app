import { Button, Stack, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import {
  requestCreateBankAccount,
  requestUpdateBankAccount,
} from '../../data/BankAccounts/requests';

export interface BankAccountFormValues {
  name: string;
  dateHeader: string;
  descriptionHeader: string;
  amountExpression: string;
  loginUrl: string;
}

type BankAccountFormProps = {
  bankAccount?: BankAccountFormValues & { id: number };
  close: () => void;
};

export default function BankAccountForm({
  bankAccount,
  close,
}: BankAccountFormProps) {
  const form = useForm<BankAccountFormValues>({
    initialValues: bankAccount,
    validate: {},
  });

  const handleSubmit = async (values: BankAccountFormValues) => {
    if (!bankAccount) {
      const response = await requestCreateBankAccount(values);
      if (response.code === 200) {
        close();
      }
    } else {
      const response = await requestUpdateBankAccount(bankAccount.id, values);
      if (response.code === 200) {
        close();
      }
    }
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <Stack>
        <TextInput
          {...form.getInputProps('name')}
          placeholder='Name'
          label='Name'
        />
        <TextInput
          {...form.getInputProps('dateHeader')}
          placeholder='Date Header'
          label='Date Header'
        />
        <TextInput
          {...form.getInputProps('descriptionHeader')}
          placeholder='Description Header'
          label='Description Header'
        />
        <TextInput
          {...form.getInputProps('amountExpression')}
          placeholder='Amount Expression'
          label='Amount Expression'
        />
        <TextInput
          {...form.getInputProps('loginUrl')}
          placeholder='Login URL'
          label='Login URL'
        />
        <Button type='submit' loading={form.submitting}>
          Submit
        </Button>
      </Stack>
    </form>
  );
}
