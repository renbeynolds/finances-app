import { FileAddOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { requestFetchAccounts } from '../../Redux/Accounts/actions';
import { selectAccountsArray } from '../../Redux/Accounts/selectors';
import { CreateUploadForm } from '../CreateUploadForm';
import './styles.scss';

function AccountTable() {

  const dispatch = useDispatch();
  const history = useHistory();
  const accounts = useSelector(selectAccountsArray);
  const [createUploadFormVisible, setCreateUploadFormVisible] = useState(false);

  useEffect(() => {
    dispatch(requestFetchAccounts());
  }, [dispatch]);

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
            onClick={() => setCreateUploadFormVisible(true)}
          >Upload Transactions</Button>
          <CreateUploadForm
            isVisible={createUploadFormVisible}
            accountId={id}
            onCancel={() => setCreateUploadFormVisible(false)}
            onOk={() => setCreateUploadFormVisible(false)}
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