import { Request, Response } from 'express';
import moment from 'moment';
import { Transaction } from '../entities/Transaction';
import postgresDB from '../postgresDB';

export const getTotalExpense = async (
  req: Request,
  res: Response
): Promise<void> => {
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;

  const result = await postgresDB
    .getRepository(Transaction)
    .createQueryBuilder('trans')
    .leftJoin('trans.category', 'category')
    .where(`category.type = 'expense'`)
    .andWhere('trans.date >= :startDate', { startDate })
    .andWhere('trans.date <= :endDate', { endDate })
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

  const result = await postgresDB
    .getRepository(Transaction)
    .createQueryBuilder('trans')
    .leftJoin('trans.category', 'category')
    .where(`category.type = 'income'`)
    .andWhere('trans.date >= :startDate', { startDate })
    .andWhere('trans.date <= :endDate', { endDate })
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
    .startOf('month')
    .subtract(months as string, 'months')
    .format('MM-DD-YYYY');

  const endDate = moment()
    .endOf('month')
    .subtract(1, 'month')
    .format('MM-DD-YYYY');

  const rawData = await postgresDB.manager.query(`
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
      LEFT JOIN category cat ON t."categoryId" = cat.id
      WHERE cat.type = 'expense'
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
    .startOf('month')
    .subtract(months as string, 'months')
    .format('MM-DD-YYYY');

  const endDate = moment()
    .endOf('month')
    .subtract(1, 'month')
    .format('MM-DD-YYYY');

  const rawData = await postgresDB.manager.query(`
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
      LEFT JOIN category cat ON t."categoryId" = cat.id
      WHERE cat.type = 'income'
      GROUP BY c.month
    ) sums
  `);

  res.status(200).send(rawData[0]);
};

export const getAverageCategorySpending = async (
  req: Request,
  res: Response
): Promise<void> => {
  const categoryId = parseInt(req.query.categoryId as string);
  const months = req.query.months;

  const startDate = moment()
    .startOf('month')
    .subtract(months as string, 'months')
    .format('MM-DD-YYYY');

  const endDate = moment()
    .endOf('month')
    .subtract(1, 'month')
    .format('MM-DD-YYYY');

  const rawData = await postgresDB.manager.query(`
    WITH calendar AS (
      SELECT DATE_TRUNC('month', bucket::date) AS month FROM generate_series('${startDate}', '${endDate}', '1 month'::interval) bucket
    ),
    category_transactions AS (
      SELECT * FROM transaction t
      LEFT JOIN category c on t."categoryId" = c.id
      WHERE c.id = ${categoryId} OR c."parentCategoryId" = ${categoryId}
    )
    SELECT
      AVG(monthly_spending.total)
    FROM (
        SELECT
        TO_CHAR(c.month, 'YYYY-MM') as month,
        COALESCE(SUM(t.amount), 0) * -1 as "total"
      FROM calendar c
      LEFT JOIN category_transactions t ON DATE_TRUNC('month', t.date) = c.month
      GROUP BY c.month
      ORDER BY c.month ASC
    ) monthly_spending
  `);

  res.status(200).send(rawData[0]);
};
