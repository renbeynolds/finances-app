import accounting from 'accounting';
import { Table } from 'antd';
import { TablePaginationConfig } from 'antd/lib/table';
import cx from 'classnames';
import React, { useEffect, useState } from 'react';
import { useRecoilValueLoadable, useSetRecoilState } from 'recoil';
import { EditableTag } from '../../Tags/EditableTag';
import { TransactionDTO } from '../TransactionDTO';
import {
  DEFAULT_TRANSACTIONS_PAGE_NUM,
  DEFAULT_TRANSACTIONS_PAGE_SIZE,
  paginatedTransactions,
  transactionsPageNum,
  transactionsPageSize,
} from '../TransactionsState';
import './styles.scss';

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
      className: 'TransactionTable__amount',
      render: (value: number) => accounting.formatMoney(value),
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      className: 'TransactionTable__balance',
      render: (value: number) => accounting.formatMoney(value),
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
    {
      title: 'Tag',
      dataIndex: 'tagId',
      // (tagId, transaction, index)
      render: (...args: [number, TransactionDTO, number]) => {
        const [tagId, transaction] = args;
        return <EditableTag tagId={tagId} transactionId={transaction.id} />;
      },
    },
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
      rowClassName={(record: TransactionDTO) =>
        cx({
          TransactionTable__expense: record.amount < 0,
          TransactionTable__allowance: record.amount > 0,
          'TransactionTable__positive-balance': record.balance > 0,
          'TransactionTable__negative-balance': record.balance < 0,
        })
      }
      pagination={{
        total: totalTransactions,
        defaultCurrent: DEFAULT_TRANSACTIONS_PAGE_NUM,
        pageSize: DEFAULT_TRANSACTIONS_PAGE_SIZE,
        showSizeChanger: false,
        style: {
          paddingRight: '24px',
        },
      }}
      loading={state === 'loading'}
      onChange={handleTableChange}
    />
  );
};

export default TransactionTable;
