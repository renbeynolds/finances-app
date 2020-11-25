import { DatePicker, Space, Typography } from 'antd';
import React from 'react';
import { Cell, Pie, PieChart, Tooltip } from 'recharts';
import { useDateRange } from '../../../Hooks/useDateRange';
import { useTopSpendingCategories } from '../../../Hooks/useTopSpendingCategories';
import DateRanges from '../../../Utils/DateRanges';

const { RangePicker } = DatePicker;
const DEFAULT_RANGE = DateRanges.last30Days();

function TopSpendingCategories() {

  const { dateStrings, setDates } = useDateRange(DEFAULT_RANGE);
  const data = useTopSpendingCategories(dateStrings);

  console.log(data);

  return (
    <div>
      <Space direction='horizontal' style={{ marginLeft: '50px' }}>
        <Typography.Title level={5}  style={{ lineHeight: '32px', marginBottom: 0 }}>Top Spending Categories</Typography.Title>
        <RangePicker
            defaultValue={DEFAULT_RANGE}
            ranges={{
                'Past Year': DEFAULT_RANGE,
                'This Month': DateRanges.thisMonth(),
                'Last Month': DateRanges.lastMonth()
            }}
            onChange={(dates) => setDates(dates)}
        />
      </Space>
    	<PieChart width={600} height={300}>
        <Pie
          isAnimationActive={false}
          data={data}
          innerRadius={70}
          outerRadius={95}
          fill="#8884d8"
          label
          paddingAngle={1}
          dataKey='data'
        >
          {
          	data.map((entry, index) => <Cell fill={entry.color || '#999999'}/>)
          }
        </Pie>
        <Tooltip/>
       </PieChart>
    </div>
  );
};

export default TopSpendingCategories;