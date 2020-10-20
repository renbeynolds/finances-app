import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Tag } from '../entity/Tag';
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

export const updateTransaction = async(req: Request, res: Response): Promise<void> => {
  const transactionRepository = getRepository(Transaction);
  const tagRepository = getRepository(Tag);

  const transaction = await transactionRepository.findOne(req.params.transactionId, {relations: ['tags']});
  transaction.tags = await tagRepository.findByIds(req.body.tags.map(t => t.id));

  await transactionRepository.save(transaction);
  res.send(transaction);
};