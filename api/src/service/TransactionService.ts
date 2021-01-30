import { Request, Response } from 'express';
import { getManager, getRepository } from 'typeorm';
import { Account } from '../entity/Account';
import { Tag } from '../entity/Tag';
import { Transaction } from '../entity/Transaction';

export const getTransactions = async(req: Request, res: Response): Promise<void> => {

  const uploadId = Number(req.query.uploadId);
  const accountId = Number(req.query.accountId);
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;
  const description = req.query.description;
  const untagged = req.query.untagged === 'true';
  const tagIds = req.query.tagIds ? JSON.parse(req.query.tagIds as string) : null;

  const qb = getRepository(Transaction).createQueryBuilder('trans')
    .leftJoinAndSelect('trans.tags', 'tag')
    .leftJoin('trans.upload', 'upload')
    .where(uploadId ? 'trans.upload = :uploadId' : '1=1', { uploadId })
    .andWhere(accountId ? 'upload.account = :accountId' : '1=1', { accountId })
    .andWhere(tagIds ? 'tag.id IN (:...tagIds)' : '1=1', { tagIds })
    .andWhere(untagged ? 'tag.id IS NULL' : '1=1')
    .andWhere(startDate ? 'trans.date >= :startDate' : '1=1', { startDate })
    .andWhere(endDate ? 'trans.date <= :endDate' : '1=1', { endDate })
    .andWhere(description ? 'trans.description = :description' : '1=1', { description })
    .orderBy('trans.date', 'DESC')
    .addOrderBy('trans.id', 'DESC')
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

  const transaction = await transactionRepository.findOne(req.params.transactionId, { relations: ['tags', 'upload', 'upload.account'] });
  transaction.tags = await tagRepository.findByIds(req.body.tags.map(t => t.id));

  await getManager().transaction(async transactionalEntityManager => {

    if (transaction.balanceCorrection !== Number(req.body.balanceCorrection)) {
      const account = await getRepository(Account).findOne(transaction.upload.account.id);
      const newCorrection = Number(req.body.balanceCorrection);
      const currentCorrection = transaction.balanceCorrection;
      const qb = transactionRepository.createQueryBuilder('trans')
        .leftJoin('trans.upload', 'upload')
        .where('upload.account = :accountId', { accountId: account.id })
        .andWhere('trans.id > :transactionId', { transactionId: transaction.id })
        .orderBy('trans.id', 'ASC');
      const futureTransactions = await qb.getMany();
      futureTransactions.forEach((t, idx) => {
        t.balance -= currentCorrection;
        t.balance += newCorrection;
        if (idx === futureTransactions.length - 1) {
          account.balance = t.balance;
        }
      });
      transaction.balance -= currentCorrection;
      transaction.balance += newCorrection;
      transaction.balanceCorrection = newCorrection;
      await transactionalEntityManager.save(futureTransactions);
      await transactionalEntityManager.save(account);
    }
  
    await transactionalEntityManager.save(transaction);
    res.send(transaction);

  }).catch(error => {
    return res.status(400).send({ errors: [error.message] });
  });

};