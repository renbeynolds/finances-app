import { Space, Table } from 'antd';
import cx from 'classnames';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTransactionSearch } from '../../Redux/Filters/selectors';
import { selectRequestStatus } from '../../Redux/Requests/selectors';
import { requestFetchTransactions } from '../../Redux/Transactions/actions';
import TransactionConstants from '../../Redux/Transactions/constants';
import { selectTransactionsArray } from '../../Redux/Transactions/selectors';
import { numberToCurrency } from '../../Utils/numberToCurrency';
import { EditableTagGroup } from '../EditableTagGroup';
import { TransactionFilterCard } from '../TransactionFilterCard';
import './styles.scss';

const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_CURRENT_PAGE = 1;

function TransactionTable() {

  const dispatch = useDispatch();
  const requestStatus = useSelector(state => selectRequestStatus(state, TransactionConstants.FETCH_TRANSACTIONS));
  const transactions = useSelector(selectTransactionsArray);
  const search = useSelector(selectTransactionSearch);

  // Fetch initial transactions to display
  useEffect(() => {
    dispatch(requestFetchTransactions({
      limit: DEFAULT_PAGE_SIZE,
      offset: DEFAULT_PAGE_SIZE * (DEFAULT_CURRENT_PAGE - 1),
      search: search
    }));
  }, [dispatch, search]);

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
      className: 'TransactionTable__amount',
      render: (text) => numberToCurrency(text)
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      className: 'TransactionTable__balance',
      render: (text) => numberToCurrency(text)
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      className: 'TransactionTable__tags',
      // (tags, transaction, index)
      render: (...args) => {
        const [, transaction] = args;
        return (<EditableTagGroup transaction={transaction}/>);
      },
    }
  ];

  // (pagination, filters, sorter)
  const handleTableChange = (...args) => {
    const [pagination] = args;
    dispatch(requestFetchTransactions({
      limit: pagination.pageSize,
      offset: pagination.pageSize * (pagination.current - 1),
      search: search
    }));
  };

  return (
    <Space direction='vertical' style={{ width: '100%' }}>
      <TransactionFilterCard />
      <Table
        columns={columns}
        dataSource={transactions}
        rowKey='id'
        rowClassName={(record) => cx({
          'TransactionTable__expense': record.amount < 0,
          'TransactionTable__allowance': record.amount > 0,
          'TransactionTable__positive-balance': record.balance > 0,
          'TransactionTable__negative-balance': record.balance < 0
        })}
        pagination={{
          ...requestStatus.pagination,
          defaultCurrent: DEFAULT_CURRENT_PAGE,
          defaultPageSize: DEFAULT_PAGE_SIZE
        }}
        loading={requestStatus.loading}
        onChange={handleTableChange}
      />
    </Space>
  );
}

export default TransactionTable;