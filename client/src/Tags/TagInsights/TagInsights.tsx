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
import { TagSpendingOverTimeChart } from './TagSpendingOverTimeChart';

const TagInsights = (): JSX.Element => {
  const { tagId: tagIdString } = useParams();
  const tagId = parseInt(tagIdString!);

  const startDateFilter = useRecoilValue(startDateFilterAtom);
  const endDateFilter = useRecoilValue(endDateFilterAtom);

  return (
    <Space direction='vertical' style={{ width: '100%' }}>
      <DateRangePicker />
      <Row>
        <Col span={12}>
          <TagSpendingOverTimeChart tagId={tagId} />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <TransactionTable
            startDate={startDateFilter}
            endDate={endDateFilter}
            tagId={tagId}
          />
        </Col>
      </Row>
    </Space>
  );
};

export default TagInsights;
