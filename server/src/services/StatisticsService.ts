import { Request, Response } from 'express';
import moment from 'moment';
import { getManager, getRepository } from 'typeorm';
import { Transaction } from '../entities/Transaction';

export const getTotalExpense = async (
  req: Request,
  res: Response
): Promise<void> => {
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;

  const result = await getRepository(Transaction)
    .createQueryBuilder('trans')
    .leftJoin('trans.category', 'category')
    .where('trans.amount < 0')
    .andWhere('trans.date >= :startDate', { startDate })
    .andWhere('trans.date <= :endDate', { endDate })
    .andWhere("category.name <> 'TRANSFER'")
    .select('SUM(trans.amount) * -1', 'totalExpense')
    .getRawOne();

  res.status(200).send(result);
};

export const getTotalIncome = async (
  req: Request,
  res: Response
): Promise<void> => {
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;

  const result = await getRepository(Transaction)
    .createQueryBuilder('trans')
    .leftJoin('trans.category', 'category')
    .where('trans.amount > 0')
    .andWhere('trans.date >= :startDate', { startDate })
    .andWhere('trans.date <= :endDate', { endDate })
    .andWhere("category.name <> 'TRANSFER'")
    .select('SUM(trans.amount)', 'totalIncome')
    .getRawOne();

  res.status(200).send(result);
};

export const getAverageExpense = async (
  req: Request,
  res: Response
): Promise<void> => {
  const months = req.query.months;

  const startDate = moment()
    .endOf('month')
    .subtract(months as string, 'months')
    .format('MM-DD-YYYY');

  const endDate = moment()
    .endOf('month')
    .subtract(1, 'month')
    .format('MM-DD-YYYY');

  const rawData = await getManager().query(`
    WITH calendar AS (
      SELECT DATE_TRUNC('month', bucket::date) AS month FROM generate_series('${startDate}', '${endDate}', '1 month'::interval) bucket
    )
    SELECT
      AVG(sums.total)
    FROM (
      SELECT
        SUM(amount) AS "total"
      FROM calendar c
      LEFT JOIN transaction t ON DATE_TRUNC('month', t.date) = c.month
      WHERE t."categoryId" IS NULL OR t."categoryId" <> (SELECT id FROM category WHERE name = 'TRANSFER') AND
      t.amount < 0
      GROUP BY c.month
    ) sums
  `);

  res.status(200).send(rawData[0]);
};

export const getAverageIncome = async (
  req: Request,
  res: Response
): Promise<void> => {
  const months = req.query.months;

  const startDate = moment()
    .endOf('month')
    .subtract(months as string, 'months')
    .format('MM-DD-YYYY');

  const endDate = moment()
    .endOf('month')
    .subtract(1, 'month')
    .format('MM-DD-YYYY');

  const rawData = await getManager().query(`
    WITH calendar AS (
      SELECT DATE_TRUNC('month', bucket::date) AS month FROM generate_series('${startDate}', '${endDate}', '1 month'::interval) bucket
    )
    SELECT
      AVG(sums.total)
    FROM (
      SELECT
        SUM(amount) AS "total"
      FROM calendar c
      LEFT JOIN transaction t ON DATE_TRUNC('month', t.date) = c.month
      WHERE t."categoryId" IS NULL OR t."categoryId" <> (SELECT id FROM category WHERE name = 'TRANSFER') AND
      t.amount > 0
      GROUP BY c.month
    ) sums
  `);

  res.status(200).send(rawData[0]);
};
