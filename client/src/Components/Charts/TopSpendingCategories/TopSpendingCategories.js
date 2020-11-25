import { DatePicker, Space, Typography } from 'antd';
import React, { useState } from 'react';
import { Cell, Pie, PieChart } from 'recharts';
import { useDateRange } from '../../../Hooks/useDateRange';
import { useTopSpendingCategories } from '../../../Hooks/useTopSpendingCategories';
import ChartColors from '../../../Utils/ChartColors';
import DateRanges from '../../../Utils/DateRanges';
import ActivePieShape from '../ActivePieShape/ActivePieShape';

const { RangePicker } = DatePicker;
const DEFAULT_RANGE = DateRanges.last30Days();

function TopSpendingCategories() {

  const { dateStrings, setDates } = useDateRange(DEFAULT_RANGE);
  const data = useTopSpendingCategories(dateStrings);
  const [activeIndex, setActiveIndex] = useState(0);

  const getColor = (entry, idx) => {
    if (!entry.color || entry.color === '#999999') {
      return ChartColors[idx];
    }
    return entry.color;
  };

  return (
    <div>
      <Space direction='horizontal' style={{ marginLeft: '50px' }}>
        <Typography.Title level={5}  style={{ lineHeight: '32px', marginBottom: 0 }}>Top Spending Categories</Typography.Title>
        <RangePicker
            defaultValue={DEFAULT_RANGE}
            ranges={{
                'Last 30 Days': DEFAULT_RANGE,
                'Past Year': DateRanges.last365Days,
                'This Month': DateRanges.thisMonth(),
                'Last Month': DateRanges.lastMonth()
            }}
            onChange={(dates) => setDates(dates)}
        />
      </Space>
    	<PieChart width={600} height={300}>
        <Pie
          data={data}
          innerRadius={70}
          outerRadius={95}
          fill="#8884d8"
          paddingAngle={1}
          dataKey='data'
          onMouseEnter={(data, idx) => setActiveIndex(idx)}
          activeIndex={activeIndex}
          activeShape={(props) => <ActivePieShape {...props} />}
        >
          {
          	data.map((entry, index) => <Cell fill={getColor(entry, index)}/>)
          }
        </Pie>
       </PieChart>
    </div>
  );
};

export default TopSpendingCategories;