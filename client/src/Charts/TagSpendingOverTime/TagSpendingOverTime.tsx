import accounting from 'accounting';
import Title from 'antd/lib/typography/Title';
import React from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useRecoilValue } from 'recoil';
import { tagSpendingOverTimeQuery } from './state';

function TagSpendingOverTime() {
  const data = useRecoilValue(tagSpendingOverTimeQuery);

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Title level={3}>Tags Over Time</Title>
      </div>
      <ResponsiveContainer minWidth={600} height={300}>
        <LineChart>
          <XAxis
            dataKey='month'
            type='category'
            allowDuplicatedCategory={false}
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
          />
          {data.map((d) => (
            <Line
              key={d.id}
              name={d.name}
              connectNulls
              type='monotone'
              // stroke={'blue'}
              data={d.data}
              dataKey='total'
            />
          ))}
          <Legend />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TagSpendingOverTime;
