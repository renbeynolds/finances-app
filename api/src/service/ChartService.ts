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
  const bucket = req.query.bucket;
  const manager = getManager();

  const rawData = await manager.query(`
    WITH account_dates AS (
      WITH dates AS (
        SELECT DATE_TRUNC('${bucket}', bucket::date) AS bucket FROM generate_series('${startDate}', '${endDate}', '1 ${bucket}'::interval) bucket
      )
      SELECT
        d.bucket AS bucket,
        a.id AS "accountId",
        a.name AS "accountName"
      FROM
        dates d
        CROSS JOIN account a
    )
    SELECT
      TO_CHAR(ad.bucket, 'YYYY-MM-DD') as bucket, ad."accountName" as name, AVG(t.balance) as balance
    FROM
      account_dates ad
      LEFT JOIN upload u ON u."accountId" = ad."accountId"
      LEFT JOIN transaction t ON t."uploadId" = u.id AND DATE_TRUNC('${bucket}', t.date) = ad.bucket
    GROUP BY
      ad.bucket, ad."accountName"
    ORDER BY ad.bucket
  `);

  // Could probably be accomplished as part of the query
  // using crosstab but that is prohibitively complex
  // due to the need for "dynamic columns" based on the
  // number of accounts present in the database
  const transposed = Object.values(_.reduce(rawData, (result, value, key) => {
    const { name, bucket, balance } = value;
    if (result[bucket]) {
      result[bucket][name] = balance;
    } else {
      result[bucket] = { bucket: bucket, [name]: balance };
    }
    return result;
  }, {}));

  // Could probably also be accomplished as part of
  // the query but the complexity is not currently
  // worth it for a side project
  const noNulls = transposed.map((entry, idx) => {
    entry['Total'] = 0;
    Object.keys(entry).forEach(account => {
      if (account !== 'bucket' && entry[account] === null) {
        let searchIdx = idx - 1;
        while (searchIdx >= 0 && transposed[searchIdx][account] === null) {
          searchIdx -= 1;
        }
        if (searchIdx === -1) {
          searchIdx = idx + 1;
          while (searchIdx < transposed.length && transposed[searchIdx][account] === null) {
            searchIdx += 1;
          }
        }
        entry[account] = (searchIdx === -1 || searchIdx === transposed.length ? null : transposed[searchIdx][account]);
      }

      if (account !== 'bucket' && account !== 'Total' && entry[account] !== null) {
        entry['Total'] += entry[account];
      } 
    });
    return entry;
  });

  res.status(200).send(noNulls);
};

export const getTopSpendingCategoriesData = async(req: Request, res: Response): Promise<void> => {

  const startDate = req.query.startDate;
  const endDate = req.query.endDate;
  const manager = getManager();

  const rawData = await manager.query(`
    WITH tag_totals AS (
      SELECT
        SUM(trans.amount) AS data,
        tags."tagId" AS tagid
      FROM
        transaction trans
        LEFT JOIN transaction_tags_tag tags on tags."transactionId" = trans.id
      WHERE
        trans.amount < 0 AND
        trans.date >= '${startDate}' AND trans.date <= '${endDate}'
      GROUP BY tagid
      HAVING tags."tagId" IS NOT NULL
    )
    SELECT name, -1 * data AS data, color FROM (
      WITH tag_ranks AS (
        SELECT
          tagid,
          data,
          row_number() OVER (ORDER BY data ASC, tagid) AS rn
        FROM tag_totals
      )
      (
        SELECT
          tagid,
          tag.name AS name,
          tag.color AS color,
          data
        FROM
          tag_ranks
          LEFT JOIN tag tag ON tag.id = tag_ranks.tagid
        WHERE rn <= 5
        ORDER BY rn
      )
      UNION ALL
      SELECT NULL, 'OTHER', '#999999', SUM(data)
      FROM tag_ranks
      WHERE rn > 7
      HAVING COUNT(*) > 0
    ) ranking
  `);


  res.status(200).send(rawData);
};