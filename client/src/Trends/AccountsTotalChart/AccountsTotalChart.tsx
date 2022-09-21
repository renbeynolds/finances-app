import accounting from 'accounting';
import { Card } from 'antd';
import React from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { roundUpToNearestN } from '../../Utils/NumberUtils';
import { formatDayString } from '../../Utils/StringUtils';
import { useAccountsTotalData } from './useAccountsTotalData';

const AccountsTotalChart = (): JSX.Element => {
  const data = useAccountsTotalData();

  return (
    <Card title='Accounts Total' bordered={false}>
      <ResponsiveContainer height={300}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='date' tickFormatter={formatDayString} />
          <YAxis
            tickFormatter={(value: number) =>
              accounting.formatMoney(value, { precision: 0 })
            }
            domain={[0, (dataMax: number) => roundUpToNearestN(dataMax, 25000)]}
          />
          <Tooltip
            formatter={(value: number) => accounting.formatMoney(value)}
            labelFormatter={formatDayString}
            contentStyle={{
              backgroundColor: '#1d1d1d',
              border: 'none',
            }}
          />
          <Area
            type='monotone'
            dataKey='total'
            stroke='#1890ff'
            fill='#1890ff'
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default AccountsTotalChart;
