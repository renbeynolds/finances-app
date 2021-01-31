import { Button, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setRecurrenceIdFilter } from '../../Redux/Filters/reducer';
import { requestFetchRecurringTransactions, requestLinkRecurringTransactions, requestSuppressRecurringTransactions } from '../../Redux/RecurringTransactions/actions';
import { TransactionTable } from '../TransactionTable';

function RecurringTransactionTable() {

  const dispatch = useDispatch();

  const [recurring, setRecurring] = useState([]);
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  const fetchData = async () => {
    const response = await dispatch(requestFetchRecurringTransactions());
    setRecurring(response.payload);
  };

  const onExpandRow = (expanded, record) => {
    if (expanded) {
      setExpandedRowKeys([record.recurrenceId]);
    } else {
      setExpandedRowKeys([]);
    }
    dispatch(setRecurrenceIdFilter(record.recurrenceId));
  };

  const onSuppress = async () => {
    const response = await dispatch(requestSuppressRecurringTransactions(selectedRowKeys));
    setSelectedRowKeys([]);
    setRecurring(recurring.filter(r => !response.payload.includes(r.recurrenceId)));
  };

  const onLink = () => {
    dispatch(requestLinkRecurringTransactions(selectedRowKeys));
    setSelectedRowKeys([]);
    fetchData();
  };

  const columns = [
    {
      title: 'Description',
      dataIndex: 'description'
    }
  ];

  return (
    <Space direction='vertical' size={10} style={{ width: '100%' }}>
      <Space direction='horizontal' size={10}>
        <Button onClick={onSuppress} type='primary' disabled={selectedRowKeys.length < 1}>
          Suppress
        </Button>
        <Button onClick={onLink} type='primary' disabled={selectedRowKeys.length < 2}>
          Link
        </Button>
      </Space>
      <Table
        columns={columns}
        dataSource={recurring}
        rowKey='recurrenceId'
        expandable={{
          expandedRowKeys,
          onExpand: onExpandRow,
          rowExpandable: () => true,
          expandedRowRender: record => (
            <TransactionTable
              size='small'
              hideColumns={['Balance', 'Correction', 'Tags']}
            />
          )
        }}
        rowSelection={{
          hideSelectAll: true,
          selectedRowKeys,
          onChange: (selectedRowKeys, selectedRows) => setSelectedRowKeys(selectedRowKeys)
        }}
      />
    </Space>
  );
}

export default RecurringTransactionTable;