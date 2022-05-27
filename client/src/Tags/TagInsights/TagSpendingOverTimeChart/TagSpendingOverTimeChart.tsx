import accounting from 'accounting';
import { Card } from 'antd';
import React from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { formatMonthString } from '../../../Utils/StringUtils';
import { useTagSpendingOverTimeData } from './useTagSpendingOverTimeData';

interface TagSpendingOverTimeChartProps {
  tagId: number;
}

const TagSpendingOverTimeChart = ({
  tagId,
}: TagSpendingOverTimeChartProps): JSX.Element => {
  const data = useTagSpendingOverTimeData(tagId);

  return (
    <Card title='Tag Spending Over Time'>
      <ResponsiveContainer minWidth={600} height={300}>
        <LineChart>
          <XAxis
            dataKey='month'
            type='category'
            allowDuplicatedCategory={false}
            tickFormatter={formatMonthString}
          />
          <YAxis
            dataKey='total'
            tickFormatter={(value) =>
              accounting.formatMoney(value, { precision: 0 })
            }
          />
          <CartesianGrid strokeDasharray='3 3' />
          <Tooltip
            formatter={(value: number) => accounting.formatMoney(value)}
            labelFormatter={formatMonthString}
            contentStyle={{
              backgroundColor: '#1d1d1d',
              border: 'none',
            }}
          />
          <Line
            key={data.id}
            name={data.name}
            connectNulls
            type='monotone'
            data={data.data}
            dataKey='total'
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default TagSpendingOverTimeChart;
