import { Col, DatePicker, Row, Space } from 'antd';
import React from 'react';
import { TransactionTable } from '../Transactions/TransactionTable';
import DateRanges from '../Utils/DateRanges';
import { TopSpendingTagsChart } from './TopSpendingTagsChart';

const Overview = (): JSX.Element => {
  const defaultDateRange = DateRanges.thisMonth();
  const [startDate, setStartDate] = React.useState<moment.Moment>(
    defaultDateRange[0]
  );
  const [endDate, setEndDate] = React.useState<moment.Moment>(
    defaultDateRange[1]
  );

  return (
    <Space direction='vertical' style={{ width: '100%' }}>
      <DatePicker.RangePicker
        value={[startDate, endDate]}
        ranges={{
          'Last 30 Days': DateRanges.last30Days(),
          'This Month': DateRanges.thisMonth(),
          'Last Month': DateRanges.lastMonth(),
          'Last 365 Days': DateRanges.last365Days(),
        }}
        allowClear={false}
        onChange={(dates) => {
          setStartDate(dates?.[0] as moment.Moment);
          setEndDate(dates?.[1] as moment.Moment);
        }}
      />
      <Row gutter={16}>
        <Col span={12}>
          <TopSpendingTagsChart startDate={startDate} endDate={endDate} />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <TransactionTable startDate={startDate} endDate={endDate} />
        </Col>
      </Row>
    </Space>
  );
};

export default Overview;
