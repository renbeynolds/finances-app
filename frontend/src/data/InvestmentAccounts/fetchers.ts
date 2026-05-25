import { Fetcher } from "swr";
import { Response } from "../Response";
import { InvestmentAccount } from "./types";

export const InvestmentAccountsEndpoint = "/api/investment_accounts";
export const InvestmentAccountsFetcher: Fetcher<
  Response<InvestmentAccount[]>,
  string
> = (url) => fetch(url).then((res) => res.json());

export const InvestmentAccountEndpoint = (id: string) =>
  `/api/investment_accounts/${id}`;
export const InvestmentAccountFetcher: Fetcher<
  Response<InvestmentAccount>,
  string
> = (url) => fetch(url).then((res) => res.json());
