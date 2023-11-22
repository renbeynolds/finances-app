import { presetDarkPalettes } from '@ant-design/colors';
import accounting from 'accounting';
import { Card } from 'antd';
import React from 'react';
import dayjs from 'dayjs';
import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import {
  endDateFilterAtom,
  startDateFilterAtom,
} from '../../Filters/FilterState';
import {
  Bar,
  Cell,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { formatMonthString } from '../../Utils/StringUtils';
import { useIncomeVsExpenseData } from './useIncomeVsExpenseData';

const IncomeVsExpenseChart = (): JSX.Element => {
  const data = useIncomeVsExpenseData();
  const setStartDateFilter = useSetRecoilState(startDateFilterAtom);
  const setEndDateFilter = useSetRecoilState(endDateFilterAtom);
  const navigate = useNavigate();

  const handleClick = (data, index) => {
    setStartDateFilter(dayjs(data.month, 'YYYY-MM').startOf('month'));
    setEndDateFilter(dayjs(data.month, 'YYYY-MM').endOf('month'));
    navigate('/snapshot');
  };

  return (
    <Card title='Income vs Expense' bordered={false}>
      <ResponsiveContainer height={300}>
        <ComposedChart
          data={data}
          stackOffset='sign'
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='month' tickFormatter={formatMonthString} />
          <YAxis
            tickFormatter={(value: number) =>
              accounting.formatMoney(value, { precision: 0 })
            }
          />
          <Tooltip
            formatter={(value: number) => accounting.formatMoney(value)}
            labelFormatter={formatMonthString}
            contentStyle={{
              backgroundColor: '#1d1d1d',
              border: 'none',
            }}
          />
          <Bar
            dataKey='Income'
            fill={presetDarkPalettes.green.primary}
            stackId='stack'
            onClick={handleClick}
          >
            {data.map((entry, index) => (
              <Cell cursor='pointer' />
            ))}
          </Bar>
          <Bar
            dataKey='Expense'
            fill={presetDarkPalettes.red.primary}
            stackId='stack'
            onClick={handleClick}
          >
            {data.map((entry, index) => (
              <Cell cursor='pointer' />
            ))}
          </Bar>
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
