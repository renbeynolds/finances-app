import accounting from 'accounting';
import { Table } from 'antd';
import { TablePaginationConfig } from 'antd/lib/table';
import React, { useEffect, useState } from 'react';
import { useRecoilValueLoadable, useSetRecoilState } from 'recoil';
import {
  DEFAULT_TRANSACTIONS_PAGE_NUM,
  DEFAULT_TRANSACTIONS_PAGE_SIZE,
  paginatedTransactions,
  transactionsPageNum,
  transactionsPageSize,
} from '../TransactionsState';

const TransactionTable = (): JSX.Element => {
  const { state, contents } = useRecoilValueLoadable(paginatedTransactions);

  const [transactions, setTransactions] = useState([]);
  const [totalTransactions, setTotalTransactions] = useState(0);

  const setPageNum = useSetRecoilState(transactionsPageNum);
  const setPageSize = useSetRecoilState(transactionsPageSize);

  useEffect(() => {
    if (state === 'hasValue') {
      setTransactions(contents.data);
      setTotalTransactions(contents.pagination.total);
    }
  }, [setTransactions, setTotalTransactions, state, contents]);

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      width: '125px',
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      // className: 'TransactionTable__amount',
      render: (text: string) => accounting.formatMoney(text),
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      // className: 'TransactionTable__balance',
      render: (text: string) => accounting.formatMoney(text),
    },
    // {
    //   title: 'Correction',
    //   dataIndex: 'balanceCorrection',
    //   render: (text, record) => (
    //     <EditableCell
    //       dataIndex='balanceCorrection'
    //       title='Correction'
    //       value={text}
    //       formatValue={(val) => accounting.formatMoney(val)}
    //       onSave={(newValue) => onEditBalanceCorrection(newValue, record)}
    //     />
    //   ),
    // },
    // {
    //   title: 'Tags',
    //   dataIndex: 'tags',
    //   className: 'TransactionTable__tags',
    //   // (tags, transaction, index)
    //   render: (...args) => {
    //     const [, transaction] = args;
    //     return <EditableTagGroup transaction={transaction} />;
    //   },
    // },
  ];

  // (pagination, filters, sorter)
  const handleTableChange = (pagination: TablePaginationConfig) => {
    setPageNum(pagination.current!);
    setPageSize(pagination.pageSize!);
  };

  return (
    <Table
      columns={columns}
      dataSource={transactions}
      rowKey='id'
      // size={size}
      // rowClassName={(record) =>
      //   cx({
      //     TransactionTable__expense: record.amount < 0,
      //     TransactionTable__allowance: record.amount > 0,
      //     'TransactionTable__positive-balance': record.balance > 0,
      //     'TransactionTable__negative-balance': record.balance < 0,
      //   })
      // }
      pagination={{
        total: totalTransactions,
        defaultCurrent: DEFAULT_TRANSACTIONS_PAGE_NUM,
        defaultPageSize: DEFAULT_TRANSACTIONS_PAGE_SIZE,
      }}
      loading={state === 'loading'}
      onChange={handleTableChange}
    />
  );
};

export default TransactionTable;
