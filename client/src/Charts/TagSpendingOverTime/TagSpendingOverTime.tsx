import accounting from 'accounting';
import React from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useRecoilValue } from 'recoil';
import { tagSpendingOverTimeQuery } from './state';

function TagSpendingOverTime() {
  const data = useRecoilValue(tagSpendingOverTimeQuery);

  return (
    <LineChart
      width={600}
      height={300}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <XAxis dataKey='month' type='category' allowDuplicatedCategory={false} />
      <YAxis
        dataKey='total'
        tickFormatter={(value) =>
          accounting.formatMoney(value, { precision: 0 })
        }
      />
      <CartesianGrid strokeDasharray='3 3' />
      <Tooltip formatter={(value: number) => accounting.formatMoney(value)} />
      {data.map((d) => (
        <Line
          key={d.id}
          name={d.name}
          connectNulls
          type='monotone'
          stroke={'blue'}
          data={d.data}
          dataKey='total'
        />
      ))}
      <Legend />
    </LineChart>
  );
}

export default TagSpendingOverTime;
