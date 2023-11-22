import accounting from 'accounting';
import { Col, Row, Space } from 'antd';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { NumberIndicator } from '../Common/NumberIndicator';
import { DateRangePicker } from '../Filters/DateRangePicker';
import {
  endDateFilterAtom,
  endDateFilterPreviousAtom,
  startDateFilterAtom,
  startDateFilterPreviousAtom,
} from '../Filters/FilterState';
import { TransactionTable } from '../Transactions/TransactionTable';
import { TopSpendingCategoriesChart } from './TopSpendingCategoriesChart';
import { useCategoryTotalData } from './useCategoryTotalData';
import { useTotalExpenseData } from './useTotalExpenseData';
import { useTotalIncomeData } from './useTotalIncomeData';

const Snapshot = (): JSX.Element => {
  const startDate = useRecoilValue(startDateFilterAtom);
  const endDate = useRecoilValue(endDateFilterAtom);
  const startDatePrev = useRecoilValue(startDateFilterPreviousAtom);
  const endDatePrev = useRecoilValue(endDateFilterPreviousAtom);

  const totalExpenseData = useTotalExpenseData(startDate, endDate);
  const totalExpenseDataPrev = useTotalExpenseData(startDatePrev, endDatePrev);
  const totalIncomeData = useTotalIncomeData(startDate, endDate);
  const totalIncomeDataPrev = useTotalIncomeData(startDatePrev, endDatePrev);

  const [transactionTypeFilter, setTransactionTypeFilter] =
    React.useState<TransactionType>();

  const [activeCategoryId, setActiveCategoryId] = React.useState<
    number | undefined
  >();

  const categoryTotalData = useCategoryTotalData(
    activeCategoryId,
    startDate,
    endDate
  );

  const categoryTotalDataPrev = useCategoryTotalData(
    activeCategoryId,
    startDatePrev,
    endDatePrev
  );

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <DateRangePicker />
      </Col>
      <Col span={12}>
        <TopSpendingCategoriesChart setActiveCategoryId={setActiveCategoryId} />
      </Col>
      <Col span={4}>
        <Space direction='vertical' size='middle' style={{ width: '100%' }}>
          <NumberIndicator
            onValueClick={() => setTransactionTypeFilter('income')}
            title='Income'
            value={totalIncomeData.totalIncome}
            previousValue={totalIncomeDataPrev.totalIncome}
            desiredChange={'increase'}
            formatValue={accounting.formatMoney}
            titleProps={{
              type: 'success',
            }}
          />
          {categoryTotalData && categoryTotalDataPrev && (
            <NumberIndicator
              onValueClick={() => setTransactionTypeFilter('income')}
              title={categoryTotalData.categoryName}
              value={categoryTotalData.total}
              previousValue={categoryTotalDataPrev.total}
              desiredChange={
                categoryTotalData.categoryType === 'income'
                  ? 'increase'
                  : 'decrease'
              }
              formatValue={accounting.formatMoney}
            />
          )}
        </Space>
      </Col>
      <Col span={4}>
        <NumberIndicator
          onValueClick={() => setTransactionTypeFilter('expense')}
          title='Expense'
          value={totalExpenseData.totalExpense}
          previousValue={totalExpenseDataPrev.totalExpense}
          desiredChange={'decrease'}
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
