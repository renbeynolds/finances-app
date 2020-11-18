import { EditOutlined, FileAddOutlined, PlusCircleOutlined } from '@ant-design/icons';
import accounting from 'accounting-js';
import { Button, Table } from 'antd';
import cx from 'classnames';
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
      title: 'Balance',
      dataIndex: 'balance',
      className: 'AccountTable__balance',
      render: (text) => accounting.formatMoney(text)
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
    },
    {
      title: 'Edit',
      dataIndex: 'id',
      render: (id) => (
        <Button
          type='primary' shape='circle'
          icon={<EditOutlined />} size='default'
          onClick={() => history.push(`/accounts/edit/${id}`)}
          className='TagTable__edit-button'
        />
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
        rowClassName={(record) => cx({
          'AccountTable__positive-balance': record.balance > 0,
          'AccountTable__negative-balance': record.balance < 0
        })}
      />
    </>
  );
}

export default AccountTable;