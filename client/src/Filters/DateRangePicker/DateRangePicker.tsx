import { DatePicker, Space, Typography, Button } from 'antd';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
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
import { isFullMonth } from '../../Utils/DateUtils';

const DateRangePicker = (): JSX.Element => {
  const startDateFilter = useRecoilValue(startDateFilterAtom);
  const endDateFilter = useRecoilValue(endDateFilterAtom);
  const setStartDateFilter = useSetRecoilState(startDateFilterAtom);
  const setEndDateFilter = useSetRecoilState(endDateFilterAtom);
  const [rangeName, setRangeName] = React.useState<React.ReactNode | null>(
    DEFAULT_DATE_RANGE_NAME
  );
  const [fullMonth, setFullMonth] = React.useState<bool>(false);

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

      if (isFullMonth(start, end)) {
        setRangeName(dayjs(start).format('MMM YY'));
        return;
      }

      setRangeName(null);
    },
    [setRangeName]
  );

  const moveOneMonthBack = useCallback(() => {
    setStartDateFilter(
      dayjs(startDateFilter)
        .subtract(15, 'day')
        .startOf('month')
        .format(DATE_FILTER_FORMAT)
    );
    setEndDateFilter(
      dayjs(startDateFilter)
        .subtract(15, 'day')
        .endOf('month')
        .format(DATE_FILTER_FORMAT)
    );
  }, [startDateFilter, endDateFilter, setStartDateFilter, setEndDateFilter]);

  const moveOneMonthForward = useCallback(() => {
    setStartDateFilter(
      dayjs(endDateFilter)
        .add(15, 'day')
        .startOf('month')
        .format(DATE_FILTER_FORMAT)
    );
    setEndDateFilter(
      dayjs(endDateFilter)
        .add(15, 'day')
        .endOf('month')
        .format(DATE_FILTER_FORMAT)
    );
  }, [startDateFilter, endDateFilter, setStartDateFilter, setEndDateFilter]);

  useEffect(() => {
    checkAndSetRangeName(startDateFilter, endDateFilter);
    setFullMonth(isFullMonth(startDateFilter, endDateFilter));
  }, [checkAndSetRangeName, startDateFilter, endDateFilter, setFullMonth]);

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
        <>
          {fullMonth && (
            <Button
              type='link'
              icon={<CaretLeftOutlined />}
              onClick={moveOneMonthBack}
            />
          )}
          <Typography.Title
            level={5}
            style={{ lineHeight: '32px', marginTop: 0, marginBottom: 0 }}
          >
            {rangeName}
          </Typography.Title>
          {fullMonth && (
            <Button
              type='link'
              icon={<CaretRightOutlined />}
              onClick={moveOneMonthForward}
            />
          )}
        </>
      )}
    </Space>
  );
};

export default DateRangePicker;
