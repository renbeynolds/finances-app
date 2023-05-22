import { DatePicker, Space, Typography } from 'antd';
import dayjs from 'dayjs';
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
  const [rangeName, setRangeName] = React.useState<React.ReactNode | null>(
    DEFAULT_DATE_RANGE_NAME
  );

  const checkAndSetRangeName = useCallback(
    (start: string, end: string) => {
      for (var entry of DateRanges) {
        if (
          entry.value[0].format(DATE_FILTER_FORMAT) === start &&
          entry.value[1].format(DATE_FILTER_FORMAT) === end
        ) {
          setRangeName(entry.label);
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
        value={[dayjs(startDateFilter), dayjs(endDateFilter)]}
        presets={DateRanges}
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
          style={{ lineHeight: '32px', marginTop: 0, marginBottom: 0 }}
        >
          {rangeName}
        </Typography.Title>
      )}
    </Space>
  );
};

export default DateRangePicker;
