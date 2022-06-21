export interface TransactionDTO {
  id: number;
  date: Date;
  description: string;
  comment: string;
  amount: number;
  balance: number;
  balanceCorrection: number;
  categoryId: number;
}
