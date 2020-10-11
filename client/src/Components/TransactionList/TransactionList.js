import { Table, Tag } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestFetchTransactions } from '../../Redux/Transactions/actions';
import { selectTransactionsArray } from '../../Redux/Transactions/selectors';
import './styles.scss';

function TransactionList() {

  const dispatch = useDispatch();
  const transactions = useSelector(selectTransactionsArray);

  useEffect(() => {
    dispatch(requestFetchTransactions());
  }, [dispatch]);

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      className: 'TransactionList__amount'
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: tags => ( // eslint-disable-line react/display-name
        <>
          {tags.map(tag => {
            return (
              <Tag color={tag.color} key={tag.id}>
                {tag.name.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    }
  ];

  return (
    <Table
      columns={columns}
      dataSource={transactions}
      rowClassName={(record, index) => { // eslint-disable-line no-unused-vars
        if (record.amount < 0) { return 'TransactionList__expense'; } else { return 'TransactionList__allowance'; }
      }}
    />
  );
}

export default TransactionList;