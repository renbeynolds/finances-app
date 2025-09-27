import { Fetcher } from 'swr';
import { Response } from '../Response';
import { CategoriesOverTime, Category } from './types';

export const CategoriesEndpoint = '/api/categories';
export const CategoryEndpoint = (categoryId: string) =>
  `/api/categories/${categoryId}`;
export const CategoriesOverTimeEndpoint = (from: string, to: string) =>
  `/api/insights/categories_over_time?from=${from}&to=${to}`;

export const CategoriesFetcher: Fetcher<Response<Category[]>, string> = (url) =>
  fetch(url).then((res) => res.json());

export const CategoryFetcher: Fetcher<Response<Category>, string> = (url) =>
  fetch(url).then((res) => res.json());

export const CategoriesOverTimeFetcher: Fetcher<
  Response<CategoriesOverTime[]>,
  string
> = (url) => fetch(url).then((res) => res.json());
