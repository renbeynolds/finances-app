import { Fetcher } from 'swr';
import { Response } from '../Response';
import { Category } from './types';

export const CategoriesEndpoint = '/api/categories';
export const CategoryEndpoint = (categoryId: string) =>
  `/api/categories/${categoryId}`;

export const CategoriesFetcher: Fetcher<Response<Category[]>, string> = (url) =>
  fetch(url).then((res) => res.json());

export const CategoryFetcher: Fetcher<Response<Category>, string> = (url) =>
  fetch(url).then((res) => res.json());
