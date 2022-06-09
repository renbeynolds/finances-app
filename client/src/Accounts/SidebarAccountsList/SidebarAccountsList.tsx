import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { makeStyles } from '@material-ui/styles';
import accounting from 'accounting';
import { Button, List, Tooltip, Typography } from 'antd';
import cx from 'classnames';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValueLoadable } from 'recoil';
import { accountsState } from '../AccountsState';

const { Text } = Typography;

const useStyles = makeStyles(() => ({
  listItem: {
    '&:hover': {
      backgroundColor: '#303030',
      cursor: 'pointer',
    },
  },
  listItemSelected: {
    backgroundColor: '#303030',
  },
}));

const SidebarAccountsList = (): JSX.Element => {
  const accounts = useRecoilValueLoadable(accountsState);
  const navigate = useNavigate();
  const location = useLocation();
  const classes = useStyles();

  const onAddAccountClick = () => {
    navigate('/accounts/new');
  };

  const onUploadTransactionsClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    accountId: number
  ) => {
    event.stopPropagation();
    navigate(`accounts/${accountId}/upload`);
  };

  const onSelectAccount = (accountId: number) => {
    navigate(`/accounts/${accountId}`);
  };

  if (accounts.state !== 'hasValue') {
    return <div></div>;
  }

  return (
    <div>
      <List
        size='small'
        dataSource={accounts.contents}
        renderItem={(account) => (
          <List.Item
            className={cx(classes.listItem, {
              [classes.listItemSelected]:
                location.pathname === `/accounts/${account.id}`,
            })}
            onClick={() => onSelectAccount(account.id)}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <Text>{account.name}</Text>
              <div>
                <Text
                  type={
                    account.balance > 0
                      ? 'success'
                      : account.balance < 0
                      ? 'danger'
                      : undefined
                  }
                  style={{
                    paddingRight: '16px',
                  }}
                >
                  {accounting.formatMoney(account.balance)}
                </Text>
                <Tooltip title='Upload Transactions' placement='right'>
                  <Button
                    type='primary'
                    ghost
                    shape='circle'
                    icon={<UploadOutlined />}
                    size='small'
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                      onUploadTransactionsClick(event, account.id)
                    }
                  />
                </Tooltip>
              </div>
            </div>
          </List.Item>
        )}
      />
      <Button
        style={{ marginLeft: '16px', marginTop: '8px' }}
        size='small'
        icon={<PlusOutlined />}
        onClick={onAddAccountClick}
      >
        Add Account
      </Button>
    </div>
  );
};

export default SidebarAccountsList;
