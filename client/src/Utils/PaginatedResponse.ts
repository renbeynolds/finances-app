interface Pagination {
  total: number;
}

export interface PaginatedResponse<DataType> {
  pagination: Pagination;
  data: DataType[];
}
