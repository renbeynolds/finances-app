import { MonthPickerInput } from '@mantine/dates';
import dayjs from 'dayjs';
import React, { useContext } from 'react';
import { DateFilterDispatchContext } from '../context/DateFilterContext';

export default function MonthPicker() {
  const [value, setValue] = React.useState<Date | null>(new Date());

  const dispatchDateFilter = useContext(DateFilterDispatchContext);

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

  return (
    <MonthPickerInput
      placeholder='Select Month'
      value={value}
      onChange={setValue}
    />
  );
}
