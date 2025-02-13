import { Paper, useMantineTheme } from '@mantine/core';
import React from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Sector } from 'recharts';
import { PieSectorDataItem } from 'recharts/types/polar/Pie';
import useSWR from 'swr';
import { DateFilterContext } from '../context/DateFilterContext';
import { TopSpendingCategory } from '../data/TopSpendingCategory';
import {
  TopSpendingCategoriesEndpoint,
  TopSpendingCategoriesFetcher,
} from '../Fetchers';
import { FormatMoney } from '../utils';
import { getChartColors } from '../utils/chartcolors';

export default function TopSpendingCategoriesChart() {
  const dateFilter = React.useContext(DateFilterContext);
  const theme = useMantineTheme();
  const [activeIndex, setActiveIndex] = React.useState(0);

  const { data, error, isLoading } = useSWR(
    `${TopSpendingCategoriesEndpoint}?from=${dateFilter[0]}&to=${dateFilter[1]}`,
    TopSpendingCategoriesFetcher
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  const chartColors = getChartColors(theme);

  return (
    <Paper shadow='sm'>
      <ResponsiveContainer height={300}>
        <PieChart>
          <Pie
            data={data!.data}
            innerRadius={60}
            outerRadius={95}
            fill='#8884d8'
            paddingAngle={1}
            dataKey='value'
            onMouseEnter={(_, idx) => setActiveIndex(idx)}
            activeIndex={activeIndex}
            activeShape={ActivePieShape}
          >
            {data!.data.map((entry: TopSpendingCategory, index: number) => (
              <Cell key={index} fill={chartColors[index]} stroke='none' />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </Paper>
  );
}

const ActivePieShape = ({
  cx,
  cy,
  innerRadius,
  outerRadius,
  startAngle,
  midAngle,
  endAngle,
  fill,
  payload,
  percent,
  value,
}: PieSectorDataItem) => {
  const theme = useMantineTheme();

  const RADIAN = Math.PI / 180;
  const sin = Math.sin(-RADIAN * midAngle!);
  const cos = Math.cos(-RADIAN * midAngle!);
  const sx = cx! + (outerRadius! + 10) * cos;
  const sy = cy! + (outerRadius! + 10) * sin;
  const mx = cx! + (outerRadius! + 30) * cos;
  const my = cy! + (outerRadius! + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g style={{ cursor: 'pointer' }}>
      {/* <text x={cx} y={cy} dy={-15} textAnchor='middle' fill={fill}>
        {payload.name}
      </text> */}
      <text
        x={cx}
        y={cy}
        dy={-5}
        textAnchor='middle'
        fill='rgba(255, 255, 255, 0.85)'
      >
        {FormatMoney(value!)}
      </text>
      <text
        x={cx}
        y={cy}
        dy={20}
        textAnchor='middle'
        fill='rgba(255, 255, 255, 0.45)'
      >{`(${(percent! * 100).toFixed(2)}%)`}</text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius! + 6}
        outerRadius={outerRadius! + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill='none'
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke='none' />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        dy={6}
        fill={theme.white}
      >
        {payload.name}
      </text>
    </g>
  );
};
