import { DatePickerInput } from '@mantine/dates';
import dayjs from 'dayjs';
import React, { useContext } from 'react';
import {
  DateFilterContext,
  DateFilterDispatchContext,
} from '../context/DateFilterContext';

export default function DateRangePicker() {
  const dateFilter = React.useContext(DateFilterContext);

  const [value, setValue] = React.useState<[Date | null, Date | null]>([
    dayjs(dateFilter[0]).toDate(),
    dayjs(dateFilter[1]).toDate(),
  ]);

  const dispatchDateFilter = useContext(DateFilterDispatchContext);

  React.useEffect(() => {
    if (dispatchDateFilter && value[0] && value[1]) {
      dispatchDateFilter({
        type: 'SET',
        payload: [
          value[0].toISOString().split('T')[0],
          value[1].toISOString().split('T')[0],
        ],
      });
    }
  }, [dispatchDateFilter, value]);

  return (
    <DatePickerInput
      type='range'
      placeholder='Select Date Range'
      value={value}
      valueFormat='YYYY-MM-DD'
      onChange={setValue}
    />
  );
}
