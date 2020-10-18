import { Table, Tag } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectRequestStatus } from '../../Redux/Requests/selectors';
import { requestFetchTransactions } from '../../Redux/Transactions/actions';
import TransactionConstants from '../../Redux/Transactions/constants';
import { selectTransactionsArray } from '../../Redux/Transactions/selectors';
import './styles.scss';

const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_CURRENT_PAGE = 1;

function TransactionList() {

  const dispatch = useDispatch();
  const requestStatus = useSelector(state => selectRequestStatus(state, TransactionConstants.FETCH_TRANSACTIONS));
  const transactions = useSelector(selectTransactionsArray);

  useEffect(() => {
    dispatch(requestFetchTransactions({
      limit: DEFAULT_PAGE_SIZE,
      offset: DEFAULT_PAGE_SIZE * (DEFAULT_CURRENT_PAGE - 1)
    }));
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
      dataIndex: 'tags',
      render: tags => ( // eslint-disable-line react/display-name
        <>
          {tags.map(tag => {
            return (
              <Tag color={tag.color} key={tag.id}>
                {tag.name}
              </Tag>
            );
          })}
        </>
      ),
    }
  ];
  
  const handleTableChange = (pagination, filters, sorter) => {
    dispatch(requestFetchTransactions({
      limit: pagination.pageSize,
      offset: pagination.pageSize * (pagination.current - 1)
    }));
  };
  
  return (
    <Table
      columns={columns}
      dataSource={transactions}
      rowKey='id'
      rowClassName={(record, index) => { // eslint-disable-line no-unused-vars
        if (record.amount < 0) { return 'TransactionList__expense'; } else { return 'TransactionList__allowance'; }
      }}
      pagination={{
        ...requestStatus.pagination,
        defaultCurrent: DEFAULT_CURRENT_PAGE,
        defaultPageSize: DEFAULT_PAGE_SIZE
      }}
      loading={requestStatus.loading}
      onChange={handleTableChange}
    />
  );
}

export default TransactionList;