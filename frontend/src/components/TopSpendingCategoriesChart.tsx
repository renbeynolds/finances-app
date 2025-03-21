import { Group, Paper, Text, useMantineTheme } from '@mantine/core';
import React from 'react';
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Sector,
} from 'recharts';
import { Props } from 'recharts/types/component/DefaultLegendContent';
import { PieSectorDataItem } from 'recharts/types/polar/Pie';
import useSWR from 'swr';
import { TransactionFiltersContext } from '../context/TransactionFiltersContext';
import { TopSpendingCategory } from '../data/TopSpendingCategory';
import {
  TopSpendingCategoriesEndpoint,
  TopSpendingCategoriesFetcher,
} from '../Fetchers';
import { FormatMoney } from '../utils';
import { getChartColors } from '../utils/chartcolors';

export default function TopSpendingCategoriesChart() {
  const theme = useMantineTheme();
  const chartColors = getChartColors(theme);
  const transactionFilters = React.useContext(TransactionFiltersContext);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [chartData, setChartData] = React.useState<TopSpendingCategory[]>([]);

  const { data, error, isLoading } = useSWR(
    `${TopSpendingCategoriesEndpoint}?from=${transactionFilters.Date[0]}&to=${transactionFilters.Date[1]}`,
    TopSpendingCategoriesFetcher,
  );

  React.useEffect(() => {
    if (!error && !isLoading && data) {
      setChartData(data.data);
    }
  }, [data, error, isLoading, setChartData]);

  if (error) return <div>failed to load</div>;

  return (
    <Paper shadow='sm' p='lg'>
      <ResponsiveContainer height={300}>
        <PieChart>
          <Pie
            data={chartData}
            innerRadius={60}
            outerRadius={95}
            fill='#8884d8'
            paddingAngle={1}
            dataKey='value'
            onMouseEnter={(_, idx) => setActiveIndex(idx)}
            activeIndex={activeIndex}
            activeShape={ActivePieShape}
            cx={'40%'}
          >
            {chartData.map((_, index: number) => (
              <Cell key={index} fill={chartColors[index]} stroke='none' />
            ))}
          </Pie>
          <Legend
            layout='vertical'
            verticalAlign='middle'
            width={375}
            align='right'
            content={(props) =>
              CustomLegend({ ...props, activeIndex, setActiveIndex })
            }
          />
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
  endAngle,
  fill,
  percent,
  value,
}: PieSectorDataItem) => {
  return (
    <g style={{ cursor: 'pointer' }}>
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
    </g>
  );
};

const CustomLegend = (
  props: Props & {
    setActiveIndex: (arg0: number) => void;
    activeIndex: number;
  },
) => {
  const { payload, activeIndex, setActiveIndex } = props;

  return (
    <>
      {payload?.map((entry, index) => {
        // @ts-ignore
        const percentage = `(${(entry?.payload?.percent * 100).toFixed(2)}%)`;
        const amount = FormatMoney(entry?.payload?.value);

        return (
          <Group key={index} onMouseEnter={() => setActiveIndex(index)}>
            <div
              style={{
                backgroundColor: entry.color,
                width: '1rem',
                height: '1rem',
              }}
            />
            <Text flex={1} td={index === activeIndex ? 'underline' : undefined}>
              {entry.value}
            </Text>
            <Text>{amount}</Text>
            <Text c='dimmed' w='70px'>
              {percentage}
            </Text>
          </Group>
        );
      })}
    </>
  );
};
