import { DatePickerInput } from '@mantine/dates';
import { useState } from 'react';

export default function DateRangePicker() {
  const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);
  return (
    <DatePickerInput
      type='range'
      label='Pick dates range'
      placeholder='Pick dates range'
      value={value}
      onChange={setValue}
    />
  );
}
