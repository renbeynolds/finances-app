import { Button, NumberInput, Stack } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { requestRecordInvestmentAccountBalance } from '../../data/InvestmentAccounts/requests';

export interface InvestmentAccountBalanceFormValues {
  balance: number;
  date: Date | null;
}

type InvestmentAccountBalanceFormProps = {
  investmentAccountId: number;
  close: () => void;
};

export default function InvestmentAccountBalanceForm({
  investmentAccountId,
  close,
}: InvestmentAccountBalanceFormProps) {
  const form = useForm<InvestmentAccountBalanceFormValues>({
    initialValues: {
      balance: 0.0,
      date: new Date(),
    },
    validate: {},
  });

  const handleSubmit = async (values: InvestmentAccountBalanceFormValues) => {
    requestRecordInvestmentAccountBalance(investmentAccountId, values);
    close();
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <Stack>
        <DatePickerInput
          {...form.getInputProps('date')}
          placeholder='Select Date'
          maxDate={new Date()}
        />
        <NumberInput
          {...form.getInputProps('balance')}
          placeholder='Balance'
          label='Balance'
          decimalScale={2}
          fixedDecimalScale
          prefix='$'
        />
        <Button type='submit' loading={form.submitting}>
          Submit
        </Button>
      </Stack>
    </form>
  );
}
