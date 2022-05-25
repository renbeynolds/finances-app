import accounting from 'accounting';
import { Card } from 'antd';
import _ from 'lodash';
import React, { ReactNode, useState } from 'react';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { Props } from 'recharts/types/component/DefaultLegendContent';
import ChartColors from '../../Utils/ChartColors';
import ActivePieShape from './ActivePieShape';
import { TopSpendingTagDTO } from './TopSpendingTagDTO';
import { useTopSpendingTagsData } from './useTopSpendingTagsData';

const renderLegend = (props: Props): ReactNode => {
  const { payload } = props;

  return (
    <>
      {payload?.map((entry, index) => {
        // @ts-ignore
        const percentage = `(${(entry?.payload?.percent * 100).toFixed(2)}%)`;
        // @ts-ignore
        const value = accounting.formatMoney(entry?.payload?.data);

        return (
          <div key={index} style={{ display: 'flex', color: '#333' }}>
            <div
              style={{
                backgroundColor: entry.color,
                width: '13px',
                height: '13px',
                marginTop: '4px',
              }}
            />
            <div style={{ paddingLeft: '8px', flexGrow: 1 }}>{entry.value}</div>
            <div style={{ paddingLeft: '8px' }}>{value}</div>
            <div style={{ paddingLeft: '8px', width: '70px', color: '#999' }}>
              {percentage}
            </div>
          </div>
        );
      })}
    </>
  );
};

interface TopSpendingTagsChartProps {
  startDate: moment.Moment;
  endDate: moment.Moment;
}

const TopSpendingTagsChart = ({
  startDate,
  endDate,
}: TopSpendingTagsChartProps): JSX.Element => {
  const data = useTopSpendingTagsData(startDate, endDate);
  const [activeIndex, setActiveIndex] = useState(0);

  const getColor = (entry: TopSpendingTagDTO, idx: number) => {
    let color: string | undefined = '';
    if (_.isEmpty(entry.color) || entry.color === '#999999') {
      color = ChartColors[idx];
    } else {
      color = entry.color;
    }
    return color;
  };

  return (
    <Card title='Top Spending Tags'>
      <ResponsiveContainer height={300}>
        <PieChart>
          <Pie
            data={data}
            innerRadius={70}
            outerRadius={95}
            fill='#8884d8'
            paddingAngle={1}
            dataKey='data'
            onMouseEnter={(data, idx) => setActiveIndex(idx)}
            activeIndex={activeIndex}
            activeShape={ActivePieShape}
          >
            {data.map((entry: TopSpendingTagDTO, index: number) => (
              <Cell key={index} fill={getColor(entry, index)} />
            ))}
          </Pie>
          <Legend
            layout='vertical'
            verticalAlign='middle'
            align='right'
            content={renderLegend}
          />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default TopSpendingTagsChart;
