import accounting from 'accounting';
import { Col, Row, Space } from 'antd';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { NumberIndicator } from '../Common/NumberIndicator';
import { DateRangePicker } from '../Filters/DateRangePicker';
import { endDateFilterAtom, startDateFilterAtom } from '../Filters/FilterState';
import { TransactionTable } from '../Transactions/TransactionTable';
import { TopSpendingTagsChart } from './TopSpendingTagsChart';
import { useTotalExpenseData } from './useTotalExpenseData';
import { useTotalIncomeData } from './useTotalIncomeData';

const Snapshot = (): JSX.Element => {
  const startDate = useRecoilValue(startDateFilterAtom);
  const endDate = useRecoilValue(endDateFilterAtom);

  const totalExpenseData = useTotalExpenseData();
  const totalIncomeData = useTotalIncomeData();

  const [transactionTypeFilter, setTransactionTypeFilter] =
    React.useState<TransactionType>();

  return (
    <Space direction='vertical' style={{ width: '100%' }}>
      <DateRangePicker />
      <Row gutter={16}>
        <Col span={12}>
          <TopSpendingTagsChart />
        </Col>
        <Col span={4}>
          <NumberIndicator
            onValueClick={() => setTransactionTypeFilter('income')}
            title='Income'
            value={accounting.formatMoney(totalIncomeData.totalIncome)}
            titleProps={{
              type: 'success',
            }}
          />
        </Col>
        <Col span={4}>
          <NumberIndicator
            onValueClick={() => setTransactionTypeFilter('expense')}
            title='Expense'
            value={accounting.formatMoney(totalExpenseData.totalExpense)}
            titleProps={{
              type: 'danger',
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <TransactionTable
            startDate={startDate}
            endDate={endDate}
            type={transactionTypeFilter}
            setType={setTransactionTypeFilter}
          />
        </Col>
      </Row>
    </Space>
  );
};

export default Snapshot;
