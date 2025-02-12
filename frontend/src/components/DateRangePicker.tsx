import { DatePickerInput } from '@mantine/dates';
import dayjs from 'dayjs';
import React, { useContext } from 'react';
import {
  DateFilterDispatchContext,
  DefaultDateFilter,
} from '../context/DateFilterContext';

export default function DateRangePicker() {
  const [value, setValue] = React.useState<[Date | null, Date | null]>([
    dayjs(DefaultDateFilter[0]).toDate(),
    dayjs(DefaultDateFilter[1]).toDate(),
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
