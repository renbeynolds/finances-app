import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "mantine-datatable/styles.layer.css";
import React from "react";
import Layout from "./components/Layout";

// Must be imported _after_ core mantine styles
import "@mantine/charts/styles.css";
import "@mantine/dates/styles.css";

import {
  CategoriesContext,
  CategoriesDispatchContext,
  CategoriesReducer,
  DefaultCategories,
} from "./context/CategoriesContext";
import {
  DefaultTransactionFilters,
  TransactionFiltersContext,
  TransactionFiltersDispatchContext,
  TransactionFiltersReducer,
} from "./context/TransactionFiltersContext";
import { theme } from "./Theme";

export default function App() {
  const [transactionFilters, transactionFiltersDispatch] = React.useReducer(
    TransactionFiltersReducer,
    DefaultTransactionFilters,
  );

  const [categories, categoriesDispatchContext] = React.useReducer(
    CategoriesReducer,
    DefaultCategories,
  );

  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <TransactionFiltersContext.Provider value={transactionFilters}>
        <TransactionFiltersDispatchContext.Provider
          value={transactionFiltersDispatch}
        >
          <CategoriesContext.Provider value={categories}>
            <CategoriesDispatchContext.Provider
              value={categoriesDispatchContext}
            >
              <Layout />
            </CategoriesDispatchContext.Provider>
          </CategoriesContext.Provider>
        </TransactionFiltersDispatchContext.Provider>
      </TransactionFiltersContext.Provider>
    </MantineProvider>
  );
}
