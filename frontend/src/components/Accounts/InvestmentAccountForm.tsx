import { Button, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  requestCreateInvestmentAccount,
  requestUpdateInvestmentAccount,
} from "../../data/InvestmentAccounts/requests";

export interface InvestmentAccountFormValues {
  name: string;
}

type InvestmentAccountFormProps = {
  investmentAccount?: InvestmentAccountFormValues & { id: number };
  close: () => void;
};

export default function InvestmentAccountForm({
  investmentAccount,
  close,
}: InvestmentAccountFormProps) {
  const form = useForm<InvestmentAccountFormValues>({
    initialValues: investmentAccount,
    validate: {},
  });

  const handleSubmit = async (values: InvestmentAccountFormValues) => {
    if (!investmentAccount) {
      const response = await requestCreateInvestmentAccount(values);
      if (response.success) {
        close();
      }
    } else {
      const response = await requestUpdateInvestmentAccount(
        investmentAccount.id,
        values,
      );
      console.log(response);
      if (response.success) {
        close();
      }
    }
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <Stack>
        <TextInput
          {...form.getInputProps("name")}
          placeholder="Name"
          label="Name"
        />
        <Button type="submit" loading={form.submitting}>
          Submit
        </Button>
      </Stack>
    </form>
  );
}
