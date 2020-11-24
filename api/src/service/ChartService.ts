import { Request, Response } from 'express';
import _ from 'lodash';
import { getManager, getRepository } from 'typeorm';
import { Transaction } from '../entity/Transaction';

export const getSpendingOverTimeData = async(req: Request, res: Response): Promise<void> => {

  const uploadId = Number(req.query.uploadId);
  const accountId = Number(req.query.accountId);
  const tagIds = req.query.tagIds ? JSON.parse(req.query.tagIds as string) : null;

  const qb = getRepository(Transaction).createQueryBuilder('trans')
    .select(['-1 * SUM(amount) AS total', 'TO_CHAR(date, \'YYYY/MM\') AS month'])
    .leftJoin('trans.tags', 'tag')
    .leftJoin('trans.upload', 'upload')
    .where('amount < 0')
    .andWhere(uploadId ? 'trans.upload = :uploadId' : '1=1', { uploadId })
    .andWhere(accountId ? 'upload.account = :accountId' : '1=1', { accountId })
    .andWhere(tagIds ? 'tag.id IN (:...tagIds)' : '1=1', { tagIds })
    .groupBy('TO_CHAR(date, \'YYYY/MM\')')
    .orderBy('TO_CHAR(date, \'YYYY/MM\')');

  const result = await qb.getRawMany();
  res.status(200).send(result);
};

export const getAccountBalanceOverTimeData = async(req: Request, res: Response): Promise<void> => {

  const accountId = Number(req.params.accountId);

  const qb = getRepository(Transaction).createQueryBuilder('trans')
    .select(['AVG(trans.balance) AS balance', 'TO_CHAR(date, \'YYYY/MM\') AS month'])
    .leftJoin('trans.tags', 'tag')
    .leftJoin('trans.upload', 'upload')
    .where('upload.account = :accountId', { accountId })
    .groupBy('TO_CHAR(date, \'YYYY/MM\')')
    .orderBy('TO_CHAR(date, \'YYYY/MM\')');

  const result = await qb.getRawMany();
  res.status(200).send(result);
};

export const getCombinedAccountBalanceOverTimeData = async(req: Request, res: Response): Promise<void> => {

  const startDate = req.query.startDate;
  const endDate = req.query.endDate;

  const manager = getManager();

  const rawData = await manager.query(`
    WITH dates AS (
      SELECT TO_CHAR(month::date, 'YYYY/MM') AS month FROM generate_series('${startDate}', '${endDate}', '1 month'::interval) month
    )
    SELECT
      a.name, d.month, AVG(t.balance) AS balance
    FROM dates d
    LEFT JOIN transaction t ON TO_CHAR(t.date, 'YYYY/MM') = d.month
    LEFT JOIN upload u ON t."uploadId" = u.id
    LEFT JOIN account a ON u."accountId" = a.id
    GROUP BY d.month, a.name
  `);

  // Could probably be accomplished as part of the query
  // using crosstab but that is prohibitively complex
  // due to the need for "dynamic columns" based on
  // the number of accounts present in the database
  const response = _.orderBy(Object.values(_.reduce(rawData, (result, value, key) => {
    const { name, month, balance } = value;
    if (result[month]) {
      result[month][name] = balance;
      result[month].Total += balance;
    } else {
      result[month] = { month: month, [name]: balance, Total: balance };
    }
    return result;
  }, {})), 'month');

  res.status(200).send(response);
};