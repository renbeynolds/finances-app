import { FileAddOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Table } from 'antd';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { requestFetchAccounts } from '../../Redux/Accounts/actions';
import { selectAccountsArray } from '../../Redux/Accounts/selectors';
import { setTransactionUploadFilter } from '../../Redux/Filters/reducer';
import { requestCreateUpload } from '../../Redux/Uploads/actions';
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

  const handleUploadedFile = async(event, accountId) => {
    const file = event.target.files[0];
    const request = await dispatch(requestCreateUpload({ accountId: accountId, file: file }));
    dispatch(setTransactionUploadFilter(request.payload.id));
    history.push('/transactions/table');
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