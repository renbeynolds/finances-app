import accounting from 'accounting-js';
import { Table } from 'antd';
import cx from 'classnames';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSearch } from '../../Redux/Filters/selectors';
import { selectRequestStatus } from '../../Redux/Requests/selectors';
import { requestFetchTransactions, requestUpdateTransaction } from '../../Redux/Transactions/actions';
import TransactionConstants from '../../Redux/Transactions/constants';
import { selectTransactionsArray } from '../../Redux/Transactions/selectors';
import EditableCell from '../EditableCell/EditableCell';
import { EditableTagGroup } from '../EditableTagGroup';
import './styles.scss';

const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_CURRENT_PAGE = 1;

function TransactionTable({ size, hideColumns }) {

  const dispatch = useDispatch();
  const requestStatus = useSelector(state => selectRequestStatus(state, TransactionConstants.FETCH_TRANSACTIONS));
  const transactions = useSelector(selectTransactionsArray);
  const search = useSelector(selectSearch);

  // Fetch initial transactions to display
  useEffect(() => {
    dispatch(requestFetchTransactions({
      limit: DEFAULT_PAGE_SIZE,
      offset: DEFAULT_PAGE_SIZE * (DEFAULT_CURRENT_PAGE - 1),
      search: search
    }));
  }, [dispatch, search]);

  const onEditBalanceCorrection = (newValue, transaction) => {
    dispatch(requestUpdateTransaction({
      id: transaction.id,
      transaction: {
        ...transaction, balanceCorrection: newValue
      }
    }))
  };

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      width: '125px'
    },
    {
      title: 'Description',
      dataIndex: 'description'
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      className: 'TransactionTable__amount',
      render: (text) => accounting.formatMoney(text)
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      className: 'TransactionTable__balance',
      render: (text) => accounting.formatMoney(text)
    },
    {
      title: 'Correction',
      dataIndex: 'balanceCorrection',
      render: (text, record) => <EditableCell
        dataIndex='balanceCorrection'
        title='Correction'
        value={text}
        formatValue={(val) => accounting.formatMoney(val)}
        onSave={(newValue) => onEditBalanceCorrection(newValue, record)}
      />
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
    <Table
      columns={columns.filter(c => !hideColumns.includes(c.title))}
      dataSource={transactions}
      rowKey='id'
      size={size}
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
  );
}

TransactionTable.defaultProps = {
  size: 'default',
  hideColumns: []
}

export default TransactionTable;