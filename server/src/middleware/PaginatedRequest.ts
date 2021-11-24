import { Request } from 'express';

export interface Pagination {
  offset?: number;
  limit?: number;
}

export interface PaginatedRequest extends Request {
  pagination: Pagination;
}
