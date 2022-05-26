import { Col, DatePicker, Row, Space } from 'antd';
import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { endDateFilterAtom, startDateFilterAtom } from '../Filters/FilterState';
import { TransactionTable } from '../Transactions/TransactionTable';
import DateRanges from '../Utils/DateRanges';
import { TopSpendingTagsChart } from './TopSpendingTagsChart';

const Overview = (): JSX.Element => {
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

export default Overview;
