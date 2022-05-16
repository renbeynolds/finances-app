import { TransactionDTO } from '@client/Transactions/TransactionDTO';
import { PaginatedResponse } from '@client/Utils/PaginatedResponse';
import { Request, Response } from 'express';
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
    // @ts-ignore
    data: result,
    pagination: { total },
  });
};

export const updateTransaction = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = parseInt(req.params.id);
  const tagId = req.body.tagId;

  const repository = getRepository(Transaction);

  const updatedTransaction = await repository
    .save({
      id: id,
      tagId: tagId,
    })
    .then((transaction) => repository.findOne(transaction.id));

  res.status(200).send(updatedTransaction);
};
