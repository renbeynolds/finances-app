import { Request, Response } from 'express';
import moment from 'moment';
import { Category } from '../entities';
import postgresDB from '../postgresDB';

export const getCategorySpendingOverTimeData = async (
  req: Request,
  res: Response
): Promise<void> => {
  const startDate = moment().endOf('month').subtract(13, 'months');
  const endDate = moment().endOf('month').subtract(1, 'month');

  const endDateString = endDate.format('MM-DD-YYYY');
  const startDateString = startDate.format('MM-DD-YYYY');

  if (!req.query.categoryId || req.query.categoryId == 'null') {
    res.status(200).send([]);
    return;
  }

  const categoryId = parseInt(req.query.categoryId as string);

  const category = await postgresDB
    .getRepository(Category)
    .findOneBy({ id: categoryId });

  const rawData = await postgresDB.manager.query(`
    WITH calendar AS (
      SELECT DATE_TRUNC('month', bucket::date) AS month FROM generate_series('${startDateString}', '${endDateString}', '1 month'::interval) bucket
    ),
    category_transactions AS (
      SELECT * FROM transaction t
      LEFT JOIN category c on t."categoryId" = c.id
      WHERE c.id = ${categoryId} OR c."parentCategoryId" = ${categoryId}
    )
    SELECT
      TO_CHAR(c.month, 'YYYY-MM') as month,
      COALESCE(SUM(t.amount), 0) * -1 as "total"
    FROM calendar c
    LEFT JOIN category_transactions t ON DATE_TRUNC('month', t.date) = c.month
    GROUP BY c.month
    ORDER BY c.month ASC
  `);

  // Need to figure out how to have TypeORM do this
  // automatically
  rawData.forEach((d) => (d.total = parseFloat(d.total)));

  // @ts-ignore
  category.data = rawData;

  res.status(200).send(category);
};
