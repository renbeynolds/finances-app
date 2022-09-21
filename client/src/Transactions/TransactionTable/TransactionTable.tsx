import { SearchOutlined } from '@ant-design/icons';
import { makeStyles } from '@material-ui/styles';
import accounting from 'accounting';
import { Button, Input, Space, Table } from 'antd';
import { TablePaginationConfig } from 'antd/lib/table';
import { FilterValue } from 'antd/lib/table/interface';
import cx from 'classnames';
import React, { useEffect, useState } from 'react';
import { apiPut } from '../../Utils/api';
import { TransactionDTO } from '../TransactionDTO';
import { UpdateTransactionCMD } from '../UpdateTransactionCMD';
import { EditableCategory } from './EditableCategory';
import { EditableCell } from './EditableCell';
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
  categoryId?: number;
  accountId?: number;
  startDate?: string;
  endDate?: string;
  uploadId?: number;
  type?: TransactionType;
  setType?: (type: TransactionType | undefined) => void;
}

const TransactionTable = ({
  categoryId,
  accountId,
  uploadId,
  startDate,
  endDate,
  type,
  setType,
}: TransactionTableProps): JSX.Element => {
  const classes = useStyles();
  const [pageNumber, setPageNumber] = useState<number>(1);

  const descriptionSearchInput = React.useRef(null);
  const [descriptionSearch, setDescriptionSearch] = React.useState<
    string | undefined
  >();

  const handleDescriptionSearch = (
    searchValue: string | undefined,
    confirm: () => void,
    clearFilters: () => void
  ) => {
    confirm();
    setDescriptionSearch(searchValue);
    if (!searchValue) {
      clearFilters();
    }
  };

  useEffect(() => {
    setPageNumber(1);
  }, [setPageNumber, startDate, endDate, type]);

  const { data, totalTransactions, loading, updateTransaction } =
    usePaginatedTransactions(
      pageNumber,
      startDate,
      endDate,
      categoryId,
      uploadId,
      accountId,
      descriptionSearch,
      type
    );

  const amountFilterProps = setType
    ? {
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
      }
    : {};

  const getDescriptionSearchProps = () => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }: any) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={descriptionSearchInput}
          placeholder={'Search'}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleDescriptionSearch(selectedKeys[0], confirm, clearFilters)
          }
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type='primary'
            onClick={() =>
              handleDescriptionSearch(selectedKeys[0], confirm, clearFilters)
            }
            icon={<SearchOutlined />}
            size='small'
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() =>
              handleDescriptionSearch(undefined, confirm, clearFilters)
            }
            size='small'
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => {
      return (
        <SearchOutlined
          style={{
            color: descriptionSearch ? '#1890ff' : undefined,
          }}
        />
      );
    },
    onFilterDropdownOpenChange: (visible: any) => {
      if (visible) {
        // @ts-ignore
        setTimeout(() => descriptionSearchInput.current?.select(), 100);
      }
    },
  });

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
      ...getDescriptionSearchProps(),
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
      ...amountFilterProps,
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
      title: 'Category',
      dataIndex: 'categoryId',
      // (categoryId, transaction, index)
      render: (...args: [number, TransactionDTO, number]) => {
        const [categoryId, transaction] = args;
        return (
          <EditableCategory
            categoryId={categoryId}
            onSave={(newCategoryId) =>
              onEditCategory(transaction.id, newCategoryId)
            }
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

  const onEditCategory = (transactionId: number, categoryId: number) => {
    apiPut<UpdateTransactionCMD, TransactionDTO>(
      `/api/transactions/${transactionId}`,
      { categoryId }
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
