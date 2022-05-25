import { presetDarkPalettes } from '@ant-design/colors';
import accounting from 'accounting';
import Card from 'antd/lib/card';
import moment from 'moment';
import React from 'react';
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
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
          <Bar
            dataKey='Income'
            fill={presetDarkPalettes.green.primary}
            stackId='stack'
          />
          <Bar
            dataKey='Expense'
            fill={presetDarkPalettes.red.primary}
            stackId='stack'
          />
          <Line
            dataKey='Total'
            stroke='#fff'
            dot={false}
            legendType='plainline'
          />
        </ComposedChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IncomeVsExpenseChart;
