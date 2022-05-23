import { Request, Response } from 'express';
import moment from 'moment';
import { getManager } from 'typeorm';

export const getIncomeVsExpenseData = async (
  req: Request,
  res: Response
): Promise<void> => {
  const endDate = moment().endOf('month');
  const startDate = moment().endOf('month').subtract(1, 'year');

  const endDateString = endDate.format('MM-DD-YYYY');
  const startDateString = startDate.format('MM-DD-YYYY');

  const manager = getManager();

  const rawData = await manager.query(`
    WITH calendar AS (
      SELECT DATE_TRUNC('month', bucket::date) AS month FROM generate_series('${startDateString}', '${endDateString}', '1 month'::interval) bucket
    )
    SELECT
      TO_CHAR(c.month, 'YYYY-MM') as month,
      SUM(amount) AS "Total",
      SUM (CASE WHEN amount > 0 THEN amount ELSE 0 END) AS "Income",
      SUM (CASE WHEN amount < 0 THEN amount ELSE 0 END) AS "Expense"
    FROM calendar c
    LEFT JOIN transaction t ON DATE_TRUNC('month', t.date) = c.month
    WHERE t."tagId" IS NULL OR t."tagId" <> (SELECT id FROM tag WHERE name = 'TRANSFER')
    GROUP BY c.month
    ORDER BY c.month ASC
  `);

  res.status(200).send(rawData);
};
