import accounting from 'accounting';
import Card from 'antd/lib/card';
import moment from 'moment';
import React from 'react';
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useIncomeVsExpenseData } from './useIncomeVsExpenseData';

const formatMonth = (month: string): string => {
  return moment(month).format('MMM YYYY');
};

const IncomeVsExpenseChart = (): JSX.Element => {
  const data = useIncomeVsExpenseData();

  return (
    <Card title='Income vs Expense' bordered={false}>
      <ResponsiveContainer height={300}>
        <ComposedChart
          data={data}
          stackOffset='sign'
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='month' tickFormatter={formatMonth} />
          <YAxis
            tickFormatter={(value: number) =>
              accounting.formatMoney(value, { precision: 0 })
            }
          />
          <Tooltip
            formatter={(value: number) => accounting.formatMoney(value)}
            labelFormatter={formatMonth}
          />
          <Legend />
          <ReferenceLine y={0} stroke='#000' />
          <Bar dataKey='Income' fill='rgb(40, 201, 56)' stackId='stack' />
          <Bar dataKey='Expense' fill='rgb(222, 53, 53)' stackId='stack' />
          <Line
            dataKey='Total'
            stroke='#000'
            dot={false}
            legendType='plainline'
          />
        </ComposedChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IncomeVsExpenseChart;
