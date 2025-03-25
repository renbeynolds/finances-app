import { Button, Stack, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

interface AccountFormValues {
  name: string;
}

export default function AccountForm() {
  const form = useForm<AccountFormValues>({
    initialValues: {
      name: '',
    },
    validate: {},
  });

  const handleSubmit = async (values: AccountFormValues) => {
    console.log(values);
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <Stack>
        <TextInput
          {...form.getInputProps('name')}
          placeholder='Name'
          label='Name'
        />
        <Button type='submit' loading={form.submitting}>
          Submit
        </Button>
      </Stack>
    </form>
  );
}
