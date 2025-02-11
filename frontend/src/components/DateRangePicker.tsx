import { DatePickerInput } from '@mantine/dates';
import { useContext } from 'react';
import {
  DateFilterContext,
  SetDateFilterContext,
} from '../context/DateFilterContext';

export default function DateRangePicker() {
  const dateFilter = useContext(DateFilterContext);
  const setDateFilter = useContext(SetDateFilterContext);

  return (
    <DatePickerInput
      type='range'
      placeholder='Select Date Range'
      value={dateFilter}
      valueFormat='YYYY-MM-DD'
      onChange={setDateFilter}
    />
  );
}
