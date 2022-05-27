import { TransactionDTO } from '@client/Transactions/TransactionDTO';
import { PaginatedResponse } from '@client/Utils/PaginatedResponse';
import { Response } from 'express';
import { getRepository } from 'typeorm';
import { Transaction } from '../entities/Transaction';
import { PaginatedRequest } from '../middleware/Pagination';

export const getTotalExpense = async (
  req: PaginatedRequest,
  res: Response<PaginatedResponse<TransactionDTO>>
): Promise<void> => {
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;

  const result = await getRepository(Transaction)
    .createQueryBuilder('trans')
    .leftJoin('trans.tag', 'tag')
    .where('trans.amount < 0')
    .andWhere('trans.date >= :startDate', { startDate })
    .andWhere('trans.date <= :endDate', { endDate })
    .andWhere("tag.name <> 'TRANSFER'")
    .select('SUM(trans.amount) * -1', 'totalExpense')
    .getRawOne();

  res.status(200).send(result);
};

export const getTotalIncome = async (
  req: PaginatedRequest,
  res: Response<PaginatedResponse<TransactionDTO>>
): Promise<void> => {
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;

  const result = await getRepository(Transaction)
    .createQueryBuilder('trans')
    .leftJoin('trans.tag', 'tag')
    .where('trans.amount > 0')
    .andWhere('trans.date >= :startDate', { startDate })
    .andWhere('trans.date <= :endDate', { endDate })
    .andWhere("tag.name <> 'TRANSFER'")
    .select('SUM(trans.amount)', 'totalIncome')
    .getRawOne();

  res.status(200).send(result);
};
