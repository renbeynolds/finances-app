import { Button, Modal, NavLink, Stack, useMantineTheme } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import useSWR from 'swr';
import { AccountsEndpoint, AccountsFetcher } from '../Fetchers';
import { FormatMoney } from '../utils';
import AccountForm from './AccountForm';

export default function AccountsList() {
  const { data, error, isLoading } = useSWR(AccountsEndpoint, AccountsFetcher);
  const theme = useMantineTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [accountModalOpened, setAccountModalOpened] = React.useState(false);

  React.useEffect(() => {
    if (location.pathname === '/accounts' && data?.data.length) {
      navigate(`/accounts/${data.data[0].id}`);
    }
  }, [data, navigate, location.pathname]);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <>
      <Stack align='stretch' justify='space-between' gap='md' h='100%'>
        <Stack align='stretch' justify='flex-start' gap='md'>
          {data!.data.map((account, index) => (
            <NavLink
              key={index}
              active={location.pathname === `/accounts/${account.id}`}
              onClick={() => navigate(`/accounts/${account.id}`)}
              label={account.name}
              description={FormatMoney(account.balance)}
              styles={{
                description: {
                  color:
                    account.balance > 0
                      ? theme.colors.green[6]
                      : theme.colors.red[6],
                },
              }}
            />
          ))}
        </Stack>
        <Button
          variant='filled'
          leftSection={<IconPlus size={14} />}
          onClick={() => setAccountModalOpened(true)}
        >
          New Account
        </Button>
      </Stack>
      <Modal
        opened={accountModalOpened}
        onClose={() => setAccountModalOpened(false)}
        title='Edit Account'
      >
        <AccountForm />
      </Modal>
    </>
  );
}
