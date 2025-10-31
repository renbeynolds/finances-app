import { Fetcher } from "swr";
import { AmountOverTime } from "../AmountOverTime";
import { Response } from "../Response";
import { BankAccount } from "./types";

export const BankAccountsEndpoint = "/api/bank_accounts";
export const BankAccountsFetcher: Fetcher<Response<BankAccount[]>, string> = (
  url
) => fetch(url).then((res) => res.json());

export const BankAccountFetcher: Fetcher<Response<BankAccount>, string> = (
  url
) => fetch(url).then((res) => res.json());

export const BankAccountBalanceOverTimeEndpoint = (
  accountId: string,
  from: string,
  to: string
) => `/api/bank_accounts/${accountId}/balance_over_time?from=${from}&to=${to}`;

export const AmountOverTimeFetcher: Fetcher<
  Response<AmountOverTime[]>,
  string
> = (url) => fetch(url).then((res) => res.json());
