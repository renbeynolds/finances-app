import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Transaction } from '../entities/Transaction';
// import Client from '../../db/Client';

export const searchTransactions = async (
  req: Request,
  res: Response
): Promise<void> => {
  const transactions = await getRepository(Transaction).find();
  res.send(transactions);
};
