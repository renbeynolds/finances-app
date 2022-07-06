import { Request, Response } from 'express';
import moment from 'moment';
import postgresDB from '../postgresDB';

export const getIncomeVsExpenseData = async (
  req: Request,
  res: Response
): Promise<void> => {
  const startDate = moment()
    .endOf('month')
    .subtract(1, 'year')
    .format('MM-DD-YYYY');

  const endDate = moment().endOf('month').format('MM-DD-YYYY');

  const rawData = await postgresDB.manager.query(`
    WITH calendar AS (
      SELECT DATE_TRUNC('month', bucket::date) AS month FROM generate_series('${startDate}', '${endDate}', '1 month'::interval) bucket
    )
    SELECT
      TO_CHAR(c.month, 'YYYY-MM') as month,
      SUM(amount) AS "Total",
      SUM (CASE WHEN amount > 0 THEN amount ELSE 0 END) AS "Income",
      SUM (CASE WHEN amount < 0 THEN amount ELSE 0 END) AS "Expense"
    FROM calendar c
    LEFT JOIN transaction t ON DATE_TRUNC('month', t.date) = c.month
    WHERE t."categoryId" IS NULL OR t."categoryId" <> (SELECT id FROM category WHERE name = 'TRANSFER')
    GROUP BY c.month
    ORDER BY c.month ASC
  `);

  res.status(200).send(rawData);
};
