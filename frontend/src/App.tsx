import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import 'mantine-datatable/styles.layer.css';
import React from 'react';
import Layout from './components/Layout';
import {
  CategoriesContext,
  CategoriesDispatchContext,
  CategoriesReducer,
  DefaultCategories,
} from './context/CategoriesContext';
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
    DefaultDateFilter,
  );

  const [categories, categoriesDispatchContext] = React.useReducer(
    CategoriesReducer,
    DefaultCategories,
  );

  return (
    <MantineProvider theme={theme} defaultColorScheme='dark'>
      <DateFilterContext.Provider value={dateFilter}>
        <DateFilterDispatchContext.Provider value={dateFilterDispatch}>
          <CategoriesContext.Provider value={categories}>
            <CategoriesDispatchContext.Provider
              value={categoriesDispatchContext}
            >
              <Layout />
            </CategoriesDispatchContext.Provider>
          </CategoriesContext.Provider>
        </DateFilterDispatchContext.Provider>
      </DateFilterContext.Provider>
    </MantineProvider>
  );
}
