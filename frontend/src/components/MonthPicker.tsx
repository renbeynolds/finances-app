import { ActionIcon, Group } from '@mantine/core';
import { MonthPickerInput } from '@mantine/dates';
import { IconCaretLeft, IconCaretRight } from '@tabler/icons-react';
import dayjs from 'dayjs';
import React from 'react';
import {
  DateFilterContext,
  DateFilterDispatchContext,
} from '../context/DateFilterContext';

export default function MonthPicker() {
  const dateFilter = React.useContext(DateFilterContext);
  const dispatchDateFilter = React.useContext(DateFilterDispatchContext);

  const [value, setValue] = React.useState<Date | null>(
    dayjs(dateFilter[0]).toDate(),
  );

  React.useEffect(() => {
    if (dispatchDateFilter && value) {
      dispatchDateFilter({
        type: 'SET',
        payload: [
          dayjs(value).startOf('month').format('YYYY-MM-DD'),
          dayjs(value).endOf('month').format('YYYY-MM-DD'),
        ],
      });
    }
  }, [dispatchDateFilter, value]);

  const handlePrevMonth = () => {
    setValue(dayjs(value).subtract(1, 'month').toDate());
  };

  const handleNextMonth = () => {
    setValue(dayjs(value).add(1, 'month').toDate());
  };

  return (
    <Group gap='0'>
      <ActionIcon
        variant='transparent'
        aria-label='Previous Month'
        onClick={handlePrevMonth}
      >
        <IconCaretLeft style={{ width: '70%', height: '70%' }} stroke={1.5} />
      </ActionIcon>
      <MonthPickerInput
        placeholder='Select Month'
        value={value}
        onChange={setValue}
        maxDate={new Date()}
        w={150}
      />
      <ActionIcon
        variant='transparent'
        aria-label='Next Month'
        onClick={handleNextMonth}
        style={{
          background: 'transparent',
        }}
        disabled={dayjs(value).format('YYYY-MM') === dayjs().format('YYYY-MM')}
      >
        <IconCaretRight style={{ width: '70%', height: '70%' }} stroke={1.5} />
      </ActionIcon>
    </Group>
  );
}
