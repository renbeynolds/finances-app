import { Col, Row, Space } from 'antd';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { DateRangePicker } from '../Filters/DateRangePicker';
import { endDateFilterAtom, startDateFilterAtom } from '../Filters/FilterState';
import { TransactionTable } from '../Transactions/TransactionTable';
import { TopSpendingTagsChart } from './TopSpendingTagsChart';

const Snapshot = (): JSX.Element => {
  const startDateFilter = useRecoilValue(startDateFilterAtom);
  const endDateFilter = useRecoilValue(endDateFilterAtom);

  return (
    <Space direction='vertical' style={{ width: '100%' }}>
      <DateRangePicker />
      <Row gutter={16}>
        <Col span={12}>
          <TopSpendingTagsChart
            startDate={startDateFilter}
            endDate={endDateFilter}
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <TransactionTable
            startDate={startDateFilter}
            endDate={endDateFilter}
          />
        </Col>
      </Row>
    </Space>
  );
};

export default Snapshot;
