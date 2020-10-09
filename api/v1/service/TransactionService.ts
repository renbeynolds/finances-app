import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Transaction } from '../entity/Transaction';

export const getAllTransactions = async(req: Request, res: Response) => {
  const transactions = await getRepository(Transaction).find();
  res.send(transactions);
};