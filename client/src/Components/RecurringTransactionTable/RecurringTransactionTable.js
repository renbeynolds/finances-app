import { Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setDescriptionFilter } from '../../Redux/Filters/reducer';
import { requestFetchRecurringTransactions } from '../../Redux/RecurringTransactions/actions';
import { TransactionTable } from '../TransactionTable';

function RecurringTransactionTable() {

  const dispatch = useDispatch();

  const [recurring, setRecurring] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await dispatch(requestFetchRecurringTransactions());
      setRecurring(response.payload);
    }
    fetchData();
  }, [dispatch]);

  const onExpandRow = (expanded, record) => {
    dispatch(setDescriptionFilter(record.description));
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