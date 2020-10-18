import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Transaction } from '../entity/Transaction';

export const getTransactions = async(req: Request, res: Response): Promise<void> => {
  const findConfig = {
    relations: ['tags'],
    skip: req.pagination.offset,
    take: req.pagination.limit,
    where: {}
  };
  if (req.query.search) { findConfig.where = JSON.parse(req.query.search as string); }
  const [transactions, total] = await getRepository(Transaction).findAndCount(findConfig);
  res.send({
    data: transactions,
    pagination: { ...req.pagination, total: total }
  });
};