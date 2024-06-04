import { Request, Response } from 'express';
import moment from 'moment';
import postgresDB from '../postgresDB';

export const getAccountBalanceOverTimeData = async (
  req: Request,
  res: Response
): Promise<void> => {
  const startDate = moment().subtract(1, 'year').format('MM-DD-YYYY');
  const endDate = moment().format('MM-DD-YYYY');

  const accountId = parseInt(req.query.accountId as string);

  const rawData = await postgresDB.manager.query(`
    WITH calendar AS (
      SELECT bucket::date AS day FROM generate_series('${startDate}', '${endDate}', '10 day'::interval) bucket
    )
    SELECT
      c.day,
      (
        SELECT balance
        FROM transaction t
        LEFT JOIN upload u ON t."uploadId" = u.id
        WHERE "date" < c.day AND u."accountId" = a.id
        ORDER BY "date" DESC
        LIMIT 1
      ) AS "balance"
    FROM
    calendar c
    CROSS JOIN account a
    WHERE a.id = ${accountId}
  `);

  // Need to figure out how to have TypeORM do this
  // automatically
  rawData.forEach((d) => (d.balance = parseFloat(d.balance)));

  res.status(200).send(rawData);
};

export const getAccountsTotalData = async (
  req: Request,
  res: Response
): Promise<void> => {
  const startDate = moment()
    .endOf('month')
    .subtract(1, 'year')
    .format('MM-DD-YYYY');

  const endDate = moment().endOf('month').format('MM-DD-YYYY');

  const rawData = await postgresDB.manager.query(`
    WITH account_balances AS (
      WITH calendar AS (
        SELECT bucket::date AS day FROM generate_series('${startDate}', '${endDate}', '10 day'::interval) bucket
      )
      SELECT
        c.day,
        account.id,
        (
          SELECT balance
          FROM transaction t
          LEFT JOIN upload u ON t."uploadId" = u.id
          WHERE "date" < c.day AND u."accountId" = account.id
          ORDER BY "date" DESC
          LIMIT 1
        ) AS "balance"
      FROM
      calendar c
      CROSS JOIN account
    )
    SELECT
      ab.day AS "date",
      SUM(ab.balance) AS "total"
    FROM account_balances ab
    GROUP BY ab.day
  `);

  // Need to figure out how to have TypeORM do this
  // automatically
  rawData.forEach((d) => (d.total = parseFloat(d.total)));

  res.status(200).send(rawData);
};
