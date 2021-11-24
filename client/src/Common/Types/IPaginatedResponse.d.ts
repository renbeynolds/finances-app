interface IPaginatedResponse<DataType> {
  pagination: Pagination;
  data: DataType;
}
