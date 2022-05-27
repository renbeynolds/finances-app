import { DatePicker, Space, Typography } from 'antd';
import moment from 'moment';
import React, { useCallback, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  DATE_FILTER_FORMAT,
  DEFAULT_DATE_RANGE_NAME,
  endDateFilterAtom,
  startDateFilterAtom,
} from '../FilterState';
import DateRanges from './DateRanges';

const DateRangePicker = (): JSX.Element => {
  const startDateFilter = useRecoilValue(startDateFilterAtom);
  const endDateFilter = useRecoilValue(endDateFilterAtom);
  const setStartDateFilter = useSetRecoilState(startDateFilterAtom);
  const setEndDateFilter = useSetRecoilState(endDateFilterAtom);
  const [rangeName, setRangeName] = React.useState<string | null>(
    DEFAULT_DATE_RANGE_NAME
  );

  const checkAndSetRangeName = useCallback(
    (start: string, end: string) => {
      for (var entry of Object.entries(DateRanges)) {
        if (
          entry[1][0].format(DATE_FILTER_FORMAT) === start &&
          entry[1][1].format(DATE_FILTER_FORMAT) === end
        ) {
          setRangeName(entry[0]);
          return;
        }
      }
      setRangeName(null);
    },
    [setRangeName]
  );

  useEffect(() => {
    checkAndSetRangeName(startDateFilter, endDateFilter);
  }, [checkAndSetRangeName, startDateFilter, endDateFilter]);

  return (
    <Space direction='horizontal'>
      <DatePicker.RangePicker
        value={[moment(startDateFilter), moment(endDateFilter)]}
        ranges={DateRanges}
        allowClear={false}
        onChange={(dates) => {
          const newStartDateFilter = dates?.[0]?.format(DATE_FILTER_FORMAT)!;
          const newEndDateFilter = dates?.[1]?.format(DATE_FILTER_FORMAT)!;
          setStartDateFilter(newStartDateFilter);
          setEndDateFilter(newEndDateFilter);
        }}
      />
      {rangeName && (
        <Typography.Title
          level={5}
          style={{ lineHeight: '32px', marginBottom: 0 }}
        >
          {rangeName}
        </Typography.Title>
      )}
    </Space>
  );
};

export default DateRangePicker;
