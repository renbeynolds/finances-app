import { Button, Stack, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { requestCreateAccount, requestUpdateAccount } from '../Requests';

export interface AccountFormValues {
  name: string;
  dateHeader: string;
  dateFormat: string;
  descriptionHeader: string;
  amountExpression: string;
  loginUrl: string;
}

type AccountFormProps = {
  account?: AccountFormValues & { id: number };
  close: () => void;
};

export default function AccountForm({ account, close }: AccountFormProps) {
  const form = useForm<AccountFormValues>({
    initialValues: account,
    validate: {},
  });

  const handleSubmit = async (values: AccountFormValues) => {
    if (!account) {
      const response = await requestCreateAccount(values);
      if (response.code === 200) {
        close();
      }
    } else {
      const response = await requestUpdateAccount(account.id, values);
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
          {...form.getInputProps('dateFormat')}
          placeholder='Date Format'
          label='Date Format'
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
