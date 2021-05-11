import accounting from 'accounting-js';
import { DatePicker, InputNumber, Space, Typography } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Cell, Legend, Pie, PieChart } from 'recharts';
import { useDateRange } from '../../../Hooks/useDateRange';
import { useTopSpendingCategories } from '../../../Hooks/useTopSpendingCategories';
import { setSingleTagIdFilter } from '../../../Redux/Filters/reducer';
import ChartColors from '../../../Utils/ChartColors';
import DateRanges from '../../../Utils/DateRanges';
import ActivePieShape from '../ActivePieShape/ActivePieShape';

const renderLegend = (props) => {
  const { payload } = props;

  return (
    <>
      {
        payload.map((entry, index) => (
          <div key={index} style={{ display: 'flex', color: '#333' }}>
            <div style={{ backgroundColor: entry.color, width: '13px', height: '13px', marginTop: '4px' }} />
            <div style={{ paddingLeft: '8px', flexGrow: 1 }}>{entry.value}</div>
            <div style={{ paddingLeft: '8px' }}>{accounting.formatMoney(entry.payload.value)}</div>
            <div style={{ paddingLeft: '8px', width: '70px', color: '#999' }}>{`(${(entry.payload.percent * 100).toFixed(2)}%)`}</div>
          </div>
        ))
      }
    </>
  );
}

const { RangePicker } = DatePicker;
const DEFAULT_RANGE = DateRanges.last30Days();
const DEFAULT_NUM_CATEGORIES = 5;

function TopSpendingCategories() {

  const dispatch = useDispatch();
  const { dateStrings, setDates, dates } = useDateRange(DEFAULT_RANGE, true);
  const [numCategories, setNumCategories] = useState(DEFAULT_NUM_CATEGORIES);
  const data = useTopSpendingCategories(dateStrings, numCategories);
  const [activeIndex, setActiveIndex] = useState(0);

  const getColor = (entry, idx) => {
    if (!entry.color || entry.color === '#999999') {
      return ChartColors[idx];
    }
    return entry.color;
  };

  const onSliceClick = (e) => {
    console.log(e.payload.payload.tagId);
    dispatch(setSingleTagIdFilter(e.payload.payload.tagId));
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
            value={dates}
            onChange={(d) => setDates(d)}
        />
        <InputNumber min={1} max={10} defaultValue={DEFAULT_NUM_CATEGORIES} onChange={setNumCategories} />
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
          onClick={onSliceClick}
          activeIndex={activeIndex}
          activeShape={<ActivePieShape/>}
        >
          {
          	data.map((entry, index) => <Cell key={index} fill={getColor(entry, index)}/>)
          }
        </Pie>
        <Legend
          layout='vertical'
          verticalAlign='middle'
          align='right'
          content={renderLegend}
        />
       </PieChart>
    </div>
  );
};

export default TopSpendingCategories;