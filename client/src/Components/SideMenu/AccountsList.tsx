import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import accounting from 'accounting';
import { Button, List, Tooltip, Typography } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { accountsState } from '../../State/AccountsState';

const { Text } = Typography;

const AccountsList = (): JSX.Element => {
  const accounts = useRecoilValue(accountsState);
  const navigate = useNavigate();

  const onAddAccountClick = () => {
    navigate('/accounts/new');
  };

  const onUploadTransactionsClick = (accountId: number) => {
    navigate(`accounts/${accountId}/upload`);
  };

  return (
    <>
      <List
        size='small'
        dataSource={accounts}
        renderItem={(account) => (
          <List.Item>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <Tooltip title='Upload Transactions' placement='right'>
                <Button
                  type='primary'
                  ghost
                  shape='circle'
                  icon={<UploadOutlined />}
                  size='small'
                  onClick={() => onUploadTransactionsClick(account.id)}
                />
              </Tooltip>
              <Text>{account.name}</Text>
              <Text
                type={
                  account.balance > 0
                    ? 'success'
                    : account.balance < 0
                    ? 'danger'
                    : undefined
                }
              >
                {accounting.formatMoney(account.balance)}
              </Text>
            </div>
          </List.Item>
        )}
      />
      <Button
        style={{ marginLeft: '16px', marginTop: '8px' }}
        type='ghost'
        size='small'
        icon={<PlusOutlined />}
        onClick={onAddAccountClick}
      >
        Add Account
      </Button>
    </>
  );
};

export default AccountsList;
