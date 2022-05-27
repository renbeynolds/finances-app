import { Col, Row, Space } from 'antd';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { DateRangePicker } from '../Filters/DateRangePicker';
import { endDateFilterAtom, startDateFilterAtom } from '../Filters/FilterState';
import { TransactionTable } from '../Transactions/TransactionTable';
import { TopSpendingTagsChart } from './TopSpendingTagsChart';
import { TotalExpenseIndicator } from './TotalExpenseIndicator';
import { TotalIncomeIndicator } from './TotalIncomeIndicator';

const Snapshot = (): JSX.Element => {
  const startDate = useRecoilValue(startDateFilterAtom);
  const endDate = useRecoilValue(endDateFilterAtom);

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
          <TotalIncomeIndicator
            onValueClick={() => setTransactionTypeFilter('income')}
          />
        </Col>
        <Col span={4}>
          <TotalExpenseIndicator
            onValueClick={() => setTransactionTypeFilter('expense')}
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
