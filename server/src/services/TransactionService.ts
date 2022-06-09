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
  const uploadId = req.query.uploadId;
  const accountId = req.query.accountId;
  const type = req.query.type;

  const query = await getRepository(Transaction)
    .createQueryBuilder('trans')
    .leftJoin('trans.tag', 'tag')
    .leftJoin('trans.upload', 'upload')
    .where(tagId ? 'trans.tagId = :tagId' : '1=1', { tagId })
    .andWhere(startDate ? 'trans.date >= :startDate' : '1=1', { startDate })
    .andWhere(endDate ? 'trans.date <= :endDate' : '1=1', { endDate })
    .andWhere(uploadId ? 'upload.id = :uploadId' : '1=1', { uploadId })
    .andWhere(accountId ? 'upload.accountId = :accountId' : '1=1', {
      accountId,
    })
    .andWhere(type === 'expense' ? 'trans.amount < 0' : '1=1')
    .andWhere(type === 'income' ? 'trans.amount > 0' : '1=1')
    .andWhere(
      type === 'income' || type === 'expense' ? "tag.name <> 'TRANSFER'" : '1=1'
    )
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
  const comment = req.body.comment;

  const repository = getRepository(Transaction);

  const updatedTransaction = await repository
    .save({
      id,
      tagId,
      comment,
    })
    .then((transaction) => repository.findOne(transaction.id));

  res.status(200).send(updatedTransaction);
};
