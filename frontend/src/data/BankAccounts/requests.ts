import { BankAccountFormValues } from "../../components/Accounts/BankAccountForm";
import { Response } from "../Response";
import { BankAccount } from "./types";

export const requestCreateBankAccount = async (
  values: BankAccountFormValues
): Promise<Response<BankAccount>> => {
  return fetch("/api/bank_accounts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  }).then((response) => response.json());
};

export const requestUpdateBankAccount = async (
  id: number,
  values: BankAccountFormValues
): Promise<Response<BankAccount>> => {
  return fetch(`/api/bank_accounts/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  }).then((response) => response.json());
};
