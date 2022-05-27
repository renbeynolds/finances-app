import { makeStyles } from '@material-ui/styles';
import accounting from 'accounting';
import { Table } from 'antd';
import { TablePaginationConfig } from 'antd/lib/table';
import { FilterValue } from 'antd/lib/table/interface';
import cx from 'classnames';
import React, { useEffect, useState } from 'react';
import { apiPut } from '../../Utils/api';
import { TransactionDTO } from '../TransactionDTO';
import { UpdateTransactionCMD } from '../UpdateTransactionCMD';
import { EditableCell } from './EditableCell';
import { EditableTag } from './EditableTag';
import { usePaginatedTransactions } from './usePaginatedTransactions';

const useStyles = makeStyles(() => ({
  row: {
    height: 57,
  },
  amount: {},
  balance: {},
  expense: {
    '& $amount': {
      color: 'red',
    },
  },
  income: {
    '& $amount': {
      color: 'green',
    },
  },
  negativeBalance: {
    '& $balance': {
      color: 'red',
    },
  },
  positiveBalance: {
    '& $balance': {
      color: 'green',
    },
  },
}));

interface TransactionTableProps {
  tagId?: number;
  startDate?: string;
  endDate?: string;
  uploadId?: number;
  type?: TransactionType;
  setType?: (type: TransactionType | undefined) => void;
}

const TransactionTable = ({
  tagId,
  uploadId,
  startDate,
  endDate,
  type,
  setType,
}: TransactionTableProps): JSX.Element => {
  const classes = useStyles();
  const [pageNumber, setPageNumber] = useState<number>(1);

  useEffect(() => {
    setPageNumber(1);
  }, [setPageNumber, startDate, endDate, type]);

  const { data, totalTransactions, loading, updateTransaction } =
    usePaginatedTransactions(
      pageNumber,
      startDate,
      endDate,
      tagId,
      uploadId,
      type
    );

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      width: '125px',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      ellipsis: true,
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      ellipsis: true,
      render: (value: string, record: TransactionDTO) => (
        <EditableCell
          title='Comment'
          dataIndex='comment'
          value={value}
          onSave={(newComment) => onEditComment(record.id, newComment)}
        />
      ),
      width: '275px',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      className: classes.amount,
      render: (value: number) => accounting.formatMoney(value),
      width: '200px',
      filters: [
        {
          text: 'Expense',
          value: 'expense',
        },
        {
          text: 'Income',
          value: 'income',
        },
      ],
      filteredValue: type ? [type] : [],
      filterMultiple: false,
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      className: classes.balance,
      render: (value: number) => accounting.formatMoney(value),
      width: '200px',
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
        return (
          <EditableTag
            tagId={tagId}
            onSave={(newTagId) => onEditTag(transaction.id, newTagId)}
          />
        );
      },
      width: '200px',
    },
  ];

  const onEditComment = (transactionId: number, newComment: string) => {
    apiPut<UpdateTransactionCMD, TransactionDTO>(
      `/api/transactions/${transactionId}`,
      { comment: newComment }
    ).then((updatedTransaction) => {
      updateTransaction(updatedTransaction);
    });
  };

  const onEditTag = (transactionId: number, tagId: number) => {
    apiPut<UpdateTransactionCMD, TransactionDTO>(
      `/api/transactions/${transactionId}`,
      { tagId }
    ).then((updatedTransaction) => {
      updateTransaction(updatedTransaction);
    });
  };

  // (pagination, filters, sorter)
  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>
  ) => {
    setPageNumber(pagination.current!);
    if (setType && filters.amount) {
      setType(filters.amount[0] as TransactionType);
    } else if (setType) {
      setType(undefined);
    }
  };

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey='id'
      rowClassName={(record: TransactionDTO) =>
        cx(classes.row, {
          [classes.expense]: record.amount < 0,
          [classes.income]: record.amount > 0,
          [classes.positiveBalance]: record.balance > 0,
          [classes.negativeBalance]: record.balance < 0,
        })
      }
      pagination={{
        total: totalTransactions,
        current: pageNumber,
        pageSize: 10,
        showSizeChanger: false,
      }}
      loading={loading}
      onChange={handleTableChange}
    />
  );
};

export default TransactionTable;
