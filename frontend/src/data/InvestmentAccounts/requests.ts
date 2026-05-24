import dayjs from "dayjs";
import { InvestmentAccountBalanceFormValues } from "../../components/Accounts/InvestmentAccountBalanceForm";
import { InvestmentAccountFormValues } from "../../components/Accounts/InvestmentAccountForm";
import { MoneyInputToCents } from "../../utils";
import { Response } from "../Response";
import { InvestmentAccount } from "./types";

export const requestCreateInvestmentAccount = async (
  values: InvestmentAccountFormValues,
): Promise<Response<InvestmentAccount>> => {
  return fetch("/api/investment_accounts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: values.name,
      includeInRetirement: values.includeInRetirement,
      annualContribution: Math.round(values.annualContribution * 100),
      expectedAnnualReturn: values.expectedAnnualReturn / 100,
      accountType: values.accountType,
    }),
  }).then((response) => response.json());
};

export const requestUpdateInvestmentAccount = async (
  id: number,
  values: InvestmentAccountFormValues,
): Promise<Response<InvestmentAccount>> => {
  return fetch(`/api/investment_accounts/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: values.name,
      includeInRetirement: values.includeInRetirement,
      annualContribution: Math.round(values.annualContribution * 100),
      expectedAnnualReturn: values.expectedAnnualReturn / 100,
      accountType: values.accountType,
    }),
  }).then((response) => response.json());
};


export const requestRecordInvestmentAccountBalance = async (
  values: InvestmentAccountBalanceFormValues,
): Promise<Response<InvestmentAccount>> => {
  return fetch(`/api/investment_balances`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...values,
      balance: MoneyInputToCents(`${values.balance}`),
      date: dayjs(values.date!).format("YYYY-MM-DD"),
    }),
  }).then((response) => response.json());
};
