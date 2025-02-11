import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import dayjs from 'dayjs';
import 'mantine-datatable/styles.layer.css';
import { useState } from 'react';
import Layout from './components/Layout';
import {
  DateFilterContext,
  SetDateFilterContext,
} from './context/DateFilterContext';

export default function App() {
  const [dateFilter, setDateFilter] = useState<[Date | null, Date | null]>([
    dayjs().startOf('month').toDate(),
    dayjs().endOf('month').toDate(),
  ]);

  return (
    <MantineProvider defaultColorScheme='dark'>
      <DateFilterContext.Provider value={dateFilter}>
        <SetDateFilterContext.Provider value={setDateFilter}>
          <Layout />
        </SetDateFilterContext.Provider>
      </DateFilterContext.Provider>
    </MantineProvider>
  );
}
