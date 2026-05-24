import { Button, NumberInput, Select, Stack, Switch, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  requestCreateInvestmentAccount,
  requestUpdateInvestmentAccount,
} from "../../data/InvestmentAccounts/requests";

export interface InvestmentAccountFormValues {
  name: string;
  includeInRetirement: boolean;
  annualContribution: number; // in dollars (UI), converted to cents on submit
  expectedAnnualReturn: number; // as percentage (UI), e.g. 7 means 7%
  accountType: string;
}

type InvestmentAccountFormProps = {
  investmentAccount?: {
    id: number;
    name: string;
    includeInRetirement: boolean;
    annualContribution: number; // cents from API
    expectedAnnualReturn: number; // fraction from API (e.g. 0.07)
    accountType: string;
  };
  close: () => void;
};

export default function InvestmentAccountForm({
  investmentAccount,
  close,
}: InvestmentAccountFormProps) {
  const form = useForm<InvestmentAccountFormValues>({
    initialValues: investmentAccount
      ? {
          name: investmentAccount.name,
          includeInRetirement: investmentAccount.includeInRetirement,
          annualContribution: investmentAccount.annualContribution / 100,
          expectedAnnualReturn: investmentAccount.expectedAnnualReturn * 100,
          accountType: investmentAccount.accountType || "TAXABLE",
        }
      : {
          name: "",
          includeInRetirement: false,
          annualContribution: 0,
          expectedAnnualReturn: 0,
          accountType: "TAXABLE",
        },
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
        <Select
          {...form.getInputProps("accountType")}
          label="Account Type"
          data={[
            { value: "TAXABLE", label: "Taxable" },
            { value: "PRE_TAX", label: "Pre-Tax" },
            { value: "ROTH", label: "Roth" },
          ]}
        />
        <Switch
          {...form.getInputProps("includeInRetirement", { type: "checkbox" })}
          label="Include in retirement projections"
        />
        <NumberInput
          {...form.getInputProps("annualContribution")}
          label="Annual Contribution"
          placeholder="0"
          decimalScale={2}
          fixedDecimalScale
          prefix="$"
          hideControls
        />
        <NumberInput
          {...form.getInputProps("expectedAnnualReturn")}
          label="Expected Annual Return"
          placeholder="0"
          decimalScale={2}
          fixedDecimalScale
          suffix="%"
          hideControls
          min={0}
          max={100}
        />
        <Button type="submit" loading={form.submitting}>
          Submit
        </Button>
      </Stack>
    </form>
  );
}
