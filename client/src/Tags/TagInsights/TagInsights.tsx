import { Col, DatePicker, Row, Space } from 'antd';
import moment from 'moment';
import React from 'react';
import { useParams } from 'react-router';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  endDateFilterAtom,
  startDateFilterAtom,
} from '../../Filters/FilterState';
import { TransactionTable } from '../../Transactions/TransactionTable';
import DateRanges from '../../Utils/DateRanges';
import { TagSpendingOverTimeChart } from './TagSpendingOverTimeChart';

const TagInsights = (): JSX.Element => {
  const { tagId: tagIdString } = useParams();
  const tagId = parseInt(tagIdString!);

  const startDateFilter = useRecoilValue(startDateFilterAtom);
  const endDateFilter = useRecoilValue(endDateFilterAtom);
  const setStartDateFilter = useSetRecoilState(startDateFilterAtom);
  const setEndDateFilter = useSetRecoilState(endDateFilterAtom);

  return (
    <Space direction='vertical' style={{ width: '100%' }}>
      <DatePicker.RangePicker
        value={[startDateFilter, endDateFilter]}
        ranges={{
          'Last 30 Days': DateRanges.last30Days(),
          'This Month': DateRanges.thisMonth(),
          'Last Month': DateRanges.lastMonth(),
          'Last 365 Days': DateRanges.last365Days(),
        }}
        allowClear={false}
        onChange={(dates) => {
          setStartDateFilter(dates?.[0] as moment.Moment);
          setEndDateFilter(dates?.[1] as moment.Moment);
        }}
      />
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
