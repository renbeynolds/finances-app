import { TransactionDTO } from '@client/Transactions/TransactionDTO';
import { PaginatedResponse } from '@client/Utils/PaginatedResponse';
import { Response } from 'express';
import { getRepository } from 'typeorm';
import { Transaction } from '../entities/Transaction';
import { PaginatedRequest } from '../middleware/Pagination';

export const searchTransactions = async (
  req: PaginatedRequest,
  res: Response<PaginatedResponse<TransactionDTO>>
): Promise<void> => {
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;
  const tagId = req.query.tagId;

  const query = await getRepository(Transaction)
    .createQueryBuilder('trans')
    .where(tagId ? 'trans.tagId = :tagId' : '1=1', { tagId })
    .andWhere(startDate ? 'trans.date >= :startDate' : '1=1', { startDate })
    .andWhere(endDate ? 'trans.date <= :endDate' : '1=1', { endDate })
    .orderBy('trans.date', 'DESC')
    .addOrderBy('trans.id', 'DESC')
    .skip(req.pagination.offset)
    .take(req.pagination.limit);

  const [result, total] = await query.getManyAndCount();

  res.status(200).send({
    data: result,
    pagination: { total },
  });
};
