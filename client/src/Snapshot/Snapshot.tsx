import accounting from 'accounting';
import { Col, Row } from 'antd';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { NumberIndicator } from '../Common/NumberIndicator';
import { DateRangePicker } from '../Filters/DateRangePicker';
import { endDateFilterAtom, startDateFilterAtom } from '../Filters/FilterState';
import { TransactionTable } from '../Transactions/TransactionTable';
import { TopSpendingCategoriesChart } from './TopSpendingCategoriesChart';
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
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <DateRangePicker />
      </Col>
      <Col span={12}>
        <TopSpendingCategoriesChart />
      </Col>
      <Col span={4}>
        <NumberIndicator
          onValueClick={() => setTransactionTypeFilter('income')}
          title='Income'
          value={totalIncomeData.totalIncome}
          formatValue={accounting.formatMoney}
          titleProps={{
            type: 'success',
          }}
        />
      </Col>
      <Col span={4}>
        <NumberIndicator
          onValueClick={() => setTransactionTypeFilter('expense')}
          title='Expense'
          value={totalExpenseData.totalExpense}
          formatValue={accounting.formatMoney}
          titleProps={{
            type: 'danger',
          }}
        />
      </Col>
      <Col span={4}></Col>
      <Col span={24}>
        <TransactionTable
          startDate={startDate}
          endDate={endDate}
          type={transactionTypeFilter}
          setType={setTransactionTypeFilter}
        />
      </Col>
    </Row>
  );
};

export default Snapshot;
