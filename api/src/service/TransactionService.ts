import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Tag } from '../entity/Tag';
import { Transaction } from '../entity/Transaction';

export const getTransactions = async(req: Request, res: Response): Promise<void> => {

  const uploadId = Number(req.query.uploadId);
  const tagIds = req.query.tagIds ? JSON.parse(req.query.tagIds as string) : null;

  const qb = getRepository(Transaction).createQueryBuilder('trans')
    .leftJoinAndSelect('trans.tags', 'tag')
    .where(uploadId ? 'trans.upload = :uploadId' : '1=1', { uploadId })
    .andWhere(tagIds ? 'tag.id IN (:...tagIds)' : '1=1', { tagIds })
    .orderBy('trans.id', 'DESC')
    .skip(req.pagination.offset)
    .take(req.pagination.limit);

  const [result, total] = await qb.getManyAndCount();

  res.status(200).send({
    data: result,
    pagination: { ...req.pagination, total: total }
  });
};

export const updateTransaction = async(req: Request, res: Response): Promise<void> => {
  const transactionRepository = getRepository(Transaction);
  const tagRepository = getRepository(Tag);

  const transaction = await transactionRepository.findOne(req.params.transactionId, { relations: ['tags'] });
  transaction.tags = await tagRepository.findByIds(req.body.tags.map(t => t.id));

  await transactionRepository.save(transaction);
  res.send(transaction);
};