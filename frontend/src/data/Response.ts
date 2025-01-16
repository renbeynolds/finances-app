export type Response<DataType> = {
  code: number;
  status: string;
  data: DataType;
};
