import { Table, Tag } from 'antd';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { selectRequestStatus } from '../../Redux/Requests/selectors';
import { requestFetchTransactions } from '../../Redux/Transactions/actions';
import TransactionConstants from '../../Redux/Transactions/constants';
import { selectTransactionsArray } from '../../Redux/Transactions/selectors';
import './styles.scss';

const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_CURRENT_PAGE = 1;

function TransactionTable() {

  const location = useLocation();
  const dispatch = useDispatch();
  const requestStatus = useSelector(state => selectRequestStatus(state, TransactionConstants.FETCH_TRANSACTIONS));
  const transactions = useSelector(selectTransactionsArray);

  const getSearch = useCallback(() => {
    if (location.state && location.state.uploadId) {
      return `{"upload": {"id": ${location.state.uploadId} }}`
    }
    return undefined;
  }, [location]);

  useEffect(() => {
    dispatch(requestFetchTransactions({
      limit: DEFAULT_PAGE_SIZE,
      offset: DEFAULT_PAGE_SIZE * (DEFAULT_CURRENT_PAGE - 1),
      search: getSearch()
    }));
  }, [dispatch, getSearch]);

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
      className: 'TransactionTable__amount'
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
      offset: pagination.pageSize * (pagination.current - 1),
      search: getSearch()
    }));
  };
  
  return (
    <Table
      columns={columns}
      dataSource={transactions}
      rowKey='id'
      rowClassName={(record, index) => { // eslint-disable-line no-unused-vars
        if (record.amount < 0) { return 'TransactionTable__expense'; } else { return 'TransactionTable__allowance'; }
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

export default TransactionTable;