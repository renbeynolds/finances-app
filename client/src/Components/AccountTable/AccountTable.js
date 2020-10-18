import { FileAddOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Table } from 'antd';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { requestFetchAccounts } from '../../Redux/Accounts/actions';
import { selectAccountsArray } from '../../Redux/Accounts/selectors';
import { requestUploadTransactions } from '../../Redux/Transactions/actions';
import './styles.scss';

function AccountTable() {

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

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name'
    },
    {
      dataIndex: 'id',
      render: (id) => (
        <>
          <Button
            type='primary' shape='round'
            icon={<FileAddOutlined />} size='default'
            onClick={onFileUploadClick}
          >Upload Transactions</Button>
          <input
            type='file'
            ref={fileInputRef}
            onChange={(e) => handleUploadedFile(e, id)}
            style={{ display: 'none' }}
          />
        </>
      )
    }
  ];

  return (
    <>
      <Button
        type='primary' shape='round'
        icon={<PlusCircleOutlined />} size='default'
        onClick={() => history.push('/accounts/create')}
        className='AccountTable__create-button'
      >Add Account</Button>
      <Table
        columns={columns}
        dataSource={accounts}
        rowKey='id'
      />
    </>
  );
}

export default AccountTable;