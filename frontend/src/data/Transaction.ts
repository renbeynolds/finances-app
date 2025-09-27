export type Transaction = {
  id: number;
  uploadId: number;
  categoryId: number | undefined;
  date: string;
  description: string;
  comment: string | undefined;
  amount: number;
  balance: number;
};
