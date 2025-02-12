import '@mantine/charts/styles.css';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import 'mantine-datatable/styles.layer.css';
import React from 'react';
import Layout from './components/Layout';
import {
  DateFilterContext,
  DateFilterDispatchContext,
  DateFilterReducer,
  DefaultDateFilter,
} from './context/DateFilterContext';
import { theme } from './Theme';

export default function App() {
  const [dateFilter, dateFilterDispatch] = React.useReducer(
    DateFilterReducer,
    DefaultDateFilter
  );

  return (
    <MantineProvider theme={theme} defaultColorScheme='dark'>
      <DateFilterContext.Provider value={dateFilter}>
        <DateFilterDispatchContext.Provider value={dateFilterDispatch}>
          <Layout />
        </DateFilterDispatchContext.Provider>
      </DateFilterContext.Provider>
    </MantineProvider>
  );
}
