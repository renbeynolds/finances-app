import { Fetcher } from "swr";
import { TransactionFilters } from "../../context/TransactionFiltersContext";
import { TransactionFiltersToQueryParams } from "../../Fetchers";
import { Response } from "../Response";
import { TransactionsTotal } from "./types";

export const FilteredTransactionsTotalEndpoint = (
  transactionFilters: TransactionFilters
) =>
  `/api/transactions/total?` +
  TransactionFiltersToQueryParams(transactionFilters, false);

export const TransactionsTotalFetcher: Fetcher<
  Response<TransactionsTotal>,
  string
> = (url) => fetch(url).then((res) => res.json());
