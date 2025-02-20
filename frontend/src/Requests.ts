import { Transaction } from './data/Transaction';

export const requestUpdateTransaction = async (
  transaction: Transaction
): Promise<Transaction> => {
  // TODO: Separate response / request data types
  return fetch(`/api/transactions/${transaction.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(transaction),
  }).then((response) => response.json());
};
