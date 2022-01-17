import accounting from 'accounting';
// import moment from 'moment';
import React from 'react';
// import { useDispatch } from 'react-redux';
import {
  Bar,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  ReferenceLine,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useRecoilValue } from 'recoil';
import { incomeVsExpenseQuery } from './state';
// import { useDateRange } from '../../../Hooks/useDateRange';
// import { useIncomeVsExpense } from '../../../Hooks/useIncomeVsExpense';
// import { setEndDateFilter, setStartDateFilter } from '../../../Redux/Filters/reducer';
// import DateRanges from '../../../Utils/DateRanges';

// const { RangePicker } = DatePicker;
// const DEFAULT_RANGE = DateRanges.last365Days();

function IncomeVsExpense() {
  // const dispatch = useDispatch();
  // const { dateStrings, setDates } = useDateRange(DEFAULT_RANGE);
  // const [activeMonth, setActiveMonth] = useState(null);
  // const data = useIncomeVsExpense(dateStrings);

  const data = useRecoilValue(incomeVsExpenseQuery);

  // const onBarClick = (e) => {
  //   setActiveMonth(e.month);
  //   dispatch(setStartDateFilter(moment(`${e.month}-01`)));
  //   dispatch(setEndDateFilter(moment(`${e.month}-01`).endOf('month')));
  // };

  return (
    <div>
      {/* <Space direction='horizontal' style={{ marginLeft: '80px' }}>
        <Typography.Title level={5}>Income vs Expense</Typography.Title>
        <RangePicker
            defaultValue={DEFAULT_RANGE}
            ranges={{
                'Past Year': DEFAULT_RANGE
            }}
            onChange={(dates) => setDates(dates)}
        />
      </Space> */}
      <ComposedChart
        width={600}
        height={300}
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
        <Tooltip formatter={(value: number) => accounting.formatMoney(value)} />
        <Legend />
        <ReferenceLine y={0} stroke='#000' />
        <Bar dataKey='Income' fill='rgb(40, 201, 56)' stackId='stack'>
          {data.map((entry, index) => {
            const color = 'rgb(40, 201, 56)';
            // const inactiveColor = 'rgba(40, 201, 56, .5)'
            return (
              <Cell key={index} style={{ cursor: 'pointer' }} fill={color} />
            );
          })}
        </Bar>
        <Bar dataKey='Expense' fill='rgb(222, 53, 53)' stackId='stack'>
          {data.map((entry, index) => {
            const color = 'rgb(222, 53, 53)';
            // const inactiveColor = 'rgba(222, 53, 53, .5)'
            return (
              <Cell key={index} style={{ cursor: 'pointer' }} fill={color} />
            );
          })}
        </Bar>
        <Line dataKey='Total' stroke='#000' />
      </ComposedChart>
    </div>
  );
}

export default IncomeVsExpense;
