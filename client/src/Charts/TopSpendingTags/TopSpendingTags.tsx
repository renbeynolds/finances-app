import accounting from 'accounting';
import { Empty } from 'antd';
import Title from 'antd/lib/typography/Title';
import alpha from 'color-alpha';
import _ from 'lodash';
import React, { ReactNode, useState } from 'react';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { Props } from 'recharts/types/component/DefaultLegendContent';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { tagFilter } from '../../Filters/FiltersState';
import ChartColors from '../../Utils/ChartColors';
import ActivePieShape from './ActivePieShape';
import { topSpendingTagsQuery } from './state';
import { TopSpendingTagDTO } from './TopSpendingTagDTO';

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

function TopSpendingTags() {
  const data = useRecoilValue(topSpendingTagsQuery);
  const setTagFilter = useSetRecoilState(tagFilter);
  const tagFilterValue = useRecoilValue(tagFilter);
  const [activeIndex, setActiveIndex] = useState(0);

  const getColor = (entry: TopSpendingTagDTO, idx: number) => {
    let color: string | undefined = '';
    if (_.isEmpty(entry.color) || entry.color === '#999999') {
      color = ChartColors[idx];
    } else {
      color = entry.color;
    }
    if (tagFilterValue === entry.tagId || tagFilterValue === null) {
      return color;
    }
    return alpha(color as string, 0.5);
  };

  const onSliceClick = (e: any) => {
    const newFilterValue = e.payload.payload.tagId;
    if (newFilterValue !== tagFilterValue) {
      setTagFilter(newFilterValue);
    } else {
      setTagFilter(null);
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
        <Title level={3}>Top Spending Tags</Title>
      </div>
      {_.isEmpty(data) ? (
        <div style={{ width: 600, height: 300 }}>
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </div>
      ) : (
        <ResponsiveContainer minWidth={600} height={300}>
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
      )}
    </div>
  );
}

export default TopSpendingTags;
