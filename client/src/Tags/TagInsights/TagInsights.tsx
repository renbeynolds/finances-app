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
  const startDate = useRecoilValue(startDateFilterAtom);
  const endDate = useRecoilValue(endDateFilterAtom);

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
            tagId={tagId}
            startDate={startDate}
            endDate={endDate}
          />
        </Col>
      </Row>
    </Space>
  );
};

export default TagInsights;
