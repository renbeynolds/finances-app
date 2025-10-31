import { Button, Group, Modal, SimpleGrid, Stack, Title } from "@mantine/core";
import { IconNote } from "@tabler/icons-react";
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
import AmountOverTimeChart from "../AmountOverTimeChart";
import InvestmentAccountBalanceForm from "./InvestmentAccountBalanceForm";

export default function InvestmentAccountView() {
  const { accountId } = useParams();
  const [recordBalanceModalOpened, setRecordBalanceModalOpened] =
    React.useState(false);

  const {
    data: accountData,
    error: accountError,
    isLoading: accountIsLoading,
  } = useSWR(InvestmentAccountEndpoint(accountId!), InvestmentAccountFetcher);

  const balanceOverTimeResponse = useSWR(
    InvestmentAccountBalanceOverTimeEndpoint(
      accountId!,
      dayjs().subtract(365, "day").format("YYYY-MM-DD"),
      dayjs().format("YYYY-MM-DD")
    ),
    AmountOverTimeFetcher
  );

  if (accountError) return <div>failed to load</div>;
  if (accountIsLoading) return <div>loading...</div>;

  return (
    <>
      <Stack>
        <Group justify="space-between">
          <Title order={2}>{accountData?.data.name}</Title>
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
    </>
  );
}
