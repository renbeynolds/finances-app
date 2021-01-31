import { Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setRecurrenceIdFilter } from '../../Redux/Filters/reducer';
import { requestFetchRecurringTransactions } from '../../Redux/RecurringTransactions/actions';
import { TransactionTable } from '../TransactionTable';

function RecurringTransactionTable() {

  const dispatch = useDispatch();

  const [recurring, setRecurring] = useState(false);
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await dispatch(requestFetchRecurringTransactions());
      setRecurring(response.payload);
    }
    fetchData();
  }, [dispatch]);

  const onExpandRow = (expanded, record) => {
    if (expanded) {
      setExpandedRowKeys([record.description]);
    } else {
      setExpandedRowKeys([]);
    }
    dispatch(setRecurrenceIdFilter(record.recurrenceId));
  };

  const columns = [
    {
      title: 'Description',
      dataIndex: 'description'
    }
  ];

  return (
    <Table
      columns={columns}
      dataSource={recurring}
      rowKey='description'
      expandable={{
        expandedRowKeys: expandedRowKeys,
        onExpand: onExpandRow,
        rowExpandable: () => true,
        expandedRowRender: record => (
          <TransactionTable
            size='small'
            hideColumns={['Description', 'Balance', 'Correction', 'Tags']}
          />
        )
      }}
    />
  );
}

export default RecurringTransactionTable;