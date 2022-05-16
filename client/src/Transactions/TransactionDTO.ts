export interface TransactionDTO {
  id: number;
  date: Date;
  description: string;
  amount: number;
  balance: number;
  balanceCorrection: number;
  tagId: number;
}
