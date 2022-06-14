import accounting from 'accounting';
import { Card, Typography } from 'antd';
import _ from 'lodash';
import React, { ReactNode, useState } from 'react';
import { useNavigate } from 'react-router';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { Props } from 'recharts/types/component/DefaultLegendContent';
import ChartColors from '../../Utils/ChartColors';
import ActivePieShape from './ActivePieShape';
import { TopSpendingCategoryDTO } from './TopSpendingCategoryDTO';
import { useTopSpendingCategoriesData } from './useTopSpendingCategoriesData';

const renderLegend = (props: Props): ReactNode => {
  const { payload } = props;

  return (
    <>
      {payload?.map((entry, index) => {
        // @ts-ignore
        const percencategorye = `(${(entry?.payload?.percent * 100).toFixed(
          2
        )}%)`;
        // @ts-ignore
        const value = accounting.formatMoney(entry?.payload?.data);

        return (
          <div key={index} style={{ display: 'flex' }}>
            <div
              style={{
                backgroundColor: entry.color,
                width: '13px',
                height: '13px',
                marginTop: '4px',
              }}
            />
            <Typography.Text style={{ paddingLeft: '8px', flexGrow: 1 }}>
              {entry.value}
            </Typography.Text>
            <Typography.Text style={{ paddingLeft: '8px' }}>
              {value}
            </Typography.Text>
            <Typography.Text
              type='secondary'
              style={{ paddingLeft: '8px', width: '70px' }}
            >
              {percencategorye}
            </Typography.Text>
          </div>
        );
      })}
    </>
  );
};

const TopSpendingcategoriesChart = (): JSX.Element => {
  const navigate = useNavigate();
  const data = useTopSpendingCategoriesData();
  const [activeIndex, setActiveIndex] = useState(0);

  const getColor = (entry: TopSpendingCategoryDTO, idx: number) => {
    let color: string | undefined = '';
    if (_.isEmpty(entry.color) || entry.color === '#999999') {
      color = ChartColors[idx];
    } else {
      color = entry.color;
    }
    return color;
  };

  const onSliceClick = (e: any) => {
    navigate(`/categories/${e.payload.payload.categoryId}`);
  };

  return (
    <Card title='Top Spending Categories' bordered={false}>
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
            onClick={onSliceClick}
            activeIndex={activeIndex}
            activeShape={ActivePieShape}
          >
            {data.map((entry: TopSpendingCategoryDTO, index: number) => (
              <Cell key={index} fill={getColor(entry, index)} stroke='none' />
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

export default TopSpendingcategoriesChart;
