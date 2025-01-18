export type Transaction = {
  id: number;
  categoryId: number | null;
  date: string;
  description: string;
  comment: string | null;
  amount: number;
  balance: number;
};
