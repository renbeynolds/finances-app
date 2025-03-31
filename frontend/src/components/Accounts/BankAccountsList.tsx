import { NavLink, useMantineTheme } from '@mantine/core';
import { IconTransactionDollar } from '@tabler/icons-react';
import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import useSWR from 'swr';
import {
  BankAccountsEndpoint,
  BankAccountsFetcher,
} from '../../data/BankAccounts/fetchers';
import { FormatMoney } from '../../utils';

export default function BankAccountsList() {
  const { data, error, isLoading } = useSWR(
    BankAccountsEndpoint,
    BankAccountsFetcher,
  );

  const [expanded, setExpanded] = React.useState(true);

  const theme = useMantineTheme();
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (location.pathname === '/accounts' && data?.data.length) {
      navigate(`/accounts/bank/${data.data[0].id}`);
    }
  }, [data, navigate, location.pathname]);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <NavLink
      opened={expanded}
      onClick={() => setExpanded((e) => !e)}
      label='Bank Accounts'
      leftSection={<IconTransactionDollar size={16} stroke={1.5} />}
      childrenOffset={28}
    >
      {data!.data.map((account, index) => (
        <NavLink
          key={index}
          active={location.pathname === `/accounts/bank/${account.id}`}
          onClick={() => navigate(`/accounts/bank/${account.id}`)}
          label={account.name}
          description={FormatMoney(account.balance)}
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
