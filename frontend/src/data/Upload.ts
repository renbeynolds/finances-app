export type Upload = {
  id: number;
  createdAt: string;
};

export type ParsedTransaction = {
  index: number;
  date: string;
  description: string;
  amount: number;
  isDuplicate: boolean;
  categoryId?: number;
};

export type PreviewUploadResponse = {
  parsedTransactions: ParsedTransaction[];
};
