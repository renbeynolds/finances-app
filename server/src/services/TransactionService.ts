import { Response } from 'express';
import { getRepository } from 'typeorm';
import { Transaction } from '../entities/Transaction';
import { PaginatedRequest } from '../middleware/PaginatedRequest';

export const searchTransactions = async (
  req: PaginatedRequest,
  res: Response
): Promise<void> => {
  const query = await getRepository(Transaction)
    .createQueryBuilder('trans')
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
