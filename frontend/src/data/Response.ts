export type Response<DataType> = {
  code: number;
  status: string;
  totalPages: number | null;
  data: DataType;
};
