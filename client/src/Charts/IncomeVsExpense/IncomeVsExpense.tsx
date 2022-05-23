import accounting from 'accounting';
import Title from 'antd/lib/typography/Title';
import moment from 'moment';
import React from 'react';
import {
  Bar,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { endDateState, startDateState } from '../../Filters/FiltersState';
import { incomeVsExpenseQuery } from './state';

function IncomeVsExpense() {
  const startDate = useRecoilValue(startDateState);
  const endDate = useRecoilValue(endDateState);

  const data = useRecoilValue(incomeVsExpenseQuery);
  const setStartDate = useSetRecoilState(startDateState);
  const setEndDate = useSetRecoilState(endDateState);

  const isFilteredToMonth = (month: string) => {
    const startOfChosenMonth = moment(`${month}-01`).startOf('month');
    const endOfChosenMonth = moment(`${month}-01`).endOf('month');
    return (
      startDate?.format('YYYY-MM-DD') ===
        startOfChosenMonth.format('YYYY-MM-DD') &&
      endDate?.format('YYYY-MM-DD') === endOfChosenMonth.format('YYYY-MM-DD')
    );
  };

  const onBarClick = (e: { month: string }) => {
    if (!isFilteredToMonth(e.month)) {
      setStartDate(moment(`${e.month}-01`).startOf('month'));
      setEndDate(moment(`${e.month}-01`).endOf('month'));
    }
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Title level={3}>Income vs Expense</Title>
      </div>
      <ResponsiveContainer minWidth={600} height={300}>
        <ComposedChart
          data={data}
          stackOffset='sign'
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='month' />
          <YAxis
            tickFormatter={(value: number) =>
              accounting.formatMoney(value, { precision: 0 })
            }
          />
          <Tooltip
            formatter={(value: number) => accounting.formatMoney(value)}
          />
          <Legend />
          <ReferenceLine y={0} stroke='#000' />
          <Bar
            dataKey='Income'
            fill='rgb(40, 201, 56)'
            stackId='stack'
            onClick={onBarClick}
          >
            {data.map((entry, index) => {
              const color = 'rgb(40, 201, 56)';
              const inactiveColor = 'rgba(40, 201, 56, .5)';
              return (
                <Cell
                  key={index}
                  style={{ cursor: 'pointer' }}
                  fill={isFilteredToMonth(entry.month) ? color : inactiveColor}
                />
              );
            })}
          </Bar>
          <Bar
            dataKey='Expense'
            fill='rgb(222, 53, 53)'
            stackId='stack'
            onClick={onBarClick}
          >
            {data.map((entry, index) => {
              const color = 'rgb(222, 53, 53)';
              const inactiveColor = 'rgba(222, 53, 53, .5)';
              return (
                <Cell
                  key={index}
                  style={{ cursor: 'pointer' }}
                  fill={isFilteredToMonth(entry.month) ? color : inactiveColor}
                />
              );
            })}
          </Bar>
          <Line dataKey='Total' stroke='#000' />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

export default IncomeVsExpense;
