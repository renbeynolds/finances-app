import { Group, NavLink, useMantineTheme } from "@mantine/core";
import { IconTrendingUp } from "@tabler/icons-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React from "react";
import { useLocation, useNavigate } from "react-router";
import useSWR from "swr";
import {
  InvestmentAccountsEndpoint,
  InvestmentAccountsFetcher,
} from "../../data/InvestmentAccounts/fetchers";
import { FormatMoney } from "../../utils";

dayjs.extend(relativeTime);

export default function InvestmentAccountsList() {
  const { data, error, isLoading } = useSWR(
    InvestmentAccountsEndpoint,
    InvestmentAccountsFetcher,
  );

  const [expanded, setExpanded] = React.useState(true);

  const theme = useMantineTheme();
  const location = useLocation();
  const navigate = useNavigate();

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <NavLink
      opened={expanded}
      onClick={() => setExpanded((e) => !e)}
      label="Investment Accounts"
      leftSection={<IconTrendingUp size={16} stroke={1.5} />}
    >
      {data!.data
        .sort((a, b) => (a.name < b.name ? -1 : 1))
        .map((account, index) => (
          <NavLink
            key={index}
            label={account.name}
            active={location.pathname === `/accounts/investment/${account.id}`}
            onClick={() => navigate(`/accounts/investment/${account.id}`)}
            description={
              <Group justify="space-between" w="100%">
                <span>{FormatMoney(account.balance)}</span>
                <span style={{ color: theme.colors.gray[5] }}>
                  {dayjs(account.updatedAt).fromNow()}
                </span>
              </Group>
            }
            styles={{
              description: {
                color:
                  account.balance > 0
                    ? theme.colors.green[6]
                    : account.balance < 0
                      ? theme.colors.red[6]
                      : theme.colors.gray[5],
              },
            }}
          />
        ))}
    </NavLink>
  );
}
