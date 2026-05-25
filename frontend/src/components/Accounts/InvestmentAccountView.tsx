import {
  ActionIcon,
  Badge,
  Button,
  Group,
  Modal,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconEdit, IconNote } from "@tabler/icons-react";
import dayjs from "dayjs";
import React from "react";
import { useParams } from "react-router";
import useSWR from "swr";
import {
  InvestmentAccountEndpoint,
  InvestmentAccountFetcher,
} from "../../data/InvestmentAccounts/fetchers";
import {
  AmountOverTimeFetcher,
  InvestmentAccountBalanceOverTimeEndpoint,
} from "../../Fetchers";
import { FormatMoney } from "../../utils";
import AmountOverTimeChart from "../AmountOverTimeChart";
import FutureValueChart from "./FutureValueChart";
import InvestmentAccountBalanceForm from "./InvestmentAccountBalanceForm";
import InvestmentAccountForm from "./InvestmentAccountForm";

export default function InvestmentAccountView() {
  const { accountId } = useParams();
  const [recordBalanceModalOpened, setRecordBalanceModalOpened] =
    React.useState(false);
  const [editModalOpened, setEditModalOpened] = React.useState(false);

  const {
    data: accountData,
    error: accountError,
    isLoading: accountIsLoading,
  } = useSWR(InvestmentAccountEndpoint(accountId!), InvestmentAccountFetcher);

  const balanceOverTimeResponse = useSWR(
    InvestmentAccountBalanceOverTimeEndpoint(
      accountId!,
      dayjs().subtract(365, "day").format("YYYY-MM-DD"),
      dayjs().format("YYYY-MM-DD"),
    ),
    AmountOverTimeFetcher,
  );

  if (accountError) return <div>failed to load</div>;
  if (accountIsLoading) return <div>loading...</div>;

  const account = accountData!.data;

  return (
    <>
      <Stack>
        <Group justify="space-between">
          <Stack gap={4}>
            <Group>
              <Title order={2}>{account.name}</Title>
              <ActionIcon
                size="m"
                variant="outline"
                onClick={() => setEditModalOpened(true)}
              >
                <IconEdit style={{ width: "70%" }} />
              </ActionIcon>
            </Group>
            <Group gap="xs">
              <Badge
                color={account.includeInRetirement ? "teal" : "gray"}
                variant="light"
              >
                {account.includeInRetirement
                  ? "Included in Retirement"
                  : "Excluded from Retirement"}
              </Badge>
              <Badge color="blue" variant="light">
                {account.accountType === "PRE_TAX"
                  ? "Pre-Tax"
                  : account.accountType === "ROTH"
                    ? "Roth"
                    : "Taxable"}
              </Badge>
              <Text size="sm" c="dimmed">
                Contribution:{" "}
                <Text span fw={500} c="inherit">
                  {FormatMoney(account.annualContribution)}/yr
                </Text>
              </Text>
              <Text size="sm" c="dimmed">
                Expected Return:{" "}
                <Text span fw={500} c="inherit">
                  {(account.expectedAnnualReturn * 100).toFixed(2)}%
                </Text>
              </Text>
              <Text size="sm" c="dimmed">
                Volatility:{" "}
                <Text span fw={500} c="inherit">
                  {(account.annualVolatility * 100).toFixed(2)}%
                </Text>
              </Text>
            </Group>
          </Stack>
          <Button
            rightSection={<IconNote />}
            onClick={() => setRecordBalanceModalOpened(true)}
          >
            Record Balance
          </Button>
        </Group>
        <SimpleGrid cols={2}>
          <AmountOverTimeChart
            response={balanceOverTimeResponse}
            title="Balance"
          />
          <FutureValueChart
            currentBalance={account.balance}
            annualContribution={account.annualContribution}
            expectedAnnualReturn={account.expectedAnnualReturn}
            annualVolatility={account.annualVolatility}
          />
        </SimpleGrid>
      </Stack>
      <Modal
        opened={recordBalanceModalOpened}
        onClose={() => setRecordBalanceModalOpened(false)}
        title="Record Balance"
      >
        <InvestmentAccountBalanceForm
          investmentAccountId={Number(accountId)}
          close={() => setRecordBalanceModalOpened(false)}
        />
      </Modal>
      <Modal
        opened={editModalOpened}
        onClose={() => setEditModalOpened(false)}
        title="Edit Account"
      >
        <InvestmentAccountForm
          investmentAccount={account}
          close={() => setEditModalOpened(false)}
        />
      </Modal>
    </>
  );
}
