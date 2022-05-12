import accounting from 'accounting';
import { Empty } from 'antd';
import Title from 'antd/lib/typography/Title';
import _ from 'lodash';
import React, { ReactNode, useState } from 'react';
import { Cell, Legend, Pie, PieChart } from 'recharts';
import { Props } from 'recharts/types/component/DefaultLegendContent';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { tagFilter } from '../../Filters/FiltersState';
// import { useDateRange } from '../../../Hooks/useDateRange';
// import { useTopSpendingCategories } from '../../../Hooks/useTopSpendingCategories';
// import { setSingleTagIdFilter } from '../../../Redux/Filters/reducer';
import ChartColors from '../../Utils/ChartColors';
import ActivePieShape from './ActivePieShape';
import { topSpendingTagsQuery } from './state';
import { TopSpendingTagDTO } from './TopSpendingTagDTO';

const renderLegend = (props: Props): ReactNode => {
  const { payload } = props;

  return (
    <>
      {payload?.map((entry, index) => (
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
          <div style={{ paddingLeft: '8px' }}>
            {accounting.formatMoney(entry?.value)}
          </div>
          <div
            style={{ paddingLeft: '8px', width: '70px', color: '#999' }}
            // @ts-ignore
          >{`(${(entry?.payload?.percent * 100).toFixed(2)}%)`}</div>
        </div>
      ))}
    </>
  );
};

function TopSpendingTags() {
  const data = useRecoilValue(topSpendingTagsQuery);
  const setTagFilter = useSetRecoilState(tagFilter);
  const [activeIndex, setActiveIndex] = useState(0);

  const getColor = (entry: TopSpendingTagDTO, idx: number) => {
    if (_.isEmpty(entry.color) || entry.color === '#999999') {
      return ChartColors[idx];
    }
    return entry.color;
  };

  const onSliceClick = (e: any) => {
    setTagFilter(e.payload.payload.tagId);
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
        <PieChart width={600} height={300}>
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
      )}
    </div>
  );
}

export default TopSpendingTags;
