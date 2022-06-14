import { Col, Row, Space } from 'antd';
import React from 'react';
import { useParams } from 'react-router';
import { useRecoilValue } from 'recoil';
import { DateRangePicker } from '../../Filters/DateRangePicker';
import {
  endDateFilterAtom,
  startDateFilterAtom,
} from '../../Filters/FilterState';
import { TransactionTable } from '../../Transactions/TransactionTable';
import CategorySpendingOverTimeChart from './CategorySpendingOverTimeChart/CategorySpendingOverTimeChart';

const CategoryInsights = (): JSX.Element => {
  const { categoryId: categoryIdString } = useParams();
  const categoryId = parseInt(categoryIdString!);
  const startDate = useRecoilValue(startDateFilterAtom);
  const endDate = useRecoilValue(endDateFilterAtom);

  return (
    <Space direction='vertical' style={{ width: '100%' }}>
      <DateRangePicker />
      <Row>
        <Col span={12}>
          <CategorySpendingOverTimeChart categoryId={categoryId} />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <TransactionTable
            categoryId={categoryId}
            startDate={startDate}
            endDate={endDate}
          />
        </Col>
      </Row>
    </Space>
  );
};

export default CategoryInsights;
