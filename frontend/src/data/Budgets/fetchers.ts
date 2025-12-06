import { Fetcher } from "swr";
import { Response } from "../Response";
import { Budget } from "./types";

export const BudgetFetcher: Fetcher<Response<Budget>, string> = (url) =>
  fetch(url).then((res) => res.json());

export const BudgetsFetcher: Fetcher<Response<Budget[]>, string> = (url) =>
  fetch(url).then((res) => res.json());
