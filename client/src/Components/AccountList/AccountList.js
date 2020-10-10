import { FileAddOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, List } from 'antd';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { requestFetchAccounts } from '../../Redux/Accounts/actions';
import { selectAccountsArray } from '../../Redux/Accounts/selectors';
import { requestUploadTransactions } from '../../Redux/Transactions/actions';
import './styles.scss';

function AccountList() {

  const dispatch = useDispatch();
  const history = useHistory();
  const accounts = useSelector(selectAccountsArray);
  const fileInputRef = useRef();

  useEffect(() => {
    dispatch(requestFetchAccounts());
  }, [dispatch]);

  const onFileUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleUploadedFile = (event, accountId) => {
    const file = event.target.files[0];
    dispatch(requestUploadTransactions({ accountId: accountId, file: file }));
    history.push('/transactions');
  };

  return (
    <List
      header={
        <Button
          type='primary' shape='round'
          icon={<PlusCircleOutlined />} size='default'
          onClick={() => history.push('/accounts/create')}
        >Add Account</Button>
      }
      bordered
      dataSource={accounts}
      renderItem={item => (
        <List.Item>
          <div className='AccountList__list-item-content'>
            <div className='AccountList__account-name'>{item.name}</div>
            <Button
              type='primary' shape='round'
              icon={<FileAddOutlined />} size='default'
              onClick={onFileUploadClick}
            >Upload Transactions</Button>
            <input
              type='file'
              ref={fileInputRef}
              onChange={(e) => handleUploadedFile(e, item.id)}
              style={{ display: 'none' }}
            />
          </div>
        </List.Item>
      )}
    />
  );
}

export default AccountList;