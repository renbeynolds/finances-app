import { Col, DatePicker, Row, Space } from 'antd';
import moment from 'moment';
import React from 'react';
import { useLocation, useParams } from 'react-router';
import { TransactionTable } from '../../Transactions/TransactionTable';
import DateRanges from '../../Utils/DateRanges';
import { TagSpendingOverTimeChart } from './TagSpendingOverTimeChart';

const TagInsights = (): JSX.Element => {
  const { state: locationState } = useLocation();

  const { tagId: tagIdString } = useParams();
  const tagId = parseInt(tagIdString!);

  const defaultDateRange = locationState
    ? [moment(locationState.startDate), moment(locationState.endDate)]
    : DateRanges.last365Days();

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
      <Row>
        <Col span={12}>
          <TagSpendingOverTimeChart tagId={tagId} />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <TransactionTable
            startDate={startDate}
            endDate={endDate}
            tagId={tagId}
          />
        </Col>
      </Row>
    </Space>
  );
};

export default TagInsights;
