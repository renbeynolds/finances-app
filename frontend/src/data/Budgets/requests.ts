import { Response } from "../Response";
import { Budget } from "./types";

export const requestUpdateBudget = async (
  id: number,
  amount: number,
): Promise<Response<Budget>> => {
  return fetch(`/api/budgets/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      amount,
    }),
  }).then((response) => response.json());
};

export const requestCreateBudget = async (
  categoryId: number,
): Promise<Response<Budget>> => {
  return fetch(`/api/budgets`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      categoryId,
    }),
  }).then((response) => response.json());
};
