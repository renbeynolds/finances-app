import accounting from 'accounting-js';
import { DatePicker, Space, Typography } from 'antd';
import React from 'react';
import { Bar, CartesianGrid, ComposedChart, Legend, Line, ReferenceLine, Tooltip, XAxis, YAxis } from 'recharts';
import { useDateRange } from '../../../Hooks/useDateRange';
import { useIncomeVsExpense } from '../../../Hooks/useIncomeVsExpense';
import DateRanges from '../../../Utils/DateRanges';

const { RangePicker } = DatePicker;
const DEFAULT_RANGE = DateRanges.last365Days();

function IncomeVsExpense() {

  const { dateStrings, setDates } = useDateRange(DEFAULT_RANGE);
  const data = useIncomeVsExpense(dateStrings);

  return (
    <div>
      <Space direction='horizontal' style={{ marginLeft: '80px' }}>
        <Typography.Title level={5}>Income vs Expense</Typography.Title>
        <RangePicker
            defaultValue={DEFAULT_RANGE}
            ranges={{
                'Past Year': DEFAULT_RANGE
            }}
            onChange={(dates) => setDates(dates)}
        />
      </Space>
    	<ComposedChart width={600} height={300} data={data} stackOffset='sign'
              margin={{top: 5, right: 30, left: 20, bottom: 5}}>
        <CartesianGrid strokeDasharray='3 3'/>
        <XAxis dataKey='month'/>
        <YAxis tickFormatter={(value) => accounting.formatMoney(value, { precision: 0})}/>
        <Tooltip formatter={(value) => accounting.formatMoney(value)}/>
        <Legend />
        <ReferenceLine y={0} stroke='#000'/>
        <Bar dataKey='Income' fill='#23b834' stackId='stack' />
        <Bar dataKey='Expense' fill='#db3d3d' stackId='stack' />
        <Line dataKey='Total' stroke='#000'/>
      </ComposedChart>
    </div>
  );
};

export default IncomeVsExpense;