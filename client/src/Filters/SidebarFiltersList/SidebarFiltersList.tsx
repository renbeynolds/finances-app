import { DatePicker, Space, Tag } from 'antd';
import moment from 'moment';
import React from 'react';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import DateRanges from '../../Utils/DateRanges';
import {
  endDateState,
  startDateState,
  tagFilter,
  tagObjectFilter,
} from '../FiltersState';

const { RangePicker } = DatePicker;

const SidebarFiltersList = (): JSX.Element => {
  const startDate = useRecoilValue(startDateState);
  const endDate = useRecoilValue(endDateState);
  const tag = useRecoilValue(tagObjectFilter);
  const clearTagFilter = useResetRecoilState(tagFilter);
  const setStartDate = useSetRecoilState(startDateState);
  const setEndDate = useSetRecoilState(endDateState);
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Space direction='vertical' size='large'>
        <RangePicker
          value={[startDate, endDate]}
          ranges={{
            'Last 30 Days': DateRanges.last30Days(),
            'This Month': DateRanges.thisMonth(),
            'Last Month': DateRanges.lastMonth(),
            'Last 365 Days': DateRanges.last365Days(),
          }}
          allowClear={false}
          onChange={(dates) => {
            setStartDate(dates?.[0] as moment.Moment);
            setEndDate(dates?.[1] as moment.Moment);
          }}
        />
        {tag && (
          <Tag
            closable={true}
            onClose={() => clearTagFilter()}
            color={tag.color}
          >
            {tag.name}
          </Tag>
        )}
      </Space>
    </div>
  );
};

export default SidebarFiltersList;
