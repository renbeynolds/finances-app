export type Response<DataType> = {
  code: number;
  status: string;
  totalRecords: number | undefined;
  data: DataType;
};
