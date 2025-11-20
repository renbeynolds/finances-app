import { CategoryFormValues } from "../../components/Categories/CategoryForm";
import { Response } from "../Response";
import { Category } from "./types";

export const requestCreateCategory = async (
  values: CategoryFormValues
): Promise<Response<Category>> => {
  return fetch("/api/categories", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...values,
      parentId: values.parentId ? Number(values.parentId) : null,
    }),
  }).then((response) => response.json());
};

export const requestUpdateCategory = async (
  id: number,
  values: CategoryFormValues
): Promise<Response<Category>> => {
  return fetch(`/api/categories/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...values,
      parentId: values.parentId ? Number(values.parentId) : null,
    }),
  }).then((response) => response.json());
};
