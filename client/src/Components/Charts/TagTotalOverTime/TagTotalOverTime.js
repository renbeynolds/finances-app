import accounting from 'accounting-js';
import { DatePicker, Space, Typography } from 'antd';
import React from 'react';
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { useDateRange } from '../../../Hooks/useDateRange';
import { useTagTotalOverTime } from '../../../Hooks/useTagTotalOverTime';
import DateRanges from '../../../Utils/DateRanges';

const { RangePicker } = DatePicker;
const DEFAULT_RANGE = DateRanges.last365Days();

function TagTotalOverTime() {

  const { dateStrings, setDates } = useDateRange(DEFAULT_RANGE);
  const data = useTagTotalOverTime(dateStrings);

  return (
    <div>
      <Space direction='horizontal' style={{ marginLeft: '80px' }}>
        <Typography.Title level={5}>Tag Total Over Time</Typography.Title>
        <RangePicker
            defaultValue={DEFAULT_RANGE}
            ranges={{
                'Past Year': DEFAULT_RANGE
            }}
            onChange={(dates) => setDates(dates)}
        />
      </Space>
    	<LineChart width={600} height={300} data={data} margin={{top: 5, right: 30, left: 20, bottom: 5}} >
        <defs>
          <linearGradient id="colorUv" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="red" />
            <stop offset="100%" stopColor="green" />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray='3 3'/>
        <XAxis dataKey='month'/>
        <YAxis tickFormatter={(value) => accounting.formatMoney(value, { precision: 0})}/>
        <Tooltip formatter={(value) => accounting.formatMoney(value)}/>
        <Legend />
        <Line type='monotone' dataKey='Total' stroke="url(#colorUv)" strokeWidth={2}/>
      </LineChart>
    </div>
  );
};

export default TagTotalOverTime;