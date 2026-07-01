import { SimpleGrid, Stack } from "@mantine/core";
import React from "react";
import useSWR from "swr";
import { TransactionFiltersContext } from "../context/TransactionFiltersContext";
import {
  FilteredTransactionsTotalEndpoint,
  TransactionsTotalFetcher,
} from "../data/Transactions/fetchers";
import AmountCard from "./AmountCard";
import TransactionTable from "./TransactionTable";

export default function Explore() {
  const transactionFilters = React.useContext(TransactionFiltersContext);

  const { data, isLoading } = useSWR(
    FilteredTransactionsTotalEndpoint(transactionFilters),
    TransactionsTotalFetcher,
  );

  return (
    <Stack>
      <SimpleGrid cols={2}>
        <AmountCard
          title="Total"
          amount={data?.data.total}
          isLoading={isLoading}
        />
      </SimpleGrid>
      <TransactionTable />
    </Stack>
  );
}
