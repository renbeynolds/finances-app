import { CategoryFormValues } from '../../components/Categories/CategoryForm';
import { Response } from '../Response';
import { Category } from './types';

export const requestCreateCategory = async (
  values: CategoryFormValues,
): Promise<Response<Category>> => {
  return fetch('/api/categories', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...values,
      parentId: values.parentId ? Number(values.parentId) : null,
    }),
  }).then((response) => response.json());
};
