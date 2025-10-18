export type Response<DataType> = {
  code: number;
  status: string;
  pagination: Pagination | undefined;
  data: DataType;
};

export type Pagination = {
  totalRecords: number;
};
